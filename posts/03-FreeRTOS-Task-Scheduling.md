---
title: 03 FreeRTOS - Task Scheduling
description:
date: 2026-02-23
tags:
  - ESP
  - FreeRTOS
  - Embedded
draft: "true"
---
## Prerequisites

Before we start this part of the series their is a very important prerequisite 
- How the pointers work.
- The standard C library `malloc()` and `free()` functions. 
- What the stack and heap are.

When I started studding this part I just couldn't understand what's goin on, so I read the part about task scheduling in the book [Mastering the FreeRTOS Real Time Kernel](https://github.com/FreeRTOS/FreeRTOS-Kernel-Book/releases/download/V1.1.0/Mastering-the-FreeRTOS-Real-Time-Kernel.v1.1.0.pdf)  and it said that we have to know these prerequisite.

To know these things I did a research to find the best resource and I took a course on memory management and I think it's the best move I did so far cuz know I finally can understand some concepts here.

Here is a blog I wrote about the course I took <a href="/posts/C-and-Memory-Management" class="obsidian-link">C and Memory Management</a> make sure to read it and finish the course before we continue cuz all the sources teaching FreeRTOS will assume u know these things. 

## How the code works 

from our perspective the code will look like this
![](/images/Pasted%20image%2020260129180312.png)
all of the tasks are running at the same time, but what really happens in run time is deferent 


![](/images/Pasted%20image%2020260309211202.png)
let's say we are looking at processor utilization over time, if we have one core it have to divide the time it has among all these tasks we have most RTOS uses a form of time slicing where one of the [hardware interrupt timers](https://medium.com/@rushikajayasinghe/internal-timers-and-interrupts-in-micro-controllers-b701cdecda09)   interrupts the the processor at regular intervals, you will see a time slice of `1 ms` in FreeRTOS 
the prioritys are the rows in this diagram, tasks can run in those slots depending on the priority we've given them, the OS is required to run every time slice to figure out witch task to schedule next at every interval witch is in our case 1 ms this interval is also known as a **tick** the scheduler looks at the tasks the need to run and chooses the one with the highest priority, as we can see in the first tick **Task A** has a very low priority and it's the only task that needs to run so the scheduler chooses it and Task A runs for the rest of the time slice, then the tick timer interrupts the task and calls the scheduler to run again Task A has not finished what it needs to do so the scheduler let's it finish running in the next slice cuz there still no higher priority tasks that need to run, before the interval is done, Task A calls the `vTaskDelay()` function for two ticks and en ters the **blocked stated** the next time the scheduler is called counts as one of the ticks for that delay  so it needs one more tick to wait and scheduler has no other tasks to in the ready state so it enters the idle state for one tick, at this point Task A delay is over and is ready to run again so the scheduler let's it run at some point during this tick **Task B** and **Task C** inters the ready state they are higher priority tasks but they still must wait for the next tick to run, when the scheduler run this tick it sees the we have Task A, Task B and Task C are ready to run since B and C are priority 1 witch is higher than priority 0 they get scheduled to run, but B and C are the equal priority so the scheduler executes each task in turn in [round robin](https://www.geeksforgeeks.org/operating-systems/round-robin-scheduling-in-operating-system/) fashion, B and C will continue taking turns like this as long as they need to run, this is know as **preemptive scheduling** cuz the CPU time is taken from one task (Task A) to run other higher priority tasks (Task B and C), but a hardware interrupt will always take the highest priority (as u can see in the color red) the only exception is a hardware interrupt may or may not preempt another hardware interrupt service routine that's called nested interrupts and depends a lot on the hardware and configuration it has nothing to do with RTOS so we are not going through this rabbit hole this time, whenever an ISR is done running execution will return to the the last task it was running, once task B and C are done or they go to the suspended state the scheduler will then allow the lower priority tasks to run in our case Task A, in a multi core system the scheduler may choose to put some tasks on anther core, for example if made ESP-IDF choose how to run the tasks it may make task B and C run at the same time in a separate core   

## Task States
![](/images/Pasted%20image%2020260311195349.png)

the scheduler maintains a record of what state each task is in, when a task is created it automatically enters the **Ready** state in that instants the task is telling the scheduler that it's ready to **Run** at any time, the scheduler can choose to run that task only if there is not other higher priority tasks waiting to run, if the task is not run cuz there is a higher priority task being run then it remains in the **Ready** state, if a task is chosen by the scheduler to run it will become in the **Run** state and remain in that state while it is using the processor, if the processor has only one core then there would be only one running task at any given time

the scheduler can move tasks from the **Ready** and **Running** states as needed at each tick, while running a task may call an API function that moves it to the **Blocked** state, these API functions can be things like `vTaskDealy()` or waiting for a `Queue` or a `Semaphore`, tasks in the **Blocked** stated can't be selected to enter the **Running** state, it will wait until the unblocking event has occurred like _delay timer expiring_ or a _Semaphore being released_ the task will enter the **Ready** stated and wait to be scheduled for processor time

FreeRTOS has a `vTaskSuspend()` function that allows u to put a task in a **Suspended** state, u can call this function from the task it self or from other tasks, in the suspended state a task cannot be selected to run just like in the **Block** state, however only an explicit call to `vTaskResume()` function will allow a task to go to the **Ready** state, this is a good way to essentially put tasks to sleep of u don't want to rely on a timer like  `vTaskDealy()` 

## Context switching
 
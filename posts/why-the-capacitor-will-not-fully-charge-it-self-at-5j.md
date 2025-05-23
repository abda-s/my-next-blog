---
title: why the capacitor will not fully charge it self at 5j
description: 
date: 2025-01-21
tags:
  - Electronics
draft: "true"
---
![](/my-next-blog/images/Pasted%20image%2020250121012703.png)

we learnt that when the time is equal to 5J the capacitor must be fully charged.

in the calculation it gave us the capacitor will be fully charged in 0.25s but is wasn't (100%) fully charged it was 11.923v and was supposed to be 12v the error is (11.923-12/12)*100 = 0.6%.
the error witch is 0.6% wasn't supposed to be why is it there?


in the first place the 5J doesn't mean the capacitor fully charged it meant the capacitor reached 99.3% and we can prove that with the number we have from the simulation witch (11.923/12)*100% = 99.33% 

in theory we are fine with this approximation because in the real world the voltage in the capacitor can't be 100% fully charged 

the function of the capacitor $V(t) = V_{max}(1-e^{-t/RC})$ 
- $V_{max}$ is the maximum voltage the capacitor can charge to (12 V in your case) 
- $t$ is the time elapsed
- $RC$ is the time constant of the circuit
![](/my-next-blog/images/Pasted%20image%2020250121015614.png)

It would take an infinite amount of time for the capacitor to reach exactly 12V because $e^{-t/RC}$ approaches zero asymptotically
![](/my-next-blog/images/Pasted%20image%2020250121015737.png)

but also in the simulation it showed that the voltage across the capacitor reach the maximum witch is 12v witch we already said it should not reach it
![](/my-next-blog/images/Pasted%20image%2020250121020039.png)

ok why it reached the max?
- Oscilloscopes typically display voltages with a limited precision, and when the voltage is close enough (e.g., within microvolts of 12 V), the device rounds the value to 12 V.
- In reality, the voltage might still be a tiny fraction below 12 V (e.g., 11.999999 V), but the oscilloscope doesn't display that level of granularity.
The higher the resolution, the smaller the voltage differences the oscilloscope can detect and display.



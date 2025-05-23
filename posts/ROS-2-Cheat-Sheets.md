---
title: ROS 2 Cheat Sheets
date: 2024-12-14
draft: "false"
toc: "true"
tags:
  - ROS
  - linux
description: Get the hang of ROS 2 without the hassle! These quick cheat sheets cover everything from setting up your environment to managing nodes, topics, and more. Perfect for keeping your workflow smooth and stress-free.
---
## ROS 2 Environment Configuration Cheat Sheet 
---
### Commands and Explanations 


### 1. Source the Setup Files 
```bash
source /opt/ros/<distro>/setup.bash
```
- Activates ROS 2 in the current shell session by setting necessary environment variables.
- Replace `<distro>` with the name of your installed ROS 2 distribution (e.g., `humble`, `galactic`, `jazzy`).
	
### 2. Add Sourcing to Shell Startup Script 
```bash
echo "source /opt/ros/<distro>/setup.bash" >> ~/.bashrc
```
- Automatically sources ROS 2 every time you open a new shell.
- Modify `~/.bashrc` to include the source command.
    
Undo this step:
   - Edit the `~/.bashrc` file manually to remove the line added.
	
### 3. Check Environment Variables 
```bash
printenv | grep -i ROS
```
- Verifies if ROS environment variables are correctly set (e.g., `ROS_DISTRO`, `ROS_VERSION`).
	
### 4. Set the ROS_DOMAIN_ID Variable 
```bash
export ROS_DOMAIN_ID=<your_domain_id>
```
- Sets a unique domain ID for communication between ROS 2 nodes.
- Add to `~/.bashrc` for persistence:
 ```bash
 echo "export ROS_DOMAIN_ID=<your_domain_id>" >> ~/.bashrc
```
    
### 5. Set the ROS_AUTOMATIC_DISCOVERY_RANGE Variable 
```bash
export ROS_AUTOMATIC_DISCOVERY_RANGE=<range_value>
```
- Limits ROS 2 discovery range, useful in environments with multiple robots.
- Add to `~/.bashrc` for persistence:
    
```bash
echo "export ROS_AUTOMATIC_DISCOVERY_RANGE=<range_value>" >> ~/.bashrc
```        



## Turtlesim and ROS2 Cheat Sheet 
---
### 1. Install Turtlesim 

- Install Turtlesim:
```bash
sudo apt update
sudo apt install ros-<ros2-distro>-turtlesim
```
    
- Check installed executables:
```bash
ros2 pkg executables turtlesim
```

### 2. Start Turtlesim 

- Launch the turtlesim node:
```bash
ros2 run turtlesim turtlesim_node
```
    

### 3. Control the Turtle 

- Launch the teleop node to control the turtle:
```bash
ros2 run turtlesim turtle_teleop_key
```
    

Additional ROS2 commands:

- List active nodes:
```bash
ros2 node list
```

- List available topics:    
```bash
ros2 topic list
```
    
- List available services:
```bash
ros2 service list
```
    
- List available actions:
```bash
ros2 action list
```
    


### 4. Install and Use RQT 

- Install RQT and plugins:
```bash
sudo apt update
sudo apt install '~nros-<ros2-distro>-rqt*'
```
    
- Launch RQT:
```bash
rqt
```
    


### 5. Use RQT Service Caller 

- Select the Service Caller plugin:
    - Navigate to: Plugins > Services > Service Caller
- Refresh services:
    - Click on the Refresh button.


### 6. Spawn a New Turtle (Service Call) 

- Call the `/spawn` service (in RQT Service Caller):
    - Name: `turtle2`
    - Coordinates: `x = 1.0`, `y = 1.0`
    - Click Call to spawn a new turtle.


### 7. Change Pen Settings (Service Call) 

- Call the `/set_pen` service (in RQT Service Caller):
    - `r = 255` (red)
    - `width = 5`
    - Click Call.


### 8. Remap Topics for Multiple Turtles 

- Remap the `cmd_vel` topic for turtle2:

```bash
ros2 run turtlesim turtle_teleop_key --ros-args --remap turtle1/cmd_vel:=turtle2/cmd_vel
```
    


### 9. Stop Turtlesim 

- Stop the turtlesim node:
    - Press Ctrl + C in the `turtlesim_node` terminal.
- Stop the teleop node:
    - Press q in the `turtle_teleop_key` terminal.


## Understanding Nodes in ROS 2 Cheat Sheet 

---

### The ROS 2 Graph 

The ROS 2 graph represents the network of ROS 2 elements (nodes, topics, services, etc.) interacting in real-time. A robot system can be visualized as multiple nodes processing data together. Each node in ROS 2 serves a specific modular function (e.g., controlling motors or publishing sensor data).

---

### Nodes in ROS 2 

- What is a Node?  
    A node is an executable responsible for a specific task (e.g., controlling motors, publishing sensor data) and communicates with other nodes via topics, services, actions, or parameters.
    
- Single or Multiple Nodes per Executable:  
    A single ROS 2 executable (written in C++ or Python) can contain multiple nodes.

![Image Description](Pasted%20image%2020241215001625.png)

---

### 1. ros2 run 

The `ros2 run` command is used to run an executable from a specific package.

```bash
ros2 run <package_name> <executable_name>
```

- Example to run the turtlesim:
```bash
ros2 run turtlesim turtlesim_node
```
This will open a window with a turtle in it.

### 2. ros2 node list 

To list all active nodes in the ROS 2 system:
```bash
ros2 node list
```

### 3. ros2 node info 

The `ros2 node info <node_name>` command provides detailed information about a node’s publishers, subscribers, services, and actions.

- Example to get info about the `/turtlesim` node:
```bash
ros2 node info /turtlesim
```
    

### 3.1 Remapping Node Names and Topics 

- Remap the node name using `--ros-args --remap`:
    
```bash
ros2 run turtlesim turtlesim_node --ros-args --remap __node:=my_turtle
```
    
- This will rename `/turtlesim` to `/my_turtle`. If you run `ros2 node list`, you will see:    
```bash
/my_turtle
/teleop_turtle
```


## ROS 2 Topic Commands Cheat Sheet 
---
### Topics in ROS2 
* What is a topic
	A topic in ROS 2 is a communication channel through which nodes can publish and subscribe to messages, enabling data exchange between them.

![Image Description](Pasted%20image%2020241215005244.png)

---
### 1. rqt_graph (Graphical Tool): 

- Run rqt_graph to visualize the nodes and topics:
```bash
rqt_graph
```
    
- Open via GUI: `rqt > Plugins > Introspection > Node Graph`.
    

### 2. ros2 topic list: 

- List all active topics:
```bash
ros2 topic list
```
    
- List topics with types:
```bash
ros2 topic list -t
```
    

### 3. ros2 topic echo: 

- Display the data being published on a topic:
```bash
ros2 topic echo <topic_name>
```
    
- Example: To see `/turtle1/cmd_vel` data:
```bash
ros2 topic echo /turtle1/cmd_vel
```
    

### 4. ros2 topic info: 

- Get info about a specific topic:
```bash
ros2 topic info <topic_name>
```
    
- Example: Info about `/turtle1/cmd_vel`:
```bash
ros2 topic info /turtle1/cmd_vel
```
    

### 5. ros2 interface show: 

- Show the structure of a message type:
```bash
ros2 interface show <msg_type>
```
    
- Example: For `geometry_msgs/msg/Twist`:
```bash
ros2 interface show geometry_msgs/msg/Twist
```
    

### 6. ros2 topic pub: 

- Publish data to a topic:
```bash
ros2 topic pub <topic_name> <msg_type> "<args>"
```
    
- Example: To continuously move the turtle:
```bash
ros2 topic pub /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0, y: 0.0, z: 1.8}}"
```
    
- Publish once:
```bash
 ros2 topic pub --once <topic_name> <msg_type> "<args>"
```
    

### 7. ros2 topic hz: 

- View the rate of data publishing:
```bash
ros2 topic hz <topic_name>
```
    
- Example: Check the rate for `/turtle1/pose`:
```bash
ros2 topic hz /turtle1/pose
```
    

### 8. ros2 topic bw: 

- Check bandwidth usage for a topic:
```bash
ros2 topic bw <topic_name>
```
    
- Example: Check bandwidth for `/turtle1/pose`:
```bash
ros2 topic bw /turtle1/pose
```
    

### 9. ros2 topic find: 

- Find topics by message type:
```bash
ros2 topic find <msg_type>
```
    
- Example: Find topics with `geometry_msgs/msg/Twist` type:
```bash
ros2 topic find geometry_msgs/msg/Twist
```



## ROS 2 Services Cheat Sheet 
---
### Services in ROS2: 

Services in ROS 2 follow a call-and-response model, where nodes request data from a service and receive a response. Unlike topics, services only provide data when specifically called by a client.

![Image Description](Pasted%20image%2020241215010056.png)

---

### 1. List Active Services: 
- View all active services in ROS 2:   
```bash
ros2 service list
```
    
### 2. Service Type: 
- Check the type of a service (e.g., `/clear`):
```bash
ros2 service type /clear
```
    
### 3. Service Info: 
- Get info about a service (e.g., `/clear`):
```bash
ros2 service info /clear
```
    
### 4. Find Services by Type: 
- Find services of a specific type:        
```bash
ros2 service find std_srvs/srv/Empty
```
    
### 5. Show Service Interface: 
- View the request/response structure of a service:    
```bash
ros2 interface show turtlesim/srv/Spawn
```
    
### 6. Call a Service: 
- Call a service with or without arguments:        
```bash
ros2 service call /clear std_srvs/srv/Empty
ros2 service call /spawn turtlesim/srv/Spawn "{x: 2, y: 2, theta: 0.2, name: ''}"
```
    
### 7. Echo Service Data: 
- View service communication (request/response):        
```bash
ros2 service echo /add_two_ints
```
    

Here is the content with the requested headings formatted as `####`:

---

## ROS 2 Parameters Cheat Sheet 

### Parameters in ROS2: 

Parameters in ROS 2 are configuration values for nodes, like settings that can be integers, floats, booleans, strings, and lists. Each node can maintain its own parameters.

### 1. ros2 param list 

- List all parameters for all nodes:
```bash
ros2 param list
```
    
- Example output:
```
/teleop_turtle:
	scale_angular
	scale_linear
	use_sim_time
/turtlesim:
	background_b
	background_g
    background_r
    use_sim_time
```
    

### 2. ros2 param get 

- Get the value and type of a parameter:
```bash
ros2 param get <node_name> <parameter_name>
```
    
- Example to get the value of `/turtlesim background_g`:
```bash
ros2 param get /turtlesim background_g
```

Output:
```
Integer value is: 86
```
    

### 3. ros2 param set 

- Change a parameter’s value:
```bash
ros2 param set <node_name> <parameter_name> <value>
```
    
- Example to change `/turtlesim background_r`:
```bash
ros2 param set /turtlesim background_r 150
```
    
Output:
```
Set parameter successful
```
    

### 4. ros2 param dump 

- View and save a node's parameters to a file:
```bash
ros2 param dump <node_name> > <file_name>.yaml
```
    
- Example for `/turtlesim`:
```bash
ros2 param dump /turtlesim > turtlesim.yaml
```
    

### 5. ros2 param load 

- Load parameters from a file into a node:
```bash
ros2 param load <node_name> <parameter_file>
```
    
- Example:
```bash
ros2 param load /turtlesim turtlesim.yaml
```
    
Output:
```
Set parameter background_b successful
Set parameter background_g successful
Set parameter background_r successful
```
    

### 6. Load Parameter File on Node Startup 

- Start a node with saved parameters:
```bash
ros2 run <package_name> <executable_name> --ros-args --params-file <file_name>
```
    
- Example:
```bash
ros2 run turtlesim turtlesim_node --ros-args --params-file turtlesim.yaml
```
    

Here's the version without any tabs before the code blocks:

---

## ROS 2 Actions Cheat Sheet 

### Overview of Actions 

- Actions in ROS 2 are for long-running tasks that can be canceled and provide feedback.
- Actions are a combination of Goal, Feedback, and Result.
- They use a client-server model similar to topics but allow steady feedback and cancellation.
- Action Client sends goals to the Action Server, which processes the goal and sends feedback/results.
![Image Description](Pasted%20image%2020241215011642.png)
---

### 1. ros2 node info 

- View a node's information, including its actions:
```bash
ros2 node info <node_name>
```

* Example for `/turtlesim`:
```bash
ros2 node info /turtlesim
```
This shows the Action Servers and Action Clients for the node.

### 2. ros2 action list 

- List all actions in the ROS graph:
```bash
ros2 action list
```
This will return available actions such as `/turtle1/rotate_absolute`.

### 3. ros2 action type 

- Check the action type for a specific action:
```bash
ros2 action type /turtle1/rotate_absolute
```

* Output example:
```
turtlesim/action/RotateAbsolute
```

### 4. ros2 action info 

- View detailed information about an action:
```bash
ros2 action info /turtle1/rotate_absolute
```

* Example output:
```
Action: /turtle1/rotate_absolute
Action clients: 1
    /teleop_turtle
Action servers: 1
    /turtlesim
```

### 5. ros2 interface show 

- Inspect the structure of the action type:
```bash
ros2 interface show turtlesim/action/RotateAbsolute
```

* This will show the structure of the goal, result, and feedback:
```
The desired heading in radians
float32 theta
---
The angular displacement in radians to the starting position
float32 delta
---
The remaining rotation in radians
float32 remaining
```

### 6. ros2 action send_goal 

- Send a goal to an action server:
```bash
ros2 action send_goal <action_name> <action_type> <values>
```

* Example:
```bash
ros2 action send_goal /turtle1/rotate_absolute turtlesim/action/RotateAbsolute "{theta: 1.57}"
```

- Add `--feedback` to receive feedback during goal execution:
```bash
ros2 action send_goal /turtle1/rotate_absolute turtlesim/action/RotateAbsolute "{theta: -1.57}" --feedback
```


Here is the content with only the commands formatted without tabs:


## Using `rqt_console` to view logs 

---
### 1. Setup 

Start rqt_console in a new terminal with the following command:
```bash
ros2 run rqt_console rqt_console
```

Now, start turtlesim in a new terminal with the following command:
```bash
ros2 run turtlesim turtlesim_node
```

### 2. Messages on rqt_console 

To produce log messages for rqt_console to display, let’s have the turtle run into the wall. In a new terminal, enter the ros2 topic pub command below:
```bash
ros2 topic pub -r 1 /turtle1/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 2.0, y: 0.0, z: 0.0}, angular: {x: 0.0,y: 0.0,z: 0.0}}"
```

Press `Ctrl+C` in the terminal where you ran the ros2 topic pub command to stop your turtle from running into the wall.

### 3. Set the Default Logger Level 

You can set the default logger level when you first run the `/turtlesim` node using remapping. Enter the following command in your terminal:
```bash
ros2 run turtlesim turtlesim_node --ros-args --log-level WARN
```

Here is a cheat sheet for recording and playing back data using `ros2 bag`, excluding the previously mentioned commands:


## Recording and Playing Back Data in ROS 2 

---

### Managing Topic Data 

#### 1. Setup 

- Start the `/turtlesim` and `/teleop_turtle` nodes.
- Create a directory for saving recordings.

#### 2. Choose a Topic 

- To list available topics in your system, run:
```bash
ros2 topic list
```
    
- To inspect the data of a topic, run:
```bash
ros2 topic echo <topic_name>
```

#### 3. Record Topics 

- Single Topic:  
    Record a single topic:
```bash
ros2 bag record <topic_name>
```
    
- Multiple Topics:  
    Record multiple topics and specify a custom bag file name:
```bash
ros2 bag record -o <file_name> <topic1> <topic2> ...
```
    
- Record All Topics:
```bash
ros2 bag record -a
```
    

#### 4. Inspect Topic Data 

- To see details about a recorded bag file:
```bash
ros2 bag info <bag_file_name>
```

#### 5. Play Topic Data 
- To replay a bag file:
```bash
ros2 bag play <bag_file_name>
```
    

---

### Managing Service Data 

#### 1. Setup 

- Start the `introspection_service` and `introspection_client` nodes with Service Introspection enabled.

#### 2. Check Service Availability 

- List all available services:
```bash
ros2 service list
```
    
- To check if Service Introspection is enabled on a specific service:
```bash
ros2 service echo --flow-style <service_name>
```

#### 3. Record Services 

- Record a Specific Service:
```bash
ros2 bag record --service <service_name>
```
    
- Record All Services:
```
ros2 bag record --all-services
```

#### 4. Inspect Service Data 

- To inspect a recorded service data bag file:
```bash
ros2 bag info <bag_file_name>
```

#### 5. Play Service Data 

- To replay service data from the bag file:
```bash
ros2 bag play --publish-service-requests <bag_file_name>
```

---
title: How to make a pcb
description: 
date: 2024-12-25
tags: 
draft: "true"
---

## Getting Started with PCB Design and Image Editing

To begin, you'll need a basic understanding of electronics and some image editing skills. Here's what you'll need:

### Downloads

1. **[KiCad](https://www.kicad.org/)**: Used for designing the PCB.
2. **[Inkscape](https://inkscape.org/)**: Used for processing the PCB design to make it compatible with CNC software.

Additionally, you can use **Photoshop** for advanced editing, but I’ll be using **[Photopea](https://www.photopea.com/)** a free, browser-based Photoshop alternative.

---

### Drawing the Schematic

Our schematic is simple, so we'll sketch it by hand first:

**Schematic Diagram:**

![](/my-next-blog/images/Pasted%20image%2020241226024552.png)

**Pin Details:**

- **M+, M-**: Motor pins.
- **5V**: Positive 5 volts.
- **GND**: Ground connection.
- **PWM**: Signal from the Arduino.

**Circuit Functionality:**

- This circuit controls motor speed using a PWM signal.
- The **transistor** switches the motor's power source.
- The **diode** protects the circuit from back EMF (electromotive force).
- The **resistor** ensures that the base of the transistor receives the correct voltage to operate within its safe limits, avoiding damage to the transistor.
- The **NPN transistor** allows the Arduino to provide a positive signal directly.

---

### Basics of KiCad

After installing KiCad, open the software. You should see the following interface:

![](/my-next-blog/images/Pasted%20image%2020241226025807.png)

#### Creating a New Project in KiCad

1. Navigate to **File > New Project** or click the **New Project** icon in the toolbar.
    
    ![](/my-next-blog/images/Pasted%20image%2020241226025931.png)
    
2. Select the location where you want to save your project and provide a name for it. Once you save, the following screen will appear:
    
    ![](/my-next-blog/images/Pasted%20image%2020241226081252.png)
    

##### Understanding the New Files

After creating the project, two important files will be generated:

- **.kicad_sch**: This file contains the schematic diagram of the project.
    
- **.kicad_pcb**: This file contains the PCB layout of the project.
    
    ![](/my-next-blog/images/Pasted%20image%2020241226081419.png)
    

We’ll begin by working on the schematic. Once it is completed, we’ll move on to the PCB layout.

---

#### Starting with the Schematic

1. Open the **.kicad_sch** file by double-clicking it. This will open the schematic editor, and the following screen will appear:
    
    ![](/my-next-blog/images/Pasted%20image%2020241226083410.png)
    

##### Overview of the Schematic Editor Interface

1. **Toolbar (Box 1)**
    
    - Provides shortcuts for common actions such as creating, saving, undoing/redoing, zooming, and running the electrical rules check (ERC).
    - Also allows you to switch between different editors (e.g., schematic, PCB, symbol, and footprint editors).
2. **Tools Panel (Box 2)**
    
    - Includes tools for placing components, wires, labels, power symbols, and other elements needed to create your schematic.
    - Contains additional features for managing schematic design, such as creating connections, adding text annotations, or drawing shapes.

Now, you’re ready to start building your schematic! Let’s dive in.

we need to know how the controls work 
#### Mouse Controls

- **Left Click**:  
    Selects components, wires, or other elements.  
    If used on an empty space, it deselects the current selection.
    
- **Right Click**:  
    Opens a context menu with options relevant to the selected item or area.
    
- **Scroll Wheel**:  
    Zooms in and out of the canvas.  
    Hold the scroll wheel and move the mouse to pan around the canvas.

---

### Adding Components to the Schematic

To add components, click on the following icon:  
![](/my-next-blog/images/Pasted%20image%2020241226084528.png)

After a brief loading screen, this window will appear:  
![](/my-next-blog/images/Pasted%20image%2020241226084706.png)

In the search field, type the name of the component you'd like to add. For example, to add a resistor:

- Type **R** in the search field, and the resistor symbol will appear:  
    ![](/my-next-blog/images/Pasted%20image%2020241226084855.png)
- Select the resistor from the results, click **OK**, and place it on the canvas.

Next, follow the same steps to add a diode.

---

### Adding a Component Not Found in KiCad's Library

For certain components, like the 2N2222 transistor, you may not find them in KiCad’s default library. Let’s go through the steps to add a new component to your library.

#### Using SnapEDA to Download Components

1. Open [SnapEDA](https://www.snapeda.com/) and search for the component by name:  
    ![](/my-next-blog/images/Pasted%20image%2020241226092718.png)
2. Select the result that matches the look of your desired component.

Here’s what the component’s page looks like:  
![](/my-next-blog/images/Pasted%20image%2020241226092920.png)

- **Symbol**: Used in the schematic editor.
- **Footprint**: Used in the PCB layout.

#### Downloading the Symbol and Footprint

1. Click the **Download Symbol and Footprint** button. A window will pop up:  
    ![](/my-next-blog/images/Pasted%20image%2020241226101900.png)
2. Select **KiCad** as the format.

> **Note**: You will need to log in or create an account to continue.

3. Choose the appropriate version. For example:  
    ![](/my-next-blog/images/Pasted%20image%2020241226103113.png)  
    If you're using KiCad version 6 or later, select **V6 & Later**.
    
4. After downloading the `.zip` file, create a folder in your documents directory named `KiCad-lib`. This folder will store all your KiCad symbols and footprints.
    
5. Extract the downloaded file into the `KiCad-lib` folder.
    

> **Why this step?**  
> Saving the files in a dedicated library folder ensures they remain accessible, even if the project folder is moved. Without this, KiCad may lose track of the symbols and footprints.

---

### Importing the Symbol into KiCad

1. Open KiCad and go to **Preferences > Manage Symbol Libraries**:  
    ![](/my-next-blog/images/Pasted%20image%2020241229073019.png)
    
2. Click on **Add existing library to table**:  
    ![](/my-next-blog/images/Pasted%20image%2020241229073157.png)
    
3. Navigate to the folder where you extracted the file (`KiCad-lib`) and select the symbol file:  
    ![](/my-next-blog/images/Pasted%20image%2020241229073249.png)
    
4. The library will appear at the end of the table. Click **OK** to save the changes.
    

---

### Adding the Imported Component to the Schematic

Now, when you add a symbol and search for `2N2222`, it will appear in the list:  
![](/my-next-blog/images/Pasted%20image%2020241229073505.png)

Select it, and you’re ready to place the component on your schematic!

after adding all the components the resistor, the diode and the transistor it should look like this:
![](/my-next-blog/images/Pasted%20image%2020241229074606.png)

now how can rotate the component it's pretty easy just select the component and press `R` on the keyboard let me arrange the parts 

here is the parts arranged 
![](/my-next-blog/images/Pasted%20image%2020241229074806.png)
now we have to connect all the parts together with wires so lets do that now

you can press `W` on the keboard or ckilck this icon on the right tool bar:
![](/my-next-blog/images/Pasted%20image%2020241229074957.png)

connect the parts together like this:
![](/my-next-blog/images/Pasted%20image%2020241229075122.png)

now we need the `VCC` and `GND` lets add them with the add symbol as we did with the components and search for VCC and GND 
after adding them and connecting them with wires here is it 
![](/my-next-blog/images/Pasted%20image%2020241229075353.png)
now we can add the connectors for the input and the output 
I connected the VCC and GND to them as shown in below 
![](/my-next-blog/images/Pasted%20image%2020241229075628.png)

now we can connect the rest with wires but it will make a mess so we are going to use labels it's cleaner and more organized 

to add a one press on your keyboard `CTRL + L` or click this icon on the right tool bar 
![](/my-next-blog/images/Pasted%20image%2020241229075851.png)

after click on it will give you a page to name it 
![](/my-next-blog/images/Pasted%20image%2020241229080018.png)
i named it M+ and i will connect it 

and i will add M- and connect it 
![](/my-next-blog/images/Pasted%20image%2020241229080201.png)

now we have to connect them to the input connector so we have to copy and past them the the input connector, and i did it for every thing M+,M-,PWM and laser_readings
![](/my-next-blog/images/Pasted%20image%2020241229080615.png)
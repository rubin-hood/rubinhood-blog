---
date: 01.11.2024
layout: post
title: Installing ESXi in VMware Workstation
excerpt: Installing VMware ESXi in VMware Workstation is a great way to create a virtual test environment for ESXi. Here are the steps to install ESXi as a virtual machine in VMware Workstation
image: /rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/001.jpg
---

Installing VMware ESXi in VMware Workstation is a great way to create a virtual test environment for ESXi. Here are the steps to install ESXi as a virtual machine in VMware Workstation:


### ** 1: Launch VMware Workstation and Start New VM Creation**

Open VMware Workstation Pro and begin creating a new virtual machine. Right-click on **"My Computer"** in the Library panel and select **"New Virtual Machine..."** or click **"Create a New Virtual Machine"** on the Home screen.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/001.jpg)

---

### ** 2: Choose Configuration Type**

In the **New Virtual Machine Wizard**, select the configuration type. For ease of use, choose **Typical (recommended)**, then click **Next** to proceed.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/002.jpg)

---

### ** 3: Select Installation Media**

Choose the installation media for the guest operating system. Select **"Installer disc image file (iso):"** and click **Browse** to locate and select your ISO file (e.g., `ESXi802_CoRE.iso`).

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/003.jpg)

---

### ** 4: Confirm Installation Media**

After selecting the ISO file, confirm the path and click **Next**. VMware might display a warning that the operating system could not be detected. Proceed to manually specify the OS in the next step.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/004.jpg)

---

### ** 5: Select Guest Operating System**

Specify the guest operating system to be installed. Select **VMware ESX** as the guest operating system and choose **VMware ESXi 8** from the version dropdown menu. Click **Next** to continue.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/005.jpg)

---

### ** 6: Name and Locate Virtual Machine**

Enter a name for your virtual machine (e.g., `VMware ESXi 8`) and specify the location where the virtual machine files will be stored. Click **Next** to proceed.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/006.jpg)

---

### ** 7: Specify Disk Capacity**

Set the disk capacity for the virtual machine. Use the recommended size (e.g., **142 GB**) or adjust it based on your needs. Choose to either **Store virtual disk as a single file** or **Split virtual disk into multiple files**, then click **Next**.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/007.jpg)

---

### ** 8: Review and Finalize Configuration**

Review the settings for the new virtual machine. Ensure the configuration meets your requirements (e.g., memory, CPUs, and disk size). If needed, click **"Customize Hardware..."** to make adjustments. Once satisfied, click **Finish** to create the virtual machine.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/008.jpg)

---

### ** 9: Adjust Virtual Machine Hardware**

Open the **Virtual Machine Settings** to adjust hardware settings if necessary. For example:

- Set the memory allocation.
- Select the number of processors.
- Confirm the CD/DVD drive is set to the ISO file or physical drive.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/009.jpg)

---

### ** 10: Enable Virtualization Features**

Under the **Processors** section, ensure the virtualization engine option **"Virtualize Intel VT-x/EPT or AMD-V/RVI"** is enabled. Click **OK** to save the settings and finalize the setup.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/010.jpg)

---

### ** 11: Start Virtual Machine**

Power on the virtual machine by clicking the green **"Play"** button or selecting **"Power on this virtual machine"**. This will start the installation process for VMware ESXi 8.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/011.jpg)

---

### ** 12: Boot VMware ESXi**

The virtual machine begins booting from the selected ISO image. The ESXi installer loads the necessary components, as shown in the progress bar. Wait for the boot process to complete.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/012.jpg)

---

### ** 13: Welcome to VMware ESXi Installer**

The VMware ESXi installer starts. You will see the welcome screen with information about compatibility. Press **Enter** to continue the installation.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/013.jpg)

---

### ** 14: Accept End User License Agreement (EULA)**

Read through the End User License Agreement. To proceed, press **F11** to accept and continue the installation.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/014.jpg)

---

### ** 15: Select Disk for Installation**

Choose the disk where VMware ESXi will be installed. Highlight the desired storage device (e.g., the virtual disk created earlier) and press **Enter** to confirm your selection.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/015.jpg)

---

### ** 16: Select Keyboard Layout**

Select the appropriate keyboard layout for your setup. Use the arrow keys to navigate the list, select your preferred layout (e.g., **US Default**), and press **Enter** to continue.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/016.jpg)

---

### ** 17: Set Root Password**

Enter a secure password for the **root** user. Confirm the password by typing it again. Ensure both fields match, then press **Enter** to proceed.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/017.jpg)

---

### ** 18: Review Warnings**

The system may display warnings about hardware compatibility or virtualization features. Review the warnings and press **Enter** to acknowledge and continue.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/018.jpg)

---

### ** 19: Confirm Installation**

The installer prompts you to confirm the installation. A warning indicates that the selected disk will be repartitioned. Press **F11** to start the installation.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/019.jpg)

---

### ** 20: Installation in Progress**

The ESXi installer begins copying files to the selected disk. A progress bar displays the status of the installation. Wait for the installation to complete.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/020.jpg)

---

### ** 21: Installation Complete**

The VMware ESXi installation is complete. The system displays a message confirming successful installation. Before rebooting, remove the installation media to avoid re-entering the installation process. Press **Enter** to reboot.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/021.jpg)

---

### ** 22: Rebooting the System**

The server begins the reboot process. Wait for the system to shut down and restart. This process may take a few minutes.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/022.jpg)

---

### ** 23: ESXi Boot Screen**

The VMware ESXi boot loader appears, and the system begins loading the ESXi components. Wait for the boot process to complete.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/023.jpg)

---

### ** 24: Uncompressing Modules**

The ESXi kernel starts initializing and uncompressing boot modules. Allow the process to complete without interruption.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/024.jpg)

---

### ** 25: Management Network Display**

The ESXi system has booted successfully. The screen displays the management network details, including the hostname and IP address of the ESXi host. Note the IP address (e.g., **192.168.65.128**) to access the host via a web browser.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/025.jpg)

---

### ** 26: Browser Warning**

When accessing the ESXi Host Client in a web browser, you might see a security warning indicating that the connection is not secure. Click on **"Erweitert" (Advanced)** to proceed to the login page.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/026.jpg)

---

### ** 27: Continue to the Host**

In the browser warning, select the option to proceed to the ESXi host (e.g., **"Weiter zu 192.168.65.128 (unsicher)"**) to access the web interface.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/027.jpg)

---

### ** 28: Login to ESXi Host Client**

The VMware ESXi Host Client login page appears. Enter the **root** username and the password you configured earlier. Click **Login** to access the host management interface.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/028.jpg)

---

### ** 29: ESXi Host Client Interface**

The ESXi Host Client interface loads. Here, you can manage the ESXi host, monitor hardware resources, and configure virtual machines. The dashboard provides an overview of the host’s performance and configuration.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/029.jpg)

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/030.jpg)

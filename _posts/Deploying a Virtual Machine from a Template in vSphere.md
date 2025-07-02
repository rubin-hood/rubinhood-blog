---
date: 01.02.2025
---

# Create a New VM from Template (vSphere)

Here's how you can create a new virtual machine (VM) from an existing template in vSphere.

1. **Open vSphere Web Client**  
   Log in to the vSphere Web Client.

2. **Select the Template**  
   Navigate to **VMs and Templates** from the left menu. Select the desired template (e.g., *VM Vorlage*), right-click on it, and choose **New VM from This Template**.

   ![](../articles/Deploying-a-Virtual-Machine-from-a-Template-in-vSphere/001.jpg)

3. **Set Name and Destination Folder**  
   Enter a name for your new VM (e.g., *Mia Schneider*) and choose the destination folder.

   ![](../articles/Deploying-a-Virtual-Machine-from-a-Template-in-vSphere/002.jpg)

4. **Select Compute Resource**  
   Choose the host or cluster where the VM will run.

   ![](../articles/Deploying-a-Virtual-Machine-from-a-Template-in-vSphere/003.jpg)

5. **Select Storage**  
   Pick the datastore where the VM files will be stored.

   ![](../articles/Deploying-a-Virtual-Machine-from-a-Template-in-vSphere/004.jpg)

6. **Adjust Clone Options**  
   Decide if you want to customize the operating system or hardware. You can also choose to power on the VM after creation.

   ![](../articles/Deploying-a-Virtual-Machine-from-a-Template-in-vSphere/005.jpg)

7. **Customize Guest OS (Optional)**  
   If needed, configure the guest operating system to avoid conflicts.

   ![](../articles/Deploying-a-Virtual-Machine-from-a-Template-in-vSphere/006.jpg)

8. **Customize Hardware (Optional)**  
   Adjust the virtual hardware settings according to your needs.

   ![](../articles/Deploying-a-Virtual-Machine-from-a-Template-in-vSphere/007.jpg)
   ![](../articles/Deploying-a-Virtual-Machine-from-a-Template-in-vSphere/008.jpg)

9. **Review and Finish**  
   Review all settings in the summary and click **Finish** to create the VM.

   ![](../articles/Deploying-a-Virtual-Machine-from-a-Template-in-vSphere/009.jpg)

10. **Done!**  
    Your new VM will be created and visible in the inventory. You can now power it on and further configure it.

    ![](../articles/Deploying-a-Virtual-Machine-from-a-Template-in-vSphere/010.jpg)

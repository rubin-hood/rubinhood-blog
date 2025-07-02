---
date: 04.02.2025
layout: post
title: 
excerpt: 
image: 
---

# Setting up RDP access via GPO for Windows clients

In a Windows Server environment, Remote Desktop Protocol (RDP) is disabled by default for security reasons. To enable RDP access for employees using Windows clients, you need to configure the correct settings via Group Policy (GPO) in Active Directory (AD).  

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/023.jpg)

### Open Active Directory Users and Computers
Open the **Server Manager**, click on **Tools**, and select **Active Directory Users and Computers**.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/001.jpg)

### Organize Users and Computers
Navigate to your domain structure and verify the Organizational Units (OUs) for **Computers** and **Users**.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/002.jpg)

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/003.jpg)

### Add Users to a Security Group
Create or manage a group for Remote Desktop users and add the necessary users.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/004.jpg)

### Open Group Policy Management
In the **Server Manager**, go to **Tools** and select **Group Policy Management**.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/005.jpg)

### Create a New Group Policy Object (GPO)
Create a new GPO named **Allow User Remote Desktop** and link it to the desired OU.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/006.jpg)

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/007.jpg)

### Edit the Group Policy
Right-click on the GPO and select **Edit** to configure it.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/008.jpg)

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/009.jpg)

### Add Users to the Remote Desktop Group
Navigate to **Computer Configuration** → **Policies** → **Windows Settings** → **Security Settings** → **Restricted Groups** and add the required group.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/010.jpg)

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/011.jpg)

### Enable Remote Desktop in the GPO
Go to **Computer Configuration** → **Policies** → **Administrative Templates** → **Windows Components** → **Remote Desktop Services** → **Remote Desktop Session Host** → **Connections** and enable **Allow users to connect remotely using Remote Desktop Services**.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/012.jpg)

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/013.jpg)

### Enable Network Level Authentication
Under **Remote Desktop Services** → **Security**, enable **Require user authentication for remote connections by using Network Level Authentication**.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/014.jpg)

### Configure Firewall Rules for RDP
Under **Windows Defender Firewall with Advanced Security**, create a new **Inbound Rule** for **Remote Desktop**.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/015.jpg)

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/016.jpg)

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/017.jpg)


![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/018.jpg)

### Force Group Policy Update
Run the command gpupdate /force in PowerShell or Command Prompt as an administrator on both the server and the Windows client to immediately apply the new Group Policy settings.

``` gpupdate /force ```

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/019.jpg)

### Test the Remote Desktop Connection
Open **Remote Desktop Connection**, enter the target computer's name, and log in using the appropriate credentials.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/020.jpg)

### Verify Successful Connection
If everything was configured correctly, you should now be able to remotely access the computer.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/021.jpg)

### Remote Desktop Connection in vSphere Client
You can also test the Remote Desktop connection within a virtualized environment like vSphere Client.

### Final Confirmation of Successful RDP Access
If all configurations are correct, the user should now have full Remote Desktop access to the target machine.

![](/rubinhood-blog/assets/img/Setting-up-RDP-access-via-GPO-for-Windows-clients/022.jpg)

Congratulations! Remote Desktop access via Group Policy is now successfully set up.

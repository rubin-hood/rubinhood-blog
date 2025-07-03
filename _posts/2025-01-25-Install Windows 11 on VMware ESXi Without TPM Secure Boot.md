---
date: 25.01.2025
layout: post
title: This PC doesn’t currently meet Windows 11 system requirements
excerpt: This guide shows you how to install Windows 11 on a VMware ESXi virtual machine while bypassing the system requirements (such as TPM and Secure Boot).
image: /rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/001.jpg
---

This guide shows you how to install Windows 11 on a VMware ESXi virtual machine while bypassing the system requirements (such as TPM and Secure Boot).

---

## **Step 1: Boot the Virtual Machine and Start the Installation**

1. **Start the VM**  
   - The VM boots into the **Boot Manager** menu.
   - If it doesn't start automatically, open the console.

2. **Select the Boot Source**  
   - Choose **"EFI VMware Virtual SATA CDROM Drive (0.0)"** to boot from the Windows 11 installation media.

3. **Windows Setup Starts**  
   - After a few seconds, the Windows 11 logo appears, indicating that the installation process has started.

![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/001.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/002.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/003.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/004.jpg)

---

## **Step 2: Bypass the "PC Does Not Meet Requirements" Error**

Without TPM and Secure Boot, the Windows 11 installation will fail.

1. **Error Message Appears**  
   - Windows displays: _"This PC doesn’t currently meet Windows 11 system requirements."_
   - This happens because the VM does not meet the TPM requirement.

2. **Solution: Open the Registry Editor**  
   - Press **Shift + F10** to open the command prompt.
   - Type **`regedit`** and press **Enter**.

![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/005.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/006.jpg)

---

## **Step 3: Modify the Windows Registry to Skip TPM Check**

By changing the Windows registry, you can disable the TPM and Secure Boot verification.

1. **Navigate to the following path in the Registry Editor:**  

---

HKEY_LOCAL_MACHINE\SYSTEM\Setup

2. **Create a New Key Named "LabConfig"**  
- Right-click on **Setup** > **New** > **Key**.
- Name it **LabConfig**.

3. **Add New DWORD Values**  
- Right-click on **LabConfig** > **New** > **DWORD (32-bit) Value**.
- Name the first value **BypassTPMCheck** and set it to `1`.
- (If needed, add more values such as **BypassSecureBootCheck** and **BypassTPMCheck**, also set to `1`.)

4. **Close the Registry Editor and Resume Installation**  
- Close the registry editor and command prompt.
- Start the installation.

![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/007.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/008.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/009.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/010.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/011.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/012.jpg)

---

## **Step 4: Continue the Windows 11 Installation**

1. **Start Windows Setup**  
- After modifying the registry, the installation should proceed without issues.

2. **Select Language and Region**  
- Choose your preferred language and keyboard layout.

3. **Choose Installation Type**  
- Select **"Install Windows 11"**.
- Accept that all data will be erased.

4. **Select Windows 11 Edition**  
- Pick the Windows 11 version you want, such as **Windows 11 Pro**.

5. **Windows 11 Begins Installing**  
- The installation process starts, and Windows 11 is set up on your virtual machine.

---

## **Conclusion**
With this method, you can successfully install Windows 11 on VMware ESXi, even if your VM does not meet the official requirements. The registry hack is a proven way to bypass the system checks and proceed with the installation.

![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/013.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/014.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/015.jpg)
![](/rubinhood-blog/assets/img/Install-Windows-11-on-VMware-ESXi-Without-TPM-Secure-Boot/016.jpg)

## Happy virtualizing!



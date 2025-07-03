---
date: 20.02.2025
layout: post
title: Troubleshooting Windows Server KDC Errors, DNS Issues, and Time Correction
excerpt: RUBIN-HOOD Configuration refresh message The system cannot access one or more event logs because of insufficient access rights, file corruption, or other reasons. For more information, see the Operational channel in the ServerManager-ManagementProvider error log on the target server.
image: /rubinhood-blog/assets/img/Troubleshooting-Windows-Server-KDC-Errors-DNS-Issues-and-Time-Correction/001.jpg
---

<img src="{{ page.image }}" alt="{{ page.title }}" loading="lazy">

![](/rubinhood-blog/assets/img/Troubleshooting-Windows-Server-KDC-Errors-DNS-Issues-and-Time-Correction/001.jpg)

![](/rubinhood-blog/assets/img/Troubleshooting-Windows-Server-KDC-Errors-DNS-Issues-and-Time-Correction/002.jpg)

"RUBIN-HOOD: Configuration refresh message: The system cannot access one or more event logs because of insufficient access rights, file corruption, or other reasons. For more information, see the Operational channel in the ServerManager-ManagementProvider error log on the target server."

## Introduction

Windows Server is a powerful operating system used for various network services, including Active Directory (AD DS), DNS, and IIS. However, errors can sometimes occur, affecting operations. This article explains how a Windows Server experiencing KDC errors, incorrect time synchronization, and DNS issues was successfully fixed.

## **1. The Problem: KDC Errors & DNS Failures**

After setting up a Windows Server with the domain **ad.rubinhood.de**, the following issues were encountered:

- The **KDC (Key Distribution Center) error** prevented successful Kerberos authentications.
- The **Windows Server Manager** displayed errors when updating roles and features.
- The **system time** was incorrect and not synchronizing automatically.

After thorough analysis, the primary cause was found to be **incorrect time settings and a lack of Kerberos synchronization**.

## **2. Solution Steps for Troubleshooting**

### **Step 1: Checking the Server Time**

Incorrect date and time synchronization can cause Kerberos errors. The current time setting was checked using:

```
w32tm /query /status
```

It was found that the server was using its **Local CMOS Clock**, which is problematic in an Active Directory environment.

### **Step 2: Configuring Correct Time Synchronization**

To ensure the server uses a **reliable time source**, synchronization with an external NTP server was configured:

```
w32tm /config /manualpeerlist:"time.windows.com,0x8 ntp1.ptb.de,0x8" /syncfromflags:manual /reliable:YES /update
net stop w32time
net start w32time
w32tm /resync
```

After this configuration, `w32tm /query /status` confirmed that the server was now syncing with **ntp1.ptb.de**.

### **Step 3: Restarting the Windows Time Service**

Since some services only fully apply changes after a restart, the time service was synchronized again using:

```
w32tm /resync /nowait
```

Now, `Get-Date` displayed the correct time in **German format**.

### **Step 4: Verifying the Kerberos Service**

Once the time was synchronized, the **KDC service** status was checked:

```
Get-Service kdc
```

If the service was stopped, it was started manually with:

```
Start-Service kdc
```

### **Step 5: Checking Domain Controller Registration**

Another possible issue is an improperly registered domain controller. This was verified using:

```
nltest /dsgetdc:ad.rubinhood.de
```

If errors appeared, a **reinitialization of the domain role** might be required.

### **Step 6: Restarting the Server**

After applying all configuration changes, the server was restarted. This ensured that **all services (AD DS, DNS, Kerberos, Windows Server Manager) applied the new settings**.

After the restart, the server ran **without errors**, displaying all roles correctly in the Server Manager.

## **3. Conclusion: What Fixed the Issue?**

The primary cause of the issues was **incorrect time synchronization**, leading to Kerberos authentication failures.
By implementing the following measures, the server was successfully restored:

- **Proper NTP synchronization with a reliable time server**
- **Restarting the KDC and time services**
- **Verifying DNS and Active Directory configurations**
- **Rebooting the server to apply all changes**

These steps eliminated **all errors**, and the server is now running smoothly.

---

## **Additional Tips for Preventing Errors**

1. **Regularly check the time source:**
    
    ```
    w32tm /query /status
    ```
    
2. **Monitor Kerberos and DNS status frequently:**
    
    ```
    nltest /dsgetdc:ad.rubinhood.de
    Get-EventLog -LogName System -EntryType Error -Newest 5
    ```
    
3. **Plan a reboot after significant changes (time sync, DNS updates) to ensure proper application**

By following these practices, many common Windows Server issues can be proactively avoided.
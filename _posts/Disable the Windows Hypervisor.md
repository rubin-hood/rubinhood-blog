---
date: 10.06.2022
---

# Disable Nested Virtualization on VMware Workstation with Windows 11**

![Alternativtext](../articles/Disable-the-Windows-Hypervisor/001.png)
![Alternativtext](../articles/Disable-the-Windows-Hypervisor/002.png)

If you encounter the error "VMware Workstation does not support nested virtualization" when starting a virtual machine on Windows 11, the issue often stems from enabled security features like Device Guard, Credential Guard, or the Windows Hypervisor.

## Solution Steps**


### 1. Disable the Windows Hypervisor**

The Windows Hypervisor can block hardware virtualization for VMware. Disable it with this simple command in PowerShell or Command Prompt (run as administrator):

```
bcdedit /set hypervisorlaunchtype off
```

Then restart your system.

### 2. Disable Device Guard and Credential Guard**

If the issue persists, use the DG Readiness Tool to turn off Device Guard and Credential Guard:

![Alternativtext](../articles/Disable-the-Windows-Hypervisor/003.png)

Download the tool and run the following commands:

```
cd C:\Users\user\Downloads\dgreadiness_v3.6

.\DG_Readiness_Tool_v3.6.ps1 -Disable
```

Restart your computer.

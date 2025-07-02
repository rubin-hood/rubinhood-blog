---
date: 13.07.2020
---

# Guide to Network Configuration on Windows Server Datacenter Desktop

This short guide explains how to configure a static IP address and DNS servers and check available IP addresses. The Fritz!Box serves as the gateway and DNS server in this setup.

![](../articles/Network-Configuration-on-Windows-Server-Datacenter-Desktop/004.jpg)

---

## 1. Setting a Static IP Address and DNS

1. **Open Network Connections**:
   - Go to **Control Panel > Network and Internet > Network Connections**.

   ![](../articles/Network-Configuration-on-Windows-Server-Datacenter-Desktop/001.jpg)

2. **Open Adapter Properties**:
   - Right-click on the network adapter and select **Properties**.

3. **Open IPv4 Settings**:
   - Select **Internet Protocol Version 4 (TCP/IPv4)** and click **Properties**.

4. **Enter Static Values**:
   - **IP Address**: 192.168.178.10
   - **Subnet Mask**: 255.255.255.0
   - **Gateway**: 192.168.178.1 (Fritz!Box address)
   - **DNS Servers**:
     - Preferred: 192.168.178.1 (Fritz!Box address)
     - Alternate: 8.8.8.8 (Google DNS)

5. **Save Settings**:
   - Click **OK** to save the changes.

---

## 2. Verify Network Configuration

1. **Open Command Prompt**:
   - Type `ipconfig` to verify the IP address and gateway.

   Example output:

   Ethernet adapter Ethernet:
IPv4 Address. . . . . . . . . . . : 192.168.178.10  
Subnet Mask . . . . . . . . . . . : 255.255.255.0  
Default Gateway . . . . . . . . . : 192.168.178.1  

![](../articles/Network-Configuration-on-Windows-Server-Datacenter-Desktop/002.jpg)
---

## 3. Check Available IP Addresses

1. **Open PowerShell**:
- Run the following script:
  ```powershell
  1..254 | ForEach-Object {
      $ip = "192.168.178.$_"
      if (Test-Connection -ComputerName $ip -Count 1 -Quiet) {
          Write-Output "$ip is in use"
      } else {
          Write-Output "$ip is free"
      }
  }
  ```

2. **Analyze Results**:
- The script will display used and free IP addresses.

Example output:

192.168.178.1 is in use  
192.168.178.2 is free  
192.168.178.10 is in use  

![](../articles/Network-Configuration-on-Windows-Server-Datacenter-Desktop/003.jpg)

---

These steps are specifically tailored for configuring a network with a Fritz!Box on Windows Server Datacenter Desktop.
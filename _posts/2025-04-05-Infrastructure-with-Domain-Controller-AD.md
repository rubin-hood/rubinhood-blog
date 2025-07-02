---
date: 05.04.2025
layout: post
title: VM-Infrastruktur mit AD, Exchange, SQL auf ESXi via Workstation unter Win 11
excerpt: In my IT lab, I have set up a sample network configuration. My entire lab environment consists of several virtualized Windows servers and Windows clients running on VMware ESXi. The entire setup is hosted on a physical Windows 11 machine with VMware Workstation installed, where ESXi 8 runs as a virtual machine.
image: /rubinhood-blog/assets/img/Infrastructure-with-Domain-Controller-AD/001.webp
---

![](/rubinhood-blog/assets/img/Infrastructure-with-Domain-Controller-AD/001.webp)


### **Network Configuration of My Virtual Lab**

In my IT lab, I have set up a sample network configuration. My entire lab environment consists of several virtualized Windows servers and Windows clients running on VMware ESXi. The entire setup is hosted on a physical Windows 11 machine with VMware Workstation installed, where ESXi 8 runs as a virtual machine.

---

# 🌐 **Windows Server 2025 (AD & Domain Controller)**

### 🖥 **Server Details**

- **🆔 Hostname:** `RUBINHOOD`
- **🔧 Function:** Active Directory Domain Controller
- **🌍 Domain:** `ad.rubinhood.de`
- **🌐 DNS Server:** `192.168.178.2`

### 👥 **User Management (OU Structure)**

📂 **OU=Department**

- 🖥 **OU=Computer:** Contains Windows client PCs (`AS682`, `MS743`, `PW578`, `TB929`).
- 👤 **OU=User:** Contains users (`Anna Schmidt`, `Mia Schneider`, `Paul Weber`, `Tom Bauer`).

📂 **OU=Department**

- 🖥 **OU=Computer:** Contains Windows servers (`EXCHANGE`, `SQL`).
- 👤 **OU=User:** Contains users (`EXCHANGESVR`, `SQLSVR`).

- **Add Roles and Features Wizard**
    
    ### **Server Roles**
    
    - Active Directory Domain Services
    - DNS Server
    - File and Storage Services
    - Web Server (IIS)
    
    ### **Features**
    
    - .NET Framework 3.5 Features
    - .NET Framework 4.8 Features
    - Group Policy Management
    - Microsoft Defender Antivirus
    - Remote Server Administration Tools
    - RPC over HTTP Proxy
    - System Data Archiver
    - Windows Admin Center Setup
    - Windows Identity Foundation 3.5
    - Windows Internal Database
    - Windows PowerShell
    - Windows Process Activation Service
    - Windows Search Service
    - Windows Server Backup
    - Wireless LAN Service
    - WoW64 Support
    - XPS Viewer

---

# 📊 **Windows Server 2025 for SQL Server**

### 🖥 **Server Details**

- **🆕 Status:** Freshly installed, SQL Server not yet installed.
- **🆔 Hostname:** `SQL`
- **📌 Static IP Address:** `192.168.178.3`
- **🏢 Domain Member:** Joined to domain `ad.rubinhood.de`.

- **Add Roles and Features Wizard**
    
    ### **Server Roles**
    
    - File and Storage Services
    - Web Server (IIS)
    
    ### **Features**
    
    - .NET Framework 3.5 Features
    - .NET Framework 4.8 Features
    - Message Queuing
    - Microsoft Defender Antivirus
    - Remote Server Administration Tools
    - RPC over HTTP Proxy
    - System Data Archiver
    - Windows Admin Center Setup
    - Windows Identity Foundation 3.5
    - Windows Internal Database
    - Windows PowerShell
    - Windows Process Activation Service
    - Windows Search Service
    - Wireless LAN Service
    - WoW64 Support
    - XPS Viewer

---

# 📧 **Windows Server 2025 for Exchange Server**

### 🖥 **Server Details**

- **🆕 Status:** Freshly installed, Exchange Server not yet installed.
- **🆔 Hostname:** `EXCHANGE`
- **📌 Static IP Address:** `192.168.178.4`
- **🏢 Domain Member:** Joined to domain `ad.rubinhood.de`.

- **Add Roles and Features Wizard**
    
    ### **Server Roles**
    
    - File and Storage Services
    - Web Server (IIS)
    
    ### **Features**
    
    - .NET Framework 3.5 Features
    - .NET Framework 4.8 Features
    - Media Foundation
    - Microsoft Defender Antivirus
    - Message Queuing
    - RPC over HTTP Proxy
    - Remote Server Administration Tools
    - System Data Archiver
    - Windows Admin Center Setup
    - Windows Identity Foundation 3.5
    - Windows Internal Database
    - Windows PowerShell
    - Windows Process Activation Service
    - Wireless LAN Service
    - WoW64 Support
    - XPS Viewer

## **1. Network Topology**

The network follows a **unified subnet structure**, managed by a **Fritz!Box (192.168.178.1)** as the primary router. Access to the virtual machines is centralized through a **vCenter Server**, simplifying management. The key servers in this environment include:

- **Domain Controller with Active Directory (Windows Server 2025)**
- **Exchange Server (Windows Server 2025 with Exchange)**
- **SQL Server (Windows Server 2025 with Microsoft SQL Server)**
- **Windows clients, all joined to the domain**

Each server has a **static IP address**, while clients receive **dynamic IPs via DHCP**.

---

## **2. IP Addressing and Network Configuration**

All server network configurations use static IP addresses to ensure stable communication within the domain.

| Server              | Hostname   | IP-Adresse       | Gateway        | DNS-Server       |
|---------------------|------------|------------------|----------------|------------------|
| Domain Controller   | RUBINHOOD  | 192.168.178.2     | 192.168.178.1  | 192.168.178.2    |
| Exchange Server     | EXCHANGE   | 192.168.178.4     | 192.168.178.1  | 192.168.178.2    |
| SQL Server          | SQL        | 192.168.178.3     | 192.168.178.1  | 192.168.178.2    |
| Windows Client      | TB929      | DHCP (192.168.178.X) | 192.168.178.1 | 192.168.178.2    |


- **Gateway:** `192.168.178.1` → My **Fritz!Box** acts as the network router.
- **DNS Server:** `192.168.178.2` → The **domain controller** handles DNS resolution, ensuring proper communication within the `ad.rubinhood.de` domain.

---

## **3. Domain Integration of the Servers**

All servers and clients are integrated into the **ad.rubinhood.de** domain. The network settings are configured via IPv4 settings in Windows:

- **Static IP addresses are assigned to servers** to ensure reliable communication.
- **The domain controller acts as the primary DNS server**, managing the domain structure.
- **Each server has a registered hostname**, allowing services such as Exchange and SQL to function seamlessly.

Windows clients, such as `TB929`, receive **dynamic IP addresses via DHCP** but are still joined to the domain. This ensures smooth connectivity with the Exchange and SQL servers.

---

## **4. Conclusion**

This network configuration provides a **stable and well-structured foundation** for my IT lab. With **clear IP addressing, an Active Directory domain, and proper server integration**, my setup runs efficiently and reliably. This structure allows me to **test and simulate enterprise-level networks** with real Windows servers and clients.

---

This is my current network setup—stay tuned for future updates as I expand and experiment with new configurations!


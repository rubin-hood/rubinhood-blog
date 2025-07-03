---
date: 05.04.2025
layout: post
title: VM-Infrastruktur mit AD, Exchange, SQL auf ESXi via Workstation unter Win 11
excerpt: In meinem IT-Labor habe ich eine beispielhafte Netzwerkumgebung eingerichtet. Die gesamte Umgebung besteht aus mehreren virtualisierten Windows-Servern und Clients, die auf VMware ESXi laufen – gehostet auf einem physischen Windows-11-System mit VMware Workstation.
image: /rubinhood-blog/assets/img/Infrastructure-with-Domain-Controller-AD/001.webp
---

<img src="{{ page.image }}" alt="{{ page.title }}" loading="lazy">

![](/rubinhood-blog/assets/img/Infrastructure-with-Domain-Controller-AD/001.webp)

---

### 🧪 **Netzwerkkonfiguration meines virtuellen Labors**

In meinem LAB habe ich eine beispielhafte Netzwerkumgebung aufgebaut. Die gesamte Lab-Umgebung besteht aus mehreren virtualisierten Windows-Servern und Windows-Clients, die auf **VMware ESXi 8** betrieben werden. Die ESXi-Installation läuft dabei als virtuelle Maschine auf einer physischen **Windows-11-Workstation** mit **VMware Workstation**.

---

# 🌐 **Windows Server 2025 (AD & Domänencontroller)**

### 🖥️ **Serverdetails**

- **🆔 Hostname:** `RUBINHOOD`
- **🔧 Funktion:** Active Directory Domain Controller
- **🌍 Domäne:** `ad.rubinhood.de`
- **🌐 DNS-Server:** `192.168.178.2`

### 👥 **Benutzerverwaltung (OU-Struktur)**

📂 **OU=Department**

- 🖥️ **OU=Computer:** Enthält Windows-Clients (`AS682`, `MS743`, `PW578`, `TB929`)
- 👤 **OU=User:** Enthält Benutzerkonten (`Anna Schmidt`, `Mia Schneider`, `Paul Weber`, `Tom Bauer`)

📂 **OU=Department**

- 🖥️ **OU=Computer:** Enthält Windows-Server (`EXCHANGE`, `SQL`)
- 👤 **OU=User:** Enthält Dienstkonten (`EXCHANGESVR`, `SQLSVR`)

- **Assistent für Rollen und Features hinzufügen**
    
    ### 🧩 **Serverrollen**
    
    - Active Directory-Verbunddienste
    - DNS-Server
    - Datei- und Speicherdienste
    - Webserver (IIS)
    
    ### 🔧 **Features**
    
    - .NET Framework 3.5 / 4.8
    - Gruppenrichtlinienverwaltung
    - Microsoft Defender Antivirus
    - Remote Server-Verwaltungstools
    - RPC über HTTP Proxy
    - System Data Archiver
    - Windows Admin Center
    - Windows Identity Foundation 3.5
    - Windows Internal Database
    - PowerShell
    - Windows Process Activation Service
    - Windows-Suche
    - Windows Server Backup
    - WLAN-Dienst
    - WoW64-Unterstützung
    - XPS Viewer

---

# 📊 **Windows Server 2025 für SQL Server**

### 🖥️ **Serverdetails**

- **🆕 Status:** Frisch installiert, SQL Server noch nicht installiert
- **🆔 Hostname:** `SQL`
- **📌 Statische IP:** `192.168.178.3`
- **🏢 Domänenmitglied:** `ad.rubinhood.de`

- **Assistent für Rollen und Features hinzufügen**
    
    ### 🧩 **Serverrollen**
    
    - Datei- und Speicherdienste
    - Webserver (IIS)
    
    ### 🔧 **Features**
    
    - .NET Framework 3.5 / 4.8
    - Message Queuing
    - Microsoft Defender Antivirus
    - Remote Server-Verwaltungstools
    - RPC über HTTP Proxy
    - System Data Archiver
    - Windows Admin Center
    - Windows Identity Foundation 3.5
    - Windows Internal Database
    - PowerShell
    - Windows Process Activation Service
    - Windows-Suche
    - WLAN-Dienst
    - WoW64-Unterstützung
    - XPS Viewer

---

# 📧 **Windows Server 2025 für Exchange Server**

### 🖥️ **Serverdetails**

- **🆕 Status:** Frisch installiert, Exchange Server noch nicht installiert
- **🆔 Hostname:** `EXCHANGE`
- **📌 Statische IP:** `192.168.178.4`
- **🏢 Domänenmitglied:** `ad.rubinhood.de`

- **Assistent für Rollen und Features hinzufügen**
    
    ### 🧩 **Serverrollen**
    
    - Datei- und Speicherdienste
    - Webserver (IIS)
    
    ### 🔧 **Features**
    
    - .NET Framework 3.5 / 4.8
    - Media Foundation
    - Microsoft Defender Antivirus
    - Message Queuing
    - RPC über HTTP Proxy
    - Remote Server-Verwaltungstools
    - System Data Archiver
    - Windows Admin Center
    - Windows Identity Foundation 3.5
    - Windows Internal Database
    - PowerShell
    - Windows Process Activation Service
    - WLAN-Dienst
    - WoW64-Unterstützung
    - XPS Viewer

---

## 🌐 **1. Netzwerktopologie**

Das Netzwerk nutzt eine **einheitliche Subnetz-Struktur**, verwaltet durch eine **Fritz!Box (192.168.178.1)** als Haupt-Router. Die Verwaltung der VMs erfolgt zentral über einen **vCenter Server**.

### Hauptserver:

- 🧩 **Domänencontroller mit AD (Windows Server 2025)**
- 📧 **Exchange-Server (Windows Server 2025)**
- 🗃️ **SQL-Server (Windows Server 2025)**
- 💻 **Windows-Clients, alle der Domäne beigetreten**

Jeder Server nutzt eine **statische IP-Adresse**, während die Clients per **DHCP** eine dynamische Adresse erhalten.

---

## 📐 **2. IP-Adressierung & Netzwerkeinstellungen**

| Server              | Hostname   | IP-Adresse         | Gateway         | DNS-Server       |
|---------------------|------------|--------------------|-----------------|------------------|
| Domänencontroller   | RUBINHOOD  | 192.168.178.2       | 192.168.178.1   | 192.168.178.2    |
| Exchange Server     | EXCHANGE   | 192.168.178.4       | 192.168.178.1   | 192.168.178.2    |
| SQL Server          | SQL        | 192.168.178.3       | 192.168.178.1   | 192.168.178.2    |
| Windows-Client      | TB929      | DHCP (192.168.178.X) | 192.168.178.1   | 192.168.178.2    |

- **Gateway:** `192.168.178.1` → Die **Fritz!Box** dient als Router
- **DNS:** `192.168.178.2` → Der **Domänencontroller** verwaltet die DNS-Auflösung

---

## 🏢 **3. Domänenintegration der Server**

Alle Server und Clients sind Mitglied der Domäne `ad.rubinhood.de`. Die Netzwerkeinstellungen sind über die **IPv4-Konfiguration** festgelegt:

- Server erhalten **feste IPs** für stabile Kommunikation  
- Der **Domänencontroller agiert als DNS-Server**  
- Jeder Server hat einen eindeutigen **Hostname**  
- Clients wie `TB929` erhalten ihre IPs per **DHCP**, sind aber ebenfalls der Domäne beigetreten

---

## ✅ **4. Fazit**

Diese Netzwerkkonfiguration bietet eine **stabile, strukturierte Basis** für mein Labor. Mit **klarer IP-Struktur**, einer funktionierenden **Active-Directory-Domäne** und sauber eingebundenen Serverrollen kann ich produktiv arbeiten und komplexe Unternehmensnetzwerke simulieren.

---

Dies ist mein aktuelles Setup – bleib dran für Updates, wenn ich die Umgebung erweitere oder neue Komponenten teste!

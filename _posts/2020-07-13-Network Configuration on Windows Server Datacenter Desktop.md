---
date: 13.07.2020
layout: post
title: Anleitung zur Netzwerkkonfiguration auf Windows Server Datacenter Desktop
excerpt: Diese kurze Anleitung erklärt, wie du eine statische IP-Adresse und DNS-Server konfigurierst und verfügbare IP-Adressen überprüfst. Die Fritz!Box dient in diesem Setup als Gateway und DNS-Server.
---

Diese kurze Anleitung erklärt, wie du eine statische IP-Adresse und DNS-Server konfigurierst und verfügbare IP-Adressen überprüfst. Die Fritz!Box dient in diesem Setup als Gateway und DNS-Server.

<img src="/rubinhood-blog/assets/img/Network-Configuration-on-Windows-Server-Datacenter-Desktop/004.jpg" alt="Netzwerkkonfiguration" loading="lazy">

---

## 1. Statische IP-Adresse und DNS festlegen

1. **Netzwerkverbindungen öffnen**:
   - Gehe zu **Control Panel > Network and Internet > Network Connections**.

   ![](/rubinhood-blog/assets/img/Network-Configuration-on-Windows-Server-Datacenter-Desktop/001.jpg)

2. **Adaptereigenschaften öffnen**:
   - Klicke mit der rechten Maustaste auf den Netzwerkadapter und wähle **Properties**.

3. **IPv4-Einstellungen öffnen**:
   - Wähle **Internet Protocol Version 4 (TCP/IPv4)** und klicke auf **Properties**.

4. **Statische Werte eintragen**:
   - **IP Address**: 192.168.178.10  
   - **Subnet Mask**: 255.255.255.0  
   - **Gateway**: 192.168.178.1 (Fritz!Box-Adresse)  
   - **DNS Servers**:  
     - Preferred: 192.168.178.1 (Fritz!Box-Adresse)  
     - Alternate: 8.8.8.8 (Google DNS)

5. **Einstellungen speichern**:
   - Klicke auf **OK**, um die Änderungen zu speichern.

---

## 2. Netzwerkkonfiguration überprüfen

1. **Command Prompt öffnen**:
   - Gib `ipconfig` ein, um IP-Adresse und Gateway zu überprüfen.

   Beispielausgabe:

   Ethernet adapter Ethernet:  
IPv4 Address. . . . . . . . . . . : 192.168.178.10  
Subnet Mask . . . . . . . . . . . : 255.255.255.0  
Default Gateway . . . . . . . . . : 192.168.178.1  

![](/rubinhood-blog/assets/img/Network-Configuration-on-Windows-Server-Datacenter-Desktop/002.jpg)

---

## 3. Verfügbare IP-Adressen prüfen

1. **PowerShell öffnen**:
- Führe folgendes Skript aus:

  ```
  1..254 | ForEach-Object {
      $ip = "192.168.178.$_"
      if (Test-Connection -ComputerName $ip -Count 1 -Quiet) {
          Write-Output "$ip is in use"
      } else {
          Write-Output "$ip is free"
      }
  }
  
  ```


2. **Ergebnisse analysieren**:
- Das Skript zeigt belegte und freie IP-Adressen an.

Beispielausgabe:

192.168.178.1 is in use  
192.168.178.2 is free  
192.168.178.10 is in use  

![](/rubinhood-blog/assets/img/Network-Configuration-on-Windows-Server-Datacenter-Desktop/003.jpg)

---

Diese Schritte sind speziell auf die Netzwerkkonfiguration mit einer Fritz!Box unter Windows Server Datacenter Desktop zugeschnitten.
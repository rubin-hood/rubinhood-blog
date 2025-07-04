---
date: 24.04.2025
layout: post
title: Überblick über die Server-Infrastruktur
excerpt: Hier findest du ein Beispiel für eine durchdachte Serverlandschaft, wie sie in Unternehmen eingesetzt wird – mit klar definierten Rollen, empfohlener Hardware und passender Software.
image: /rubinhood-blog/assets/img/Server-Infrastruktur-im-Ueberblick/001.webp
---

![Alternativtext](/rubinhood-blog/assets/img/Server-Infrastruktur-im-Ueberblick/001de.svg)

Du lernst gerade, wie moderne IT-Infrastrukturen aufgebaut sind? Dann ist dieser Überblick genau das Richtige für dich.

Hier findest du ein Beispiel für eine durchdachte Serverlandschaft, wie sie in Unternehmen eingesetzt wird – mit klar definierten Rollen, empfohlener Hardware und passender Software. Jeder Servertyp erfüllt einen bestimmten Zweck: von Benutzerverwaltung und Virtualisierung bis hin zu Backup, Speicher oder Monitoring.

Auch die Software-Komponenten sind aufgeführt – inklusive kurzer Erklärungen, **wofür sie genutzt werden und wie sie zusammenspielen**.

Ob du gerade erst anfängst oder dein Wissen vertiefen willst: Dieser Überblick hilft dir, die Zusammenhänge besser zu verstehen und theoretisch eigene Infrastrukturen zu planen.

🖥️ Server | 💽 Speicher | 🌐 Netzwerk | 📼 Backup | 🔋 Stromversorgung

---

### 🖥️ Haupt-Virtualisierungsserver 1

🧰 **Empfohlene Geräte:**

→ 🖥️ Dell PowerEdge R760 (hohe Dichte, aktueller Xeon, ideal für Virtualisierung)

→ 🖥️ Lenovo ThinkSystem SR650 V3

→ 🖥️ HPE ProLiant DL380 Gen11

🧠 **Software & Dienste:**

→ 🧩 **VMware ESXi 8:** Virtualisierungshost für den Betrieb mehrerer VMs auf einer Hardware

→ 🧩 **Windows Server 2025 mit AD DS:** Zentrale Benutzer- und Rechteverwaltung innerhalb einer Domäne

→ 🧩 **DNS-Server:** Namensauflösung im internen Netzwerk (z. B. server01.domain.local → IP-Adresse)

---

### 🖥️ Haupt-Virtualisierungsserver 2

🧰 **Empfohlene Geräte:**

→ 🖥️ Dell PowerEdge R760

→ 🖥️ Fujitsu PRIMERGY RX2540 M6

→ 🖥️ Cisco UCS C240 M6

🧠 **Software & Dienste:**

→ 🧩 **VMware ESXi 8:** Virtualisierung mehrerer Serverdienste

→ 🧩 **Microsoft SQL Server:** Datenbankplattform für Anwendungen, Berichte und Unternehmensdaten

→ 🧩 **SQL Server Management Studio (SSMS):** Verwaltungsoberfläche für SQL-Datenbanken und Abfragen

---

### 🖥️ Haupt-Virtualisierungsserver 3

🧰 **Empfohlene Geräte:**

→ 🖥️ Dell PowerEdge R750

→ 🖥️ Supermicro SYS-620U

→ 🖥️ HPE ProLiant DL385 Gen11

🧠 **Software & Dienste:**

→ 🧩 **VMware ESXi 8:** Host für Exchange- und Dateidienste

→ 🧩 **Microsoft Exchange Server:** Unternehmensweite E-Mail- und Kalenderlösung

→ 🧩 **Outlook Web Access (OWA):** Webbasierter Zugriff auf E-Mails

→ 🧩 **Datei- und Druckserver:** Gemeinsamer Zugriff auf Dateien und Netzwerkdrucker

---

### 🗄️ Backup- / Datenbankserver

🧰 **Empfohlene Geräte:**

→ 🖥️ Lenovo ThinkSystem SR650 V3

→ 🖥️ Dell PowerEdge R760xd (große Speichererweiterung möglich)

→ 🖥️ HPE ProLiant DL385 Gen10 Plus

🧠 **Software & Dienste:**

→ 🧩 **VMware ESXi 8 oder Windows Server:** Virtualisierungsplattform oder natives Backup-System

→ 🧩 **Veeam Backup & Replication:** Sicherung und Wiederherstellung von VMs und physischen Systemen

→ 🧩 **Microsoft SQL Server (optional):** Zentrale Datenspeicherung für Anwendungen oder Logs

→ 🧩 **PRTG oder Zabbix:** Überwachung von Netzwerk und Infrastruktur

---

### 🧪 Test- & Monitoring-Server

🧰 **Empfohlene Geräte:**

→ 🖥️ Dell PowerEdge R540

→ 🖥️ HPE ProLiant DL20 Gen10 Plus

→ 🖥️ Fujitsu PRIMERGY TX1320 M5

🧠 **Software & Dienste:**

→ 🧩 **VMware ESXi 6.7 oder Linux (Debian, Ubuntu):** Günstige Testumgebung für neue Dienste

→ 🧩 **Zabbix oder PRTG:** Netzwerk- und Systemüberwachung

→ 🧩 **Snipe-IT:** IT-Asset-Management für Hardware- und Lizenzverwaltung

→ 🧩 **Testumgebungen:** Isolierte Entwicklungs- oder Upgrade-Tests

---

### 🚀 SAN – Hochgeschwindigkeitsspeicher

🧰 **Empfohlene Geräte:**

→ 🖥️ IBM FlashSystem 5200

→ 🖥️ NetApp AFF A250

→ 🖥️ Dell EMC PowerMax 2500

🧠 **Software & Dienste:**

→ 🧩 **Management-System:** Herstellerspezifische Web-/CLI-Verwaltung (z. B. ONTAP, Unisphere)

→ 🧩 **iSCSI oder Fibre Channel:** Leistungsstarker Blockzugriff für VMs

→ 🧩 **Multipathing / MPIO:** Redundanz und Lastverteilung beim Speicherzugriff

→ 🧩 **Datastore für Produktions-VMs:** Hauptspeicherort für VM-Datenträger

---

### 💽 NAS – Massenspeicher

🧰 **Empfohlene Geräte:**

→ 🖥️ HPE Apollo 4200 Gen10 Plus

→ 🖥️ Dell PowerVault NX3240

→ 🖥️ Synology SA3600

🧠 **Software & Dienste:**

→ 🧩 **ZFS, TrueNAS oder HPE Storage Software:** Sicheres, flexibles Speichermanagement

→ 🧩 **SMB-Freigaben:** Dateifreigaben für Windows-Umgebungen

→ 🧩 **NFS oder iSCSI:** Speicherbereitstellung für ESXi-Hosts

→ 🧩 **Snapshots / Replikation:** Schutz und Vervielfältigung von Datenständen

---

### 📼 Langzeit-Backup

🧰 **Empfohlene Geräte:**

→ 🖥️ HPE StoreEver MSL3040

→ 🖥️ IBM TS4300 Tape Library

→ 🖥️ Quantum Scalar i6

🧠 **Software & Dienste:**

→ 🧩 **Veeam Backup & Replication:** Unterstützung für Tape-Backups und Archivierung

→ 🧩 **Archivierung auf Band:** Langzeitaufbewahrung auf LTO-Medien

→ 🧩 **Langfristige Datenaufbewahrung:** Einhaltung gesetzlicher Aufbewahrungsfristen

---

### 🌐 Netzwerk – Switching & Routing

🧰 **Empfohlene Geräte:**

→ 🖥️ Cisco Catalyst 9300X

→ 🖥️ Aruba 6300F Serie

→ 🖥️ Juniper EX4400

🧠 **Software & Dienste:**

→ 🧩 **Cisco IOS / ArubaOS / JunOS:** Switch-Betriebssysteme für Unternehmensnetzwerke

→ 🧩 **CLI oder Web-Interface:** Verwaltung und Konfiguration

→ 🧩 **VLANs / QoS:** Segmentierung und Priorisierung im Netzwerk

→ 🧩 **Netzwerkmanagement-Systeme:** Zentrale Überwachung und Automatisierung

---

### 🔥 Firewall – Netzwerksicherheit

🧰 **Empfohlene Geräte:**

→ 🖥️ Fortinet FortiGate 100F

→ 🖥️ Netgate 6100 (pfSense Plus)

→ 🖥️ Cisco Firepower 1120

🧠 **Software & Dienste:**

→ 🧩 **FortiOS / pfSense / Firepower:** Sicherheitsbetriebssysteme mit Layer-7-Funktionen

→ 🧩 **Stateful Firewall:** Paketprüfung mit Verbindungstracking

→ 🧩 **VPN (IPsec, OpenVPN):** Sicherer Fernzugriff

→ 🧩 **IDS/IPS, Webfilter:** Bedrohungserkennung und Inhaltskontrolle

→ 🧩 **Zentrales Management:** z. B. mit FortiManager oder pfSense HA

---

### 🔋 USV – Stromversorgung

🧰 **Empfohlene Geräte:**

→ 🖥️ APC Smart-UPS SRT-Serie

→ 🖥️ Eaton 9PX G2

→ 🖥️ Vertiv Liebert GXT5

🧠 **Software & Dienste:**

→ 🧩 **PowerChute Business Edition:** Überwachung & automatisches Herunterfahren

→ 🧩 **Stromausfallschutz:** Absicherung gegen Unterbrechungen und Stromspitzen

→ 🧩 **Batterieüberwachung via SNMP:** Zentrale Statusmeldungen und Integration ins Monitoringsystem

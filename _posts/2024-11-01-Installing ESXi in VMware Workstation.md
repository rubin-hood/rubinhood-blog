---
date: 01.11.2024
layout: post
title: ESXi in VMware Workstation installieren
excerpt: Die Installation von VMware ESXi in VMware Workstation ist eine hervorragende Möglichkeit, eine virtuelle Testumgebung für ESXi zu erstellen. Hier sind die Schritte, um ESXi als virtuelle Maschine in VMware Workstation zu installieren.
image: /rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/001.jpg
---

Die Installation von VMware ESXi in VMware Workstation ist eine hervorragende Möglichkeit, eine virtuelle Testumgebung für ESXi zu erstellen. Hier sind die Schritte, um ESXi als virtuelle Maschine in VMware Workstation zu installieren:

### **1: VMware Workstation starten und neue VM erstellen**

Öffne VMware Workstation Pro und beginne mit dem Erstellen einer neuen virtuellen Maschine. Klicke mit der rechten Maustaste auf **"My Computer"** im Library-Bereich und wähle **"New Virtual Machine..."** oder klicke auf **"Create a New Virtual Machine"** auf dem Startbildschirm.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/001.jpg)

---

### **2: Konfigurationstyp auswählen**

Im **New Virtual Machine Wizard** wählst du den Konfigurationstyp aus. Für eine einfache Einrichtung empfiehlt sich **Typical (recommended)**. Klicke dann auf **Next**, um fortzufahren.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/002.jpg)

---

### **3: Installationsmedium auswählen**

Wähle das Installationsmedium für das Gastbetriebssystem. Aktiviere **"Installer disc image file (iso):"** und klicke auf **Browse**, um deine ISO-Datei (z. B. `ESXi802_CoRE.iso`) auszuwählen.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/003.jpg)

---

### **4: Installationsmedium bestätigen**

Nachdem du die ISO-Datei ausgewählt hast, bestätige den Pfad und klicke auf **Next**. VMware könnte eine Warnung anzeigen, dass das Betriebssystem nicht erkannt wurde. Fahre in diesem Fall manuell fort.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/004.jpg)

---

### **5: Gastbetriebssystem auswählen**

Wähle das zu installierende Gastbetriebssystem aus. Gib **VMware ESX** als Betriebssystem an und wähle **VMware ESXi 8** aus dem Dropdown-Menü. Klicke auf **Next**, um fortzufahren.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/005.jpg)

---

### **6: Virtuelle Maschine benennen und Speicherort wählen**

Gib einen Namen für deine virtuelle Maschine ein (z. B. `VMware ESXi 8`) und lege den Speicherort für die Dateien fest. Klicke auf **Next**, um weiterzumachen.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/006.jpg)

---

### **7: Festplattengröße festlegen**

Lege die Kapazität der virtuellen Festplatte fest. Verwende die empfohlene Größe (z. B. **142 GB**) oder passe sie nach Bedarf an. Wähle, ob du **Store virtual disk as a single file** oder **Split virtual disk into multiple files** verwenden möchtest. Klicke auf **Next**.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/007.jpg)

---

### **8: Konfiguration überprüfen und abschließen**

Überprüfe die Einstellungen deiner neuen VM. Stelle sicher, dass Speicher, CPU und Festplattengröße deinen Anforderungen entsprechen. Klicke ggf. auf **"Customize Hardware..."**, um Anpassungen vorzunehmen. Klicke auf **Finish**, um die VM zu erstellen.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/008.jpg)

---

### **9: Hardwareeinstellungen anpassen**

Öffne die **Virtual Machine Settings**, um bei Bedarf Hardwareanpassungen vorzunehmen:

- Speichergröße festlegen  
- Anzahl der Prozessoren wählen  
- Prüfen, ob das CD/DVD-Laufwerk korrekt auf ISO-Datei oder physisches Laufwerk zeigt

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/009.jpg)

---

### **10: Virtualisierungsfunktionen aktivieren**

Im Bereich **Processors** aktivierst du die Option **"Virtualize Intel VT-x/EPT or AMD-V/RVI"**. Klicke auf **OK**, um die Einstellungen zu speichern.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/010.jpg)

---

### **11: Virtuelle Maschine starten**

Starte die VM über den grünen **"Play"**-Button oder wähle **"Power on this virtual machine"**. Die Installation von VMware ESXi 8 beginnt.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/011.jpg)

---

### **12: VMware ESXi booten**

Die VM startet vom ISO-Image. Der ESXi-Installer lädt die notwendigen Komponenten. Warte, bis der Bootvorgang abgeschlossen ist.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/012.jpg)

---

### **13: Willkommen beim VMware ESXi Installer**

Der Installer startet mit einer Willkommensseite. Drücke **Enter**, um die Installation zu beginnen.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/013.jpg)

---

### **14: Lizenzvereinbarung akzeptieren**

Lies die Endbenutzer-Lizenzvereinbarung. Drücke **F11**, um zuzustimmen und fortzufahren.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/014.jpg)

---

### **15: Festplatte für die Installation auswählen**

Wähle die Festplatte aus, auf der VMware ESXi installiert werden soll (z. B. die zuvor erstellte virtuelle Festplatte) und drücke **Enter**.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/015.jpg)

---

### **16: Tastaturlayout auswählen**

Wähle das passende Tastaturlayout (z. B. **US Default**) aus der Liste und drücke **Enter**.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/016.jpg)

---

### **17: Root-Passwort setzen**

Vergib ein sicheres Passwort für den **root**-Benutzer. Gib das Passwort zur Bestätigung erneut ein und drücke **Enter**.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/017.jpg)

---

### **18: Warnungen überprüfen**

Möglicherweise erscheinen Hinweise zu Hardwarekompatibilität. Lies sie durch und drücke **Enter**, um fortzufahren.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/018.jpg)

---

### **19: Installation bestätigen**

Der Installer fordert zur Bestätigung der Installation auf. Drücke **F11**, um zu starten. Der gewählte Datenträger wird neu partitioniert.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/019.jpg)

---

### **20: Installation läuft**

Die ESXi-Installationsdateien werden kopiert. Ein Fortschrittsbalken zeigt den aktuellen Stand an.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/020.jpg)

---

### **21: Installation abgeschlossen**

Die Installation ist abgeschlossen. Entferne das Installationsmedium, bevor du neu startest. Drücke **Enter**, um den Neustart durchzuführen.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/021.jpg)

---

### **22: System wird neu gestartet**

Der Server fährt herunter und startet neu. Dieser Vorgang kann einige Minuten dauern.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/022.jpg)

---

### **23: ESXi-Bootbildschirm**

Der Bootloader von VMware ESXi erscheint und lädt die Komponenten. Warte, bis der Bootvorgang abgeschlossen ist.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/023.jpg)

---

### **24: Module werden entpackt**

Der Kernel von ESXi wird initialisiert und entpackt die Bootmodule. Warte, bis der Vorgang abgeschlossen ist.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/024.jpg)

---

### **25: Anzeige der Verwaltungsnetzwerkdaten**

Das System ist gestartet und zeigt Netzwerkdetails wie Hostname und IP-Adresse (z. B. **192.168.65.128**) an. Diese IP brauchst du zum Zugriff über den Browser.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/025.jpg)

---

### **26: Browser-Warnung**

Beim Zugriff auf den ESXi Host Client im Browser kann eine Sicherheitswarnung erscheinen. Klicke auf **"Erweitert" (Advanced)**, um fortzufahren.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/026.jpg)

---

### **27: Zugriff auf den Host fortsetzen**

Wähle im Warnhinweis **"Weiter zu 192.168.65.128 (unsicher)"**, um zum ESXi-Webinterface zu gelangen.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/027.jpg)

---

### **28: Anmeldung am ESXi Host Client**

Die Login-Seite erscheint. Gib den Benutzernamen **root** und das zuvor gesetzte Passwort ein. Klicke auf **Login**.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/028.jpg)

---

### **29: ESXi Host Client Oberfläche**

Die Verwaltungsoberfläche wird geladen. Hier kannst du deinen ESXi-Host verwalten, Ressourcen überwachen und virtuelle Maschinen konfigurieren.

![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/029.jpg)  
![](/rubinhood-blog/assets/img/Installing-ESXi-in-VMware-Workstation/030.jpg)

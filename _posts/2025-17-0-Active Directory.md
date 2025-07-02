---
date: 17.01.2025
layout: post
title: Active Directory (AD) – Eine Domäne einrichten und einen Client verbinden
excerpt: In dieser Anleitung zeige ich dir Schritt für Schritt, wie du eine Active-Directory-Umgebung einrichtest und einen Windows-10-Client mit der Domäne verbindest.
image: /rubinhood-blog/assets/img/Active-Directory/021.jpg
---

![](/rubinhood-blog/assets/img/Active-Directory/021.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/022.jpg)

## 🧰 Einführung  
Diese Anleitung zeigt dir Schritt für Schritt, wie du eine **Active Directory**-Umgebung einrichtest und einen **Windows 10-Client** mit der Domäne verbindest.  
Am Ende dieser Anleitung wirst du:

✅ Eine **Organisationseinheit (OU)** und ein **Benutzerkonto** erstellt haben  
✅ Die **Netzwerkeinstellungen** eines Clients korrekt konfiguriert haben  
✅ Einen **Windows 10-Client** erfolgreich der Domäne hinzugefügt haben  
✅ Dich mit einem **Domänen-Benutzerkonto** angemeldet haben  

Jeder Schritt wird durch Screenshots begleitet, um dir die Umsetzung zu erleichtern.

---

### 🪪 Schritt 1: Öffne **Active Directory-Benutzer und -Computer**  
Klicke oben rechts im Menü auf **Tools** und wähle im Dropdown **Active Directory-Benutzer und -Computer** aus.

### 🗂️ Schritt 2: Neue **Organisationseinheit (OU)** erstellen  
Rechtsklick auf deine Domäne → **Neu** → **Organisationseinheit** auswählen.

### ✏️ Schritt 3: Organisationseinheit benennen  
Vergib einen Namen für die neue OU (z. B. **Mitarbeiter**) und aktiviere das Häkchen bei **Container vor versehentlichem Löschen schützen**. Klicke auf **OK**.

![](/rubinhood-blog/assets/img/Active-Directory/001.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/002.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/003.jpg)

### 👤 Schritt 4: Neues Benutzerkonto erstellen  
Rechtsklick auf die erstellte OU **Mitarbeiter** → **Neu** → **Benutzer** auswählen.

### 📄 Schritt 5: Benutzerdaten eingeben  
Trage den **Vor- und Nachnamen** sowie den **Anmeldenamen** ein (z. B. `C.Neumann`). Klicke auf **Weiter**.

### 🔐 Schritt 6: Passwort festlegen  
Vergib ein **Passwort** und aktiviere die Option **Benutzer muss Kennwort bei der nächsten Anmeldung ändern**. Klicke auf **Weiter**.

![](/rubinhood-blog/assets/img/Active-Directory/004.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/005.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/006.jpg)

### ✅ Schritt 7: Benutzererstellung bestätigen  
Überprüfe die Angaben und klicke auf **Fertig stellen**, um den Benutzer anzulegen.

---

### 🌐 Schritt 8: Netzwerkeinstellungen am Windows-10-Client öffnen  
Gehe zum **Windows 10-Client** und öffne die **Netzwerk- & Interneteinstellungen**, indem du auf das Netzwerksymbol in der Taskleiste klickst.

### 🧭 Schritt 9: Erweiterte Adapteroptionen öffnen  
Klicke auf **Adapteroptionen ändern**, um die Netzwerkkonfiguration anzupassen.

![](/rubinhood-blog/assets/img/Active-Directory/007.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/008.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/009.jpg)

### 🔧 Schritt 10: Netzwerkadapter konfigurieren  
Öffne die Eigenschaften der **Ethernet-Verbindung**, wähle **Internetprotokoll Version 4 (TCP/IPv4)** und setze den **bevorzugten DNS-Server** auf die IP-Adresse des Domänencontrollers (z. B. `192.168.178.10`). Klicke auf **OK**.

### 🧱 Schritt 11: Systemsteuerung öffnen  
Öffne die **Systemsteuerung**, stelle die Ansicht auf **Kleine Symbole**, und klicke auf **System**.

### 💻 Schritt 12: Computereinstellungen ändern  
Im Fenster **Systemeigenschaften** auf **Ändern** klicken, um den Computer umzubenennen oder einer Domäne beizutreten.

![](/rubinhood-blog/assets/img/Active-Directory/010.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/011.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/012.jpg)

### 🏢 Schritt 13: Der Domäne beitreten  
Wähle **Domäne**, gib den Domänennamen ein (z. B. `rubinhood.local`) und bestätige mit **OK**.

### 🔑 Schritt 14: Administrator-Zugangsdaten eingeben  
Gib die **Anmeldedaten eines Domänenadministrators** ein und klicke auf **OK**, um fortzufahren.

### 📬 Schritt 15: Beitritt erfolgreich  
Es erscheint eine Bestätigung, dass der Computer erfolgreich der Domäne beigetreten ist. Klicke auf **OK**.

![](/rubinhood-blog/assets/img/Active-Directory/013.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/014.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/015.jpg)

### 🔁 Schritt 16: Computer neu starten  
Ein Hinweis fordert dich zum **Neustart** auf. Klicke auf **OK** und starte das System neu.

---

### 🔐 Schritt 17: Anmeldung mit Domänenkonto  
Am Anmeldebildschirm auf **Anderer Benutzer** klicken und die **Domänen-Zugangsdaten** eingeben (z. B. `c.neumann`).

### 🔄 Schritt 18: Kennwort ändern  
Da das Konto beim ersten Login das Passwort ändern muss, erscheint eine Aufforderung. Klicke auf **OK**.

![](/rubinhood-blog/assets/img/Active-Directory/016.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/017.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/018.jpg)

### 🔏 Schritt 19: Neues Passwort festlegen  
Gib ein **neues Passwort** ein, bestätige es und drücke **Enter**, um fortzufahren.

![](/rubinhood-blog/assets/img/Active-Directory/019.jpg)  
![](/rubinhood-blog/assets/img/Active-Directory/020.jpg)

### 🧑‍💼 Schritt 20: Erstanmeldung & Profil wird eingerichtet  
Windows richtet das Benutzerprofil ein, und der Domänenbenutzer ist jetzt erfolgreich angemeldet.

---

## ✅ Fazit  
Glückwunsch! Du hast erfolgreich eine **Active Directory-Domäne** eingerichtet und einen **Windows 10-Client** verbunden.

Ab sofort kann der Client:

- Auf **Netzwerkressourcen** innerhalb der Domäne zugreifen  
- Sich mit **Domänen-Zugangsdaten** authentifizieren  
- Zentral über **Gruppenrichtlinien** verwaltet werden  

Diese Einrichtung ist ein essenzieller Baustein für **Unternehmensumgebungen** und bietet mehr **Sicherheit, zentrale Verwaltung und Skalierbarkeit**.

Wenn du **weitere Clients hinzufügen** willst, wiederhole einfach **Schritt 8 bis 20** auf den jeweiligen Geräten.

---

---
date: 10.06.2022
layout: post
title: Nested Virtualization in VMware Workstation unter Windows 11 deaktivieren
excerpt: Wenn du beim Starten einer virtuellen Maschine unter Windows 11 die Fehlermeldung „VMware Workstation does not support nested virtualization“ erhältst, liegt das Problem häufig an aktivierten Sicherheitsfunktionen wie Device Guard, Credential Guard oder dem Windows Hypervisor.
image: /rubinhood-blog/assets/img/Disable-the-Windows-Hypervisor/001.webp
---

![Alternativtext](/rubinhood-blog/assets/img/Disable-the-Windows-Hypervisor/001.png)  
![Alternativtext](/rubinhood-blog/assets/img/Disable-the-Windows-Hypervisor/002.png)

Wenn du beim Starten einer virtuellen Maschine unter Windows 11 die Fehlermeldung „VMware Workstation does not support nested virtualization“ erhältst, liegt das Problem häufig an aktivierten Sicherheitsfunktionen wie Device Guard, Credential Guard oder dem Windows Hypervisor.

## Lösungsschritte

### 1. Windows Hypervisor deaktivieren

Der Windows Hypervisor kann die Hardwarevirtualisierung für VMware blockieren. Du kannst ihn mit diesem einfachen Befehl in PowerShell oder Command Prompt (als Administrator ausführen) deaktivieren:

```
bcdedit /set hypervisorlaunchtype off
```

Starte danach dein System neu.

### 2. Device Guard und Credential Guard deaktivieren

Falls das Problem weiterhin besteht, nutze das DG Readiness Tool, um Device Guard und Credential Guard zu deaktivieren:

![Alternativtext](/rubinhood-blog/assets/img/Disable-the-Windows-Hypervisor/003.png)

Lade das Tool herunter und führe folgende Befehle aus:


```
cd C:\Users\user\Downloads\dgreadiness_v3.6

.\DG_Readiness_Tool_v3.6.ps1 -Disable
```

Starte deinen Computer neu.

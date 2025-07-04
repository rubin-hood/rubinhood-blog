---
date: 26.12.2024
layout: post
title: Sicherheitspatches auf Linux/Windows-Systemen anwenden
excerpt: Der Schutz von IT-Systemen vor Angriffen und Schwachstellen ist eine der wichtigsten Aufgaben in der Systemadministration. Eine zentrale Rolle spielen dabei Sicherheitspatches, die regelmäßig installiert werden müssen, um die Abwehr gegen neue Bedrohungen zu stärken. Dieser Beitrag zeigt, wie man auf Linux- und Windows-Systemen am besten vorgeht, um sicherzustellen, dass Patches schnell und zuverlässig angewendet werden.
image: /rubinhood-blog/assets/img/apply-security-patches-on-linux-windows-systems/001.webp
---

![](/rubinhood-blog/assets/img/apply-security-patches-on-linux-windows-systems/001.jpg)

Der Schutz von IT-Systemen vor Angriffen und Schwachstellen ist eine der wichtigsten Aufgaben in der Systemadministration. Eine zentrale Rolle spielen dabei Sicherheitspatches, die regelmäßig installiert werden müssen, um die Abwehr gegen neue Bedrohungen zu stärken. Dieser Beitrag zeigt, wie man auf Linux- und Windows-Systemen am besten vorgeht, um sicherzustellen, dass Patches schnell und zuverlässig angewendet werden.

## 1. Warum sind Sicherheitspatches so wichtig?

Sicherheitspatches beheben Schwachstellen im Betriebssystem oder in der installierten Software, die Angreifer ausnutzen könnten, um unbefugten Zugriff zu erlangen oder schädliche Aktivitäten auszuführen. Regelmäßige Updates schützen nicht nur das System, sondern auch sensible Daten, die darauf gespeichert sind.

## 2. Sicherheitspatches auf Linux anwenden

Auf Linux-Systemen erfolgt das Patchen in der Regel über die Paketverwaltung. Je nach Distribution gibt es verschiedene Paketmanager, die die Updates verwalten.

### a. Patches auf Ubuntu und Debian

```
sudo apt update
        sudo apt upgrade
```

`apt update` aktualisiert die Paketlisten, während `apt upgrade` alle verfügbaren Updates installiert. Es ist auch möglich, Sicherheitsupdates explizit mit folgendem Befehl zu installieren:

```
sudo apt-get install unattended-upgrades
        sudo unattended-upgrades
```

### b. Patches auf CentOS und Red Hat (RHEL)

```
sudo yum update
```

oder für neuere Versionen:

```
sudo dnf update
```

Hierbei werden alle Pakete inklusive Sicherheitsupdates aktualisiert. Um ausschließlich Sicherheitsupdates zu installieren, kann folgender Befehl genutzt werden:

```
sudo yum update-minimal --security
```

### c. Automatische Updates aktivieren

Um auf Linux-Systemen die automatische Installation von Sicherheitsupdates zu ermöglichen, können zusätzliche Tools wie `unattended-upgrades` auf Debian-basierten Systemen oder der `dnf-automatic` Dienst auf Red Hat-Distributionen verwendet werden. Dies stellt sicher, dass kritische Patches zeitnah angewendet werden.

## 3. Sicherheitspatches auf Windows anwenden

Windows bietet mehrere Möglichkeiten, um Sicherheitspatches zu verwalten, von der automatischen Installation über die Windows Update-Funktion bis hin zur manuellen Installation.

### a. Windows Update

Die einfachste Methode, um Patches auf Windows-Systemen zu installieren, ist über die integrierte Windows Update-Funktion. Dies erfolgt über die folgenden Schritte:

1. Öffne die  **Einstellungen** .
2. Gehe zu  **Update und Sicherheit** .
3. Klicke auf  **Nach Updates suchen** .

Wenn Updates verfügbar sind, werden diese automatisch heruntergeladen und installiert. Es empfiehlt sich, die automatische Installation von Updates zu aktivieren, um sicherzustellen, dass kritische Patches zeitnah angewendet werden.

### b. Windows Server Update Services (WSUS)

In größeren Netzwerken kann die zentrale Verwaltung von Patches über WSUS erfolgen. Mit WSUS können Administratoren Updates auf mehreren Windows-Systemen gleichzeitig steuern und installieren, wodurch ein konsistentes Patch-Management gewährleistet wird.

### c. Manuelle Installation von Updates

Falls ein bestimmtes Update benötigt wird, das noch nicht über Windows Update verfügbar ist, kann dieses manuell von der [Microsoft Update Catalog](https://www.catalog.update.microsoft.com/) Website heruntergeladen und installiert werden.

## 4. Best Practices für das Patch-Management

* **Regelmäßigkeit:** Stelle sicher, dass alle Systeme regelmäßig nach Updates suchen und diese installieren. Besonders kritische Sicherheitspatches sollten umgehend eingespielt werden.
* **Testen vor der Implementierung:** In produktiven Umgebungen ist es sinnvoll, Updates zunächst in einer Testumgebung zu prüfen, um Kompatibilitätsprobleme zu vermeiden.
* **Backup-Strategie:** Vor größeren Updates sollte stets ein Backup aller wichtigen Daten und Systeme gemacht werden, um mögliche Ausfallzeiten oder Datenverluste zu verhindern.

Das Anwenden von Sicherheitspatches ist eine der grundlegendsten, aber auch wichtigsten Aufgaben im IT-Bereich. Sowohl auf Linux- als auch auf Windows-Systemen stehen einfache und effektive Methoden zur Verfügung, um die Systemsicherheit zu gewährleisten. Durch regelmäßige Updates und die richtige Vorgehensweise kann das Risiko von Sicherheitslücken erheblich minimiert werden.

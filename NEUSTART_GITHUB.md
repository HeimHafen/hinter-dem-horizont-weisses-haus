# Neue GitHub-Pages-Version einrichten — Schritt für Schritt

## Vor der Löschung
1. **Altes Repository noch nicht löschen.** Repository-Dateien und, falls gewünscht, separat die Git-Historie und Einstellungen sichern. Ein gewöhnliches ZIP enthält keine Commit-Historie.
2. Das gelieferte **Weisses_Haus_Neustart_GitHub_WH10.zip** herunterladen und entpacken. **Nicht nur die ZIP als Datei in GitHub hochladen!**
3. Sicherstellen, dass nach dem Entpacken direkt `index.html` sowie `assets/` und die vier JavaScript-Dateien sichtbar sind.

## Neue Version anlegen
1. Auf GitHub ein neues, zunächst **öffentliches Test-Repository** erstellen, z. B. `weisses-haus-3d-test`. Wichtig: GitHub Pages wird auf öffentlichen Free-Repositories unterstützt; Sichtbarkeit und Zugriffsrechte bewusst wählen.
2. Die **Inhalte** des entpackten Projektordners hochladen, einschließlich `assets/crosshall/` mit seinen Unterordnern. `index.html` muss im Repository-Root liegen, **nicht in einem zweiten Ordner** `Weisses_Haus_Neustart_GitHub/`.
3. Commit-Nachricht: `Neustart Weißes Haus – bereinigter 3D-Basisstand WH-1.0`
4. Unter **Settings → Pages → Build and deployment**: Source **Deploy from a branch**, Branch **main**, Folder **/(root)**, speichern.
5. In GitHub Pages nach dem Build auf „Visit site“ tippen. Typische URL: `https://heimhafen.github.io/weisses-haus-3d-test/` (nur falls dieser Name gewählt wurde).

## Auf dem iPhone abnehmen
- Webseite in Safari öffnen. Startet das Spiel direkt in der **Cross Hall**?
- Sind **fünf Konsolen mit Vase/Blumen** sichtbar (möglicherweise erst beim Blick entlang der Wände)?
- Sind **Boden und Wände materialisiert**, Porträts gefüllt, Teppich rot mit goldener Bordüre?
- Kannst du dich auf dem Teppich bewegen, ohne durch Wand, Kolonnen oder Möbel zu laufen?
- Funktioniert der Wechsel **Egoansicht ↔ Figur zeigen**?
- Funktioniert **Außenansicht ↔ Zur Cross Hall**?
- Aufräumen: Safari nicht mit zwischengespeicherten Daten verwechseln; für die neue Repository-Adresse den Stand frisch laden.
- Zusätzlich Portrait/Landscape bzw. ein zweites iPhone/Chrome testen, soweit möglich.

**Wenn `Spielstart fehlgeschlagen` erscheint:** Screenshot der vollständigen Fehlermeldung erstellen und vor weiteren Änderungen erst die fehlende Datei im Repo-Pfad korrigieren. Bei ganz weißem/schwarzem Bildschirm Netzwerkverbindung und Three.js-CDN prüfen.

## Working Copy
- Repo klonen oder neu einrichten, alle Dateien in den Root kopieren, committen und pushen.
- **Vorhandene oder neue Remote-Referenz:** `refs/heads/main`
- **Force Push:** Aus
- **Source-Branch:** `main` (neu angelegtes Repository)

Das neue Repo ist ein sauberer technischer Neustart. Ein historisch millimetergenauer Real-Life-3D-Nachbau entsteht erst nach weiteren Modellabnahmen.

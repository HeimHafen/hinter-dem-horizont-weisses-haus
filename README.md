# Hinter dem Horizont · Weißes Haus 3D

**Sauberer GitHub-Pages-Neustart WH-1.0 (15. November 2026)**

Begehbarer Prototyp des Weißen Hauses mit direktem Start in der Cross Hall, externer Nordansicht, fünf realen GLB-Möbelgruppen sowie einem eigenständigen dreidimensionalen Teppich. Die Darstellung ist eine **künstlerisch-historisch orientierte Rekonstruktion**, keine exakt vermessene Kopie des Gebäudes.

## Sofort starten

Dieses Repository benötigt **keinen Build**, kein npm und kein Backend. `index.html` liegt direkt im Repository-Stammverzeichnis. Die 3D-Bibliothek Three.js r170 und der GLTFLoader werden derzeit fest versioniert von jsDelivr geladen; dafür braucht das Gerät eine Internetverbindung.

GitHub Pages: **Settings → Pages → Build and deployment → Deploy from a branch → main → /(root) → Save**.

Projektadresse nach Veröffentlichung: `https://<github-benutzername>.github.io/<repositoryname>/`

- **Standard**: Einstieg in die Cross Hall in Egoansicht.
- **Außenansicht**: Schalter unten rechts oder `#aussen` an die URL anhängen.
- **Ansicht**: „Figur zeigen“ / „Egoansicht“ (Tastatur `V`).
- **Gehen**: Tasten WASD / Pfeiltasten oder die eingeblendeten Richtungstasten.
- **Blickrichtung**: auf der 3D-Fläche wischen/ziehen.
- **Tür**: bei der Eingangstür „Tür öffnen“ bzw. `E`.

## Verzeichnisübersicht

```
index.html                     # Einstieg, White-House-Szene und Steuerung
Weisses-Haus-Innen.glb        # bestehendes 3D-Gebäude
spielfigur.js                 # Spielfigur
cross-hall-v6.js              # Cross-Hall-Architektur / Kollisionszonen
cross-hall-furniture-v6.js    # fünf GLB-Möbelgruppen
cross-hall-carpet-v7.js       # GLB-Teppich und Nahbereichs-Wollflor
assets/crosshall/             # Texturen und Gemälde
assets/crosshall/models/      # 4 Möbel-GLB-Dateien
assets/crosshall/carpet_v7/   # Teppich-GLB, Normal-/Rauigkeitskarten
qa/pruefe_projekt.py          # wiederholbarer struktureller Dateitest
qa/PRUEFBERICHT.md            # Prüfstand und bekannte Grenzen
docs/NEUSTART_GITHUB.md       # ausführliche Anleitung für neuen Start
```

## Warum ein neues Repository?

Der vorherige Projektstand enthielt viele veraltete Versionen, doppelte GLB- und Texturdateien sowie Burg-/Felsenburg-Assets. Der neue Stand verwendet feste Assetpfade und lädt beim Start **kein Burgmodell**. Fehlende verpflichtende Cross-Hall-Texturen, Möbel oder Teppiche werden jetzt als Startfehler angezeigt, nicht durch unscheinbare Platzhalter verdeckt.

## Achtung: Qualitätsstufe

Dieses Projekt ist ein *funktionsorientierter 3D-Teststand*, noch keine fotorealistische, wissenschaftlich genaue Rekonstruktion. Einige Sitzmöbel, Leuchten, Wanddetails und Nebenräume stammen weiterhin aus vereinfachter prozeduraler Geometrie. Für das vom Projekt gewünschte „Real-Life-3D-Niveau“ müssen diese Bereiche einzeln gegen hochwertige Referenzmodelle ausgetauscht und anschließend auf dem iPhone getestet werden.

Das Archiv des alten Projekts ist **nicht** in diesem Repository enthalten. Das alte Repository erst nach erfolgreichem Start, Assetprüfung und Backup löschen.

## Historische Referenzen (keine 1:1-Vermessung)

- White House Historical Association: https://www.whitehousehistory.org/videos/the-cross-and-entrance-halls-white-house-video-tour
- NPS State-Floor-Grundriss: https://www.nps.gov/whho/planyourvisit/park-brochure.htm
- Archiv Cross Hall (Materialien, Leuchten): https://georgewbush-whitehouse.archives.gov/history/whtour/halls.html

## Rechte

Die vorhandenen 3D-Assets, Materialtexturen und Bilder stammen aus dem bisherigen Nutzerprojekt. Vor kommerzieller Veröffentlichung sind Eigentumsrechte und Lizenzen der ursprünglich eingebrachten Inhalte separat zu überprüfen. Three.js unterliegt seinen jeweiligen eigenen Lizenzbedingungen; die Bibliothek wird hier nicht in das Archiv eingebettet.

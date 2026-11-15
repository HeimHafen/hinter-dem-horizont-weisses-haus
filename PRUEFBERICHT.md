# Technische Prüfung · Weißes Haus WH-1.0 · 15.11.2026

## Tatsächlich geprüft
- Projekt aus der letzten vollständigen Teppichversion V7 abgeleitet, keine 3D-Objekte durch eine bloße Referenzfotografie ersetzt.
- Alte Burg- und Felsenburg-GLBs sowie frühere Cross-Hall-Versionen aus dem GitHub-Neustart entfernt; keine Burg-Ladevorgänge im neuen Einstiegscode.
- `index.html`, `spielfigur.js`, `cross-hall-v6.js`, `cross-hall-furniture-v6.js` und `cross-hall-carpet-v7.js`: JavaScript-Syntaxcheck mit Node 22 erfolgreich.
- Alle für den Start benötigten Material-, Bild- und GLB-Pfade vorhanden; fehlende Pflichtdateien lösen eine lesbare Fehlermeldung aus.
- Alle GLBs per `trimesh` geladen und geometrisch überprüft (Abmessungen, Dreiecksflächen).
- Teppichkörper nach Modellwerten: 34,82 × 2,64 Meter, Höhe ca. 0,0292 Meter; **GLB-Oberkante** liegt etwa 3 cm über der Halle, oberhalb des Marmorfußbodens.
- Fünf Konsolentische: Transformationspositionen geprüft, außerhalb des Hauptteppichs und innerhalb der Halle, keine gegenseitige Rechteck-Überlappung. Zwei Sitzgruppen wurden aus Türnähe versetzt, vier störende Stehleuchten entfernt und die übrigen Leuchten so verteilt, dass Bilder nicht verdeckt werden.
- HTML-Layout ohne horizontales Scrollen bei 320, 375, 390, 430, 768 und 1024 Pixel Breite geprüft; Pfeiltasten und Aktionsbutton überdecken sich nicht.
- Die falsch bezeichnete `Oval Office`-Spielregion wird im UI gemäß State-Floor-Layout als **Blue Room** geführt. Ihr Inhalt ist noch kein vermessener Blue Room.
- Automatisierbarer Audit: `python qa/pruefe_projekt.py` (**73 Einzelprüfungen erfolgreich**).

## Noch NICHT bestätigt
- Kein vollständiger echter WebGL-Test im Browser möglich: der lokale HTTP-Browsertest wurde durch die Ausführungsumgebung blockiert.
- Kein iPhone-Safari-Grafiktest, kein Profiling der Framerate/Speicherauslastung, kein Deployment auf GitHub Pages.
- Keine garantierte 1:1-Entsprechung zur Cross Hall des echten Weißen Hauses: Türen, Möblierung, Raummaße und Bilder sind historisch orientiert, aber nicht vermessen.
- Einige Möbel und Leuchten sind weiterhin prozedural vereinfachte 3D-Geometrie; das gewünschte „maximale Real-Life-Niveau“ ist noch nicht überall erreicht.
- Die verwendeten Three.js-Bibliotheken werden online geladen und sind für Offlinebetrieb nicht lokal eingebettet.

## Sinnvolle nächste Abnahme
1. Die neue GitHub-Pages-Adresse in Safari öffnen.
2. Anfangsstand der Cross Hall von der Teppichachse fotografieren.
3. Jeden Wandabschnitt und besonders Möbelplatzierungen in realen Game-Screenshots überprüfen.
4. Nur **einen Bereich nach dem anderen** weiterentwickeln, bevor der nächste freigegeben wird.

## Quellen zum Raumplan
- https://www.nps.gov/whho/planyourvisit/park-brochure.htm
- https://www.whitehousehistory.org/videos/the-cross-and-entrance-halls-white-house-video-tour
- https://georgewbush-whitehouse.archives.gov/history/whtour/halls.html

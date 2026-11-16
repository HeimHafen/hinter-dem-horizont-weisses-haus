# Technischer Prüfbericht – Nordtreppe A0.2.1

## Ausgangspunkt
Original: vom Nutzer hochgeladenes Repository-Archiv mit `index.html` A0.2.0 und `assets/Weisses-Haus-Nord-A020.glb`.

## Änderungen (streng begrenzt auf Treppenseiten)
- Die 22 sichtbaren alten A020-Treppenseitenteile werden durch Entfernen ihrer Mesh-Zuweisung deaktiviert.
- Vier neue, tatsächlich dreidimensionale GLB-Meshes eingefügt: jeweils eine **geschlossene, kontinuierliche** Steinwange und ein profiliertes Abdeckgesims pro Seite.
- Die Konstruktion wird mathematisch über X=0 gespiegelt. Keine auskragenden seitlichen Mini-Treppen, gestapelten Blöcke oder separaten Eckpfeiler mehr.
- Die neuen Wangen liegen auf ±8,565 bis ±8,935 m, von z=18,89 bis z=20,55 m. Der sichtbare Stufenlauf beginnt bei z=19,0 und endet bei z=20,55. Modellkoordinaten, **keine extern verifizierten Originalmaße**.
- Die fünf breiten Hauptstufen und ihre Schattenkanten, alle Säulen, Fenster, Dach, Tür, Materialien außerhalb der Treppenseiten und Bedienung bleiben unverändert.
- `index.html` verweist nur auf die neue GLB-Datei und zeigt Version A0.2.1.

## Nachgewiesene technische Prüfungen
- GLB-Header, JSON, BIN und angegebene Größen konsistent.
- Alle ursprünglichen BIN-Bytes bleiben exakt erhalten; alle historischen Gebäudemeshes wurden unverändert in die neue GLB übernommen.
- Außer den 22 genannten Treppenseiten wurden keine alten Nodes verändert.
- Links/rechts geometrisch exakt gespiegelt.
- Alle vier neuen Meshes sind geschlossen (watertight) und weisen konsistente Flächenorientierung auf.
- Neue Geometrie ragt nicht mehr vor die Stirnkante der Haupttreppe.
- Dateiverknüpfung in `index.html` auf `assets/Weisses-Haus-Nord-A021.glb` geprüft.

## Isolierter Browsertest
- Das vollständige neue GLB wurde in Chromium mit direkt eingebetteten Modelldaten geladen: Anzeige `Canvas-3D aktiv · 772 sichtbare Bauteilgruppen` und 0 JavaScript-Fehler.
- Die Canvas-Ersatzdarstellung sortiert Flächen in großen Gebäudemodellen nur näherungsweise; sie reicht nicht zur visuellen Abnahme.

## Offene Qualitätsnachweise
- iPhone Safari WebGL: Noch nicht geprüft. Diese Umgebung blockiert den normalen lokalen Webserverzugriff.
- Exakte Übereinstimmung mit Originalfotos/Bauplänen: Nicht nachgewiesen.
- Optische Freigabe ausdrücklich erst nach frontalem und seitlichem iPhone-Screenshot.
- Nach Stand der Truman Library wurden 1951 Stufen aus grauem Tennessee-Marmor eingebaut, genaue Maße der Seitenabschlüsse sind durch diese Quelle nicht belegt.

## Referenz
- Harry S. Truman Presidential Library, Foto 71-584, 4. Dezember 1951: https://www.trumanlibrary.gov/photograph-records/71-584
- Harry S. Truman Presidential Library, Foto 71-583, 4. Dezember 1951: https://www.trumanlibrary.gov/photograph-records/71-583

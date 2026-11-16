# Hinter dem Horizont – Nordportiko A0.1.6

**Ziel:** Weiterentwicklung der zuletzt auf dem iPhone erfolgreich gestarteten Version A0.1.5.

## Einziger geänderter Bereich
- Nordportiko: Überlagerte Giebel- und Gesimsbauteile in der GLB-Geometrie ersetzt.
- Ein durchgehender echter 3D-Dachkörper mit geneigten Flächen, Schattenfuge, eingerücktem Giebelfeld und profilierter Stirnseite.
- Dachrückseite läuft bis an die Hauptfassade; die Dachkante, das Gebälk und der Zahnschnitt sind konstruktiv neu ausgerichtet.
- Vier bestehende vordere Säulen, Treppen, Fenster, Hauskörper und Südseite unangetastet.
- Der bestehende Offline-WebGL/Canvas-Viewer wurde beibehalten.

## Installation in Working Copy
1. Komplettes Repository sichern, den funktionierenden Branch `main` nicht überschreiben.
2. Aus dem aktuellen Stand neuen Testbranch `test/nordportiko-a016` erstellen und dorthin wechseln.
3. ZIP entpacken: `index.html` in Repository-Wurzel ersetzen; `assets/Weisses-Haus-Nord-A016.glb` unter exakt diesem Pfad hinzufügen.
4. Beide Änderungen committen und zum Testbranch pushen. **Force Push aus.**
5. Für einen Online-Test auf GitHub Pages muss der Testbranch als Quelle konfiguriert oder nach Freigabe nach `main` übernommen werden.

## Commit
**Zusammenfassung:** `Nordportiko A0.1.6 – Dach und Giebel geometrisch vereinheitlicht`
**Details:** Durchgehendes Portikodach, ein Giebelfeld, vereinheitlichtes Gesims, beibehaltene vier Säulen und Viewer-Steuerung.
**Remote-Referenz:** `refs/heads/test/nordportiko-a016`
**Force Push:** Aus

## Historische Referenzen
- Library of Congress, Historic American Buildings Survey DC-37: https://www.loc.gov/resource/hhh.dc0402.photos?st=gallery
- National Park Service, White House and President's Park: https://www.nps.gov/whho/planyourvisit/park-brochure.htm
- White House Historical Association, Nordfassade: https://www.whitehousehistory.org/photos/fotoware?id=8118467173E74C44+989C7448C0DC4410

## Qualität und Grenzen
Das ist ein tatsächliches 3D-Modell, keine Fotofläche. Die Proportionen der Ausgangsgeometrie sind allerdings **nicht** auf Basis eines vollständigen vermessenen Bauplans verifiziert. Diese Version behebt Bauteilüberlagerungen; sie ist keine 1:1-Rekonstruktion und noch nicht fotorealistisch. Für verbindliche Freigabe ist der Safari-Grafiktest auf dem iPhone erforderlich.

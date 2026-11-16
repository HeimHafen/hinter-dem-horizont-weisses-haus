# Hinter dem Horizont – Architektur A0.1.7 (Nordfassade)

## Freigegebenes visuelles Ziel
Die zwei Bilder liegen im **separaten Zielbild-Paket** und sind **generierte Zielvisualisierungen, keine Screenshots des 3D-Spiels**. Sie definieren den gewünschten Detaillierungsgrad, Kamerablickwinkel, Farbstimmung und den architektonischen Qualitätsmaßstab.

## In A0.1.7 tatsächlich am 3D-Modell geändert
- Fünf irreführende Dachstreifen/-fragmente (`A016_RoofSeam_*`) aus dem GLB entfernt.
- Eine feine, bündige innere Giebeleinfassung in 3D hinzugefügt (drei kleine Profile).
- Alte beige Fassadenmaterialien neutraler an den weiß gestrichenen Stein angenähert. Diese Materialänderung gilt am bestehenden Gesamtmodell, die übrige Gebäudegeometrie wird nicht geändert.
- Beleuchtungsmodell für WebGL und Canvas leicht angepasst, ohne externe Bibliotheken oder Bild-Screenshots als Ersatz.
- A0.1.6-Steuerung und sämtliche strukturellen Bauteile beibehalten.

**Nicht enthalten:** echtes PBR-Material mit gemessenen Texturen, historisch metrisch bestätigte Rekonstruktion, fotorealistisches Raytracing, vollständige begehbare Innenräume.

## Working Copy auf dem iPhone
1. Aktuellen funktionierenden `main`-Branch sichern.
2. Neuen Testbranch `test/nordportiko-a017` aus aktuellem funktionierendem Stand erstellen und aktivieren.
3. `index.html` im Repository-Hauptverzeichnis ersetzen.
4. `assets/Weisses-Haus-Nord-A017.glb` in den bestehenden Ordner `assets` legen; andere Dateien nicht löschen.
5. Beide Dateien committen; zu `refs/heads/test/nordportiko-a017` pushen. Force Push **Aus**.
6. Für GitHub Pages den Branch testweise als Veröffentlichungsquelle setzen oder erst nach iPhone-Freigabe die Änderungen nach `main` übernehmen.

## Copy-Paste Commit
Zusammenfassung: `Nordportiko A0.1.7 – Dachartefakte entfernt, Steinwirkung verfeinert`
Detaillierte Informationen: `GLB-Dachstreifen entfernt; feine Giebeleinfassung modelliert; beige Steinmaterialien neutralisiert; WebGL/Canvas-Beleuchtung angepasst; bestehende Steuerung erhalten.`
Remote-Referenz: `refs/heads/test/nordportiko-a017`
Force Push: Aus

## Fachquellen
National Park Service, White House and President's Park: https://www.nps.gov/whho/planyourvisit/park-brochure.htm
Library of Congress, HABS DC-37 Fotodokumentation: https://www.loc.gov/resource/hhh.dc0402.photos/

## Wichtig: Maßstab und Qualität
Das Paket ist eine **verbesserte Zwischenstufe** aus dem vorhandenen A0.1.6-Modell. Das Zielbild ist um Größenordnungen fotorealistischer. Keine 1:1- oder 10/10-Behauptung, bevor reale iPhone-Screenshots und eine genaue Modellprüfung vorliegen.

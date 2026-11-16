# Prüfbericht – A0.2.4 (Nordtreppe)

## Feststellung anhand der iPhone-Screenshots A0.2.3
Rechts ist weiterhin eine unerwünschte kleine Treppenabstufung sichtbar. A0.2.3 hat die Seitenwangen zu niedrig angesetzt, sodass die gestuften Seitenflächen der fünf vorhandenen Hauptstufen weiterhin sichtbar bleiben.

## Genau veränderte Geometrie
- Acht A0.2.3-Zusatzteile deaktiviert (2 Steinwangen, 2 Profile, 2 Sockelblöcke, 2 Sockelkappen).
- Vier neue geschlossene Meshes ergänzt: zwei symmetrische Steinwangen und zwei profiliert abgedeckte Oberkanten.
- Hauptstufen und Podest nicht verändert.
- Säulen, Kapitelle, Tür, Dach, Fenster und Bedienoberfläche nicht verändert.
- Kein zusätzliches Zierpodest am Fuß der Wangen.

## Maß- und Kollisionsprüfung (Einheiten des bestehenden GLB)
Originale breite Hauptstufen x −8,55 bis +8,55, z 19,00–20,55. Fünf Stufen mit Höhen 0,860, 0,694, 0,528, 0,362 und 0,196.
Die neuen Seitenwangen beginnen an der Innenseite bei ±8,38 und überdecken die äußeren 0,17 Einheiten der Stufen. Die obere Wangenkante liegt an den jeweils vorderen Stufenkanten mindestens ca. 0,069–0,097 Einheiten oberhalb der Trittfläche. Die Oberkante verläuft ohne Stufensprünge.

## Tests
- GLB 2.0 formal gültig; mit `trimesh` als Szene gelesen.
- Alle vier neuen Meshes wasserdicht und mit konsistenter Flächenorientierung.
- 772 sichtbare Bauteilgruppen im lokalen Canvas-3D-Browsertest.
- Browsertest startete ohne JavaScript-Fehler, Modellpfad erreichbar (modellierte Netzwerkantwort in isolierter Testumgebung).

## Einschränkungen
- Der lokale Browser rendert über Canvas-3D statt echtem iOS-Safari-WebGL. Daher ist die visuelle Fehlerfreiheit **nicht bestätigt**.
- Historische Maßhaltigkeit der seitlichen Wangen wurde nicht anhand eines Originalaufmaßes nachgewiesen. Die Geometrie ist an das vorhandene Spielmodell und die freigegebene Zielgestaltung angepasst.
- Die Seitenwangen verdecken einen schmalen Rand der Hauptstufen. Das ist eine gezielte Überlappung zur Vermeidung der Mini-Treppenwirkung, keine Änderung der fünf Stufenkörper.

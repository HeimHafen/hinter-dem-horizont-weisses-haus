# Nordfassade A0.1.8 – gezielte Fehlerkorrektur

Ausgangspunkt: das von dir auf dem iPhone getestete GLB A0.1.7. Keine neuen Möbel, keine Änderungen an anderen Hausseiten.

## Sichtbare Fehler aus den markierten Screenshots
- Zwei Gruppen kleiner, schwebender Zierfragmente an der hinteren Dachkante: sehr kleine Alt-Dreiecke in den drei Materialmeshes entfernt ({'A014_limestone_light': 8, 'A014_stone_shade': 8, 'A014_limestone_high': 8}).
- Vier veraltete Türbeschlag-Blöcke neben der neuen Eingangstür aus der sichtbaren Szene ausgeschlossen.
- Fünf breite vordere Treppenstufen neu auf Stoß ausgerichtet: von Z=19,00 bis 20,55, gleiche Höhe und Breite wie bisher, aber ohne gegenseitige Überschneidungen und ohne Überlappung mit den vorderen Säulenplinthen.

## Nicht geändert
- Vier vordere Säulen und ihre Profile
- Überarbeiteter Giebel A0.1.7
- Gebäudekörper, Fenster, Flagge, Materialien und Kamerasteuerung
- Süd- und Seitenfassaden

## Prüfstand
- GLB nach dem Patch mit trimesh als vollständige Szene lesbar: 769 Meshes, 763 referenzierte Geometrie-Nodes.
- GLB-Chunklängen, JSON- und BIN-Daten konsistent.
- JavaScript-Syntax mit Node.js geprüft; ZIP-Integrität mit Python geprüft.
- Local Chromium: GLB geladen, Canvas-3D aktiviert, Portiko-Detailbutton reagiert; keine pageerror-Meldungen. WebGL konnte im lokalen Browser nicht aktiviert werden.
- Der Canvas-Fallback hat Zeichen-/Sortierartefakte bei der Treppe (auch in der unveränderten A0.1.7). Daraus lässt sich die Safari-WebGL-Qualität nicht sicher ableiten.
- Ein tatsächlicher Safari-Test bleibt erforderlich. Die markierten Stellen sind erst nach einem iPhone-Screenshot visuell abgenommen.

## Working Copy
Branch: test/nordportiko-a018
Remote-Referenz: refs/heads/test/nordportiko-a018
Commit: Nordportiko A0.1.8 – Dachfragmente, Türbeschläge und Stufenanschlüsse korrigiert
Force Push: Aus; main unverändert.

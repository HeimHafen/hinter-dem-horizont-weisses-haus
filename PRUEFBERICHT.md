# Prüfbericht Nordfassade A0.1.4

**Prüfumfang:** bestehendes Projekt A0.1.3 als Ausgangspunkt, das vom Nutzer vorgegebene Nordfassaden-Bild als visuelle Referenz.

| Prüfpunk | Ergebnis |
| --- | --- |
| Original-3D-Geometrie im GLB vorhanden | 623 ursprüngliche Meshes erhalten |
| Zusätzliche Detailgeometrie | 16 optimiert gruppierte Meshes, +42.540 Dreiecke |
| Gesamtmodell | 639 Meshes, 59.716 Dreiecke |
| Materialdaten | 24 Materialien im GLB enthalten |
| GLB-Version/Integrität | GLB 2, geparst und mit trimesh eingelesen |
| JavaScript-Syntax | `node --check` erfolgreich |
| Lokaler Canvas-Browsertest | Modell geladen, Vorderansicht und Portiko-Detailansicht sichtbar, keine JS-Fehler |
| Test mit echten iPhone-WebGL | **noch nicht durchgeführt** |
| Pixelgenaue Fotoübereinstimmung | **nicht erreicht**; Materialien und historische Maße nur angenähert |
| Tatsächliche Historientreue | nicht abschließend verifiziert; Referenzbild ist nicht gleichbedeutend mit einem amtlichen Grundriss |

**Hinweis:** Der Browser-Screenshot stammt aus dem Canvas-Ersatzrenderer; dessen grobe Sortierung transparenter und überlappender 3D-Oberflächen erzeugt erkennbare Dreiecksartefakte. Ein GPU-WebGL-Test bleibt für die optische Abnahme zwingend notwendig.

## Nächste notwendige Qualitätsrunde

1. Echte Stein-/Marmor-PBR-Textur mit Normal- und Rauigkeitskarten, Materialmaßstab kontrollieren.
2. Giebel und Säulenkapitelle anhand von Nahaufnahmen geometrisch verfeinern.
3. Korrekte optische Fensterproportionen, Quaderungen und Eingangslaibung an vermessenen Bauplänen prüfen.
4. WebGL-Darstellung, Tiefentest, Reflektionen und iPhone-Performance auf echter Hardware abnehmen.

## Öffentliche Architekturquellen

- National Park Service: https://www.nps.gov/whho/planyourvisit/park-brochure.htm
- Historic American Buildings Survey (Library of Congress): https://tile.loc.gov/storage-services/master/pnp/habshaer/dc/dc0400/dc0402/data/dc0402cap.pdf
- NPS Nordportiko: https://www.nps.gov/whho/planyourvisit/viewing-the-white-house.htm

# Hinter dem Horizont – Nordfassade A0.1.4

## Was enthalten ist

- `index.html`: unabhängige 3D-Architekturansicht, **keine externen JavaScript-Bibliotheken**.
- `assets/Weisses-Haus-Nord-A014.glb`: vorhandenes Weißes Haus (623 ursprüngliche Bauteilgruppen) mit **16 gruppierten, zusätzlich modellierten Architekturmaterial-/Geometriegruppen** für die Nordfassade.

Die GLB-Datei enthält **reale 3D-Geometrie**, nicht bloß eine Fototapete. Ergänzt wurden Giebel- und Gesimsprofile, ionische Kapitellverzierungen, Fenstereinfassungen mit Sprossen, ein zweiflügeliges Eingangsportal mit Bogenoberlicht, Treppenkörper mit Stufenkanten, Dachbaluster, Quaderungen, Schornsteine, 3D-Laterne und Flaggengeometrie.

## In GitHub Pages hochladen

1. Sicherheitskopie des bisherigen GitHub-Repositorys behalten.
2. ZIP entpacken; **`index.html` direkt im Repository-Stamm** ablegen.
3. Den Ordner `assets/` inklusive `Weisses-Haus-Nord-A014.glb` unverändert hochladen.
4. Die bestehende `index.html` ersetzen. Die vorherige GLB-Datei bleibt bei Bedarf als Sicherung erhalten.
5. Unter GitHub **Settings → Pages** prüfen, ob `main` / `/(root)` veröffentlicht wird.
6. Webseite in Safari öffnen. **Nicht** die `index.html` aus der Dateien-App öffnen.

**Kontrollanzeige:** `Nordfassade A0.1.4` und nach dem Laden `639 Bauteilgruppen`.

## Bedienung

- `Nordfassade`: Vorderansicht.
- `Portiko-Details`: näher an Säulen, Tür und Giebel.
- `Südfassade`: gegenüberliegende Seite, aus ursprünglicher Version.
- `Übersicht`: schräger Blick.
- Fingerbewegung dreht, Zweifinger-Geste zoomt; auf Desktop auch Mausrad.

## Genauigkeit / Grenzen

**Das Ergebnis ist ein Architektur-Ausbau, keine fotorealistische 1:1-Rekonstruktion.** Das hochgeladene Referenzbild ist eine gerenderte Darstellung ohne vermessene Bauzeichnungen. Abstände und Detailgrößen wurden an die vorhandenen Modelleinheiten angepasst und auf die Ansicht abgestimmt, nicht millimetergenau historisch vermessen. Materialien werden aktuell als vereinfachte GLB-PBR-Farbwerte im eigenen Viewer wiedergegeben; hochwertige photogrammetrische Oberflächen, realistische Reflexion und dynamische Schatten fehlen. In der Umgebung konnte nur der **Canvas-2D-Ersatzrenderer** tatsächlich getestet werden; iPhone-Safari-WebGL muss noch überprüft werden.

## Technisches

- Standalone Viewer aus A0.1.3 erweitert.
- GLB wird per lokalem relativem Pfad geladen, ohne CDN.
- GLB `node.matrix` oder `translation/scale/rotation` wird unterstützt.
- GLB-Primitives ohne `NORMAL` bekommen geometrisch berechnete Flächennormalen.
- Materialfarben stammen aus dem GLB statt einer festen Acht-Farben-Liste.
- Keine Ergänzungen an Innenräumen oder an der Südgestaltung, abgesehen von bestehenden Modellbestandteilen und den vom Norden sichtbaren Schornsteinen.

## Dateiprüfung

Siehe `docs/PRUEFBERICHT.md` für die statischen Befunde.

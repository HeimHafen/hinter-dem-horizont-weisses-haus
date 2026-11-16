# Prüfbericht – Nordtreppe A0.2.2

## Basis
- Original: A0.2.1 aus dem zuvor für dieses Projekt erstellten Working-Copy-Paket.
- Hochgeladene Repository-ZIP als unabhängige Kontrolle geprüft; sie enthält noch A0.2.0.
- Ausschließlich Nordtreppen-Seitenwangen und deren Profile wurden verändert.

## Konstruktion
- Vier neue geschlossene 3D-Körper (zwei spiegelgleiche Steinwangen, zwei durchgehende Abdeckprofile).
- Beide Seiten: Rückansatz z≈18,885 bis vordere Treppenstufe z≈20,565; Seitenbreiten und Höhen symmetrisch.
- Keine zusätzliche Mini-Treppe, keine neuen frei stehenden Eckpfeiler.
- Vier alte A0.2.1-Seitenteile deaktiviert, ohne ihre Quellgeometrie zu löschen.
- Fünf Hauptstufen, Treppenpodest, Säulen, Türen, Fenster, Dach, Materialien und Steuerung nicht verändert.

## Automatisierte Prüfungen
- GLB-Szene mit `trimesh` geöffnet: **772 sichtbare Meshgruppen**.
- Vier neue Meshgruppen: **watertight** und konsistente Flächenausrichtung.
- Bestehender binärer GLB-Datenblock byteweise unverändert, alle ursprünglichen Meshdefinitionen und Materialien unverändert.
- JavaScript-Code mit `node --check` ohne Syntaxfehler.
- Isolierter Chromium-Ladevorgang ohne JavaScript-Fehler; Anzeige `Canvas-3D aktiv`.
- Bedienflächen Nordfassade, Portiko-Details, Südfassade und Übersicht im Test erreichbar.

## Offene Abnahme
- Lokaler HTTP-Server im Testcontainer blockiert; Browsertest daher mit eingebetteten Modelldaten durchgeführt.
- WebGL konnte im Chromium-Testcontainer nicht aktiviert werden; iPhone-WebGL-Rendering und Performance **nicht verifiziert**.
- Canvas-Ersatzdarstellung kann Polygon-Sortierartefakte zeigen und ist keine ausreichende visuelle Abnahme.
- Historische Maßhaltigkeit der geschwungenen Treppenwangen anhand von Vermessungsplänen nicht bestätigt.

## Checkliste für iPhone
1. A0.2.2 auf dem tatsächlich veröffentlichten Branch aufrufen (oder Pages-Branch umstellen).
2. Frontalansicht: beidseitig gleichmäßige Kontur ohne zusätzliche Ministeps.
3. Linke/rechte Schrägansicht: saubere Anschlüsse ans Podest und an die Haupttreppe.
4. Portiko-Details: keine Überlappung mit den vier Säulensockeln.
5. Drehen und Zwei-Finger-Zoom wie zuvor.

Nur nach bestandenem echten iPhone-Test nach `main` übernehmen.

# Architektur A0.2.0 – Nordtreppe, Qualitätskorrektur der Seitenabschlüsse

## Ziel / Ausführung
Isolierte Korrektur der in den Nutzer-Screenshots beanstandeten linken und rechten Treppenwangen. Die originale A0.1.9 ist die Ausgangsbasis und bleibt als Rückfallversion erhalten.

## Wirkliche 3D-Änderungen
- Alle 27 Zusatz-Meshes aus A0.1.9 in der neuen GLB nicht mehr gerendert (Originalbytes der Quelldatei bleiben erhalten).
- Zwei neue, vollständig geschlossene, spiegelgleiche, weich gekrümmte Steinwangen mit je 50 Querschnitten.
- Einheitliche, kontinuierliche Deckprofile mit kurzen abgeschrägten Kanten, keine gestapelten Schein-Stufen.
- Zwei niedrige, an die Wangen angeschlossene rechteckige Abschlusspfeiler mit zurückhaltenden Reliefrahmen.
- Fünf minimierte, an den unveränderten Stufen ausgerichtete Kantenprofile.
- Die übrige Fassade (Säulen, Giebel, Portiko, Tür, Fenster, Dach) wurde geometrisch nicht verändert.

## Kontrolle
Neue sichtbare GLB-Meshes: 27. Neues Dreiecksvolumen: 2,660 Dreiecke. A0.1.9-Teile entfernt aus Renderpfad: 27.
Automatisiert kontrolliert: geschlossene neue Volumenkörper, symmetrische Maße, Ausgangsmeshes unverändert, syntaktisches HTML und GLB, ZIP-Integrität.
Lokale 3D-Browser-Vorschau ist keine Safari-iPhone-Abnahme.

## Historische Quellen / Grenzen
Die Truman Presidential Library dokumentiert bei der Renovierung 1951 graue Tennessee-Marmor-Stufen, jedoch keine maßstäblichen Detailmaße der heutigen beiden Seitenwangen. https://www.trumanlibrary.gov/photograph-records/71-584 . Die geschwungene Form und Eckpfeiler sind derzeit eine vereinbarte Zielbild-Interpretation, nicht als historisch exakt nachgewiesen.

## Working Copy
ZIP entpacken und NUR `index.html` und `assets/Weisses-Haus-Nord-A020.glb` ins Repo übertragen. Nie den kompletten alten `assets`-Ordner löschen.
Von dem Branch ausgehen, der A0.1.9 enthält. Neuer Branch `test/nordtreppe-a020`.
Zusammenfassung: `Nordtreppe A0.2.0 – Seitliche Steinwangen nahtlos modelliert, Eckpfeiler korrigiert`
Detailliert: `Symmetrische, durchgehende 3D-Wangen und Deckprofile; zu hohe Eckpfeiler ersetzt; fünf Stufenkanten angepasst. A0.1.9 bleibt rücksetzbar.`
Remote-Referenz: `refs/heads/test/nordtreppe-a020`.
Force Push: Aus. `main` unverändert.

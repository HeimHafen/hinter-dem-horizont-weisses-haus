# Hinter dem Horizont – Weißes Haus | Architektur A0.1

**Stand: 16.11.2026 · eigenständiger GitHub-Pages-Prüfstand**

Diese Version baut bewusst **nur die Architektur** der zentralen *Executive Residence* des Weißen Hauses auf. Keine Möbel, Personen, Teppiche, Gemälde oder bisherige Cross-Hall-Dekoration. Die bisherige WH-1.1-Version wird **nicht** überschrieben; eine separate ZIP-Sicherung ist sinnvoll.

## Was tatsächlich vorhanden ist

- Dreidimensionales Bauvolumen mit **51,2 × 26,1 m** äußerem Grundmaß (ohne Portiken), basierend auf der White House Historical Association.
- Sechs auswählbare Gebäudeebenen als unabhängig verwaltete 3D-Bauteile.
- Für die öffentlich dokumentierten Ground-/State-Floors: beschriftete Hauptbereiche und räumliche, **schematisch gesetzte** Trennwände.
- Drei zentrale Salons: Red, Blue, Green; westlicher State Dining Room, östlicher East Room; Entrance Hall und Cross Hall.
- Ground-Floor-Hauptbereiche: Map Room, Diplomatic Reception Room, China Room, Vermeil Room, Library sowie Corridor.
- Außenansicht mit Fassadenrhythmus, Fenster-/Türandeutungen, Nord-/Südportiko, einem Truman-Balkon und einem Dachkörper.
- Auswahl der Etage, Draufsicht, schräg drehbare 3D-Ansicht, Einfinger-Drehung und Zweifinger-Zoom für Safari/Chrome.

## Was **nicht** als exakt gelten darf

- **Die Innenwand-, Tür- und Geschosshöhen sind noch keine aus Originalzeichnungen vermessenen Werte.** Es handelt sich um überprüfbare Architektur-Platzhalter – nicht um eine fertiggestellte 1:1-Rekonstruktion.
- Nicht öffentlich dokumentierte private Bereiche, zusätzliche Untergeschosse, ihre Räume, Stufen und Wege werden **nicht erraten**. Das ist im Geschosswähler erkennbar.
- Die öffentliche Grundrissstruktur beschreibt die allgemein bekannten Haupträume; sie vervollständigt **nicht** automatisch alle 132 Räume.
- Fassadenfenster, Säulen, Portiken und der Balkon sind dreidimensional, aber in diesem ersten Stand **noch nicht** bis zu jedem Profil vermessen.
- Der aktuelle Ostflügel-Um-/Neubau gehört ausdrücklich **nicht** zum Modell. Scope ist der historische zentrale Wohnbau.
- Kein beglaubigter Baubescheid, keine heutige technische Bauausführung, keine Sicherheits- oder Zugangsdokumentation.

## Installation auf GitHub Pages

1. Das ZIP entpacken und **alle Dateien und Ordner daraus** in einen neuen Testbranch oder ein neues Repository hochladen.
2. `index.html` muss direkt im Repository-Hauptverzeichnis stehen.
3. Repository → **Settings → Pages** → `Deploy from a branch`, Branch `main` (oder freigegebener Testbranch), Folder `/(root)`.
4. Nach erfolgreicher Bereitstellung die URL auf iPhone und Desktop öffnen.
5. Die `State Floor`-Ansicht öffnen, Raumlabels/Wände sowie die Außenansicht vergleichen und die Abweichungen dokumentieren.

`src/haus3d.js` erstellt reale 3D-Geometrie im Browser; `src/bauplan.js` enthält die Datensätze und ihre Qualitätskennzeichnung. Ein klassischer Blender-GLB-Export der **vollständigen** Architektur gehört erst zur Phase mit validierten Wänden.

**Drittbibliothek:** Three.js r170 wird von jsDelivr geladen. Für einen reinen Offlinebetrieb muss sie zukünftig lokal eingebunden werden.

### Entwicklungssystem

- **Nicht ohne visuelle Freigabe in `main` übernehmen**.
- Zuerst Baukörper/Fassaden dokumentieren und überprüfen.
- Danach Ground Floor und State Floor anhand überprüfter öffentlicher Pläne.
- Danach öffentlich belegte Treppen- und Terrassenelemente, Etagenübergänge und begehbare Navigation.
- Erst **nach Abschluss der Architektur** Materialien, Bilder, Möbel und Beleuchtung.

Mehr: `docs/QUELLEN_UND_GRENZEN.md`, `docs/ABNAHMEPLAN.md`, `qa/PRUEFBERICHT.md`.

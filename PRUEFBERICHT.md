# QA-Bericht – Architektur A0.1

Prüfdatum: 16.11.2026

## Erfolgreich

- 88 automatisierte **statische** Prüfungen für Quelldateien, Geschoss-IDs, belegte Außenabmessungen, Raumpositionen **innerhalb des Modellrahmens**, Quellpfade und fehlende alte Burg-/Möbelmodule.
- JavaScript-Quellmodule und Inline-Modul bestehen `node --check`.
- Außenmaße im Datenmodell: 51,2 m × 26,1 m (Executive Residence ohne Portiken), nach WHHA.
- Zwei öffentlich beschriebene Hauptgeschosse als getrennte modellierbare Bauteilgruppen; vier weitere Ebenen nur als Hüllen.
- Nord-/Südportiko und Truman-Balkon als echte 3D-Bauteile (vereinfachte historische Annäherungen).
- Keine alte Cross-Hall-Dekoration und kein Burgmodell in der Webseite.

## NICHT erfolgreich vollständig geprüft

- WebGL-Livebild in Safari / Chrome. Lokaler automatisierter Chromium-Test konnte nicht abgeschlossen werden. Die Umgebung konnte außerdem `cdn.jsdelivr.net` nicht auflösen.
- Kollisionen, begehbare Treppen, Raum-zu-Raum-Wege, iPhone-Bildrate, Touch-Steuerung am echten Gerät.
- Zentimetergenaue Innenwandpositionen, Türgrößen, Fensterachsen, Außentreppe und Balkonprofile gegen Originalpläne.
- Genauigkeit/Verfügbarkeit sämtlicher 132 Räume, privater Geschosse und Unterebenen.

**Abnahmeentscheidung:** Als überprüfbares **Architektur-Projektgerüst** geeignet. Nicht als historisch maßstabsgetreuer Vollnachbau freigegeben. Nicht ungeprüft an Stelle der funktionierenden WH-1.1-Liveversion einsetzen.

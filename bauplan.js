/**
 * Hinter dem Horizont – Architekturstudie A0.1, 16.11.2026.
 * Herkunft/Genauigkeit: siehe docs/QUELLEN_UND_GRENZEN.md
 * Das äußere Hüllmaß der Executive Residence ist belegt: 51.2 × 26.1 m.
 * Innere Rechtecke, Wandpositionen und Geschosshöhen sind ausdrücklich NICHT vermessen.
 * Keine Darstellung von Sicherheitsinfrastruktur, nicht veröffentlichten Wegen
 * oder nicht öffentlich dokumentierten privaten Grundrissen.
 */
export const HAUS = Object.freeze({
  id: 'residence-historical-study',
  name: 'Weißes Haus – Executive Residence (historische Architekturstudie)',
  edition: 'A0.1',
  footprint: Object.freeze({eastWestM:51.2, northSouthM:26.1, provenance:'WHHA White House Dimensions'}),
  northHeightM: 18.4,
  floors: Object.freeze([
    {id:'sub2', name:'Unterebene II', y:-6.6, status:'nur Gebäudehülle – nicht dokumentiert'},
    {id:'sub1', name:'Unterebene I', y:-3.2, status:'nur Gebäudehülle – nicht dokumentiert'},
    {id:'ground',name:'Ground Floor',y:0, status:'öffentliche Haupträume, schematisch'},
    {id:'state', name:'State Floor',y:4.35,status:'öffentliche Haupträume, schematisch'},
    {id:'second',name:'Second Floor',y:8.75,status:'private Ebene – nur äußere Form'},
    {id:'third', name:'Third Floor',y:12.50,status:'private Ebene – nur äußere Form'}
  ]),
  publicRooms: Object.freeze({
    ground:[
      {name:'Map Room',x:-17.5,z:-5.2,w:8,h:10,certainty:'approx'},
      {name:'Diplomatic Reception Room',x:-7.0,z:-5.6,w:9,h:9,certainty:'approx'},
      {name:'China Room',x:2.0,z:-5.6,w:7,h:9,certainty:'approx'},
      {name:'Vermeil Room',x:10.2,z:-5.6,w:8,h:9,certainty:'approx'},
      {name:'Library',x:19.2,z:-5.6,w:10,h:9,certainty:'approx'},
      {name:'Ground Floor Corridor',x:0,z:4.7,w:44,h:4,certainty:'approx'}
    ],
    state:[
      {name:'State Dining Room',x:-19.15,z:-6.5,w:12.6,h:12.6,certainty:'approx'},
      {name:'Family Dining Room',x:-19.15,z:7.3,w:12.6,h:10,certainty:'approx'},
      {name:'Red Room',x:-8.5,z:-6.5,w:8.7,h:11,certainty:'approx'},
      {name:'Blue Room',x:0,z:-6.5,w:8.2,h:11,certainty:'approx'},
      {name:'Green Room',x:8.5,z:-6.5,w:8.7,h:11,certainty:'approx'},
      {name:'Cross Hall',x:0,z:2.15,w:25,h:4.2,certainty:'approx'},
      {name:'Entrance Hall',x:0,z:8.3,w:14,h:8,certainty:'approx'},
      {name:'East Room',x:19.45,z:0,w:12.3,h:25,certainty:'approx'}
    ]
  }),
  sources: Object.freeze([
    'https://www.whitehousehistory.org/press-room/press-backgrounders/white-house-dimensions',
    'https://www.nps.gov/whho/planyourvisit/park-brochure.htm',
    'https://www.whitehousehistory.org/photos/james-hoban-floor-plan',
    'https://www.whitehousehistory.org/in-a-white-house-passageway',
    'https://www.whitehousehistory.org/galleries/white-house-south-portico'
  ])
});

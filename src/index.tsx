import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// @ts-ignore
import reportWebVitals from './reportWebVitals';


const DATA = [
  { id: "0", 
    nom: "Préparer la réunion avec les C.E. et les T.L.", 
    description: "Développement, plan de test et déploiement du MVP.", 
    localisation: "37 Boulevard De Cadréan, 44550 Montoir-de-Bretagne", 
    dateHeure:"28/05/2024, 12:30", 
    completed: true },

  { id: "1", 
    nom: "Mettre en place la documentation du Projet 'Tracking'", 
    description: "Documentation Users - Devs - CE - TL.", 
    localisation: "37 Boulevard De Cadréan, 44550 Montoir-de-Bretagne", 
    dateHeure:"28/05/2024, 14:45", 
    completed: false },

  { id: "2", 
    nom: "Correction du bug d'affichage de la liste des activités ", 
    description: "Elle n'apparaît pas lors du chargement du UserForm.", 
    localisation: "2 rue de la Briantaie, 49440 Candé", 
    dateHeure:"22/05/2024, 09:30", 
    completed: true },

  { id: "3", 
    nom: "Créer une appli. de Gestion des Temps d'Activité", 
    description: "Suivre le cahier des charges transmit par mail.", 
    localisation: "Trignac, Loire-Atlantique, France", 
    dateHeure:"30/06/2024, 00:00", 
    completed: false },
];

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App taches={DATA} />
  </React.StrictMode>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

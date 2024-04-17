import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const DATA = [
  { id: "todo-0", nom: "Se lever", completed: true },
  { id: "todo-1", nom: "Manger", completed: true },
  { id: "todo-2", nom: "Se préparer (douche + sac)", completed: false },
  { id: "todo-3", nom: "Prendre le bus (ligne n°3)", completed: false },
  { id: "todo-4", nom: "Faire ses devoirs", completed: false },
  { id: "todo-5", nom: "Faire une sieste", completed: true },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App taches={DATA} />
  </React.StrictMode>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const DATA = [
  { id: "todo-0", name: "Se lever", completed: true },
  { id: "todo-1", name: "Manger", completed: true },
  { id: "todo-2", name: "Se préparer (douche + sac)", completed: false },
  { id: "todo-3", name: "Prendre le bus (ligne n°3)", completed: false },
  { id: "todo-4", name: "Faire ses devoirs", completed: false },
  { id: "todo-5", name: "Faire une sieste", completed: true },
];

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App tasks={DATA} />
  </React.StrictMode>,
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

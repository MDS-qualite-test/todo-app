import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


const DATA = [
  { id: "todo-0", nom: "Tâche 1", description: "Lorem Ipsum Dolor Sit Amet.", localisation: "xxx", dateHeure:"gareafe", completed: true },
  { id: "todo-1", nom: "Tâche 2", description: "Lorem Ipsum Dolor Sit Amet.", localisation: "xxxx", dateHeure:"trhefd", completed: true },
  { id: "todo-2", nom: "Tâche 3", description: "Lorem Ipsum Dolor Sit Amet.", localisation: "xxxxx", dateHeure:"czrgx", completed: false },
  { id: "todo-3", nom: "Tâche 4", description: "Lorem Ipsum Dolor Sit Amet.", localisation: "xxxxxx", dateHeure:"zrhcsgcser", completed: false },
  { id: "todo-4", nom: "Tâche 5", description: "Lorem Ipsum Dolor Sit Amet.", localisation: "xxxxxxx", dateHeure:"czrcfse", completed: false },
  { id: "todo-5", nom: "Tâche 6", description: "Lorem Ipsum Dolor Sit Amet.", localisation: "xxxxxxxx", dateHeure:"zrffxz", completed: true },
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

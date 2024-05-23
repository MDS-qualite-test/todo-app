import { useState, useRef } from "react";
import { nanoid } from "nanoid";

import Formulaire from "./components/form";
import Filtres from "./components/filtres";
import Todo from "./components/todo";
import Footer from "./components/footer";

const FILTRE_MAP = {
  "Toutes": () => true,
  "En cours": (task) => !task.completed,
  "Realisées": (task) => task.completed,
};
const FILTRE_NOMS = Object.keys(FILTRE_MAP);

function App(props) {
  const [taches, setTasks] = useState(props.taches);
  const [filtre, setFilter] = useState("Toutes");
  const listeTaches = taches
    .filter(FILTRE_MAP[filtre])
    .map((task) => (
      <Todo
        id={task.id}
        nom={task.nom}
        description={task.description}
        localisation={task.localisation}
        dateHeure={task.dateHeure}
        completed={task.completed}
        key={task.id}
        majTacheCompletee={majTacheCompletee}
        suppTache={suppTache}
        modifTache={modifTache}
      />
    ));

  const filtrerListe = FILTRE_NOMS.map((nom) => (
    <Filtres key={nom} nom={nom} isPressed={nom === filtre} setFilter={setFilter} />
  ));

  const motsTaches =
    listeTaches.length !== 1 ? "tâches restantes." : "tâche restante.";
  const texteHeader = `${listeTaches.length} ${motsTaches}`;

  function ajtTache(nom, description, localisation, dateHeure) {
    const nouvTache = {
      id: `todo-${nanoid()}`,
      nom,
      description,
      localisation,
      dateHeure,
      completed: false,
    };
    setTasks([...taches, nouvTache]);
  }

  function suppTache(id) {
    const tachesRestantes = taches.filter((task) => id !== task.id);
    setTasks(tachesRestantes);
  }

  function modifTache(id, nouvNom, nouvDesc, nouvLoca, nouvDh) {
    const modifListeTache = taches.map((task) => {
      if (id === task.id) {
        return {
          ...task,
          nom: nouvNom,
          description: nouvDesc,
          localisation: nouvLoca,
          dateHeure: nouvDh,
        };
      }
      return task;
    });
    setTasks(modifListeTache);
  }

  function majTacheCompletee(id) {
    const majTaches = taches.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(majTaches);
  }

  const listHeadingRef = useRef(null);

  return (
    <div className="todoapp stack-large">
      <h1>&#128507;&bull; FujiTask</h1>
      <div className="sepp" />
      <Formulaire ajtTache={ajtTache} />
      <div className="filters btn-group stack-exception">
        {filtrerListe}
      </div>
      <div className="sepp" />
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {texteHeader}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {listeTaches}
      </ul>
      <div className="sepp" />
      <Footer />
    </div>
  );
}

export default App;
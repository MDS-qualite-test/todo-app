import { useState, useRef } from "react";
import { nanoid } from "nanoid";

import TodoForm from "./components/TodoForm";
import TodoFilters from "./components/TodoFilters";
import TodoItem from "./components/TodoItem";
import Footer from "./components/Footer";

const FILTRE_MAP: { [key: string]: (task: Task) => boolean } = {
  "Toutes": () => true,
  "En cours": (task) => !task.completed,
  "Realisées": (task) => task.completed,
};
const FILTRE_NOMS = Object.keys(FILTRE_MAP);

type Task = {
  id: string;
  nom: string;
  description: string;
  localisation: string;
  dateHeure: string;
  completed: boolean;
};

interface AppProps {
  taches?: Task[];
}

function App(props: AppProps) {
  const [taches, setTasks] = useState<Task[]>(props.taches ?? []);
  const [filtre, setFilter] = useState<string>("Toutes");
  const listeTaches = taches
    .filter(FILTRE_MAP[filtre])
    .map((task) => (
      <TodoItem
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
    <TodoFilters key={nom} nom={nom} isPressed={nom === filtre} setFilter={setFilter} />
  ));

  const motsTaches =
    listeTaches.length !== 1 ? "tâches restantes." : "tâche restante.";
  const texteHeader = `${listeTaches.length} ${motsTaches}`;

  function ajtTache(
    nom: string,
    description: string,
    localisation: string,
    dateHeure: string
  ) {
    const nouvTache: Task = {
      id: `todo-${nanoid()}`,
      nom,
      description,
      localisation,
      dateHeure,
      completed: false,
    };
    setTasks([...taches, nouvTache]);
  }

  function suppTache(id: string) {
    const tachesRestantes = taches.filter((task) => id !== task.id);
    setTasks(tachesRestantes);
  }

  function modifTache(
    id: string,
    nouvNom: string,
    nouvDesc: string,
    nouvLoca: string,
    nouvDh: string
  ) {
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

  function majTacheCompletee(id: string) {
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
      <h1>&#128507;&nbsp;FujiTask</h1>
      <div className="sepp" />
      <TodoForm ajtTache={ajtTache} />
      <div className="filters btn-group stack-exception">
        {filtrerListe}
      </div>
      <div className="sepp" />
      <h2 id="list-heading" tabIndex={-1} ref={listHeadingRef}>
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
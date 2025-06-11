import React from "react";

interface TodoFiltersProps {
  nom: string;
  isPressed: boolean;
  setFilter: (filter: string) => void;
}

function TodoFilters(props: TodoFiltersProps) {
  return (
    <button
      type="button"
      className="btn toggle-btn"
      aria-pressed={props.isPressed}
      onClick={() => props.setFilter(props.nom)}
      title="Filtrer les tâches">
      <span>{props.nom}</span>
    </button>
  );
}

export default TodoFilters;

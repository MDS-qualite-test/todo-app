import React from "react";

function Filtres(props) {
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
  
  export default Filtres;
  
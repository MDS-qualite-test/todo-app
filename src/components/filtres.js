import React from "react";

function Filtres(props) {
    return (
      <button
        type="button"
        className="btn toggle-btn"
        aria-pressed={props.isPressed}
        onClick={() => props.setFilter(props.nom)}>
        <span className="visually-hidden">Show </span>
        <span>{props.nom}</span>
        <span className="visually-hidden"> taches</span>
      </button>
    );
  }
  
  export default Filtres;
  
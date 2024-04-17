import React, { useState } from "react";

function Formulaire(props) {
    const [nom, setNom] = useState("");

    function handleChange(e) {
        setNom(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.ajtTache(nom);
        setNom("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label__lg">Liste des tâches à réaliser.</label>
            </h2>
            <input type="text" id="new-todo-input" className="input input__lg" nom="text" autoComplete="off" value={nom} onChange={handleChange} />
            <button type="submit" className="btn btn__primary btn__lg">Ajouter</button>
        </form>
    );
}

export default Formulaire;
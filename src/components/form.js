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
            <input type="text" id="new-todo-input" className="input input__lg" nom="text" autoComplete="off" value={nom} 
            onChange={handleChange} placeholder="Renseigner une tâche à réaliser..."/>
            <button type="submit" className="btn btn__primary btn__lg" title="Ajouter la tâche">Ajouter</button>
        </form>
    );
}

export default Formulaire;
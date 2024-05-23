import React, { useEffect, useRef, useState } from "react";
import config from '../config.json';

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default function Todo(props) {
    const [estModif, setModif] = useState(false);
    const [nouvNom, setNouvNom] = useState(props.nom); // Initialiser avec la valeur existante de la propriété nom
    const [nouvDesc, setNouvDesc] = useState(props.description); // Initialiser avec la valeur existante de la propriété description
    const [nouvLoca, setNouvLoca] = useState(props.localisation); // Initialiser avec la valeur existante de la propriété localisation
    const [nouvDh, setNouvDh] = useState(props.dateHeure); // Initialiser avec la valeur existante de la propriété dateHeure
    const [selectedOption, setSelectedOption] = useState("Modifier le nom de la tâche");
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);
    const [suggestions, setSuggestions] = useState([]);

    const MAPBOX_API_KEY = config.mapboxApiKey;

    const aEteModif = usePrevious(estModif);
    
    function handleChangeNom(e) {
        setNouvNom(e.target.value);
    }

    function handleChangeDesc(e) {
        setNouvDesc(e.target.value);
    }

    function handleChangeLoca(e) {
        setNouvLoca(e.target.value);
        fetchLocationSuggestions(e.target.value);
    }

    async function fetchLocationSuggestions(value) {
        if (value.length > 2) {
            try {
                const response = await fetch(
                    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${MAPBOX_API_KEY}&autocomplete=true`
                );
                const data = await response.json();
                setSuggestions(data.features);
            } catch (error) {
                console.error("Error fetching location suggestions:", error);
            }
        } else {
            setSuggestions([]);
        }
    }

    function handleSuggestionClick(suggestion) {
        setNouvLoca(suggestion.place_name);
        setSuggestions([]);
    }

    function handleChangeDh(e) {
        setNouvDh(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.modifTache(props.id, nouvNom, nouvDesc, nouvLoca, nouvDh);
        setModif(false);
    }

    function handleSelectChange(e) {
        setSelectedOption(e.target.value);
    }
    
    const modifTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <select name="modifs" id="modif-select" onChange={handleSelectChange} value={selectedOption}>
                    <option value="Modifier le nom de la tâche">&#9999;&#65039; &#x7C; Modifier le nom de la tâche</option>
                    <option value="Modifier la description">&#128203; &#x7C; Modifier la description de la tâche</option>
                    <option value="Modifier la localisation">&#128204; &#x7C; Modifier la localisation de la tâche</option>
                    <option value="Modifier la date/l'heure">&#128197; &#x7C; Modifier la date/l'heure de la tâche</option>
                </select>
                {selectedOption === "Modifier le nom de la tâche" && (
                    <div>
                        <input 
                            id={props.id} 
                            className="todo-text" 
                            type="text" 
                            value={nouvNom} 
                            onChange={handleChangeNom} 
                            ref={editFieldRef}
                            placeholder="Nouveau nom"
                        />
                    </div>
                )}
                {selectedOption === "Modifier la description" && (
                    <div>
                        <textarea
                            id={props.id} 
                            className="todo-text" 
                            value={nouvDesc} 
                            onChange={handleChangeDesc} 
                            ref={editFieldRef}
                            placeholder="Nouvelle description"
                            maxLength={420}
                            rows={1}
                            style={{
                                resize: 'vertical',
                            }}
                        />
                    </div>
                )}
                {selectedOption === "Modifier la localisation" && (
                    <div>
                        <input 
                            id={props.id} 
                            className="todo-text" 
                            type="text" 
                            value={nouvLoca} 
                            onChange={handleChangeLoca} 
                            ref={editFieldRef} 
                            placeholder="Nouvelle localisation"
                        />
                        {suggestions.length > 0 && (
                            <ul className="suggestions-list">
                                {suggestions.map((suggestion, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                    >
                                        {suggestion.place_name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
                {selectedOption === "Modifier la date/l'heure" && (
                    <div>
                        <input 
                            id={props.id} 
                            className="todo-text" 
                            type="text" 
                            value={nouvDh}
                            onChange={handleChangeDh} 
                            ref={editFieldRef}
                            placeholder="Nouvelle date/heure"
                            pattern="\d{2}/\d{2}/\d{4}, \d{2}:\d{2}"
                        />
                    </div>
                )}
            </div>
            <div className="sepp" />
            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setModif(false)}>&#128281; Annuler</button>
                <button type="submit" className="btn btn__primary todo-edit">&#128190; Sauvegarder</button>
            </div>
        </form>
    );

    const voirTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.majTacheCompletee(props.id)} />
                <label className="todo-label" htmlFor={props.id}>
                    <li><b>&nbsp;{props.nom}</b></li>
                    <li>&#128203; {props.description}</li>
                    <li>&#128204; {props.localisation}</li>
                    <li>&#128197; {props.dateHeure}</li>
                </label>
            </div>
            <div className="sepp" />
            <div className="btn-group">
                <button type="button" className="btn" onClick={() => setModif(true)} ref={editButtonRef}>&#128221; Modifier</button>
                <button type="button" className="btn btn__danger" onClick={handleDeleteClick}>&#128465;&#65039; Supprimer</button>
            </div>
        </div>
    );

    useEffect(() => {
        if (!aEteModif && estModif) {
            editFieldRef.current.focus();
        } else if (aEteModif && !estModif) {
            editButtonRef.current.focus();
        }
    }, [aEteModif, estModif]);

    function handleDeleteClick() {
        const isConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?");
        if (isConfirmed) {
            props.suppTache(props.id);
        }
    }
    
    return <li className="todo">{estModif ? modifTemplate : voirTemplate}</li>;
}
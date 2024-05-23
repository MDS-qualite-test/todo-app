import { useEffect, useRef, useState } from "react";

function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}
  
export default function Todo(props) {
    const [estModif, setModif] = useState(false);
    const [nouvNom, setNouvNom] = useState("");
    const [nouvDesc, setNouvDesc] = useState("");
    const [nouvLoca, setNouvLoca] = useState("");
    const [nouvDh, setNouvDh] = useState("");
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const aEteModif = usePrevious(estModif);

    function handleChangeNom(e) {
        setNouvNom(e.target.value);
    }

    function handleChangeDesc(e) {
        setNouvDesc(e.target.value);
    }

    function handleChangeLoca(e) {
        setNouvLoca(e.target.value);
    }

    function handleChangeDh(e) {
        setNouvDh(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        props.modifTache(props.id, nouvNom, nouvDesc, nouvLoca, nouvDh);
        setNouvNom("");
        setNouvDesc("");
        setNouvLoca("");
        setNouvDh("");
        setModif(false);
    }
      
    const modifTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>&#9999;&#65039; &bull; {props.nom}</label>
                <input 
                    id={props.id} 
                    className="todo-text" 
                    type="text" 
                    value={nouvNom} 
                    onChange={handleChangeNom} 
                    ref={editFieldRef}
                    placeholder="Renommer la tâche"
                />
                <label className="todo-label" htmlFor={props.id}>&#128203; &bull; {props.description}</label>
                <input 
                    id={props.id} 
                    className="todo-text" 
                    type="text" value={nouvDesc} 
                    onChange={handleChangeDesc} 
                    ref={editFieldRef}
                    placeholder="Modifier la description"
                />
                <label className="todo-label" htmlFor={props.id}>&#128204; &bull; {props.localisation}</label>
                <input 
                    id={props.id} 
                    className="todo-text" 
                    type="text" 
                    value={nouvLoca} 
                    onChange={handleChangeLoca} 
                    ref={editFieldRef} 
                    placeholder="Modifier la localisation"
                />
                <label className="todo-label" htmlFor={props.id}>&#128197; &bull; {props.dateHeure}</label>
                <input 
                    id={props.id} 
                    className="todo-text" 
                    type="text" 
                    value={nouvDh} 
                    onChange={handleChangeDh} 
                    ref={editFieldRef}
                    placeholder="Modifier la date/heure"
                />
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setModif(false)}>Annuler</button>
                <button type="submit" className="btn btn__primary todo-edit">Sauvegarder</button>
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
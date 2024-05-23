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

    function handleChange(e) {
        setNouvNom(e.target.value);
        setNouvDesc(e.target.value);
        setNouvLoca(e.target.value);
        setNouvDh(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        props.modifTache(props.id, nouvNom);
        setNouvNom("");
        setNouvDesc("");
        setNouvLoca("");
        setNouvDh("");
        setModif(false);
    }
      
    const modifTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    <b>Renommer la tâche :</b> {props.nom}
                </label>
                <input id={props.id} className="todo-text" type="text" value={nouvNom} onChange={handleChange} ref={editFieldRef} />
                <label className="todo-label" htmlFor={props.id}>
                    <b>Modifier la description :</b> {props.description}
                </label>
                <input id={props.id} className="todo-text" type="text" value={nouvDesc} onChange={handleChange} ref={editFieldRef} />
                <label className="todo-label" htmlFor={props.id}>
                    <b>Modifier la localisation :</b> {props.localisation}
                </label>
                <input id={props.id} className="todo-text" type="text" value={nouvLoca} onChange={handleChange} ref={editFieldRef} />
                <label className="todo-label" htmlFor={props.id}>
                    <b>Modifier la date/heure :</b> {props.dateHeure}
                </label>
                <input id={props.id} className="todo-text" type="text" value={nouvDh} onChange={handleChange} ref={editFieldRef} />
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
                <button type="button" className="btn" onClick={() => setModif(true)} ref={editButtonRef}>Modifier</button>
                <button type="button" className="btn btn__danger" onClick={() => props.suppTache(props.id)}>Supprimer</button>
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
    
    return <li className="todo">{estModif ? modifTemplate : voirTemplate}</li>;
}
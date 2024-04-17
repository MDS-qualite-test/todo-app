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
    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const aEteModif = usePrevious(estModif);

    function handleChange(e) {
        setNouvNom(e.target.value);
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        props.modifTache(props.id, nouvNom);
        setNouvNom("");
        setModif(false);
    }
      
    const modifTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="todo-label" htmlFor={props.id}>
                    <b>Renommer la tâche :</b> {props.nom}
                </label>
                <input id={props.id} className="todo-text" type="text" value={nouvNom} onChange={handleChange} ref={editFieldRef} />
            </div>
            <div className="btn-group">
                <button type="button" className="btn todo-cancel" onClick={() => setModif(false)}>
                    Annuler
                    <span className="visually-hidden">Renommer la tâche : {props.nom}</span>
                </button>
                <button type="submit" className="btn btn__primary todo-edit">
                    Sauvegarder
                    <span className="visually-hidden">Renommer la tâche : {props.nom}</span>
                </button>
            </div>
        </form>
    );

    const voirTemplate = (
        <div className="stack-small">
            <div className="c-cb">
                <input id={props.id} type="checkbox" defaultChecked={props.completed} onChange={() => props.majTacheCompletee(props.id)} />
                <label className="todo-label" htmlFor={props.id}>
                    {props.nom}
                </label>
            </div>
            <div className="btn-group">
                <button type="button" className="btn" onClick={() => setModif(true)} ref={editButtonRef}>
                    Modifier <span className="visually-hidden">{props.nom}</span>
                </button>
                <button type="button" className="btn btn__danger" onClick={() => props.suppTache(props.id)}>
                    Supprimer <span className="visually-hidden">{props.nom}</span>
                </button>
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
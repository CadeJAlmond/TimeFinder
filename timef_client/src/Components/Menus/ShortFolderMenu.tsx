import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

import { UserEvent } from "../../Types/state-types";

import { State } from "../../State/reducers/root-reducer";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import './FolderMenu.css'

type FolderMenuParams = {
    open: boolean,
    activeEvent: UserEvent,
    selectFolder: (  eventID : number, selectedFolder: string, toAdd : boolean) => void,
}

export default function ShortFolderMenu ({open, activeEvent, selectFolder}: FolderMenuParams) { 
    const [isOpen, setOpen] = useState(false)
    const [activeFolders, setActFolders] = useState<any[]>([]) 
    const [highLightFolder, setHLFolder] = useState<number>(-1)

    type appState = {
        folders: string[],
        folderNotes: {[key: string]: any[]},
        folderEvents: {[key: string]: any[]},
    };

    const state : appState = useSelector((state : State) => state.auth)    

    useEffect( () =>{
        let eventFolders = [] 

        if(activeEvent != null ) {
        eventFolders = ( state.folderEvents[activeEvent.eventName] == undefined ? 
            [] : state.folderEvents[activeEvent.eventName]  ) }

        setActFolders(eventFolders)
    }, [activeEvent])

    const clearFolders = (e : any) => {
        e.stopPropagation()
        setActFolders([])
    }

    const selectedFolder = (e : any, folder : string) => {
        e.stopPropagation()
        selectFolder(activeEvent.eventID, folder, activeFolders.includes(folder))
        setActFolders([folder])
    }

    if(!open) return <></>

    return (
        <div onBlur = { ()=>setOpen(false) } 
            onClick = { ()=>setOpen(!isOpen)  } 
            tabIndex={0} 
            className="folderMenu shortMenu">
            <button onClick = { (e) => clearFolders(e) } className="menuClose">
                <FontAwesomeIcon icon={faX}/>
            </button>
            <div className="divider"></div>
            <div className="menuOpen"></div>
            <ul className={`folders ${ isOpen ? "show" : ""}`}>
                {state.folders.map( ( folder, i ) => (
                    <li 
                    key={folder}
                    onMouseEnter = {() => setHLFolder(i)} 
                    onClick = { (e) => selectedFolder(e, folder)}
                    className={
                        `${highLightFolder === i ? "highlighted" : ""}
                         ${activeFolders.includes(folder) ? "selected" : ""}`}>
                        {folder}
                    </li>
                ))}
            </ul>
        </div>
    )
}
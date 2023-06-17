import { State } from "../../State/reducers/root-reducer";
import { useSelector } from "react-redux";
import './FolderMenu.css'
import { useState, useEffect } from "react";
import { UserNotes } from "../../Types/state-types";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type FolderMenuParams = {
    open: boolean,
    multiple: boolean,
    activeNote: UserNotes | null,
    selectFolder: (selectedFolder: string) => void,
    onEmptyMsg : string
}

export default function FolderMenu ({open, multiple, activeNote, selectFolder, onEmptyMsg}: FolderMenuParams) { 
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
        let noteFolders = [] 

        if(activeNote != null ) {
        noteFolders = ( state.folderNotes[activeNote.noteTitle] == undefined ? 
            [] : state.folderNotes[activeNote.noteTitle]  ) }

        setActFolders(noteFolders)
    }, [activeNote])

    const clearFolders = (e : any) => {
        e.stopPropagation()
        setActFolders([])

        if(onEmptyMsg = "Folder : ")
            selectFolder("")
    }

    const selectedFolder = (e : any, folder : string) => {
        e.stopPropagation()
        if(multiple) {
            if(!activeFolders.includes(folder)) {
                selectFolder(folder)
                setActFolders([...activeFolders, folder])
            }
        }
        else {
            selectFolder(folder)
            setActFolders([folder])
        }
    }

    const removeFromFolders = ( e : any, folder : string) => {
        e.stopPropagation()
        const updateFolders = activeFolders.filter( _folder => _folder != folder );
        setActFolders(updateFolders)
    }

    if(!open) return <></>

    return (
        <div onBlur = { ()=>setOpen(false) } 
            onClick = { ()=>setOpen(!isOpen)  } 
            tabIndex={0} 
            className="folderMenu">
            <span className="selectedFolders">
            {activeFolders.length == 0 ? <span>{onEmptyMsg}</span> :
            activeFolders.map( ( folder, i ) => (
                <button 
                key={folder} 
                className="currentFolder"
                onClick = { (e) => removeFromFolders(e, folder)}>
                    {folder}
                </button>
            ))}
            </span>
            <button onClick = { (e) => clearFolders(e) } className="menuClose">
                <FontAwesomeIcon icon={faX}/>
            </button>
            <div className="divider"></div>
            <div className="menuOpen"></div>
            <ul className={`folders ${isOpen ? "show" : ""}`}>
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
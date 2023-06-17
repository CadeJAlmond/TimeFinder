import { createFolder } from '../State/action-creators/folder-action-creators';

// State management
import { State } from '../State/reducers/root-reducer';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export default function FolderPage() { 
    const[folders, setFolders ] = useState<string[]>([])
    const[events, setEvents   ] = useState<any []>([])
    const[notes,  setNotes    ] = useState<any []>([])

    const[folderName, setFolderName] = useState("")

    type appState = {
        folderNotes:  {[key: string]: any[]},
        folderEvents: {[key: string]: any[]},
        folders: []
    };
    const state : appState = useSelector((state : State) => state.auth)
 
    useEffect( () => {
        setFolders(state.folders)
    }, [state] )

    const formRef = useRef<HTMLFormElement>(null);

    // Allow the user to create a folder
    const addNewFolder = (e : any) => {
        e.preventDefault()
        if(folderName != "")
            createFolder(folderName)
        formRef.current?.reset()
    }

    // Retrieve all contents contained in a User's folder
    const showFolderInfo = (folderName : string) => {
        state.folderEvents[folderName] == undefined ?
            setEvents([]) :  setEvents(state.folderEvents[folderName])

        state.folderNotes[folderName] == undefined ?
            setNotes([]) :  setNotes(state.folderNotes[folderName])
    }

    return(
        <div className="foldersContainer">
            <div className="folderNavigation">
                <div className="folderForm">
                    <form ref={formRef}>
                        <h1>Create Form : </h1>
                        <input placeholder="Folder name" onChange ={(e) => setFolderName(e.target.value)}/>
                        <button onClick = { (e) => addNewFolder(e) } >Create</button>
                    </form>
                </div>
                <div className="folders">
                    {folders.map( (folder) =>
                        <div className="folderCard" onClick = {(e) => showFolderInfo(folder)} >
                            <h2>{folder}</h2>
                        </div>
                    )}
                </div>
            </div>
            <div className="folderDisplay">
                <div className="folderEvents">
                    <div>
                        <h1>Events :</h1>
                    </div>
                    <div className='events'>
                        {events.map( (event ) =>
                            <div className="noteCard" >
                            <h4>{event.eventName}</h4>
                        </div>
                        )}
                    </div>
                </div>
                <div className="folderNotes">
                    <div>
                        <h1>Notes :</h1>
                    </div>
                    <div className='notes'>
                        {notes.map( ( note ) =>
                            <div className="noteCard" >
                                <h4>{note.noteTitle}</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
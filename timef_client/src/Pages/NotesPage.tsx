// User Actions
import { createNote, updateUserNote, getNotes } from '../State/action-creators/note-action-creators';
import { addFolderNote } from '../State/action-creators/folder-action-creators';
// Type Definitions
import { UserProfile, UserNotes } from '../Types/state-types';

import FolderMenu from '../Components/Menus/FolderMenu'

// State Management
import { State } from '../State/reducers/root-reducer';
import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function NotesPage() {
    // Note Interaction
    const[activeNote, setActiveNote] = useState< UserNotes | any>(null)
    const[openFilter, setFilterOpen] = useState<boolean>(false)
    const[userNotes, setNotes] = useState <any> ([])
    const[filter, setFilter  ] = useState<string>("")      
    const[inputs, setInputs] = useState({
        noteTitle: "",
        noteContent: "",
        userName: ""
    })

    const formRef = useRef<HTMLFormElement>(null);

    const state : appState = useSelector((state : State) => state.auth)
    
    type appState = {
        currentUser: UserProfile | null,
        folderNotes: {[key: string]: any[]},
        notes: UserNotes[]
    };

    useEffect( ()=> {
        if(state.currentUser != null) {
            inputs.userName = state.currentUser.userName
            getNotes(inputs)
        }
    }, [])

    useEffect( () => setNotes(state.notes), [state, createNote])

    const newNoteSubmit = async (e : any) => {
        e.preventDefault()
        const newNote = inputs
        if(state.currentUser != null) {
            newNote.userName = state.currentUser.userName
            setInputs(newNote)
            try{
                createNote(inputs)
            }
            catch(e){
                console.log(e)
            }
        }
        formRef.current?.reset()
    }

    const addToFolder = (selectedFolder : string) => 
        addFolderNote({"iD" : activeNote.noteId, "folderName" : selectedFolder})

    const searchByFolder = (selectedFolder : string) => {        
        let newFolders = 
            ( state.folderNotes[selectedFolder] == undefined ? 
            [] : state.folderNotes[selectedFolder])
        
        selectedFolder == "" ? setNotes(state.notes) :
            setNotes(newFolders)
    }

    const updateDisplayNote = (activeNoteId : number) => {
        const selectedNote = userNotes.filter( (note : UserNotes) => note.noteId === activeNoteId)[0] as UserNotes
        setActiveNote(selectedNote)
    }

    const updateNote = () => {
        const updatedNote = {
            noteTitle: activeNote.noteTitle,
            noteContent: activeNote.noteContent,
            noteId: activeNote.noteId,
            userName: ""
        }
        updateUserNote(updatedNote)
    }

    const updateNoteFields = (e : any) =>{
        const target = e.target as HTMLInputElement
        setInputs( prev => ({ ...prev, [target.name]: target.value }) )
    }

    const updateSelectedNoteFields = (e : any) =>{
        const target = e.target as HTMLInputElement
        const tValue = target.value
        const tName  = target.name
        // For some reason the setActiveNote does not work unless
        // I include the line below ( let updateNote ) 
        let updateNote = activeNote
        setActiveNote({...activeNote, [tName] : tValue})
    }
    
    const filterNotes = () : UserNotes[] => {
        const filteredNotes = ( filter == "" ? userNotes : (
             userNotes.filter((note : UserNotes) => note.noteTitle.startsWith(filter) 
        )))
        return filteredNotes
    }

    const UserNoteCards = () => {
        return ( <>
            {filterNotes().map((note : any, i: number) => (
            <div className={`note ${note.noteId === activeNote?.noteId && "active"}`}
            onClick = { ()=> updateDisplayNote(note.noteId)} >
                <h2>{note.noteTitle}</h2>
                <p>{ note.noteContent.length < 80 ?
                     note.noteContent :
                     note.noteContent.substring(0, 80) + '...'}
                </p>
            </div>
        ))}
        </> )
    }

    return (
        <div className="notesContainer">
            <div className ="notesFormContainer">
                <button onClick = { (e) => newNoteSubmit(e) } >
                    <FontAwesomeIcon icon={faPlus} />
                    Create Note</button>
                <form ref={formRef}>
                    <div>
                        <h3>Title :</h3>
                        <input onChange = { (e) => updateNoteFields(e) } placeholder="Note Name" name="noteTitle"/>
                    </div>
                    <div>
                        <h3>Content :</h3>
                        <textarea onChange = { (e) => updateNoteFields(e) }
                        className="noteContentField" placeholder="Note Content" name="noteContent"/>
                    </div>
                </form>
            </div>
            <div className="currentNoteInfo">
                <div className="noteContentContainer">
                    { activeNote == null ? (
                        <>
                        <h1>TITLE</h1>
                        <p>Note content ....</p>
                        </> ) : (
                        <>
                        <input value={activeNote.noteTitle} name="noteTitle" onChange = { (e) => updateSelectedNoteFields(e)}/>
                        <FolderMenu 
                            open={true} 
                            multiple={true}
                            activeNote={activeNote}
                            selectFolder={addToFolder} 
                            onEmptyMsg = {" ( 0 Folders... ) "}/>
                        <textarea onChange = { (e) => updateSelectedNoteFields(e) } 
                        value={activeNote.noteContent as string} name="noteContent"/>
                        <button className='updateBtn' onClick = { updateNote } > Update Note </button>
                        </>
                    )}
                </div>
            </div>
            <div className="notesNavigationContainer">
                <h1>My Notes : 
                    { openFilter ? <button onClick={() => setFilterOpen(false)}
                                           className="closeBtn" > Close </button> : <></> } 
                </h1> 
                { !openFilter ? (
                    <button className="openBtn" onClick={() => setFilterOpen(true)}>Filters</button>
                ) : (
                <div className="filters">
                    <input type="search"
                           placeholder ="Search Name : " 
                           onChange = { (e) => setFilter(e.target.value) }/>
                    <FolderMenu 
                        open={true}
                        multiple={false}
                        activeNote={ null }
                        selectFolder={searchByFolder} 
                        onEmptyMsg = {"Folder : "}/>
                </div>
                )}
                <div className={`noteCardContainer`}>
                    <UserNoteCards/>
                </div>
            </div>
        </div>
    )
}
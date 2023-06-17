// =========---- ACTION-CREATORS.TS ----=========
// @ Brief : This class is meant to provide importable functions 
//     to other components to interact with the Redux store and 
//     execute API calls via Redux Saga. Related to User Notes :
// @ Exports 
//     - Notes : getNotes, createNote

// Imports
import { NoteParams } from "../../Types/parameter-types";
import { Notes } from '../action-types/saga-actions'
import store from '../store'

// ## ------------- NOTES ------------- ##
// ======================================

export const getNotes = (payload: NoteParams) => {
    store.dispatch({type: Notes.GETNOTES_REQUEST, payload})
}

export const createNote = (payload: NoteParams) => {
    store.dispatch({type: Notes.CREATENOTE_REQUEST, payload})
}

export const updateUserNote = ( payload: NoteParams ) => {
    store.dispatch({type : Notes.UPDATENOTE_REQUEST, payload})
}

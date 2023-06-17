// =========---- ACTION-CREATORS.TS ----=========
// @ Brief : This class is meant to provide importable functions 
//     to other components to interact with the Redux store and 
//     execute API calls via Redux Saga. Related to User Folders :
// @ Exports 
//     - Folders   : getFolders, createFolder, addFolderEvent,
//                   addFolderNote

import { FolderInput } from "../../Types/parameter-types";
import { Folders } from '../action-types/saga-actions'
import store from '../store'

// ## ------------- FOLDERS ------------- ##
// =========================================

export const getFolders = () => {
    store.dispatch({type: Folders.GETFOLDERS_REQUEST})
}

export const createFolder = (payload: string) => {
    store.dispatch({type: Folders.CREATE_FOLDER, payload})
}

export const addFolderEvent = (payload: FolderInput) => {
    store.dispatch({type: Folders.ADDEVENT_REQUEST, payload})
}

export const addFolderNote = (payload: FolderInput) => {
    store.dispatch({type: Folders.ADDNOTE_REQUEST, payload})
}
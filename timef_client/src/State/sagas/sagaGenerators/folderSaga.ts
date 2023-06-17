import { ActionType } from '../../action-types/user-action-types'
import * as Params from '../../../Types/saga-parameter-types'
import * as PayloadType from "../../../Types/parameter-types"
import { call, put } from 'redux-saga/effects'
import { currentUser } from './userSaga';
import axios from 'axios'

const APIUrl = "http://localhost:2000/api"

// ## ------------- FOLDERS ------------- ##
// =========================================


const createFolder = async(payload: string) => 
    axios.post(`${APIUrl}/folders/createFolder/${currentUser}`, {folderName : payload})

export function* createFolderSaga({payload, type} : Params.SagaCreateFolder) {
    try {
        const res : {data : any} = yield call(createFolder, payload) 
        yield put({type : ActionType.UPDATE_FOLDERS, payload: res.data})
    }
    catch(e) {
        console.log(e)
    }
}

const addFolderEvent = async(payload: PayloadType.FolderInput) => 
    axios.post(`${APIUrl}/folders/addEvent/${currentUser}`,
        {"eventId": payload.iD, "folderName" : payload.folderName})

export function* addFolderEventSaga({payload, type} : Params.SagaFolderAdding) {
    try {
        const res : {data : any} = yield call(addFolderEvent, payload) 
        yield put({type : ActionType.UPDATE_FOLDER_EVENTS, payload: res.data})
    }
    catch(e) {

    }
}

const addFolderNote = async(payload: PayloadType.FolderInput) => 
    axios.post(`${APIUrl}/folders/addNote/${currentUser}`, 
        {"noteId": payload.iD, "folderName" : payload.folderName})

export function* addFolderNoteSaga({payload, type} : Params.SagaFolderAdding) {
    try {
        const res : {data : any} = yield call(addFolderNote, payload) 
        yield put({type : ActionType.UPDATE_FOLDER_NOTES, payload: res.data})
    }
    catch(e) {

    }
}

const getUserFolderEvents = async() => 
    axios.get(`${APIUrl}/folders/getEvents/${currentUser}`)
    
const getUserFolderNotes = async() => 
    axios.get(`${APIUrl}/folders/getNotes/${currentUser}`)
 
const getUserFolders = async() => 
    axios.get(`${APIUrl}/folders/${currentUser}`)

export function* getUserFoldersInfo() {
    try {
        const folders : {data : any} = yield call(getUserFolders) 
        yield put({type: ActionType.UPDATE_FOLDERS, payload: folders.data})

        const notes : {data : any} = yield call(getUserFolderNotes) 
        yield put({type : ActionType.UPDATE_FOLDER_NOTES, payload: notes.data})

        const events : {data : any} = yield call(getUserFolderEvents) 
        yield put({type : ActionType.UPDATE_FOLDER_EVENTS, payload: events.data})
    }
    catch(e) {

    }
}
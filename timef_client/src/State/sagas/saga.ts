import { User, Auth, Notes, Events, Folders } from '../action-types/saga-actions';
import { all, call, put, takeEvery } from 'redux-saga/effects'
import { ActionType } from '../action-types/user-action-types'

import * as FolderGenerators from './sagaGenerators/folderSaga'
import * as UserGenerators from './sagaGenerators/userSaga'

import * as Params from '../../Types/saga-parameter-types'
import * as PayloadType from "../../Types/parameter-types"
import axios from 'axios'

let currentUser = ""
const APIUrl = "http://localhost:2000/api"

function* authSaga() {
    yield takeEvery(Auth.LOGIN_REQUEST,  UserGenerators.loginSaga)
    yield takeEvery(Auth.LOGOUT_REQUEST, UserGenerators.logoutSaga)
    yield takeEvery(Auth.REGISTER_REQUEST, UserGenerators.registerSaga)
    yield takeEvery(Auth.RESET_PASSWORD,  UserGenerators.updateUserPassword)
    
    yield takeEvery(User.UPDATE_COLOR_TH, UserGenerators.updateColorThemeSaga)
    yield takeEvery(User.BIO_UPDATE_REQUEST, UserGenerators.updateProfileBio)
    yield takeEvery(User.SEARCH_USERS, UserGenerators.searchUsersSaga)
    yield takeEvery(User.GET_FRIENDS, UserGenerators.getFriendsSaga  )
    yield takeEvery(User.ACCEPT_FRIEND, UserGenerators.sendFriendReqSaga)
    yield takeEvery(User.ADD_FRIEND, UserGenerators.acceptFriendSaga)
    yield takeEvery(User.GET_PENDING, UserGenerators.getPendingSaga)


    yield takeEvery(Events.GETEVENTS_REQUEST, getEventsSaga)
    yield takeEvery(Events.CREATEEVENT_REQUEST, createEventSaga)

    yield takeEvery(Notes.GETNOTES_REQUEST, getNotesSaga)
    yield takeEvery(Notes.CREATENOTE_REQUEST, createNoteSaga)
    yield takeEvery(Notes.UPDATENOTE_REQUEST, updateNoteSaga)
    
    yield takeEvery(Folders.CREATE_FOLDER, FolderGenerators.createFolderSaga)
    yield takeEvery(Folders.ADDEVENT_REQUEST, FolderGenerators.addFolderEventSaga)
    yield takeEvery(Folders.GETFOLDERS_REQUEST, FolderGenerators.getUserFoldersInfo)
    yield takeEvery(Folders.ADDNOTE_REQUEST, FolderGenerators.addFolderNoteSaga)
}

// ## ------------- USER ------------- ##
// ======================================

// ## ------------- EVENTS ------------- ##
// =======================================

const getEvents = async (userName : string) =>
    axios.get(`${APIUrl}/events/${userName}`)

function* getEventsSaga({payload, type} : Params.SagaRetrieveEvents) {
    try {
        const res : {data : any} = yield call(getEvents, payload) 
        yield put({type : ActionType.UPDATE_EVENTS, payload: res.data})
    }
    catch(e) {

    }
}

const createEvent = async (payload:  PayloadType.EventInputs) => 
    axios.post(`${APIUrl}/events/create/${currentUser}`, payload)

function* createEventSaga({payload, type} : Params.SagaCreateEvent) {
    try {
        const res : {data: any} = yield call(createEvent, payload)
        yield put({type: ActionType.UPDATE_EVENTS, payload: res.data})
    }
    catch(e) {

    }
}

// ## ------------- NOTES ------------- ##
// ======================================

const getNotes = async (payload :  PayloadType.NoteParams) =>
    axios.post(`${APIUrl}/notes/${payload.userName}`)

function* getNotesSaga({payload, type} : Params.SagaNotes) {
    try {
        const res : {data : any} = yield call(getNotes, payload) 
        yield put({type : ActionType.UPDATE_NOTES, payload: res.data})
    }
    catch(e) {

    }
}

const createNote = async(payload: PayloadType.NoteParams) => 
    axios.post(`${APIUrl}/notes/create/${currentUser}`, payload)


function* createNoteSaga({payload, type} : Params.SagaNotes) {
    try {
        const res : {data : any} = yield call(createNote, payload) 
        yield put({type : ActionType.UPDATE_NOTES, payload: res.data})
    }
    catch(e) {

    }
}

const updateNote = async(payload: PayloadType.NoteParams) => 
    axios.put(`${APIUrl}/notes/updateNote/${currentUser}`, payload)


function* updateNoteSaga({payload, type} : Params.SagaNotes) {
    try {
        payload.userName = currentUser
        const res : {data : any} = yield call(updateNote, payload) 
        yield put({type : ActionType.UPDATE_NOTES, payload: res.data})
    }
    catch(e) {

    }
}

export default authSaga
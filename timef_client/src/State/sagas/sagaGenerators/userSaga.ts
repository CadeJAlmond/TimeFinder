import { User} from '../../action-types/saga-actions';
import { call, put } from 'redux-saga/effects'
import { ActionType } from '../../action-types/user-action-types'
import { ColorActionType } from "../../action-types/color-actions";

import * as Params from '../../../Types/saga-parameter-types'
import * as PayloadType from "../../../Types/parameter-types"
import axios from 'axios'

export let currentUser = ""
const APIUrl = "http://localhost:2000/api"

const loginUser = async (payload:  PayloadType.LoginParams) =>
    await axios.post(`${APIUrl}/auth/login`, payload)

export function* loginSaga({payload, type} : Params.SagaLoginParams) {
    try {
        const res: { data : any } = yield call(loginUser, payload)
        yield put({ type: ActionType.UPDATE_USER, payload: res.data})
        currentUser = res.data.userName;

        yield put({type: ColorActionType.DISPLAY_THEME,
             payload: res.data.colorTheme})
    }
    catch(e) {
        // here we would put login failed
        //yield put(  )
    }
}

function* registerUser (payload:  PayloadType.RegisterParams) {
    return axios.post(`${APIUrl}/auth/createUser`, payload)
}

export function* registerSaga({payload, type} : Params.SagaRegisterParams) {
    try {
        const res: { data : any } = yield call(registerUser, payload) 
        // here we would put register success
        //yield put()
    }
    catch(e) {
        // here we would put register failed
        //yield put(  )
    }
}

export function* logoutSaga() {
    try {
        yield call( async ()=> { axios.post(`${APIUrl}/auth/logout`) }) 
        yield put({type : ActionType.UPDATE_USER, payload: null})
    }
    catch(e) {
        // here we would put register failed
        // yield put(  )
    }
}

export function* updateUserPassword (payload : {type : any, payload: any}) {
    try {
        if(currentUser != "")
            yield call( async ()=> { axios.put(`${APIUrl}/auth/${currentUser}`,payload.payload)}) 
    }
    catch(e) { }
}

const searchUsers = async (profileName : string) =>
    axios.get(`${APIUrl}/user/search/${profileName}`)

export function* searchUsersSaga (payload: {type: any, payload: any}) {
    try {
        const res : {data : any} = yield call(searchUsers, payload.payload)
        yield put({ type : ActionType.UPDATE_USERS, payload: res.data})
    }
    catch(e) { yield put({ type : ActionType.UPDATE_USERS, payload: [] }) }
}

export function* updateProfileBio (payload: { type: User.BIO_UPDATE_REQUEST, payload : string}) {
    try {
        const newBio = {"userbio" : payload.payload}
        if(currentUser != "")
            yield call( async ()=> { axios.put(`${APIUrl}/auth/bio/${currentUser}`, newBio)}) 
    }
    catch(e) {}
}

const getFriends = async () =>
    axios.get(`${APIUrl}/user/friends/${currentUser}`)


export function* getFriendsSaga (payload: { type: User.GET_FRIENDS, payload : string }) {
    try {
        const res : {data : any} = yield call(getFriends)
        yield put({ type : ActionType.UPDATE_FRIENDS, payload: res.data})
    }
    catch(e) { }
}

const acceptFriend = async (friendId : number) => 
    axios.post(`${APIUrl}/user/friends/${currentUser}&${friendId}`)

export function* acceptFriendSaga (payload: {type: User.ACCEPT_FRIEND, payload : number}) {
    try {
        const res : {data : any} = yield call(acceptFriend, payload.payload)
        yield put({ type : ActionType.UPDATE_USERS, payload: res.data})
    }
    catch(e) { }
}

const sendFriendReq = (friendId : number) => 
    axios.put(`${APIUrl}/user/friends/${currentUser}&${friendId}`)

export function* sendFriendReqSaga (payload: { type: User.ADD_FRIEND, payload : number}) {
    try {
        const res : {data : any} = yield call(sendFriendReq, payload.payload)
        yield put({ type : ActionType.UPDATE_USERS, payload: res.data})
    }
    catch(e) { }
}

const getPending = () => 
    axios.put(`${APIUrl}/user/pending/${currentUser}`)

export function* getPendingSaga (payload: { type: User.GET_PENDING, payload : string}) {
    try {
        const res : {data : any} = yield call(getPending)
        console.log(res.data)
        yield put({ type : ActionType.UPDATE_USERS, payload: res.data})
    }
    catch(e) { }
}

// ## ---------- COLOR THEME ---------- ##
// =======================================

export function* updateColorThemeSaga (payload : {type : any, payload: any}) {
    try {
        if(currentUser != "")
            yield call( async ()=> { axios.post(`${APIUrl}/user/${currentUser}`,payload.payload)}) 
    }
    catch(e) { }
}

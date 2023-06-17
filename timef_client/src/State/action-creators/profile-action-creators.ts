// =========---- ACTION-CREATORS.TS ----=========
// @ Brief : This class is meant to provide importable functions 
//     to other components to interact with the Redux store and 
//     execute API calls via Redux Saga. Related to User Profile
//     data :
// @ Exports 
//     - User Auth : loginUser, logoutUser, regUser

import { LoginParams, RegisterParams, resetPasswordParams } from "../../Types/parameter-types";
import { ColorThemes } from "../action-types/color-actions";
import { Auth, User } from '../action-types/saga-actions'
import store from '../store'

// ## ------------- USER ------------- ##
// ======================================

export const logoutUser = () => {
    store.dispatch({type: Auth.LOGOUT_REQUEST})
}

export const loginUser = (payload: LoginParams) => {
    store.dispatch({type: Auth.LOGIN_REQUEST, payload})
}

export const regUser = (payload: RegisterParams) => {
    store.dispatch({type: Auth.REGISTER_REQUEST, payload})
}

export const resetPassword = (payload : resetPasswordParams) => {
    store.dispatch({type : Auth.RESET_PASSWORD, payload})
}

export const updateUserBio = (payload: string) => {
    store.dispatch({type : User.BIO_UPDATE_REQUEST, payload})
}

export const updateColorTheme = (payload: {"colorTheme" : ColorThemes}) => {
    store.dispatch({type: User.UPDATE_COLOR_TH, payload})
}

export const searchUsers = (payload: string) => {
    store.dispatch({type: User.SEARCH_USERS, payload})
}

export const requestFriend = (payload : number ) => {
    store.dispatch({type: User.ADD_FRIEND, payload})
}

export const addFriend = (payload : string) => {
   store.dispatch({type: User.ACCEPT_FRIEND, payload})
}

export const getFriends = (payload : string) => {
    store.dispatch({type: User.GET_FRIENDS, payload})
}

export const getPending = (payload : string) => {
    store.dispatch({type: User.GET_PENDING, payload})
}
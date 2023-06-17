// =========---- SAGA-ACTIONS.TS ----=========
// @ Brief : This class is meant to provide defined types which 
// are meant to describe and initiate an action in the Saga reducer
//    
// @ Exports 
//     - User    : Login, Logout, and Register requests
//     - Events  : Get Events and Create Events requests
//     - Notes   : Get, Create and Update Notes requests
//     - Folders : Get, Create and Add Notes and Events requests

export enum Auth {
    LOGIN_REQUEST    = "LOGIN_REQUEST",
    LOGOUT_REQUEST   = "LOGOUT_REQUEST",
    REGISTER_REQUEST = "REGISTER_REQUEST",
    RESET_PASSWORD   = "RESET_PASSWORD",
}

export enum User {
    BIO_UPDATE_REQUEST = "UPDATE_BIO",
    UPDATE_COLOR_TH    = "UPDATE_COLOR_THEME_REQUEST",
    ADD_FRIEND    = "SEND_FRIEND_REQUEST",
    ACCEPT_FRIEND = "ACCEPT_FRIEND_REQUEST",
    SEARCH_USERS  = "SEARCH_USERS",
    GET_FRIENDS = "GET_FRIENDS",
    GET_PENDING = "GET_PENDING",
}

export enum Events {
    GETEVENTS_REQUEST   = "GETEVENTS_REQUEST",
    CREATEEVENT_REQUEST = "CREATEEVENT_REQUEST"
}

export enum Notes {
    GETNOTES_REQUEST   = "GETNOTES_REQUEST",
    CREATENOTE_REQUEST = "CREATENOTE_REQUEST",
    UPDATENOTE_REQUEST = "UPDATENOTE_REQUEST"
}

export enum Folders {
    CREATE_FOLDER      = "CREATE_FOLDER",
    GETFOLDERS_REQUEST = "GET_FOLDERS",
    ADDEVENT_REQUEST   = "FOLDER_ADD_EVENT",
    ADDNOTE_REQUEST    = "FOLDER_ADD_NOTE"
}


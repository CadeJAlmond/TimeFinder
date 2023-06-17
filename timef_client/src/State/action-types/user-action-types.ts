// =========---- USER-ACTIONS-TYPES.TS ----=========
// @ Brief : This class is meant to provide defined types which 
// are meant to describe and initiate an action in the Auth reducer
//    
// @ Exports 
//     - User    : Login, Logout, and Register requests
//     - Events  : Update Events
//     - Notes   : Update Notes
//     - Folders : Update Folders, Folder Events and Folder Notes

export enum ActionType {
    UPDATE_USER = "UPDATE_USER",
    LOGIN  = "LOGIN",
    LOGOUT = "LOGOUT",
    
    UPDATE_EVENTS = "UPDATE_EVENTS",
    UPDATE_NOTES  = "UPDATES_NOTES",

    UPDATE_USERS = "UPDATE_USERS",
    UPDATE_FRIENDS = "UPDATE_FRIENDS",
    UPDATE_PENDING = "UPDATE_PENDING_FRIENDS",

    UPDATE_FOLDERS = "UPDATE_FOLDERS",
    UPDATE_FOLDER_EVENTS = "UPDATE_FOLDER_EVENTS",
    UPDATE_FOLDER_NOTES  = "UPDATE_FOLDER_NOTES" 
}
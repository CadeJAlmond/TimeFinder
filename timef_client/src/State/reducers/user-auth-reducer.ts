import { UserProfile, UserEvent, UserNotes } from "../../Types/state-types";
import { ActionType } from "../action-types/user-action-types";
import { Action,
         SagaEventAction,
         SagaFolderAction,
         SagaNoteAction,
         SagaProfileAction } 
         from "../actions/user-actions";

type AuthState = {
    currentUser: UserProfile | null,
    
    notes: UserNotes[],
    folderNotes: {[key: string]: any[]},
    
    events: {},
    folderEvents: {[key: string]: any[]},
    
    folders: string [],
    users: UserProfile[],
    friends: UserProfile[]
}

const initalState : AuthState = { 
    currentUser: null, 

    notes: [],
    folderNotes:  {},
    
    events: {},
    folderEvents: {},
    
    folders: [],
    users: [],
    friends: []
}

type AppAction = Action | SagaProfileAction | SagaEventAction | 
    SagaFolderAction | SagaNoteAction | SagaFolderAction

const formatEvents = (eventList : UserEvent[] | any) => {
    let formatedEventList = <any>{}

    for(let i = 0;  i < eventList.length ; i++) {
        const event = eventList[i]
        let eDate   = event.eventDueDate;
        const dateSpliceIndex = eDate.indexOf('T')
        const dateRange  = eDate.substring(dateSpliceIndex - 10, dateSpliceIndex - 3);
        const prevValues = formatedEventList[dateRange]

        prevValues == undefined ? 
            formatedEventList[dateRange] = [event] :
            formatedEventList[dateRange] = [...prevValues, event]
    }
    return formatedEventList
}

const formatFolders = (folderList : any) => {
    let userFolders = <any>{}
    for(let i = 0; i < folderList.length; i++) {
        const folderName = folderList[i].folderName
        const folder = userFolders[folderName]
        
        if(folder == undefined) {
            userFolders[folderName] = "FOLDER"
        }
    }

    return Object.keys(userFolders)
}

const formatFolderEvents = (folderEvents : any ) => {
    const formatedEvents: any = {};
    for(let i = 0; i < folderEvents.length; i++) {
        const event : any = folderEvents[i]
        const folderName  = event.folderName
        const folder      = formatedEvents[folderName]
        const folderEvent  = formatedEvents[event.eventName]

        if(folder == undefined) 
            formatedEvents[folderName] = [event]
        else 
            formatedEvents[folderName].push(event)    
        
        if(folderEvent == undefined)
            formatedEvents[event.eventName] = [folderName]
        else
            formatedEvents[event.eventName].push(folderName)    
    }
    return formatedEvents
}

const formatFolderNotes = (folderNotes : any ) => {
    const formatedNotes: any = {};
    for(let i = 0; i < folderNotes.length; i++) {
        const note : any = folderNotes[i]
        const folderName  =  note.folderName
        const folder      = formatedNotes[folderName]
        const folderNote  = formatedNotes[note.noteTitle]

        if(folder == undefined) 
            formatedNotes[folderName] = [note]
        else 
            formatedNotes[folderName].push(note)    
        
        if(folderNote == undefined)
            formatedNotes[note.noteTitle] = [folderName]
        else
            formatedNotes[note.noteTitle].push(folderName)    
    }

    return formatedNotes
}

const authReducer = (state = initalState, action : AppAction) => {
    switch(action.type) {
        // --- USER
        case ActionType.UPDATE_USER:
            return {...state, currentUser: action.payload}
        // --- Notes and Events
        case ActionType.UPDATE_NOTES:
            return {...state, notes : action.payload}
        case ActionType.UPDATE_EVENTS:
            return {...state, events : formatEvents(action.payload)}
        // --- FOLDERS
        case ActionType.UPDATE_FOLDER_EVENTS:
            return {...state, folderEvents : formatFolderEvents(action.payload)}    
        case ActionType.UPDATE_FOLDER_NOTES:
            return {...state, folderNotes : formatFolderNotes(action.payload)}    
        case ActionType.UPDATE_FOLDERS:
            return {...state, folders : formatFolders(action.payload)}    
        case ActionType.UPDATE_USERS:
            return {...state, users : action.payload}
        case ActionType.UPDATE_FRIENDS:
            return {...state, friends: action.payload}    
        default: 
            return state;
    }
}

export default authReducer;
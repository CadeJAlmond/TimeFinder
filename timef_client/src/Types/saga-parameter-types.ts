import { LoginParams, RegisterParams, EventInputs, NoteParams, FolderInput } from "./parameter-types";
import { Auth, Notes, Events, Folders } from '../State/action-types/saga-actions';

type SagaLoginParams = 
    { payload: LoginParams, type: Auth.LOGIN_REQUEST } 
    
type SagaRegisterParams = 
    { payload: RegisterParams, type: Auth.REGISTER_REQUEST }

type SagaRetrieveEvents = 
    { payload: string, type: Events.GETEVENTS_REQUEST }

type SagaCreateEvent = 
    { payload: EventInputs, type: Events.CREATEEVENT_REQUEST }

type SagaNotes = 
    { payload: NoteParams, type: Notes.CREATENOTE_REQUEST | Notes.GETNOTES_REQUEST | Notes.UPDATENOTE_REQUEST}
    
// FOLDERS

type SagaGetFolders = 
    { payload : string, type: Folders.GETFOLDERS_REQUEST }    
    
type SagaCreateFolder = 
    {payload : string, type : Folders.CREATE_FOLDER}    

type SagaFolderAdding = 
    {payload: FolderInput, type: Folders.ADDEVENT_REQUEST }    
    
export type {
            SagaLoginParams,
            SagaRegisterParams, 
            SagaRetrieveEvents, 
            SagaCreateEvent, 
            SagaNotes, 
            SagaCreateFolder , 
            SagaGetFolders, 
            SagaFolderAdding 
        }
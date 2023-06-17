import { ActionType } from "../action-types/user-action-types";
import { UserProfile } from "../../Types/state-types";     

interface Updated {
    type: ActionType,
    payload: UserProfile
}

export {SagaProfileAction} from './profile-actions'
export {SagaFolderAction} from './folder-actions'
export {SagaEventAction } from './event-actions' 
export {SagaNoteAction  } from './note-actions'

export type Action = ( Updated ) 
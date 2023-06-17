// =========---- ACTION-CREATORS.TS ----=========
// @ Brief : This class is meant to provide importable functions 
//     to other components to interact with the Redux store and 
//     execute API calls via Redux Saga. Related to User Events :
// @ Exports 
//     - Events : getEvents, createEvent

// Imports
import { EventInputs } from "../../Types/parameter-types";
import { Events } from '../action-types/saga-actions'
import store from '../store'

// ## ------------- EVENTS ------------- ##
// ======================================

export const getEvents = (payload: string) => {
    store.dispatch({type: Events.GETEVENTS_REQUEST, payload})
}

export const createEvent = (payload: EventInputs) => {
    store.dispatch({type: Events.CREATEEVENT_REQUEST, payload})
}
import { Events } from "../action-types/saga-actions";
import { EventInputs } from "../../Types/parameter-types";

interface GetEvents {
    type: Events.GETEVENTS_REQUEST,
    payload: string
}

interface CreateEvent {
    type: Events.CREATEEVENT_REQUEST,
    payload: EventInputs
}

export type SagaEventAction = ( GetEvents | CreateEvent )
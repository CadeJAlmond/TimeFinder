import { combineReducers } from "redux";
import authReducer from "../reducers/user-auth-reducer"
import colorReducer from "./color-reducer";

export const reducers = combineReducers({
    auth: authReducer,
    color: colorReducer
});

export type State = ReturnType<typeof reducers>
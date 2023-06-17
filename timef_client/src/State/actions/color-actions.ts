// =========---- SAGA-ACTIONS.TS ----=========
// @ Brief : This class is meant to provide defined types which 
// are meant to describe and initiate an action in the Auth reducer
//    
// @ Exports 
//     - User    : Login, Logout, and Register requests
//     - Events  : Update Events
//     - Notes   : Update Notes
//     - Folders : Update Folders, Folder Events and Folder Notes

import { ColorActionType, ColorThemes } from "../action-types/color-actions";

type Colors = ColorThemes.COOL_THEME | ColorThemes.WARM_THEME

interface ChangeColorTheme {
    type: ColorActionType.UPDATE_THEME,
    payload: Colors
}

interface DisplayTheme {
    type: ColorActionType.DISPLAY_THEME,
    payload: string
}

export type ColorAction = (
    ChangeColorTheme |
    DisplayTheme
)
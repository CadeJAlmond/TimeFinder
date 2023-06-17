// =========---- COLOR-ACTIONS.TS ----=========
// @ Brief : This class is meant to provide defined types which 
// are meant to describe and initiate an action in the Color reducer
//    
// @ Exports 
//     - ActyionType : Update Themes
//     - ColorThemes : Warm_Theme, Cool_Theme

export enum ColorActionType {
    UPDATE_THEME = "COLOR_THEME",
    DISPLAY_THEME = "DISPLAY_THEME"
}

export enum ColorThemes {
    WARM_THEME ="WARM_1",
    COOL_THEME ="COOL_1"
}
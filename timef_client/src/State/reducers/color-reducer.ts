import { ColorActionType, ColorThemes } from "../action-types/color-actions";
import { ColorAction } from "../actions/color-actions";

type ColorThemeState = { colorTheme : ColorThemes }

const setBodyColor = (color : ColorThemes ) => {
    switch(color) {
        case ColorThemes.COOL_THEME:
            document.body.style.backgroundColor = "#e2e8f0"
            break
        case ColorThemes.WARM_THEME:
            document.body.style.backgroundColor = "#f6f4f5"
            break
    }
    return color
}

const initalState : ColorThemeState = {
    colorTheme: setBodyColor(ColorThemes.WARM_THEME)
} 

const setTheme = (theme : string) => {
    switch(theme) {
        case ColorThemes.WARM_THEME:
            return setBodyColor(ColorThemes.WARM_THEME)
        case ColorThemes.COOL_THEME:
            return setBodyColor(ColorThemes.COOL_THEME)
    }
}

const colorReducer = (state = initalState, action : ColorAction) => {
    switch(action.type) {
        case ColorActionType.UPDATE_THEME:
            setBodyColor(action.payload)
            return {colorTheme : setBodyColor(action.payload)}
        case ColorActionType.DISPLAY_THEME:
            return {colorTheme : setTheme(action.payload)}    
        default: 
            return state
    }
}

export default colorReducer;
import { ColorActionType } from "../action-types/color-actions";
import { ColorThemes } from "../action-types/color-actions";
import store from "../store";

type Color = ColorThemes.COOL_THEME | ColorThemes.WARM_THEME

export const changeColorTheme = (payload : Color) => 
    store.dispatch({type: ColorActionType.UPDATE_THEME, payload})

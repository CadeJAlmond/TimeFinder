import { Auth, User } from "../action-types/saga-actions";
import { LoginParams, resetPasswordParams, RegisterParams } from "../../Types/parameter-types";
     
import { ColorThemes } from "../action-types/color-actions";

interface RegisterUser {
    type: Auth.REGISTER_REQUEST
    payload: RegisterParams
}

interface LoginUser {
    type: Auth.LOGIN_REQUEST,
    payload: LoginParams
}

interface LogoutUser {
    type: Auth.LOGOUT_REQUEST,  
}

interface ResetPassword {
    type: Auth.RESET_PASSWORD,
    payload: resetPasswordParams
}

interface UpdateProfileBio {
    type : User.BIO_UPDATE_REQUEST,
    payload: string
}

interface UpdateColorTheme {
    type: User.UPDATE_COLOR_TH,
    payload: {"colorTheme" : ColorThemes}
}

interface SearchUsers {
    type: User.SEARCH_USERS,
    payload: string
}

interface GetPending {
    type: User.GET_PENDING,
    payload: string
}

interface GetFriends {
    type: User.GET_FRIENDS,
    payload: string
}

interface AddFriend {
    type: User.ADD_FRIEND,
    payload: number
}

interface AcceptFriend {
    type: User.ACCEPT_FRIEND,
    payload: string
}


export type SagaProfileAction = (
    LoginUser     |
    AddFriend     |
    GetFriends    |
    GetPending    | 
    LogoutUser    |
    RegisterUser  |
    AcceptFriend  |
    ResetPassword |
    UpdateProfileBio |
    UpdateColorTheme |
    SearchUsers
)
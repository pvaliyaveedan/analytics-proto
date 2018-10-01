import { Action } from "./LoginActions";

const InitialState = {
    ui: { infoMsg: null, redirectTo: null },
    isAuth: false,
    token: null,
    expiresOn: null,
    firstName: null,
    lastName: null,
    email: null
};

let sessionAuth = sessionStorage.getItem("PRISMToken");
if (sessionAuth) sessionAuth = { ...InitialState, ...JSON.parse(sessionAuth) };

export default (state = sessionAuth || InitialState, action) => {
    let authState,
        payload = action.payload;
    switch (action.type) {
        case Action.LOGIN_SUCCESS:
            authState = {
                ...state,
                ui: {
                    ...state.ui,
                    infoMsg: null,
                    redirectTo: payload.redirectTo || process.env.REACT_APP_DEFAULT_ROUTE
                },
                isAuth: true,
                token: payload.token,
                expiresOn: payload.expires,
                firstName: payload.firstName,
                lastName: payload.lastName,
                email: payload.email
            };
            break;
        case Action.LOGOUT:
            sessionStorage.removeItem("PRISMToken");
            return { ...InitialState, ui: { ...InitialState.ui, infoMsg: payload } };
        case Action.UPDATE_TOKEN:
            return { ...state, token: payload.token, expiresOn: payload.expires };
        default:
            authState = state;
            break;
    }
    let { isAuth, token, expiresOn, firstName, lastName, email } = authState;
    sessionStorage.setItem("PRISMToken", JSON.stringify({ isAuth, token, expiresOn, firstName, lastName, email }));
    return authState;
};

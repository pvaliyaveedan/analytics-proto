import axios from "axios";
import { doProgressStart, doProgressSuccess, doProgressFailed } from "Components/_Progress/ProgressActions";

export const Action = {
    UPDATE_TOKEN: "UPDATE_TOKEN",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGOUT: "LOGOUT"
};

export const doUpdateToken = response => ({ type: Action.UPDATE_TOKEN, payload: response });
export const doLoginSuccess = response => ({ type: Action.LOGIN_SUCCESS, payload: response });
export const doLogout = msg => ({ type: Action.LOGOUT, payload: msg });

export const doLogin = (loginId, password, redirectTo) => {
    const ProgressName = "Login";
    return dispatch => {
        dispatch(doProgressStart(ProgressName));
        axios.post(process.env.REACT_APP_URL_API_AUTH + '/api/auth/GetToken', {
            LoginId: loginId,
            Password: password,
            IsLdap: true
        })
        .then(response => {
            if (response && response.data) {
                response.data.redirectTo = redirectTo;
                dispatch(doLoginSuccess(response.data));
                dispatch(doProgressSuccess(ProgressName));
            }
        })
        .catch(err => {
            let errMsg;
            if (err.response && err.response.status === 401) {
                errMsg = "Invalid Login ID or Password.";
            }
            if (err.message === "Network Error") {
                errMsg = "Unable to connect to server.";
            } else {
                errMsg = "Error while trying to login, please contact support.";
                console.error(err);
            }
            dispatch(doProgressFailed(ProgressName, errMsg));
        });
    };
};

export const doRefreshToken = (oldToken) => {
    return dispatch => {
        axios.post(process.env.REACT_APP_URL_API_AUTH + '/api/auth/RefreshByToken', {
            oldToken: oldToken
        })
        .then(response => {
            console.log("refresh response", response);
            if (response && response.data) {
                dispatch(doUpdateToken(response.data));
            }
        });
    };
};
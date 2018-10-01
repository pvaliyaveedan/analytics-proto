import axios from "axios";
import store from "Store.js";
import { doLogout, doRefreshToken } from "Components/Login/LoginActions.js";
import { isPast, isPastAfterMins } from "Utilities/Date";

const prismConnection = axios.create();

prismConnection.interceptors.request.use(
    req => {
        const loginState = store.getState().Login;
        const expiresOn = loginState.expiresOn;

        if (isPast(expiresOn)) {
            //Token is expired, stop request, store and forward later.
            console.log("token expired! logging out.");
            const msg = "Logged out due to long period of inactivity, please log in again.";
            store.dispatch(doLogout(msg));
            throw new axios.Cancel(msg);
        }

        if (isPastAfterMins(expiresOn, process.env.REACT_APP_TOKEN_REFRESH_WINDOW_MINUTES)) {
            //Token expiring soon, renew.
            console.log("token expiring soon! renew");
            store.dispatch(doRefreshToken(loginState.token));
        }

        req.headers.common["Authorization"] = "Bearer " + loginState.token;
        return req;
    }
);

export default prismConnection;

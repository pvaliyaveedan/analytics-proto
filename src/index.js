import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App/App";
import registerServiceWorker from "./registerServiceWorker";
import store from "./App/Store";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById("root")
);
registerServiceWorker();

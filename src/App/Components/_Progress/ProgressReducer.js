import { Action } from "./ProgressActions";

const InitialState = {
    Login: {
        inProgress: false,
        errMsg: null
    }
};

export default (state = InitialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case Action.PROGRESS_START:
            newState[action.payload.name] = { inProgress: true };
            break;
        case Action.PROGRESS_SUCCESS:
            newState[action.payload.name] = { inProgress: false };
            break;
        case Action.PROGRESS_FAILED:
            newState[action.payload.name] = { inProgress: false, errMsg: action.payload.errMsg };
            break;
        default:
            break;
    }
    return newState;
};

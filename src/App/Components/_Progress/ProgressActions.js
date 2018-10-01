export const Action = {
    PROGRESS_START: "PROGRESS_START",
    PROGRESS_SUCCESS: "PROGRESS_SUCCESS",
    PROGRESS_FAILED: "PROGRESS_FAILED"
};

export const doProgressStart = name => ({ type: Action.PROGRESS_START, payload: { name } });
export const doProgressSuccess = name => ({ type: Action.PROGRESS_SUCCESS, payload: { name } });
export const doProgressFailed = (name, errMsg) => ({ type: Action.PROGRESS_FAILED, payload: { name, errMsg } });

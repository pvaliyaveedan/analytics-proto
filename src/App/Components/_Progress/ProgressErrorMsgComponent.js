import React from "react";
import { connect } from "react-redux";
import { Alert } from "antd";

const ProgressErrorMsgComponent = props => {
    var progress = props[props.name];
    if (progress && progress.errMsg) return <Alert message={progress.errMsg} type="error" />;
    return null;
};

const mapStateToProps = state => state.Progress;
export default connect(mapStateToProps)(ProgressErrorMsgComponent);

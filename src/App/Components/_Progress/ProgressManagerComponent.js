import React, { Component } from "react";
import { connect } from "react-redux";
import ProgressIndicator from "Components/_Progress/ProgressIndicatorComponent";

/*
  Progress Manager is used to dynamically disable elements during long processes.
  Also shows progress indicator for buttons.
*/
class ProgressManagerComponent extends Component {
    DisableElements = { Button: true, Input: true, Select: true }; //Add other elements that you want to disable here.
    ShowIconElements = { Button: true };

    constructor(props) {
        super(props);
        if (!props.name) throw new Error("[name] property is required for [LoadingManager]");
    }

    render() {
        this.inProgress = this.props[this.props.name].inProgress;
        if (this.inProgress) return <React.Fragment>{this.addProgressToChildren(this.props.children)}</React.Fragment>;
        else return <React.Fragment>{this.props.children}</React.Fragment>;
    }

    addProgressToChildren(children) {
        //Recursive function to add progress properties into element managed.
        return React.Children.map(children, child => {
            if (child && typeof child === "object") {
                let newProps = {};
                let type = child.type.name || child.type;
                if (this.ShowIconElements[type]) newProps.children = <ProgressIndicator />;
                else newProps.children = this.addProgressToChildren(child.props.children);

                if (this.DisableElements[type]) newProps.disabled = true;
                return React.cloneElement(child, newProps);
            } else {
                return child;
            }
        });
    }
}

const mapStateToProps = state => state.Progress;

export default connect(mapStateToProps)(ProgressManagerComponent);

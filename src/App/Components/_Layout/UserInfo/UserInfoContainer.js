import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Button } from "antd";

import { doLogout } from "Components/Login/LoginActions";

import "./UserInfo.css";

class UserInfo extends Component {
    render = () => {
        let props = this.props;
        return (
            <div className="user-info">
                <div className="user-icon">
                    {/* {props.firstName && props.lastName ? (
                        <Avatar>{props.firstName.substring(0, 1) + props.lastName.substring(0, 1)}</Avatar>
                    ) : (
                    )} */}
                    <Avatar className="avatar-icon" icon="user" />
                </div>
                <div className="user-name">
                    {props.firstName} {props.lastName}
                </div>
                <div className="user-menu">
                    {/* <div className="user-name">
                        {props.firstName} {props.lastName}
                    </div> */}
                    <div className="user-email">{props.email}</div>
                    <div className="user-btns">
                        <Button onClick={this.clickLogout}>Log out</Button>
                    </div>
                </div>
            </div>
        );
    };
    clickLogout = e => {
        this.props.doLogout();
    };
}

export default connect(
    state => state.Login,
    { doLogout }
)(UserInfo);

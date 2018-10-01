import "./Login.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Alert } from "antd";
import { doLogin } from "./LoginActions";
import { Redirect } from "react-router-dom";
import ProgressManager from "Components/_Progress/ProgressManagerComponent";
import ProgressErrorMessage from "Components/_Progress/ProgressErrorMsgComponent";
import dotLogo from 'Assets/Images/DOT-logo.png';
import prismLogo from 'Assets/Images/prism-logo-v15.png';
import nycStreetsLogo from 'Assets/Images/NYCStreets Logo white.png';



const FormItem = Form.Item;

class LoginComp extends Component {
    render() {
        if (this.props.ui.redirectTo) {
            return <Redirect to={this.props.ui.redirectTo} />;
        }

        const { getFieldDecorator } = this.props.form;
        return (
            <div className="root-container">
                <div>
                    <img className="dot-logo" src={dotLogo} alt="DOT" />
                </div>
                <div className="login-container">
                    <div className="login-title">
                        <div>
                            <img className="nycstreets-logo" src={nycStreetsLogo} alt="NYCStreets" />
                        </div>
                        <div className="prism-logo">Analytics</div>
                    </div>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <ProgressManager name="Login">
                            <FormItem>
                                {getFieldDecorator("loginID", {
                                    rules: [{ required: true, message: "Login ID is required." }]
                                })(<Input prefix={<Icon type="user" />} placeholder="Login ID" autoFocus={true} />)}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator("password", {
                                    rules: [{ required: true, message: "Password is required." }]
                                })(<Input prefix={<Icon type="lock" />} type="password" placeholder="Password" />)}
                            </FormItem>

                            <ProgressErrorMessage name="Login" />
                            {this.props.ui.infoMsg && <Alert message={this.props.ui.infoMsg} type="info" />}

                            <div className="btn-container">
                                <FormItem>
                                    <Button type="primary" htmlType="submit" className="login-form-button" >
                                        SIGN IN
                                    </Button>
                                </FormItem>
                            </div>
                        </ProgressManager>
                    </Form>
                    <div className="version-div">
                        Version 0.1
                    </div>
                </div>
            </div>
        );
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.doLogin(
                    values.loginID,
                    values.password,
                    this.props.location.state && this.props.location.state.from.pathname
                );
            }
        });
    };
}

const mapStateToProps = state => state.Login;
const mapDispatchToProps = { doLogin };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Form.create()(LoginComp));

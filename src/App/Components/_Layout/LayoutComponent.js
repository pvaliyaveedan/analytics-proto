import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { Icon } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import dotLogo from "Assets/Images/DOT-logo.png";
import prismLogo from "Assets/Images/prism-logo-v15.png";
import nycStreetsLogo from "Assets/Images/NYCStreets Logo black.png";
import UserInfo from "./UserInfo/UserInfoContainer";

import "./Layout.css";

class MainLayout extends Component {
    toggleMenu = () => {
        document.getElementsByClassName('root-row')[0].classList.toggle('menu-expanded');
        // document
        //   .getElementsByTagName("nav")[0]
        //   .classList.toggle("expanded-menu-nav");
        // document
        //   .getElementsByTagName("header")[0]
        //   .classList.toggle("expanded-menu-header");
        // document
        //   .getElementsByTagName("main")[0]
        //   .classList.toggle("expanded-menu-main");
        // document
        //   .getElementsByClassName("nysctreets-logo")[0]
        //   .classList.toggle("expanded-nysctreets-logo");
        // document
        //   .getElementsByClassName("prism-logo")[0]
        //   .classList.toggle("expanded-prism-logo");
        // [...document.getElementsByClassName("menu-desc")].forEach(e => {
        //   e.classList.toggle("expanded-menu-desc");
        // });
    };

    render() {
        if (!this.props.isAuth) {
            return (
                <Redirect
                    to={{ pathname: "/Login", state: { from: this.props.location } }}
                />
            );
        }

        return (
            <div className="root-row">
                <nav className="layout-nav">
                    <div className="app-logo">
                        <div>
                            <img className="nysctreets-logo" src={nycStreetsLogo} />{" "}
                        </div>
                        <div>
                        <div className="prism-logo">Analytics</div>
                        </div>
                    </div>
                    <ul>
                        <li className="parent-feature">
                            <Link to="/Home">
                                <div className="parent-icon">
                                <Icon type="home" theme="outlined" />
                                    <div className="menu-desc">Home</div>
                                </div>
                            </Link>
                            <Link to="/Index">
                            <div className="parent-icon">
                            <Icon type="pie-chart" theme="outlined" />
                                <div className="menu-desc">Pedramp</div>
                            </div>
                            </Link>
                        </li>
                    </ul>
                    <img className="dot-logo" src={dotLogo} />
                </nav>
                <header className="header-content">
                    <button className="btn-menu-expand" onClick={this.toggleMenu}>
                        <Icon type="menu-unfold" theme="outlined" />
                    </button>
                    <UserInfo />
                </header>
                <main className="layout-main">{this.props.children}</main>
            </div>
        );
    }
}

const mapStateToProps = state => state.Login;

export default connect(mapStateToProps)(MainLayout);

import React, { Component } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import RouteList from "_RouteList";

import Layout from "Components/_Layout/LayoutComponent";
import LoginComponent from "Components/Login/LoginContainer";

import "Utilities/FontAwesome";

const PrivateRoute = ({ component: Component, ...props }) => (
    <Route
        {...props}
        render={innerProps =>
            props.isAuth ? (
                <Component {...innerProps} />
            ) : (
                <Redirect to={{ pathname: "/Login", state: { from: innerProps.location } }} />
            )
        }
    />
);

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={LoginComponent} />
                    <Route path="/Login" component={LoginComponent} />
                    <Layout>
                        {RouteList.map(page => (
                            <PrivateRoute
                                key={page.id}
                                path={page.path}
                                component={page.component}
                                isAuth={this.props.isAuth}
                            />
                        ))}
                    </Layout>
                </Switch>
            </Router>
        );
    }
}

const mapStateToProps = state => state.Login;

export default connect(mapStateToProps)(App);

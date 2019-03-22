import React, {Component} from 'react';
import {appReduxChange, appReduxTest} from "actions/app";
import {connect} from "react-redux";

import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import PagesHeader from "components/Header/PagesHeader.jsx";
import Footer from "components/Footer/Footer.jsx";

import pagesRoutes from "routes/loginPages.jsx";

import pagesStyle from "assets/jss/material-dashboard-pro-react/layouts/pagesStyle.jsx";

import bgImage from "../assets/img/login.jpg";


class LoginPages extends Component {
    
    componentWillMount(){
        const timer1=window.setTimeout(() => {
            if(document.getElementById("layui-layer2")===null){
      
            }else{
              document.getElementById("layui-layer2").style.display='none'
              window.clearTimeout(timer1);
            }
          },500);
    }
    componentDidMount(){  
        // console.log(this.props.app.username)
    }
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div>
                <PagesHeader {...rest} />
                <div className={classes.wrapper} ref="wrapper">
                    <div className={classes.fullPage}>
                        <Switch>
                            {pagesRoutes.map((prop, key) => {
                                if (prop.collapse) {
                                    return null;
                                }
                                if (prop.redirect) {
                                    return (
                                        <Redirect from={prop.path} to={prop.pathTo} key={key} />
                                    );
                                }
                                return (
                                    <Route
                                        path={prop.path}
                                        component={prop.component}
                                        key={key}
                                    />
                                );
                            })}
                        </Switch>
                        <Footer white />
                        <div
                            className={classes.fullPageBackground}
                            style={{ backgroundImage: "url(" + bgImage + ")" }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        app: state.app
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        appReduxTest: () => {
            dispatch(appReduxTest())
        },
        appReduxChange: () => {
            dispatch(appReduxChange())
        }
    }
}
LoginPages.propTypes = {
    classes: PropTypes.object.isRequired
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(pagesStyle)(LoginPages));

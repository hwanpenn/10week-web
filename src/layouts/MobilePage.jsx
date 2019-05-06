import React, {Component} from 'react';
import {appReduxChange, appReduxTest} from "actions/app";
import {connect} from "react-redux";

import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";

import withStyles from "@material-ui/core/styles/withStyles";

import PagesHeader from "components/Header/PagesHeader.jsx";
import Footer from "components/Footer/Footer.jsx";

import pagesRoutes2 from "routes/mobilePage.jsx";

import officialHomePageStyle from "assets/jss/material-dashboard-pro-react/layouts/officialHomePageStyle.jsx";

// import image from "../assets/img/homepage3.jpg";
import image from "../assets/img/homepage02.jpeg";
// import image from "../assets/img/homepage2.jpg";
import { WingBlank, WhiteSpace } from 'antd-mobile';

// const PlaceHolder = ({ className = '', ...restProps }) => (
//   <div className={`${className} placeholder`} {...restProps}>Block</div>
// );

// const WingBlankExample = () => (
//   <div style={{ padding: '15px 0' }}>
//     <WingBlank><PlaceHolder /></WingBlank>

//     <WhiteSpace size="lg" />
//     <WingBlank size="md"><PlaceHolder /></WingBlank>

//     <WhiteSpace size="lg" />
//     <WingBlank size="sm"><PlaceHolder /></WingBlank>
//   </div>
// );

// ReactDOM.render(<WingBlankExample />, mountNode);

let timer1
class MobilePage extends Component {

    componentWillMount(){
    }
    checkMessage = (message) =>{

    }
    componentDidMount(){

    }
    render() {
        const { classes, ...rest } = this.props;
        return (
            <div style={{  maxWidth: 677,margin:"0 auto"}}>
                {/* <WingBlank size="md"> */}
                <Switch>
                            {pagesRoutes2.map((prop, key) => {
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
                {/* </WingBlank> */}
                        
            </div>
        );
    }
}
// const mapStateToProps = (state) => {
//     return{
//         app: state.app
//     }
// }
// const mapDispatchToProps = (dispatch) => {
//     return{
//         appReduxTest: () => {
//             dispatch(appReduxTest())
//         },
//         appReduxChange: () => {
//             dispatch(appReduxChange())
//         }
//     }
// }
MobilePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(officialHomePageStyle)(MobilePage);

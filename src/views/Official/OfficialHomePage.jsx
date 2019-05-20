import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
// import InputAdornment from "@material-ui/core/InputAdornment";

// import Face from "@material-ui/icons/Face";

// import GridContainer from "components/Grid/GridContainer.jsx";
// import GridItem from "components/Grid/GridItem.jsx";
// import CustomInput from "components/CustomInput/CustomInput.jsx";
import { Button,Breadcrumb } from 'antd';
// import Card from "components/Card/Card.jsx";
// import CardBody from "components/Card/CardBody.jsx";
// import CardHeader from "components/Card/CardHeader.jsx";
// import CardFooter from "components/Card/CardFooter.jsx";

import officialHomePageStyle from "assets/jss/material-dashboard-pro-react/views/officialHomePageStyle.jsx";
// import LockOpen from "@material-ui/icons/LockOpen";
// import axios from 'axios';
// import axios from '../../Utils/axios';
import { message } from 'antd';
// import VCode from '../../variables/VCode'
// import {canvas} from '../../variables/VCode'
import cx from "classnames";
import logo from "assets/img/android.png";
// import shineyueLogo from "assets/img/logoRule.png";
import shineyueLogo from "assets/img/icon01.png";
import logo1 from "assets/img/ios.png";
// import logo1 from "assets/img/icon.png";


// import 'jsencrypt';



let  publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEzFQe2lrG++hcZDkbrZstjnMKjUc8IBk07mRC0fc6DyTlbwwnB9MMkhvkJAUtZo02kARHeH5HWoxPpdWuHmF7lYeEma9m6z4uyFc4e0hVpXI1qdjToylOpPgI66Yge0mcvyd/FyWCFl7LrzrALPQ9qIqvUKmp7CwzISoa6IToSwIDAQAB'

message.config({
    duration: 1,
});

let documentObj =''
class OfficialHomePage extends React.Component {

    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            cardAnimaton: "cardHidden",
            username:'1',
            size: 'large',
        };
    }


    componentWillMount(){
      
    }
    handleEnterKey = (e) => {
        // console.log(e.keyCode)
        if(e.keyCode === 13){
            this.handleClick()
        }
    }
    componentWillUmount(){

    }
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears

    }

    renovate = (vaule) =>{
        this.child = vaule
    }
    handleClick = (event) =>{

    }
    handleChange = name => event => {

    };

    render() {
        const { classes,white,rtlActive } = this.props;
        const size = this.state.size;

        var anchor =
            classes.a +
            cx({
                [" " + classes.whiteColor]: white
            });
        return (
            <div >
                <div className={classes.header}>
                    <img src={shineyueLogo} className={classes.logo}></img>
                    <ul>
                        <li className={classes.navigation}>
                            <a href="https://f8fitness.com.au/product/ten-week-challenge-%E6%BE%B3%E6%B4%B2%E5%81%A5%E8%BA%AB%E8%AF%BE%E7%A8%8B/">线下产品</a>
                        </li>
                        <li className={classes.navigation}>
                            <a href="https://f8fitness.com.au/meal-prep-7-days-%E8%BD%BB%E4%BD%93%E9%A3%9F%E8%B0%B1-%E5%87%8F%E8%82%A5%E9%A3%9F%E8%B0%B1/">健康食谱</a>
                        </li>
                        <li className={classes.navigation}>
                            <a href="https://f8fitness.com.au/">十周详情</a>
                        </li>
                        <li className={classes.navigation}>
                            <a href="https://jetek.com.au/zh/3034-2/">公司简介</a>
                        </li>

                    </ul>
                </div>
                <div className={classes.button}>
                    <h1 className={classes.title}>享受生活，享受健康</h1>
                    <Button style={{marginLeft:50,marginTop:50}} size={size}>
                        <a href="https://play.google.com/store/apps/details?id=com.australiachris.cityplayersandroid">
                            <img style={{marginTop:-8}} src={logo} alt="logo" className={classes.img} />安&nbsp;&nbsp;&nbsp;&nbsp;卓
                        </a>

                    </Button>
                    <Button style={{marginLeft:20}} size={size} >
                    <a href="https://play.google.com/store/apps/details?id=com.australiachris.cityplayersandroid">
                        <img style={{marginTop:-8}} src={logo1} alt="logo" className={classes.img} />苹&nbsp;&nbsp;&nbsp;&nbsp;果
                    </a>
                    </Button>
                </div>
                <div className={classes.content}>
                    <Breadcrumb separator="|" className={classes.content}>
                        <Breadcrumb.Item>
                            {1900 + new Date().getYear()}{" "} &copy;
                            <a href="https://f8fitness.com.au/" className={anchor}>
                                {rtlActive ? "توقيت الإبداعية" : "Fitness"}
                            </a>
                            {/*{rtlActive*/}
                            {/*? ", مصنوعة مع الحب لشبكة الإنترنت أفضل"*/}
                            {/*: ", service content manage system"}*/}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Copyright © 2017-18 Challenger Fitness Club</Breadcrumb.Item>
                        <Breadcrumb.Item>科捷数字传媒</Breadcrumb.Item>
                    </Breadcrumb>
                    <Breadcrumb separator="|" >
                        <Breadcrumb.Item>群体：澳洲华人健身俱乐部</Breadcrumb.Item>
                        <Breadcrumb.Item>电话：+61 430479550</Breadcrumb.Item>
                        <Breadcrumb.Item>传真：+61 430479550</Breadcrumb.Item>

                    </Breadcrumb>
                </div>

            </div>

        );
    }
}

OfficialHomePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(officialHomePageStyle)(OfficialHomePage);

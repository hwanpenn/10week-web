import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

import Face from "@material-ui/icons/Face";

import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import { Button,Breadcrumb } from 'antd';
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import mobilePageStyle from "assets/jss/material-dashboard-pro-react/views/mobilePageStyle.jsx";
import LockOpen from "@material-ui/icons/LockOpen";
// import axios from 'axios';
// import axios from '../../Utils/axios';
import { message } from 'antd';
import VCode from '../../variables/VCode'
import {canvas} from '../../variables/VCode'
import cx from "classnames";
import logo from "assets/img/android.png";
// import shineyueLogo from "assets/img/logoRule.png";
import shineyueLogo from "assets/img/icon03.png";
import logo1 from "assets/img/ios.png";
// import logo1 from "assets/img/icon.png";
import axios from 'axios';


// import 'jsencrypt';


let  publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCEzFQe2lrG++hcZDkbrZstjnMKjUc8IBk07mRC0fc6DyTlbwwnB9MMkhvkJAUtZo02kARHeH5HWoxPpdWuHmF7lYeEma9m6z4uyFc4e0hVpXI1qdjToylOpPgI66Yge0mcvyd/FyWCFl7LrzrALPQ9qIqvUKmp7CwzISoa6IToSwIDAQAB'

message.config({
    duration: 1,
});

let documentObj =''
class RecipePage extends React.Component {

    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            content:'',
            title:'',
            author:'',
            createdAt:''
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
        let thisTemp = this
        // console.log(this.props.location.search.slice(1))
        
        axios.get('/api/recipebyday?day='+this.props.match.params.id
      ).then( (response) => {
          let valueData = {}
          if(response.data.data.rows!==undefined){
            valueData=response.data.data.rows[0]
          }
// console.log("valueData")
// console.log(valueData)
            this.setState({
                            content:valueData.content.replace(/\<img/gi,   '<img style="width: 100%;height: auto;"' ),
                            title:valueData.name,
                            url:valueData.url,
                            day:valueData.day,
                            createdAt:valueData.createdAt,
                            
                        })
            // if(response.code===0){
            //     // document.getElementById("layui-layer2").style.display='block'
            // }else {
            //     message.info(response.data.msg);
            // }
  
          })
          .catch(function (error) {
              console.log(error);
          });
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears

    }

    renovate = (vaule) =>{
        this.child = vaule
    }
    handleClick = (event) =>{

    }
    handleChange = name => event => {

    };
    sendData = (router)=> {
        if (window.originalPostMessage) {
            window.postMessage(router);
        } else {
            throw Error('postMessage接口还未注入');
        }
      }
      goBack = () => {
        this.sendData('Index')
        // this.props.history.push("/mobile/ranklistpage");
    }
    goto = () => {
        const page = this.state.page
        // this.props.history.push("/cms/home/tables/killgroup?page="+page);
        this.props.history.push("/mobile/taskshowpage/"+this.props.match.params.id);
        // this.setState({ visible: true });
    }

    render() {
        const { classes,white,rtlActive } = this.props;
        const size = this.state.size;
        const temp = {}

        var anchor =
            classes.a +
            cx({
                [" " + classes.whiteColor]: white
            });
        return (
<div>
            <div  style={{textAlign:'center'}}>
      <NavBar
                    mode="light"
                    icon={<Icon onClick={this.goBack} type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <a onClick={this.goto}  style={{ marginRight: '6px' }} >今日任务</a>,
                        
                    ]}
                    >今日食谱</NavBar>
                </div>
            <div style={{padding: '20px'}} >
                {/* <div className={classes.header}>
                    <img src={shineyueLogo} className={}></img>
                </div> */}

{/* <img style={{ height: '100px', width:"200px", marginRight: '15px' }} src={this.state.url?this.state.url:"https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png"} alt="" /> */}

                <h2 style={{marginTop:10}}>食谱详情：{this.state.title}</h2>
                
                {"第"+ this.state.day+"天      日期："+this.state.createdAt}

                <div style={{marginTop:20}} dangerouslySetInnerHTML={{
              __html: this.state.content
            }}/>
            </div>
            </div>
        );
    }
}

RecipePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(mobilePageStyle)(RecipePage);

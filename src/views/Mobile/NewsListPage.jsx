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
import { DefaultPlayer as Video } from 'react-html5video';

import InfiniteLoader from 'react-infinite-loader'
import ReactDOM from 'react-dom'
import  { Component } from 'react'
import { NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

message.config({
  duration: 1,
});

let page = 0
class VideoListPage extends Component {
    constructor(props) {
        super(props)
        this.state = { items: [] }
      }

  componentDidMount() {
    page=0
    this.loadItems()
  }

  loadItems() {
    axios.get('/api/news',{params:{
      pageNo: page+1,
      pageSize: 8}}
      ).then( (response) => {
          if(response.data.data.rows.length===0){
              message.info("没有数据了");
          }else{
             let data = response.data.data.rows
             setTimeout( () => {
              let items = this.state.items.slice()
              items = items.concat(data)
              console.log("items")
              console.log(items)
              page++
              this.setState({ items: items })
            }, 1000)
            //  items.push(data)
          }
          })
    .catch(function (error) {
        console.log(error);
    });

    /* just simulating a load of more items from an api here */
    
  }

  handleVisit () {
    this.loadItems()
  }

  handleTouch = (id) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    this.props.history.push("/mobile/newspage/"+id);
  }
  
  getItems() {
    // let items = []
    // let pIndex =0

    // axios.get('/api/news',{params:{
    //   pageNo: pIndex+1,
    //   pageSize: 8}}
    //   ).then( (response) => {
    //       if(response.data.data.rows.length===0){
    //           // alert('没有数据了~',1);
    //           message.info("没有数据了");
    //       }else{
    //          let data = response.data.data.rows
    //          items.push(data)
    //       }
          
      
    //       })
    // .catch(function (error) {
    //     console.log(error);
    // });




    // let items = []
    // for(var i = 0; i < 10; i++) {
    //   items.push({ name: 'An item  '+ (page*10 +i) })
    // }
    // page++
    // // console.log()
    // return items
  }

  renderCards() {
    const { items } = this.state
    const cards = items.map((obj, i) => {
      return (
        <div style={{padding:"0px 0px"}} key={i}>
                <div onClick={()=>this.handleTouch(obj._id)} style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                  <img style={{ height: '64px', marginRight: '15px' }} src={obj.url?obj.url:"https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png"} alt="" />
                  <div style={{ lineHeight: 1 }}>
                    <a  style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.name}</a>
                    <div><span style={{ fontSize: '30px', color: '#FF6E27' }}></span> {"发布日期： "+obj.createdAt}</div>
                  </div>
                </div>

        </div>
      )
    })
    return cards
  }
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
    this.props.history.push("/mobile/videopagelist");
    // this.setState({ visible: true });
}

  render () {
    return (
      <div >
      <div >
      <NavBar
                    mode="light"
                    icon={<Icon onClick={this.goBack} type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <a onClick={this.goto}  style={{ marginRight: '6px' }} >健身视频</a>,
                        
                    ]}
                    >健身新闻</NavBar>
      </div>

<div style={{padding: '20px'}}>
{ this.renderCards() }
        <InfiniteLoader onVisited={ () => this.handleVisit() } />
</div>
       
      </div>
    )
  }
}

// ReactDOM.render(<VideoListPage />, document.getElementById('root'))

VideoListPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(mobilePageStyle)(VideoListPage);

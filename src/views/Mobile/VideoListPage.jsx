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
import 'react-html5video/dist/styles.css';
// import 'reset-css/reset.css'
import styles from './App.css';
import vttEn from './assets/sintel-en.vtt';
import vttEs from './assets/sintel-es.vtt';
import bigBuckBunnyPoster from './assets/poster-big-buck-bunny.png';
import sintelTrailerPoster from './assets/poster-sintel-trailer.png';
import { NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';


import InfiniteLoader from 'react-infinite-loader'
import ReactDOM from 'react-dom'
import  { Component } from 'react'


const sintelTrailer = 'https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4';
const bigBuckBunny = 'http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov';

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
    this.loadItems()
  }

  loadItems() {
    axios.get('/api/video',{params:{
      pageNo: page+1,
      pageSize: 4}}
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
  handlePlay (ii) {
    // console.log(this.refs)
      const { items } = this.state
      const cards = items.map((item, i) => {
        if(i!==ii){
          this.refs['video'+i].videoEl.pause();
        }
      })
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

  // <Video loop 
  // controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
  // poster=""
  // onCanPlayThrough={() => {
  //     // Do stuff
  // }}>
  // {/* <source src={item.url?item.url:"/uploads/5cb49b7542966cf0d7e6738f.mp4"} type="video/webm" /> */}
  // <source src={'http://127.0.0.1:3000/uploads/5cb49b7542966cf0d7e6738f.mp4'} type="video/webm" />
  // <track label="English" kind="subtitles" srcLang="en" src="" default />
  //         </Video>
  // <h3>{item.name}</h3>
  // <h4 style={{textAlign:"right"}}>{"日期： "+item.createdAt}</h4>
 

  renderCards() {
    const { items } = this.state
    const cards = items.map((item, i) => {
      return (
        // <div style={{padding:"0px 15px"}} key={i}>
        //             <li className={styles.videoListItem}>
        //                 <Video
        //                     autoPlay
        //                     ref={"video"+i}
        //                     onPlay={() => this.handlePlay(i)}
        //                     poster={item.img?item.img:"/uploads/5cc80284140502a8435b8d92.png"}
        //                     >
        //                     {/* <source src={item.url?item.url:"/uploads/5cb49b7542966cf0d7e6738f.mp4"} type="video/mp4" /> */}
        //                     <source src={'https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4'} type="video/mp4" />
        //                     {/* <track
        //                         label="English"
        //                         kind="subtitles"
        //                         srcLang="en"
        //                         src={vttEn}
        //                         default />
        //                     <track
        //                         label="Español"
        //                         kind="subtitles"
        //                         srcLang="es"
        //                         src={vttEs} /> */}
        //                 </Video>
        //             </li>
        // </div>
        <div style={{padding:"0px 15px"}} key={i} >
         <Video
            //  autoPlay
             ref={"video"+i}
             onPlay={() => this.handlePlay(i)}
             poster={item.img?item.img:"/uploads/5cc80284140502a8435b8d92.png"}
             >
             <source src={item.url?item.url:"/uploads/5cb49b7542966cf0d7e6738f.mp4"} type="video/mp4" />
         </Video>
           <p>{item.name}</p>
            <p style={{textAlign:"right"}}>{"日期： "+item.createdAt}</p>
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
    this.props.history.push("/mobile/newspagelist");
    // this.setState({ visible: true });
}

  render () {
    return (
      <div>
<div  style={{textAlign:'center'}}>
      <NavBar
                    mode="light"
                    icon={<Icon onClick={this.goBack} type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <a onClick={this.goto}  style={{ marginRight: '6px' }} >健身新闻</a>,
                        
                    ]}
                    >健身视频</NavBar>
                </div>
                <div  style={{padding: '20px'}}></div>

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

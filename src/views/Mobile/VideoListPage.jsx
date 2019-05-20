import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import mobilePageStyle from "assets/jss/material-dashboard-pro-react/views/mobilePageStyle.jsx";
import { message } from 'antd';
import axios from 'axios';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import { NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import InfiniteLoader from 'react-infinite-loader'
import  { Component } from 'react'
import { Pagination,PullToRefresh } from 'antd-mobile';


const sintelTrailer = 'https://download.blender.org/durian/trailer/sintel_trailer-720p.mp4';
const bigBuckBunny = 'http://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_480p_h264.mov';

const locale = {
  prevText: '上一页',
  nextText: '下一页',
};

message.config({
  duration: 1,
  top:100
});

let page = 0
class VideoListPage extends Component {
    constructor(props) {
        super(props)
        this.state = { 
          items: [] ,
          totalPage:1,
          pageNo:1,
          refreshing: false,
          down: true,
          // height: 812,
          height: document.documentElement.clientHeight,
          data: [],
        }
      }

  componentDidMount() {
    if(this.state.height===0){
      window.location.reload()
    }
    this.loadItems()
  }

  loadItems(pageNo) {
    axios.get('/api/video',{params:{
      pageNo: pageNo,
      pageSize: 3}}
      ).then( (response) => {
          if(response.data.data.rows.length===0){
              message.info("没有数据了");
          }else{
            let data = response.data.data.rows
            this.setState({ 
             items: data ,
             pageNo: pageNo ,
             totalPage:parseInt(response.data.data.total/3)+1,
           })
          }
          })
    .catch(function (error) {
        console.log(error);
    });
  }

  refreshing() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
    // console.log(page)
    axios.get('/api/video',{params:{
      pageNo: this.state.pageNo,
      pageSize: 3}}
      ).then( (response) => {
          if(response.data.data.rows.length===0){
              message.info("没有数据了");
          }else{
            let data = response.data.data.rows
            this.setState({ 
             items: data ,
             totalPage:parseInt(response.data.data.total/3)+1,
           })
          }
          })
    .catch(function (error) {
        console.log(error);
    });
    /* just simulating a load of more items from an api here */
  }

  loadprev (pageNo) {
    this.loadItems(pageNo)
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
  }
 

  renderCards() {
    const { items } = this.state
    const cards = items.map((item, i) => {
        return (
          <div style={{padding:"0px 15px"}} key={i} >
           <Video
              //  autoPlay
               ref={"video"+i}
               onPlay={() => this.handlePlay(i)}
               poster={item.img?item.img:"/uploads/5cc80284140502a8435b8d92.png"}
               >
               <source src={item.url?item.url:"/uploads/5cb49b7542966cf0d7e6738f.mp4"} type="video/mp4" />
           </Video>
             <p style={{marginTop:4}}>{item.name}</p>
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
    // const page = this.state.page
    // this.props.history.push("/cms/home/tables/killgroup?page="+page);
    this.props.history.push("/mobile/newspagelist");
    // this.setState({ visible: true });
}

  render () {
    return (
      <div>

              <NavBar style={{zIndex:9999,position: "fixed",left: 0,top: 0,width: "100%"}}
                    mode="light"
                    leftContent={[
                      <a onClick={this.goBack}  style={{ marginRight: '6px' }} >返回首页</a>,
                    ]}
                    rightContent={[
                        <a onClick={this.goto}  style={{ marginRight: '6px' }} >健身新闻</a>,
                        
                    ]}
                    >健身视频</NavBar>
                <PullToRefresh
                  damping={60}
                  ref={el => this.ptr = el}
                  style={{
                    height: this.state.height,
                    overflow: 'auto',
                    padding: '20px',marginTop:40
                  }}
                  indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
                  direction={this.state.down ? 'down' : 'up'}
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.refreshing()}
                >
                  { this.renderCards() }
                  <Pagination style={{paddingTop: 20,paddingBottom: 40}} onChange={(pageNo)=>this.loadprev(pageNo)} total={this.state.totalPage} current={this.state.pageNo} locale={locale} />
                </PullToRefresh>
      </div>
      
     
    )
  }
}

// ReactDOM.render(<VideoListPage />, document.getElementById('root'))

VideoListPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(mobilePageStyle)(VideoListPage);

import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import mobilePageStyle from "assets/jss/material-dashboard-pro-react/views/mobilePageStyle.jsx";
import { message } from 'antd';
import axios from 'axios';
import InfiniteLoader from 'react-infinite-loader'
import  { Component } from 'react'
import { NavBar, Icon,PullToRefresh } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import { Pagination } from 'antd-mobile';

const locale = {
  prevText: '上一页',
  nextText: '下一页',
};

message.config({
  duration: 1,
  top:100
});

let page = 0
let timer
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
          // height: window.screen.height,
          data: [],
        }
      }

  componentDidMount() {
    timer = window.setInterval(this.setHeight, 200);
    this.loadItems(1)
  }
  setHeight = () =>{
    if(document.documentElement.clientHeight!==0){
      this.setState({
        height:document.documentElement.clientHeight
      })
      window.clearTimeout(timer);   
    }
  }
  componentWillMount() {
    document.addEventListener('message', function (e) {
    });
  }

  loadItems(pageNo) {
    axios.get('/api/news',{params:{
      pageNo: pageNo,
      pageSize: 10}}
      ).then( (response) => {
          if(response.data.data.rows.length===0){
              message.info("没有数据了");
          }else{
             let data = response.data.data.rows
             console.log("data-----",data)
             this.setState({ 
              items: data ,
              pageNo: pageNo ,
              totalPage:parseInt(response.data.data.total/10)+1,
            })
          }
          })
    .catch(function (error) {
        console.log(error);
    });
    /* just simulating a load of more items from an api here */
  }

  refreshing() {
    this.setState({ refreshing: true });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 1000);
    // console.log(page)
    axios.get('/api/news',{params:{
      pageNo: this.state.pageNo,
      pageSize: 10}}
      ).then( (response) => {
          if(response.data.data.rows.length===0){
              message.info("没有数据了");
          }else{
             let data = response.data.data.rows
             this.setState({ 
              items: data ,
              totalPage:parseInt(response.data.data.total/10)+1,
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
  loadnext () {
    if(this.state.pageNo<this.state.totalPage){
      this.loadItems(this.state.pageNo+1)
    }
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
  }

  renderCards() {
    const { items } = this.state
    const cards = items.map((obj, i) => {
      return (
        <div style={{padding:"0px 0px"}} key={i}>
                <div onClick={()=>this.handleTouch(obj._id)} style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                  <img style={{ height: '64px', marginRight: '15px' }} src={obj.url?obj.url:"https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png"} alt="" />
                  <div style={{ lineHeight: 1 }}>
                    <a  style={{ marginBottom: '8px', fontWeight: 'bold' ,color:'black'}}>{obj.name}</a>
                    <div><span style={{ fontSize: '30px', color: '#FF6E27' }}></span> {"发布日期： "+obj.createdAt}</div>
                    {/* <div><span style={{ fontSize: '30px', color: '#FF6E27' }}></span> {"发布日期： "+obj.createdAt}</div> */}
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
  this.sendData('/mobile/videopagelist')
  // // window.location.reload()
    // const page = this.state.page
    // this.props.history.push("/cms/home/tables/killgroup?page="+page);
    // this.props.history.push("/mobile/videopagelist");
    // this.setState({ visible: true });
}

  render () {
    return (
      <div >
      <NavBar style={{zIndex:9999,position: "fixed",left: 0,top: 0,width: "100%"}}
                    mode="light"
                    leftContent={[
                      <a onClick={this.goBack}  style={{ marginRight: '6px' }} >返回首页</a>,
                    ]}
                    rightContent={[
                        <a onClick={this.goto}  style={{ marginRight: '6px' }} >健身视频</a>, 
                    ]}
                    >健身新闻</NavBar>
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

import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import mobilePageStyle from "assets/jss/material-dashboard-pro-react/views/mobilePageStyle.jsx";
import {
  List, message, Avatar, Spin,Tag
} from 'antd';
import reqwest from 'reqwest';
import './style.css'
import { NavBar, Icon,PullToRefresh } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';
message.config({
  top: 100
});
class RankListPage extends React.Component {
  state = {
    data: [{
      "access": "user",
      "createdAt": "2019-04-16 01:55:44",
      "author": "用户70",
      "vipDay": 0,
      "url": "/uploads/5cb4c59b4df67af77024d9e2.png",
      "content": "",
      "__v": 0,
      "name": "马铃薯放冰箱容易发芽？只是因为放错了位置",
      "_id": "5cb4c5a04df67af77024d9e3",
      "key": 0
    }],
    loading: false,
    hasMore: true,
    refreshing: false,
    down: true,
    height: document.documentElement.clientHeight,
    data: [],
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    reqwest({
      url: "/api/sortbyweight?pageNo=1&pageSize=20",
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        this.setState({
          data: res.data.rows,
        });
      },
    });
  }

  handleInfiniteOnLoad = () => {
    let data = this.state.data;
    this.setState({
      loading: true,
    });
    if (data.length > 14) {
      message.warning('Infinite List loaded all');
      this.setState({
        hasMore: false,
        loading: false,
      });
      return;
    }
    this.fetchData((res) => {
      data = data.concat(res.results);
      this.setState({
        data,
        loading: false,
      });
    });
  }

  handlechart = (id) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    this.props.history.push("/mobile/chartpage/"+id);
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

  render() {
    return (
      <div  className="demo-infinite-container">
      <div  style={{textAlign:'center'}}>
      <NavBar style={{zIndex: 9999, position: "fixed",left: 0,top: 0,width: "100%"}}
                    mode="light"
                    leftContent={[
                      <a onClick={this.goBack}  style={{ marginRight: '6px' }} >返回首页</a>,
                    ]}
                    rightContent={[
                        <a onClick={this.goto}  style={{ marginRight: '6px' }} >健身新闻</a>,
                        
                    ]}
                    >十周挑战排行榜</NavBar>
                </div>
                <div style={{zIndex:9999,padding: '20px',marginTop:40}}>
                
         


          <PullToRefresh
        damping={60}
        ref={el => this.ptr = el}
        style={{
          height: this.state.height,
          overflow: 'auto',
        }}
        indicator={this.state.down ? {} : { deactivate: '上拉可以刷新' }}
        direction={this.state.down ? 'down' : 'up'}
        refreshing={this.state.refreshing}
        onRefresh={() => this.fetchData()}
      >
          <List
            dataSource={this.state.data}
            renderItem={(item={
              "access": "user",
              "createdAt": "2019-04-16 01:55:44",
              "author": "用户70",
              "vipDay": 0,
              "url": "/uploads/5cb4c59b4df67af77024d9e2.png",
              "content": "",
              "__v": 0,
              "name": "马铃薯放冰箱容易发芽？只是因为放错了位置",
              "_id": "5cb4c5a04df67af77024d9e3",
              "key": 0
            }) => (
              <List.Item key={item===undefined?'':item._id} >
                <List.Item.Meta
                  avatar={<Avatar  >{item===undefined?'':item.realName}</Avatar>}
                  title={<a href="">{item===undefined?'':item.realName}</a>}
                  description={"参加十周挑战"+item===undefined?'':item.vipDay+"天"}
                />
                <div style={{marginRight:20}}>{"减脂"+item===undefined?'':item.lose+"千克"}</div>
                <div><Tag onClick={()=>this.handlechart(item===undefined?'':item._id)} color="magenta">详细数据</Tag></div>
              </List.Item>
            )}
          >
          </List>
      </PullToRefresh>

                </div>
       
      </div>
    );
  }
}


RankListPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(mobilePageStyle)(RankListPage);

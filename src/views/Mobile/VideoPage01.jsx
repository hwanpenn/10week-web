import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import mobilePageStyle from "assets/jss/material-dashboard-pro-react/views/mobilePageStyle.jsx";
import cx from "classnames";
import axios from 'axios';
import { ListView ,PullToRefresh,Toast} from 'antd-mobile';
import ReactDOM from 'react-dom';
import {
  List, message, Avatar, Spin,
} from 'antd';
import reqwest from 'reqwest';
import './style.css'
import { DefaultPlayer as Video } from 'react-html5video';

import InfiniteScroll from 'react-infinite-scroller';

const fakeDataUrl = 'https://randomuser.me/api/?results=5&inc=name,gender,email,nat&noinfo';

class RankListPage extends React.Component {
  state = {
    data: [],
    loading: false,
    hasMore: true,
  }

  componentDidMount() {
    this.fetchData((res) => {
      this.setState({
        data: res.data.rows,
      });
    });
  }

  fetchData = (callback) => {
    reqwest({
      url: "/api/news?pageNo=1&pageSize=4",
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: (res) => {
        console.log(res)
        callback(res);
      },
    });
  }

  handleInfiniteOnLoad = () => {
    alert("123")
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

  render() {
    return (
      <div className="demo-infinite-container">
      <div  style={{textAlign:'center'}}>
                 <h3>十周排行版</h3>
                </div>
        <InfiniteScroll
          initialLoad={false}
          pageStart={0}
          loadMore={this.handleInfiniteOnLoad}
          hasMore={!this.state.loading && this.state.hasMore}
          useWindow={false}
        >
          <List
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item key={item._id}>
                {/* <List.Item.Meta
                  // avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.author}</a>}
                  description={"参加十周挑战47天"}
                /> */}
                <div style={{height:200,background:"#ffffff"}}>{"减脂25斤，增高50厘米，女朋友也找到了"}</div>
                {/* <Video loop 
                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                    poster=""
                    onCanPlayThrough={() => {
                        // Do stuff
                    }}>
                    <source src={"/uploads/5cb49b7542966cf0d7e6738f.mp4"} type="video/webm" />
                    <track label="English" kind="subtitles" srcLang="en" src="" default />
                </Video> */}
              </List.Item>
            )}
          >
            {this.state.loading && this.state.hasMore && (
              <div className="demo-loading-container">
                <Spin />
              </div>
            )}
          </List>
        </InfiniteScroll>
      </div>
    );
  }
}


RankListPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(mobilePageStyle)(RankListPage);

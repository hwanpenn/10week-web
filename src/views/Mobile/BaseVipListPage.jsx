import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import mobilePageStyle from "assets/jss/material-dashboard-pro-react/views/mobilePageStyle.jsx";
import './style.css'
import axios from 'axios';
import { NavBar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

import {
    Form, Select,
     Icon,
    Table
  } from 'antd';
  
  const { Option } = Select;

// import 'jsencrypt';
class BaseVipListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        rows:[]
    };
}

    componentDidMount() {
      // let thisTemp = this
      // console.log("12312312")
      
      axios.get('/api/vipData?user='+this.props.match.params.id,
        ).then( (response) => {
        console.log(response.data.data)
          this.setState({
            rows:response.data.data.rows
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
  goto = () => {
    const page = this.state.page
    // this.props.history.push("/cms/home/tables/killgroup?page="+page);
    this.props.history.push("/mobile/ranklistpage");
    // this.setState({ visible: true });
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
  // const page = this.state.page
  // this.props.history.push("/cms/home/tables/killgroup?page="+page);
  // this.props.history.push("/mobile/chartpage/"+this.props.match.params.id);
  // this.setState({ visible: true });
}
  
    render() {
      const dataSource = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
      }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
      }];
      
      const columns = [{
        title: '标题',
        dataIndex: 'name',
        key: 'name',
      }, {
        title: '打卡时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
      }, {
        title: '胸围',
        dataIndex: 'bust',
        key: 'bust',
      }, {
        title: '腰围',
        dataIndex: 'waist',
        key: 'waist',
      }, {
        title: '臀围',
        dataIndex: 'hip',
        key: 'hip',
      }, {
        title: '大腿围',
        dataIndex: 'thigh',
        key: 'thigh',
      }, {
        title: '上臀围',
        dataIndex: 'upperHip',
        key: 'upperHip',
      }, {
        title: '力量测试',
        dataIndex: 'strength',
        key: 'strength',
      }, {
        title: '平板支撑',
        dataIndex: 'flatSupport',
        key: 'flatSupport',
      }, {
        title: '仰卧起坐',
        dataIndex: 'sitUp',
        key: 'sitUp',
      }, {
        title: '俯卧撑',
        dataIndex: 'pushUp',
        key: 'pushUp',
      }, {
        title: '波比跳',
        dataIndex: 'bobbyJump',
        key: 'bobbyJump',
      }, {
        title: '体重',
        dataIndex: 'weight',
        key: 'weight',
      }, {
        title: '身体水分率',
        dataIndex: 'bodyMoistureRate',
        key: 'bodyMoistureRate',
      }, {
        title: '肌肉量',
        dataIndex: 'muscleMass',
        key: 'muscleMass',
      }, {
        title: '基础代谢率',
        dataIndex: 'basalMetabolicRate',
        key: 'basalMetabolicRate',
      }, {
        title: '骨重量',
        dataIndex: 'boneWeight',
        key: 'boneWeight',
      }, {
        title: '内脏脂肪等级',
        dataIndex: 'visceralFatGrade',
        key: 'visceralFatGrade',
      }, {
        title: '体脂率',
        dataIndex: 'bodyFatRate',
        key: 'bodyFatRate',
      }];
      return (
        <div style={{margin:'0 auto', maxWidth: 677}}>
        <NavBar style={{zIndex: 9999, position: "fixed",left: 0,top: 0,width: "100%"}} 
                    mode="light"
                    leftContent={[
                      <a onClick={this.goBack}  style={{ marginRight: '6px' }} >返回首页</a>,
                    ]}
                    rightContent={[
                        <a onClick={this.goto}  style={{ marginRight: '6px' }} >排行榜</a>,
                        
                    ]}
                    >打卡数据记录</NavBar>
                <div style={{padding: '5px',marginTop:40,textAlign:'center'}}>
                <Table dataSource={this.state.rows} columns={columns} scroll={{ x: 1600 }}/>
                </div>
                
      </div>
       );
    }
  }
  
  const WrappedBaseVipListPage = Form.create({ name: 'validate_other' })(BaseVipListPage);
  

// BaseVipListPage.propTypes = {
//     classes: PropTypes.object.isRequired
// };

export default withStyles(mobilePageStyle)(WrappedBaseVipListPage);

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
import './style.css'
import {canvas} from '../../variables/VCode'
import cx from "classnames";
import logo from "assets/img/android.png";
// import shineyueLogo from "assets/img/logoRule.png";
import shineyueLogo from "assets/img/icon03.png";
import logo1 from "assets/img/ios.png";
// import logo1 from "assets/img/icon.png";
import axios from 'axios';
import { NavBar, IconM } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Upload, Icon, Rate, Checkbox,Input,DatePicker,
    Row, Col,Table
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
goBack = () => {
  const page = this.state.page
  // this.props.history.push("/cms/home/tables/killgroup?page="+page);
  this.props.history.push("/mobile/chartpage/"+this.props.match.params.id);
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
        title: '胸围',
        dataIndex: 'bust',
        key: 'bust',
      }, {
        title: '仰卧起坐',
        dataIndex: 'sitUp',
        key: 'sitUp',
      }, {
        title: '体脂率',
        dataIndex: 'bodyFatRate',
        key: 'bodyFatRate',
      }];
      return (
        <div style={{margin:'0 auto', maxWidth: 677}}>
        <NavBar
                    mode="light"
                    icon={<Icon onClick={this.goBack} type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <a onClick={this.goto}  style={{ marginRight: '6px' }} >排行榜</a>,
                        
                    ]}
                    >历史数据列表</NavBar>
                <div  style={{padding: '20px',textAlign:'center'}}>
                <Table dataSource={this.state.rows} columns={columns} />
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

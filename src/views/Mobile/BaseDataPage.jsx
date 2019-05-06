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
import { NavBar, Icon as IconM } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
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

import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Upload, Icon, Rate, Checkbox,Input,DatePicker,
    Row, Col,
  } from 'antd';
  
  const { Option } = Select;


// import 'jsencrypt';
class BaseDataPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data:{}
    };
}
    handleSubmit = (e) => {
      const thisTemp = this
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          values.picture=this.urlimg
          axios.put('/api/user/'+this.props.match.params.id,values
          ).then( (response) => {
                console.log(response.data.data)
                
                if(response.data.code===0){
                  message.info(response.data.msg);
                  thisTemp.props.history.push("/mobile/ranklistpage");
              }else {
                  message.info(response.data.msg);
              }
      
              })
              .catch(function (error) {
                  console.log(error);
              });

        }
      });
    }

    componentDidMount() {
      // let thisTemp = this
      
      axios.get('/api/user/'+this.props.match.params.id
        ).then( (response) => {
        console.log(response.data.data)
          this.setState({
            data:response.data.data
                          
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
  
    normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
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
      let thisTemp = this
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      const propsimg = {
        name: 'file',
        action: '/api/upload',
        headers: {
        //   authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            console.log(info.file.response)
            thisTemp.urlimg=info.file.response.data.url
            message.success(`${info.file.name} 上传成功`);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败.`);
          }
        },
      };
      return (
        <div>
        <div  style={{textAlign:'center'}}>
        <NavBar
                      mode="light"
                      icon={<IconM onClick={this.goBack} type="left" />}
                      onLeftClick={() => console.log('onLeftClick')}
                      rightContent={[
                          <a onClick={this.goto}  style={{ marginRight: '6px' }} >健身新闻</a>,
                          
                      ]}
                      >基础数据</NavBar>
                  </div>
        <div style={{padding: '20px',margin:'0 auto', maxWidth: 677}}>
                

                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label="用户名"
          >
            {getFieldDecorator('realName', {
              initialValue:  this.state.data.realName ,
          rules: [{ required: true, message: '请输入用户名!' }],
        })(<Input />)}
          </Form.Item>

          <Form.Item
            label="地址"
          >
             {getFieldDecorator('city', {
               initialValue:  this.state.data.city ,
          rules: [{ required: false, message: '请输入地址!' }],
        })(<Input />)}
          </Form.Item>
          <Form.Item
            label="邮件"
          >
            {getFieldDecorator('email', {
              initialValue:  this.state.data.email ,
            rules: [{
              type: 'email', message: '输入的不是邮件!',
            }, {
              required: false, message: '请输入邮件!',
            }],
          })(
            <Input />
          )}
          </Form.Item>

          <Form.Item
            label="年龄"
          >
             {getFieldDecorator('age', { initialValue:  this.state.data.age , })(
            <InputNumber min={1} max={120} />
          )}
          <span className="ant-form-text"> 岁</span>
          </Form.Item>
          <Form.Item
            label="身高"
          >
             {getFieldDecorator('height', { initialValue:  this.state.data.height })(
            <InputNumber min={1} max={250} />
          )}
          <span className="ant-form-text"> 厘米</span>
          </Form.Item>
          <Form.Item
            label="体重"
          >
            {getFieldDecorator('weight', { initialValue:  this.state.data.weight , })(
            <InputNumber min={1} max={150} />
          )}
          <span className="ant-form-text"> 千克</span>
          </Form.Item>
          <Form.Item
            label="性别"
          >
             {getFieldDecorator('sex',{initialValue:  this.state.data.sex ,})(
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>
          )}
          </Form.Item>
          <Form.Item
            label="出生日期"
          >
            {getFieldDecorator('birth', {
              // initialValue:  this.state.data.birth ,
              rules:[{ type: 'object', required: false, message: 'Please select time!' }]})(
            <DatePicker />
          )}
          </Form.Item>
          
          <Form.Item
            label="运动强度"
          >
             {getFieldDecorator('exerciseVolume',{
               initialValue:  this.state.data.exerciseVolume ,
             })(
            <Slider marks={{
              0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F',
            }}
            />
          )}
          </Form.Item>
          <Form.Item
            label="收入"
          >
            {getFieldDecorator('income', { initialValue:  this.state.data.income , })(
            <InputNumber min={1} max={10000000} />
          )}
          <span className="ant-form-text"> 澳元</span>
          </Form.Item>
          {/* <Form.Item
            label="头像"
          >
            {getFieldDecorator('upload', {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile,
          })(
            <Upload name="logo" action="/upload.do" listType="picture">
              <Button>
                <Icon type="upload" /> Click to upload
              </Button>
            </Upload>
          )}
          </Form.Item> */}
          <Form.Item label="上传照片">
          {getFieldDecorator('picture', {
              rules: [{ required: false, message: '请上传图片!' }],
          })(
              <Upload {...propsimg}>
                  <Button>
                  <Icon type="upload" /> 上传图片
                  </Button>
              </Upload>
          )}
      </Form.Item>
  
         
  
         
  
          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
          >
            <Button type="primary" htmlType="submit">Submit</Button>
          </Form.Item>
        </Form>
        </div>
      </div>
       );
    }
  }
  
  const WrappedBaseDataPage = Form.create({ name: 'validate_other' })(BaseDataPage);
  

// BaseDataPage.propTypes = {
//     classes: PropTypes.object.isRequired
// };

export default withStyles(mobilePageStyle)(WrappedBaseDataPage);

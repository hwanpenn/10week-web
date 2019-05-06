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
import { NavBar, Icon as IconM } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

import {
    Form, Select, InputNumber, Switch, Radio,
    Slider, Upload, Icon, Rate, Checkbox,Input,DatePicker,
    Row, Col,
  } from 'antd';
  
  const { Option } = Select;


// import 'jsencrypt';
class BaseVipPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data:{}
    };
}

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          values.user=this.props.match.params.id
          values.picture=this.urlimg
          values.vipDay=this.state.data.vipDay+1
          values.name="第"+(this.state.data.vipDay+1)+"天打卡数据"
          console.log("values")
          console.log(values)
          if(values.vipDay===61){
            message.info("会员结束");
            let params = {}
            params.vip = "false"
            params.vipDay = '0'
            this.endVip(params)
          }
          // alert(parseInt(3/7))
          if(parseInt(values.vipDay%7)===0){
            if(values.picture===undefined){
              message.info("每周必须上传一张照片");
            }else{
              this.update(values)
              }
          }else{
            this.update(values)
            }
        }
      });
    }

    endVip = (params) => {
      axios.put('/api/user/'+this.props.match.params.id,params
              ).then( (response) => {
                    console.log('/api/user/')
                    console.log(response.data.data)
                    if(response.data.code===0){
                      message.info(response.data.msg);
                  }else {
                      message.info(response.data.msg);
                  }
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
    }

    update = (values) => {
      const thisTemp = this
      axios.post('/api/vipData',values
      ).then( (response) => {
            console.log('/api/vipData')
            console.log(response.data.data)
            if(response.data.code===0){
              // message.info(response.data.msg);
              let params = {}
              params.vipDay = values.vipDay
              params.lose = this.state.data.lose-values.weight
              axios.put('/api/user/'+this.props.match.params.id,params
              ).then( (response) => {
                    console.log('/api/user/')
                    console.log(response.data.data)
                    if(response.data.code===0){
                      message.info(response.data.msg);
                      thisTemp.props.history.push("/mobile/taskpage/"+this.props.match.params.id);
                  }else {
                      message.info(response.data.msg);
                  }
                  })
                  .catch(function (error) {
                      console.log(error);
                  });
          }else {
              message.info(response.data.msg);
          }
  
          })
          .catch(function (error) {
              console.log(error);
          });
    }
  
    normFile = (e) => {
      console.log('Upload event:', e);
      if (Array.isArray(e)) {
        return e;
      }
      return e && e.fileList;
    }

    componentDidMount() {
      // let thisTemp = this
      console.log("12312312")
      
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
    this.props.history.push("/mobile/vipdatalistpage/"+this.props.match.params.id);
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
                          <a onClick={this.goto}  style={{ marginRight: '6px' }} >历史数据</a>,
                          
                      ]}
                      >每日打卡记录</NavBar>
                  </div>
        <div style={{padding: '20px',margin:'0 auto', maxWidth: 677}}>
                <div  style={{textAlign:'center'}}>
                 <h3>第{this.state.data.vipDay+1}天打卡</h3>
                </div>

                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          {/* <Form.Item
            label="用户名"
          >
            {getFieldDecorator('realName', {
          rules: [{ required: true, message: '请输入用户名!' }],
        })(<Input />)}
          </Form.Item> */}

          <Form.Item
            label="胸围"
          >
             {getFieldDecorator('bust', {
          rules: [{ required: false, message: '请输入胸围!' }],
        })(<Input />)}
          </Form.Item>
          <Form.Item
            label="腰围"
          >
             {getFieldDecorator('waist', {
          rules: [{ required: false, message: '请输入腰围!' }],
        })(<Input />)}
          </Form.Item>
          <Form.Item
            label="臀围"
          >
             {getFieldDecorator('hip', {
          rules: [{ required: false, message: '请输入臀围!' }],
        })(<Input />)}
          </Form.Item>
          <Form.Item
            label="大腿围"
          >
             {getFieldDecorator('thigh', {
          rules: [{ required: false, message: '请输入上大腿围!' }],
        })(<Input />)}
          </Form.Item>
          <Form.Item
            label="上臀围"
          >
             {getFieldDecorator('upperHip', {
          rules: [{ required: false, message: '请输入上围臀!' }],
        })(<Input />)}
          </Form.Item>

          <Form.Item
            label="力量测试"
          >
             {getFieldDecorator('strength')(
            <Slider marks={{
              0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F',
            }}
            />
          )}
          </Form.Item>
          <Form.Item
            label="仰卧起坐"
          >
             {getFieldDecorator('sitUp', { initialValue: 1 })(
            <InputNumber min={1} max={10000} />
          )}
          <span className="ant-form-text"> 个</span>
          </Form.Item>
          <Form.Item
            label="平板支撑"
          >
             {getFieldDecorator('flatSupport', { initialValue: 1 })(
            <InputNumber min={1} max={10000} />
          )}
          <span className="ant-form-text"> 个</span>
          </Form.Item>
          <Form.Item
            label="俯卧撑"
          >
             {getFieldDecorator('pushUp', { initialValue: 1 })(
            <InputNumber min={1} max={10000} />
          )}
          <span className="ant-form-text"> 个</span>
          </Form.Item>
          <Form.Item
            label="波比跳"
          >
             {getFieldDecorator('bobbyJump', { initialValue: 1 })(
            <InputNumber min={1} max={10000} />
          )}
          <span className="ant-form-text"> 个</span>
          </Form.Item>
          <Form.Item
            label="体重"
          >
             {getFieldDecorator('weight', { initialValue: 1 })(
            <InputNumber min={1} max={10000} />
          )}
          <span className="ant-form-text"> kg</span>
          </Form.Item>


          <Form.Item
            label="体脂率"
          >
             {getFieldDecorator('bodyFatRate')(
            <Slider marks={{
              0: '0', 20: '20', 40: '40', 60: '60', 80: '80', 100: '100',
            }}
            />
          )}
          </Form.Item>
          <Form.Item
            label="身体水分率"
          >
             {getFieldDecorator('bodyMoistureRate')(
            <Slider marks={{
              0: '0', 20: '20', 40: '40', 60: '60', 80: '80', 100: '100',
            }}
            />
          )}
          </Form.Item>
          <Form.Item
            label="肌肉量"
          >
             {getFieldDecorator('muscleMass')(
            <Slider marks={{
              0: '0', 20: '20', 40: '40', 60: '60', 80: '80', 100: '100',
            }}
            />
          )}
          </Form.Item>
          <Form.Item
            label="基础代谢率"
          >
             {getFieldDecorator('basalMetabolicRate')(
            <Slider marks={{
              0: '0', 20: '20', 40: '40', 60: '60', 80: '80', 100: '100',
            }}
            />
          )}
          </Form.Item>
          <Form.Item
            label="骨重量"
          >
             {getFieldDecorator('boneWeight')(
            <Slider marks={{
              0: '0', 20: '20', 40: '40', 60: '60', 80: '80', 100: '100',
            }}
            />
          )}
          </Form.Item>
          <Form.Item
            label="内脏脂肪等级"
          >
             {getFieldDecorator('visceralFatGrade')(
            <Slider marks={{
              0: '0', 20: '20', 40: '40', 60: '60', 80: '80', 100: '100',
            }}
            />
          )}
          </Form.Item>


{/* 
          <Form.Item
            label="身高"
          >
             {getFieldDecorator('height', { initialValue: 100 })(
            <InputNumber min={1} max={250} />
          )}
          <span className="ant-form-text"> 厘米</span>
          </Form.Item>
          <Form.Item
            label="体重"
          >
            {getFieldDecorator('weight', { initialValue: 50 })(
            <InputNumber min={1} max={150} />
          )}
          <span className="ant-form-text"> 千克</span>
          </Form.Item>
          <Form.Item
            label="性别"
          >
             {getFieldDecorator('sex')(
            <Radio.Group>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </Radio.Group>
          )}
          </Form.Item>
          <Form.Item
            label="出生日期"
          >
            {getFieldDecorator('birth', {rules:[{ type: 'object', required: false, message: 'Please select time!' }]})(
            <DatePicker />
          )}
          </Form.Item>
          
          <Form.Item
            label="运动强度"
          >
             {getFieldDecorator('slider')(
            <Slider marks={{
              0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F',
            }}
            />
          )}
          </Form.Item>
          <Form.Item
            label="收入"
          >
            {getFieldDecorator('weight', { initialValue: 0 })(
            <InputNumber min={1} max={10000000} />
          )}
          <span className="ant-form-text"> 澳元</span>
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
            label="自我评价"
          >
            {getFieldDecorator('rate', {
              initialValue: 3.5,
            })(
              <Rate />
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
  
  const WrappedBaseVipPage = Form.create({ name: 'validate_other' })(BaseVipPage);
  

// BaseVipPage.propTypes = {
//     classes: PropTypes.object.isRequired
// };

export default withStyles(mobilePageStyle)(WrappedBaseVipPage);

import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Button } from 'antd';
import { NavBar, Icon as IconM } from 'antd-mobile';
import enUS from 'antd-mobile/lib/calendar/locale/en_US';
import zhCN from 'antd-mobile/lib/calendar/locale/zh_CN';
import { ImagePicker, WingBlank, SegmentedControl ,List, Switch,Calendar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import mobilePageStyle from "assets/jss/material-dashboard-pro-react/views/mobilePageStyle.jsx";
import { message } from 'antd';
import './style.css'
import axios from 'axios';
import {
    Form, Select, InputNumber, Radio,
    Slider, Upload, Icon, Input,DatePicker,
  } from 'antd';
  
  const { Option } = Select;
  message.config({
    top: 100
  });
const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];
const extra = {
  '2017/07/15': { info: 'Disable', disable: true },
};

const now = new Date();
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7)] = { info: 'Disable', disable: true };
extra[+new Date(now.getFullYear(), now.getMonth(), now.getDate() + 8)] = { info: 'Disable', disable: true };

Object.keys(extra).forEach((key) => {
  const info = extra[key];
  const date = new Date(key);
  if (!Number.isNaN(+date) && !extra[+date]) {
    extra[+date] = info;
  }
});
// import 'jsencrypt';
class BaseDataPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data:{},
        modify:false,
        files: data,
  multiple: false,
  en: false,
      show: false,
      config: {},
    };
}
renderBtn(zh, en, config = {}) {
  config.locale = this.state.en ? enUS : zhCN;
  return (
    <List.Item arrow="horizontal"
      onClick={() => {
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden';
        this.setState({
          show: true,
          config,
        });
      }}
    >
      {this.state.en ? en : zh}
    </List.Item>
  );
}
changeLanguage = () => {
  this.setState({
    en: !this.state.en,
  });
}
onSelectHasDisableDate = (dates) => {
  console.warn('onSelectHasDisableDate', dates);
}
onConfirm = (startTime, endTime) => {
  document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
  this.setState({
    show: false,
    startTime,
    endTime,
  });
}
onCancel = () => {
  document.getElementsByTagName('body')[0].style.overflowY = this.originbodyScrollY;
  this.setState({
    show: false,
    startTime: undefined,
    endTime: undefined,
  });
}
getDateExtra = date => extra[+date];
onChange = (files, type, index) => {
  console.log(files, type, index);
  this.setState({
    files,
  });
}
onSegChange = (e) => {
  const index = e.nativeEvent.selectedSegmentIndex;
  this.setState({
    multiple: index === 1,
  });
}
    handleSubmit = (e) => {
        message.info('此通道已过期');
        // const thisTemp = this
        // e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //   if (!err) {
        //     console.log('Received values of form: ', values);
        //     values.picture=this.urlimg
        //     axios.put('/api/user/'+this.props.match.params.id,values
        //     ).then( (response) => {
        //           console.log(response.data.data)
                  
        //           if(response.data.code===0){
        //             message.info(response.data.msg);
        //             this.setState({
        //               modify:false
        //             })
        //             thisTemp.getData()
        //             // thisTemp.props.history.push("/mobile/ranklistpage");
        //         }else {
        //             message.info(response.data.msg);
        //         }
        
        //         })
        //         .catch(function (error) {
        //             console.log(error);
        //         });
  
        //   }
        // });
    }

    componentDidMount() {
      // let thisTemp = this
      this.getData()
      // we add a hidden class to the card and after 700 ms we delete it and the transition appears

  }

  getData = () => {
    axios.get('/api/user/'+this.props.match.params.id
    ).then( (response) => {
    console.log(response.data.data)
      this.setState({
        data:response.data.data
                      
                  })
    })
    .catch(function (error) {
        console.log(error);
    });
  }
  
  switch = (e) => {
    e.stopPropagation()
    this.setState({
      modify:!this.state.modify
    })
   
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
      const { files } = this.state;
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
        <NavBar style={{zIndex: 9999, position: "fixed",left: 0,top: 0,width: "100%"}}
                      mode="light"
                      leftContent={[
                      <a onClick={this.goBack}  style={{ marginRight: '6px' }} >返回首页</a>,
                    ]}
                      rightContent={[
                          <a onClick={(e)=>this.switch(e)}  style={{ marginRight: '6px' }} >编辑数据</a>,
                          
                      ]}
                      >基础数据</NavBar>
                  </div>
        <div style={{padding: '20px',margin:'47px auto', maxWidth: 677}}>
                

                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item
            label="用户名"
          >

          {this.state.modify?
          (getFieldDecorator('realName', {
            initialValue:  this.state.data.realName ,
        rules: [{ required: true, message: '请输入用户名!' }],
      })(<Input />))
        :(this.state.data.realName)
        }
            
          </Form.Item>

           <Form.Item
            label="地址"
          >
             
        {this.state.modify?
          (getFieldDecorator('city', {
            initialValue:  this.state.data.city ,
       rules: [{ required: false, message: '请输入地址!' }],
     })(<Input />))
        :(this.state.data.city)
        }

          </Form.Item>
          <Form.Item
            label="邮件"
          >

{this.state.modify?
          (getFieldDecorator('email', {
            initialValue:  this.state.data.email ,
          rules: [{
            type: 'email', message: '输入的不是邮件!',
          }, {
            required: false, message: '请输入邮件!',
          }],
        })(
          <Input />
        ))
        :(this.state.data.email)
        }

          </Form.Item>

          <Form.Item
            label="年龄"
          >

{this.state.modify?
  (getFieldDecorator('age', { initialValue:  this.state.data.age , })(
    <InputNumber min={1} max={120} />
  ))
:(this.state.data.age)
}
{this.state.data.age?<span className="ant-form-text"> 岁</span>:<span className="ant-form-text"> 无记录</span>}
          
          </Form.Item>
          <Form.Item
            label="身高"
          >
          
{this.state.modify?
  (getFieldDecorator('height', { initialValue:  this.state.data.height })(
    <InputNumber min={1} max={250} />
  ))
:(this.state.data.height)
}
{this.state.data.height?<span className="ant-form-text"> 厘米</span>:<span className="ant-form-text">无记录</span>}
          
          </Form.Item>
          <Form.Item
            label="体重"
          >

{this.state.modify?
  (getFieldDecorator('weight', { initialValue:  this.state.data.weight , })(
    <InputNumber min={1} max={150} />
  ))
:(this.state.data.weight?this.state.data.weight:'无记录')
}

          <span className="ant-form-text"> 千克</span>
          </Form.Item>
          <Form.Item
            label="性别"
          >

{this.state.modify?
  (getFieldDecorator('sex',{initialValue:  this.state.data.sex ,})(
    <Radio.Group>
      <Radio value="男">男</Radio>
      <Radio value="女">女</Radio>
    </Radio.Group>
  ))
:(this.state.data.sex?this.state.data.sex:'未记录')
}

          </Form.Item>
          <Form.Item
            label="出生日期"
          >

{this.state.modify?
  (getFieldDecorator('birth', {
    // initialValue:  this.state.data.birth ,
    rules:[{ type: 'object', required: false, message: 'Please select time!' }]})(
  <DatePicker />
))
:(this.state.data.birth?this.state.data.birth.slice(0, 10):'无记录')
}

          </Form.Item>
          
          <Form.Item
            label="运动强度"
          >

{this.state.modify?
  (getFieldDecorator('exerciseVolume',{
    initialValue:  this.state.data.exerciseVolume ,
  })(
 <Slider marks={{
   0: 'A', 20: 'B', 40: 'C', 60: 'D', 80: 'E', 100: 'F',
 }}
 />
))
:(this.state.data.exerciseVolume?this.state.data.exerciseVolume:'无')
}

          </Form.Item>
          <Form.Item
            label="收入"
          >

{this.state.modify?
  (getFieldDecorator('income', { initialValue:  this.state.data.income , })(
    <InputNumber min={1} max={10000000} />
  ))
:(this.state.data.income?this.state.data.income:0)
}

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
          <Form.Item label="照片">

{this.state.modify?
  (getFieldDecorator('picture', {
    rules: [{ required: false, message: '请上传图片!' }],
})(
    <Upload {...propsimg}>
        <Button>
        <Icon type="upload" /> 上传图片
        </Button>
    </Upload>
))
:(<img style={{ height: '20px', marginRight: '0px' }} src={this.state.data.picture} alt="" />)
}

      </Form.Item>

          <Form.Item
            wrapperCol={{ span: 12, offset: 6 }}
          >
          {this.state.modify?
          <Button type="primary" htmlType="submit">
          提交数据
          </Button>
        :''
        }
        {/* <a type="danger" onClick={(e)=>this.switch(e)}>
        编辑数据<Icon type="edit" theme="twoTone" />
        </a> */}
        {this.state.modify?
          <Button style={{marginLeft:15}} onClick={(e)=>this.switch(e)}>
          取消
          </Button>
        :''
        }
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

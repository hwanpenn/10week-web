import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

import { Button,Breadcrumb } from 'antd';
import officialHomePageStyle from "assets/jss/material-dashboard-pro-react/views/officialHomePageStyle.jsx";
import { message } from 'antd';
import cx from "classnames";
import logo from "assets/img/xiaoyue.png";
import { Row, Col } from 'antd';
import shineyueLogo from "assets/img/logoRule.png";
import logo1 from "assets/img/shineyuelogo.png";
import axios from 'axios';
import { NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

message.config({
    duration: 1,
});

class PicturePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rows:[],
            data:{}
        };
    }


    componentWillMount(){

    }
    handleEnterKey = (e) => {
        // console.log(e.keyCode)
        if(e.keyCode === 13){
            this.handleClick()
        }
    }
    componentWillUmount(){

    }
    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        axios.get('/api/user/'+this.props.match.params.id
        ).then( (response) => {
        console.log(response.data.data)
        this.getData()
          this.setState({
            data:response.data.data                 
                      })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getData = ()=>{
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
    }

    handleClick = (event) =>{

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
        this.props.history.push("/mobile/taskpage/"+this.props.match.params.id);
        // this.setState({ visible: true });
    }

    render() {

        let piclist = this.state.rows.map((item,index)=>{
            if(parseInt(item.vipDay%7)===0){
                // return ("第"+(parseInt(item.vipDay/7))+"周")
                return <div key={index} style={{textAlign:'center'}}>
                <div
                    style={{
                        lineHeight: '50px',
                        color: '#888',
                        fontSize: 18,
                        borderBottom: '1px solid #F6F6F6',
                    }}
                >第{item.vipDay/7}周</div>
                <div style={{ display: '-webkit-box', display: 'flex',width:'400px',margin:'0px auto' }}>
                    <img style={{width:'190px',height:'285px',background:'#cf0'}} src={this.state.data.picture} alt="" />
                    <img style={{width:'190px',height:'285px',background:'#cc0' }} src={item.picture} alt="" />
                </div>
            </div>
            }
        })

        return (
            <div>
            <div  style={{textAlign:'center'}}>
            <NavBar
                          mode="light"
                          icon={<Icon onClick={this.goBack} type="left" />}
                          onLeftClick={() => console.log('onLeftClick')}
                          rightContent={[
                              <a onClick={this.goto}  style={{ marginRight: '6px' }} >可视化</a>,
                              
                          ]}
                          >十周挑战对比</NavBar>
                      </div>
            <div style={{padding: '20px',margin:'0 auto', maxWidth: 677}}>
                <div  style={{textAlign:'center'}}>
                 <h3>前后对比图</h3>
                </div>
{
    piclist
}

                
                {/* <div key={1} style={{textAlign:'center'}}>
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >第二周</div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '0 0',width:'400px',margin:'0px auto' }}>
                    <img style={{width:'190px',height:'285px',background:'#cf0'}} src={"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556002081&di=dfa8e12438b91e65fe72f6e6fc2e88fb&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2Fb9eac02df0429a104dfc2000f60f21ad.jpeg%40c_1%2Cw_450%2Ch_700%2Cx_0%2Cy_0"} alt="" />
                        <img style={{width:'190px',height:'285px',background:'#cc0' }} src={"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3822226512,1336452373&fm=200&gp=0.jpg"} alt="" />
                    </div>
                </div> */}
            </div>
            </div>
        );
    }
}

PicturePage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default (PicturePage);

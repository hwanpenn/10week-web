import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import mobilePageStyle from "assets/jss/material-dashboard-pro-react/views/mobilePageStyle.jsx";
import { message } from 'antd';
import cx from "classnames";
import axios from 'axios';
import { NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
// import G2 from '@antv/g2';
var echarts = require('echarts');


message.config({
    duration: 1,
    top:100
});


class ChartPage extends React.Component {

    constructor(props) {
        super(props);
        // we use this to make the card to appear after the page has been rendered
        this.state = {
            content:'',
            title:'',
            author:'',
            data:'',
            rows:[
                {
                  "access": "user",
                  "createdAt": "2019-04-30 12:12:58",
                  "mark": "",
                  "bust": "12",
                  "waist": "23",
                  "hip": "34",
                  "thigh": "45",
                  "upperHip": "34",
                  "strength": "20",
                  "sitUp": "1",
                  "flatSupport": "11",
                  "pushUp": "12",
                  "squat": "",
                  "bobbyJump": "13",
                  "bodyFatRate": "21",
                  "bodyMoistureRate": "41",
                  "muscleMass": "40",
                  "basalMetabolicRate": "19",
                  "boneWeight": "39",
                  "visceralFatGrade": "22",
                  "rate": "3.5",
                  "weight": 14,
                  "picture": "",
                  "vipDay": "1",
                  "__v": 0,
                  "name": "第1天打卡数据",
                  "user": "5cc2f6a703dd3655f5d87945",
                  "_id": "5cc7b63203dd3655f5d8794b",
                  "key": 0
                }],
            createdAt:''
        };
    }

   

    render01 = (dom)=>{
        let myChart = echarts.init(dom);
        let app = {};
        let option = null;
        option = {
            series: [
                {
                    name: '十周挑战',
                    type: 'gauge',
                    detail: {formatter:'{value}%'},
                    data: [{value: parseInt((this.state.data.vipDay/70)*100), name: '完成率'}]
                }
            ]
        };
        let count = 0
        let thisTemp = this
        var interval=setInterval(function () {
            option.series[0].data[0].value = parseInt((Math.random() * 100).toFixed(2) - 0);
            myChart.setOption(option, true);
            if(count > 3){
                option.series[0].data[0].value = parseInt((thisTemp.state.data.vipDay/70)*100);
                myChart.setOption(option, true);
                clearInterval(interval);
                return;
                }
                count++
        },1000);
        ;
        if (option && typeof option === "object") {
            myChart.setOption(option, true);
        }
    }
    render02 = (dom)=>{
        let myChart = echarts.init(dom);
        let app = {};
        let option = null;
        app.title = '环形图';
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data:['仰卧起坐','平板支撑','俯卧撑','深蹲','波比跳']
            },
            series: [
                {
                    name:'运动占比',
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '30',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:this.state.rows[0]===undefined?0:this.state.rows[0].sitUp, name:'仰卧起坐'},
                        {value:this.state.rows[0]===undefined?0:this.state.rows[0].flatSupport, name:'平板支撑'},
                        {value:this.state.rows[0]===undefined?0:this.state.rows[0].pushUp, name:'俯卧撑'},
                        {value:this.state.rows[0]===undefined?0:this.state.rows[0].squat, name:'深蹲'},
                        {value:this.state.rows[0]===undefined?0:this.state.rows[0].bobbyJump, name:'波比跳'}
                    ]
                }
            ]
        };
        myChart.setOption(option, true);
    }
    render03 = (dom)=>{
        let myChart = echarts.init(dom);
        let app = {};
        let option = null;
        option = {
            xAxis: {
                type: 'category',
                data: ['一天前', '两天前', '三天前', '四天前', '五天前', '六天前', '七天前']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [this.state.rows[0]===undefined?0:this.state.rows[0].bust, this.state.rows[1]===undefined?0:this.state.rows[1].bust, this.state.rows[2]===undefined?0:this.state.rows[2].bust, this.state.rows[3]===undefined?0:this.state.rows[3].bust, this.state.rows[4]===undefined?0:this.state.rows[4].bust, this.state.rows[5]===undefined?0:this.state.rows[5].bust, this.state.rows[6]===undefined?0:this.state.rows[6].bust],
                type: 'line'
            }]
        };
        myChart.setOption(option, true);
    }
    render04 = (dom)=>{
        let myChart = echarts.init(dom);
        let app = {};
        let option = null;
        app.title = '坐标轴刻度与标签对齐';
        option = {
            color: ['#3398DB'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : ['一天前', '两天前', '三天前', '四天前', '五天前', '六天前', '七天前'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'波比跳',
                    type:'bar',
                    barWidth: '60%',
                    data:[this.state.rows[0]===undefined?0:this.state.rows[0].bobbyJump, this.state.rows[1]===undefined?0:this.state.rows[1].bobbyJump, this.state.rows[2]===undefined?0:this.state.rows[2].bobbyJump, this.state.rows[3]===undefined?0:this.state.rows[3].bobbyJump, this.state.rows[4]===undefined?0:this.state.rows[4].bobbyJump, this.state.rows[5]===undefined?0:this.state.rows[5].bobbyJump, this.state.rows[6]===undefined?0:this.state.rows[6].bobbyJump]
                }
            ]
        };
        myChart.setOption(option, true);
    }
    render05 = (dom)=>{
        let myChart = echarts.init(dom);
        let app = {};
        let option = null;
        app.title = '坐标轴刻度与标签对齐';
        option = {
            title: {
                // text: '堆叠区域图'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            // legend: {
            //     data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
            // },
            toolbox: {
                feature: {
                    // saveAsImage: {}
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data : ['一天前', '两天前', '三天前', '四天前', '五天前', '六天前', '七天前']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'仰卧起坐',
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:[this.state.rows[0]===undefined?0:this.state.rows[0].waist, this.state.rows[1]===undefined?0:this.state.rows[1].waist, this.state.rows[2]===undefined?0:this.state.rows[2].waist, this.state.rows[3]===undefined?0:this.state.rows[3].waist, this.state.rows[4]===undefined?0:this.state.rows[4].waist, this.state.rows[5]===undefined?0:this.state.rows[5].waist, this.state.rows[6]===undefined?0:this.state.rows[6].waist]
                },
                {
                    name:'体脂率',
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:[this.state.rows[0]===undefined?0:this.state.rows[0].bodyFatRate, this.state.rows[1]===undefined?0:this.state.rows[1].bodyFatRate, this.state.rows[2]===undefined?0:this.state.rows[2].bodyFatRate, this.state.rows[3]===undefined?0:this.state.rows[3].bodyFatRate, this.state.rows[4]===undefined?0:this.state.rows[4].bodyFatRate, this.state.rows[5]===undefined?0:this.state.rows[5].bodyFatRate, this.state.rows[6]===undefined?0:this.state.rows[6].bodyFatRate]
                },
                {
                    name:'身体水分率',
                    type:'line',
                    stack: '总量',
                    areaStyle: {},
                    data:[this.state.rows[0]===undefined?0:this.state.rows[0].bodyMoistureRate, this.state.rows[1]===undefined?0:this.state.rows[1].bodyMoistureRate, this.state.rows[2]===undefined?0:this.state.rows[2].bodyMoistureRate, this.state.rows[3]===undefined?0:this.state.rows[3].bodyMoistureRate, this.state.rows[4]===undefined?0:this.state.rows[4].bodyMoistureRate, this.state.rows[5]===undefined?0:this.state.rows[5].bodyMoistureRate, this.state.rows[6]===undefined?0:this.state.rows[6].bodyMoistureRate]
                 },
                {
                    name:'肌肉量',
                    type:'line',
                    stack: '总量',
                    areaStyle: {normal: {}},
                    data:[this.state.rows[0]===undefined?0:this.state.rows[0].muscleMass, this.state.rows[1]===undefined?0:this.state.rows[1].muscleMass, this.state.rows[2]===undefined?0:this.state.rows[2].muscleMass, this.state.rows[3]===undefined?0:this.state.rows[3].muscleMass, this.state.rows[4]===undefined?0:this.state.rows[4].muscleMass, this.state.rows[5]===undefined?0:this.state.rows[5].muscleMass, this.state.rows[6]===undefined?0:this.state.rows[6].muscleMass]
                },
                {
                    name:'基础代谢率',
                    type:'line',
                    stack: '总量',
                    label: {
                        normal: {
                            show: true,
                            position: 'top'
                        }
                    },
                    areaStyle: {normal: {}},
                    data:[this.state.rows[0]===undefined?0:this.state.rows[0].basalMetabolicRate, this.state.rows[1]===undefined?0:this.state.rows[1].basalMetabolicRate, this.state.rows[2]===undefined?0:this.state.rows[2].basalMetabolicRate, this.state.rows[3]===undefined?0:this.state.rows[3].basalMetabolicRate, this.state.rows[4]===undefined?0:this.state.rows[4].basalMetabolicRate, this.state.rows[5]===undefined?0:this.state.rows[5].basalMetabolicRate, this.state.rows[6]===undefined?0:this.state.rows[6].basalMetabolicRate]
                }
            ]
        };
        myChart.setOption(option, true);
    }
   
    componentDidMount() {
       
        
        


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
        axios.get('/api/vipData?pageNo=1&pageSize=7&user='+this.props.match.params.id,
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
          var dom01 = document.getElementById("container01");
        this.render01(dom01)
        var dom02 = document.getElementById("container02");
        this.render02(dom02)
        var dom03 = document.getElementById("container03");
        this.render03(dom03)
        var dom04 = document.getElementById("container04");
        this.render04(dom04)
        var dom05 = document.getElementById("container05");
        this.render05(dom05)
    
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    renovate = (vaule) =>{
        this.child = vaule
    }
    handleClick = (event) =>{

    }
    handleChange = name => event => {

    };
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
        const { classes,white,rtlActive } = this.props;
        const size = this.state.size;
        const temp = {}

        var anchor =
            classes.a +
            cx({
                [" " + classes.whiteColor]: white
            });
        return (
            <div style={{padding: '0px'}} >
                  <NavBar style={{zIndex:9999,position: "fixed",left: 0,top: 0,width: "100%"}}
                    mode="light"
                    leftContent={[
                      <a onClick={this.goBack}  style={{ marginRight: '6px' }} >返回首页</a>,
                    ]}
                    rightContent={[
                        <a onClick={this.goto}  style={{ marginRight: '6px' }} >列表数据</a>,
                        
                    ]}
                    >十周挑战可视化</NavBar>
                <div style={{paddingTop: '20px',margin:'47px auto', maxWidth: 677}}>
                    <div style={{marginTop: '30px'}} >
                    <p style={{textAlign: 'center'}}>{"十周挑战完成的度"}</p>
                    <div id="container01" style={{ width: 330, height: 330,margin:"0 auto" }}></div>
                    
                    <p style={{textAlign: 'center'}}>{"十周挑战每日波比跳"}</p>
                    <div id="container04" style={{ width: 330, height: 250,margin:"0 auto" }}></div>
                    
                    <p style={{marginTop:25, textAlign: 'center'}}>{"十周挑战运动占比"}</p>
                    <div id="container02" style={{ width: 330, height: 330,margin:"0 auto" }}></div>
                    
                    <p style={{textAlign: 'center'}}>{"十周挑战力量测试"}</p>
                    <div id="container03" style={{ width: 330, height: 250,margin:"0 auto" }}></div>
                    
                    <p style={{textAlign: 'center'}}>{"十周挑战综合指数"}</p>
                    <div id="container05" style={{ width: 330, height: 250,margin:"0 auto" }}></div>
                    </div>
                </div>
                
            </div>

        );
    }
}

ChartPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(mobilePageStyle)(ChartPage);

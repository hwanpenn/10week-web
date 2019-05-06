import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import mobilePageStyle from "assets/jss/material-dashboard-pro-react/views/mobilePageStyle.jsx";
import { message ,Tag} from 'antd';
import cx from "classnames";
import axios from 'axios';
import { ListView ,PullToRefresh,Toast} from 'antd-mobile';
import { DefaultPlayer as Video } from 'react-html5video';
import ReactDOM from 'react-dom';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FaBeer ,Fa500px ,FaAccessibleIcon} from 'react-icons/fa';
import { Timeline, TimelineItem }  from 'vertical-timeline-component-for-react';
import { NavBar, Icon } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

  

    
  

class TaskPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      rows: [] ,
      data: {}
    }
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
    
      
    
      handleTouch = (id) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        // this.props.history.push("/mobile/VideoPage/"+id);
      }
      handlerecipe = (day) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        this.props.history.push("/mobile/recipepage/"+day);
      }
      handletask = (day) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        this.props.history.push("/mobile/taskshowpage/"+day);
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
        this.props.history.push("/mobile/chartpage/"+this.props.match.params.id);
        // this.setState({ visible: true });
    }

    render() {

      let piclist = this.state.rows.map((item,index)=>{
        if(0===0){
            // return ("第"+(parseInt(item.vipDay/7))+"周")
            return <TimelineItem
    key="index"
    // dateText="11/2010 – 第一天"
    dateText={"十周挑战 - 第"+item.vipDay+"天"}
    style={{ color: '#e86971' }}
  >
  <h4>已完成,时间：{item.createdAt}</h4>
   
    <p>
      打卡数据:
     胸围:{' '+item.bust+'  '}
     腰围:{' '+item.waist+'  '}
     臀围:{' '+item.hip+'  '}
     大腿围:{' '+item.thigh+'  '}
     上臀围:{' '+item.upperHip+'  '}

     力量测试:{' '+item.strength+'  '}
     仰卧起坐:{' '+item.sitUp+'  '}
     平板支撑:{' '+item.flatSupport+'  '}
     俯卧撑:{' '+item.pushUp+'  '}
     深蹲:{' '+item.squat+'  '}
     波比跳:{' '+item.bobbyJump+'  '}

     体脂率:{' '+item.bodyFatRate+'  '}
     身体水分率:{' '+item.bodyMoistureRate+'  '}
     肌肉量:{' '+item.muscleMass+'  '}
     基础代谢率:{' '+item.basalMetabolicRate+'  '}
     骨重量:{' '+item.boneWeight+'  '}
     内脏脂肪等级:{' '+item.visceralFatGrade+'  '}

    </p>
    <h4  >健身食谱：<Tag onClick={()=>this.handlerecipe(item.vipDay)} color="magenta">查看当日食谱</Tag></h4>
    <h4 >健身任务：<Tag  onClick={()=>this.handletask(item.vipDay)} color="volcano">查看当日任务</Tag></h4>
   
  </TimelineItem>
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
                                <a onClick={this.goto}  style={{ marginRight: '6px' }} >可视化数据</a>,
                                
                            ]}
                            >十周挑战时间轴</NavBar>
                        </div>
              <div style={{padding: '20px'}}>
<Timeline lineColor={'#ddd'}>
{piclist}
  {/* <TimelineItem
    key="001"
    dateText="11/2010 – 第一天"
    style={{ color: '#e86971' }}
  >
  <h3>完成状态：已完成</h3>
    <h4>健身食谱：拆机减肥餐</h4>
    <h4>健身任务</h4>
    <p>
    计划 . 胸部 + 肱三头肌 + 腹部
胸部1.杠铃卧推：12次 × 3组
胸部2.哑铃飞鸟：12次 × 3组
胸部3.俯卧撑：12次 × 3组
肱三头肌1.仰卧撑：12次 × 3组
肱三头肌2.哑铃颈后屈臂：12次 × 3组
肱三头肌3.重锤下压：12次 × 3组
腹部1.仰卧起坐：20次 × 3组
腹部2.仰卧举腿：20次 × 3组
    </p>
   
  </TimelineItem> */}
 
 
</Timeline>
              </div>
              </div>
            );
          };


}

TaskPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(mobilePageStyle)(TaskPage);

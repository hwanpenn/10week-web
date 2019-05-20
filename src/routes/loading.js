
import React,{Component} from 'react';
import {Icon,Spin,Row} from 'antd';
class Loading extends Component{
  render(){
    const antIcon = <Icon type="loading" style={this.props.style} spin />
    return(
      <div style={{marginTop: "50%"}}>
        <Row type="flex" justify="center" align="bottom">
            <Spin tip="Loading..." size="large" indicator={antIcon}/>
        </Row>
      </div>
    )
  }
}
export default Loading

import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import mobilePageStyle from "assets/jss/material-dashboard-pro-react/views/mobilePageStyle.jsx";
import { message } from 'antd';
import cx from "classnames";
import axios from 'axios';
import { ListView ,PullToRefresh,Toast} from 'antd-mobile';
import ReactDOM from 'react-dom';

    function MyBody(props) {
        return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
        );
    }
  
    let data = [
    ];
    let NUM_SECTIONS = 8;
    const NUM_ROWS_PER_SECTION = 0;
    let pageIndex = 0;

    const dataBlobs = {};
    let sectionIDs = [];
    let rowIDs = [];

    
  

class NewsListPage extends React.Component {

    constructor(props) {
        // console.log("constructor")
        super(props);
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];
    
        const dataSource = new ListView.DataSource({
          getRowData,
          getSectionHeaderData: getSectionData,
          rowHasChanged: (row1, row2) => row1 !== row2,
          sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });
    
        this.state = {
          dataSource,
          isLoading: true,
          height: document.documentElement.clientHeight * 3 / 4,
        };
        
      }

    getData = (pIndex) =>{
        // pIndex++
        axios.get('/api/news',{params:{
        pageNo: pIndex+1,
        pageSize: 8}}
        ).then( (response) => {
            if(response.data.data.rows.length===0){
                // alert('没有数据了~',1);
                message.info("没有数据了");
            }else{
                data = response.data.data.rows
                for (let i = 0; i < NUM_SECTIONS; i++) {

                    // let ii;
                    // if(response.data.data.rows.length<8 ){
                    //     if(i<response.data.data.rows.length){
                    //         ii = (pIndex * NUM_SECTIONS) + i;
                    //     }else{
                    //         // li = 
                    //     }
                       
                    // }else{
                    //     ii = (pIndex * NUM_SECTIONS) + i;
                    // }

                    const ii = (pIndex * NUM_SECTIONS) + i;
                    const sectionName = `Section ${ii}`;
                    sectionIDs.push(sectionName);
                    dataBlobs[sectionName] = sectionName;
                    rowIDs[ii] = [];
            
                    const rowName = `S${i}, R${ii}`;
                    rowIDs[ii].push(rowName);
                    dataBlobs[rowName] = rowName;
            
                    for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
                    const rowName = `S${ii}, R${jj}`;
                    rowIDs[ii].push(rowName);
                    dataBlobs[rowName] = rowName;
                    }
                }
                sectionIDs = [...sectionIDs];
                rowIDs = [...rowIDs];
                const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
                setTimeout(() => {
                //   genData();
                  this.setState({
                    dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                    isLoading: false,
                    height: hei,
                  });
                }, 500);
            }
            
        
            })
      .catch(function (error) {
          console.log(error);
      });
    }

    genData = (pIndex = 0) => {
        // alert(pIndex)
        this.getData(pIndex)
    }
    
    showList = () => {
        this.genData();
    }
        
    componentDidMount() {
        this.showList(data)
      }
    
      // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
      componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource !== this.props.dataSource) {
          this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
          });
        }
      }
    
      onEndReached = (event) => {
    // hasMore: from backend data, indicates whether it is the last page, here is false
            if (this.state.isLoading && !this.state.hasMore) {
                return;
            }
            console.log('reach end', event);
            this.setState({ isLoading: true });
            setTimeout(() => {
                //   console.log(++pageIndex)
                this.genData(++pageIndex);
                this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
                });
            }, 500);
      }

      onScroll = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        // alert(++pageIndex)
      }

      onRefresh = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        // alert("onRefresh")
        
      }
      handleTouch = (id) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        this.props.history.push("/mobile/newspage/"+id);
      }

    render() {

        const separator = (sectionID, rowID) => (
            <div
              key={`${sectionID}-${rowID}`}
              style={{
                backgroundColor: '#F5F5F9',
                height: 8,
                borderTop: '1px solid #ECECED',
                borderBottom: '1px solid #ECECED',
              }}
            />
          );
          let index = data.length - 1;
          const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
              index = data.length - 1;
            }
            const obj = data[index--];
            return (
              <div  key={rowID} style={{ padding: '0 0px' }}>
                {/* <div
                  style={{
                    lineHeight: '50px',
                    color: '#888',
                    fontSize: 18,
                    borderBottom: '1px solid #F6F6F6',
                  }}
                >{obj.title}</div> */}
                <div onClick={()=>this.handleTouch(obj._id)} style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                  <img style={{ height: '64px', marginRight: '15px' }} src={obj.url?obj.url:"https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png"} alt="" />
                  <div style={{ lineHeight: 1 }}>
                    <div  style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.name}</div>
                    <div><span style={{ fontSize: '30px', color: '#FF6E27' }}></span> {"发布日期： "+obj.createdAt}</div>
                  </div>
                </div>
              </div>
            );
          };

        return (
            <div >
                <ListView
                    ref={el => this.lv = el}
                    dataSource={this.state.dataSource}
                    // renderHeader={() => <span>header</span>}
                    renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                    </div>)}
                    // renderSectionHeader={sectionData => (
                    // <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                    // )}
                    renderBodyComponent={() => <MyBody />}
                    renderRow={row}
                    renderSeparator={separator}
                    style={{
                    height: this.state.height,
                    overflow: 'auto',
                    }}
                    // pullToRefresh={<PullToRefresh
                    //     // refreshing={this.state.refreshing}
                    //     onRefresh={this.onRefresh}
                    // />}
                    pageSize={8}
                    // onScroll={() => this.onScroll()}
                    scrollRenderAheadDistance={500}
                    onEndReached={this.onEndReached}
                    onEndReachedThreshold={10}
                />
            </div>

        );
    }
}

NewsListPage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(mobilePageStyle)(NewsListPage);

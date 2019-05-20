import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Assignment from "@material-ui/icons/Assignment";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import {updatePasswordDataTkVideo,getOtherTkVideo,getDataTkVideo,updateDataTkVideo,deleteDataTkVideo,createDataTkVideo } from "actions/tablesTkVideo";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select,Popover } from 'antd';
import { Upload, message, Icon } from 'antd';
import { DefaultPlayer as Video } from 'react-html5video';
import 'react-html5video/dist/styles.css';
import { LocaleProvider } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;


class tablesTkVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleVideo: false,
            visibleModify: false,
            recordAction:{},
            recordSelect:{},
            defaultSelectValue:'',
            current:1,
        };
    }
    params = {
        search:'',
        pageNo:1,
        pageSize:10,
    };
    url=''
    componentWillMount(){
        this.getTableData('',1,10);
        // this.getOtherData('',1,10);
    }
    componentDidMount(){
        // this.video.load()
        // alert("11")
    }
    getTableData = (search,start,size) => {
        const params = {
            search:search,
            pageNo:start,
            pageSize:size,
        };
        this.setState({
            current:start
        })
        this.props.getDataTkVideo(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            pageNo:'1',
            pageSize:'999',
        };
        this.props.getOtherTkVideo(params);
    }
    handleSearch = (value) => {
        this.params.search=value
        this.getTableData()
    }
    handlePageChange = (value) => {
        this.params.pageNo=value
        this.getTableData()
    }
    handleSelect = (value) => {
        if(value==='all'){
            this.params.createdAt=''
        }else{
            this.params.createdAt=value
        }
        
        this.getTableData();
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record,_id:record.createdAt._id });
    }
    showModalCreate = () => {
        this.setState({ visible: true });
    }
    showModalList = () => {
        this.props.history.push("/mobile/videopagelist")
    }
    handleCancelModify = () => {
        this.setState({ visibleModify: false });
    }
    handleCancelCreate = () => {
        this.setState({ visible: false });
    }
    handleModify = () => {
        const form = this.formRefModifyData.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.id=this.state.recordAction._id
            values.url=this.url
            values.img=this.urlimg
            console.log('values--------------')
            console.log(this.urlimg)
            console.log(values)
            this.props.updateDataTkVideo(values);
            form.resetFields();
            this.setState({ visibleModify: false });
        });
    }
    handleCreate = () => {
        const form = this.formRefDataCreate.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.img=this.urlimg
            values.url=this.url
            this.props.createDataTkVideo(values)
            form.resetFields();
            this.setState({ visible: false });
        });
    }
    saveFormRefModify = (formRef) => {
        this.formRefModifyData = formRef;
    }
    saveFormRefCreate = (formRef) => {
        this.formRefDataCreate = formRef;
    }
    deleteConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.deleteDataTkVideo(params)
    }
    resetConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.updatePasswordDataTkVideo(params)
    }
    handleCancelVideo = (e) => {
        console.log(e);
        this.setState({
          visibleVideo: false,
        });
      }
      showModalVideo = (record) => {
        // console.log(record.url)
        this.setState({
          visibleVideo: true,
          url:record.url
        });
        // console.log(document.getElementsByClassName("rh5v-DefaultPlayer_video")[0])
        const video =  document.getElementsByClassName("rh5v-DefaultPlayer_video")[0]
        if(video===undefined){

        }else{
            video.load()
        }
        // document.getElementsByClassName("rh5v-DefaultPlayer_video")[0].load()
      }
    
      handleOkVideo = (e) => {
        console.log(e);
        this.setState({
          visibleVideo: false,
        });
      }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '视频名称',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            // fixed: 'left',
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 150
                }}>{text}</span>
          </Popover>
        }, {
            title: '上传时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            // align: 'center'
            width: '15%',
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 150
                }}>{text}</span>
          </Popover>
        }, 
        {
            title: '视频图片',
            dataIndex: 'img',
            key: 'img',
            // align: 'center'
            width: '10%',
            render: text => <img style={{ height: '20px', marginRight: '0px' }} src={text?text:"https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png"} alt="" />,
            // render: text => <a >{text}</a>,
        },{
            title: '描述',
            dataIndex: 'extra',
            key: 'extra',
            // align: 'center',
            width: '20%',
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 270
                }}>{text}</span>
          </Popover>
        },  {
            title: '操作',
            key: 'action',
            width: '20%',
            // fixed: 'right',
            render: (text, record) => {
                    return (
                        <span>
                            <a onClick={() => this.showModifyModal(record)} >修改</a>
                            <Divider type="vertical" />

                            <a onClick={() => this.showModalVideo(record)}>播放</a>

                            <Divider type="vertical" />
                            <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )
            },
        }];
        let options = ''
        if(this.props.tablesTkVideo.responseOtherTkVideo.rows!==undefined){
             options = this.props.tablesTkVideo.responseOtherTkVideo.rows.map((item,i) => {
                return <Option value={item._id}>{item.name}</Option>
            })
        }
        
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                handleChange = (value) => {
                    console.log(`selected ${value}`);
                    this.props.form.setFieldsValue({
                        categoryId: value,
                    });
                }
                handleBlur = () => {
                console.log('blur');
                }
                handleFocus = () => {
                console.log('focus');
                }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    const props = {
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
                            console.log(info.file.response.data.url)
                            thisTemp.url=info.file.response.data.url
                            message.success(`${info.file.name} 上传成功`);
                          } else if (info.file.status === 'error') {
                            message.error(`${info.file.name} 上传失败.`);
                          }
                        },
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
                        <Modal
                        width={1000}
                            zIndex={9999}
                            visible={visible}
                            title="新增视频"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="视频名称">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入新增视频名称!' }],
                                    })(
                                        <Input placeholder="" />
                                    )}
                                </FormItem>
                                <FormItem label="视频图片">
                                    {getFieldDecorator('file', {
                                        rules: [{ required: false, message: '请选择标题图片!' }],
                                    })(
                                        <Upload {...propsimg}>
                                            <Button>
                                            <Icon type="upload" /> 上传图片
                                            </Button>
                                        </Upload>
                                    )}
                                </FormItem>
                                <FormItem label="描述">
                                    {getFieldDecorator('extra', {
                                        rules: [{ required: false, message: '请输入新增用户描述!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                                <FormItem label="上传视频">
                                    {getFieldDecorator('file', {
                                        rules: [{ required: false, message: '请输入新增用户描述!' }],
                                    })(
                                        <Upload {...props}>
                                            <Button>
                                            <Icon type="upload" /> 上传视频
                                            </Button>
                                        </Upload>
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        const CollectionModifyForm = Form.create()(
            class extends React.Component {
                handleChange = (value) => {
                    console.log(`selected ${value}`);
                    this.props.form.setFieldsValue({
                        categoryId: value,
                    });
                }
                handleBlur = () => {
                console.log('blur');
                }
                handleFocus = () => {
                console.log('focus');
                }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    const props = {
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
                            console.log(info.file.response.data.url)
                            thisTemp.url=info.file.response.data.url
                            message.success(`${info.file.name} 上传成功`);
                          } else if (info.file.status === 'error') {
                            message.error(`${info.file.name} 上传失败.`);
                          }
                        },
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
                            // console.log(info.file.response.data.url)
                            thisTemp.urlimg=info.file.response.data.url
                            message.success(`${info.file.name} 上传成功`);
                          } else if (info.file.status === 'error') {
                            message.error(`${info.file.name} 上传失败.`);
                          }
                        },
                      };
                    return (
                        <Modal
                        width={1000}
                            zIndex={9999}
                            visible={visible}
                            title="修改"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="视频名称">
                                    {getFieldDecorator('name', {
                                        initialValue:  thisTemp.state.recordAction.name ,
                                        rules: [{ required: true, message: '请输入修改视频名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="视频图片">
                                    {getFieldDecorator('img', {
                                        rules: [{ required: false, message: '请选择标题图片!' }],
                                    })(
                                        <Upload {...propsimg}>
                                            <Button>
                                            <Icon type="upload" /> 上传图片
                                            </Button>
                                        </Upload>
                                    )}
                                </FormItem>
                                <FormItem label="上传视频">
                                    {getFieldDecorator('url', {
                                        rules: [{ required: false, message: '请输入新增用户描述!' }],
                                    })(
                                        <Upload {...props}>
                                            <Button>
                                            <Icon type="upload" /> 上传视频
                                            </Button>
                                        </Upload>
                                    )}
                                </FormItem>
                                <FormItem label="描述">
                                    {getFieldDecorator('extra', {
                                        initialValue:  thisTemp.state.recordAction.extra ,
                                        rules: [{ required: false, message: '请输入新增用户描述!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                            </Form>
                        </Modal>
                    );
                }
            }
        );
        return (
            <GridContainer>
                <GridItem xs={12}>
                    <Card>
                        <CardHeader color="rose" icon>
                            <Grid container spacing={24}>
                                <Grid item xs={6}>
                                    <CardIcon color="rose">
                                        <Assignment />
                                    </CardIcon>
                                    <h4 className={classes.cardIconTitle}> </h4>
                                </Grid>
                                <Grid style={{textAlign:'right',marginTop:10}} item xs={6}>
                                    <Search
                                        placeholder="名称搜索"
                                        onSearch={value => this.handleSearch(value)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    />
                                    <Button onClick={this.showModalCreate} style={{ height: 30,marginRight:10 }} size={'small'}>增加</Button>
                                    <Button onClick={this.showModalList} style={{ height: 30,marginRight:10 }} size={'small'}>列表</Button>
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} key={"tablesTkVideo"} pagination={false} columns={columns} dataSource={this.props.tablesTkVideo.tableDataTkVideo} scroll={{x: 600, y: 360}} />
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesTkVideo.tableCountTkVideo} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
                            </LocaleProvider>
                        </CardBody>
                    </Card>
                </GridItem>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRefCreate}
                    visible={this.state.visible}
                    onCancel={this.handleCancelCreate}
                    onCreate={this.handleCreate}
                />
                <CollectionModifyForm
                    wrappedComponentRef={this.saveFormRefModify}
                    visible={this.state.visibleModify}
                    onCancel={this.handleCancelModify}
                    onCreate={this.handleModify}
                />
                <Modal
                    title="视频播放"
                    visible={this.state.visibleVideo}
                    // onOk={this.handleOkVideo}
                    onCancel={this.handleCancelVideo}
                    footer={null}
                    >
                     <Video loop 
                    controls={['PlayPause', 'Seek', 'Time', 'Volume', 'Fullscreen']}
                    poster=""
                    onCanPlayThrough={() => {
                        // Do stuff
                    }}>
                    <source src={thisTemp.state.url} type="video/webm" />
                    <track label="English" kind="subtitles" srcLang="en" src="" default />
                </Video>
                    </Modal>
               
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        tablesTkVideo: state.tablesTkVideo,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataTkVideo: (params) => {
            dispatch(getDataTkVideo(params))
        },
        updateDataTkVideo: (params) => {
            dispatch(updateDataTkVideo(params))
        },
        deleteDataTkVideo: (params) => {
            dispatch(deleteDataTkVideo(params))
        },
        createDataTkVideo: (params) => {
            dispatch(createDataTkVideo(params))
        },
        getOtherTkVideo: (params) => {
            dispatch(getOtherTkVideo(params))
        },
        updatePasswordDataTkVideo: (params) => {
            dispatch(updatePasswordDataTkVideo(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesTkVideo));

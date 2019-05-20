import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Assignment from "@material-ui/icons/Assignment";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import extendedTablesStyle from "assets/jss/material-dashboard-pro-react/views/extendedTablesStyle.jsx";
import {updatePasswordDataTkTask,getOtherTkTask,getDataTkTask,updateDataTkTask,deleteDataTkTask,createDataTkTask } from "actions/tablesTkTask";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select,Popover } from 'antd';
import { Upload, message, Icon } from 'antd';
import { Card } from 'antd';
import { LocaleProvider,InputNumber } from 'antd';
// import ReactQuill, { Quill } from 'react-quill';
// import { ImageDrop } from 'quill-image-drop-module';
// import { Editor } from 'wangeditor';
// import E from 'wangeditor'
// import Quill from "quill";
// import 'quill/dist/quill.snow.css'
// import 'react-quill/dist/quill.snow.css';
import 'braft-editor/dist/index.css';
import BraftEditor from 'braft-editor';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;
const { Meta } = Card;

class tablesTkTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleTask: false,
            visibleModify: false,
            recordAction:{},
            recordSelect:{},
            defaultSelectValue:'',
            record:'',
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
    // componentDidMount(){
    // }
    
    getTableData = (search,start,size) => {
        const params = {
            search:search,
            pageNo:start,
            pageSize:size,
        };
        this.setState({
            current:start
        })
        this.props.getDataTkTask(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            pageNo:'1',
            pageSize:'999',
        };
        this.props.getOtherTkTask(params);
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
    handleCancelModify = () => {
        this.setState({ visibleModify: false });
    }
    handleCancelCreate = () => {
        this.setState({ visible: false });
    }
    handleModify = () => {
        const form = this.formRefModifyData.props.form;
        // form.validateFields((err, values) => {
        //     if (err) {
        //         return;
        //     }
        //     values.id=this.state.recordAction._id
        //     this.props.updateDataTkTask(values);
        //     form.resetFields();
        //     this.setState({ visibleModify: false });
        // });

        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.url=this.url
            values.id=this.state.recordAction._id
            values.content= values.content.toHTML()
            this.props.updateDataTkTask(values)
            form.resetFields();
            this.setState({ visibleModify: false });
        });
    }
    handleCreate = () => {
        const form = this.formRefDataCreate.props.form;

        // form.validateFields((error, values) => {
        //   if (!error) {
        //     const submitData = {
        //       title: values.name,
        //       content: values.content.toHTML() // or values.content.toHTML()
        //     //   content: values.content.toRAW() // or values.content.toHTML()
        //     }
        //     console.log(submitData)
        //   }
        // })


        // const form = this.formRefDataCreate.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.url=this.url
            values.author= window.sessionStorage.getItem('realName');
            values.content= values.content.toHTML()
            this.props.createDataTkTask(values)
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
        this.props.deleteDataTkTask(params)
    }
    resetConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.updatePasswordDataTkTask(params)
    }
    handleCancelTask = (e) => {
        console.log(e);
        this.setState({
          visibleTask: false,
        });
      }
      showModalTask = (record) => {
        //   console.log(record)
        this.props.history.push("/mobile/taskpage/"+record._id);
        // console.log(record.url)
        // this.setState({
        //   visibleTask: true,
        //   record:record
        // });
      }
      showModalTaskDetail = (record) => {
        //   console.log(record)
        this.props.history.push("/mobile/taskshowpage/"+record.day);
        // console.log(record.url)
        // this.setState({
        //   visibleTask: true,
        //   record:record
        // });
      }
    
      handleOkTask = (e) => {
        console.log(e);
        this.setState({
          visibleTask: false,
        });
      }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [ {
            title: '第几天',
            dataIndex: 'day',
            key: 'day',
            // align: 'center'
            width: '10%',
            render: text => <a >{"第"+text+"天"}</a>,
        },{
            title: '任务名称',
            dataIndex: 'name',
            key: 'name',
            width: '10%',
            // fixed: 'left',
            // render: text => <a >{text}</a>,
            render: text => <Popover content={(
                <div style={{width:270}}>
                  <p>{text}</p>
                </div>
              )}>
             <span style={{overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    display: 'inline-block',
                    width: 100
                }}>{text}</span>
          </Popover>
        },
         {
            title: '强度指数',
            dataIndex: 'heat',
            key: 'heat',
            align: 'left',
            width: '10%',
        },
        // {
        //     title: '标题图',
        //     dataIndex: 'url',
        //     key: 'url',
        //     // align: 'center'
        //     width: '15%',
        //     render: text => <img style={{ height: '20px', marginRight: '0px' }} src={text} alt="" />,
        //     // render: text => <a >{text}</a>,
        // },
        // {
        //     title: '详情',
        //     dataIndex: 'content',
        //     key: 'content',
        //     // align: 'center',
        //     // width: '20%',
        //     render: text => <Popover content={(
        //         <div style={{width:270}}>
        //           <p>{text.substring(0,15)}</p>
        //         </div>
        //       )}>
        //      <span style={{overflow: 'hidden',
        //             textOverflow: 'ellipsis',
        //             whiteSpace: 'nowrap',
        //             display: 'inline-block',
        //             width: 270
        //         }}>{text?text:"空"}</span>
        //   </Popover>
        // }, 
         {
            title: '操作',
            key: 'action',
            width: '20%',
            // fixed: 'right',
            render: (text, record) => {
                    return (
                        <span>
                            <a onClick={() => this.showModifyModal(record)} >修改</a>
                            <Divider type="vertical" />

                            <a onClick={() => this.showModalTask(record)}>时间轴</a>
                            <Divider type="vertical" />

                            <a onClick={() => this.showModalTaskDetail(record)}>详情</a>

                            <Divider type="vertical" />
                            <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )
            },
        }];
        let options = ''
        if(this.props.tablesTkTask.responseOtherTkTask.rows!==undefined){
             options = this.props.tablesTkTask.responseOtherTkTask.rows.map((item,i) => {
                return <Option value={item._id}>{item.name}</Option>
            })
        }
        
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                constructor(props) {
                    super(props);
                    this.state = { editorState: BraftEditor.createEditorState(null) };
                  }
                  handleChange = editorState => {
                    this.setState({ editorState });
                  }

                //   componentDidMount () {
                //     const form = this.formRefModifyData.props.form;
                //     // 异步设置编辑器内容
                //     setTimeout(() => {
                //       form.setFieldsValue({
                //         content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
                //       })
                //     }, 1000)
                
                //   }
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    const extendControls = [
                        {
                          key: 'antd-uploader',
                          type: 'component',
                          component: (
                            <Upload
                              accept="image/*"
                              showUploadList={false}
                              customRequest={this.uploadHandler}
                            >
                              {/* 这里的按钮最好加上type="button"，以避免在表单容器中触发表单提交，用Antd的Button组件则无需如此 */}
                              <button type="button" className="control-item button upload-button" data-title="插入图片">
                                <Icon type="picture" theme="filled" />
                              </button>
                            </Upload>
                          )
                        }
                      ]
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
                            console.log(info.file.response)
                            thisTemp.url=info.file.response.data.url
                            message.success(`${info.file.name} 上传成功`);
                          } else if (info.file.status === 'error') {
                            message.error(`${info.file.name} 上传失败.`);
                          }
                        },
                      };
                      
                    return (
                        <Modal
                            width={900}
                            zIndex={9999}
                            visible={visible}
                            title="新增"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="食任务名称">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入新增食任务名称!' }],
                                    })(
                                        <Input placeholder="" placeholder="请输入标题"/>
                                    )}
                                </FormItem>
                                <FormItem label="第几天">
                                    {getFieldDecorator('day', {
                                        initialValue:  thisTemp.state.recordAction.day ,
                                        rules: [{ required: true, message: '请输入第几天!' }],
                                    })(
                                        <InputNumber min={1} max={70} defaultValue={1} />
                                    )}
                                </FormItem>
                                <FormItem label="强度指数">
                                    {getFieldDecorator('heat', {
                                        rules: [{ required: false, message: '请输入强度指数!' }],
                                    })(
                                        <InputNumber min={1} max={10} defaultValue={5} />
                                    )}
                                </FormItem>
                                {/* <FormItem label="食谱图片">
                                    {getFieldDecorator('file', {
                                        rules: [{ required: false, message: '请选择标题图片!' }],
                                    })(
                                        <Upload {...props}>
                                            <Button>
                                            <Icon type="upload" /> 上传图片
                                            </Button>
                                        </Upload>
                                    )}
                                </FormItem> */}
                                {/* <FormItem label="特殊任务1">
                                    {getFieldDecorator('task01', {
                                        rules: [{ required: false, message: '请输入特殊任务!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="特殊任务2">
                                    {getFieldDecorator('task02', {
                                        rules: [{ required: false, message: '请输入特殊任务!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="特殊任务3">
                                    {getFieldDecorator('task03', {
                                        rules: [{ required: false, message: '请输入特殊任务!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem> */}
                                <FormItem label="详细描述">
                                    {getFieldDecorator('content', {
                                        rules: [{ required: false, 
                                            validator: (_, value, callback) => {
                                            if (value.isEmpty()) {
                                                callback('请输入正文内容')
                                            } else {
                                                callback()
                                            }
                                            }}],
                                    })(
                                        <BraftEditor placeholder="请输入正文内容"/>
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
                componentDidMount () {

                    // 异步设置编辑器内容
                    setTimeout(() => {
                      this.props.form.setFieldsValue({
                        content: BraftEditor.createEditorState(thisTemp.state.recordAction.content)
                      })
                    }, 200)
                
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
                            console.log(info.file.response)
                            thisTemp.url=info.file.response.data.url
                            message.success(`${info.file.name} 上传成功`);
                          } else if (info.file.status === 'error') {
                            message.error(`${info.file.name} 上传失败.`);
                          }
                        },
                      };
                    return (
                        <Modal
                        width={900}
                            zIndex={9999}
                            visible={visible}
                            title="修改"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="任务名称">
                                    {getFieldDecorator('name', {
                                        initialValue:  thisTemp.state.recordAction.name ,
                                        rules: [{ required: true, message: '请输入修改食任务名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="第几天">
                                    {getFieldDecorator('day', {
                                        initialValue:  thisTemp.state.recordAction.day ,
                                        rules: [{ required: true, message: '请输入第几天!' }],
                                    })(
                                        <InputNumber min={1} max={70}  />
                                    )}
                                </FormItem>
                                <FormItem label="强度指数">
                                    {getFieldDecorator('heat', {
                                        rules: [{ required: false, message: '请输入强度指数!' }],
                                    })(
                                        <InputNumber min={1} max={10} defaultValue={5} />
                                    )}
                                </FormItem>
                                {/* <FormItem label="食谱图片">
                                    {getFieldDecorator('file', {
                                        rules: [{ required: false, message: '请选择食谱图片!' }],
                                    })(
                                        <Upload {...props}>
                                            <Button>
                                            <Icon type="upload" /> 上传图片
                                            </Button>
                                        </Upload>
                                    )}
                                </FormItem> */}
                                {/* <FormItem label="特殊任务1">
                                    {getFieldDecorator('task01', {
                                        initialValue:  thisTemp.state.recordAction.task01 ,
                                        rules: [{ required: false, message: '请输入特殊任务!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="特殊任务2">
                                    {getFieldDecorator('task02', {
                                        initialValue:  thisTemp.state.recordAction.task02 ,
                                        rules: [{ required: false, message: '请输入特殊任务!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="特殊任务3">
                                    {getFieldDecorator('task03', {
                                        initialValue:  thisTemp.state.recordAction.task03 ,
                                        rules: [{ required: false, message: '请输入特殊任务!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem> */}
                                <FormItem label="详细描述">
                                    {getFieldDecorator('content', {
                                        rules: [{ required: false, 
                                            validator: (_, value, callback) => {
                                            if (value.isEmpty()) {
                                                callback('请输入正文内容')
                                            } else {
                                                callback()
                                            }
                                            }}],
                                    })(
                                        <BraftEditor placeholder="请输入正文内容"/>
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
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} key={"tablesTkTask"} pagination={false} columns={columns} dataSource={this.props.tablesTkTask.tableDataTkTask} scroll={{x: 600, y: 360}} />
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesTkTask.tableCountTkTask} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
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
                    title="图片详情"
                    visible={this.state.visibleTask}
                    // onOk={this.handleOkVideo}
                    onCancel={this.handleCancelTask}
                    footer={null}
                    >
                    <Card
                        hoverable
                        style={{ width: 472 }}
                        cover={<img alt="食谱图片" src={thisTemp.state.record.url} />}
                    >
                        <Meta
                        title={thisTemp.state.record.name}
                        description={thisTemp.state.record.extra}
                        />
  </Card>
                    </Modal>
               
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        tablesTkTask: state.tablesTkTask,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataTkTask: (params) => {
            dispatch(getDataTkTask(params))
        },
        updateDataTkTask: (params) => {
            dispatch(updateDataTkTask(params))
        },
        deleteDataTkTask: (params) => {
            dispatch(deleteDataTkTask(params))
        },
        createDataTkTask: (params) => {
            dispatch(createDataTkTask(params))
        },
        getOtherTkTask: (params) => {
            dispatch(getOtherTkTask(params))
        },
        updatePasswordDataTkTask: (params) => {
            dispatch(updatePasswordDataTkTask(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesTkTask));

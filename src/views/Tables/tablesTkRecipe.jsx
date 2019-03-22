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
import {updatePasswordDataTkRecipe,getOtherTkRecipe,getDataTkRecipe,updateDataTkRecipe,deleteDataTkRecipe,createDataTkRecipe } from "actions/tablesTkRecipe";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select,Popover } from 'antd';
import { Upload, message, Icon } from 'antd';
import { Card } from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;
const { Meta } = Card;


class tablesTkRecipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleRecipe: false,
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
        this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    getTableData = (search,start,size) => {
        // const params = {
        //     search:search,
        //     pageNo:start,
        //     pageSize:size,
        // };
        this.props.getDataTkRecipe(this.params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            pageNo:'1',
            pageSize:'999',
        };
        this.props.getOtherTkRecipe(params);
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
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.id=this.state.recordAction._id
            this.props.updateDataTkRecipe(values);
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
            values.url=this.url
            this.props.createDataTkRecipe(values)
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
        this.props.deleteDataTkRecipe(params)
    }
    resetConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.updatePasswordDataTkRecipe(params)
    }
    handleCancelRecipe = (e) => {
        console.log(e);
        this.setState({
          visibleRecipe: false,
        });
      }
      showModalRecipe = (record) => {
        // console.log(record.url)
        this.setState({
          visibleRecipe: true,
          record:record
        });
      }
    
      handleOkRecipe = (e) => {
        console.log(e);
        this.setState({
          visibleRecipe: false,
        });
      }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '食谱名称',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            // fixed: 'left',
            render: text => <a >{text}</a>,
        }, {
            title: '热量',
            dataIndex: 'heat',
            key: 'heat',
            // align: 'center'
            width: '25%'
        },{
            title: '详情',
            dataIndex: 'extra',
            key: 'extra',
            // align: 'center',
            width: '25%',
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

                            <a onClick={() => this.showModalRecipe(record)}>图文详情</a>

                            <Divider type="vertical" />
                            <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )
            },
        }];
        let options = ''
        if(this.props.tablesTkRecipe.responseOtherTkRecipe.rows!==undefined){
             options = this.props.tablesTkRecipe.responseOtherTkRecipe.rows.map((item,i) => {
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
                            // console.log(info.file.response)
                            thisTemp.url=info.file.response.data.url
                            message.success(`${info.file.name} 上传成功`);
                          } else if (info.file.status === 'error') {
                            message.error(`${info.file.name} 上传失败.`);
                          }
                        },
                      };
                    return (
                        <Modal
                            visible={visible}
                            title="新增视频"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="食谱名称">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入新增食谱名称!' }],
                                    })(
                                        <Input placeholder="" />
                                    )}
                                </FormItem>
                                <FormItem label="热量">
                                    {getFieldDecorator('heat', {
                                        rules: [{ required: false, message: '请输入食谱热量!' }],
                                    })(
                                        <Input placeholder="" />
                                    )}
                                </FormItem>
                                <FormItem label="详情">
                                    {getFieldDecorator('extra', {
                                        rules: [{ required: false, message: '请输入新增用户描述!' }],
                                    })(
                                        <TextArea rows={4} />
                                    )}
                                </FormItem>
                                <FormItem label="上传图片">
                                    {getFieldDecorator('file', {
                                        rules: [{ required: false, message: '请输入新增用户描述!' }],
                                    })(
                                        <Upload {...props}>
                                            <Button>
                                            <Icon type="upload" /> 上传图片
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
                    return (
                        <Modal
                            visible={visible}
                            title="修改"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="食谱名称">
                                    {getFieldDecorator('name', {
                                        initialValue:  thisTemp.state.recordAction.name ,
                                        rules: [{ required: true, message: '请输入修改食谱名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="热量">
                                    {getFieldDecorator('heat', {
                                        initialValue:  thisTemp.state.recordAction.heat ,
                                        rules: [{ required: true, message: '请输入修改热量!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="详情">
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
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} key={"tablesTkRecipe"} pagination={false} columns={columns} dataSource={this.props.tablesTkRecipe.tableDataTkRecipe} scroll={{x: 600, y: 360}} />
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesTkRecipe.tableCountTkRecipe} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
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
                    visible={this.state.visibleRecipe}
                    // onOk={this.handleOkVideo}
                    onCancel={this.handleCancelRecipe}
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
        tablesTkRecipe: state.tablesTkRecipe,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataTkRecipe: (params) => {
            dispatch(getDataTkRecipe(params))
        },
        updateDataTkRecipe: (params) => {
            dispatch(updateDataTkRecipe(params))
        },
        deleteDataTkRecipe: (params) => {
            dispatch(deleteDataTkRecipe(params))
        },
        createDataTkRecipe: (params) => {
            dispatch(createDataTkRecipe(params))
        },
        getOtherTkRecipe: (params) => {
            dispatch(getOtherTkRecipe(params))
        },
        updatePasswordDataTkRecipe: (params) => {
            dispatch(updatePasswordDataTkRecipe(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesTkRecipe));

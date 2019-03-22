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
import {getOtherTkApp,getDataTkApp,updateDataTkApp,deleteDataTkApp,createDataTkApp } from "actions/tablesTkApp";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Popover } from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;
const { TextArea } = Input;

class tablesTkApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleModify: false,
            recordAction:{},
            recordSelect:{},
            defaultSelectValue:'',
            current:1,
        };
    }
    componentWillMount(){
        this.getTableData('',1,10);
        // this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    getTableData = (search,start,size) => {
        const params = {
            search:search,
            pageNo:start,
            pageSize:size,
        };
        this.props.getDataTkApp(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherTkApp(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record });
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
            this.props.updateDataTkApp(values);
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
            this.props.createDataTkApp(values)
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
    finishConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.deleteDataTkApp(params)
    }
    deleteConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.deleteDataTkApp(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: 'app名称',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            // fixed: 'left',
            render: text => <a >{text}</a>,
        }, {
            title: '版本号',
            dataIndex: 'version',
            key: 'version',
            width: '20%',
            // fixed: 'left',
            render: text => <a >{text}</a>,
        },{
            title: '时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            width: '20%',
            // fixed: 'left',
        }, {
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
        }, {
            title: '操作',
            key: 'action',
            width: '20%',
            // fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)} >修改</a> 
                    <Divider type="vertical" />
                    <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                        <a>删除</a>
                    </Popconfirm>
                </span>
            ),
        }];
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                        <Modal
                            visible={visible}
                            title="新增版本信息"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="app名称">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入新增app名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="版本号">
                                    {getFieldDecorator('version', {
                                        rules: [{ required: true, message: '请输入会员版本号!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="描述">
                                    {getFieldDecorator('extra', {
                                        rules: [{ required: false, message: '请输入描述!' }],
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
        const CollectionModifyForm = Form.create()(
            class extends React.Component {
                render() {
                    const { visible, onCancel, onCreate, form } = this.props;
                    const { getFieldDecorator } = form;
                    return (
                        <Modal
                            visible={visible}
                            title="修改版本信息"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="app名称">
                                    {getFieldDecorator('name', {
                                        initialValue:  thisTemp.state.recordAction.name ,
                                        rules: [{ required: true, message: '请输入修改app名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="版本号">
                                    {getFieldDecorator('version', {
                                        initialValue:  thisTemp.state.recordAction.version ,
                                        rules: [{ required: true, message: '请输入修改版本号!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="描述">
                                    {getFieldDecorator('extra', {
                                        initialValue:  thisTemp.state.recordAction.extra ,
                                        rules: [{ required: false, message: '请输入修改版本描述!' }],
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
                                        onSearch={value => this.getTableData(value,1,10)}
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
                                }} key={"tablesTkApp"} pagination={false} columns={columns} dataSource={this.props.tablesTkApp.tableDataTkApp} scroll={{x: 200, y: 360}} />
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesTkApp.tableCountTkApp} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
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
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        tablesTkApp: state.tablesTkApp,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataTkApp: (params) => {
            dispatch(getDataTkApp(params))
        },
        updateDataTkApp: (params) => {
            dispatch(updateDataTkApp(params))
        },
        deleteDataTkApp: (params) => {
            dispatch(deleteDataTkApp(params))
        },
        createDataTkApp: (params) => {
            dispatch(createDataTkApp(params))
        },
        getOtherTkApp: (params) => {
            dispatch(getOtherTkApp(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesTkApp));

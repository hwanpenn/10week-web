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
import {getOtherTkPush,getDataTkPush,updateDataTkPush,deleteDataTkPush,createDataTkPush } from "actions/tablesTkPush";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Popover } from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;
const { TextArea } = Input;

class tablesTkPush extends React.Component {
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
        this.props.getDataTkPush(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherTkPush(params);
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
            this.props.updateDataTkPush(values);
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
            this.props.createDataTkPush(values)
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
    pushConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.deleteDataTkPush(params)
    }
    deleteConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.deleteDataTkPush(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '推送名称',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            // fixed: 'left',
            render: text => <a >{text}</a>,
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            width: '15%',
            // fixed: 'left',
            render: text =>  {return text!=='1'?<a>未推送</a>:<a>已推送</a>},
        },  {
            title: '推送时间',
            dataIndex: 'pushTime',
            key: 'pushTime',
            width: '15%',
            // fixed: 'left',
            render: text =>  {return text!==''?<a>空</a>:<a>{text}</a>},
        },  {
            title: '链接',
            dataIndex: 'pushUrl',
            key: 'pushUrl',
            width: '15%',
            // fixed: 'left',
            render: text => <a >{text}</a>,
        }, {
            title: '内容',
            dataIndex: 'pushMsg',
            key: 'pushMsg',
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
        }, {
            title: '操作',
            key: 'action',
            width: '15%',
            // fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)} >修改</a>
                    <Divider type="vertical" />
                    
                    <Popconfirm cancelText="取消" okText="确定" title="确定推送?" onConfirm={() => this.pushConfirm(record)}>
                    {record.status!=='1'?<a>推送</a>:<a>再次推送</a>}
                </Popconfirm>
                
                    
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
                            title="新增推送"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="推送名称">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入新增推送名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="链接">
                                    {getFieldDecorator('pushUrl', {
                                        rules: [{ required: true, message: '请输入推送链接!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="推送内容">
                                    {getFieldDecorator('pushMsg', {
                                        rules: [{ required: false, message: '请输入推送内容!' }],
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
                            title="修改推送"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="推送名称">
                                    {getFieldDecorator('name', {
                                        initialValue:  thisTemp.state.recordAction.name ,
                                        rules: [{ required: true, message: '请输入修改推送名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="推送链接">
                                    {getFieldDecorator('pushUrl', {
                                        initialValue:  thisTemp.state.recordAction.pushUrl ,
                                        rules: [{ required: true, message: '请输入修改推送链接!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="推送内容">
                                    {getFieldDecorator('pushMsg', {
                                        initialValue:  thisTemp.state.recordAction.pushMsg ,
                                        rules: [{ required: false, message: '请输入修改推送内容!' }],
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
                                }} key={"tablesTkPush"} pagination={false} columns={columns} dataSource={this.props.tablesTkPush.tableDataTkPush} scroll={{x: 200, y: 360}} />
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesTkPush.tableCountTkPush} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
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
        tablesTkPush: state.tablesTkPush,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataTkPush: (params) => {
            dispatch(getDataTkPush(params))
        },
        updateDataTkPush: (params) => {
            dispatch(updateDataTkPush(params))
        },
        deleteDataTkPush: (params) => {
            dispatch(deleteDataTkPush(params))
        },
        createDataTkPush: (params) => {
            dispatch(createDataTkPush(params))
        },
        getOtherTkPush: (params) => {
            dispatch(getOtherTkPush(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesTkPush));

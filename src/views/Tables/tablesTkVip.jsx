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
import {getOtherTkVip,getDataTkVip,updateDataTkVip,deleteDataTkVip,createDataTkVip } from "actions/tablesTkVip";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Popover } from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;
const { TextArea } = Input;

class tablesTkVip extends React.Component {
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
        this.props.getDataTkVip(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherTkVip(params);
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
            this.props.updateDataTkVip(values);
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
            this.props.createDataTkVip(values)
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
        this.props.deleteDataTkVip(params)
    }
    deleteConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.deleteDataTkVip(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '会员名称',
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
            render: text =>  {return text!=='1'?<a>激活</a>:<a>激活</a>},
        },  {
            title: '等级',
            dataIndex: 'vipGrade',
            key: 'vipGrade',
            width: '15%',
            // fixed: 'left',
            render: text =>  {return '普通会员'},
        },  {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
            width: '15%',
            // fixed: 'left',
            render: text => <a >{text}</a>,
        }, {
            title: '描述',
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
        }, {
            title: '操作',
            key: 'action',
            width: '15%',
            // fixed: 'right',
            render: (text, record) => (
                <span>
                    <a onClick={() => this.showModifyModal(record)} >修改</a>
                    {/* <Divider type="vertical" /> */}
{/*                     
                    <Popconfirm cancelText="取消" okText="确定" title="确定会员种类?" onConfirm={() => this.finishConfirm(record)}>
                    <a>结束活动</a> { record.status!=='1'?<a>已结束</a>:<a>活动中</a>}
                    </Popconfirm> */}
                
                    
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
                            title="新增会员种类"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="会员名称">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入新增会员名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="价格">
                                    {getFieldDecorator('price', {
                                        rules: [{ required: true, message: '请输入会员价格!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="会员描述">
                                    {getFieldDecorator('extra', {
                                        rules: [{ required: false, message: '请输入会员描述!' }],
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
                            title="修改会员"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="会员名称">
                                    {getFieldDecorator('name', {
                                        initialValue:  thisTemp.state.recordAction.name ,
                                        rules: [{ required: true, message: '请输入修改会员名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="会员价格">
                                    {getFieldDecorator('price', {
                                        initialValue:  thisTemp.state.recordAction.price ,
                                        rules: [{ required: true, message: '请输入修改会员价格!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="会员描述">
                                    {getFieldDecorator('extra', {
                                        initialValue:  thisTemp.state.recordAction.extra ,
                                        rules: [{ required: false, message: '请输入修改会员种类描述!' }],
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
                                }} key={"tablesTkVip"} pagination={false} columns={columns} dataSource={this.props.tablesTkVip.tableDataTkVip} scroll={{x: 200, y: 360}} />
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesTkVip.tableCountTkVip} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
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
        tablesTkVip: state.tablesTkVip,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataTkVip: (params) => {
            dispatch(getDataTkVip(params))
        },
        updateDataTkVip: (params) => {
            dispatch(updateDataTkVip(params))
        },
        deleteDataTkVip: (params) => {
            dispatch(deleteDataTkVip(params))
        },
        createDataTkVip: (params) => {
            dispatch(createDataTkVip(params))
        },
        getOtherTkVip: (params) => {
            dispatch(getOtherTkVip(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesTkVip));

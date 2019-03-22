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
import {updatePasswordDataTkUser,getOtherTkUser,getDataTkUser,updateDataTkUser,deleteDataTkUser,createDataTkUser } from "actions/tablesTkUser";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select ,Popover} from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const { TextArea } = Input;


class tablesTkUser extends React.Component {
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
    params = {
        search:'',
        pageNo:1,
        pageSize:10,
        club:''
    };
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
        this.props.getDataTkUser(this.params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            pageNo:'1',
            pageSize:'999',
        };
        this.props.getOtherTkUser(params);
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
            this.params.club=''
        }else{
            this.params.club=value
        }
        
        this.getTableData();
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record,_id:record.club._id });
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
            this.props.updateDataTkUser(values);
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
            values.role = 'user'
            this.props.createDataTkUser(values)
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
        this.props.deleteDataTkUser(params)
    }
    resetConfirm = (record) => {
        const params = {
            id:record._id,
        }
        this.props.updatePasswordDataTkUser(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '用户名',
            dataIndex: 'realName',
            key: 'realName',
            width: '20%',
            // fixed: 'left',
            render: text => <a >{text}</a>,
        }, {
            title: '手机号',
            dataIndex: 'mobile',
            key: 'mobile',
            // align: 'center'
            width: '20%'
        }, {
            title: '所属俱乐部',
            dataIndex: 'club',
            key: 'club',
            // align: 'center'
            width: '20%',
            render: text => {return text===null?'空':text.name},
        }, {
            title: '描述',
            dataIndex: 'extra',
            key: 'extra',
            // align: 'center'
            width: '20%',
            // render: text => {return text.name},
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
                            <Popconfirm cancelText="取消" okText="确定" title="确定重置?" onConfirm={() => this.resetConfirm(record)}>
                                <a>重置密码</a>
                            </Popconfirm>
                            <Divider type="vertical" />
                            <Popconfirm cancelText="取消" okText="确定" title="确定删除?" onConfirm={() => this.deleteConfirm(record)}>
                                <a>删除</a>
                            </Popconfirm>
                        </span>
                    )
            },
        }];
        let options = ''
        if(this.props.tablesTkUser.responseOtherTkUser.rows!==undefined){
             options = this.props.tablesTkUser.responseOtherTkUser.rows.map((item,i) => {
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
                    return (
                        <Modal
                            visible={visible}
                            title="新增管理员"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="用户名">
                                    {getFieldDecorator('realName', {
                                        rules: [{ required: true, message: '请输入新增用户名!' }],
                                    })(
                                        <Input placeholder="请使用数字和字符" />
                                    )}
                                </FormItem>
                                <FormItem label="手机号">
                                    {getFieldDecorator('mobile')(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="密码">
                                    {getFieldDecorator('password')(<Input type="password" />)}
                                </FormItem>
                                <FormItem label="所属俱乐部">
                                    {getFieldDecorator('club', {
                                        rules: [{ required: true, message: '请输入修改所属俱乐部!' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="请选择所属俱乐部"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {options}
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem label="描述">
                                    {getFieldDecorator('extra', {
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
                            title="修改管理员"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="用户名">
                                    {getFieldDecorator('realName', {
                                        initialValue:  thisTemp.state.recordAction.realName ,
                                        rules: [{ required: true, message: '请输入修改用户名!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="手机号">
                                    {getFieldDecorator('mobile', {
                                        initialValue:  thisTemp.state.recordAction.mobile ,
                                        rules: [{ required: true, message: '请输入修改用户别名!' }],
                                    })(<Input type="textarea" />)}
                                </FormItem>
                                <FormItem label="所属俱乐部">
                                    {getFieldDecorator('club', {
                                        initialValue:  thisTemp.state._id ,
                                        rules: [{ required: true, message: '请输入修改所属俱乐部!' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="请选择所属俱乐部"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            {options}
                                        </Select>
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
                                        <Select
                                            style={{    width: '32%',paddingRight: 10}}
                                            showSearch
                                            placeholder="所有区域"
                                            optionFilterProp="children"
                                            onChange={this.handleSelect}
                                            // onFocus={this.handleFocus}
                                            // onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                        >
                                            <Option value={'all'}>{'所有俱乐部'}</Option>
                                            {options}
                                        </Select>
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
                                }} key={"tablesTkUser"} pagination={false} columns={columns} dataSource={this.props.tablesTkUser.tableDataTkUser} scroll={{x: 600, y: 360}} />
                            <Pagination defaultCurrent={1} defaultPageSize={10} total={this.props.tablesTkUser.tableCountTkUser} style={{textAlign:'right',marginTop:25}}  onChange={(page, pageSize)=>this.handlePageChange(page)}/>
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesTkUser.tableCountTkUser} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
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
        tablesTkUser: state.tablesTkUser,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataTkUser: (params) => {
            dispatch(getDataTkUser(params))
        },
        updateDataTkUser: (params) => {
            dispatch(updateDataTkUser(params))
        },
        deleteDataTkUser: (params) => {
            dispatch(deleteDataTkUser(params))
        },
        createDataTkUser: (params) => {
            dispatch(createDataTkUser(params))
        },
        getOtherTkUser: (params) => {
            dispatch(getOtherTkUser(params))
        },
        updatePasswordDataTkUser: (params) => {
            dispatch(updatePasswordDataTkUser(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesTkUser));

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
import {getOtherTkClub,getDataTkClub,updateDataTkClub,deleteDataTkClub,createDataTkClub } from "actions/tablesTkClub";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm,Select,Radio } from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class tablesTkClub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleModify: false,
            recordAction:{},
            recordSelect:{},
            defaulthandleSelect:'',
            handleSelect:'all',
            search:'',
            pageNo:1,
            pageSize:10,
            area:'',
            current:1,
        };
    }
    params = {
        search:'',
        pageNo:1,
        pageSize:10,
        area:''
    };
    componentWillMount(){
        this.getTableData('',1,10);
        this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    getTableData = (search,start,size,select) => {
        this.props.getDataTkClub(this.params);
    }
    handleSearch = (value) => {
        this.params.search=value
        // this.getTableData()
        this.props.getDataTkClub(this.params);
    }
    handlePageChange = (value) => {
        this.params.pageNo=value
        this.getTableData()
    }
    handleSelect = (value) => {
        if(value==='all'){
            this.params.area=''
        }else{
            this.params.area=value
        }
        
        this.getTableData();
    }
    getOtherData = (username,start,size) => {
        const params = {
            pageNo:'1',
            pageSize:'999',
        };
        this.props.getOtherTkClub(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showModifyModal = (record) => {
        // console.log(record.area._id)
        this.setState({ visibleModify: true,recordAction:record,_id:record.area._id });
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
            this.props.updateDataTkClub(values);
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
            this.props.createDataTkClub(values)
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
        this.props.deleteDataTkClub(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [
        //     {
        //     title: '俱乐部id',
        //     dataIndex: 'id',
        //     key: 'id',
        //     width: 320,
        //     fixed: 'left',
        //     render: text => <a >{text}</a>,
        // }, 
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            // align: 'center'
            width: '20%'
        }, 
        {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
            // align: 'center'
            width: '20%',
            render: text => {return text==='1'?'营业中':'已停业'},
        }, 
        {
            title: '区域名称',
            dataIndex: 'area',
            key: 'area',
            // align: 'center'
            width: '22%',
            render: text => {return text.name},
        }, 
        {
            title: '创建时间',
            dataIndex: 'createdAt',
            key: 'createdAt',
            // align: 'center'
            width: '22%'
        }, 
        {
            title: '操作',
            key: 'action',
            width: '23%',
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
        let options = ''
        if(this.props.tablesTkClub.responseOtherTkClub.rows!==undefined){
             options = this.props.tablesTkClub.responseOtherTkClub.rows.map((item,i) => {
                return <Option value={item._id}>{item.name}</Option>
            })
        }
        const CollectionCreateForm = Form.create()(
            class extends React.Component {
                state = {
                    value: '1',
                  }
                onChange = (e) => {
                console.log('radio checked', e.target.value);
                this.setState({
                    value: e.target.value,
                });
                }
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
                            title="新增俱乐部"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="名称">
                                    {getFieldDecorator('name', {
                                        rules: [{ required: true, message: '请输入新增名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="区域名称">
                                    {getFieldDecorator('area', {
                                        rules: [{ required: true, message: '请选择区域!' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="请选择企业分类"
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
                                <FormItem label="运营状态">
                                    {getFieldDecorator('status', {
                                        rules: [{ required: true, message: '请选择运营状态!' }],
                                    })(
                                        <RadioGroup onChange={this.onChange} value={this.state.value}>
                                            <Radio value={'1'}>在运营</Radio>
                                            <Radio value={'0'}>已停业</Radio>
                                        </RadioGroup>
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
                            title="修改俱乐部"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="名称">
                                    {getFieldDecorator('name', {
                                        initialValue:  thisTemp.state.recordAction.name ,
                                        rules: [{ required: true, message: '请输入修改名称!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="区域名称">
                                    {getFieldDecorator('area', {
                                        initialValue:  thisTemp.state._id ,
                                        rules: [{ required: true, message: '请选择区域!' }],
                                    })(
                                        <Select
                                            showSearch
                                            placeholder="请选择企业分类"
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
                                <FormItem label="运营状态">
                                    {getFieldDecorator('status', {
                                         initialValue:  thisTemp.state.recordAction.status ,
                                        rules: [{ required: true, message: '请选择运营状态!' }],
                                    })(
                                        <RadioGroup>
                                            <Radio value={'1'}>在运营</Radio>
                                            <Radio value={'0'}>已停业</Radio>
                                        </RadioGroup>
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
                                            <Option value={'all'}>{'所有区域'}</Option>
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
                                }} key={"tablesTkClub"} pagination={false} columns={columns} dataSource={this.props.tablesTkClub.tableDataTkClub} scroll={{x: 600, y: 360}} />
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesTkClub.tableCountTkClub} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
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
        tablesTkClub: state.tablesTkClub,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataTkClub: (params) => {
            dispatch(getDataTkClub(params))
        },
        updateDataTkClub: (params) => {
            dispatch(updateDataTkClub(params))
        },
        deleteDataTkClub: (params) => {
            dispatch(deleteDataTkClub(params))
        },
        createDataTkClub: (params) => {
            dispatch(createDataTkClub(params))
        },
        getOtherTkClub: (params) => {
            dispatch(getOtherTkClub(params))
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesTkClub));

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
import {getOtherTkBaseData,getDataTkBaseData,updateDataTkBaseData,deleteDataTkBaseData,createDataTkBaseData } from "actions/tablesTkBaseData";
import {connect} from "react-redux";
import {Table, Divider,Button } from 'antd';
import {Input,Modal } from 'antd';
import {Form,Pagination,Popconfirm } from 'antd';
import { LocaleProvider } from 'antd';
import zh_CN from "antd/lib/locale-provider/zh_CN";

const FormItem = Form.Item;
const Search = Input.Search;

class tablesTkBaseData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: [],
            tableData: [],
            visible: false,
            visibleModify: false,
            visibleDetail: false,
            recordAction:{},
            recordDetail:{},
            recordSelect:{},
            defaultSelectValue:'',
            cuSkGroupId:'',
            urlObj:'null',
            current:1,
        };
    }
    userId = ''
    parseQueryString = (url)=> {
        var obj = {};
        var keyvalue = [];
        var key = "",
            value = "";
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
        for (var i in paraString) {
            keyvalue = paraString[i].split("=");
            key = keyvalue[0];
            value = keyvalue[1];
            obj[key] = value;
        }
        return obj;
    }
    componentWillMount(){
        // console.log(this.props.location)
        const obj = this.parseQueryString(this.props.location.search)
        // console.log(obj)
        if(obj.userId!==''&&obj.userId!==undefined){
            this.userId=obj.userId
            this.setState({ 
                userId:obj.userId,
                urlObj:obj,
                userName:obj.userName
             });
        }else{
            this.userId=window.sessionStorage.getItem('userId')
            this.setState({ 
                userId:window.sessionStorage.getItem('userId'),
                userName:window.sessionStorage.getItem('userName')
             });
        }
        // this.setState({ page:obj.page });
        // console.log('componentWillMount')
        this.getTableData('',1,10,this.userId);
        // this.getOtherData('',1,10);
    }
    componentDidMount(){
    }
    // componentWillUpdate(){
    //     alert('刷新')
    // }
    getTableData = (articleTitle,start,size,userId) => {
        const params = {
            // articleTitle:articleTitle,
            pageNo:start,
            pageSize:size,
            user:userId
        };
        console.log('getDataTkBaseData')
        this.props.getDataTkBaseData(params);
    }
    getOtherData = (username,start,size) => {
        const params = {
            search:username,
            isPaging:true,
            currentPage:start,
            pageSize:size,
        };
        this.props.getOtherTkBaseData(params);
    }
    onRowSelect = (record) => {
        this.setState({ recordSelect:record });
    }
    showDetailModal = (record) => {
        this.setState({ visibleDetail: true,recordDetail:record });
    }
    showModifyModal = (record) => {
        this.setState({ visibleModify: true,recordAction:record });
    }
    showModalCreate = () => {
        this.setState({ visible: true });
    }
    goBack = () => {
        const page = this.state.page
        this.props.history.push("/cms/home/tables/TkUser");
        // this.setState({ visible: true });
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
            // console.log(values)
            values.cuSkGroupId=this.state.recordAction.cuSkGroupId
            this.props.updateDataTkBaseData(values,this);
            // form.resetFields();
            // this.setState({ visibleModify: false });
        });
    }
    handleCreate = () => {
        const form = this.formRefDataCreate.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.user = this.userId
            values.name = new Date();
            this.props.createDataTkBaseData(values)
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
            user:this.userId,
            id:record._id,
        }
        this.props.deleteDataTkBaseData(params)
    }
    activeConfirm = (record) => {
        const params = {
            status:record.status,
            cuSkGroupId:record.cuSkGroupId,
        }
        // this.props.activeDataTkBaseData(params)
    }
    render() {
        let thisTemp = this
        const { classes } = this.props;
        const columns = [{
            title: '用户名',
            dataIndex: 'user',
            key: 'user',
            fixed: 'left',
            width: '100px',
            render: text => <a >{text===undefined?'':text.realName}</a>,
        }, {
            title: '日期',
            dataIndex: 'createdAt',
            key: 'createdAt',
            // align: 'center'
            width: '200px',
        }, {
            title: '打卡',
            dataIndex: 'mark',
            key: 'mark',
            // align: 'center'
            width: '100px',
            render: text => <a >{text!=='1'?'未打卡':'已打卡'}</a>,
        }, {
            title: '胸围',
            dataIndex: 'bust',
            key: 'bust',
            // align: 'center'
            width: '100px',
        },  {
            title: '腰围',
            dataIndex: 'waist',
            key: 'waist',
            // align: 'center'
            width: '100px',
        },  {
            title: '臀围',
            dataIndex: 'hip',
            key: 'hip',
            // align: 'center'
            width: '100px',
        },  {
            title: '大腿围',
            dataIndex: 'thigh',
            key: 'thigh',
            // align: 'center'
            width: '100px',
        },  {
            title: '上臀围',
            dataIndex: 'upperHip',
            key: 'upperHip',
            // align: 'center'
            width: '100px',
        },  {
            title: '力量测试',
            dataIndex: 'strength',
            key: 'strength',
            // align: 'center'
            width: '100px',
        },  {
            title: '仰卧起坐',
            dataIndex: 'sitUp',
            key: 'sitUp',
            // align: 'center'
            width: '100px',
        },  {
            title: '平板支撑',
            dataIndex: 'flatSupport',
            key: 'flatSupport',
            // align: 'center'
            width: '100px',
        },  {
            title: '俯卧撑',
            dataIndex: 'pushUp',
            key: 'pushUp',
            // align: 'center'
            width: '100px',
        },  {
            title: '深蹲',
            dataIndex: 'squat',
            key: 'squat',
            // align: 'center'
            width: '100px',
        },  {
            title: '波比跳',
            dataIndex: 'bobbyJump',
            key: 'bobbyJump',
            // align: 'center'
            width: '100px',
        },  {
            title: '体脂率',
            dataIndex: 'bodyFatRate',
            key: 'bodyFatRate',
            // align: 'center'
            width: '100px',
        },  {
            title: '身体水分率',
            dataIndex: 'bodyMoistureRate',
            key: 'bodyMoistureRate',
            // align: 'center'
            width: '110px',
        },  {
            title: '肌肉量',
            dataIndex: 'muscleMass',
            key: 'muscleMass',
            // align: 'center'
            width: '100px',
        },  {
            title: '基础代谢率',
            dataIndex: 'basalMetabolicRate',
            key: 'basalMetabolicRate',
            // align: 'center'
            width: '110px',
        },  {
            title: '骨重量',
            dataIndex: 'boneWeight',
            key: 'boneWeight',
            // align: 'center'
            width: '100px',
        },  {
            title: '内脏脂肪等级',
            dataIndex: 'visceralFatGrade',
            key: 'visceralFatGrade',
            // align: 'center'
            width: '120px',
        },  {
            title: '操作',
            key: 'action',
            width: '100px',
            fixed: 'right',
            render: (text, record) => (
                <span>
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
                            title="新增数据"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="胸围">
                                    {getFieldDecorator('bust', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="腰围">
                                    {getFieldDecorator('waist', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="臀围">
                                    {getFieldDecorator('hip', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="大腿围">
                                    {getFieldDecorator('thigh', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="上臀围">
                                    {getFieldDecorator('upperHip', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>

                                <FormItem label="力量测试">
                                    {getFieldDecorator('strength', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="仰卧起坐">
                                    {getFieldDecorator('sitUp', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="平板支撑">
                                    {getFieldDecorator('flatSupport', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="俯卧撑">
                                    {getFieldDecorator('pushUp', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="深蹲">
                                    {getFieldDecorator('squat', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="波比跳">
                                    {getFieldDecorator('bobbyJump', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>

                                <FormItem label="体脂率">
                                    {getFieldDecorator('bodyFatRate', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="身体水分率">
                                    {getFieldDecorator('bodyMoistureRate', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="肌肉量">
                                    {getFieldDecorator('muscleMass', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="基础代谢率">
                                    {getFieldDecorator('basalMetabolicRate', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="骨重量">
                                    {getFieldDecorator('boneWeight', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="内脏脂肪等级">
                                    {getFieldDecorator('visceralFatGrade', {
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
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
                            title="修改数据"
                            cancelText="取消" okText="确定"
                            onCancel={onCancel}
                            onOk={onCreate}
                        >
                            <Form layout="vertical">
                                <FormItem label="胸围">
                                    {getFieldDecorator('bust', {
                                        initialValue:  thisTemp.state.recordAction.bust ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="腰围">
                                    {getFieldDecorator('waist', {
                                        initialValue:  thisTemp.state.recordAction.waist ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="臀围">
                                    {getFieldDecorator('hip', {
                                        initialValue:  thisTemp.state.recordAction.hip ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="大腿围">
                                    {getFieldDecorator('thigh', {
                                        initialValue:  thisTemp.state.recordAction.thigh ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="上臀围">
                                    {getFieldDecorator('upperHip', {
                                        initialValue:  thisTemp.state.recordAction.upperHip ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>

                                <FormItem label="力量测试">
                                    {getFieldDecorator('strength', {
                                        initialValue:  thisTemp.state.recordAction.strength ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="仰卧起坐">
                                    {getFieldDecorator('sitUp', {
                                        initialValue:  thisTemp.state.recordAction.sitUp ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="平板支撑">
                                    {getFieldDecorator('flatSupport', {
                                        initialValue:  thisTemp.state.recordAction.flatSupport ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="俯卧撑">
                                    {getFieldDecorator('pushUp', {
                                        initialValue:  thisTemp.state.recordAction.pushUp ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="深蹲">
                                    {getFieldDecorator('squat', {
                                        initialValue:  thisTemp.state.recordAction.squat ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="波比跳">
                                    {getFieldDecorator('bobbyJump', {
                                        initialValue:  thisTemp.state.recordAction.bobbyJump ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>

                                <FormItem label="体脂率">
                                    {getFieldDecorator('bodyFatRate', {
                                        initialValue:  thisTemp.state.recordAction.bodyFatRate ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="身体水分率">
                                    {getFieldDecorator('bodyMoistureRate', {
                                        initialValue:  thisTemp.state.recordAction.bodyMoistureRate ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="肌肉量">
                                    {getFieldDecorator('muscleMass', {
                                        initialValue:  thisTemp.state.recordAction.muscleMass ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="基础代谢率">
                                    {getFieldDecorator('basalMetabolicRate', {
                                        initialValue:  thisTemp.state.recordAction.basalMetabolicRate ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="骨重量">
                                    {getFieldDecorator('boneWeight', {
                                        initialValue:  thisTemp.state.recordAction.boneWeight ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
                                    )}
                                </FormItem>
                                <FormItem label="内脏脂肪等级">
                                    {getFieldDecorator('visceralFatGrade', {
                                        initialValue:  thisTemp.state.recordAction.visceralFatGrade ,
                                        rules: [{ required: false, message: '请输入数据!' }],
                                    })(
                                        <Input />
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
                                    {/* <Search
                                        placeholder="名称搜索"
                                        onSearch={value => this.getTableData(value,1,10)}
                                        style={{ width: 200,borderStyle:'solid',
                                            borderWidth:0,paddingRight:10 }}
                                    /> */}
                                    <Button onClick={this.showModalCreate} style={{ height: 30,marginRight:10 }} size={'small'}>增加</Button>
                                    {this.state.urlObj==='null'?'':<Button onClick={this.goBack} style={{ height: 30,marginRight:10 }} size={'small'}>返回</Button>}
                                </Grid>
                            </Grid>
                        </CardHeader>
                        <CardBody>
                            <Table onRow={(record) => {
                                    return {
                                    onClick: () => {this.onRowSelect(record)},       
                                    // onMouseEnter: () => {},  
                                    };
                                }} key={"tablesTkBaseData"} pagination={false} columns={columns} dataSource={this.props.tablesTkBaseData.tableDataTkBaseData} scroll={{x:2240,  y: 360}} />
                            <LocaleProvider locale={zh_CN}>
                                <Pagination  current={this.state.current} showTotal={total => `总共 ${total} 条`} showSizeChanger showQuickJumper defaultPageSize={10} total={this.props.tablesTkBaseData.tableCountTkBaseData} style={{textAlign:'right',marginTop:25}}  onShowSizeChange={(current, pageSize)=>this.getTableData('',current, pageSize)} onChange={(page, pageSize)=>this.getTableData('',page,pageSize)}/>
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
                {/* <CollectionModifyForm
                    wrappedComponentRef={this.saveFormRefModify}
                    visible={this.state.visibleModify}
                    onCancel={this.handleCancelModify}
                    onCreate={this.handleModify}
                /> */}
            </GridContainer>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        tablesTkBaseData: state.tablesTkBaseData,
    }
}
const mapDispatchToProps = (dispatch) => {
    return{
        getDataTkBaseData: (params) => {
            dispatch(getDataTkBaseData(params))
        },
        updateDataTkBaseData: (params,obj) => {
            dispatch(updateDataTkBaseData(params,obj))
        },
        deleteDataTkBaseData: (params) => {
            dispatch(deleteDataTkBaseData(params))
        },
        createDataTkBaseData: (params) => {
            dispatch(createDataTkBaseData(params))
        },
        getOtherTkBaseData: (params) => {
            dispatch(getOtherTkBaseData(params))
        },
        // activeDataTkBaseData: (params) => {
        //     dispatch(activeDataTkBaseData(params))
        // }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(extendedTablesStyle)(tablesTkBaseData));

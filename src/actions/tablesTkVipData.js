import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkVipData = "GET_REQUEST_TkVipData";
export const GET_SUCCESS_TkVipData = "GET_SUCCESS_TkVipData";
export const GET_FAIL_TkVipData = "GET_FAIL_TkVipData";
export const CREATE_REQUEST_TkVipData = "CREATE_REQUEST_TkVipData";
export const CREATE_SUCCESS_TkVipData = "CREATE_SUCCESS_TkVipData";
export const CREATE_FAIL_TkVipData = "CREATE_FAIL_TkVipData";
export const UPDATE_REQUEST_TkVipData = "UPDATE_REQUEST_TkVipData";
export const UPDATE_SUCCESS_TkVipData = "UPDATE_SUCCESS_TkVipData";
export const UPDATE_FAIL_TkVipData = "UPDATE_FAIL_TkVipData";
export const DELETE_REQUEST_TkVipData = "DELETE_REQUEST_TkVipData";
export const DELETE_SUCCESS_TkVipData = "DELETE_SUCCESS_TkVipData";
export const DELETE_FAIL_TkVipData = "DELETE_FAIL_TkVipData";

export const GET_REQUEST_TkVipData_OTHER = "GET_REQUEST_TkVipData_OTHER";
export const GET_SUCCESS_TkVipData_OTHER = "GET_SUCCESS_TkVipData_OTHER";
export const GET_FAIL_TkVipData_OTHER = "GET_FAIL_TkVipData_OTHER";

export function getOtherTkVipData(params) {
    return {
        types: [GET_REQUEST_TkVipData_OTHER, GET_SUCCESS_TkVipData_OTHER, GET_FAIL_TkVipData_OTHER],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkVipData(params) {
    // console.log('getDataTkVipData')
    return {
        types: [GET_REQUEST_TkVipData, GET_SUCCESS_TkVipData, GET_FAIL_TkVipData],
        promise: client => client.get('/api/vipData',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkVipData(params) {
    const paramsTemp = params
    return {
        types: [CREATE_REQUEST_TkVipData, CREATE_SUCCESS_TkVipData, CREATE_FAIL_TkVipData],
        promise: client => client.post('/api/vipData',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                    user: paramsTemp.user,
                };
                dispatch(getDataTkVipData(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataTkVipData(params) {
    const paramsTemp = params
    return {
        types: [UPDATE_REQUEST_TkVipData, UPDATE_SUCCESS_TkVipData, UPDATE_FAIL_TkVipData],
        promise: client => client.put('/api/vipData/'+params._id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                    userId: paramsTemp.userId,
                };
                dispatch(getDataTkVipData(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataTkVipData(params) {
    // console.log('params')
    // console.log(params)
    const paramsTemp = params
    return {
        types: [DELETE_REQUEST_TkVipData, DELETE_SUCCESS_TkVipData, DELETE_FAIL_TkVipData],
        promise: client => client.delete('/api/vipData/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                    user: paramsTemp.user,
                };
                dispatch(getDataTkVipData(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

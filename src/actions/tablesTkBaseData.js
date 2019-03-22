import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkBaseData = "GET_REQUEST_TkBaseData";
export const GET_SUCCESS_TkBaseData = "GET_SUCCESS_TkBaseData";
export const GET_FAIL_TkBaseData = "GET_FAIL_TkBaseData";
export const CREATE_REQUEST_TkBaseData = "CREATE_REQUEST_TkBaseData";
export const CREATE_SUCCESS_TkBaseData = "CREATE_SUCCESS_TkBaseData";
export const CREATE_FAIL_TkBaseData = "CREATE_FAIL_TkBaseData";
export const UPDATE_REQUEST_TkBaseData = "UPDATE_REQUEST_TkBaseData";
export const UPDATE_SUCCESS_TkBaseData = "UPDATE_SUCCESS_TkBaseData";
export const UPDATE_FAIL_TkBaseData = "UPDATE_FAIL_TkBaseData";
export const DELETE_REQUEST_TkBaseData = "DELETE_REQUEST_TkBaseData";
export const DELETE_SUCCESS_TkBaseData = "DELETE_SUCCESS_TkBaseData";
export const DELETE_FAIL_TkBaseData = "DELETE_FAIL_TkBaseData";

export const GET_REQUEST_TkBaseData_OTHER = "GET_REQUEST_TkBaseData_OTHER";
export const GET_SUCCESS_TkBaseData_OTHER = "GET_SUCCESS_TkBaseData_OTHER";
export const GET_FAIL_TkBaseData_OTHER = "GET_FAIL_TkBaseData_OTHER";

export function getOtherTkBaseData(params) {
    return {
        types: [GET_REQUEST_TkBaseData_OTHER, GET_SUCCESS_TkBaseData_OTHER, GET_FAIL_TkBaseData_OTHER],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkBaseData(params) {
    // console.log('getDataTkBaseData')
    return {
        types: [GET_REQUEST_TkBaseData, GET_SUCCESS_TkBaseData, GET_FAIL_TkBaseData],
        promise: client => client.get('/api/baseData',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkBaseData(params) {
    const paramsTemp = params
    return {
        types: [CREATE_REQUEST_TkBaseData, CREATE_SUCCESS_TkBaseData, CREATE_FAIL_TkBaseData],
        promise: client => client.post('/api/baseData',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                    user: paramsTemp.user,
                };
                dispatch(getDataTkBaseData(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataTkBaseData(params) {
    const paramsTemp = params
    return {
        types: [UPDATE_REQUEST_TkBaseData, UPDATE_SUCCESS_TkBaseData, UPDATE_FAIL_TkBaseData],
        promise: client => client.put('/api/baseData/'+params._id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                    userId: paramsTemp.userId,
                };
                dispatch(getDataTkBaseData(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataTkBaseData(params) {
    // console.log('params')
    // console.log(params)
    const paramsTemp = params
    return {
        types: [DELETE_REQUEST_TkBaseData, DELETE_SUCCESS_TkBaseData, DELETE_FAIL_TkBaseData],
        promise: client => client.delete('/api/baseData/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                    user: paramsTemp.user,
                };
                dispatch(getDataTkBaseData(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

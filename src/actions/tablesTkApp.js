import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkApp = "GET_REQUEST_TkApp";
export const GET_SUCCESS_TkApp = "GET_SUCCESS_TkApp";
export const GET_FAIL_TkApp = "GET_FAIL_TkApp";
export const CREATE_REQUEST_TkApp = "CREATE_REQUEST_TkApp";
export const CREATE_SUCCESS_TkApp = "CREATE_SUCCESS_TkApp";
export const CREATE_FAIL_TkApp = "CREATE_FAIL_TkApp";
export const UPDATE_REQUEST_TkApp = "UPDATE_REQUEST_TkApp";
export const UPDATE_SUCCESS_TkApp = "UPDATE_SUCCESS_TkApp";
export const UPDATE_FAIL_TkApp = "UPDATE_FAIL_TkApp";
export const DELETE_REQUEST_TkApp = "DELETE_REQUEST_TkApp";
export const DELETE_SUCCESS_TkApp = "DELETE_SUCCESS_TkApp";
export const DELETE_FAIL_TkApp = "DELETE_FAIL_TkApp";

export const GET_REQUEST_TkApp_OTHER = "GET_REQUEST_TkApp_OTHER";
export const GET_SUCCESS_TkApp_OTHER = "GET_SUCCESS_TkApp_OTHER";
export const GET_FAIL_TkApp_OTHER = "GET_FAIL_TkApp_OTHER";

export function getOtherTkApp(params) {
    return {
        types: [GET_REQUEST_TkApp_OTHER, GET_SUCCESS_TkApp_OTHER, GET_FAIL_TkApp_OTHER],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkApp(params) {
    return {
        types: [GET_REQUEST_TkApp, GET_SUCCESS_TkApp, GET_FAIL_TkApp],
        promise: client => client.get('/api/appData',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkApp(params) {
    return {
        types: [CREATE_REQUEST_TkApp, CREATE_SUCCESS_TkApp, CREATE_FAIL_TkApp],
        promise: client => client.post('/api/appData',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkApp(params));
            }else {
                message.info(response.data.error);
            }
        },
    }
}
export function updateDataTkApp(params) {
    return {
        types: [UPDATE_REQUEST_TkApp, UPDATE_SUCCESS_TkApp, UPDATE_FAIL_TkApp],
        promise: client => client.put('/api/appData/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkApp(params));
            }else {
                // if(response.data.code===500){
                //      message.info('系统错误,操作失败');
                // }
                message.info(response.data.error);
            }
        },
    }
}
export function deleteDataTkApp(params) {
    return {
        types: [DELETE_REQUEST_TkApp, DELETE_SUCCESS_TkApp, DELETE_FAIL_TkApp],
        promise: client => client.delete('/api/appData/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkApp(params));
            }else {
                message.info(response.data.error);
            }
        },
    }
}

import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkPush = "GET_REQUEST_TkPush";
export const GET_SUCCESS_TkPush = "GET_SUCCESS_TkPush";
export const GET_FAIL_TkPush = "GET_FAIL_TkPush";
export const CREATE_REQUEST_TkPush = "CREATE_REQUEST_TkPush";
export const CREATE_SUCCESS_TkPush = "CREATE_SUCCESS_TkPush";
export const CREATE_FAIL_TkPush = "CREATE_FAIL_TkPush";
export const UPDATE_REQUEST_TkPush = "UPDATE_REQUEST_TkPush";
export const UPDATE_SUCCESS_TkPush = "UPDATE_SUCCESS_TkPush";
export const UPDATE_FAIL_TkPush = "UPDATE_FAIL_TkPush";
export const DELETE_REQUEST_TkPush = "DELETE_REQUEST_TkPush";
export const DELETE_SUCCESS_TkPush = "DELETE_SUCCESS_TkPush";
export const DELETE_FAIL_TkPush = "DELETE_FAIL_TkPush";

export const GET_REQUEST_TkPush_OTHER = "GET_REQUEST_TkPush_OTHER";
export const GET_SUCCESS_TkPush_OTHER = "GET_SUCCESS_TkPush_OTHER";
export const GET_FAIL_TkPush_OTHER = "GET_FAIL_TkPush_OTHER";

export function getOtherTkPush(params) {
    return {
        types: [GET_REQUEST_TkPush_OTHER, GET_SUCCESS_TkPush_OTHER, GET_FAIL_TkPush_OTHER],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkPush(params) {
    return {
        types: [GET_REQUEST_TkPush, GET_SUCCESS_TkPush, GET_FAIL_TkPush],
        promise: client => client.get('/api/pushMsg',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkPush(params) {
    return {
        types: [CREATE_REQUEST_TkPush, CREATE_SUCCESS_TkPush, CREATE_FAIL_TkPush],
        promise: client => client.post('/api/pushMsg',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkPush(params));
            }else {
                message.info(response.data.error);
            }
        },
    }
}
export function updateDataTkPush(params) {
    return {
        types: [UPDATE_REQUEST_TkPush, UPDATE_SUCCESS_TkPush, UPDATE_FAIL_TkPush],
        promise: client => client.put('/api/pushMsg/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkPush(params));
            }else {
                // if(response.data.code===500){
                //      message.info('系统错误,操作失败');
                // }
                message.info(response.data.error);
            }
        },
    }
}
export function deleteDataTkPush(params) {
    return {
        types: [DELETE_REQUEST_TkPush, DELETE_SUCCESS_TkPush, DELETE_FAIL_TkPush],
        promise: client => client.delete('/api/pushMsg/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkPush(params));
            }else {
                message.info(response.data.error);
            }
        },
    }
}

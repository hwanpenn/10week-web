import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkVip = "GET_REQUEST_TkVip";
export const GET_SUCCESS_TkVip = "GET_SUCCESS_TkVip";
export const GET_FAIL_TkVip = "GET_FAIL_TkVip";
export const CREATE_REQUEST_TkVip = "CREATE_REQUEST_TkVip";
export const CREATE_SUCCESS_TkVip = "CREATE_SUCCESS_TkVip";
export const CREATE_FAIL_TkVip = "CREATE_FAIL_TkVip";
export const UPDATE_REQUEST_TkVip = "UPDATE_REQUEST_TkVip";
export const UPDATE_SUCCESS_TkVip = "UPDATE_SUCCESS_TkVip";
export const UPDATE_FAIL_TkVip = "UPDATE_FAIL_TkVip";
export const DELETE_REQUEST_TkVip = "DELETE_REQUEST_TkVip";
export const DELETE_SUCCESS_TkVip = "DELETE_SUCCESS_TkVip";
export const DELETE_FAIL_TkVip = "DELETE_FAIL_TkVip";

export const GET_REQUEST_TkVip_OTHER = "GET_REQUEST_TkVip_OTHER";
export const GET_SUCCESS_TkVip_OTHER = "GET_SUCCESS_TkVip_OTHER";
export const GET_FAIL_TkVip_OTHER = "GET_FAIL_TkVip_OTHER";

export function getOtherTkVip(params) {
    return {
        types: [GET_REQUEST_TkVip_OTHER, GET_SUCCESS_TkVip_OTHER, GET_FAIL_TkVip_OTHER],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkVip(params) {
    return {
        types: [GET_REQUEST_TkVip, GET_SUCCESS_TkVip, GET_FAIL_TkVip],
        promise: client => client.get('/api/vip',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkVip(params) {
    return {
        types: [CREATE_REQUEST_TkVip, CREATE_SUCCESS_TkVip, CREATE_FAIL_TkVip],
        promise: client => client.post('/api/vip',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkVip(params));
            }else {
                message.info(response.data.error);
            }
        },
    }
}
export function updateDataTkVip(params) {
    return {
        types: [UPDATE_REQUEST_TkVip, UPDATE_SUCCESS_TkVip, UPDATE_FAIL_TkVip],
        promise: client => client.put('/api/vip/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkVip(params));
            }else {
                // if(response.data.code===500){
                //      message.info('系统错误,操作失败');
                // }
                message.info(response.data.error);
            }
        },
    }
}
export function deleteDataTkVip(params) {
    return {
        types: [DELETE_REQUEST_TkVip, DELETE_SUCCESS_TkVip, DELETE_FAIL_TkVip],
        promise: client => client.delete('/api/vip/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkVip(params));
            }else {
                message.info(response.data.error);
            }
        },
    }
}

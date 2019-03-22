import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkRole = "GET_REQUEST_TkRole";
export const GET_SUCCESS_TkRole = "GET_SUCCESS_TkRole";
export const GET_FAIL_TkRole = "GET_FAIL_TkRole";
export const CREATE_REQUEST_TkRole = "CREATE_REQUEST_TkRole";
export const CREATE_SUCCESS_TkRole = "CREATE_SUCCESS_TkRole";
export const CREATE_FAIL_TkRole = "CREATE_FAIL_TkRole";
export const UPDATE_REQUEST_TkRole = "UPDATE_REQUEST_TkRole";
export const UPDATE_SUCCESS_TkRole = "UPDATE_SUCCESS_TkRole";
export const UPDATE_FAIL_TkRole = "UPDATE_FAIL_TkRole";
export const DELETE_REQUEST_TkRole = "DELETE_REQUEST_TkRole";
export const DELETE_SUCCESS_TkRole = "DELETE_SUCCESS_TkRole";
export const DELETE_FAIL_TkRole = "DELETE_FAIL_TkRole";

export const GET_REQUEST_TkRole_OTHER = "GET_REQUEST_TkRole_OTHER";
export const GET_SUCCESS_TkRole_OTHER = "GET_SUCCESS_TkRole_OTHER";
export const GET_FAIL_TkRole_OTHER = "GET_FAIL_TkRole_OTHER";

export function getOtherTkRole(params) {
    return {
        types: [GET_REQUEST_TkRole_OTHER, GET_SUCCESS_TkRole_OTHER, GET_FAIL_TkRole_OTHER],
        promise: client => client.get('/api/area',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkRole(params) {
    return {
        types: [GET_REQUEST_TkRole, GET_SUCCESS_TkRole, GET_FAIL_TkRole],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkRole(params) {
    return {
        types: [CREATE_REQUEST_TkRole, CREATE_SUCCESS_TkRole, CREATE_FAIL_TkRole],
        promise: client => client.post('/api/club',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkRole(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataTkRole(params) {
    return {
        types: [UPDATE_REQUEST_TkRole, UPDATE_SUCCESS_TkRole, UPDATE_FAIL_TkRole],
        promise: client => client.put('/api/club/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkRole(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataTkRole(params) {
    return {
        types: [DELETE_REQUEST_TkRole, DELETE_SUCCESS_TkRole, DELETE_FAIL_TkRole],
        promise: client => client.delete('/api/club/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkRole(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

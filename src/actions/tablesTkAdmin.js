import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkAdmin = "GET_REQUEST_TkAdmin";
export const GET_SUCCESS_TkAdmin = "GET_SUCCESS_TkAdmin";
export const GET_FAIL_TkAdmin = "GET_FAIL_TkAdmin";
export const CREATE_REQUEST_TkAdmin = "CREATE_REQUEST_TkAdmin";
export const CREATE_SUCCESS_TkAdmin = "CREATE_SUCCESS_TkAdmin";
export const CREATE_FAIL_TkAdmin = "CREATE_FAIL_TkAdmin";
export const UPDATE_REQUEST_TkAdmin = "UPDATE_REQUEST_TkAdmin";
export const UPDATE_SUCCESS_TkAdmin = "UPDATE_SUCCESS_TkAdmin";
export const UPDATE_FAIL_TkAdmin = "UPDATE_FAIL_TkAdmin";
export const UPDATE_REQUEST_PasswordTkAdmin = "UPDATE_REQUEST_PasswordTkAdmin";
export const UPDATE_SUCCESS_PasswordTkAdmin = "UPDATE_SUCCESS_PasswordTkAdmin";
export const UPDATE_FAIL_PasswordTkAdmin = "UPDATE_FAIL_PasswordTkAdmin";
export const DELETE_REQUEST_TkAdmin = "DELETE_REQUEST_TkAdmin";
export const DELETE_SUCCESS_TkAdmin = "DELETE_SUCCESS_TkAdmin";
export const DELETE_FAIL_TkAdmin = "DELETE_FAIL_TkAdmin";

export const GET_REQUEST_TkAdmin_OTHER = "GET_REQUEST_TkAdmin_OTHER";
export const GET_SUCCESS_TkAdmin_OTHER = "GET_SUCCESS_TkAdmin_OTHER";
export const GET_FAIL_TkAdmin_OTHER = "GET_FAIL_TkAdmin_OTHER";

export function getOtherTkAdmin(params) {
    return {
        types: [GET_REQUEST_TkAdmin_OTHER, GET_SUCCESS_TkAdmin_OTHER, GET_FAIL_TkAdmin_OTHER],
        promise: client => client.get('/api/club',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkAdmin(params) {
    return {
        types: [GET_REQUEST_TkAdmin, GET_SUCCESS_TkAdmin, GET_FAIL_TkAdmin],
        promise: client => client.get('/api/admin',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkAdmin(params) {
    return {
        types: [CREATE_REQUEST_TkAdmin, CREATE_SUCCESS_TkAdmin, CREATE_FAIL_TkAdmin],
        promise: client => client.post('/api/user',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkAdmin(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataTkAdmin(params) {
    return {
        types: [UPDATE_REQUEST_TkAdmin, UPDATE_SUCCESS_TkAdmin, UPDATE_FAIL_TkAdmin],
        promise: client => client.put('/api/user/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkAdmin(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updatePasswordDataTkAdmin(params) {
    return {
        types: [UPDATE_REQUEST_PasswordTkAdmin, UPDATE_SUCCESS_PasswordTkAdmin, UPDATE_FAIL_PasswordTkAdmin],
        promise: client => client.put('/api/user/resetPsd/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info('操作成功');
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataTkAdmin(params) {
    return {
        types: [DELETE_REQUEST_TkAdmin, DELETE_SUCCESS_TkAdmin, DELETE_FAIL_TkAdmin],
        promise: client => client.delete('/api/user/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkAdmin(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

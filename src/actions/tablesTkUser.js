import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkUser = "GET_REQUEST_TkUser";
export const GET_SUCCESS_TkUser = "GET_SUCCESS_TkUser";
export const GET_FAIL_TkUser = "GET_FAIL_TkUser";
export const CREATE_REQUEST_TkUser = "CREATE_REQUEST_TkUser";
export const CREATE_SUCCESS_TkUser = "CREATE_SUCCESS_TkUser";
export const CREATE_FAIL_TkUser = "CREATE_FAIL_TkUser";
export const UPDATE_REQUEST_TkUser = "UPDATE_REQUEST_TkUser";
export const UPDATE_SUCCESS_TkUser = "UPDATE_SUCCESS_TkUser";
export const UPDATE_FAIL_TkUser = "UPDATE_FAIL_TkUser";
export const UPDATE_REQUEST_PasswordTkUser = "UPDATE_REQUEST_PasswordTkUser";
export const UPDATE_SUCCESS_PasswordTkUser = "UPDATE_SUCCESS_PasswordTkUser";
export const UPDATE_FAIL_PasswordTkUser = "UPDATE_FAIL_PasswordTkUser";
export const DELETE_REQUEST_TkUser = "DELETE_REQUEST_TkUser";
export const DELETE_SUCCESS_TkUser = "DELETE_SUCCESS_TkUser";
export const DELETE_FAIL_TkUser = "DELETE_FAIL_TkUser";

export const GET_REQUEST_TkUser_OTHER = "GET_REQUEST_TkUser_OTHER";
export const GET_SUCCESS_TkUser_OTHER = "GET_SUCCESS_TkUser_OTHER";
export const GET_FAIL_TkUser_OTHER = "GET_FAIL_TkUser_OTHER";

export function getOtherTkUser(params) {
    return {
        types: [GET_REQUEST_TkUser_OTHER, GET_SUCCESS_TkUser_OTHER, GET_FAIL_TkUser_OTHER],
        promise: client => client.get('/api/indexcoach',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkUser(params) {
    return {
        types: [GET_REQUEST_TkUser, GET_SUCCESS_TkUser, GET_FAIL_TkUser],
        promise: client => client.get('/api/user',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkUser(params) {
    return {
        types: [CREATE_REQUEST_TkUser, CREATE_SUCCESS_TkUser, CREATE_FAIL_TkUser],
        promise: client => client.post('/api/user',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkUser(params));
                dispatch(getOtherTkUser(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataTkUser(params) {
    return {
        types: [UPDATE_REQUEST_TkUser, UPDATE_SUCCESS_TkUser, UPDATE_FAIL_TkUser],
        promise: client => client.put('/api/user/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkUser(params));
                dispatch(getOtherTkUser(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updatePasswordDataTkUser(params) {
    return {
        types: [UPDATE_REQUEST_PasswordTkUser, UPDATE_SUCCESS_PasswordTkUser, UPDATE_FAIL_PasswordTkUser],
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
export function deleteDataTkUser(params) {
    return {
        types: [DELETE_REQUEST_TkUser, DELETE_SUCCESS_TkUser, DELETE_FAIL_TkUser],
        promise: client => client.delete('/api/user/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkUser(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

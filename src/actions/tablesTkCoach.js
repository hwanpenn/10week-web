import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkCoach = "GET_REQUEST_TkCoach";
export const GET_SUCCESS_TkCoach = "GET_SUCCESS_TkCoach";
export const GET_FAIL_TkCoach = "GET_FAIL_TkCoach";
export const CREATE_REQUEST_TkCoach = "CREATE_REQUEST_TkCoach";
export const CREATE_SUCCESS_TkCoach = "CREATE_SUCCESS_TkCoach";
export const CREATE_FAIL_TkCoach = "CREATE_FAIL_TkCoach";
export const UPDATE_REQUEST_TkCoach = "UPDATE_REQUEST_TkCoach";
export const UPDATE_SUCCESS_TkCoach = "UPDATE_SUCCESS_TkCoach";
export const UPDATE_FAIL_TkCoach = "UPDATE_FAIL_TkCoach";
export const UPDATE_REQUEST_PasswordTkCoach = "UPDATE_REQUEST_PasswordTkCoach";
export const UPDATE_SUCCESS_PasswordTkCoach = "UPDATE_SUCCESS_PasswordTkCoach";
export const UPDATE_FAIL_PasswordTkCoach = "UPDATE_FAIL_PasswordTkCoach";
export const DELETE_REQUEST_TkCoach = "DELETE_REQUEST_TkCoach";
export const DELETE_SUCCESS_TkCoach = "DELETE_SUCCESS_TkCoach";
export const DELETE_FAIL_TkCoach = "DELETE_FAIL_TkCoach";

export const GET_REQUEST_TkCoach_OTHER = "GET_REQUEST_TkCoach_OTHER";
export const GET_SUCCESS_TkCoach_OTHER = "GET_SUCCESS_TkCoach_OTHER";
export const GET_FAIL_TkCoach_OTHER = "GET_FAIL_TkCoach_OTHER";

export function getOtherTkCoach(params) {
    return {
        types: [GET_REQUEST_TkCoach_OTHER, GET_SUCCESS_TkCoach_OTHER, GET_FAIL_TkCoach_OTHER],
        promise: client => client.get('/api/club',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkCoach(params) {
    return {
        types: [GET_REQUEST_TkCoach, GET_SUCCESS_TkCoach, GET_FAIL_TkCoach],
        promise: client => client.get('/api/coach',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkCoach(params) {
    return {
        types: [CREATE_REQUEST_TkCoach, CREATE_SUCCESS_TkCoach, CREATE_FAIL_TkCoach],
        promise: client => client.post('/api/user',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkCoach(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataTkCoach(params) {
    return {
        types: [UPDATE_REQUEST_TkCoach, UPDATE_SUCCESS_TkCoach, UPDATE_FAIL_TkCoach],
        promise: client => client.put('/api/user/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkCoach(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updatePasswordDataTkCoach(params) {
    return {
        types: [UPDATE_REQUEST_PasswordTkCoach, UPDATE_SUCCESS_PasswordTkCoach, UPDATE_FAIL_PasswordTkCoach],
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
export function deleteDataTkCoach(params) {
    return {
        types: [DELETE_REQUEST_TkCoach, DELETE_SUCCESS_TkCoach, DELETE_FAIL_TkCoach],
        promise: client => client.delete('/api/user/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkCoach(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

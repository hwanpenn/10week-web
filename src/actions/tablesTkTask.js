import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkTask = "GET_REQUEST_TkTask";
export const GET_SUCCESS_TkTask = "GET_SUCCESS_TkTask";
export const GET_FAIL_TkTask = "GET_FAIL_TkTask";
export const CREATE_REQUEST_TkTask = "CREATE_REQUEST_TkTask";
export const CREATE_SUCCESS_TkTask = "CREATE_SUCCESS_TkTask";
export const CREATE_FAIL_TkTask = "CREATE_FAIL_TkTask";
export const UPDATE_REQUEST_TkTask = "UPDATE_REQUEST_TkTask";
export const UPDATE_SUCCESS_TkTask = "UPDATE_SUCCESS_TkTask";
export const UPDATE_FAIL_TkTask = "UPDATE_FAIL_TkTask";
export const UPDATE_REQUEST_PasswordTkTask = "UPDATE_REQUEST_PasswordTkTask";
export const UPDATE_SUCCESS_PasswordTkTask = "UPDATE_SUCCESS_PasswordTkTask";
export const UPDATE_FAIL_PasswordTkTask = "UPDATE_FAIL_PasswordTkTask";
export const DELETE_REQUEST_TkTask = "DELETE_REQUEST_TkTask";
export const DELETE_SUCCESS_TkTask = "DELETE_SUCCESS_TkTask";
export const DELETE_FAIL_TkTask = "DELETE_FAIL_TkTask";

export const GET_REQUEST_TkTask_OTHER = "GET_REQUEST_TkTask_OTHER";
export const GET_SUCCESS_TkTask_OTHER = "GET_SUCCESS_TkTask_OTHER";
export const GET_FAIL_TkTask_OTHER = "GET_FAIL_TkTask_OTHER";

export function getOtherTkTask(params) {
    return {
        types: [GET_REQUEST_TkTask_OTHER, GET_SUCCESS_TkTask_OTHER, GET_FAIL_TkTask_OTHER],
        promise: client => client.get('/api/club',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkTask(params) {
    return {
        types: [GET_REQUEST_TkTask, GET_SUCCESS_TkTask, GET_FAIL_TkTask],
        promise: client => client.get('/api/task',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkTask(params) {
    return {
        types: [CREATE_REQUEST_TkTask, CREATE_SUCCESS_TkTask, CREATE_FAIL_TkTask],
        promise: client => client.post('/api/task',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkTask(params));
            }else {
                message.info('新增失败（一天只能指派一个任务）');
            }
        },
    }
}
export function updateDataTkTask(params) {
    return {
        types: [UPDATE_REQUEST_TkTask, UPDATE_SUCCESS_TkTask, UPDATE_FAIL_TkTask],
        promise: client => client.put('/api/task/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkTask(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updatePasswordDataTkTask(params) {
    return {
        types: [UPDATE_REQUEST_PasswordTkTask, UPDATE_SUCCESS_PasswordTkTask, UPDATE_FAIL_PasswordTkTask],
        promise: client => client.put('/api/task/resetPsd/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info('操作成功');
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataTkTask(params) {
    return {
        types: [DELETE_REQUEST_TkTask, DELETE_SUCCESS_TkTask, DELETE_FAIL_TkTask],
        promise: client => client.delete('/api/task/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkTask(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

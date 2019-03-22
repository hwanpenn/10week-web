import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkVideo = "GET_REQUEST_TkVideo";
export const GET_SUCCESS_TkVideo = "GET_SUCCESS_TkVideo";
export const GET_FAIL_TkVideo = "GET_FAIL_TkVideo";
export const CREATE_REQUEST_TkVideo = "CREATE_REQUEST_TkVideo";
export const CREATE_SUCCESS_TkVideo = "CREATE_SUCCESS_TkVideo";
export const CREATE_FAIL_TkVideo = "CREATE_FAIL_TkVideo";
export const UPDATE_REQUEST_TkVideo = "UPDATE_REQUEST_TkVideo";
export const UPDATE_SUCCESS_TkVideo = "UPDATE_SUCCESS_TkVideo";
export const UPDATE_FAIL_TkVideo = "UPDATE_FAIL_TkVideo";
export const UPDATE_REQUEST_PasswordTkVideo = "UPDATE_REQUEST_PasswordTkVideo";
export const UPDATE_SUCCESS_PasswordTkVideo = "UPDATE_SUCCESS_PasswordTkVideo";
export const UPDATE_FAIL_PasswordTkVideo = "UPDATE_FAIL_PasswordTkVideo";
export const DELETE_REQUEST_TkVideo = "DELETE_REQUEST_TkVideo";
export const DELETE_SUCCESS_TkVideo = "DELETE_SUCCESS_TkVideo";
export const DELETE_FAIL_TkVideo = "DELETE_FAIL_TkVideo";

export const GET_REQUEST_TkVideo_OTHER = "GET_REQUEST_TkVideo_OTHER";
export const GET_SUCCESS_TkVideo_OTHER = "GET_SUCCESS_TkVideo_OTHER";
export const GET_FAIL_TkVideo_OTHER = "GET_FAIL_TkVideo_OTHER";

export function getOtherTkVideo(params) {
    return {
        types: [GET_REQUEST_TkVideo_OTHER, GET_SUCCESS_TkVideo_OTHER, GET_FAIL_TkVideo_OTHER],
        promise: client => client.get('/api/club',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkVideo(params) {
    return {
        types: [GET_REQUEST_TkVideo, GET_SUCCESS_TkVideo, GET_FAIL_TkVideo],
        promise: client => client.get('/api/video',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkVideo(params) {
    return {
        types: [CREATE_REQUEST_TkVideo, CREATE_SUCCESS_TkVideo, CREATE_FAIL_TkVideo],
        promise: client => client.post('/api/video',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkVideo(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataTkVideo(params) {
    return {
        types: [UPDATE_REQUEST_TkVideo, UPDATE_SUCCESS_TkVideo, UPDATE_FAIL_TkVideo],
        promise: client => client.put('/api/video/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkVideo(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updatePasswordDataTkVideo(params) {
    return {
        types: [UPDATE_REQUEST_PasswordTkVideo, UPDATE_SUCCESS_PasswordTkVideo, UPDATE_FAIL_PasswordTkVideo],
        promise: client => client.put('/api/video/resetPsd/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info('操作成功');
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataTkVideo(params) {
    return {
        types: [DELETE_REQUEST_TkVideo, DELETE_SUCCESS_TkVideo, DELETE_FAIL_TkVideo],
        promise: client => client.delete('/api/video/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkVideo(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

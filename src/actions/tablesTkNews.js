import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkNews = "GET_REQUEST_TkNews";
export const GET_SUCCESS_TkNews = "GET_SUCCESS_TkNews";
export const GET_FAIL_TkNews = "GET_FAIL_TkNews";
export const CREATE_REQUEST_TkNews = "CREATE_REQUEST_TkNews";
export const CREATE_SUCCESS_TkNews = "CREATE_SUCCESS_TkNews";
export const CREATE_FAIL_TkNews = "CREATE_FAIL_TkNews";
export const UPDATE_REQUEST_TkNews = "UPDATE_REQUEST_TkNews";
export const UPDATE_SUCCESS_TkNews = "UPDATE_SUCCESS_TkNews";
export const UPDATE_FAIL_TkNews = "UPDATE_FAIL_TkNews";
export const UPDATE_REQUEST_PasswordTkNews = "UPDATE_REQUEST_PasswordTkNews";
export const UPDATE_SUCCESS_PasswordTkNews = "UPDATE_SUCCESS_PasswordTkNews";
export const UPDATE_FAIL_PasswordTkNews = "UPDATE_FAIL_PasswordTkNews";
export const DELETE_REQUEST_TkNews = "DELETE_REQUEST_TkNews";
export const DELETE_SUCCESS_TkNews = "DELETE_SUCCESS_TkNews";
export const DELETE_FAIL_TkNews = "DELETE_FAIL_TkNews";

export const GET_REQUEST_TkNews_OTHER = "GET_REQUEST_TkNews_OTHER";
export const GET_SUCCESS_TkNews_OTHER = "GET_SUCCESS_TkNews_OTHER";
export const GET_FAIL_TkNews_OTHER = "GET_FAIL_TkNews_OTHER";

export function getOtherTkNews(params) {
    return {
        types: [GET_REQUEST_TkNews_OTHER, GET_SUCCESS_TkNews_OTHER, GET_FAIL_TkNews_OTHER],
        promise: client => client.get('/api/club',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkNews(params) {
    return {
        types: [GET_REQUEST_TkNews, GET_SUCCESS_TkNews, GET_FAIL_TkNews],
        promise: client => client.get('/api/news',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkNews(params) {
    return {
        types: [CREATE_REQUEST_TkNews, CREATE_SUCCESS_TkNews, CREATE_FAIL_TkNews],
        promise: client => client.post('/api/news',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkNews(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataTkNews(params) {
    return {
        types: [UPDATE_REQUEST_TkNews, UPDATE_SUCCESS_TkNews, UPDATE_FAIL_TkNews],
        promise: client => client.put('/api/news/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkNews(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updatePasswordDataTkNews(params) {
    return {
        types: [UPDATE_REQUEST_PasswordTkNews, UPDATE_SUCCESS_PasswordTkNews, UPDATE_FAIL_PasswordTkNews],
        promise: client => client.put('/api/news/resetPsd/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info('操作成功');
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataTkNews(params) {
    return {
        types: [DELETE_REQUEST_TkNews, DELETE_SUCCESS_TkNews, DELETE_FAIL_TkNews],
        promise: client => client.delete('/api/news/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkNews(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

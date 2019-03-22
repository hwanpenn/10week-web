import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkClub = "GET_REQUEST_TkClub";
export const GET_SUCCESS_TkClub = "GET_SUCCESS_TkClub";
export const GET_FAIL_TkClub = "GET_FAIL_TkClub";
export const CREATE_REQUEST_TkClub = "CREATE_REQUEST_TkClub";
export const CREATE_SUCCESS_TkClub = "CREATE_SUCCESS_TkClub";
export const CREATE_FAIL_TkClub = "CREATE_FAIL_TkClub";
export const UPDATE_REQUEST_TkClub = "UPDATE_REQUEST_TkClub";
export const UPDATE_SUCCESS_TkClub = "UPDATE_SUCCESS_TkClub";
export const UPDATE_FAIL_TkClub = "UPDATE_FAIL_TkClub";
export const DELETE_REQUEST_TkClub = "DELETE_REQUEST_TkClub";
export const DELETE_SUCCESS_TkClub = "DELETE_SUCCESS_TkClub";
export const DELETE_FAIL_TkClub = "DELETE_FAIL_TkClub";

export const GET_REQUEST_TkClub_OTHER = "GET_REQUEST_TkClub_OTHER";
export const GET_SUCCESS_TkClub_OTHER = "GET_SUCCESS_TkClub_OTHER";
export const GET_FAIL_TkClub_OTHER = "GET_FAIL_TkClub_OTHER";

export function getOtherTkClub(params) {
    return {
        types: [GET_REQUEST_TkClub_OTHER, GET_SUCCESS_TkClub_OTHER, GET_FAIL_TkClub_OTHER],
        promise: client => client.get('/api/area',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkClub(params) {
    return {
        types: [GET_REQUEST_TkClub, GET_SUCCESS_TkClub, GET_FAIL_TkClub],
        promise: client => client.get('/api/club',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkClub(params) {
    return {
        types: [CREATE_REQUEST_TkClub, CREATE_SUCCESS_TkClub, CREATE_FAIL_TkClub],
        promise: client => client.post('/api/club',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkClub(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataTkClub(params) {
    return {
        types: [UPDATE_REQUEST_TkClub, UPDATE_SUCCESS_TkClub, UPDATE_FAIL_TkClub],
        promise: client => client.put('/api/club/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkClub(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataTkClub(params) {
    return {
        types: [DELETE_REQUEST_TkClub, DELETE_SUCCESS_TkClub, DELETE_FAIL_TkClub],
        promise: client => client.delete('/api/club/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkClub(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

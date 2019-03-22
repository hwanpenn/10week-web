import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkArea = "GET_REQUEST_TkArea";
export const GET_SUCCESS_TkArea = "GET_SUCCESS_TkArea";
export const GET_FAIL_TkArea = "GET_FAIL_TkArea";
export const CREATE_REQUEST_TkArea = "CREATE_REQUEST_TkArea";
export const CREATE_SUCCESS_TkArea = "CREATE_SUCCESS_TkArea";
export const CREATE_FAIL_TkArea = "CREATE_FAIL_TkArea";
export const UPDATE_REQUEST_TkArea = "UPDATE_REQUEST_TkArea";
export const UPDATE_SUCCESS_TkArea = "UPDATE_SUCCESS_TkArea";
export const UPDATE_FAIL_TkArea = "UPDATE_FAIL_TkArea";
export const DELETE_REQUEST_TkArea = "DELETE_REQUEST_TkArea";
export const DELETE_SUCCESS_TkArea = "DELETE_SUCCESS_TkArea";
export const DELETE_FAIL_TkArea = "DELETE_FAIL_TkArea";

export const GET_REQUEST_TkArea_OTHER = "GET_REQUEST_TkArea_OTHER";
export const GET_SUCCESS_TkArea_OTHER = "GET_SUCCESS_TkArea_OTHER";
export const GET_FAIL_TkArea_OTHER = "GET_FAIL_TkArea_OTHER";

export function getOtherTkArea(params) {
    return {
        types: [GET_REQUEST_TkArea_OTHER, GET_SUCCESS_TkArea_OTHER, GET_FAIL_TkArea_OTHER],
        promise: client => client.get('/api/role',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkArea(params) {
    return {
        types: [GET_REQUEST_TkArea, GET_SUCCESS_TkArea, GET_FAIL_TkArea],
        promise: client => client.get('/api/area',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkArea(params) {
    return {
        types: [CREATE_REQUEST_TkArea, CREATE_SUCCESS_TkArea, CREATE_FAIL_TkArea],
        promise: client => client.post('/api/area',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkArea(params));
            }else {
                message.info(response.data.error);
            }
        },
    }
}
export function updateDataTkArea(params) {
    return {
        types: [UPDATE_REQUEST_TkArea, UPDATE_SUCCESS_TkArea, UPDATE_FAIL_TkArea],
        promise: client => client.put('/api/area/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkArea(params));
            }else {
                // if(response.data.code===500){
                //      message.info('系统错误,操作失败');
                // }
                message.info(response.data.error);
            }
        },
    }
}
export function deleteDataTkArea(params) {
    return {
        types: [DELETE_REQUEST_TkArea, DELETE_SUCCESS_TkArea, DELETE_FAIL_TkArea],
        promise: client => client.delete('/api/area/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkArea(params));
            }else {
                message.info(response.data.error);
            }
        },
    }
}

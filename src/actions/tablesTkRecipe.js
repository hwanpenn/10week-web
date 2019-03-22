import { message } from 'antd';
message.config({
    duration: 1,
});

export const GET_REQUEST_TkRecipe = "GET_REQUEST_TkRecipe";
export const GET_SUCCESS_TkRecipe = "GET_SUCCESS_TkRecipe";
export const GET_FAIL_TkRecipe = "GET_FAIL_TkRecipe";
export const CREATE_REQUEST_TkRecipe = "CREATE_REQUEST_TkRecipe";
export const CREATE_SUCCESS_TkRecipe = "CREATE_SUCCESS_TkRecipe";
export const CREATE_FAIL_TkRecipe = "CREATE_FAIL_TkRecipe";
export const UPDATE_REQUEST_TkRecipe = "UPDATE_REQUEST_TkRecipe";
export const UPDATE_SUCCESS_TkRecipe = "UPDATE_SUCCESS_TkRecipe";
export const UPDATE_FAIL_TkRecipe = "UPDATE_FAIL_TkRecipe";
export const UPDATE_REQUEST_PasswordTkRecipe = "UPDATE_REQUEST_PasswordTkRecipe";
export const UPDATE_SUCCESS_PasswordTkRecipe = "UPDATE_SUCCESS_PasswordTkRecipe";
export const UPDATE_FAIL_PasswordTkRecipe = "UPDATE_FAIL_PasswordTkRecipe";
export const DELETE_REQUEST_TkRecipe = "DELETE_REQUEST_TkRecipe";
export const DELETE_SUCCESS_TkRecipe = "DELETE_SUCCESS_TkRecipe";
export const DELETE_FAIL_TkRecipe = "DELETE_FAIL_TkRecipe";

export const GET_REQUEST_TkRecipe_OTHER = "GET_REQUEST_TkRecipe_OTHER";
export const GET_SUCCESS_TkRecipe_OTHER = "GET_SUCCESS_TkRecipe_OTHER";
export const GET_FAIL_TkRecipe_OTHER = "GET_FAIL_TkRecipe_OTHER";

export function getOtherTkRecipe(params) {
    return {
        types: [GET_REQUEST_TkRecipe_OTHER, GET_SUCCESS_TkRecipe_OTHER, GET_FAIL_TkRecipe_OTHER],
        promise: client => client.get('/api/club',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}

export function getDataTkRecipe(params) {
    return {
        types: [GET_REQUEST_TkRecipe, GET_SUCCESS_TkRecipe, GET_FAIL_TkRecipe],
        promise: client => client.get('/api/recipe',{params: params}),
        afterSuccess:(dispatch,getState,response)=>{
            /*请求成功后执行的函数*/
        },
        // otherData:otherData
    }
}
export function createDataTkRecipe(params) {
    return {
        types: [CREATE_REQUEST_TkRecipe, CREATE_SUCCESS_TkRecipe, CREATE_FAIL_TkRecipe],
        promise: client => client.post('/api/recipe',params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkRecipe(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updateDataTkRecipe(params) {
    return {
        types: [UPDATE_REQUEST_TkRecipe, UPDATE_SUCCESS_TkRecipe, UPDATE_FAIL_TkRecipe],
        promise: client => client.put('/api/recipe/'+params.id,params),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkRecipe(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function updatePasswordDataTkRecipe(params) {
    return {
        types: [UPDATE_REQUEST_PasswordTkRecipe, UPDATE_SUCCESS_PasswordTkRecipe, UPDATE_FAIL_PasswordTkRecipe],
        promise: client => client.put('/api/recipe/resetPsd/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info('操作成功');
            }else {
                message.info(response.data.msg);
            }
        },
    }
}
export function deleteDataTkRecipe(params) {
    return {
        types: [DELETE_REQUEST_TkRecipe, DELETE_SUCCESS_TkRecipe, DELETE_FAIL_TkRecipe],
        promise: client => client.delete('/api/recipe/'+params.id),
        afterSuccess:(dispatch,getState,response)=>{
            if(response.data.code===0){
                message.info(response.data.msg);
                const params = {
                    pageNo:1,
                    pageSize:10,
                };
                dispatch(getDataTkRecipe(params));
            }else {
                message.info(response.data.msg);
            }
        },
    }
}

import {GET_SUCCESS_TkRecipe } from "actions/tablesTkRecipe";
import {CREATE_SUCCESS_TkRecipe } from "actions/tablesTkRecipe";
import {UPDATE_SUCCESS_TkRecipe } from "actions/tablesTkRecipe";
import {DELETE_SUCCESS_TkRecipe } from "actions/tablesTkRecipe";
import {GET_SUCCESS_TkRecipe_OTHER } from "actions/tablesTkRecipe";

const initState = {
    responseGetTkRecipe:'',
    responseCreateTkRecipe:'',
    responseUpdateTkRecipe:'',
    responseDeleteTkRecipe:'',
    responseOtherTkRecipe:'',
    tableDataTkRecipe:'',
    tableCountTkRecipe:'',
    tablesTkRecipe:''
};

export default function reducer(state = initState,action) {
    switch (action.type) {
        case GET_SUCCESS_TkRecipe_OTHER:
            const responseOtherTkRecipe = action.result.data.data;
            console.log(responseOtherTkRecipe)
            return {
                ...state,
                responseOtherTkRecipe:responseOtherTkRecipe,
            };
        case GET_SUCCESS_TkRecipe:
            const responseGetTkRecipe = action.result.data.data;
            return {
                ...state,
                tableDataTkRecipe:responseGetTkRecipe.rows,
                tableCountTkRecipe:responseGetTkRecipe.total,
                responseGetTkRecipe:responseGetTkRecipe
            };
        case CREATE_SUCCESS_TkRecipe:
            const responseCreateTkRecipe = action.result.data.data;
            return {
                ...state,
                responseCreateTkRecipe:responseCreateTkRecipe
            };
        case UPDATE_SUCCESS_TkRecipe:
            const responseUpdateTkRecipe = action.result.data.data;
            return {
                ...state,
                responseUpdateTkRecipe:responseUpdateTkRecipe
            };
        case DELETE_SUCCESS_TkRecipe:
            const responseDeleteTkRecipe = action.result.data.data;
            return {
                ...state,
                responseDeleteTkRecipe:responseDeleteTkRecipe
            };
        default:
            return state
    }
}

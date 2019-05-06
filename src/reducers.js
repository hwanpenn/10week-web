import app from './reducers/app.js'
import tablesAdmin from './reducers/tablesAdmin.js'
import tablesTkArea from './reducers/tablesTkArea.js'
import tablesTkVip from './reducers/tablesTkVip.js'
import tablesTkApp from './reducers/tablesTkApp.js'
import tablesTkBaseData from './reducers/tablesTkBaseData.js'
import tablesTkVipData from './reducers/tablesTkVipData.js'
import tablesTkPush from './reducers/tablesTkPush.js'
import tablesTkRole from './reducers/tablesTkRole.js'
import tablesTkClub from './reducers/tablesTkClub.js'
import tablesTkAdmin from './reducers/tablesTkAdmin.js'
import tablesTkCoach from './reducers/tablesTkCoach.js'
import tablesTkUser from './reducers/tablesTkUser.js'
import tablesTkVideo from './reducers/tablesTkVideo.js'
import tablesTkNews from './reducers/tablesTkNews.js'
import tablesTkTask from './reducers/tablesTkTask.js'
import tablesTkRecipe from './reducers/tablesTkRecipe.js'
import {combineReducers} from 'redux'

export default combineReducers({
        app,
    tablesAdmin,
    tablesTkArea,
    tablesTkVip,
    tablesTkApp,
    tablesTkBaseData,
    tablesTkVipData,
    tablesTkPush,
    tablesTkRole,
    tablesTkClub,
    tablesTkAdmin,
    tablesTkCoach,
    tablesTkUser,
    tablesTkVideo,
    tablesTkNews,
    tablesTkTask,
    tablesTkRecipe,
    
})

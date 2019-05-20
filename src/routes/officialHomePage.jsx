import AsyncComponent from './asyncComponent.jsx'
// import OfficialHomePage from "views/Official/OfficialHomePage.jsx";
// import Fingerprint from "@material-ui/icons/Fingerprint";
import LockOpen from "@material-ui/icons/LockOpen";
// import FaceIdPage from "views/LoginPages/FaceIdPage";
import Loadable from 'react-loadable';
import Loading from './loading'

const OfficialHomePage = Loadable({
    loader: () => import(/* webpackChunkName: "OfficialHomePage" */ "views/Official/OfficialHomePage.jsx"),
    loading: Loading
});

const pagesRoutes2 = [
    {
        path: "/official/OfficialHomePage",
        name: "OfficialHome Page",
        short: "OfficialHome",
        mini: "LP",
        icon: LockOpen,
        component: OfficialHomePage
    },
    // {
    //   path: "/cms/login/faceid",
    //   name: "Login Page",
    //   short: "FaceId",
    //   mini: "LP",
    //   icon: LockOpen,
    //   component: FaceIdPage
    // },
    {
        redirect: true,
        path: "/official",
        pathTo: "/official/OfficialHomePage",
        name: "Register"
    },
];

export default pagesRoutes2;

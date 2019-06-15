import Fingerprint from "@material-ui/icons/Fingerprint";
import Loadable from 'react-loadable';
import Loading from './loading'
import AsyncComponent from './asyncComponent.jsx'
// import LoginPage from "views/LoginPages/LoginPage.jsx";
// import LockOpen from "@material-ui/icons/LockOpen";
// import FaceIdPage from "views/LoginPages/FaceIdPage";

const LoginPage = Loadable({
    loader: () => import(/* webpackChunkName: "LoginPage" */ "views/LoginPages/LoginPage.jsx"),
    loading: Loading
});

const pagesRoutes = [
  {
    path: "/cms/login/normal",
    name: "Login Page",
    short: "Login",
    mini: "LP",
    icon: Fingerprint,
    component: LoginPage
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
      path: "/cms/login",
      pathTo: "/cms/login/normal",
      name: "Register"
  },
];

export default pagesRoutes;

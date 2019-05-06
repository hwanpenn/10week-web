import OfficialHomePage from "layouts/OfficialHomePage.jsx";
import MobilePage from "layouts/MobilePage.jsx";
import LoginPages from "layouts/LoginPages.jsx";
import HomePages from "layouts/HomePages.jsx";

const indexRoutes = [
  {
    path: "/official",
    name: "officialHome ",
    short: "officialHome",
    mini: "OP",
    component: OfficialHomePage
},
  {
    path: "/mobile",
    name: "mobileHome ",
    short: "mobileHome",
    mini: "MP",
    component: MobilePage
},
    {
        path: "/cms/login",
        name: "Login ",
        short: "Login",
        mini: "LP",
        component: LoginPages
    },
    {
      path: "/cms/home",
      name: "Home",
      short: "Home",
      mini: "HP",
      component: HomePages
    },
    // {
    //   path: "/cms/home",
    //   redirect: true,
    //   pathTo: "/cms/home/tables/user",
    //   name: "Register"
    // },
    {
      path: "/cms",
      redirect: true,
      pathTo: "/cms/login",
      name: "Register"
    },
];

export default indexRoutes;

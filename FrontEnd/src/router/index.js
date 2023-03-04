// for user
import HomeUser from "../pages/client/homeUser/homeUser";
//for admin
import HomeAdmin from "../pages/admin/homeAdmin/homeAdmin";
const publicRoutes = [
  {
    path: "/home",
    component: HomeUser,
  },
  // {
  //   path: "/register",
  //   component: Register,
  // },
  // {
  //   path: "/detail/:sessionAddress",
  //   component: Detail,
  // },
];

const privateRoutes = [
  {
    path: "/admin/home",
    component: HomeAdmin,
  },
  // {
  //   path: "/admin/product",
  //   component: ProductAdmin,
  // },
];

export { publicRoutes, privateRoutes };

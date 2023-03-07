// for user
import HomeUser from "../pages/client/homeUser/homeUser";
import Voting from "../pages/client/voting/voting";
//for admin
import HomeAdmin from "../pages/admin/homeAdmin/homeAdmin";
import CandidateElection from "../pages/admin/CandidateElection/candidateElection";
const publicRoutes = [
  {
    path: "/home",
    component: HomeUser,
  },
  {
    path: "/candidate/:electionAddress",
    component: CandidateElection,
  },
  {
    path: "/voting/:electionAddress",
    component: Voting,
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

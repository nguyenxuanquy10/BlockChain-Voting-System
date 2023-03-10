const express = require("express");

const config = require("../../config/config");

const router = express.Router();

const defaultRoutes = [
  // {
  //   path: '/auth',
  //   route: authRoute,
  // },
  // {
  //   path: '/categorys',
  //   route: categoryRoute,
  // },
  // {
  //   path: '/orders',
  //   route: orderRoute,
  // },
  // {
  //   path: "/user-vouchers",
  //   route: voucherUserRoute
  // }
];

const userRoutes = [
  // {
  //   path: '/users',
  //   route: userRoute,
  // },
  // {
  //   path: '/comments',
  //   route: commentRoute,
  // },
  // { path: '/order-detail', route: orderDetailRoute },
  // { path: '/payments', route: paymentRoute },
];

const adminRoutes = [
  // {
  //   path: '/vouchers',
  //   route: voucherRoute,
  // },
  // {
  //   path: '/posts',
  //   route: postRoute,
  // },
  // {
  //   path: '/products',
  //   route: productRoute,
  // },
  // {
  //   path: '/images',
  //   route: imageRoute,
  // },
  // {
  //   path: '/sliders',
  //   route: sliderRoute,
  // },
];

const devRoutes = [
  // routes available only in development mode
  // {
  //   path: '/docs',
  //   route: docsRoute,
  // },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

userRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

adminRoutes.forEach((route) => {
  router.use(route.path, auth, authorize("admin"), route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;

import { createRouter, createWebHistory } from "vue-router"



// const routes = [
//   {
//     path: "/",
//     beforeEnter(to: any, from: any, next: any) {
//       next('/login')
//     }
//   },
//   {
//     path: "/login",
//     name: "login",
//     component: () => import("./views/Login.vue"),
//     meta: {
//       layout: "full"
//     }
//   },
// ]
const routes = [
  {
    path: "/",
    beforeEnter(to:any, from:any, next:any){
      next("/login")
    }
  },
	{
		path: '/login',
		name: 'Login',
		component: () => import("./views/Login.vue"),
    meta: {
      layout: "full"
    }
	},
];


const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router
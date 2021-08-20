import { createRouter, createWebHistory } from "vue-router"


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
	{
		path: '/signup',
		name: 'SignUp',
		component: () => import("./views/Register.vue"),
    meta: {
      layout: "full"
    }
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: () => import("./views/Dashboard.vue")
	},
];


const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router
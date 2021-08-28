import { createRouter, createWebHistory } from "vue-router"
import { LS } from "./store/auth"


const routes = [
  {
    path: "/",
    beforeEnter (to: any, from: any, next: any){
      if (!localStorage.getItem(LS.authToken)) {
        next("/login")
        return
      }
      next("/questions")
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
		path: '/questions',
		name: 'Questions',
		component: () => import("./views/Questions.vue")
	},
];


const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router
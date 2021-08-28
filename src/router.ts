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
		name: 'login',
		component: () => import("./views/Login.vue"),
    meta: {
      layout: "full"
    }
	},
	{
		path: '/signup',
		name: 'sign-up',
		component: () => import("./views/Register.vue"),
    meta: {
      layout: "full"
    }
	},
	{
		path: '/questions',
		name: 'questions',
		component: () => import("./views/Questions.vue")
	},
	{
		path: '/questions/:_id',
		name: 'questions-details',
		component: () => import("./views/QuestionDetails.vue")
	},
];


const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router
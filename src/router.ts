import { createRouter, createWebHistory } from "vue-router"


const routes = [
  {
    path: "/",
    beforeEnter (to: any, from: any, next: any){
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
		component: () => import("./views/questions/List.vue")
	},
	{
		path: '/questions/add',
		name: 'add-questions',
		component: () => import("./views/questions/Add.vue")
	},
	{
		path: '/questions/:questionId',
		name: 'questions-details',
		component: () => import("./views/QuestionDetails.vue")
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'page-not-found',
		component: () => import("./views/404.vue"),
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

import { createWebHistory, createRouter } from 'vue-router'
import projectModule from '../../modules/projects'
import tasksModule from '../../modules/tasks'
import employeestModule from '../../modules/employees'
import Home from '../layouts/home.vue'
import { useAuthStore } from '../stores/AuthStore'



const routes = [
  //list of routs
//   {path:'/',Component:sidebar}
...projectModule.routes,
...tasksModule.routes,
...employeestModule.routes,
{path:'/',component:Home,meta:{requiresAuth:true}}
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to)=>{
  const auth = useAuthStore();

  if(to.path === '/login' && auth.isLogin)
      return '/';

  if(to.meta.requiresAuth && !auth.isLogin)
      return {
    path:'/login',query:{redirect:to.fullPath}}

})

export default router


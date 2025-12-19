import Employees from './pages/Employees.vue'
import EmployeeProfile from './pages/EmployeeProfile.vue'
import Register from './pages/Register.vue'
import Login from './pages/Login.vue'
export default{
    routes:[
        {path:'/employees',component:Employees,meta:{requiresAuth:true}},
        {path:'/profile/:id',component:EmployeeProfile,meta:{requiresAuth:true}},
        {path:'/login/',component:Login},
        {path:'/register/',component:Register},
    ]
}
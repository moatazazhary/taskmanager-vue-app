import Tasks from './pages/Tasks.vue'

export default {
    routes:[
        {path:'/tasks',component:Tasks,meta:{requiresAuth:true,EmployeeOnly:true,MentorOnly:true}},
    ]
};
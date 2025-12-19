
import Projects from "./pages/projects.vue";
import Projectdetails from "./pages/projectdetails.vue";

export default {
    routes : [
    {path:'/projects',component:Projects,meta:{requiresAuth:true,MentorOnly:true,AdminOnly:true}},
    {path:'/projects/:id',component:Projectdetails,meta:{requiresAuth:true,MentorOnly:true,AdminOnly:true}},
]
};
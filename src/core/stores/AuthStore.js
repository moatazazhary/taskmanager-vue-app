import { defineStore } from "pinia";
import { computed, ref } from "vue";
import validation from "../services/authValidationService";
import api from "../services/api";
import { useAlertStore } from "./AlertStore";
import { useRoute, useRouter } from "vue-router";
import { useDropDownStore } from "./DropdownListStor";

export const useAuthStore = defineStore('auth',()=>{
    const userInfo = ref(null);
    const rout = useRoute();
    const router = useRouter();
    const isLogin = computed(()=>{
        return userInfo.value ? true : false
        })
    const validate = ref({});

    const isAdmin = computed(()=>{
        return userInfo.value?.isAdmin
    });
    const isMentor = computed(()=>{
        return userInfo.value?.role === "Mentor";
    });
    const isEmployee = computed(()=>{
        return userInfo.value?.role === "Employee"
    });

    const redirct = computed(()=>{
        return router.currentRoute.value.query.redirct
    });

    const defaultRout = computed(()=>{
        return isAdmin.value ? '/home': isMentor.value ? '/projects' : '/tasks'
    })

    function loadUser(){
        const user = localStorage.getItem('user');
        if(user)
            userInfo.value = JSON.parse(user);
    }

    async function login(user){
        validate.value.errors = '';
        validate.value = validation.isValid(user)

        if(isObjectEmpity(validate.value)){
            const {data} = await api.get(`/employees?email=${user.email}`);

            if(data.length === 0){

                validate.value.errors = 'No user fount with this email';
                useAlertStore().failure('login failed!');
                return
            }
            if(data[0].password != user.password){
                validate.value.errors = 'wrong email or pasword';
                useAlertStore().failure('login failed!');
                return
            }
            userInfo.value = data[0];
            localStorage.setItem('user',JSON.stringify(userInfo.value));
            useAlertStore().Success(`login success, weclome ${data[0].firstName}` );
            router.replace(redirct.value || defaultRout.value);
        }

    }

    async function register(user){
        validate.value = validation.isValid(user,false);
        if(isObjectEmpity(validate.value)){
            const role = await api.get(`/roles?title=${'Employee'}`);
            user.roleId = role.data[0].id;
            user.role = role.data[0].title;
            user.isAdmin = false;

            const {data} = await api.post('/employees/',user);
            if(data){
                localStorage.setItem('user',JSON.stringify(userInfo.value));
                useAlertStore().Success('Register successfully')
                router.replace(redirct.value || defaultRout.value);
            }else{
                useAlertStore().failure('cannot register !')
            }
        }
    }

    function logout(){
        localStorage.removeItem('user');
        useDropDownStore().openDropdounList('');
        router.replace('/login');
        userInfo.value = null;
    }

    function isObjectEmpity(obj){
        if(Object.keys(obj).length === 0)
            return true;

        return Object.values(obj).every(v=>{
            if(v === '' || v === undefined)
                return true;
            if(typeof v === 'string')
                return v.trim() === ''
            return false;
        });
    }


    return {userInfo,validate,isLogin,isAdmin,isEmployee,isMentor,loadUser,login,register,logout}
})
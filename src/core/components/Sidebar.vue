<script setup>

import { useSidebar } from '../stores/SidebarStore';
import { useAuthStore } from '../stores/AuthStore';
import { computed } from 'vue';
const authControl = useAuthStore();
    const sidebarITems = [
        {
            name:"Overview",
            url: '/',
            role:auth => auth.isAdmin
        },
        {
            name:"Projects",
            url:'/projects',
            role: auth => auth.isMentor || auth.isAdmin
        },
        {
            name:"Employees",
            url:'/employees',
            role: auth => auth.isMentor || auth.isAdmin
        },
        {
            name:"Tasks",
            url:'/tasks',
            role: auth => auth.isMentor || auth.isEmployee
        },

];

const visibleLists = computed(()=>{
    return sidebarITems.filter(s => s.role(authControl))
})

const sidebarControl = useSidebar();
    //:class="pageNumer=== item.pagenum ? 'bg-hover text-title' :'' "

</script>

<template>
    <aside @click="sidebarControl.navbarStatus = false" class=" overflow-hidden absolute w-full bg-[rgba(0,0,0,.4)]  top-0 left-0 z-30 lg:block lg:bg-back lg:max-w-2xs lg:relative" :class="{ hidden : !sidebarControl.navbarStatus }">
        
        <div @click.stop id="sidebar" :class="{active : sidebarControl.navbarStatus}"  class="aside-toggle flex flex-col overflow-hidden max-w-2xs relative justify-between h-screen bg-back shadow-xl shadow-gray-200 p-10 lg:w-auto">
            <div @click="sidebarControl.toggleStatus" class="absolute top-3 right-3 rounded-full w-fit group hover:border-main transition-colors p-3 border-[1px] border-gray-200 cursor-pointer block lg:hidden">
                <i class="fa-solid fa-xmark text-text text-lg group-hover:border-main transition-colors"></i>
            </div>
            <div class="logo flex items-center gap-2 mt-5">
                <span class="w-8 h-8 rounded-lg bg-main flex items-center justify-center
                            font-bold text-white text-xl">T</span>
                <h2 class="text-xl font-medium">Task Manager</h2> 
            </div>
            <nav class="flex items-center flex-col gap-3">
                <RouterLink  class="cursor-pointer text-[16px]  text-in-active w-full hover:text-title transition-colors
                                font-medium p-3 rounded-lg flex items-center flex-row gap-2" 
                                v-for="item in visibleLists"  :to="item.url" @click="sidebarControl.navbarStatus = false" active-class="text-title bg-hover">
                    <i class="fa-regular fa-address-card"></i>
                    <span>{{ item.name }}</span>
                    
                </RouterLink>
                
            </nav>

            <div id="help-center-card" class="relative rounded-lg bg-title text-center flex items-center flex-col p-3 pt-10 gap-3">
                <span class="absolute p-2 w-14 h-14 font-bold text-2xl flex items-center justify-center text-white bg-title rounded-full border-4 border-white
                            top-0 -translate-y-1/2">?</span>
                <h3 class="text-white text-lg font-bold ">Help Center</h3>
                <p class="text-white text-sm">Having Trouble in Learning.
                    Please contact us for more questions.
                </p>
                <button class="rounded-sm mt-5 px-4 cursor-pointer py-2 bg-white text-title outline-none border-none">Go To Help Center</button>
            </div>
        </div>
    </aside>
</template>

<style scoped>

    #help-center-card::before,
    #help-center-card::after{
        content: '';
        position: absolute;
        border-radius: 100%;
        background-color: white;
        opacity: .1;
    }
    #help-center-card::before{
        top: 0;
        left: 0;
        transform: translate(-40%,-40%);
        width: 100px ;
        height: 100px;
    }
    #help-center-card::after{
        bottom: 0;
        right: 0;
        transform: translate(40%,40%);
        width: 130px ;
        height: 130px; 
    }


    #sidebar.active{
        transition: .3s ease-in-out;
        animation: aside-toggle .3s linear forwards;
    }

    @keyframes aside-toggle {
        from{
            opacity: 0;
            transform: translateX(-288px);
        }to{
            opacity: 1;
           transform: translateX(0);
        }
    }
</style>
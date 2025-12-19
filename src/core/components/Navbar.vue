<script setup>
    import Line from './Line.vue'
    import { useDropDownStore } from '../stores/DropdownListStor';
    import { dropDowns } from '../utils/dropDowns';
    import { useSidebar } from '../stores/SidebarStore';
import { useAuthStore } from '../stores/AuthStore';
    const authControl = useAuthStore();
    const sidebarControl = useSidebar();
    const dropdownControl = useDropDownStore();
</script>
<template>
    <div class="bg-back z-30 shadow-lg shadow-gray-100 px-5 py-3 lg:px-10 lg:py-6 flex flex-row items-center justify-between">
        <div class="flex items-center flex-row gap-4">
            <div @click="sidebarControl.toggleStatus" class="rounded-full group hover:border-main transition-colors p-3 border-[1px] border-gray-200 cursor-pointer block lg:hidden">
                <i class="fa-solid fa-bars-staggered cursor-pointer pointer-events-none text-text text-lg group-hover:border-main transition-colors"></i>
            </div>
            <h2 class="text-title text-2xl font-semibold hidden md:block">Explore Projects</h2>
        </div>
        <div class="flex items-center flex-row gap-5">
            
            <div class="relative rounded-full group p-3 border-[1px] border-gray-200 hover:border-main transition-colors cursor-pointer">
                <i @click="dropdownControl.openDropdounList(dropDowns.NOTIFICATION)" class="fa-regular fa-bell text-text text-lg relative group-hover:text-main transition-colors">
                    <span class="block absolute -top-1.5 -right-0 w-2.5 h-2.5 bg-red-600 rounded-full"></span>
                </i>

                <div v-if="dropdownControl.active === dropDowns.NOTIFICATION" class=" absolute top-12 right-0 z-30 w-60 bg-back rounded-lg shadow-xl p-3">
                    <div class="flex items-center gap-3">
                        <i class="fa-solid fa-spinner text-text"></i>
                        <p class="text-sm text-text font-medium">Comming Soon...</p>
                    </div>
                </div>
            </div>
            <div class="relative cursor-pointer">
                <img @click="dropdownControl.openDropdounList(dropDowns.PROFILE)" class="rounded-full w-12 h-12 object-cover" :src="`/images/${authControl.userInfo?.gender === 'Male'? 'indian-male-man-svgrepo-com.svg':'avatar-female-girl-svgrepo-com.svg'}`" alt="">
                <div  v-if="dropdownControl.active === dropDowns.PROFILE" class=" absolute top-12 right-0 z-30 w-60 bg-back rounded-lg shadow-xl p-3">
                    <RouterLink v-if="authControl.userInfo" @click="dropdownControl.openDropdounList()" :to="`/profile/${authControl.userInfo?.id}`" class="flex items-center gap-3 p-2 rounded-lg hover:bg-hover transition-colors cursor-pointer">
                        <img class="rounded-full w-8" :src="`/images/${authControl.userInfo?.gender === 'Male'? 'indian-male-man-svgrepo-com.svg':'avatar-female-girl-svgrepo-com.svg'}`" alt="">
                        <div>
                            <h3 class="text-title text-[12px] font-medium">{{authControl.userInfo?.firstName +" "+ authControl.userInfo?.lastName}}</h3>
                            <p class="text-text text-[10px] font-medium">{{authControl.userInfo?.jobTitle}}</p>
                        </div>
                    </RouterLink>
                    <div class="mb-3">
                        <Line></Line>
                    </div>
                    <div @click="authControl.logout" class="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-hover transition-colors cursor-pointer">
                        <i class="pointer-events-none fa-solid fa-arrow-right-from-bracket text-text text-lg font-medium"></i>    
                        <h3 class="pointer-events-none text-title text-sm font-medium">Logout</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
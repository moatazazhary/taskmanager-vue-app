import { defineStore } from "pinia";
import { ref } from "vue";

export const useSidebar = defineStore('sidebar',()=>{
    const navbarStatus = ref(false);

    function toggleStatus(){
        navbarStatus.value = !navbarStatus.value
    }

    return {navbarStatus,toggleStatus}
});
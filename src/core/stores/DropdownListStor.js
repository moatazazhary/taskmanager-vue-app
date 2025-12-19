import { defineStore } from "pinia";
import { ref } from "vue";

export const useDropDownStore = defineStore('dropdownlist',()=>{
    const active = ref(null);

    function openDropdounList(key){
        active.value = active.value === key ? null : key;
    }
    
    return {active, openDropdounList}

})
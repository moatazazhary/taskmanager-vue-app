import { defineStore } from "pinia";
import { ref } from "vue";
import { useFillList } from "./FillSelectListStore";

export const useModalStore = defineStore('modal',()=>{
    const modalName = ref(null);
    const nestedModal = ref(null);

    function openModal(modalname,nested = null){
        modalName.value = modalname;
        nestedModal.value = nested;
    }

    function closeModal(){
        if(nestedModal.value){
            nestedModal.value = null;
            useFillList().resetNestedSelectedList();

        }else{
            modalName.value = null; 
            useFillList().resetAllSelectedList();
        }

        

    }


    return{modalName,nestedModal  , openModal , closeModal }
});
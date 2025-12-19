import { defineStore } from "pinia";
import { ref } from "vue";

export const useAlertStore = defineStore('alert',()=>{
    const isSuccess = ref(false);
    const isActive= ref(false);
    const isShow = ref(false);
    const sucessMessage = ref("Done Successfully");
    const errorMessage = ref("There is something wrong!");

    function Success(message){
        if(message){
            sucessMessage.value = message;
        }

        isSuccess.value = true;
        isActive.value = true;
        isShow.value = true;
        setTimeout(() => {
            isShow.value = false;
            setTimeout(() => {
                isActive.value = false;
            }, 400);
        },2000);
    }
    
    function failure(message){
        if(message){
            errorMessage.value = message;
        }

        isSuccess.value = false;
        isActive.value = true;
        isShow.value = true;
        setTimeout(() => {
            isShow.value = false;
            setTimeout(() => {
                isActive.value = false;
            }, 400);
        },2000);
    }

    return {isSuccess, isActive, isShow, sucessMessage, errorMessage, Success, failure}
});
import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/TasksService";
import { useAlertStore } from "../../../core/stores/AlertStore";


export const useTaskStore = defineStore('tasks',()=>{
    const selectedIds = ref([]);
    const addedItems = ref([]);
    const tasksList = ref([]);
    const loading = ref(false);

    async function GetAllTasks() {
        loading.value = true;
        const {data} = await api.GetAll();
        tasksList.value = data;
        loading.value = false;
    }

    async function started(task){
         console.log(task);
        task.isStarted = true
        const {data} = await api.UpdateTask(task.id,task);
        if(data){
            console.log(data);
            useAlertStore().Success("Task Started");
            return true;
        }else{
            useAlertStore().failure();
            return false;
        }
    }
    
    async function completed(task){
        task.isCompleted = true
        const {data} = await api.UpdateTask(task.id,task);
        if(data){
            useAlertStore().Success("Task Completed");
            return true;
        }else{
            useAlertStore().failure();
            return false;
        }
    }

    const addSelected = ()=>{
        console.log(selectedIds.value)
        let newItems = items.value.filter(item=> selectedIds.value.includes(item.id) && !addedItems.value.some(added => added.id === item.id));
        addedItems.value.push(...newItems);

        console.log(addedItems.value);
        newItems = []
        addedItems.value = []
        selectedIds.value = []
    };


    return{GetAllTasks,started,completed,tasksList,loading}
})
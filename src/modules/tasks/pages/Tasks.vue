<script setup>
    import TasksList from '../components/TasksList.vue'
    import ProjectsFiles from '../components/ProjectsFiles.vue'
    import { useDropDownStore } from '../../../core/stores/DropdownListStor';
    import { dropDowns } from '../../../core/utils/dropDowns';
import { useTaskStore } from '../store/TaskStore';
import { computed, onMounted,ref } from 'vue';
import Loader from '../../../core/components/loader.vue';
import { useAuthStore } from '../../../core/stores/AuthStore';

    const authControl = useAuthStore();
    const dropdownControl = useDropDownStore();
    const taskControl = useTaskStore();

    onMounted(async ()=>{
        await taskControl.GetAllTasks();
    });
    const tabName = ref('tasks');
    const tasks = computed(()=>{
        return taskControl.tasksList?.filter(t=>t.assignedId == authControl.userInfo?.id)
    });

    const priorityList = [
        {title:"All",state:null},
        {title:"Uregent",state:true},
        {title:"Not Uregent",state:false}
    ]
    const statusList = [
        {title:"All",state:null},
        {title:"In Process",state:false},
        {title:"Completed",state:true}
    ]

    const status = ref({
        title:'',
        state:null
    })
    const priority = ref({
        title:'',
        state:null
    })
    const filtredList = computed(()=>{
        return tasks.value?.filter(task=>{
            const priorityMatch = priority.value.state === null ? true : task.isUregen === priority.value.state;
            const statusMacth = status.value.state === null ? true : task.isCompleted === status.value.state;
            return priorityMatch && statusMacth
        })     
    })

</script>
<template>

    <Loader v-if="taskControl.loading"></Loader>
    <div v-else class="overflow-scroll pb-32 lg:pb-32 w-full h-screen p-5 lg:p-10">
        <div class="flex items-center justify-between bg-back rounded-lg shadow-lg shadow-gray-100 px-2 md:px-4 py-2">
            <div class="flex items-center gap-4 px-2 md:gap-10 md:px-4">
                <button @click="tabName = 'tasks'" :class="tabName === 'tasks'?'text-main':'text-title'"  class="outline-none border-none cursor-pointer text-[16px] font-medium hover:text-main transition-colors">Tasks</button>
                <button @click="tabName = 'projectsFile'" :class="tabName === 'projectsFile'?'text-main':'text-title'" class="outline-none border-none cursor-pointer text-[16px] font-medium hover:text-main transition-colors">Projects Files</button>
            </div>
            <div class="flex items-center gap-4">
                <div @click="dropdownControl.openDropdounList(dropDowns.FILLTER_STATUS_TASK)" class="relative bg-hover w-32 rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer">
                    <input :value="status.title" type="text" disabled class="cursor-pointer pointer-events-none outline-none block border-none text-sm text-text font-medium">
                    <i class="fa-solid fa-angle-down text-text absolute top-1/2 right-2 -translate-y-1/2"></i>
                    <div v-if="dropdownControl.active === dropDowns.FILLTER_STATUS_TASK" class="flex text-center flex-col items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                        <div v-for="item in statusList" @click="status.title = item.title;status.state = item.state" class="text-center text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                            {{item.title}}
                        </div>
                    </div>
                </div>
                <div @click="dropdownControl.openDropdounList(dropDowns.FILLTER_COMPLEXITY_TASK)" class="relative bg-hover w-32 rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer hidden md:block">
                    <input :value="priority.title" type="text" disabled class="cursor-pointer pointer-events-none outline-none block border-none text-sm text-text font-medium">
                    <i class="fa-solid fa-angle-down text-text absolute top-1/2 right-2 -translate-y-1/2"></i>
                    <div v-if="dropdownControl.active === dropDowns.FILLTER_COMPLEXITY_TASK" class="flex text-center flex-col items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                        <div v-for="item in priorityList" @click="priority.title = item.title;priority.state = item.state" class="text-center text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                           {{item.title}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <div v-if="!filtredList.length" class="mt-10 text-center w-full text-[16px] text-text font-medium">
            You dint have tasks yet...
        </div>
        <div v-else>
            <TasksList v-if="tabName === 'tasks'" :tasks="filtredList"></TasksList>
            <ProjectsFiles v-if="tabName === 'projectsFile'"></ProjectsFiles>
        </div>
    </div>
    
</template>
<script setup>
    import { computed, ref } from 'vue';
import { useDropDownStore } from '../../../core/stores/DropdownListStor';
    import { dropDowns } from '../../../core/utils/dropDowns';
    import { useProjectStore } from '../../projects/store/ProjectsStore';
    import { useFillList } from '../../../core/stores/FillSelectListStore';
    import { useEmployeeStore } from '../../employees/store/EmployeesStore';
    import ErrorSpan from '../../../core/components/ErrorSpan.vue';
import Button from '../../../core/components/Button.vue';

defineProps({
    isNewProject:Boolean
})
    const employeeControl = useEmployeeStore();
    const fillSelectList = useFillList()
    const projectControl = useProjectStore();
    const dropdownControl = useDropDownStore();

    const newTask = {isUregen:false,isCompleted:false,isStarted:false,date:new Date(Date.now()).toISOString().split('T')[0]};
    employeeControl.getAllEmployees();

    fillSelectList.fillComplextyList()

</script>

<template>
    <div class="w-72 lg:w-80 transition-all">
        <h2 class="text-lg text-title font-medium">Add Task</h2>
        <form @submit.prevent="isNewProject ? projectControl.addTask(newTask) : projectControl.addTaskToProject(newTask,projectControl.project.id)">
            <input v-model="newTask.title"  :class="{'border-red-500 hover:border-red-500 outline-red-500' : projectControl.taskValidate.title ? true : false}" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors" type="text" placeholder="What is the task?">
            <ErrorSpan v-if="projectControl.taskValidate.title ? true : false">
                {{ projectControl.taskValidate.title }}
            </ErrorSpan>
            <div class="w-full mt-4">
                <label for="" class="text-lg text-[16px] font-medium">Complexity</label>
                <div @click="dropdownControl.openDropdounList(dropDowns.COMPLEXITY_TASK)" :class="{'border-red-500 hover:border-red-500' : projectControl.taskValidate.complexityId ? true : false}" class="relative mt-2 z-40 bg-hover w-full rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer ">
                    <input :value="fillSelectList.selectTaskComplextytitle" type="text" disabled class="cursor-pointer pointer-events-none outline-none block border-none text-sm text-text font-medium">
                    <i class="fa-solid  absolute top-1/2 right-2 -translate-y-1/2" :class="dropdownControl.active === dropDowns.COMPLEXITY_TASK ? 'fa-angle-down text-main' :'fa-angle-up text-text'"></i>
                    <div v-if="dropdownControl.active === dropDowns.COMPLEXITY_TASK" class="flex text-left z-30 flex-col items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                        <div v-for="complexty in fillSelectList.ComplexitiesData" :key="complexty.id" @click="fillSelectList.SelectTaskCaomplexty(complexty)" class="text-left text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                            {{complexty.title}}
                        </div>
                    </div>
                </div>
                <ErrorSpan v-if="projectControl.taskValidate.complexityId ? true : false">
                    {{ projectControl.taskValidate.complexityId }}
                </ErrorSpan>
            </div>

            <div class="mt-5 flex flex-row gap-3 items-center ">
                <input v-model="newTask.isUregen" :value="newTask.isUregen" class="cursor-pointer" id="checkState" type="checkbox">
                <label for="checkState" class="cursor-pointer text-sm font-medium">Is Urgent ?</label>
            </div>

            <div  class="relative">
                <div @click="dropdownControl.openDropdounList(dropDowns.ASSIGN_NEW_TASKS_PROJECT)" class="mt-5 rounded-lg bg-back shadow-lg shadow-gray-200 w-full p-3 ">
                    <div class="flex items-center justify-between cursor-pointer">
                        <div class="flex items-center gap-2">
                            <i class="fa-solid fa-user-plus text-text"></i>
                            <span class="text-sm text-title font-medium">Assign task to</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div v-if="projectControl.count>0" class="flex items-center gap-1 text-text text-sm font-medium">
                                <i class="fa-regular fa-user"></i>
                                <span >{{ projectControl.count }}</span> 
                            </div>
                            <i class="fa-solid " :class="dropdownControl.active === dropDowns.ASSIGN_NEW_TASKS_PROJECT ? 'fa-angle-down text-main' :'fa-angle-up text-text'"></i>
                        </div>
                    </div>
                </div>

                <div v-if="dropdownControl.active === dropDowns.ASSIGN_NEW_TASKS_PROJECT" class="transition-all bg-back rounded-lg shadow-xl shadow-gray-200 p-3">
                    <div class="relative mt-2 outline-main bg-gray-50 text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full transition-colors">
                        <i class="fa-solid fa-magnifying-glass text-sm text-title absolute top-1/2 left-2 -translate-y-1/2"></i>
                        <input class="pl-7 bg-gray-50 placeholder:text-title text-sm font-medium w-full outline-none border-none" type="search" placeholder="search">
                    </div>
                    <div class="overflow-y-scroll h-20 mt-3">
                        <div v-for="item in employeeControl.list" :key="item.id" class="flex items-center justify-between p-2 rounded-lg hover:bg-hover transition-colors cursor-pointer" >
                            <label :for="item.id" class="">
                                <div class="flex items-center gap-3">
                                    <img class="rounded-full w-8" :src="`/images/${item?.gender === 'Male'? 'indian-male-man-svgrepo-com.svg':'avatar-female-girl-svgrepo-com.svg'}`" alt="">
                                    <div>
                                        <h3 class="text-title text-[12px] font-medium">{{ item.firstName +" "+ item.lastName }}</h3>
                                        <p class="text-text text-[10px] font-medium">{{ item.jobTitle }}</p>
                                    </div>
                                </div>
                            </label>
                            <input type="checkbox" :value="item.id" v-model="projectControl.selectedIds" :id="item.id">
                        </div>
                        
                    </div>
                    <div class="mt-5">
                        <button type="button" @click="projectControl.addSelected(employeeControl.list)" class="text-white text-sm font-medium rounded-lg bg-main  p-2 w-full outline-none border-none cursor-pointer hover:shadow-xl hover:text-back transition-shadow" >Assigned</button>
                    </div>
                </div>
            
            </div>

            <Button :isActive="true">Add Task</Button>
        </form>
    </div>
</template>
<script setup>
    import Line from '../../../core/components/Line.vue'
    import { useRoute } from 'vue-router';
    import { useProjectStore } from '../store/ProjectsStore';
    import { useTaskStore } from '../../tasks/store/TaskStore';
import Loader from '../../../core/components/loader.vue';
import { onMounted,defineProps, computed, ref } from 'vue';
import { useEmployeeStore } from '../../employees/store/EmployeesStore';
import Modal from '../../../core/components/ModalComponent/Modal.vue';
import EmployeeProjectTasks from './EmployeeProjectTasks.vue';
    import { dropDowns } from '../../../core/utils/dropDowns';
    import { useDropDownStore } from '../../../core/stores/DropdownListStor';
    import { useModalStore } from '../../../core/stores/ModalStore';
        // const props = defineProps({
        //     projectTaks:Object,
        // })
        // onMounted(async ()=>{
        //     await taskControl.GetAllTasks();
        //    // projectTasks.value = projectControl.getProjectTasks(taskControl.tasksList,rout.params.id);
        //     projectControl.getProjectTasks(taskControl.tasksList,rout.params.id)
        //     console.log(projectControl.ProjectTasksList)
        // })


    const rout = useRoute()
    const modalControl = useModalStore();
    
    const employeeControl = useEmployeeStore();
    const taskControl = useTaskStore()
    const projectControl = useProjectStore();

    projectControl.getProject(rout.params.id);
    const projectTaks = projectControl.getProjectTasks(taskControl.tasksList,rout.params.id)
    
const employeeWithTaksCount = computed(()=>{
    const map = {};

    projectTaks.tasks.forEach(task => {
        task.assignedId.forEach(empId=>{
            // counter[empId] = ( counter[empId] || 0 )+ 1
            if(!map[empId]){
                map[empId]={
                    tasks:[],
                    taskCount:0
                }
            }

            map[empId].tasks.push(task);
            map[empId].taskCount++
        })
    });

    return employeeControl.list.filter(emp=> map[emp.id]).map(emp=>({
        ...emp,
        taskCount : map[emp.id].taskCount,
        tasks: map[emp.id].tasks
    }));
})



const employee = ref({isActive:false})
const getEmployeeTasks = computed(()=>{
    
    return (id)=>{
        modalControl.modalName = 'employeeTasks'
        employee.value.data = employeeWithTaksCount.value.filter(e=>e.id === id);
        employee.value.isActive = true;
    }
})
    
</script>
<template>

    <Modal v-if="modalControl.modalName === 'employeeTasks'">
        <EmployeeProjectTasks :employee="employee"></EmployeeProjectTasks>
    </Modal>
    <Loader v-if="taskControl.loading"></Loader>
    <div v-else>
        <h3 class="text-sm text-title font-semibold">Project Details</h3>
        <h2 class="text-3xl mt-5 text-title font-bold">{{projectControl.project.title}}</h2>
        <p class="text-sm mt-3 text-text font-semibold">{{projectControl.project.category}}</p>
        <div class="my-6">
            <h2 class="text-2xl text-title font-semibold">Project Team</h2>
            <div class="flex flex-col mt-4 gap-1">
                <div v-for="employee in employeeWithTaksCount">
                    <div  @click="getEmployeeTasks(employee.id)" class="flex flex-row items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-hover transition-colors ">
                        <div class="flex items-center gap-2 pointer-events-none">
                            <img class="rounded-full w-8" :src="`/images/${employee?.gender === 'Male'? 'indian-male-man-svgrepo-com.svg':'avatar-female-girl-svgrepo-com.svg'}`" alt="">
                            <div>
                                <h3  class="text-title text-sm font-medium">{{employee.firstName +" "+ employee.lastName}}</h3>
                                <p class="text-text text-[12px] mt-0.5 font-medium">{{employee.jobTitle}}</p>
                            </div>
                        </div>
                        <p class="text-sm text-title font-bold">{{employee.taskCount > 1 ? `${employee.taskCount} Tasks`:`${employee.taskCount} Task`}}</p>
                    </div>
                    <Line></Line>
                </div>
            </div>
        </div>
        <div >
            <h2 class="text-2xl text-title font-semibold">Task File</h2>
            <div class="flex mt-2 flex-row items-center justify-between">
                <h3 class="text-sm text-text font-semibold">Last Modified</h3>
                <p class="text-sm text-title font-bold">11 jun 2025</p>
            </div>
            <Line></Line>
            <div class="flex flex-col mt-5 gap-3">
                <div class="flex items-center justify-between p-2 rounded-lg cursor-default hover:bg-hover transition-colors" v-for="value in 3">
                    <div class="flex items-center gap-5">
                        <img class="w-8" src="/icons/Excel.svg" alt="">
                        <h4 class="text-sm font-medium text-title">task-one-details.xlsx</h4>
                        <span class="text-[12px] text-title font-medium">12MB</span>
                    </div>
                    <button class="outline-none border-none text-text cursor-pointer hover:text-main transition-colors"><i class="fa-solid fa-xmark"></i></button>
                </div>
            </div>
            <input type="file" hidden name="" id="upload">
            <label for="upload" class="mt-6 flex items-center justify-center gap-2 font-medium text-sm text-title border-2 w-fit mx-auto border-dashed border-title px-6 py-3 rounded-xl cursor-pointer hover:text-main hover:border-main transition-colors">
                <i class="fa-solid fa-upload"></i>
                <span>Upload File</span>
            </label>
        </div>

        <button class="text-white text-[16px] font-medium rounded-lg bg-main  p-3 w-full outline-none border-none mt-10 cursor-pointer hover:shadow-xl hover:text-back transition-shadow" >Submit</button>

    </div>
</template>
<script setup>
    import EmployeeDetailsFrom from '../components/EmployeeDetailsForm.vue'
    import EmployeePasswordForm from '../components/EmployeePasswordForm.vue'
    import EmployeeProjects from '../components/EmployeeProjects.vue'
    import EmployeeTasks from '../components/EmployeeTasks.vue'
    import Line from '../../../core/components/Line.vue'
import { computed, onMounted, ref } from 'vue'
import { useEmployeeStore } from '../store/EmployeesStore'
import { useRoute } from 'vue-router'
import { useFillList } from '../../../core/stores/FillSelectListStore'
import Loader from '../../../core/components/loader.vue'
import { useProjectStore } from '../../projects/store/ProjectsStore'
import { useTaskStore } from '../../tasks/store/TaskStore'
import { useAuthStore } from '../../../core/stores/AuthStore'
import DeleteModal from '../../../core/components/ModalComponent/DeleteModal.vue'
import { useModalStore } from '../../../core/stores/ModalStore'

    const authControl = useAuthStore();
    const rout = useRoute();


    const isUser = computed(()=>{
        return parseInt(rout.params.id) === authControl.userInfo?.id
    })
    const modalControl = useModalStore();
    const employeeControl = useEmployeeStore();
    const profileTaps = [`${isUser.value ? "My Details":"Details"}`,"Password","Projects","Tasks"]
    const tapName = ref(profileTaps[0]);
    const fillSelectList = useFillList();
    let employeeProjectsWithTasks;


    const filteredTaps = computed(()=>{
        return isUser.value ? profileTaps : profileTaps.filter(t=>t !== "Password")
    })
    const employee = ref({})

 
    onMounted(async ()=>{
        
        if(!isUser.value){
            employee.value = await employeeControl.getEmployee(rout.params.id);
        }else{
            employee.value = authControl.userInfo
        }

        await fillSelectList.fillRoleList();
        await fillSelectList.fillJobtiteList();

        if(employee){
            fillSelectList.selectJobtitleId = employee.JobtitleId
            fillSelectList.selectJobTitletitle = employee.jobTitle
            fillSelectList.selectRoleId = employee.roleId
            fillSelectList.selectRoleTitle = employee.role
        }

        await useProjectStore().getAllProjects()
        await useTaskStore().GetAllTasks()
        await useEmployeeStore().getAllEmployees()

        employeeProjectsWithTasks = computed(()=>{
            const result = {}
            useTaskStore().tasksList.forEach(task=>{

                if(!task.assignedId.includes(employee.value.id))
                    return
                if(!result[task.projectId]){
                    const project = useProjectStore().list.find(p=>p.id === task.projectId);
                    if(!project)
                        return
                    result[task.projectId]={
                        ...project,
                        tasks:[]
                    }
                }

                result[task.projectId].tasks.push(task)
            })

            return Object.values(result);
        })

    })
    


</script>
<template>
    <DeleteModal :is-active="true" v-if="modalControl.modalName === 'Delete'">
        <input type="text" hidden>
    </DeleteModal>
    <Loader v-if="employeeControl.loading"></Loader>
    <div v-else class="overflow-scroll w-full h-screen pb-32 lg:pb-32 p-5 lg:p-10">
        <div class="w-full rounded-xl bg-back shadow-xl shadow-gray-200">
            <div class="relative">
                <img class="w-full h-48 object-cover rounded-xl md:h-60 lg:h-72" src="/images/Styles=2.svg" alt=""></img>
                <div class="overflow-hidden absolute -bottom-14 left-10 w-28 h-28 border-6 rounded-full border-back">
                    <div class="relative w-full h-full">
                        <img class=" w-28 h-28 rounded-full object-cover" :src="`/images/${employee.gender === 'Male'? 'indian-male-man-svgrepo-com.svg':'avatar-female-girl-svgrepo-com.svg'}`" alt=""></img>
                        <div v-if="false" class="absolute top-0 left-0 w-full h-full flex items-center justify-center z-40 bg-[#eee] ">
                            <i class="fa-regular fa-images text-[12px] text-text animate-ping"></i>
                        </div>
                    </div>
                </div>
                <input type="file" hidden id="uploadProfilePic">
                <label for="uploadProfilePic" class="group absolute -bottom-11 left-32 p-2 bg-back rounded-full shadow-lg shadow-gray-300 cursor-pointer transition-colors">
                    <i class="fa-solid fa-eye-dropper group-hover:text-main transition-colors"></i>
                </label>
                <span v-if="false" class="absolute -bottom-20 left-12 text-red-500 text-sm font-medium " >* size must be 12MB</span>
                <div class="absolute right-4 -bottom-16">
                    <button type="button" v-if="authControl.isMentor && isUser" @click="modalControl.modalName = 'Delete'" class="text-white text-[16px] font-medium rounded-lg bg-red-500 px-5 py-2 w-full outline-none border-none cursor-pointer hover:shadow-xl hover:text-back transition-shadow" >Delete</button>
                </div>
            </div>
            <div class="p-7 mt-20">
                <div class="flex items-center gap-4 md:gap-10">
                    <button type="button" v-for="tap in filteredTaps" @click="tapName = tap" :class="tapName === tap ?'text-main':'text-title'" class="outline-none border-none cursor-pointer   font-medium hover:text-main transition-colors text-sm md:text-lg">{{tap}}</button>
                </div>
                <Line></Line>

                <div class="mt-10">

                    <div v-if="tapName === profileTaps[0]">
                        <div v-if="!isUser" class="flex flex-col gap-3">
                            <h3 class="text-sm text-title font-medium">Full Name : <span class="text-text font-medium">{{ authControl.userInfo?.firstName + authControl.userInfo?.lastName }}</span></h3>
                            <h3 class="text-sm text-title font-medium">Email : <span class="text-text font-medium">{{authControl.userInfo?.email}}</span></h3>
                            <h3 class="text-sm text-title font-medium">Job Title : <span class="text-text font-medium">{{ authControl.userInfo?.jobTitle }}</span></h3>
                            <h3 class="text-sm text-title font-medium">Gender : <span class="text-text font-medium">{{authControl.userInfo?.gender}}</span></h3>
                        </div>
                        <EmployeeDetailsFrom :employee="employee" v-if="isUser" ></EmployeeDetailsFrom>
                    </div>
                    <EmployeePasswordForm :employee="employee" v-if="tapName === 'Password' && isUser"></EmployeePasswordForm>
                    <EmployeeProjects :projects="employeeProjectsWithTasks" v-if="tapName === 'Projects'"></EmployeeProjects>
                    <EmployeeTasks v-if="tapName === 'Tasks'"></EmployeeTasks>
                </div>
            </div>
        </div>
    </div>
</template>
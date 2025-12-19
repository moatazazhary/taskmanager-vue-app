<script setup>
    import project from '../components/project.vue';
    import Modal from '../../../core/components/ModalComponent/Modal.vue'
    import ProjectForm from '../components/ProjectFrom.vue'
    import Alert from '../../../core/components/Alerts/alert.vue';
    import { useAlertStore } from '../../../core/stores/AlertStore.js';

    import { useModalStore } from '../../../core/stores/ModalStore.js';
    import { useDropDownStore } from '../../../core/stores/DropdownListStor.js';
    import { dropDowns } from '../../../core/utils/dropDowns.js';
    import { modalNames } from '../../../core/utils/modalNames.js';
    import { useProjectStore } from '../store/ProjectsStore.js';

    import { ref, computed, onMounted} from 'vue';
    import Loader from '../../../core/components/loader.vue';
import { useAuthStore } from '../../../core/stores/AuthStore.js';

    const authControl = useAuthStore();
    const projectControl = useProjectStore();
    const modalControl = useModalStore();
    const dropdownControl = useDropDownStore();
    const alertControl = useAlertStore();

        onMounted(()=>{
        if(!projectControl.list.length)
            projectControl.getAllProjects();
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

    projectControl.GetAllTasks();
    
    const status = ref({
        title:'',
        state:null
    })
    const priority = ref({
        title:'',
        state:null
    })
    const filtredList = computed(()=>{
        return projectControl.list?.filter(proj=>{
            const priorityMatch = priority.value.state === null ? true : proj.isUregen === priority.value.state;
            const statusMacth = status.value.state === null ? true : proj.isCompleted === status.value.state;
            return priorityMatch && statusMacth
        })     
    })


</script>
<template>
    <Alert v-if="alertControl.isActive" ></Alert>
    <Modal v-if="modalControl.modalName === modalNames.ADD_PROJECT">
        <ProjectForm :isNewProject="true"></ProjectForm>
    </Modal>
    <Loader v-if="projectControl.loading"></Loader>
    <div v-else class="overflow-scroll w-full h-screen pb-32 lg:pb-32 p-5 lg:p-10">
        <div class="flex items-center justify-between bg-back rounded-lg shadow-lg shadow-gray-100 px-2 md:px-4 py-2">
            <div class="flex items-center gap-4 px-2 md:gap-10 md:px-4">
                <h2 class="text-lg text-title font-medium">Projects</h2>
            </div>
            <div class="flex items-center gap-4">
                <div @click="dropdownControl.openDropdounList(dropDowns.FILLTER_IsOregen_PROJECT)" class="relative bg-hover w-32 rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer">
                    <input :value="priority.title" placeholder="Priority" type="text" disabled class="cursor-pointer pointer-events-none outline-none block border-none text-sm text-text font-medium">
                    <i class="fa-solid fa-angle-down text-text absolute top-1/2 right-2 -translate-y-1/2"></i>
                    <div v-if="dropdownControl.active === dropDowns.FILLTER_IsOregen_PROJECT" class="flex text-center flex-col items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                        <div v-for="item in priorityList" @click="priority.title = item.title;priority.state = item.state;" class="text-center text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                            {{item.title}}
                        </div>
                    </div>
                </div>
                <div @click="dropdownControl.openDropdounList(dropDowns.FILLTER_STATUS_PROJECT)" class="relative bg-hover w-32 rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer hidden md:block">
                    <input :value="status.title" placeholder="Status" type="text" disabled class="cursor-pointer pointer-events-none outline-none block border-none text-sm text-text font-medium">
                    <i class="fa-solid fa-angle-down text-text absolute top-1/2 right-2 -translate-y-1/2"></i>
                    <div v-if="dropdownControl.active === dropDowns.FILLTER_STATUS_PROJECT" class="flex text-center flex-col items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                        <div v-for="item in statusList" @click="status.title = item.title;status.state = item.state" class="text-center text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                            {{item.title}}
                        </div>
                    </div>
                </div>
                <button v-if="authControl.isMentor" @click="modalControl.openModal(modalNames.ADD_PROJECT)" class="cursor-pointer outline-none border-none text-sm lg:text-[16px] flex items-center gap-1 lg:gap-2 bg-main rounded-lg text-white py-2 px-3 lg:px-6 hover:shadow-xl transition-shadow">
                    <i class="fa-solid fa-plus"></i>
                    <span>Add Project</span>
                </button>
            </div>
        </div>

        <div v-if="!projectControl.list.length" class="mt-10 text-center w-full text-[16px] text-text font-medium">
            No Data Yet , Start by adding projects...
        </div>
        <p v-if="!filtredList.length" class="mt-10 text-center w-full text-[16px] text-text font-medium">No projects ...</p>
        <div v-else class="mt-10 grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3  gap-6">
            
            <project v-for="project in filtredList" :data="project"></project>
        </div>
    </div>
</template>


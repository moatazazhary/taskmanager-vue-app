<script setup>
    import ExstraDetails from '../components/ExstraDetails.vue'
    import card from '../../../core/components/Card.vue'
    import Modal from '../../../core/components/ModalComponent/Modal.vue'
    import SetMentorForm from '../components/SetMentorForm.vue'
    import loader from '../../../core/components/loader.vue'
    import { useTaskStore } from '../../tasks/store/TaskStore'
    import { useProjectStore } from '../store/ProjectsStore'
    import { useRoute } from 'vue-router'
    import {  onMounted, ref } from 'vue'
    import { useEmployeeStore } from '../../employees/store/EmployeesStore'
    import { useModalStore } from '../../../core/stores/ModalStore'
    import AddTaskForm from '../../tasks/components/AddTaskForm.vue'
    import ProjectFrom from '../components/ProjectFrom.vue'
    import { modalNames } from '../../../core/utils/modalNames'
import { useAuthStore } from '../../../core/stores/AuthStore'
import DeleteModal from '../../../core/components/ModalComponent/DeleteModal.vue'

    const rout = useRoute()
    const projectControl = useProjectStore();
    const taskControl = useTaskStore();
    const employeeControl = useEmployeeStore();
    const modalControl = useModalStore();
    const authControl = useAuthStore();

    projectControl.getProject(rout.params.id);
  
    const tasksNum = ref(0);
    const completedTasksNum = ref(0);
    const projectTasks = ref([]);
    const mentor = ref('');
    onMounted(async ()=>{
        await employeeControl.getAllEmployees();
        await taskControl.GetAllTasks();
        projectTasks.value = projectControl.getProjectTasks(taskControl.tasksList,rout.params.id);
        projectControl.getProjectTasks(taskControl.tasksList,rout.params.id)
        
        if(projectControl.project.mentorId){
            mentor.value = employeeControl.list.find(e=>e.id ===projectControl.project.mentorId);
        }
        tasksNum.value = projectTasks.value.tasks.length;
        completedTasksNum.value = projectTasks.value.tasks.filter(t=>t.isCompleted).length;
    })


</script>
<template>
    <DeleteModal v-if="modalControl.modalName === 'Delete'" :is-active="true">
        <input type="text" hidden>
    </DeleteModal>
    <Modal v-if="modalControl.modalName === modalNames.AD_TASK_TOPROJECT">
        <AddTaskForm :is-new-project="false"></AddTaskForm>
    </Modal>

    <Modal v-if="modalControl.modalName === 'setMentor'">
        <SetMentorForm :project="projectControl.project" :employees="employeeControl.list"></SetMentorForm>
    </Modal>

    <Modal v-if="modalControl.modalName === modalNames.EDIT_PROJECT">
        <ProjectFrom :project="projectControl.project" :isNewProject="false"></ProjectFrom>
    </Modal>

    <loader v-if="taskControl.loading"></loader>
    <div v-else class="overflow-scroll w-full h-screen pb-32 lg:pb-32 p-5 lg:p-10">
        <div class="flex flex-col xl:flex-row gap-5">
            <div class="bg-back rounded-2xl border-[1px] w-full border-gray-100">
                <card>
                    <div class="flex items-center justify-between pb-6">
                        <div v-if="authControl.isMentor" class="flex items-center gap-3">
                            <button type="button" @click="modalControl.modalName = modalNames.EDIT_PROJECT" class="cursor-pointer outline-none border-none text-sm lg:text-[16px] flex items-center gap-1 lg:gap-2 bg-main rounded-lg text-white py-2 px-3 lg:px-6 hover:shadow-xl transition-shadow">
                                <i class="fa-regular fa-pen-to-square"></i>
                                <span>Edit</span>
                            </button>
                            <button type="button" @click="modalControl.openModal(modalNames.AD_TASK_TOPROJECT)" class="cursor-pointer outline-none font-medium border-none text-sm lg:text-[16px] flex items-center gap-1 lg:gap-2 bg-hover rounded-lg text-title py-2 px-3 lg:px-6 hover:shadow-xl transition-shadow">
                                <i class="fa-regular fa-pen-to-square"></i>
                                <span>Add Tasks</span>
                            </button>
                        </div>
                        <p :class="projectControl.project.isCompleted ? 'bg-green-300':'bg-[#fed3b9]'" class=" text-back text-[12px] px-2 py-0.5 font-medium rounded-lg text-center" >{{projectControl.project.isCompleted ? 'Completed':'In Process'}}</p>
                    </div>
                    <img class="rounded-2xl h-52 md:h-72 lg:h-96 w-full object-cover" src="/images/Styles=3.svg" alt="">
                    <div class="p-6">
                        <div>
                            <h3 class="text-3xl text-title font-bold">{{projectControl.project.title}}</h3>
                            <div class="flex flex-row items-center gap-2 mt-2">
                                <p class="text-sm text-text font-semibold">{{projectControl.project.category}}</p> <span class="text-gray-200">|</span>
                                <div v-if="authControl.isMentor">
                                    <a v-if="!mentor" @click="modalControl.modalName = 'setMentor'" href="javascript:;" class="text-sm text-main font-medium">+ Set mentor</a>
                                    <p v-if="mentor" class="text-sm text-main font-medium">{{mentor.firstName+" "+mentor.lastName}}</p>

                                </div>
                            </div>
                            <div class="flex items-center gap-3 mt-3">
                                <div class=" flex items-center gap-2">
                                    <i class="fa-regular fa-clock font-semibold text-text"></i>
                                    <span class="text-[16px] text-title font-semibold">{{ projectControl.diffDate(projectControl.project.startDate,projectControl.project.endDate) }}</span>
                                </div>
                                <span class="text-in-active">|</span>
                                <div class="flex items-center gap-2">
                                    <p :class="projectControl.project.isUregen ? 'bg-[#feb9b9]':'bg-[#b9cbfe]'" class=" text-back text-[12px] px-2 py-0.5 font-medium rounded-lg text-center" >{{projectControl.project.isUregen ? 'Uregent':'Normal'}}</p>
                                    <p v-if="projectControl.project.isCompleted" class="bg-[#b9c9fe] text-back text-[12px] px-2 py-0.5 font-medium rounded-lg text-center" >in process</p>
                                </div>
                            </div>
                        </div>
                        <div class="my-6">
                            <h2 class="text-2xl text-title font-semibold">Description</h2>
                            <p class="text-title text-sm font-medium mt-3"> {{projectControl.project.description}}</p>
                        </div>
                        <div>
                            <div class="flex items-center gap-10">
                                <h2 class="text-2xl text-title font-semibold">Essence of Tasks</h2>
                                <div class="flex items-center gap-2" :class="(tasksNum >0) && completedTasksNum === tasksNum ?'text-green-500':'text-in-active'">
                                    <i class="fa-circle-check " :class="(tasksNum >0) && completedTasksNum === tasksNum ?'fa-solid':'fa-regular'"></i>
                                    <span class=" text-sm font-medium" >{{completedTasksNum}}/{{tasksNum}}</span>
                                </div>
                            </div>
                            <div class="flex flex-col gap-3 mt-3">
                                <div class="mt-2 flex flex-row gap-2" v-for="task in projectTasks.tasks">
                                    <span>
                                        <i class="text-lg" :class="task.isCompleted ? 'fa-solid fa-circle-check text-green-500':'fa-regular fa-clock text-text'"></i>
                                    </span>
                                    <p class="text-title text-[16px] font-medium">{{task.title}}</p>
                                </div>
                            </div>
                        </div>

                        <button type="button" @click="modalControl.modalName ='Delete'" v-if="authControl.isMentor" class="text-white text-[16px] font-medium rounded-lg bg-red-500  p-3 w-full outline-none border-none mt-10 cursor-pointer hover:shadow-xl hover:text-back transition-shadow" >Delete Project</button>
                    </div>
                </card>
            </div>
            <div class="bg-back rounded-2xl border-[1px] w-full xl:w-2xl h-fit border-gray-100 p-8">
                <ExstraDetails></ExstraDetails>
            </div>
        </div>
    </div>
</template>
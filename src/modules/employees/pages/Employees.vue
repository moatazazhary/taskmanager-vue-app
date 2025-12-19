<script setup>
    import EmployeeCard from '../components/EmployeeCard.vue'
    import EmployeeFrom from '../components/EmployeeForm.vue'
    import Modal from '../../../core/components/ModalComponent/Modal.vue'
    import { useModalStore } from '../../../core/stores/ModalStore';
    import { modalNames } from '../../../core/utils/modalNames';
    import { useEmployeeStore } from '../store/EmployeesStore';
    import Loader from '../../../core/components/loader.vue';
    import { computed, ref } from 'vue';
import { useAuthStore } from '../../../core/stores/AuthStore';

const authControl = useAuthStore()
    const employeeControl = useEmployeeStore();
    const modalControl = useModalStore();

    employeeControl.getAllEmployees();

    const mentors = computed(()=>{
        return employeeControl.list?.filter(e=>e.role == "Mentor");
    })
    const tapName = ref('Employee')

</script>
<template>
    <Modal v-if="modalControl.modalName === modalNames.ADD_EMPLOYEE">
        <EmployeeFrom ></EmployeeFrom>
    </Modal>

    <Loader v-if="employeeControl.loading"></Loader>
    <div v-else class="overflow-scroll w-full h-screen pb-32 lg:pb-32 p-5 lg:p-10">
        <div class="flex items-center justify-between bg-back rounded-lg shadow-lg shadow-gray-100 px-2 md:px-4 py-2">
            <div class="flex items-center gap-4 px-2 md:gap-10 md:px-4">
                <button type="button" @click="tapName = 'Employee'" :class="tapName === 'Employee' ? 'text-main':'text-title'"  class="outline-none border-none cursor-pointer text-[16px] font-medium hover:text-main transition-colors">Employees</button>
                <button type="button" @click="tapName = 'Mentor'" :class="tapName === 'Mentor' ? 'text-main':'text-title'"  class="outline-none border-none cursor-pointer text-[16px] font-medium hover:text-main transition-colors">Mentors</button>
            </div>
            <button v-if="authControl.isMentor" @click="modalControl.openModal(modalNames.ADD_EMPLOYEE)" class="cursor-pointer outline-none border-none text-sm lg:text-[16px] flex items-center gap-1 lg:gap-2 bg-main rounded-lg text-white py-2 px-3 lg:px-6 hover:shadow-xl transition-shadow">
                <i class="fa-solid fa-plus"></i>
                <span>Add Employee</span>
            </button>
        </div>


        <div v-if="!employeeControl.list.length" class="mt-10 text-center w-full text-[16px] text-text font-medium">
            No Data Yet , Start by adding projects...
        </div>

        <div v-else class="grid grid-cols-1 mt-5 gap-6 xl:grid-cols-3 md:grid-cols-2 lg:mt-10">
            <EmployeeCard v-if="tapName === 'Employee'"  v-for="employee in employeeControl.list" :data="employee"></EmployeeCard>
             <EmployeeCard v-if="tapName === 'Mentor'"  v-for="mentor in mentors" :data="mentor"></EmployeeCard>
            
            <!-- <div v-if="tapName === 'Mentor'" class="flex text-center items-center gap-3">
                <i class="fa-solid fa-spinner text-text"></i>
                <p class="text-sm text-text font-medium">Comming Soon...</p>
            </div> -->
        </div>
    </div>
</template>
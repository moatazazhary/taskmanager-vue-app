<script setup>
    import { onMounted } from 'vue';
import Button from '../../../core/components/Button.vue';
import ErrorSpan from '../../../core/components/ErrorSpan.vue';
import { useDropDownStore } from '../../../core/stores/DropdownListStor';
import { useFillList } from '../../../core/stores/FillSelectListStore';
    import { dropDowns } from '../../../core/utils/dropDowns';
import { useEmployeeStore } from '../store/EmployeesStore';

    const props = defineProps({
        employee:Object
    })

    const fillSelectList = useFillList();
    const dropdownControl = useDropDownStore();
    const employeeControl = useEmployeeStore();

//    onMounted(()=>{

    
//    })

   if(props.employee){
        fillSelectList.selectJobtitleId = props.employee.jobTitleId
        fillSelectList.selectJobTitletitle = props.employee.jobTitle
        fillSelectList.selectRoleId = props.employee.roleId
        fillSelectList.selectRoleTitle = props.employee.role
    }


</script>

<template>
    <form @submit.prevent="employeeControl.updateEmployee(props.employee.id,props.employee)" class="w-full md:w-[600px]">
        <div class="flex w-full flex-col gap-3 md:flex-row md:gap-10">
            <div >
                <div class="flex md:items-center flex-col gap-5 md:flex-row">
                    <div>
                        <label for="" class="text-lg text-[16px] font-medium">First Name</label>
                        <input v-model="props.employee.firstName" :class="{'border-red-500 hover:border-red-500 outline-red-500' : employeeControl.validate.firstName ? true : false}" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors " type="text">
                        <ErrorSpan v-if="employeeControl.validate.firstName ? true : false">
                            {{ employeeControl.validate.firstName }}
                        </ErrorSpan>
                    </div>
                    <div>
                        <label for="" class="text-lg text-[16px] font-medium">Last Name</label>
                        <input v-model="props.employee.lastName" :class="{'border-red-500 hover:border-red-500 outline-red-500' : employeeControl.validate.lastName ? true : false}" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors " type="text">
                        <ErrorSpan v-if="employeeControl.validate.lastName ? true : false">
                            {{ employeeControl.validate.lastName }}
                        </ErrorSpan>
                    </div>
                </div>
                <input type="text" v-model="props.employee.gender" class="hidden">
                <div class="mt-4">
                    <label for="" class="text-lg text-[16px] font-medium">Email</label>
                    <div class="relative mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors" :class="{'border-red-500 hover:border-red-500' : employeeControl.validate.email ? true : false}">
                        <i class="fa-regular fa-envelope text-lg text-text absolute top-0 left-2 translate-y-1/2"></i>
                        <input v-model="props.employee.email" class="pl-7 bg-[#fefefe] text-sm font-medium w-full outline-none border-none" type="text">
                    </div>
                    <ErrorSpan v-if="employeeControl.validate.email ? true : false">
                        {{ employeeControl.validate.email }}
                    </ErrorSpan>
                </div>
                <div class="flex flex-col gap-4 mt-4 md:flex-row md:items-center">
                    <div class="">
                        <label for="" class="text-lg text-[16px] font-medium">Role</label>
                        <div @click="dropdownControl.openDropdounList(dropDowns.EDIT_ROLE)" :class="{'border-red-500 hover:border-red-500' : employeeControl.validate.roleId ? true : false}" class="relative mt-2 bg-hover w-32 rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer ">
                            <input :value="fillSelectList.selectRoleTitle" type="text" disabled class="cursor-pointer pointer-events-none outline-none block border-none text-sm text-text font-medium">
                            <i class="fa-solid fa-angle-down text-text absolute top-1/2 right-2 -translate-y-1/2"></i>
                            <div v-if="dropdownControl.active === dropDowns.EDIT_ROLE" class="flex text-center flex-col items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                                <div v-for="role in fillSelectList.RolesData" @click="fillSelectList.SelectRole(role)" class="text-center text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                                    {{role.title}}
                                </div>
                            </div>
                        </div>
                        <ErrorSpan v-if="employeeControl.validate.roleId ? true : false">
                            {{ employeeControl.validate.roleId }}
                        </ErrorSpan>
                    </div>
                    <div class="w-full">
                        <label for="" class="text-lg text-[16px] font-medium">Job Title</label>
                        <div @click="dropdownControl.openDropdounList(dropDowns.EDIT_JOPTITLE)" :class="{'border-red-500 hover:border-red-500' : employeeControl.validate.jobTitleId ? true : false}" class="relative mt-2 bg-hover w-full rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer">
                            <input :value="fillSelectList.selectJobTitletitle" type="text" disabled class=" cursor-pointer pointer-events-none outline-none block border-none text-sm text-text font-medium">
                            <i class="fa-solid fa-angle-down text-text absolute top-1/2 right-2 -translate-y-1/2"></i>
                            <div v-if="dropdownControl.active === dropDowns.EDIT_JOPTITLE" class="flex text-center flex-col items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                                <div v-for="jobTitle in fillSelectList.jobTitlesData" @click="fillSelectList.SelectJobTitle(jobTitle)" class="text-center text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                                    {{jobTitle.title}}
                                </div>
                            </div>
                        </div>
                        <ErrorSpan v-if="employeeControl.validate.jobTitleId ? true : false">
                            {{ employeeControl.validate.jobTitleId }}
                        </ErrorSpan>
                    </div>
                </div>
            </div>

            <div class=" w-full">
                <label for="" class="text-lg text-[16px] font-medium">About</label>
                <textarea v-model="props.employee.about" :class="{'border-red-500 hover:border-red-500 outline-red-500' : employeeControl.validate.about ? true : false}" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors" rows="5" name="" id=""></textarea>
                <ErrorSpan v-if="employeeControl.validate.about ? true : false">
                    {{ employeeControl.validate.about }}
                </ErrorSpan>
            </div>
        </div>

        <Button :is-active="true">Save Changes</Button>
    </form>
</template>
<script setup>
    import Button from '../../../core/components/Button.vue';
    import { useDropDownStore } from '../../../core/stores/DropdownListStor';
    import { useEmployeeStore } from '../store/EmployeesStore';
    import { dropDowns } from '../../../core/utils/dropDowns';
    import ErrorSpan from '../../../core/components/ErrorSpan.vue';
import { reactive, ref } from 'vue';
import { useFillList } from '../../../core/stores/FillSelectListStore';


    const fillSelectList = useFillList();
    const employeeControl = useEmployeeStore();
    const dropdownControl = useDropDownStore();

    fillSelectList.fillJobtiteList();
    fillSelectList.fillRoleList();

    const newEmployee = {
        firstName:'',
        lastName:'',
        email:'',
        password:'',
        about:''
    };

    const gender = ["Male","Female"]
</script>

<template>
    <h2 class="text-lg text-title font-medium">Add New Employee</h2>

    <form @submit.prevent="employeeControl.AddEmployee(newEmployee)" class="mt-10">

        <div class="flex gap-10 flex-col overflow-y-scroll h-[400px] w-[300px] pr-6 md:pr-0 md:h-auto md:overflow-hidden md:w-auto md:flex-row ">
            <div class="">
                <div class="flex flex-col gap-5 md:flex-row">
                    <div>
                        <label for="firstName" class="text-lg text-[16px] font-medium">First Name</label>
                        <input id="firstName" v-model="newEmployee.firstName" :class="{'border-red-500 hover:border-red-500 outline-red-500' : employeeControl.validate.firstName ? true : false}" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors " type="text">
                        <ErrorSpan v-if="employeeControl.validate.firstName ? true : false">
                            {{ employeeControl.validate.firstName }}
                        </ErrorSpan>
                    </div>
                    <div>
                        <label for="lastName" class="text-lg text-[16px] font-medium">Last Name</label>
                        <input id="lastName" v-model="newEmployee.lastName"  :class="{'border-red-500 hover:border-red-500 outline-red-500' : employeeControl.validate.lastName ? true : false}" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors " type="text">
                    
                        <ErrorSpan v-if="employeeControl.validate.lastName ? true : false">
                            {{ employeeControl.validate.lastName }}
                        </ErrorSpan>
                    </div>
                </div>

      
                <div class=" mt-4">
                    <label for="" class="text-lg text-[16px] font-medium">Email</label>
                    <div :class="{'border-red-500 hover:border-red-500' : employeeControl.validate.email ? true : false}" class="relative mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors">
                        <i class="fa-regular fa-envelope text-lg text-text absolute top-0 left-2 translate-y-1/2"></i>
                        <input v-model="newEmployee.email" class="pl-7 bg-[#fefefe] text-sm font-medium w-full outline-none border-none" type="text">
                    </div>
                    <ErrorSpan v-if="employeeControl.validate.email ? true : false">
                        {{ employeeControl.validate.email }}
                    </ErrorSpan>
                </div>
                    


                <div class="mt-4">
                    <label for="" class="text-lg text-[16px] font-medium">Password</label>
                    <input v-model="newEmployee.password" :class="{'border-red-500 hover:border-red-500 outline-red-500' : employeeControl.validate.password ? true : false}" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors " type="password">
                        <!-- <ErrorSpan class="flex flex-col gap-1" v-if="employeeControl.validate.password ? true : false" v-for="error in employeeControl.validate.password">
                            <span> {{ error }}</span>
                        </ErrorSpan> -->

                    <div class="mt-1 flex flex-col gap-1" v-if="employeeControl.validate.password ? true : false">
                        <ErrorSpan v-if="Object.keys(employeeControl.validate.password).length > 5" >
                            {{ employeeControl.validate.password }}
                        </ErrorSpan>
                        <ErrorSpan v-else-if="Object.keys(employeeControl.validate.password).length <= 5" v-for="error in employeeControl.validate.password" >{{ error }}</ErrorSpan>
                    </div>
                </div>
                
            </div>
        

            <div class="">
                <div class="">
                    <label for="" class="text-lg text-[16px] font-medium">Job Title</label>
                    <div @click="dropdownControl.openDropdounList(dropDowns.ADD_JOPTITLE)" :class="{'border-red-500 hover:border-red-500' : employeeControl.validate.jobTitleId ? true : false}" class="relative mt-2 bg-hover w-full rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer">
                        <input :value="fillSelectList.selectJobTitletitle"  type="text" disabled class="cursor-pointer pointer-events-none outline-none block border-none text-sm text-text font-medium">
                        <i class="fa-solid fa-angle-down text-text absolute top-1/2 right-2 -translate-y-1/2"></i>
                        <div v-if="dropdownControl.active === dropDowns.ADD_JOPTITLE" class="overflow-y-scroll h-32 flex text-center flex-col z-30 items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                            <div v-for="item in fillSelectList.jobTitlesData" @click="fillSelectList.SelectJobTitle(item)" :key="item.id" class="text-left text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                                {{ item.title}}
                            </div>
                        </div>
                    </div>

                    <ErrorSpan v-if="employeeControl.validate.jobTitleId ? true : false">
                        {{ employeeControl.validate.jobTitleId }}
                    </ErrorSpan>
                </div>
                <div class="flex flex-col gap-4 mt-4 md:flex-row">
                    <div class="">
                        <label for="" class="text-lg text-[16px] font-medium">Gender</label>
                        <div @click="dropdownControl.openDropdounList(dropDowns.ADD_GENDER)" :class="{'border-red-500 hover:border-red-500' : employeeControl.validate.gender ? true : false}" class="relative mt-2 bg-hover w-32 rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer ">
                            <input :value="fillSelectList.gender" type="text" disabled class="cursor-pointer pointer-events-none outline-none block border-none text-sm text-text font-medium md:w-full">
                            <i class="fa-solid fa-angle-down text-text absolute top-1/2 right-2 -translate-y-1/2"></i>
                            <div v-if="dropdownControl.active === dropDowns.ADD_GENDER" class="flex text-center flex-col items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                                <div v-for="item in gender" @click="fillSelectList.gender = item" class="text-center text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                                    {{item}}
                                </div>
                            </div>
                        </div>

                        <ErrorSpan v-if="employeeControl.validate.gender ? true : false">
                            {{ employeeControl.validate.gender }}
                        </ErrorSpan>
                    </div>
                    <div class="">
                        <label for="" class="text-lg text-[16px] font-medium">Role</label>
                        <div @click="dropdownControl.openDropdounList(dropDowns.ADD_ROLE)" :class="{'border-red-500 hover:border-red-500' : employeeControl.validate.roleId ? true : false}" class="relative mt-2 bg-hover w-32 rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer ">
                            <input :value="fillSelectList.selectRoleTitle"  type="text" disabled class="cursor-pointer pointer-events-none outline-none block border-none text-sm text-text font-medium">
                            <i class="fa-solid fa-angle-down text-text absolute top-1/2 right-2 -translate-y-1/2"></i>
                            <div v-if="dropdownControl.active === dropDowns.ADD_ROLE" class="flex text-center flex-col items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                                <div v-for="item in fillSelectList.RolesData" @click="fillSelectList.SelectRole(item)" :key="item.id" class="text-center text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                                    {{item.title}}
                                </div>
                            </div>
                        </div>

                        <ErrorSpan v-if="employeeControl.validate.roleId ? true : false">
                            {{ employeeControl.validate.roleId }}
                        </ErrorSpan>
                    </div>
                    
                </div>
                <div class="mt-4">
                    <label for="" class="text-lg text-[16px] font-medium">About</label>
                    <textarea v-model="newEmployee.about" :class="{'border-red-500 hover:border-red-500 outline-red-500' : employeeControl.validate.about ? true : false}" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors" rows="3" name="" id=""></textarea>
                    <ErrorSpan v-if="employeeControl.validate.about ? true : false">
                        {{ employeeControl.validate.about }}
                    </ErrorSpan>
                </div>
            
                <!-- Here will be the image upload -->
                <!-- <div class="mt-4">
                    <div class="h-40 w-40 mx-auto md:h-52 md:w-52">
                        <div v-if="false" class="flex justify-center flex-col items-center p-2 gap-3 border-2 border-main bg-[rgba(40,100,250,.07)] border-dashed rounded-xl h-40 w-40 md:h-52 md:w-52">
                            <i class="fa-regular fa-images text-text text-lg"></i>
                            <span class=" text-text text-[12px] font-medium text-center">Uplaod images with (1200 x 100)px and 12MB</span>
                        </div>
                        <img class="rounded-full object-cover w-full h-full" src="../../../assets/images/indian-male-man-svgrepo-com.svg" alt="">
                    </div>
                    TODO: validate span
                    <div class="mt-4">
                        <input type="file" hidden name="" id="upload">
                        <label for="upload" class=" mt-6 flex items-center justify-center gap-2 font-medium text-sm text-title border-2 w-fit mx-auto border-dashed border-title px-3 py-2 rounded-xl cursor-pointer hover:text-main hover:border-main transition-colors md:px-6">
                            <i class="fa-solid fa-upload"></i>
                            <span>Upload Image</span>
                        </label>
                    </div>
                </div> -->

            </div>
        </div>
        <Button :isActive="!employeeControl.isSubmit">Save Employee</Button>
    </form>

    

    
</template>
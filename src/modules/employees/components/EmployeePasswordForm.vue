<script setup>

import Button from '../../../core/components/Button.vue';
import ErrorSpan from '../../../core/components/ErrorSpan.vue';
import { useEmployeeStore } from '../store/EmployeesStore';

const employeeControl = useEmployeeStore();
    const props = defineProps({
        employee:Object
    });

    const passwords = {}
</script>

<template>
    <form @submit.prevent="employeeControl.resetPassword(props.employee,passwords)" class="w-full md:w-96">
        <div>
            <label for="" class="text-lg text-[16px] font-medium">Password</label>
            <input v-model="passwords.oldPassword" :class="{'border-red-500 hover:border-red-500 outline-red-500' : employeeControl.validate.oldPassword ? true : false}" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors " type="password">
            <ErrorSpan v-if="employeeControl.validate.oldPassword ? true : false">
                {{ employeeControl.validate.oldPassword }}
            </ErrorSpan>
        </div>
        <div class="mt-4">
            <label for="" class="text-lg text-[16px] font-medium">New Password</label>
            <input v-model="passwords.password" :class="{'border-red-500 hover:border-red-500 outline-red-500' : employeeControl.validate.password ? true : false}" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors " type="password">
            <div class="mt-1 flex flex-col gap-1" v-if="employeeControl.validate.password ? true : false">
                <ErrorSpan v-if="Object.keys(employeeControl.validate.password).length > 5" >
                    {{ employeeControl.validate.password }}
                </ErrorSpan>
                <ErrorSpan v-else-if="Object.keys(employeeControl.validate.password).length <= 5" v-for="error in employeeControl.validate.password" >{{ error }}</ErrorSpan>
            </div>
        </div>

        <Button :is-active="true">Reset Password</Button>
    </form>
</template>
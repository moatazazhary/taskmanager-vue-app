<script setup lang="ts">
import Alert from '../../../core/components/Alerts/alert.vue';
import { useAuthStore } from '../../../core/stores/AuthStore';
import EntroCard from '../components/EntroCard.vue';
import ErrorSpan from '../../../core/components/ErrorSpan.vue';
import Button from '../../../core/components/Button.vue';

const authControl = useAuthStore();
const user={};
</script>

<template>

     
    <div class="flex w-screen h-screen bg-back">
        <EntroCard class="hidden lg:block"></EntroCard>
        <div class=" w-full h-full flex items-center justify-center lg:w-7/12">
            <div class="mx-auto">
                <div>
                    <h2 class="text-title text-2xl font-medium">hello Again!</h2>
                    <p class="mt-1 text-sm text-text">Welcome Back</p>
                </div>

                <form @submit.prevent="authControl.login(user)" class="flex flex-col gap-4 w-80 mt-10">
                    <div v-if="authControl.validate.errors ? true : false" class="p-2 rounded-lg bg-red-50">
                        <ErrorSpan >
                            {{ authControl.validate.errors }}
                        </ErrorSpan>
                    </div>

                    <div class="w-full">
                        <div :class="{'border-red-500 hover:border-red-500' : authControl.validate.email ? true : false}" class="relative outline-main bg-none text-sm font-medium p-2 rounded-lg border-2 border-gray-100 w-full hover:border-main transition-colors">
                            <i class="fa-regular fa-envelope text-lg text-gray-400 absolute top-0 left-2 translate-y-1/2"></i>
                            <input v-model="user.email" class="pl-7 bg-none text-sm font-medium w-full outline-none border-none placeholder:font-normal placeholder:text-sm placeholder:text-gray-400" type="email" placeholder="Email Address">
                        </div>
                         <ErrorSpan v-if="authControl.validate.email ? true : false">
                            {{ authControl.validate.email }}
                        </ErrorSpan>
                    </div>

                    <div class="w-full">
                        <div :class="{'border-red-500 hover:border-red-500' : authControl.validate.password ? true : false}" class="relative outline-main bg-none text-sm font-medium p-2 rounded-lg border-2 border-gray-100 w-full hover:border-main transition-colors">
                            <i class="fa-solid fa-lock text-[16px] text-gray-400 absolute top-1 left-2 translate-y-1/2"></i>
                            <input v-model="user.password" class="pl-7 bg-none text-sm font-medium w-full outline-none border-none placeholder:font-normal placeholder:text-sm placeholder:text-gray-400" type="password" placeholder="Password">
                        </div>
                        <ErrorSpan v-if="authControl.validate.password ? true : false">
                            {{ authControl.validate.password }}
                        </ErrorSpan>
                    </div>
                    <div class="-mt-4">
                        <Button :is-active="true">Login</Button>
                    </div>
                    <div class="flex items-center gap-2">
                        <p class="text-text text-sm">Not a member yet ?</p>
                        <RouterLink to="/register" class="text-sm text-main font-medium bg-none">Register</RouterLink>
                    </div>
                </form>
            </div>
        </div>
    </div>



  
</template>


<!-- 


projects :
title - description - catgeory - startdate - enddate - status - isoregent - complexity - mentor:[id - employee name] [task name - id]

tasks :
taskname - complexity - isuregen - status - date - asssignedTo: [id - employee name]

employees :
first name - last name - jobtitle - role - about - email - gender - password






-->
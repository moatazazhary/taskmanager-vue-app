<script setup lang="ts">
import EntroCard from '../components/EntroCard.vue';
import ErrorSpan from '../../../core/components/ErrorSpan.vue';
import { dropDowns } from '../../../core/utils/dropDowns';
import { useFillList } from '../../../core/stores/FillSelectListStore';
import { useDropDownStore } from '../../../core/stores/DropdownListStor';
import { onMounted } from 'vue';
import { useAuthStore } from '../../../core/stores/AuthStore';
import Button from '../../../core/components/Button.vue';

const authControl = useAuthStore();
const fillSelectList = useFillList()
const dropdownControl = useDropDownStore();
const gender = ["Male","Female"]
onMounted(async ()=>{
    await fillSelectList.fillRoleList();
})

const user ={};
</script>

<template>
    <div class="flex w-screen h-screen bg-back">
        <EntroCard class="hidden lg:block"></EntroCard>
        <div class="w-full h-full flex items-center justify-center lg:w-7/12">
            <div class="mx-auto">
                <div>
                    <h2 class="text-title text-2xl font-medium">hello!</h2>
                    <p class="mt-1 text-sm text-text font-normal">Sign up to Get Started</p>
                </div>

                <form @submit.prevent="authControl.register(user)" class="flex flex-col gap-4 w-80 mt-10">

                    <div class="flex gap-2">
                        <div class="w-full">
                            <div :class="{'border-red-500 hover:border-red-500' : authControl.validate.firstName ? true : false}" class="relative outline-main bg-none text-sm font-medium p-2 rounded-lg border-2 border-gray-100 w-full hover:border-main transition-colors">
                                <i class="fa-regular fa-user text-lg text-gray-400 absolute top-0 left-2 translate-y-1/2"></i>
                                <input v-model="user.firstName" class="pl-7 bg-none text-sm font-medium w-full outline-none border-none placeholder:font-normal placeholder:text-sm placeholder:text-gray-400" type="text" placeholder="First Name">
                            </div>
                            <ErrorSpan v-if="authControl.validate.firstName ? true : false">
                                {{ authControl.validate.firstName }}
                            </ErrorSpan>
                        </div>
                        <div class="w-full">
                            <div :class="{'border-red-500 hover:border-red-500' : authControl.validate.lastName ? true : false}" class="relative outline-main bg-none text-sm font-medium p-2 rounded-lg border-2 border-gray-100 w-full hover:border-main transition-colors">
                                <i class="fa-regular fa-user text-lg text-gray-400 absolute top-0 left-2 translate-y-1/2"></i>
                                <input v-model="user.lastName" class="pl-7 bg-none text-sm font-medium w-full outline-none border-none placeholder:font-normal placeholder:text-sm placeholder:text-gray-400" type="text" placeholder="Last Name">
                            </div>
                            <ErrorSpan v-if="authControl.validate.lastName ? true : false">
                                {{ authControl.validate.lastName }}
                            </ErrorSpan>
                        </div>
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
                    <div class="w-full ">
                        <label for="" class="text-lg text-[16px] font-medium">Gender</label>
                        <div @click="dropdownControl.openDropdounList(dropDowns.ADD_GENDER)" :class="{'border-red-500 hover:border-red-500' : authControl.validate.gender ? true : false}" class="relative z-30 mt-2 bg-hover w-full rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer ">
                            <input :value="fillSelectList.gender" type="text" disabled class="cursor-pointer pointer-events-none outline-none block border-none text-sm text-text font-medium md:w-full">
                            <i class="fa-solid fa-angle-down text-text absolute top-1/2 right-2 -translate-y-1/2"></i>
                            <div v-if="dropdownControl.active === dropDowns.ADD_GENDER" class="flex text-center flex-col items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                                <div v-for="item in gender" @click="fillSelectList.gender = item" class="text-center text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                                    {{item}}
                                </div>
                            </div>
                        </div>

                        <ErrorSpan v-if="authControl.validate.gender ? true : false">
                            {{ authControl.validate.gender }}
                        </ErrorSpan>
                    </div>
                    <div class="w-full">
                        <div :class="{'border-red-500 hover:border-red-500' : authControl.validate.password ? true : false}" class="relative outline-main bg-none text-sm font-medium p-2 rounded-lg border-2 border-gray-100 w-full hover:border-main transition-colors">
                            <i class="fa-solid fa-lock text-[16px] text-gray-400 absolute top-1 left-2 translate-y-1/2"></i>
                            <input v-model="user.password" class="pl-7 bg-none text-sm font-medium w-full outline-none border-none placeholder:font-normal placeholder:text-sm placeholder:text-gray-400" type="password" placeholder="Password">
                        </div>
                        <div class="mt-1 flex flex-col gap-1" v-if="authControl.validate.password ? true : false">
                            <ErrorSpan v-if="Object.keys(authControl.validate.password).length > 5" >
                                {{ authControl.validate.password }}
                            </ErrorSpan>
                            <ErrorSpan v-else-if="Object.keys(authControl.validate.password).length <= 5" v-for="error in authControl.validate.password" >{{ error }}</ErrorSpan>
                        </div>
                    </div>
                    <div class="-mt-3">
                        <Button :is-active="true">Register</Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
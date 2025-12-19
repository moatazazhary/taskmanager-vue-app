<script setup>
    import { useDropDownStore } from '../../../core/stores/DropdownListStor';
    import { dropDowns } from '../../../core/utils/dropDowns';

    const dropdownControl = useDropDownStore();
</script>
<template>
    <div>
        <h2 class="text-lg text-title font-medium">Add Task to this project</h2>
        <div class="mt-10">
            <label for="" class="text-lg text-[16px] font-medium">Task Name</label>
            <input class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors " type="text">
        </div>
        <div class="relative">
            <div @click="dropdownControl.openDropdounList(dropDowns.ASSIGN_TASKS_PROJECT)" class="mt-5 rounded-lg bg-back shadow-lg shadow-gray-200 w-full p-3 ">
                <div class="flex items-center justify-between cursor-pointer">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-user-plus text-text"></i>
                        <span class="text-sm text-title font-medium">Assign task to</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <div v-if="false" class="flex items-center gap-1 text-text text-sm font-medium">
                            <i class="fa-regular fa-user"></i>
                            <span >2</span> 
                        </div>
                        <i class="fa-solid fa-angle-down text-text"></i>
                    </div>
                </div>
            </div>

            <div v-if="dropdownControl.active === dropDowns.ASSIGN_TASKS_PROJECT" class="transition-all bg-back rounded-lg shadow-xl shadow-gray-200 p-3">
                <div class="relative mt-2 outline-main bg-gray-50 text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full transition-colors">
                    <i class="fa-solid fa-magnifying-glass text-sm text-title absolute top-1/2 left-2 -translate-y-1/2"></i>
                    <input class="pl-7 bg-gray-50 placeholder:text-title text-sm font-medium w-full outline-none border-none" type="search" placeholder="search">
                </div>
                <div class="overflow-y-scroll h-20 mt-3">
                    <label v-for="value in 4" class="flex items-center justify-between p-2 rounded-lg hover:bg-hover transition-colors cursor-pointer" :for="`check-${value}`">
                        <div class="flex items-center gap-3">
                            <img class="rounded-full w-8" src="/images/indian-male-man-svgrepo-com.svg" alt="">
                            <div>
                                <h3 class="text-title text-[12px] font-medium">Curios George</h3>
                                <p class="text-text text-[10px] font-medium">UI UX  design</p>
                            </div>
                        </div>
                        <input type="checkbox" name="" :id="`check-${value}`">
                    </label>
                    
                </div>
                <div class="mt-5">
                    <button @click="dropdownControl.openDropdounList(dropDowns.ASSIGN_TASKS_PROJECT)" class="text-white text-sm font-medium rounded-lg bg-main  p-2 w-full outline-none border-none cursor-pointer hover:shadow-xl hover:text-back transition-shadow" >Assigned</button>
                </div>
            </div>
            
            
        </div>

        <div class="mt-5">
            <button class="text-white text-[16px] font-medium rounded-lg bg-main  p-3 w-full outline-none border-none cursor-pointer hover:shadow-xl hover:text-back transition-shadow disabled:bg-disabled" :disabled="false" ><i class="hidden fa-solid fa-spinner animate-spin"></i><span>Save</span></button>
        </div>
    </div>

</template>
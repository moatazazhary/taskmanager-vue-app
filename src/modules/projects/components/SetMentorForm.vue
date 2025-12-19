<script setup>
    import { useDropDownStore } from '../../../core/stores/DropdownListStor';
    import { dropDowns } from '../../../core/utils/dropDowns';
    import { useFillList } from '../../../core/stores/FillSelectListStore';
import Button from '../../../core/components/Button.vue';
import { useProjectStore } from '../store/ProjectsStore';

    const props = defineProps({
        project:Object,
        employees:Array
    });

    const fillSelectList = useFillList();
    const projectControl = useProjectStore();
    const dropdownControl = useDropDownStore();

</script>

<template>
    <form @submit.prevent="projectControl.setMentor(fillSelectList.selectEmployeeId,props.project)" class="">
        <div class="h-full">
            <label for="" class="text-title text-[16px] font-medium">Select Mentor</label>
            <div @click="dropdownControl.openDropdounList(dropDowns.SET_MENTOR_LIST)" class="relative bg-hover rounded-lg border-[1px] border-gray-100 p-2 mt-3 cursor-pointer">
                <input :value="fillSelectList.selectEmployeeName" type="text" disabled class="cursor-pointer pointer-events-none outline-none border-none text-sm text-text font-medium">
                <i class="fa-solid fa-angle-down text-text absolute top-1/2 right-2 -translate-y-1/2"></i>
                <div v-if="dropdownControl.active === dropDowns.SET_MENTOR_LIST" class="overflow-y-scroll h-20 absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200 p-3">
                    <div v-for="employee in props.employees" @click="fillSelectList.SelectEmployee(employee)" class="flex items-center gap-3 p-2 rounded-lg hover:bg-hover transition-colors cursor-pointer">
                        <img class="rounded-full w-8" src="/images/indian-male-man-svgrepo-com.svg" alt="">
                        <div class="pointer-events-none">
                            <h3 class="text-title text-[12px] font-medium">{{employee.firstName +" "+ employee.lastName}}</h3>
                            <p class="text-text text-[10px] font-medium">{{employee.jobTitle}}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
         <Button :is-active="true">Set Mentor</Button>
    </form>
</template>
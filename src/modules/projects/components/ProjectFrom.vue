
<script setup>
    import Line from '../../../core/components/Line.vue'
    import Modal from '../../../core/components/ModalComponent/Modal.vue'
    import AddTaskFrom from '../../tasks/components/AddTaskForm.vue'
    import { useModalStore } from '../../../core/stores/ModalStore';
    import { useDropDownStore } from '../../../core/stores/DropdownListStor';
    import { useProjectStore } from '../store/ProjectsStore';
    import { useFillList } from '../../../core/stores/FillSelectListStore';
    import { dropDowns } from '../../../core/utils/dropDowns';
    import { modalNames } from '../../../core/utils/modalNames';
    import Button from '../../../core/components/Button.vue';
    import ErrorSpan from '../../../core/components/ErrorSpan.vue';

    const projectControl = useProjectStore();
    const dropdownControl = useDropDownStore();
    const modalControl = useModalStore();
    const fillSelectList = useFillList();

    const props = defineProps({
        project:Object,
        isNewProject:Boolean
    })
    fillSelectList.fillCategoryList();
    fillSelectList.fillComplextyList();
    let newProject = {}

    if(props.project){
        newProject = props.project;
        fillSelectList.selectProjComplextyId = props.project.complexityId
        fillSelectList.selectProjComplextytitle = props.project.complexity
        fillSelectList.selectProjCategoryId = props.project.categoryId
        fillSelectList.selectProjCategorytitle = props.project.category
    }
    else
        newProject = {isUregen:false,isCompleted:false,mentorId:''};
    
</script>

<template>
    <div>
        <h2 class="text-lg text-title font-medium">Create New Project</h2>
        <form @submit.prevent="props.isNewProject ? projectControl.createProject(newProject) : projectControl.updateProject(props.project.id,props.project)" action="">
            <div class="flex flex-col overflow-y-scroll h-[450px] pr-6 w-[330px] gap-10 lg:gap-20 lg:flex-row lg:w-auto lg:overflow-auto ">
                <div class="w-full">
                    <div class="mt-10">
                        <label for="" class="text-lg text-[16px] font-medium">Project Title</label>
                        <input v-model="newProject.title" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors " :class="{'border-red-500 hover:border-red-500 outline-red-500' : projectControl.validate.title ? true : false}" type="text">
                        <ErrorSpan v-if="projectControl.validate.title ? true : false">
                            {{ projectControl.validate.title }}
                        </ErrorSpan>
                    </div>

                    <div class="mt-5">
                        <label for="" class="text-lg text-[16px] font-medium">Project Description</label>
                        <textarea v-model="newProject.description" class="mt-2 outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors" :class="{'border-red-500 hover:border-red-500 outline-red-500' : projectControl.validate.description ? true : false}" rows="3" name="" id=""></textarea>
                        <ErrorSpan v-if="projectControl.validate.description ? true : false">
                            {{ projectControl.validate.description }}
                        </ErrorSpan>
                    </div>

                    <div class="mt-5 flex items-left flex-col flex-wrap gap-4">
                        <div>
                            <label for="" class="text-lg text-[16px] font-medium">From</label>
                            <input v-model="newProject.startDate" class=" outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors " :class="{'border-red-500 hover:border-red-500 outline-red-500' : projectControl.validate.startDate ? true : false}" type="date">
                            <ErrorSpan v-if="projectControl.validate.startDate ? true : false">
                                {{ projectControl.validate.startDate }}
                            </ErrorSpan>
                        </div>
                        <div>
                            <label for="" class="text-lg text-[16px] font-medium">To</label>
                            <input v-model="newProject.endDate" class=" outline-main bg-[#fefefe] text-sm font-medium p-2 rounded-lg border-[1px] border-gray-200 w-full hover:border-main transition-colors " :class="{'border-red-500 hover:border-red-500 outline-red-500' : projectControl.validate.endDate ? true : false}" type="date">
                            <ErrorSpan v-if="projectControl.validate.endDate ? true : false">
                                {{ projectControl.validate.endDate }}
                            </ErrorSpan>
                        </div>
                    </div>

                   

                </div>

                <div class="w-full">

                    <!-- upoad image will define later -->
                    <!-- <div>
                        <div>
                            <div v-if="true" class="flex justify-center flex-col items-center gap-3 border-2 border-main bg-[rgba(40,100,250,.07)] border-dashed rounded-xl h-40 w-72 md:h-52 md:w-96">
                                <i class="fa-regular fa-images text-text text-lg"></i>
                                <span class=" text-text text-[12px] font-medium">Uplaod images with (1200 x 100)px and 12MB</span>
                            </div>
                            <div class="h-40 w-72 mx-auto md:h-52 md:w-96">
                                <div v-if="true" class="flex justify-center flex-col items-center gap-3 border-2 border-main bg-[rgba(40,100,250,.07)] border-dashed rounded-xl h-40 w-72 md:h-52 md:w-96">
                                    <i class="fa-regular fa-images text-text text-lg"></i>
                                    <span class=" text-text text-[12px] font-medium">Uplaod images with (1200 x 100)px and 12MB</span>
                                </div>
                                <img v-if="false" class="rounded-xl object-cover w-full h-full" src="../../../assets/images/Styles=1.svg" alt="">
                            </div>
                            TODO: validate span
                            <div class="mt-4">
                                <input type="file" hidden name="" id="upload">
                                <label for="upload" class="mt-6 flex items-center justify-center gap-2 font-medium text-sm text-title border-2 w-fit mx-auto border-dashed border-title px-6 py-3 rounded-xl cursor-pointer hover:text-main hover:border-main transition-colors">
                                    <i class="fa-solid fa-upload"></i>
                                    <span>Upload Image</span>
                                </label>
                            </div>
                        </div>
                    </div> -->

                    <div class="mt-5 flex flex-col items-center gap-5">
                        <div class="w-full">
                            <label for="" class="text-lg text-[16px] font-medium">Category</label>
                            <div @click="dropdownControl.openDropdounList(dropDowns.CATEGORY)" class="relative mt-2 bg-hover  rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer " :class="{'border-red-500 hover:border-red-500' : projectControl.validate.categoryId ? true : false}">
                                <input :value="fillSelectList.selectProjCategorytitle" type="text" disabled class="cursor-pointer pointer-events-none outline-none w-full block border-none text-sm text-text font-medium" >
                                <i class="fa-solid absolute top-1/2 right-2 -translate-y-1/2" :class="dropdownControl.active === dropDowns.CATEGORY ? 'fa-angle-down text-main' :'fa-angle-up text-text'"></i>
                                <div v-if="dropdownControl.active === dropDowns.CATEGORY" class="flex text-left flex-col items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl z-30 shadow-gray-200">
                                    <div v-for="value in fillSelectList.categoriesData" @click="fillSelectList.SelectProjCategory(value)"  class="text-left text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                                        {{value.title}}
                                    </div>
                                </div>
                            </div>
                             <ErrorSpan v-if="projectControl.validate.categoryId ? true : false">
                                {{ projectControl.validate.categoryId }}
                            </ErrorSpan>
                        </div>
                        <div class="w-full">
                            <label for="" class="text-lg text-[16px] font-medium">Complexity</label>
                            <div @click="dropdownControl.openDropdounList(dropDowns.COMPLEXITY_PROJECT)" class="relative mt-2 bg-hover  rounded-lg border-[1px] border-gray-100 p-2 cursor-pointer " :class="{'border-red-500 hover:border-red-500' : projectControl.validate.complexityId ? true : false}">
                                <input :value="fillSelectList.selectProjComplextytitle" type="text" disabled class="cursor-pointer pointer-events-none outline-none block w-full border-none text-sm text-text font-medium" >
                                <i class="fa-solid  absolute top-1/2 right-2 -translate-y-1/2" :class="dropdownControl.active === dropDowns.COMPLEXITY_PROJECT ? 'fa-angle-down text-main' :'fa-angle-up text-text'"></i>
                                <div v-if="dropdownControl.active === dropDowns.COMPLEXITY_PROJECT" class="flex text-left flex-col z-30 items-center absolute top-10 left-0 w-full bg-back rounded-lg shadow-xl shadow-gray-200">
                                    <div v-for="value in fillSelectList.ComplexitiesData" @click="fillSelectList.SelectProjCaomplexty(value)" class="text-left text-sm px-3 py-2 w-full hover:bg-hover hover:text-main transition-colors cursor-pointer">
                                        {{value.title}}
                                    </div>
                                </div>
                            </div>
                            <ErrorSpan v-if="projectControl.validate.complexityId ? true : false">
                                {{ projectControl.validate.complexityId }}
                            </ErrorSpan>
                        </div>
                    </div>


                    <div class="mt-5 flex flex-row gap-3 items-center ">
                        <input v-model="newProject.isUregen" :value="newProject.isUregen" class="cursor-pointer" id="check" type="checkbox">
                        <label for="check" class="cursor-pointer text-sm font-medium">Is Urgent ?</label>
                        
                    </div>
                    <Line class="mt-4"></Line>
                    <div v-if="props.isNewProject">
                        <div class="mt-5">
                            <button type="button" @click="modalControl.openModal(modalNames.ADD_PROJECT,modalNames.AD_TASK_TOPROJECT)" class="outline-none cursor-pointer border-none bg-none flex items-center gap-3 text-sm text-title font-medium group hover:text-main transition-colors">
                                <i class="fa-solid fa-tag text-text group-hover:text-main transition-colors"></i>
                                <span>Add Tasks</span>
                            </button>
                        </div>

                        <div v-if="projectControl.TasksList.length > 0" class="relative">
                                <div @click="dropdownControl.openDropdounList(dropDowns.View_TASKS_PROJECT)" class="mt-5 rounded-lg bg-back shadow-lg shadow-gray-200 w-full p-3 ">
                                    <div class="flex items-center justify-between cursor-pointer">
                                        <div class="flex items-center gap-2">
                                            <i class="fa-regular fa-clone text-text"></i>
                                            <span class="text-sm text-title font-medium">{{projectControl.TasksList.length}} Tasks</span>
                                        </div>
                                        <i class="fa-solid " :class="dropdownControl.active === dropDowns.View_TASKS_PROJECT ? 'fa-angle-down text-main' :'fa-angle-up text-text'"></i>
                                    </div>
                                </div>

                                <div v-if="dropdownControl.active === dropDowns.View_TASKS_PROJECT" class="overflow-y-scroll h-20 flex flex-col gap-3 bg-back rounded-lg shadow-xl shadow-gray-200 p-3">
                                    <div v-for="task in projectControl.TasksList" class=" rounded-lg bg-hover w-full p-3 ">
                                        <div class="flex items-center justify-between cursor-default">
                                            <span class="text-sm text-title font-medium">{{ task.title }}</span>
                                            <div class="flex items-center gap-2">
                                                <div class="flex flex-row -space-x-3">
                                                    <img v-for="(value, index) in task.assignedId" class="rounded-full border-2 border-back w-7 h-7" :style="`z-index:${task.assignedId.length - index }`" src="/images/indian-male-man-svgrepo-com.svg" alt="">
                                                </div>
                                                <button class="outline-none cursor-pointer border-none bg-none flex items-center gap-3 text-sm text-text font-medium hover:text-main transition-colors">
                                                    <i class="fa-solid fa-xmark"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            
                            </div>

                        <Modal v-if="modalControl.nestedModal === modalNames.AD_TASK_TOPROJECT" >
                            <AddTaskFrom :isNewProject="true"></AddTaskFrom>
                        </Modal>
                    </div>

                </div>
            </div>
            <Button :isActive="true">Save Project</Button>
        </form>

        
    </div>
</template>
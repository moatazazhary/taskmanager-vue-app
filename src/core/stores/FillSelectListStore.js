import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../services/SelectListApi";

export const useFillList = defineStore('selectlist',()=>{
    const selectRoleId = ref('');
    const selectRoleTitle = ref('');

    const selectJobtitleId = ref('');
    const selectJobTitletitle = ref('');

    const selectProjCategoryId = ref('');
    const selectProjCategorytitle = ref('');

    const selectTaskCategoryId = ref('');
    const selectTaskCategorytitle = ref('');

    const selectProjComplextyId = ref('');
    const selectProjComplextytitle = ref('');

    const selectTaskComplextyId = ref('');
    const selectTaskComplextytitle = ref('');

    const selectEmployeeId = ref('');
    const selectEmployeeName = ref('');

    const gender = ref('');

    const jobTitlesData = ref([]);
    const RolesData = ref([]);
    const categoriesData = ref([]);
    const ComplexitiesData = ref([]);


    // Getters
    async function fillRoleList(){
        let {data} =await api.getRolesData();
        RolesData.value = data
        return RolesData.value
    };


    async function fillJobtiteList(){
        let {data} = await api.getJobTitlesData();
        jobTitlesData.value = data
    };

    async function fillCategoryList(){
        let {data} = await api.getCategoriesData();
        categoriesData.value = data
    };


    async function fillComplextyList(){
        let {data} = await api.getComplexitiesData();
        ComplexitiesData.value = data
    };

    // actins
    function SelectJobTitle(jobTitle){
        selectJobtitleId.value = jobTitle.id;
        selectJobTitletitle.value = jobTitle.title 
    };

    function SelectEmployee(employee){
        selectEmployeeId.value = employee.id;
        selectEmployeeName.value = `${employee.firstName} ${employee.lastName}`
    };
    function SelectRole(role){
        selectRoleId.value = role.id;
        selectRoleTitle.value = role.title 
    };

    function SelectProjCategory(category){
        selectProjCategoryId.value = category.id;
        selectProjCategorytitle.value = category.title 
    };
    function SelectTaskCategory(category){
        selectTaskCategoryId.value = category.id;
        selectTaskCategorytitle.value = category.title 
    };

    function SelectProjCaomplexty(complexty){
        selectProjComplextyId.value = complexty.id;
        selectProjComplextytitle.value = complexty.title 
    };

    function SelectTaskCaomplexty(complexty){
        selectTaskComplextyId.value = complexty.id;
        selectTaskComplextytitle.value = complexty.title 
    };

    function resetAllSelectedList(){

        selectRoleId.value = '';
        selectRoleTitle.value = '';

        selectJobtitleId.value = '';
        selectJobTitletitle.value = '';

        selectProjCategoryId.value = ''
        selectProjCategorytitle.value = ''

        selectProjComplextyId.value = ''
        selectProjComplextytitle.value = ''

        selectEmployeeId.value = ''
        selectEmployeeName.value = ''

        gender.value = ''
    };

    function resetNestedSelectedList(){

        selectTaskComplextyId.value = ''
        selectTaskComplextytitle.value = ''
    }

    return {
        selectJobtitleId, selectRoleId, selectProjCategoryId , selectTaskCategoryId , selectProjComplextyId , selectTaskComplextyId,selectEmployeeId,
        selectJobTitletitle,selectRoleTitle, selectProjCategorytitle, selectTaskCategorytitle, selectProjComplextytitle, selectTaskComplextytitle,selectEmployeeName,
        jobTitlesData,RolesData,categoriesData,ComplexitiesData,gender,
        SelectJobTitle ,SelectRole ,SelectProjCategory,SelectTaskCategory , SelectProjCaomplexty, SelectTaskCaomplexty,SelectEmployee,
        fillJobtiteList,fillRoleList, fillCategoryList, fillComplextyList , resetAllSelectedList,resetNestedSelectedList}
})
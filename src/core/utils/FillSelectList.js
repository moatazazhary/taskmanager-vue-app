
import { ref } from "vue"
import api from "../services/SelectListApi";




export  default ()=>{
    const selectRoleId = ref('');
    const selectRoleTitle = ref('');

    const selectJobtitleId = ref('');
    const selectJobTitletitle = ref('');

    async function fillRoleList(){
        let response =await api.getRolesData();
        return response.data;
        
    };


    function SelectRole(role){
        this.selectRoleId.value = role.id;
        this.selectRoleTitle.value = role.title 
    };


    async function fillJobtiteList(){
        let response =await api.getJobTitlesData();

        return response.data
    };

    
    function SelectJobTitle(jobTitle){
        this.selectJobtitleId.value = jobTitle.id;
        this.selectJobTitletitle.value = jobTitle.title 
    };


    function resetAllSelectedList(){

        this.selectRoleId.value = '';
        this.selectRoleTitle.value = '';

        this.selectJobtitleId.value = '';
        this.selectJobTitletitle.value = '';
    };
}
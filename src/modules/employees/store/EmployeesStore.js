import { defineStore } from "pinia";
import { computed, nextTick, ref } from "vue";
import api from "../services/employeeService"
import validation from "../services/validationServices";
import taskApi from "../../tasks/services/TasksService"

import { useAlertStore } from "../../../core/stores/AlertStore";
import { useModalStore } from "../../../core/stores/ModalStore";


export const useEmployeeStore = defineStore('employee',()=>{
    const loading = ref(false);
    const isSubmit = ref(false);
    const list = ref([]);

    const validate = ref({});


    // Getters
    async function getAllEmployees(){
        loading.value = true;
        const {data}= await api.GetAll();
        list.value = data;
        loading.value = false;
    };

    async function getEmployee(id) {
        loading.value = true;
        const {data} = await api.GetEmployee(id);
        loading.value = false;
        return data;
    }

    async function getTasksNumbers(id){
        const {data} = await taskApi.GetAll();
        const taskList = data
        const count = ref(0);
        taskList.map((t)=> {
            if(t.asssignedToId === id)
                count.value++;
        })
        
        console.log(count.value);
        return count.value;
    }


    // Actions

    async function AddEmployee(employee){

        validate.value = validation.isValid(employee);


        if(isObjectEmpity(validate.value)){

            employee.isAdmin = false
            isSubmit.value = true;
            const {data} = await api.CreateEmployee(employee);
            if(data){
                list.value.push(data);
                useAlertStore().Success(`Employee ${data.firstName +" "+ data.lastName} was added`);
            }else{
                useAlertStore().failure("Could not added , something wrong!");
            }
            isSubmit.value = false;
            useModalStore().closeModal(); 
        }
    }

    async function deleteEmployee(id){
        const employee = list.value.find(e => e.id === id);
        if(employee){
            
            const {data} = await api.DeleteEmployee(id);
            if(data){
                useAlertStore().Success(`Employee ${data.firstName +" "+ lastName} was deleted`);
            }else{
                useAlertStore().failure("Could not deleted , something wrong!")
            }
        }else{
            useAlertStore().failure();
        }
        useModalStore().closeModal();
    }

    async function updateEmployee(id,employee = ''){

        if(!employee){
            employee = await getEmployee(id)
        }

        validate.value = validation.isValid(employee,true);
        if(!isObjectEmpity(validate.value))
        {
            return false
        }

        const {data} = await api.UpdateEmployee(id,employee);
        if(data){
            useAlertStore().Success("Employee was updated");
        }else{
            useAlertStore().failure("Could not updateded , something wrong!");
        }

        useModalStore().closeModal();
    }

    async function resetPassword(employee,passwords){
        validate.value = validation.isPasswordValid(passwords,employee.password);
        if(isObjectEmpity(validate.value)){
            employee.password = passwords.password

            const {data} = await api.UpdateEmployee(employee.id,employee)
            
            if(data)
                useAlertStore().Success("New password Saved")
            else
                useAlertStore().failure("something went wrong!");
        }

    }

    function isObjectEmpity(obj){
        if(Object.keys(obj).length === 0)
            return true;

        return Object.values(obj).every(v=>{
            if(v === '' || v === undefined)
                return true;
            if(typeof v === 'string')
                return v.trim() === ''
            return false;
        });
    }


    function resetValidate(){
        validate.value = ''
    }

    return {loading,isSubmit,validate,list,validate,resetPassword,resetValidate,AddEmployee,getAllEmployees,getEmployee,deleteEmployee,updateEmployee, getTasksNumbers}


});
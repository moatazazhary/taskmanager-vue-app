import { defineStore } from "pinia";
import { ref,computed } from "vue";
import api from "../services/ProjectService";
import taskApi from "../../tasks/services/TasksService";
import taskValidation from "../../tasks/services/TasksValidationService";
import validation from "../services/projectValidationService";
import { useAlertStore } from "../../../core/stores/AlertStore";
import { useModalStore } from "../../../core/stores/ModalStore";
import { useDropDownStore } from "../../../core/stores/DropdownListStor";
import { useTaskStore } from "../../tasks/store/TaskStore";
import { useEmployeeStore } from "../../employees/store/EmployeesStore";
import { useFillList } from "../../../core/stores/FillSelectListStore";


export const useProjectStore = defineStore('projects',()=>{
    const loading  = ref(false);
    const list = ref([]);

    const isSubmit = ref(false);
    const validate = ref({});
    const taskValidate = ref({});

    const selectedIds = ref([]);
    const TasksList = ref([]);

    const count = ref(0);

    const commingitems = ref([]);
    const projectTasks = ref([]);

    const ProjectTasksList = ref([]);
    const project = ref([]);

    function addSelected (items){
        const addedItems = ref([]);
        commingitems.value = items;
        let newItems = items.filter(item=> selectedIds.value.includes(item.id) && !addedItems.value.some(added => added.id === item.id));
        addedItems.value = newItems;
        count.value = addedItems.value.length;
        newItems = []

        useDropDownStore().openDropdounList('close');
        return addedItems.value
    };


    function addTask(task){
        taskValidate.value = taskValidation.isValid(task);

        if(isObjectEmpity(taskValidate.value)){
            let ids = []
            commingitems.value = addSelected(commingitems.value);
            commingitems.value.forEach((el)=>{
                ids.push(el.id);
            });
            task.assignedId = ids
            TasksList.value.push(task);
            ids = []
            selectedIds.value = [];
            count.value = 0;
            useModalStore().closeModal("nested");
        }
    }

    async function GetAllTasks() {
        loading.value = true;
        const {data} = await taskApi.GetAll();
        ProjectTasksList.value = data;
        loading.value = false;
        return ProjectTasksList.value;
    }

    async function getProject(projectId){
        const {data} = await api.GetProject(projectId);
        project.value = data
    }

    async function getAllProjects(){
        loading.value = true;
        const {data} = await api.GetAll();
        list.value = data;
        loading.value = false;
    }
    async function createProject(project){
        validate.value = validation.isValid(project);

        if(isObjectEmpity(validate.value)){
            isSubmit.value = true;
            const {data} = await api.AddProject(project);
            if(data){
                list.value.push(data);
                const result = await addTasksToProject(data.id,TasksList.value);
                if(result)
                    useAlertStore().Success("Project was added successfuly");
                else
                    useAlertStore().failure("Can not add , something wrong!");
            }else{
                useAlertStore().failure("Can not add , something wrong!");
            }

            isSubmit.value = false;
            useModalStore().closeModal();
        }
    }

    async function setMentor(employeeId,project){
        if(employeeId){
            let data =await useEmployeeStore().getEmployee(employeeId);
            if(data){
                if(data.role != "Mentor"){
                    const roles = await useFillList().fillRoleList();
                    const role = roles.filter(r=>r.title === "Mentor");
                    
                    if(role){
                        role.forEach(r=>{
                            data.role = r.title
                            data.roleId = r.id
                        })
                        
                    }
                    
                    await useEmployeeStore().updateEmployee(data.id);
                    project.mentorId = data.id
                    await updateProject(project.id,project);
                }
            }else{
                useAlertStore().failure();
            }
        }
    }

    async function updateProject(id,project = ''){
        if(!project){
            project = list.value.find(p=>p.id === id);
        }

        validate.value = validation.isValid(project);
        if(!isObjectEmpity(validate.value)){
            return false
        }

        const {data} = await api.UpdateProject(id,project);
        if(data){
            useAlertStore().Success("Project was updated");
        }else{
            useAlertStore().failure("Could not updateded , something wrong!");
        }
        useModalStore().closeModal();
    }

    // move this to tasks store
    function getProjectTasks(tasklist,projectId){
        
        if(tasklist){
            let tasks = tasklist.filter(task => task.projectId === parseInt(projectId));
            let team = new Set(tasks.flatMap(t=>t.assignedId));
            return ({
                projectId:projectId,
                tasks:tasks,
                team:team.size
            });
        }
    }

    async function addTaskToProject(task,projectId){
        addTask(task);

        if(isObjectEmpity(taskValidate.value)){
            const response = await addTasksToProject(projectId,TasksList.value)
            if(response)
                useAlertStore().Success("Task Added Successfuly")
            else
                useAlertStore().failure("Something went wrong while adding this task!")
        }
    }

    // move this to tasks store
    async function addTasksToProject(projectId,tasks){
        if(projectId && tasks.length > 0){
            let taskAddedList = [];
            for(const task of tasks){
                task.projectId = projectId;
                const {data} = await taskApi.AddTask(task);
                if(data)
                    taskAddedList.push(data);
            }
            if(taskAddedList.length > 0){
                TasksList.value = [];
                taskAddedList = [];
                return true;
            }
            return false
        }
        return true;
    }

    function diffDate(startDate,endDate){
        const diff = Math.abs(new Date(endDate) - new Date(startDate));

        const hours = Math.floor(diff/(1000 * 60 * 60));
        const days = Math.floor(diff /(1000 * 60 * 60 * 24));
        const months = Math.floor(days / 30);
        
        if(hours < 24)
            return `${hours} hours`;
        if(days < 30)
            return `${days} days`;
        return `${months} months`;
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


    return {addSelected,addTask,getProject,addTaskToProject,createProject,setMentor,getAllProjects,getProjectTasks,GetAllTasks,diffDate,updateProject,ProjectTasksList,project,projectTasks,validate,taskValidate,loading , selectedIds,TasksList,count,list}
});
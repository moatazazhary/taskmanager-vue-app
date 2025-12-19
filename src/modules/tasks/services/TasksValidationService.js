import { ref } from "vue"
import { useFillList } from "../../../core/stores/FillSelectListStore";

export default{

    errors : ref({}),

    isValid(task){

        task.complexityId = useFillList().selectTaskComplextyId;
        task.complexity = useFillList().selectTaskComplextytitle;

        if(!task.title || task.title.length < 5)
            this.errors.value.title = "Must contain 5 characters at least!"
        else
            this.errors.value.title =''

        if(!task.complexityId)
            this.errors.value.complexityId = "Complexy is required!"
        else{
            this.errors.value.complexityId = ''
        }

        

        return this.errors.value;
    }

}
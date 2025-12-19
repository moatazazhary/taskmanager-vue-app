import { ref } from "vue"
import { useFillList } from "../../../core/stores/FillSelectListStore";
export default{

    errors : ref({}),
    emailRegex : /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    passErrors(employee){
        const rules = {
        minLength :employee.password.length >= 8,
        hassUpper : /[A-Z]/.test(employee.password),
        hasLower : /[a-z]/.test(employee.password),
        hasSpecial : /[@$!%*?&]/.test(employee.password),
        hasNumber : /\d/.test(employee.password)
        };

        const passMessages = ref([])

        if(!rules.minLength)
            passMessages.value.push(("Password must be at leat 8 characters log!"))

        if(!rules.hasLower)
            passMessages.value.push(("Must contain a small letter!"))

        if(!rules.hassUpper)
            passMessages.value.push(("Must contain a capital letter!"))

        if(!rules.hasNumber)
            passMessages.value.push(("Must contain a number!"))

        if(!rules.hasSpecial)
            passMessages.value.push(("Must contain a special charactar Ex:[@ , ! , $ , % , &]!"))


        return passMessages.value;
    },

    isValid(employee, isUpdate){

        employee.roleId = useFillList().selectRoleId;
        employee.role = useFillList().selectRoleTitle;
        employee.jobTitleId = useFillList().selectJobtitleId;
        employee.jobTitle = useFillList().selectJobTitletitle;


        if(!isUpdate)
            employee.gender = useFillList().gender;

        if(!employee.firstName || employee.firstName.length < 3)
            this.errors.value.firstName = "Must contain 3 characters at least!"
        else
            this.errors.value.firstName =''

        if(!employee.lastName || employee.lastName.length < 3)
            this.errors.value.lastName = "Must contain 3 characters at least!"
        else
            this.errors.value.lastName = ''

        if(!employee.about || employee.about.length < 10)
            this.errors.value.about = "Must contain 10 characters at least!"
        else
            this.errors.value.about = ''

        if(!employee.jobTitleId)
            this.errors.value.jobTitleId = "Job title is required!"
        else{
            this.errors.value.jobTitleId = ''
        }

        if(!employee.roleId)
            this.errors.value.roleId = "Role is required!"
        else
            this.errors.value.roleId = ''

        if(!employee.gender)
            this.errors.value.gender = "Gender is required!"
        else
            this.errors.value.gender = ''

        if(employee.email){
            if(employee.email.match(this.emailRegex) === null){
                this.errors.value.email = "Email is not valid! Ex: expamle@gmail.com"
            }else{
                this.errors.value.email = ''
            }
        }else{
            this.errors.value.email = "Email is required!"
        }

        if(employee.password){
            const passStatus = this.passErrors(employee);
            if(passStatus.length > 0){
                this.errors.value.password = passStatus
            }else{
                this.errors.value.password = ''
            }
        }else{
            this.errors.value.password = "password is required!"
        }


        return this.errors.value;
    },

    isPasswordValid(passwords,oldPassword){

        if(passwords.oldPassword)
        {
            if(oldPassword != passwords.oldPassword)
                this.errors.value.oldPassword = 'wrong password!';
            else
                this.errors.value.oldPassword = '';
        }
        else
            this.errors.value.oldPassword = "password is required!"

        if(passwords.password){
            const passStatus = this.passErrors(passwords);
            if(passStatus.length > 0){
                this.errors.value.password = passStatus
            }else{
                this.errors.value.password = ''
            }
        }else{
            this.errors.value.password = "password is required!"
        }

        return this.errors.value;
    }

}
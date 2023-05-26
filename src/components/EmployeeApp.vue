<template>
    <div style="margin: 0 auto">
        <Toast />
        <Panel header="Empleados">
            <Menubar :model="items"/>
            <br>
            <DataTable :value="employees" :paginator="true" :rows="5" :selection.sync="selectedEmployee" dataKay="id" selectionMode="single">
                <Column field="id" header="Id"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="jobTitle" header="JobTitle"></Column>
                <Column field="email" header="Email"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Create Employee" :visible.sync="displayModal"  :modal="true" :closeOnEscape="true">
            <br>
            <span class="p-float-label">
                <InputText id="name" type="text" v-model="employee.name" style="width: 100%"/>
                <label for="name">name</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="jobTitle" type="text" v-model="employee.jobTitle" style="width: 100%" />
                <label for="jobTitle">jobTitle</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="email" type="text" v-model="employee.email" style="width: 100%"/>
                <label for="email">Email</label>
             </span>
             <template #footer>
                <Button label="Save" icon="pi pi-times" @click="save" class="p-button-text">
                </Button>
                <Button label="Cancel" icon="pi pi-check" @click="closeModal" autofocus >
                </Button>
            </template>
        </Dialog>
    </div>
</template>

<script>
import EmployeeService from '@/service/EmployeeService';
export default{
    name:'EmployeeApp',
    data(){
        return {
            employees : null,
            employee : {
                id: null,
                name : null,
                jobTitle: null,
                email : null
            },
            selectedEmployee:{
                id: null,
                name : null,
                jobTitle: null,
                email : null
            },
            items :[
                {
                    label : 'New',
                    icon : 'pi pi-fw pi-plus',
                    command : () => {
                        this.showSavedModal();
                    }
                },
                {
                    label: "Edit",
                    icon: "pi pi-fw pi-pencil",
                    command: () =>{
                        this.showEditModal();
                    }
                },
                {
                    label: "Delete",
                    icon: "pi pi-fw pi-trash",
                    command: ()=>{
                        this.delete();
                    }
                },
                {
                    label: "Refesh",
                    icon: "pi pi-fw pi-refresh",
                    command: () =>{
                        this.getAll();
                    }
                }
            ],
            displayModal : false
        }
    },
    employeeService : null,
    created(){
        this.employeeService = new EmployeeService();
    },
    mounted(){
       this.getAll();
    },
    methods:{
        showSavedModal(){
            this.displayModal = true;
        },
        showEditModal(){
            this.employee = this.selectedEmployee;
            this.displayModal = true;
        },
        getAll(){
            this.employeeService.getAll().then(data =>{
            this.employees = data.data;
            console.log(this.employees);
        });
        },
        delete(){
            if(confirm("¿Está seguro que desea eliminar el registro?")){
                this.employeeService.delete(this.selectedEmployee.id).then(data =>{
                if(data.status === 200){
                    this.$toast.add({severity:'success', summary: 'Atention!!', detail:'Delete Completed', life: 3000});
                }
                this.getAll();
            });   
            }    
        },
        save(){
            this.employeeService.save(this.employee).then(data =>{
                if(data.status === 200){
                    this.$toast.add({severity:'success', summary: 'Atention!!', detail:'Completed', life: 3000});
                    this.displayModal = false;
                    this.employee = {
                        name : null,
                        jobTitle: null,
                        email : null
                    }
                    this.getAll();

                }
            })
        },
        closeModal(){
            this.displayModal = false;
        }

    }
}
</script>

<style>

</style>
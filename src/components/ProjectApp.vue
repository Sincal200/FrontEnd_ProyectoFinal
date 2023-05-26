<template>
    <div style="margin: 0 auto;  width: 100% ">
        <Toast />
        <Panel header="Proyectos">
            <Menubar :model="items"/>
            <br>
            <DataTable :value="projects" :paginator="true" :rows="5" :selection.sync="selectedProject" dataKay="id" selectionMode="single">
                <Column field="id" header="Id"></Column>
                <Column field="project" header="Project"></Column>
                <Column field="dueDate" header="DueDate"></Column>
                <Column field="leader" header="Leader"></Column>
                <Column field="consultant" header="Consultant"></Column>
                <Column field="member" header="Member"></Column>
                <Column field="member1" header="Member1"></Column>
                <Column field="member2" header="Member2"></Column>
                <Column field="member3" header="Member3"></Column>
                <Column field="member4" header="Member4"></Column>
                <Column field="performance" header="Performance"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Create Project" :visible.sync="displayModal"  :modal="true" :closeOnEscape="true">
            <br>
            <span class="p-float-label">
                <InputText id="project" type="text" v-model="project.project" style="width: 100%"/>
                <label for="project">Name</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="dueDate" type="text" v-model="project.dueDate" style="width: 100%" />
                <label for="dueDate">DueDate</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="leader" type="text" v-model="project.leader" style="width: 100%"/>
                <label for="leader">Leader</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="consultant" type="text" v-model="project.consultant" style="width: 100%"/>
                <label for="consultant">Consultant</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="member" type="text" v-model="project.member" style="width: 100%"/>
                <label for="member">Member</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="member1" type="text" v-model="project.member1" style="width: 100%"/>
                <label for="member1">Member1</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="member2" type="text" v-model="project.member2" style="width: 100%"/>
                <label for="member2">Member2</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="member3" type="text" v-model="project.member3" style="width: 100%"/>
                <label for="member3">Member3</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="member4" type="text" v-model="project.member4" style="width: 100%"/>
                <label for="member4">Member4</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="performance" type="text" v-model="project.performance" style="width: 100%"/>
                <label for="performance">Performance</label>
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

import ProjectService from '@/service/ProjectService';
export default{
    name:'ProjectApp',
    data(){
        return {
            mostrarComponente: false,
            projects : null,
            project : {
                id: null,
                project : null,
                dueDate : null,
                leader: null,
                consultant: null,
                member: null,
                member1: null,
                member2: null,
                member3: null,
                member4: null,
                performance: null
                
            },
            selectedProject:{
                id: null,
                project : null,
                dueDate : null,
                leader: null,
                consultant: null,
                member: null,
                member1: null,
                member2: null,
                member3: null,
                member4: null,
                performance: null
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
    projectService : null,
    created(){
        this.projectService = new ProjectService();
    },
    mounted(){
       this.getAll();
    },
    methods:{
        mostrarNuevoComponente() {
        this.mostrarComponente = true;
        },
        showSavedModal(){
            this.displayModal = true;
        },
        showEditModal(){
            this.project = this.selectedProject;
            this.displayModal = true;
        },
        getAll(){
            this.projectService.getAll().then(data =>{
            this.projects = data.data;
            console.log(this.projects);
        });
        },
        delete(){
            if(confirm("¿Está seguro que desea eliminar el registro?")){
                this.projectService.delete(this.selectedProject.id).then(data =>{
                if(data.status === 200){
                    this.$toast.add({severity:'success', summary: 'Atention!!', detail:'Delete Completed', life: 3000});
                }
                this.getAll();
            });   
            }    
        },
        save(){
            this.projectService.save(this.project).then(data =>{
                if(data.status === 200){
                    this.$toast.add({severity:'success', summary: 'Atention!!', detail:'Completed', life: 3000});
                    this.displayModal = false;
                    this.project = {
                        project : null,
                        dueDate : null,
                        leader: null,
                        consultant: null,
                        member: null,
                        member1: null,
                        member2: null,
                        member3: null,
                        member4: null,
                        performance: null
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
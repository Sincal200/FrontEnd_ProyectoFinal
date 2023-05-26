<template>
    <div style="margin: 0 auto;  width: 100% ">
        <Toast />
        <Panel header="Consultores">
            <Menubar :model="items"/>
            <br>
            <DataTable :value="consultants" :paginator="true" :rows="5" :selection.sync="selectedConsultant" dataKay="id" selectionMode="single">
                <Column field="id" header="Id"></Column>
                <Column field="name" header="Name"></Column>
                <Column field="phoneNumber" header="PhoneNumber"></Column>
                <Column field="email" header="Email"></Column>
                <Column field="specialization" header="Specialization"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Consultant" :visible.sync="displayModal"  :modal="true" :closeOnEscape="true">
            <br>
            <span class="p-float-label">
                <InputText id="name" type="text" v-model="consultant.name" style="width: 100%"/>
                <label for="name">Name</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="phoneNumber" type="text" v-model="consultant.phoneNumber" style="width: 100%" />
                <label for="phoneNumber">PhoneNumber</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="email" type="text" v-model="consultant.email" style="width: 100%"/>
                <label for="email">Email</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="specialization" type="text" v-model="consultant.specialization" style="width: 100%"/>
                <label for="specialization">Specialization</label>
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

import ConsultantService from '@/service/ConsultantService';
export default{
    name:'ConsultantApp',
    data(){
        return {
            mostrarComponente: false,
            consultants : null,
            consultant : {
                id: null,
                name : null,
                phoneNumber: null,
                email : null,
                specialization: null
            },
            selectedConsultant:{
                id: null,
                name : null,
                phoneNumber: null,
                email : null,
                specialization: null
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
                    this.selectedConsultant= {
                        id: null,
                        name : null,
                        phoneNumber: null,
                        email : null,
                        specialization: null
                    }
                    this.consultant = {
                        id: null,
                        name : null,
                        phoneNumber: null,
                        email : null,
                        specialization: null
                    }
                }
            }
            ],
            displayModal : false
        }
    },
    consultantService : null,
    created(){
        this.consultantService = new ConsultantService();
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
            this.consultant = this.selectedConsultant;
            this.displayModal = true;
        },
        getAll(){
            this.consultantService.getAll().then(data =>{
            this.consultants = data.data;
            console.log(this.consultants);
        });
        },
        delete(){
            if(confirm("¿Está seguro que desea eliminar el registro?")){
                this.consultantService.delete(this.selectedConsultant.id).then(data =>{
                if(data.status === 200){
                    this.$toast.add({severity:'success', summary: 'Atention!!', detail:'Delete Completed', life: 3000});
                }
                this.getAll();
            });   
            }    
        },
        save(){
            this.consultantService.save(this.consultant).then(data =>{
                if(data.status === 200){
                    this.$toast.add({severity:'success', summary: 'Atention!!', detail:'Completed', life: 3000});
                    this.displayModal = false;
                    this.consultant = {
                        name : null,
                        phoneNumber: null,
                        email : null,
                        specialization: null
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
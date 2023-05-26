<template>
    <div style="margin: 0 auto;  width: 100% ">
        <Toast />
        <Panel header="Presupuestos">
            <Menubar :model="items"/>
            <br>
            <DataTable :value="budgets" :paginator="true" :rows="5" :selection.sync="selectedBudget" dataKay="id" selectionMode="single">
                <Column field="id" header="Id"></Column>
                <Column field="description" header="Description"></Column>
                <Column field="amount" header="Amount"></Column>
                <Column field="status" header="Status"></Column>
            </DataTable>
        </Panel>
        <Dialog header="Create Budget" :visible.sync="displayModal"  :modal="true" :closeOnEscape="true">
            <br>
            <span class="p-float-label">
                <InputText id="description" type="text" v-model="budget.description" style="width: 100%"/>
                <label for="description">Description</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="amount" type="text" v-model="budget.amount" style="width: 100%"/>
                <label for="amount">Amount</label>
             </span>
             <br>
             <span class="p-float-label">
                <InputText id="status" type="text" v-model="budget.status" style="width: 100%"/>
                <label for="status">Status</label>
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

import BudgetService from '@/service/BudgetService';
export default{
    name:'BudgetApp',
    data(){
        return {
            mostrarComponente: false,
            budgets : null,
            budget : {
                id: null,
                description : null,
                amount: null,
                status : null
            },
            selectedBudget:{
                id: null,
                description : null,
                amount: null,
                status : null
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
    budgetService : null,
    created(){
        this.budgetService = new BudgetService();
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
            this.budget = this.selectedBudget;
            this.displayModal = true;
        },
        getAll(){
            this.budgetService.getAll().then(data =>{
            this.budgets = data.data;
            console.log(this.budgets);
        });
        },
        delete(){
            if(confirm("¿Está seguro que desea eliminar el registro?")){
                this.budgetService.delete(this.selectedBudget.id).then(data =>{
                if(data.status === 200){
                    this.$toast.add({severity:'success', summary: 'Atention!!', detail:'Delete Completed', life: 3000});
                }
                this.getAll();
            });   
            }    
        },
        save(){
            this.budgetService.save(this.budget).then(data =>{
                if(data.status === 200){
                    this.$toast.add({severity:'success', summary: 'Atention!!', detail:'Completed', life: 3000});
                    this.displayModal = false;
                    this.budget = {
                        description : null,
                        amount: null,
                        status : null
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
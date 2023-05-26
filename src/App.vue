<template>
 <div id="app" style="text-align: center;">
    <div style="float: right ; width: 50%; margin-top:18.5px ; width: calc(50% - 25px); ">
      <EmployeeApp/>
    </div>
    <br>
    <div style="float: left; width: 50%; ">
      <ConsultantApp/>
    </div>
    <div style="clear: both;"></div> <!-- Limpiar el flujo de elementos -->
    
    <div style="margin: 0 auto; width: 50%; margin-top: 18.5px;">
      <BudgetApp/>
    </div>
    <br>
    <div style="text-align: center;  margin-top:18.5px ;">
      <ProjectApp/>
    </div>
  </div>
</template>

<script>
import EmployeeApp from './components/EmployeeApp.vue';
import ConsultantApp from './components/ConsultantApp.vue';
import BudgetApp from './components/BudgetApp.vue';
import ProjectApp from './components/ProjectApp.vue';
export default {
  name: 'App',
  components: {
    EmployeeApp,
    ConsultantApp,
    BudgetApp,
    ProjectApp
  }
}
</script>

<style>

</style>

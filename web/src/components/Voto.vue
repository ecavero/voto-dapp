<template>
  <div>
    <div v-if="cargando">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Cargando</span>
      </div>
    </div>
    <div v-if="!cargando && !yaVotó">
      <table class="table table-striped">
        <thead>
          <td>Nro</td>
          <td>Partido</td>
        </thead>
        <tbody>
          <tr v-for="partido in partidos" :key="partido.id">
            <td>{{Number(partido.id) + 1}}</td>
            <td>{{partido.nombre}}</td>
            <td><input type="radio" name="elegir" :value="partido.id" v-model="selectedPartido"></td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-primary" @click="votar()">Votar</button>
      </div> 
      <div v-if="yaVotó">
       <table class="table table-striped">
         <thead>
           <td>Nro</td>
           <td>Partido</td>
           <td>Número de Votos</td>
         </thead>
         <tbody>
           <tr v-for="partido in partidos" :key="partido.id">
             <td>{{Number(partido.id) + 1}}</td>
             <td>{{partido.nombre}}</td>
             <td>{{partido.numeroDeVotos}}</td>
           </tr>
         </tbody>
       </table>
     </div>
  </div>
</template>
<script src="./Voto.js"></script>

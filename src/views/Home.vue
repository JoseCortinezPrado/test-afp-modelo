<script setup>
</script>
<template>
    <main>
        <div class="container">
            <div class="card shadow">
                <div class="card-body">
                    <div class="row text-center">
                        <h2>Prueba Tecnica AFP Modelo</h2>
                        <h6>Postulante: José Luis Cortínez Prado</h6>
                    </div>
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <a class="btn btn-outline-dark boton" :href="'/ejercicio1'">Ejercicio 1</a>
                        </div>
                        <div class="col-auto">
                            <a class="btn btn-outline-dark boton" :href="'/ejercicio2'">Ejercicio 2</a>
                        </div>
                    </div>
                    <br>
                    <div class="row justify-content-center">
                        <div class="col-auto">
                            <h6>Dependencias utilizadas:</h6>
                        <ul>
                            <li>Bootstrap</li>
                            <li>Axios</li>
                            <li>Vuex</li>
                            <li>Sweet Alert 2</li>
                        </ul>
                        </div>
                        
                    </div>

                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
.logo {
    width: 100%;
    max-width: 300px;
}

.container{
    margin-top: 30px;
}
.boton{
    margin: 10px;
}
</style>
<template>
    <div class="container">
        <div class="row">
            <h2 class="text-center titulo">Ejercicio N° 1</h2>
        </div>
        <div class="row">
            <div class="col-sm-4">
                <div class="card shadow">
                    <div class="card-body">
                        <h4 class="text-center">Nueva Tarea</h4>
                        <form @submit.prevent="addTask">
                            <div class="mb-3">
                                <label for="taskTitle">Título de la Tarea:</label>
                                <input type="text" class="form-control" id="taskTitle" v-model="newTask.title" required>
                            </div>
                            <div class="mb-3">
                                <label for="taskDescription">Descripción de la Tarea:</label>
                                <textarea class="form-control" id="taskDescription"
                                    v-model="newTask.description"></textarea>
                            </div>
                            <div class="text-end">
                                <button type="submit" class="btn btn-success text-end">Agregar Tarea</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-8">
                <div class="card shadow">
                    <div class="card-body">
                        <h4 class="text-center">Lista de Tareas</h4>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Titulo</th>
                                    <th scope="col">Descripción</th>
                                    <th scope="col">¿Completada?</th>
                                    <th colspan="2">Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(task, index) in tasks" :key="index">
                                    <th scope="row">{{ index + 1 }}</th>
                                    <td>{{ task.title }}</td>
                                    <td>{{ task.description }}</td>
                                    <td>
                                        <div v-if="task.completed == false" style="color: red">
                                            No
                                        </div>
                                        <div v-if="task.completed == true" style="color: green">
                                            Si
                                        </div>
                                    </td>
                                    <td><button class="btn btn-success btn-sm" @click="completeTask(task)"
                                            :disabled="task.completed">Completado</button></td>
                                    <td><button class="btn btn-danger btn-sm" @click="deleteTask(task)">Eliminar</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';
import { reactive } from 'vue';
import { useStore } from 'vuex';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    setup() {
        const store = useStore();
        const newTask = reactive({
            title: '',
            description: ''
        });

        const confirmOption = (title ,message, icon) => {
            return Swal.fire({
                title: title,
                text: message,
                icon: icon, 
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Aceptar',
                cancelButtonColor: '#f24b27',
                confirmButtonColor: '#81bd00'
            });
        }

        const toast = (message, icon) => {
            Swal.fire({
                text: message,
                icon: icon,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                toast: true
            });
        }

        const addTask = () => {
            if (newTask.title.trim() === '') {
                toast('El titulo de la tarea no puede estar vacio', 'error');
                return;
            }
            store.commit('addTask', { title: newTask.title, description: newTask.description, completed: false });
            newTask.title = '';
            newTask.description = '';
            toast('Tarea agregada correctamente', 'success');
        };

        const completeTask = (task) => {
            confirmOption('¿Estas Seguro?', 'Estos cambios no se pueden revertir', 'warning').then(r => {
                if(r.isConfirmed){
                    store.commit('completeTask', task);
                    toast('Tarea Completada', 'success');
                }
            }).catch(r => {
                toast('A ocurrrido un error', 'warning');
            })
        };

        const deleteTask = (task) => {
            confirmOption('¿Estas Seguro?', '¿Estas seguro que quieres eliminar esta tarea?', 'warning').then(r => {
                if(r.isConfirmed){
                    store.commit('deleteTask', task);
                    toast('Tarea Eliminada', 'success');        
                }
            }).catch(r => {
                toast('A ocurrido un error', 'warning');
            });
        };

        return {
            newTask,
            addTask,
            completeTask,
            deleteTask,
            tasks: store.state.tasks
        };
    }
};
</script>
  
<style>
.titulo {
    padding: 40px 0 40px 0;
    color: #1a171c;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 500;
}

.container {
    margin-top: 20px;
}
</style>
  
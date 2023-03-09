<template>
    <v-container class="full-height">
        <v-card class="mt-10 pa-5 full-height expand-card-table-container">
            <template v-if="waitingResponse">
                <v-skeleton-loader type="table" height="100%"></v-skeleton-loader>
            </template>

            <v-data-table
                v-else
                :headers="headers"
                :items="items"
            >

                <template v-slot:[`item.actions`]="{item}">
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn  v-bind="attrs"  v-on="on" icon>
                                <v-icon color="grey">mdi-dots-vertical</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item-group shaped active-class="white">
                                <v-list-item @click="openEditPage(item)">
                                    <v-list-item-title>
                                        Actualizar
                                    </v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="showDeleteModal(item)">
                                    <v-list-item-title>
                                        Eliminar
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list-item-group>
                        </v-list>
                    </v-menu>
                </template>

            </v-data-table>

            <!--//TODO: UPDATE THE FIXED BUTTON-->
            <v-fab-transition>
                <v-btn
                    @click="addNewCar"
                    color="blue"
                    dark
                    absolute
                    bottom
                    right
                    fab
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-fab-transition>
            
        </v-card>

        <DeleteConfirmation @delete="destroy" :loading="waitingResponse" v-model="deleteModal" />

    </v-container>
    
</template>

<script>
import Table from "../components/Common/Table.vue";
import CarService from "../services/CarsService";
import DeleteConfirmation from "../components/Common/DeleteConfirmation.vue";

export default {
    extends:Table,
    components:{
        DeleteConfirmation
    },
    data() {
        return {
            apiService:CarService,
            createdEvent:"car-created",
            updatedEvent:"car-updated",
            headers:[
                { 
                    text: "type", 
                    value:"type",
                    align:"center",
                    class:"text-uppercase caption font-weight-light"
                },
                { 
                    text: "brand", 
                    value:"brand",
                    align:"center",
                    class:"text-uppercase caption font-weight-light"
                },
                { 
                    text: "model", 
                    value:"model",
                    align:"center",
                    class:"text-uppercase caption font-weight-light"
                },
                { 
                    text: "", 
                    value:"actions",
                    align:"center",
                    class:"text-uppercase caption font-weight-light"
                },
            ]
        }
    },
    methods:{
        addNewCar() {
            //TODO: OPEN DIALOG
        },
        newCarCreated(payload) {
            this.items.unshift(payload);
        },
        carUpdated(carUpdated) {
            this.items = this.items.map((item) => {
                if (item.id === carUpdated.id) {
                    item = carUpdated;
                }
                return item;
            } );
        }
    },
    mounted() {
        VueEvent.listen(this.createdEvent,this.newCarCreated);
        VueEvent.listen(this.updatedEvent,this.carUpdated);
    },
    beforeDestroy() {
        VueEvent.unlisten(this.createdEvent,this.newCarCreated);
        VueEvent.listen(this.createdEvent,this.carUpdated);
    }
}
</script>

<style>

    /*
        //TODO: when i will add the layout, change to 100 %;
    */
    .full-height {
        height: 90%;
    }

    .expand-card-table-container {
        height: cal(100vh - 32px - 48px);
        overflow-y: auto;
        overflow-x:hidden;
        position: relative;
    }
    .expand-card-table-container .v-data-footer {
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
    }

</style>
<template>
    <v-dialog v-model="visible" persistent :max-width="width">
        <v-card class="pb-4">
            <v-card-title>
                <h6 class="text-h blue-grey--text text--darken-4">
                    ¿Estas seguro de eliminar este registro?
                </h6>
            </v-card-title>
            <v-card-text>
                <div>
                    <span class="text-title-1">
                        Si aceptas eliminarlo, el registro se eliminara de manera permanente
                    </span>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    :loading="loading"
                    depressed
                    :color="deleteColor"
                    class="darken-2 white--text"
                    @click="confirm"
                >
                    Eliminar
                </v-btn>

                <v-btn
                    :disabled="loading"
                    text
                    outlined
                    class="darken-2"
                    @click="cancel"
                >
                    Cancelar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    props:{
        value:{},
        loading:{
            type:Boolean,
            default:false
        },
        deleteColor:{
            type:String,
            default:"red"
        }
    },
    computed:{
        width() {
            return 500;
        }
    },
    watch:{
        value:{
            inmediate:true,
            handler:function(value){
                if (value !== this.visible) {
                    this.visible = value;
                }
            }
        },
        visible(visible){
            if (visible !== this.value)  {
                this.$emit("input",visible);
            }
        },
        loading(newValue,old) {
            if (old === true && newValue == false){
                this.visible = false;
            }
        }
    },
    data() {
        return {
            visible:false
        }
    },
    methods:{
        confirm() {
            this.$emit('delete');
        },
        cancel() {
            this.visible = false;
        }   
    }
}
</script>
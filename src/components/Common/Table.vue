<template>

</template>

<script>
export default {

    data() {
        return {
            apiService:null,
            waitingResponse:false,
            query:{
                patterns:""
            },
            items:[],
            deleteModal:false,
            itemToDelete:null
        }
    },
    methods:{
        async getItems(){
            try{

                if (!this.apiService){
                    console.log("No api service declarated...");
                }

                this.waitingResponse = true;

                let params = null;

                let response = {};


                response = await this.apiService.index(params);

                this.items = response.data;

            }catch(error) {
                console.log(error);
            }

            this.waitingResponse = false;
        },
        showDeleteModal(item = null) {
            this.itemToDelete = item;
            this.deleteModal = true;
        },
        async destroy() {
            this.waitingResponse = true;
            try {
                
                let response = await this.apiService.destroy(this.itemToDelete.id);

                this.items = this.items.filter( (item) => item.id !== this.itemToDelete.id );

                //TODO:SHOW NOTIFICATION

            }catch(error){
                console.log(error);
            }
            this.waitingResponse = false;
        }
    },
    mounted() {
        this.getItems();
    }

}
</script>
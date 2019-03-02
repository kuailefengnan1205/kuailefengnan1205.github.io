<template>
    <div>
        <p v-text="questions[id]"></p>
    </div>
</template>
<script>
export default {
    data() {
        return {
            questions:this.$store.state.questions,
            id:""
        }
    },
    created() {
        this.id = this.$route.params.id
    },
    beforeRouteUpdate (to, from, next) {
        next();
         this.id = this.$route.params.id
    }
}
</script>
<style scoped>

</style>

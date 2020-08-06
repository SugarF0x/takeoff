<template>
  <v-card class="ma-3"
  >
    <v-img
      height="200px"
      :src="user.avatar"
    />
    <v-card-title>{{ user.full_name }}</v-card-title>
    <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio repudiandae sint voluptate? Aperiam consequatur culpa cupiditate illum repudiandae saepe voluptas.
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "contact",
    props: {
      user: Object
    }
  }
</script>

<style scoped>

</style>

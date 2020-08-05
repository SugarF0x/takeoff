<template>
  <v-layout row>
    <v-row justify="center">
      <v-col col="12"
             md="5"
             lg="4"
             xl="3"

             v-for="user in users"
             :key="user.id"
      >
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
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
  export default {
    async asyncData(context) {
      let response = await context.app.$axios.$get("/api/auth/getFriends");
      return { users: response }
    }
  };
</script>

<template>
  <v-layout row>
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="1">
        <v-btn @click="logout">Logout</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col col="12"
             md="5"
             lg="4"
             xl="3"

             v-for="user in users"
             :key="user.id"
      >
        <contact :user="user"/>
      </v-col>
      <v-col col="12"
             md="5"
             lg="4"
             xl="3"
      >
        <contact isNew
                 @addContact="add($event)"
        />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
  /*
    TODO: На странице контактов должна быть возможность добавлять/удалять/редактировать контакты,
     также желательно наличие функции поиска.
   */
  export default {
    middleware: ['auth'],
    async asyncData(context) {
      let response = await context.app.$axios.$get("/auth/getFriends");
      return { users: response }
    },
    methods: {
      logout() {
        this.$auth.logout();
        window.location.reload();
      },
      add(user) {
        user.id = Math.floor(Math.random()*1000000);
        this.users.push(user)
      }
    }
  };
</script>

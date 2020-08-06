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
             :key="Math.random()"
      >
        <contact :user="user"
                 @deleteContact="del($event)"
                 @edit="put($event)"
        />
      </v-col>
      <v-col col="12"
             md="5"
             lg="4"
             xl="3"
      >
        <contact isNew
                 @addContact="users.push($event)"
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
      del(id) {
        delete this.users[this.users.findIndex(entry => {
          return entry.id === id;
        })];
        this.users = this.users.filter(entry => {
          return entry !== undefined
        })
      },
      put(user) {
        let index = this.users.findIndex(entry => {
          return entry.id === user.id;
        });
        this.users[index].full_name = user.full_name;
        this.users[index].details   = user.details;
      }
    }
  };
</script>

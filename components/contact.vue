<template>
  <v-card class="ma-3">
    <div v-if="!isNew">
      <v-img height="200px"
             :src="user.avatar
                   ? user.avatar
                   : `https://placehold.it/200x200?text=${user.full_name ? user.full_name : 'lorem name'}`"
      />
      <v-card-title v-if="user.full_name">
        {{ user.full_name }}

      </v-card-title>
      <v-card-title v-else>
        Lorem ipsum dolor.
      </v-card-title>
      <v-card-text v-if="user.details">
        {{ user.details }}
      </v-card-text>
      <v-card-text v-else>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio repudiandae sint voluptate? Aperiam consequatur culpa cupiditate illum repudiandae saepe voluptas.
      </v-card-text>
    </div>
    <div v-else>
      <v-card-title>Add new contact</v-card-title>
      <v-card-text>
        <v-text-field placeholder="Name"
                      v-model="name"
        />
        <v-textarea placeholder="Details"
                    v-model="details"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="$emit('addContact', newUser)">
          add
        </v-btn>
      </v-card-actions>
    </div>
  </v-card>
</template>

<script>
  export default {
    name: "contact",
    props: {
      user: Object,
      isNew: Boolean
    },
    data() {
      return {
        name: '',
        details: ''
      }
    },
    computed: {
      newUser() {
        return {
          full_name: this.name,
          details: this.details
        }
      }
    }
  }
</script>

<style scoped>

</style>

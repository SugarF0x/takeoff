<template>
  <v-card class="ma-3">
    <v-btn fab
           text
           class="delete"
           v-if="!isNew"
           @click="$emit('deleteContact', user.id)"
    >
      <v-icon>
        mdi-delete
      </v-icon>
    </v-btn>
    <v-btn fab
           text
           class="edit"
           v-if="!isNew"
           @click="modify = true"
    >
      <v-icon>
        mdi-pencil
      </v-icon>
    </v-btn>
    <div v-if="isNew">
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
    <div v-else-if="modify">
      <v-img height="200px"
             :src="user.avatar
                   ? user.avatar
                   : `https://placehold.it/200x200?text=${user.full_name ? user.full_name : 'lorem name'}`"
      />
      <v-card-title>
        <v-text-field v-model="name"></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-textarea v-model="details"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="put()">Confirm</v-btn>
      </v-card-actions>
    </div>
    <div v-else>
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
  </v-card>
</template>

<script>
  export default {
    name: "contact",
    props: {
      user:  Object,
      isNew: Boolean
    },
    data() {
      return {
        name:    this.user && this.user.full_name ? this.user.full_name : '',
        details: this.user && this.user.details   ? this.user.details   : '',
        modify:  false,
        id: null
      }
    },
    computed: {
      newUser() {
        let data = {
          full_name: this.name,
          details:   this.details,
          id:        this.user && this.user.id ? this.user.id : this.id
        };
        if (this.user && this.user.avatar) {
          data.avatar = this.user.avatar;
        }
        return data;
      }
    },
    methods: {
      put() {
        this.$emit('edit', this.newUser);
        this.modify = false;
      }
    },
    mounted() {
      setInterval(() => {
        this.id = Math.random();
      },1)
    }
  }
</script>

<style scoped>
  .delete {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9999;
    color: red;
  }
  .edit {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9999;
  }
</style>

<template>
  <v-layout column>
    <v-row justify="center">
      <v-col cols="2">
        <v-card>
          <v-card-title>
            test user data
          </v-card-title>
          <v-card-text>
            <p>email: test@test.test</p>
            <p>password: 123123123</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center"
           justify="center"
    >
      <v-col cols="12"
             sm="8"
             md="6"
             lg="5"
             xl="4"
      >
        <v-card class="elevation-12">
          <v-toolbar flat>
            <v-toolbar-title>Login form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form v-model="isValid"
                    ref="form"
            >
              <v-text-field label="Email"
                            name="email"
                            prepend-icon="mdi-email"
                            type="email"
                            v-model="formFields.email.input"
                            :rules="formFields.email.rules"
                            validate-on-blur
                            @keypress.enter="verify"
              ></v-text-field>
              <v-text-field id="password"
                            label="Password"
                            name="password"
                            prepend-icon="mdi-lock"
                            type="password"
                            v-model="formFields.password.input"
                            :rules="formFields.password.rules"
                            validate-on-blur
                            @keypress.enter="verify"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn :disabled="!isValid"
                   class="success darken-1"
                   @click="verify"
            >
              Sign in
              <v-icon right>mdi-account-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-alert
        v-model="alert.visible"
        dense
        dismissible
        type="error"
      >
        {{ alert.message }}
      </v-alert>
    </v-row>
  </v-layout>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        isValid: false,
        alert: {
          visible: false,
          message: ''
        },
        formFields: {
          email: {
            input: '',
            rules: [
              v => !!v                                     || 'E-mail is required',
              v => /^[a-z0-9.-@]*$/i.test(v)               || 'Only digits, latin letters as well as . and - are allowed',
              v => /^[a-z0-9].*$/i.test(v)                 || 'Email must begin with digit or a latin letter',
              v => /^.*@.*$/i.test(v)                      || 'Email must contain @ symbol',
              v => /^([a-z0-9]+[-.]?)*@.*$/i.test(v)       || 'Symbol repetition is not allowed',
              v => /^.*[a-z0-9]@.*$/i.test(v)              || 'A digit or a latin letter is to be before @ symbol',
              v => /^.*@[a-z0-9].*$/i.test(v)              || 'Domain is to begin with a digit or a latin letter',
              v => /^.*@(.+\.+)+.*$/i.test(v)              || 'Domain must contain at least one dot',
              v => /^.*@([a-z0-9]+[-.]?)*[a-z]*$/i.test(v) || 'Domain symbol repetition is not allowed',
              v => /^.*[0-9a-z]$/i.test(v)                 || 'Domain must end with either a digit or a latin letter'
            ]
          },
          password: {
            input: '',
            rules: [
              v => !!v                  || 'Password is required',
              v => (v && v.length >= 8) || 'Password must be 8 characters or more',
              v => /^\S+$/.test(v)      || 'No spaces are allowed'
            ]
          }
        }
      }
    },
    methods: {
      async loginUser() {
        try {
          await this.$auth.loginWith('local', {data: {
            email:    this.formFields.email.input,
            password: this.formFields.password.input
          }});
        } catch (err) {
          console.log(err)
        }
      },
      async verify() {
        await this.$refs.form.validate();
        if (this.isValid) {
          try {
            let response = await this.$axios.post("/auth/verify", {
              email:    this.formFields.email.input,
              password: this.formFields.password.input
            }).catch((err) => {
              this.alert.visible = true;
              this.alert.message = err.response.data.message;
            });
            if (response) {
              if (response.data.result) {
                this.loginUser();
              }
            }
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
  }
</script>

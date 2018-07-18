<template lang='pug'>

v-flex(
  xs12
  md6
)
  v-card
    v-container( grid-list-md )
      v-card-actions
        v-layout( wrap )
          v-flex( xs12 )
            v-text-field(
              :label='$t("username")'
              :value='username'
              @input='$emit("username", $event)'
              :error-messages='errors.collect("username")'
              v-validate='{ min: 5, max: 30, alpha_num: true }'
              data-vv-name='username'
            )

          v-flex( xs12 )
            v-text-field(
              :label='$t("password")'
              :value='password'
              @input='$emit("password", $event)'
              :append-icon='passVisible ? "visibility" : "visibility_off"'
              @click:append='passVisible = !passVisible'
              :error-messages='errors.collect("password")'
              :type='passVisible ? "text" : "password"'
              ref='password'
              v-validate='{ min: 5, max: 30, regex: /^\\S+$/ }'
              data-vv-name='password'
            )

          v-flex( xs12 )
            v-text-field(
              :label='$t("passwordConfirm")'
              v-model='passwordConfirm'
              @click:append='passConfirmVisible = !passConfirmVisible'
              :append-icon='passConfirmVisible ? "visibility" : "visibility_off"'
              :error-messages='errors.collect("passwordConfirm")'
              :type='passConfirmVisible ? "text" : "password"'
              v-validate='{ confirmed: "password" }'
              data-vv-name='passwordConfirm'
            )
</template>

<script>
export default {
  name: 'SettingUserInfo',
  props: [
    'username',
    'password'
  ],
  data: ( ) => ( {
    passwordConfirm: '',
    passVisible: false,
    passConfirmVisible: false
  } ),
  computed: {
    hasError() {
      return this.errors.any( );
    }
  },
  watch: {
    hasError( value ) {
      this.$emit( 'error', value );
    }
  }
};
</script>

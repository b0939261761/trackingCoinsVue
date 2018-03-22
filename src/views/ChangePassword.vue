<template lang='pug'>

v-content
  v-container(
    fluid,
    fill-height
  )
    v-layout(
      align-center,
      justify-center
    )
      v-flex(
        xs12,
        sm8,
        md6
      )
        v-card
          v-toolbar(
            dark,
            color='primary'
          )
            v-toolbar-title
              | Новый пароль

            v-spacer
            v-btn(
              @click='onBack'
              flat
              small
              color="white"
            )
              | Назад

          template( v-if='isSubmit' )
            v-card-text
              v-alert(
                :type='alertSendType'
                value='true'
                transition='scale-transition'
                )
                  | {{ alertSendText }}

            v-card-actions( v-if='isChange' )
              v-spacer
              v-btn(
                  @click='onGoHome'
                  color='primary'
                )
                  | Перейти на главную

          template( v-else )
            v-card-text
              v-text-field(
                label='Пароль'
                v-model='password'
                :append-icon='passIcon'
                :append-icon-cb='passIconClick'
                :error-messages="errors.collect('password')"
                :type='passType'
                name='password'
                v-validate="'required'"
                data-vv-name='password'
                data-vv-as='Пароль'
              )

              v-text-field(
                label='Подтверждение пароля'
                v-model='passwordConfirm'
                :append-icon='passConfIcon'
                :append-icon-cb='passConfIconClick'
                :error-messages="errors.collect('passwordConfirm')"
                :type='passConfType'
                v-validate="'required|confirmed:password'"
                data-vv-name='passwordConfirm'
                data-vv-as='Подтверждение пароля'
              )

            v-card-actions
              v-spacer
              v-btn(
                  @click='onSubmit'
                  color='primary'
                  :disabled='isDisabledSave'
                )
                  | Сохранить
</template>

<script>

export default {
  props: {
    token: String
  },
  data: ( ) => ( {
    password: '',
    passwordConfirm: '',
    passVisible: false,
    passConfVisible: false,
    isSubmit: false,
    isChange: false
  } ),
  computed: {
    alertSendType( ) {
      return this.isChange ? 'success' : 'error'
    },
    alertSendText( ) {
      return this.isChange ?
        'Пароль изменен.' :
        'Операция завершилась неудачно, попробуйте позже.'
    },
    isDisabledSave( ) {
      return !this.password || !this.passwordConfirm || this.errors.any( );
    },
    passType( ) {
      return this.passVisible ? 'text' : 'password';
    },
    passIcon( ) {
      return this.passVisible ? 'visibility' : 'visibility_off'
    },
    passIconClick( ) {
      return ( ) => this.passVisible = !this.passVisible;
    },
    passConfType( ) {
      return this.passConfVisible ? 'text' : 'password';
    },
    passConfIcon( ) {
      return this.passConfVisible ? 'visibility' : 'visibility_off'
    },
    passConfIconClick( ) {
      return ( ) => this.passConfVisible = !this.passConfVisible;
    }
  },
  methods: {
    onSubmit () {
      this.$validator.validateAll( ).then( result => {
        if ( result ) {
          this.$store.dispatch( 'auth/changePassword', { password: this.password } )
            .then( status => {
              this.isSubmit = true;
              this.isChange = status;
            } );
        }
      } )
    },
    onBack( ) {
      this.$router.push( { name: 'signIn' } );
    },
    onSave( ) {
      this.$router.push( { name: 'home' } );
    },
    onGoHome( ) {
      this.$router.push( { name: 'home' } );
    }
  }
}
</script>

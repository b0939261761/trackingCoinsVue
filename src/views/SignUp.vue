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
              | Регистрация

            v-spacer
            v-btn(
              @click='onBack'
              flat
              small
              color="white"
            )
              | Назад

          v-card-text( v-if='isSubmit' )
            v-alert(
                :type='alertType'
                :value='true'
                transition='scale-transition'
              )
                | {{ alertText }}

          template( v-else )
            v-card-text
              form( @submit.prevent='onSubmit' )

                v-text-field(
                  label='Имя',
                  v-model='username',
                  :error-messages="errors.collect('username')"
                  v-validate="'required'"
                  data-vv-name="username"
                  data-vv-as='Имя'
                )

                v-text-field(
                  label='E-mail',
                  v-model='email',
                  :error-messages="errors.collect('email')"
                  v-validate='{ required: true, email: true, check_email: true }'
                  data-vv-delay='500'
                  data-vv-name='email'
                )

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
                    :disabled='isDisabled'
                    @click='onSubmit'
                    color='primary'
                  )
                    | Зарегистрироваться
</template>

<script>
export default {
  data: ( ) => ( {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    passVisible: false,
    passConfVisible: false,
    isSubmit: false,
    isSend: true
  } ),
  computed: {
    alertType( ) { return this.isSend ? 'success' : 'error' },
    alertText( ) {
      return this.isSend ?
        'Письмо с ссылкой подтверждения отправлено на email.' :
        'Регистрация завершилась неудачно, попробуйте позже.'
    },
    isDisabled( ) {
      return !this.username || !this.email || !this.password || !this.passwordConfirm || this.errors.any( );
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
          const { username, email, password } = this
          this.$store.dispatch( 'auth/signUp', { username, email, password } )
            .then( status => {
              this.isSend = status;
              this.isSubmit = true;
            } );
        }
      } )

    },
    onBack( ) {
      this.$router.push( { name: 'signIn' } );
    }
  }
}
</script>

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

          template( v-if='isConfirmed' )
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
                  @click='onSave'
                  color='primary'
                  :disabled='isDisabledSave'
                )
                  | Сохранить

          template( v-else )

            v-card-text( v-show='alertConfirmed' )
              v-alert(
                v-model='alertConfirmed'
                :type='alertComfirmedType'
                dismissible
              )
                | {{ alertComfirmedText }}

            v-card-text( v-if='isSubmit' )
              v-alert(
                :type='alertSendType'
                value='true'
                transition='scale-transition'
                )
                  | {{ alertSendText }}

            template( v-else )
              v-card-text
                form( @submit.prevent='onSubmit' )
                  v-text-field(
                    label='E-mail',
                    v-model='email',
                    :error-messages="errors.collect('email')"
                    v-validate="{ required: true, email: true, uncheck_email: true }"
                    data-vv-delay='500'
                    data-vv-name='email'
                  )

              v-card-actions
                v-spacer
                v-btn(
                    :disabled='isDisabled'
                    @click='onSubmit'
                    color='primary'
                  )
                    | Выслать
</template>

<script>
import { Validator } from 'vee-validate';
import store from '@/store/'

Validator.extend( 'uncheck_email', {
  getMessage: field => `Пользователь с данным email отсуствует.`,
  validate: value => new Promise( ( resolve ) =>
    store.dispatch( 'auth/checkUser', value )
      .then( status => resolve( { valid: status } ) )
  )
} );

export default {
  props: ['token'],
  data: ( ) => ( {
    alertConfirmed: true,
    email: 'b360124@gmail.c',
    isConfirmed: true,
    password: '',
    passwordConfirm: '',
    passVisible: false,
    passConfVisible: false,
    isSubmit: false,
    isSend: false
  } ),
  computed: {
    alertComfirmedType( ) { return this.isConfirmed ? 'success' : 'error' },
    alertComfirmedText( ) {
      return this.isConfirmed ?
        'Аккаунт активирован.' :
        'Ошибка при активации, попробуйте выслать подтверждение повторно.'
    },
    alertSendType( ) { return this.isSend ? 'success' : 'error' },
    alertSendText( ) {
      return this.isSend ?
        'Письмо с ссылкой подтверждения отправлено на email.' :
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
          this.$store.dispatch( 'auth/repeatConfirmation', this.email )
            .then( status => {
              this.alertConfirmed = false;
              this.isSubmit = true;
              this.isSend = status;
              console.log( status )
            } );
        }
      } )
    },
    onBack( ) {
      this.$router.push( { name: 'signIn' } );
    },
    onSave( ) {
      this.$router.push( { name: 'home' } );
    }
  },
  created( ) {
    if ( this.$route.query ) history.replaceState(null, null, this.$route.path );

    if ( this.token ) {
      this.$store.dispatch( 'auth/confirmRegistration', this.token )
        .then( status => {
          this.isConfirmed = status
          if ( status ) {
            this.timer = setTimeout( ( ) => this.onGoHome( ), 2000 );
          }
        } )
    }
  },
  beforeDestroy( ) {
    clearTimeout( this.timer );
  }
}
</script>

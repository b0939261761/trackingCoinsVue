import Vue from 'vue';
import Router from 'vue-router';
import { getRefreshToken, removeTokens } from '@/cookies';
import store from '@/store/';

Vue.use( Router );

const settingsBeforeEnter = async ( to, from, next ) => {
  await store.dispatch( 'user/userInfo' )
    .then( status => {
      if ( !status ) {
        removeTokens( );
        router.push( { name: 'signIn' } );
        return false;
      }
    } );
  next( );
};

const notificationsBeforeEnter = async ( to, from, next ) => {
  await store.dispatch( 'notifications/getNotifications' );
  next( );
};

const confrimRegistrationBeforeEnter = async ( to, from, next ) => {
  const token = to.query.token;
  let routeName = 'repeatConfirmation';
  if ( token ) {
    try {
      await store.dispatch( 'auth/confirmRegistration', { token } );
      routeName = 'home';
    } catch ( error ) { };
  }

  next( { name: routeName } );
};

const confrimRecoveryBeforeEnter = async ( to, from, next ) => {
  const token = to.query.token;
  let routeName = 'recoveryPassword';

  if ( token ) {
    try {
      await store.dispatch( 'auth/confirmRecovery', { token } );
      routeName = 'changePassword';
    } catch ( error ) { };
  }

  next( { name: routeName, params: { token: token } } );
};

const router = new Router( {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: ( ) => import( '@/views/Home' ),
      children: [
        {
          path: 'settings',
          name: 'settings',
          component: ( ) => import( '@/views/Settings' ),
          beforeEnter: settingsBeforeEnter
        },
        {
          path: 'notifications',
          name: 'notifications',
          component: ( ) => import( '@/views/Notifications' ),
          beforeEnter: notificationsBeforeEnter
        }
      ]
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: ( ) => import( '@/views/SignIn' ),
      meta: { type: 'auth' }
    },
    {
      path: '/sign_up',
      name: 'signUp',
      component: ( ) => import( '@/views/SignUp' ),
      meta: { type: 'auth' }
    },
    {
      path: '/recovery_password',
      name: 'recoveryPassword',
      component: ( ) => import( '@/views/RecoveryPassword' ),
      meta: { type: 'auth' }
    },
    {
      path: '/confirm_registration',
      name: 'confrimRegistration',
      meta: { type: 'auth' },
      beforeEnter: confrimRegistrationBeforeEnter
    },
    {
      path: '/repeat_confirmation',
      name: 'repeatConfirmation',
      component: ( ) => import( '@/views/RepeatConfirmation' ),
      meta: { type: 'auth' }
    },
    {
      path: '/confirm_recovery',
      name: 'confrimRecovery',
      meta: { type: 'auth' },
      beforeEnter: confrimRecoveryBeforeEnter
    },
    {
      path: '/change_password',
      name: 'changePassword',
      component: ( ) => import( '@/views/ChangePassword' ),
      props: true,
      meta: { type: 'auth' }
    },
    {
      path: '/error',
      name: 'error',
      component: ( ) => import( '@/views/E404' ),
      meta: { type: 'error' }
    },
    {
      path: '*',
      redirect: { name: 'error' }
    }
  ]
} );

router.beforeEach( ( to, from, next ) => {
  switch ( to.meta.type ) {
    case 'auth':
      removeTokens( );
      next( );
      break;

    case 'error':
      next( );
      break;

    default:
      if ( !getRefreshToken( ) ) {
        store.commit( 'setError', { code: 1000, message: 'Token' } );
        next( { name: 'signIn' } );
      } else {
        next( );
      }
  }
} );

export default router;

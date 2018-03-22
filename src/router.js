import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import About from './views/About.vue';
import Cookies from 'js-cookie';
import store from '@/store/';

Vue.use( Router );

const router = new Router( {
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/sign_in',
      name: 'signIn',
      component: ( ) => import( '@/views/SignIn' )
    },
    {
      path: '/sign_up',
      name: 'signUp',
      component: ( ) => import( '@/views/SignUp' )
    },
    {
      path: '/recovery_password',
      name: 'recoveryPassword',
      component: ( ) => import( '@/views/RecoveryPassword' )
    },
    {
      path: '/confirm_registration',
      name: 'confrimRegistration',
      component: ( ) => import( '@/views/ConfirmRegistration' ),
      props: ( route ) => ( { token: route.query.token } )
    },
    {
      path: '/confirm_recovery',
      name: 'confrimRecovery',
      async beforeEnter( to, from, next ) {
        const token = to.query.token;
        let routeName = 'errorRecovery';

        if ( token ) {
          await store.dispatch( 'auth/confirmRecovery', token )
            .then( status => {
              if ( status ) {
                routeName = 'newPassword';
              }
            } );
        }

        router.push( { name: routeName } );
      }
    },
    {
      path: '/error_recovery',
      name: 'errorRecovery',
      component: ( ) => import( '@/views/ErrorRecovery' )
    },
    {
      path: '/new_password',
      name: 'newPassword',
      component: ( ) => import( '@/views/NewPassword' )
    }

  ]
} );

router.beforeEach( ( to, from, next ) => {
  if ( to.meta.requiresAuth && !Cookies.get( 'refreshToken' ) ) {
    router.push( { name: 'signIn' } );
  } else {
    next( );
  }
} );

export default router;

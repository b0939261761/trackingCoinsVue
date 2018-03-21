import store from '@/store/';

import { Validator } from 'vee-validate';
import ru from 'vee-validate/dist/locale/ru';

Validator.localize( 'ru', ru );

Validator.extend( 'uncheck_email', {
  getMessage: field => `Пользователь с данным email отсуствует.`,
  validate: value => new Promise( ( resolve ) =>
    store.dispatch( 'auth/checkUser', value )
      .then( status => resolve( { valid: status } ) )
  )
} );

Validator.extend( 'check_email', {
  getMessage: field => `Пользователь с данным email существует.`,
  validate: value => new Promise( ( resolve ) =>
    store.dispatch( 'auth/checkUser', value )
      .then( status => resolve( { valid: !status } ) )
  )
} );

export default Validator;

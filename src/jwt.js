export const parseJwt = token => {
  const payload = ( token.match( /(?:\.(.*)\.)/ ) || [ ] )[ 1 ];

  try {
    return payload && JSON.parse( window.atob( payload ) );
  } catch( e ) {
  }
};

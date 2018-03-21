
const parseJwt = token => {
  const payload = ( token.match( /(?:\.(.*)\.)/ ) || [ ] )[ 1 ];

  try {
    return payload && JSON.parse( window.atob( payload ) );
  } catch( e ) {
  }
};



// console.log( parseJwt('eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoxLCJ0eXBlIjoicG9zdCIsImV4cCI6MTUyMTQ5MTUyNX0.lA3GaHCfNFcHLv16Fseyt7IoXEu5_vCXUm6V1Tf9UT') )

jwt = {user: 1, type: "post", exp: 1521491525 }



var date = new Date( jwt.exp * 1000  );
console.log( date.to )

var date2 = new Date(  );
console.log( date2 )




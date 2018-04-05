export default {
  langImage( state ) {
    return state.languages.find( value => value.lang === state.currentLang ).image;
  },
  languagesWithoutActive( state ) {
    return state.languages.filter( value => value.lang !== state.currentLang );
  }
};

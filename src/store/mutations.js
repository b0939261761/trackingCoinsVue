export default {
  showLoader( state ) {
    state.isLoader = true;
  },
  hideLoader( state ) {
    state.isLoader = false;
  },
  setCurrentLang( state, { lang } ) {
    state.currentLang = lang;
  }
};

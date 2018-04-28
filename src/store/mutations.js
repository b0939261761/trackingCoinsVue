export default {
  showLoader: state => ( state.isLoader = true ),
  hideLoader: state => ( state.isLoader = false ),
  setCurrentLang: ( state, { lang } ) => ( state.currentLang = lang ),
  setError: ( state, { code, message, customCode } = { } ) => {
    state.error.code = code;
    state.error.message = message;
    state.error.customCode = customCode;
  }
};

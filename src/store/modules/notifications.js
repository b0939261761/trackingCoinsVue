import http from '@/http';

// Объеденить 2 слова в camelCase
// const compare2Word = ( word1, word2 ) => `${ word1 }${ word2.replace( /^./, letter => letter.toUpperCase( ) ) }`;
const snake2Camel = word => word.replace( /_\w/g, letter => letter[ 1 ].toUpperCase( ) );

const objectKeyToCamel = obj => {
  const objNew = { };
  Object.keys( obj ).forEach( el => ( objNew[ snake2Camel( el ) ] = obj[ el ] ) );
  return objNew;
};

export default {
  namespaced: true,
  state: {
    notifications: [ ],
    exchanges: [ ],
    pairs: [ ],
    directions: [
      { id: 'less', sort: 1, icon: 'arrow_downward', color: 'green darken-2' },
      { id: 'above', sort: 2, icon: 'arrow_upward', color: 'primary' }
    ],
    activatedes: [
      { id: true, name: 'on', icon: 'notifications_active', color: 'teal darken-3' },
      { id: false, name: 'off', icon: 'notifications_off', color: 'teal lighten-3' }
    ]
  },
  getters: {
    getNotifications: state => state.notifications,
    getExchanges: state => state.exchanges,
    getPairs: state => state.pairs,
    getDirections: state => state.directions,
    isNotificationsAny: ( _, getters ) => Boolean( getters.getNotifications.length ),
    isPairsAny: ( _, getters ) => Boolean( getters.getPairs.length ),
    isExchangesAny: ( _, getters ) => Boolean( getters.getExchanges.length ),
    getDirection: state => id => state.directions.find( el => el.id === id ),
    getActivated: state => id => state.activatedes.find( el => el.id === id ),
    getExchange: state => ids => state.exchanges.filter( el => ids.includes( el.id ) )
  },
  mutations: {
    setNotifications: ( state, notifications ) =>
      ( state.notifications = notifications.map( el => objectKeyToCamel( el ) ) ),
    setExchanges: ( state, newArr ) => ( state.exchanges = [ ...newArr ] ),
    setPairs: ( state, newArr ) => ( state.pairs = [ ...newArr ] ),
    removeNotification: ( { notifications: arr }, index ) => arr.splice( index, 1 ),
    updateNotification: ( state, { index, data } ) => ( state.notifications[ index ] = { ...data } ),
    addNotification: ( state, data ) => state.notifications.push( { ...data } )
  },
  actions: {
    async getNotifications( { commit }, data ) {
      try {
        const response = await http.post( '/get_notifications' );
        commit( 'setNotifications', response.data.notifications );
      } catch ( error ) { };
    },
    async getPairs( { getters, commit } ) {
      if ( !getters.isPairsAny ) {
        try {
          const response = await http.post( '/get_pairs' );
          commit( 'setPairs', response.data.pairs );
        } catch ( error ) { };
      }
    },
    async getExchanges( { getters, commit }, { symbol } ) {
      if ( symbol ) {
        try {
          const response = await http.post( '/get_exchanges', { symbol } );
          commit( 'setExchanges', response.data.exchanges );
        } catch ( error ) { };
      }
    },
    async removeNotification( { commit }, ids ) {
      try {
        const response = await http.post( '/remove_notification', { ids } );
        commit( 'setNotifications', response.data.notifications );
      } catch ( error ) { };
    },
    async editNotification( { commit }, data ) {
      try {
        const response = await http.post( '/edit_notification', data );
        commit( 'setNotifications', response.data.notifications );
      } catch ( error ) { };
    }
  }
};

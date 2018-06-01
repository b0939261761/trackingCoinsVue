<template lang='pug'>
v-dialog(
  :value='show'
  @input='$emit( "update:show", $event )'
  max-width='600px'
)
  v-card
    v-card-title
      span(
        class='headline'
        v-text='formTitle'
      )
    v-card-text
      v-container( grid-list-md )
        v-layout( wrap )
          v-flex(
            xs12
            sm6
          )
            v-select(
              :items='pairs'
              :value='symbol'
              @input='$emit( "update:symbol", $event )'
              :label='$t("pair")'
              autocomplete
              v-validate='{ required: true }'
              data-vv-name='pair'
              :error-messages='errors.collect("pair")'
              :no-data-text='$t("noData")'
            )

          v-flex(
            xs12
            sm6
          )
            v-select(
              :items='exchangesAll'
              :value='exchangeIds'
              :label='$t("exchange")'
              item-text='name'
              item-value='id'
              autocomplete
              v-validate='{ required: true }'
              data-vv-name='exchange'
              :error-messages='errors.collect("exchange")'
              :disabled='loadingExchanges || !symbol'
              :loading='loadingExchanges'
              chips
              deletable-chips
              multiple
              @input='onChangeExchangeAll'
            )
              template(
                slot='item'
                slot-scope='data'
              )
                template( v-if='data.item.id' )
                  v-list-tile-content
                    v-list-tile-title
                      v-checkbox(
                        :label='data.item.name'
                        :input-value='exchangeIds'
                        :value='data.item.id'
                      )
                    v-list-tile-sub-title( v-html="" )
                template( v-else )
                  v-list-tile-content
                    v-list-tile-title
                      v-checkbox(
                        :label='$t("exchangeAll")'
                        v-model='exchangeAllSelected'
                        color="indigo darken-3"
                      )

          v-flex( xs12 )
            v-radio-group(
              :input-value='direction'
              @change='$emit( "update:direction", $event )'
              :row='$vuetify.breakpoint.smAndUp'
            )
              template( slot='label' )
                span(
                  class='mr-1'
                  v-text='$t("direction")'
                )

                v-icon(
                  :color='directionColor'
                  v-text='directionIcon'
                )

              v-radio(
                v-for='item in directions',
                :key='item.id'
                primary
                :label='$t(item.id)'
                :value='item.id'
              )

          v-flex(
            xs12
            sm6
          )
            v-text-field(
              :label='$t("targetPrice")'
              :value='price'
              @input='$emit( "update:price", $event )'
              :error-messages='errors.collect("price")'
              v-validate='{ required: true, decimal: 10, max: 20 }'
              data-vv-name='price'
            )
          v-flex(
            xs12
            sm6
          )
            v-switch(
              :label='$t(activatedName)'
              :input-value='activated'
              @change='$emit( "update:activated", $event )'
              :append-icon='activatedIcon'
            )
    v-card-actions
      v-spacer
      v-btn(
        color='primary'
        flat
        :disabled='loadingExchanges'
        @click='onSubmit'
        v-text='$t("save")'
      )

      v-btn(
        flat
        @click='$emit( "update:show", false )'
        v-text='$t("cancel")'
      )
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers( 'notifications' );

export default {
  name: 'NoticationEdit',
  props: {
    show: Boolean,
    ids: Array,
    exchangeIds: Array,
    symbol: String,
    direction: String,
    price: [ Number, String ],
    activated: Boolean
  },
  data: () => ( {
    loadingExchanges: false,
    directionIcon: null,
    directionColor: null,
    activatedName: null,
    activatedIcon: null,
    exchangesAll: [ ],
    exchangeAllSelected: false
  } ),
  computed: {
    ...mapGetters( {
      exchanges: 'getExchanges',
      pairs: 'getPairs',
      directions: 'getDirections',
      getDirection: 'getDirection',
      getActivated: 'getActivated',
      getExchange: 'getExchange'
    } ),
    formTitle( ) {
      return this.id ? this.$t( 'titleNew' ) : this.$t( 'titleEdit' );
    }
  },
  watch: {
    show: {
      immediate: true,
      handler( val ) {
        if ( val ) this.getPairs( );
      }
    },
    symbol: {
      immediate: true,
      async handler( symbol ) {
        let exchangeIds = [ ];

        if ( symbol ) {
          this.loadingExchanges = true;

          await this.getExchanges( { symbol } );
          exchangeIds = this.getExchange( this.exchangeIds );
          this.exchangesAll = [ { id: 0, name: '' }, { divider: true }, ...this.exchanges ];

          this.loadingExchanges = false;
        };

        this.$emit( 'update:exchangeIds', exchangeIds );
      }
    },
    direction: {
      immediate: true,
      handler( val ) {
        const { icon, color } = this.getDirection( val ) || { };
        this.directionIcon = icon;
        this.directionColor = color;
      }
    },
    activated: {
      immediate: true,
      handler( val ) {
        const { name, icon, color } = this.getActivated( val ) || { };
        this.activatedName = name;
        this.activatedIcon = icon;
        this.activatedColor = color;
      }
    }
  },
  methods: {
    ...mapActions( {
      getExchanges: 'getExchanges',
      getPairs: 'getPairs'
    } ),
    onChangeExchangeAll( event ) {
      const exchangeId = event[ event.length - 1 ];
      let exchangeIds = [ ];

      this.$nextTick( ( ) => {
        if ( exchangeId !== 0 ) {
          exchangeIds = event;
        } else {
          if ( this.exchangeAllSelected ) {
            exchangeIds = this.exchanges.map( el => el.id );
          };
        };
        this.$emit( 'update:exchangeIds', exchangeIds );
      } );
    },
    async onSubmit( ) {
      const result = await this.$validator.validateAll( );
      if ( result ) {
        this.$emit( 'save' );
      };
    }
  },
  i18n: {
    messages: {
      en: {
        titleNew: 'New notification',
        titleEdit: 'Edit notification',
        exchangeAll: 'All exchanges'
      },
      ru: {
        titleNew: 'Новое уведомление',
        titleEdit: 'Редактирование уведомления',
        exchangeAll: 'Все биржи'
      }
    }
  }
};
</script>

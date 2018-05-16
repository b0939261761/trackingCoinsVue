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
              :items='exchanges'
              :value='exchangeId'
              @input='$emit( "update:exchangeId", $event )'
              :label='$t("exchange")'
              item-text='name'
              item-value='id'
              autocomplete
              v-validate='{ required: true }'
              data-vv-name='exchange'
              :error-messages='errors.collect("exchange")'
              ref='exchanges'
            )
          v-flex(
            xs12
            sm6
          )
            v-select(
              :items='pairs'
              :value='pairId'
              @input='$emit( "update:pairId", $event )'
              :label='$t("pair")'
              item-text='symbol'
              item-value='id'
              :loading='loadingPair'
              :disabled='loadingPair || !exchangeId'
              autocomplete
              v-validate='{ required: true }'
              data-vv-name='pair'
              :error-messages='errors.collect("pair")'
              :no-data-text='$t("noData")'
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
              v-validate='{ required: true, decimal: 8, max: 18 }'
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
        :disabled='loadingPair'
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
    id: Number,
    exchangeId: Number,
    pairId: Number,
    direction: String,
    price: [ Number, String ],
    activated: Boolean
  },
  data: () => ( {
    loadingPair: false,
    directionIcon: null,
    directionColor: null,
    activatedName: null,
    activatedIcon: null
  } ),
  computed: {
    ...mapGetters( {
      exchanges: 'getExchanges',
      pairs: 'getPairs',
      directions: 'getDirections',
      getDirection: 'getDirection',
      getActivated: 'getActivated',
      getPair: 'getPair'
    } ),
    formTitle( ) {
      return this.id ? this.$t( 'titleNew' ) : this.$t( 'titleEdit' );
    }
  },
  watch: {
    show: {
      immediate: true,
      handler( val ) {
        this.getExchanges( );
      }
    },
    exchangeId: {
      immediate: true,
      async handler( val ) {
        this.loadingPair = true;
        if ( val ) await this.getPairs( val );

        if ( !this.getPair( this.pairId ) ) {
          this.$emit( 'update:pairId', null );
        };
        this.loadingPair = false;
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
        titleEdit: 'Edit notification'
      },
      ru: {
        titleNew: 'Новое уведомление',
        titleEdit: 'Редактирование уведомления'
      }
    }
  }
};
</script>

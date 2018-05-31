<template lang='pug'>

v-data-table(
  class='elevation-1'
  :headers='headers'
  :items='notifications'
  :rows-per-page-text='$t("rowsPerPage")'
  :rows-per-page-items='[5,10,25,{ text:$t("all"), value:-1}]'
  :hide-actions='!isNotificationsAny'
  :class='{ "p-relative": $vuetify.breakpoint.smAndUp }'
)
  template(
    slot='items'
    slot-scope='{ item }'
  )
    td( v-text='item.exchangeNames.join(", ")' )
    td(
      class='text-xs-center'
      v-text='item.symbol'
    )
    td( class='text-xs-center' )
      v-icon(
        class='mr-1'
        :color='getDirection(item.direction).color'
        v-text='getDirection(item.direction).icon'
      )
      span( v-text='$t(item.direction)' )

    td(
      class='text-xs-right px-1'
      v-text='item.price'
    )
    td( class='text-xs-center px-0' )
      v-icon(
        class='mr-1'
        :color='getActivated(item.activated).color'
        v-text='getActivated(item.activated).icon'
      )
      span( v-text='$t(getActivated(item.activated).name)' )

    td( class='px-0' )
      v-btn(
        class='mx-0'
        icon
        @click='$emit("edit",item)'
      )
        v-icon(
          color='teal'
          v-text='"edit"'
        )
      v-btn(
        class='mx-0'
        icon
        @click='$emit("remove",item)'
      )
        v-icon(
          color='pink'
          v-text='"delete"'
        )

  template( slot='no-data' )
    v-alert(
      :value='true'
      color='warning'
      icon='warning'
    )
      | {{ $t('noData') }}

    v-btn(
          color="pink"
          fab
          dark
          small
          bottom
          left
          absolute
          @click='$emit("add")'
        )
          v-icon( v-text='"add"' )

  template(
    slot='pageText'
    slot-scope='{pageStart, pageStop, itemsLength}'
  )
    | {{ `${$t("rows")} ${pageStart} - ${pageStop} ${$t("of")} ${itemsLength}` }}

    v-btn(
      color="pink"
      fab
      dark
      small
      bottom
      left
      absolute
      @click='$emit("add")'
    )
      v-icon( v-text='"add"' )

</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapGetters } = createNamespacedHelpers( 'notifications' );

export default {
  name: 'NotificationsTable',
  data: () => ( {
    dialogEdit: true,
    dialogRemove: false
  } ),
  computed: {
    ...mapGetters( {
      notifications: 'getNotifications',
      isNotificationsAny: 'isNotificationsAny',
      getDirection: 'getDirection',
      getActivated: 'getActivated'
    } ),
    headers( ) {
      return [
        {
          text: this.$t( 'exchange' ),
          value: 'exchangeName',
          sortable: this.isNotificationsAny
        },
        {
          text: this.$t( 'pair' ),
          value: 'symbol',
          sortable: this.isNotificationsAny
        },
        {
          text: this.$t( 'direction' ),
          value: 'direction',
          sortable: this.isNotificationsAny
        },
        {
          text: this.$t( 'targetPrice' ),
          value: 'price',
          sortable: this.isNotificationsAny
        },
        {
          text: this.$t( 'activated' ),
          value: 'activated',
          sortable: this.isNotificationsAny
        },
        {
          sortable: false
        }
      ];
    }
  },
  methods: {
  }
};
</script>

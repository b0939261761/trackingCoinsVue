<template lang='pug'>
v-card( height='100%' )
  v-card-text
    v-layout

      NotificationEdit(
        :show.sync='dialogEdit'
        v-bind.sync='editedItem'
        @save='onEdit'
      )

      NotificationRemove(
        :show.sync='dialogRemove'
        v-bind.sync='editedItem'
        @save='onRemove'
      )

      NotificationsTable(
        @add='onShowAdd'
        @edit='onShowEdit'
        @remove='onShowRemove'
      )
</template>

<script>
import NotificationsTable from '@/components/NotificationsTable';
import NotificationEdit from '@/components/NotificationEdit';
import NotificationRemove from '@/components/NotificationRemove';

import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers( 'notifications' );

export default {
  name: 'Notifications',
  data: () => ( {
    dialogEdit: false,
    dialogRemove: false,
    removeItem: null,
    editedItem: null
  } ),
  computed: {
    ...mapGetters( {
      getDirection: 'getDirection',
      getActivated: 'getActivated'
    } )
  },
  methods: {
    ...mapActions( {
      removeNotification: 'removeNotification',
      editNotification: 'editNotification'
    } ),
    onShowEdit( item ) {
      this.dialogEdit = true;
      this.editedItem = { ...item };
    },
    onShowRemove( item ) {
      this.dialogRemove = true;
      this.removeItem = { ...item };
    },
    onShowAdd( ) {
      this.dialogEdit = true;
      this.editedItem = {
        id: 0,
        exchangeId: null,
        pairId: null,
        direction: 'above',
        price: 0,
        activated: true
      };
    },
    async onEdit( ) {
      await this.editNotification(
        {
          id: this.editedItem.id,
          exchange_id: this.editedItem.exchangeId,
          pair_id: this.editedItem.pairId,
          direction: this.editedItem.direction,
          price: this.editedItem.price,
          activated: this.editedItem.activated
        }
      );
      this.dialogEdit = false;
    },
    async onRemove( ) {
      await this.removeNotification( this.removeItem.id );
      this.dialogRemove = false;
    }
  },
  components: {
    NotificationsTable,
    NotificationEdit,
    NotificationRemove
  }
};
</script>

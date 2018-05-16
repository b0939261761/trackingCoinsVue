<template lang="pug">
  v-card( height='100%' class="layout-mb" )
    v-card-text
      v-container( grid-list-lg )
        v-layout
          v-flex(
            xs12
            sm12
            md12
          )
           v-data-table.elevation-1(:headers='headers', :items='desserts')
            template(slot='items', slot-scope='props')
              td.text-xs-left {{ props.item.name }}
              td.text-xs-left {{ props.item.logotype }}
              td.text-xs-left {{ props.item.curr }}
              td.text-xs-left {{ props.item.btc_quantity }}
              td.text-xs-left {{ props.item.quantity }}
              td.text-xs-left {{ props.item.supp_lang }}
              td.text-xs-left {{ props.item.year }}

</template>

<style>
  .layout.justify-center.align-center{
    width: 100%
  }
  .flex.fill-height {
    width: 100%
  }
</style>

<script>
  export default {
    data () {
      return {
        title: 'Заголовок',
        headers: [
          {
            text: 'п.п',
            align: 'left',
            sortable: true,
            value: 'name'
          },
          { text: 'Логотип', value: 'logotype' },
          { text: 'Биржа', value: 'curr' },
          { text: 'Объем торгов', value: 'btc_quantity' },
          { text: 'К-во пар', value: 'quantity' },
          { text: 'Поддержка языков', value: 'supp_lang' },
          { text: 'Год основания', value: 'year' }
        ],
        desserts: [
          {
            value: false,
            name: '1',
            logotype: 'Логотип',
            curr: 'POLONEIX',
            btc_quantity: 2544.57,
            quantity: 12,
            supp_lang: 'ENG RUS',
            year: '2010'
          },
          {
            value: false,
            name: '2',
            logotype: 'Логотип',
            curr: 'Bitfic',
            btc_quantity: 2544.57,
            quantity: 12,
            supp_lang: 'ENG RUS',
            year: '2010'
          },
          {
            value: false,
            name: '3',
            logotype: 'Логотип',
            curr: 'YouBit',
            btc_quantity: 2544.57,
            quantity: 12,
            supp_lang: 'ENG RUS',
            year: '2010'
          },
          {
            value: false,
            name: '4',
            logotype: 'Логотип',
            curr: 'Kraken',
            btc_quantity: 2544.57,
            quantity: 12,
            supp_lang: 'ENG RUS',
            year: '2010'
          },
        ]
      }
    }
  }
</script>

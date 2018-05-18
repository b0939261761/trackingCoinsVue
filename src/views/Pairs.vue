<template lang="pug">
  v-card
    v-card-title
      | Nutrition
      v-spacer
      v-text-field(v-model='search', append-icon='search', label='Search', single-line='', hide-details='')
    v-data-table(:headers='headers', :items='desserts', :search='search')
      template(slot='items', slot-scope='props')
        td.text-xs-left {{ props.item.name }}
        td.text-xs-left {{ props.item.para }}
        td.text-xs-left {{ props.item.last_price }}
        td.text-xs-left {{ props.item.change_price }}
        td.text-xs-left {{ props.item.amount }}
        td.text-xs-left {{ props.item.high }}
        td.text-xs-left {{ props.item.low }}
      v-alert(slot='no-results', :value='true', color='error', icon='warning')
        | Your search for "{{ search }}" found no results.
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
      search: '',
      headers: [
        {
          text: 'п.п',
          align: 'left',
          sortable: true,
          value: 'name'
        },
        { text: 'Пара', value: 'para' },
        { text: 'Последняя цена', value: 'last_price' },
        { text: 'Изминение цены', value: 'change_price' },
        { text: 'Суточный объем', value: 'amount' },
        { text: 'High', value: 'high' },
        { text: 'Low', value: 'low' }
      ],
      desserts: [
        {
          value: false,
          name: '1',
          para: 'BTC_USD',
          last_price: 25442.57,
          change_price: 3.5,
          amount: 8860.56,
          high: '0.0265',
          low: '0.0154'
        },
        {
          value: false,
          name: '2',
          para: 'BTC_USD',
          last_price: 25442.57,
          change_price: 3.5,
          amount: 8860.56,
          high: '0.0265',
          low: '0.0154'
        },
        {
          value: false,
          name: '3',
          para: 'BTC_USD',
          last_price: 25442.57,
          change_price: 3.5,
          amount: 8860.56,
          high: '0.0265',
          low: '0.0154'
        },
        {
          value: false,
          name: '4',
          para: 'BTC_USD',
          last_price: 25442.57,
          change_price: 3.5,
          amount: 8860.56,
          high: '0.0265',
          low: '0.0154'
        },
      ]
    }
  }
}
</script>

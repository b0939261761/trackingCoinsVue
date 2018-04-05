import { createLocalVue, shallow } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import VeeValidate from 'vee-validate';
import Vuetify from 'vuetify';
import SignUp from './../../src/views/SignUp.vue';

const localVue = createLocalVue( );
localVue.use( VeeValidate );
localVue.use( Vuetify );

describe( 'SignUp', ( ) => {
  it( 'should invalid field username length less 5', async ( ) => {
    const wrapper = shallow( SignUp, { localVue } );

    expect( wrapper.vm.errors.count( ) ).toBe( 0 );

    wrapper.setData( { username: 'asdf' } );
    await flushPromises;

    expect( wrapper.vm.errors.has( 'username' ) ).toBe( true );
  } );


} );



  // it( 'should invalid field username length above 30', async ( ) => {
  //   const wrapper = mount( SignUp, { localVue } );

  //   wrapper.setData( { username: 'a'.repeat( 31 ) } );
  //   await flushPromises( );
  //   expect( wrapper.vm.errors.has( 'username' ) ).toBe( true );
  // } );

  // it( 'should invalid field username', async ( ) => {
  //   const wrapper = mount( SignUp, { localVue } );

  //   wrapper.setData( { username: 'a'.repeat( 31 ) } );
  //   await flushPromises( );
  //   expect( wrapper.vm.errors.has( 'username' ) ).toBe( true );
  // } );

  // it( 'should invalid field username is not alphabet', async ( ) => {
  //   const wrapper = mount( SignUp, { localVue } );

  //   wrapper.setData( { username: 'dsdsd' } );
  //   await flushPromises( );
  //   expect( wrapper.vm.errors.has( 'username' ) ).toBe( true );
  // } );

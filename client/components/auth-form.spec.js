import { expect } from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { AuthForm, mapLogin } from './auth-form'


describe ('auth-form', () => {
    let AuthForm 

    describe(' the mapForm function ', () => {
        let fakeState = { 
                name: 'login',
                displayName: 'Log In',
                user: {error: 'someError'}
          }

          it('mapState should return the correct object', () => {
              expect(mapLogin(fakeState).name).to.be.equal('login')
          })
    })
})
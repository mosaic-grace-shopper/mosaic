import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { ProductList, mapState } from './productList'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('ProductList', () => {
    // let productList
    describe('the mapState function', () => {
        let fakeState =
            { products: [{ artist: 'fake artist', title: 'fake title', description: 'fake description', price: 100, quantity: 4 }, { artist: 'some artist', title: 'some title', description: 'some description', price: 10, quantity: 7 }] }


            it('should return an array of products', () => {
                expect(mapState(fakeState)[0].title).to.be.equal('fake title')
    })
})
})


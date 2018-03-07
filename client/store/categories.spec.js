/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getCategoriesThunk} from './categories'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)
const mockAxios = new MockAdapter(axios)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getCategoriesThunk creator', () => {
    it('eventually dispatches the GET_CATEGORIES action', () => {
      const fakeCategories = ['pugs', 'hippos']
      mockAxios.onGet('/api/categories').replyOnce(200, fakeCategories)
      return store.dispatch(getCategoriesThunk())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_CATEGORIES')
          expect(actions[0].categories).to.be.deep.equal(fakeCategories)
        })
    })
  })
})


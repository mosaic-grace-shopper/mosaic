/* global describe beforeEach it */

const { expect } = require('chai')
const db = require('../index')
const Category = db.model('category')

describe('Category model', () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe('Image URL Validation', () => {
      let painting
      beforeEach(() => {
        return Category.create({
          name: "Paintings",
        })
        .then(category => {
          painting = category
        })
      })

      it('it checks if deafult image URL is getting added in case of null', () => {
        expect(painting.imgUrl).to.be.equal('https://c2.staticflickr.com/8/7742/17504602910_92edbff02f_b.jpg')
      })
    })

  describe('Name Validation ', () => {
    it('require name', () => {
        const oneCategory = Category.build();
        return oneCategory.validate()
        .then(() => { throw new Error('Promise should have rejected'); })
        .catch(err => {
        expect(err).to.exist;
        expect(err).to.be.an('error');
          // expect(err.errors.ValidationErrorItem.message).to.be.equal('category.name cannot be null')
          });
        });
      }); 

  describe('validations', () => {
    it('has the expected schema definition', () => {
      expect(Category.attributes.name).to.be.an('object');
      expect(Category.attributes.imgUrl).to.be.an('object');
    });
  }) 

})


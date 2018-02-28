/**
 * Welcome to the seed file! This seed file uses a newer language feature called...
 *
 *                  -=-= ASYNC...AWAIT -=-=
 *
 * Async-await is a joy to use! Read more about it in the MDN docs:
 *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
 *
 * Now that you've got the main idea, check it out in practice below!
 */
const db = require('../server/db')
const {User, Category, Product, Review ,OrderHeader,OrderLine, FullOrder} = require('../server/db/models')

async function seed () {
  await db.sync({force: true})
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', isAdmin: true}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'annabel@annabel.com', password: '123', isAdmin: true}),
    User.create({email: 'johanna@johanna.com', password: '123', isAdmin: true}),
    User.create({email: 'dhara@dhara.com', password: '123', isAdmin: true}),
    User.create({email: 'roxie@roxie.com', password: '123', isAdmin: true}),
    User.create({email: 'john@john.com', password: '123'}),
    User.create({email: 'kate@kate.com', password: '123'}),
    User.create({email: 'emily@emily.com', password: '123'})
  ])

  const categories = await Promise.all([
    Category.create({id: 1, name: 'photography'}),
    Category.create({id: 2, name: 'sculpture'}),
    Category.create({id: 3, name: 'painting'}),
  ])

  const products = await Promise.all([
    Product.create({id: 1, artist: 'Bob', title: 'Painting in Blue', description: 'A painting', price: 500, quantity: 4, categoryId: 3}),
    Product.create({id: 2, artist: 'Sam', title: 'Prince and the Swan', description: 'A photo', price: 1500, quantity: 8, categoryId: 1}),
    Product.create({id: 3, artist: 'Wanda', title: 'The fish with her name', description: 'A sculpture', price: 1000, quantity: 2, categoryId: 2}),
    Product.create({id: 4, artist: 'Janet', title: 'Painting in Red', description: 'A painting', price: 250, quantity: 10, categoryId: 3}),
    Product.create({id: 5, artist: 'Hito', title: 'Landscape of Stuff', description: 'A photo', price: 50, quantity: 40, categoryId: 1}),
    Product.create({id: 6, artist: 'Mike', title: 'Humongous Teddy Bear', description: 'A sculpture', price: 5000, quantity: 1, categoryId: 2}),
    Product.create({id: 7, artist: 'Borna', title: 'T-shirt Canvas', description: 'A painting', price: 30000, quantity: 2, categoryId: 3}),
    Product.create({id: 8, artist: 'Jasmine', title: 'Five Leaves', description: 'Acrylic Cup', price: 4300, quantity: 1, categoryId: 2}),
    Product.create({id: 9, artist: 'Juliana', title: 'Self Portrait', description: 'A painting', price: 500, quantity: 4, categoryId: 1}),
    Product.create({id: 10, artist: 'Riley', description: 'A painting', price: 500, quantity: 4, categoryId: 1}),
  ])



  const orderline = await Promise.all([
    OrderLine.create({id: 1, quantity: 2 , productId : 1}), 
    OrderLine.create({id: 2, quantity: 1, productId : 2}), 
    OrderLine.create({id: 3, quantity: 4, productId : 3}), 
    OrderLine.create({id: 4, quantity: 2, productId : 6}), 
    OrderLine.create({id: 5, quantity: 1, productId : 7}), 
    OrderLine.create({id: 6, quantity: 5, productId : 10}), 
    OrderLine.create({id: 7, quantity: 2, productId : 4}), 
    OrderLine.create({id: 8, quantity: 7, productId : 5}), 

  ])

  const orderheader = await Promise.all([
    OrderHeader.create({id: 1, status: 'Created', total : 6500}), 
    OrderHeader.create({id: 2, status: 'Cancelled', total : 10000}), 
    OrderHeader.create({id: 3, status: 'Completed', total : 32500}), 
    OrderHeader.create({id: 4, status: 'Processing', total : 850}), 
  ])

  const fullorder = await Promise.all([
    FullOrder.create({orderheaderId: 1, orderlineId : 1}), 
    FullOrder.create({ orderheaderId: 1, orderlineId : 2}), 
    FullOrder.create({orderheaderId: 1, orderlineId : 3}), 
    FullOrder.create({orderheaderId: 2, orderlineId : 4}), 
    FullOrder.create({ orderheaderId: 3, orderlineId : 5}), 
    FullOrder.create({orderheaderId: 3, orderlineId : 6}), 
    FullOrder.create({orderheaderId: 4, orderlineId : 7}), 
    FullOrder.create({ orderheaderId: 4, orderlineId : 8}), 
  ])



  const reviews = await Promise.all([
    Review.create({id: 1, title: 'Gorgeous', text: 'This painting is so beautiful.', stars: 5, userId: 1, productId: 1}),
    Review.create({id: 2, title: 'Awesome', text: 'This photo is so artsy!', stars: 4, userId: 2, productId: 2}),
    Review.create({id: 3, title: 'Huggable', text: 'I want to take a nap on this bear.', stars: 5, userId: 3, productId: 6}),
   ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${reviews.length} products`)
  console.log(`seeded successfully`)
}

// Execute the `seed` function
// `Async` functions always return a promise, so we can use `catch` to handle any errors
// that might occur inside of `seed`
seed()
  .catch(err => {
    console.error(err.message)
    console.error(err.stack)
    process.exitCode = 1
  })
  .then(() => {
    console.log('closing db connection')
    db.close()
    console.log('db connection closed')
  })

/*
 * note: everything outside of the async function is totally synchronous
 * The console.log below will occur before any of the logs that occur inside
 * of the async function
 */
console.log('seeding...')

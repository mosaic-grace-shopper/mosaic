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
const {User, Category, Product} = require('../server/db/models')

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
    Product.create({artist: 'Bob', title: 'Painting in Blue', description: 'A painting', price: 500, quantity: 4, categoryId: 3}),
    Product.create({artist: 'Sam', title: 'Prince and the Swan', description: 'A photo', price: 1500, quantity: 8, categoryId: 1}),
    Product.create({artist: 'Wanda', title: 'The fish with her name', description: 'A sculpture', price: 1000, quantity: 2, categoryId: 2}),
    Product.create({artist: 'Janet', title: 'Painting in Red', description: 'A painting', price: 250, quantity: 10, categoryId: 3}),
    Product.create({artist: 'Hito', title: 'Landscape of Stuff', description: 'A photo', price: 50, quantity: 40, categoryId: 1}),
    Product.create({artist: 'Mike', title: 'Humongous Teddy Bear', description: 'A sculpture', price: 5000, quantity: 1, categoryId: 2}),
    Product.create({artist: 'Borna', title: 'T-shirt Canvas', description: 'A painting', price: 30000, quantity: 2, categoryId: 3}),
    Product.create({artist: 'Jasmine', title: 'Five Leaves', description: 'Acrylic Cup', price: 4300, quantity: 1, categoryId: 2}),
    Product.create({artist: 'Juliana', title: 'Self Portrait', description: 'A painting', price: 500, quantity: 4, categoryId: 1}),
    Product.create({artist: 'Riley', description: 'A painting', price: 500, quantity: 4, categoryId: 1}),
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${products.length} products`)
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

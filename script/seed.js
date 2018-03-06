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
const { User, Category, Product, Review, Order, OrderLine, ShipmentDetails } = require('../server/db/models')

async function seed() {
  await db.sync({ force: true })
  console.log('db synced!')
  // Whoa! Because we `await` the promise that db.sync returns, the next line will not be
  // executed until that promise resolves!

  const users = await Promise.all([
    User.create({ email: 'cody@email.com', password: '123', isAdmin: true }),
    User.create({ email: 'murphy@email.com', password: '123' }),
    User.create({ email: 'annabel@annabel.com', password: '123', isAdmin: true }),
    User.create({ email: 'johanna@johanna.com', password: '123', isAdmin: true }),
    User.create({ email: 'dhara@dhara.com', password: '123', isAdmin: true }),
    User.create({ email: 'roxie@roxie.com', password: '123', isAdmin: true }),
    User.create({ email: 'john@john.com', password: '123' }),
    User.create({ email: 'kate@kate.com', password: '123' }),
    User.create({ email: 'emily@emily.com', password: '123' })
  ])

  const categories = await Promise.all([
    Category.create({ name: 'photography' }),
    Category.create({ name: 'sculpture' }),
    Category.create({ name: 'painting' }),
  ])

  const products = await Promise.all([
    Product.create({ artist: 'Bob', title: 'Painting in Blue', description: 'A painting', price: 500, quantity: 4, categoryId: 3 }),
    Product.create({ artist: 'Sam', title: 'Prince and the Swan', description: 'A photo', price: 1500, quantity: 8, categoryId: 1 }),
    Product.create({artist: 'Wanda', title: 'The fish with her name', description: 'A sculpture', price: 1000, quantity: 2, categoryId: 2 }),
    Product.create({ artist: 'Janet', title: 'Painting in Red', description: 'A painting', price: 250, quantity: 10, categoryId: 3 }),
    Product.create({ artist: 'Hito', title: 'Landscape of Stuff', description: 'A photo', price: 50, quantity: 40, categoryId: 1 }),
    Product.create({  artist: 'Mike', title: 'Humongous Teddy Bear', description: 'A sculpture', price: 5000, quantity: 1, categoryId: 2 }),
    Product.create({artist: 'Borna', title: 'T-shirt Canvas', description: 'A painting', price: 30000, quantity: 2, categoryId: 3 }),
    Product.create({ artist: 'Jasmine', title: 'Five Leaves', description: 'Acrylic Cup', price: 4300, quantity: 1, categoryId: 2 }),
    Product.create({  artist: 'Juliana', title: 'Self Portrait', description: 'A painting', price: 500, quantity: 4, categoryId: 1 }),
    Product.create({  artist: 'Riley', description: 'A painting', price: 500, quantity: 4, categoryId: 1 }),
  ])

  const shipmentDetails = await Promise.all([
    ShipmentDetails.create({ confirmationEmail: 'annabel@annabel.com', recipientName: 'Annabel Lau', shippingAddress: '5 Hanover Square, Floor 25, New York, NY 10004' }),
    ShipmentDetails.create({ confirmationEmail: 'roxie@roxie.com', recipientName: 'Roxie Turner', shippingAddress: '6 Hanover Square, Floor 25, New York, NY 10004' }),
    ShipmentDetails.create({ confirmationEmail: 'johanna@johanna.com', recipientName: 'Johanna Fulghum', shippingAddress: '7 Hanover Square, Floor 25, New York, NY 10004' }),
    ShipmentDetails.create({ confirmationEmail: 'dhara@dhara.com', recipientName: 'Dhara Naik', shippingAddress: '8 Hanover Square, Floor 25, New York, NY 10004' }),
  ])

  const orders = await Promise.all([
    Order.create({ status: 'Saved', total: 6500, shipmentDetailId: 1 }),
    Order.create({ status: 'Cancelled', total: 6500, shipmentDetailId: 2 }),
    Order.create({ status: 'Completed', total: 32500, shipmentDetailId: 3 }),
    Order.create({ status: 'Processing', total: 850, shipmentDetailId: 4 }),
    Order.create({ status: 'Submitted', total: 1000, shipmentDetailId: 1 })
  ])

  const orderLines = await Promise.all([
    OrderLine.create({ quantity: 2, productId: 1, orderId: 1 }),
    OrderLine.create({ quantity: 1, productId: 2, orderId: 1}),
    OrderLine.create({ quantity: 4, productId: 3, orderId: 1 }),
    OrderLine.create({ quantity: 2, productId: 6, orderId: 2 }),
    OrderLine.create({ quantity: 1, productId: 7, orderId: 3 }),
    OrderLine.create({ quantity: 5, productId: 10, orderId: 3 }),
    OrderLine.create({ quantity: 2, productId: 4, orderId: 4 }),
    OrderLine.create({ quantity: 7, productId: 5, orderId: 5}),

  ])

  const reviews = await Promise.all([
    Review.create({ title: 'Gorgeous', text: 'This painting is so beautiful.', stars: 5, userId: 1, productId: 1 }),
    Review.create({ title: 'Awesome', text: 'This photo is so artsy!', stars: 4, userId: 2, productId: 2 }),
    Review.create({ title: 'Huggable', text: 'I want to take a nap on this bear.', stars: 5, userId: 3, productId: 6 }),
    Review.create({ title: 'Eh', text: 'It\'s pretty but kind of boring.', stars: 3, userId: 1, productId: 4 }),
    Review.create({ title: 'I love it!', text: 'So original! The artist is so talented.', stars: 5, userId: 3, productId: 5 }),
    Review.create({ title: 'Absolutely amazing', text: 'I wish I could buy it again and again.', stars: 5, userId: 2, productId: 3 }),
    Review.create({ title: 'It\'s okay', text: 'It\'s pretty but too expensive. Not worth it', stars: 3, userId: 3, productId: 7 }),
    Review.create({ title: 'BEST ARTWORK EVER', text: 'I love this so much!!! Everyone always gives me compliments when they come over. So happy!', stars: 5, userId: 1, productId: 8 }),
    Review.create({ title: 'Perfect collector\'s piece', text: 'This is a masterpiece. So worth it.', stars: 5, userId: 3, productId: 9 }),
    Review.create({ title: 'I don\'t love it', text: 'I bought this on a whim but I kind of regret it now. Not much wow factor.', stars: 2, userId: 5, productId: 10 }),



    Review.create({ title: 'NOW THIS IS ART', text: 'If you don\'t buy this piece, you\'ll regret it.', stars: 5, userId: 1, productId: 1 }),
    Review.create({ title: 'Sooooo awesome', text: 'All my friends rave about it!', stars: 5, userId: 2, productId: 2 }),
    Review.create({ title: 'Meh', text: 'This is so ugly. Why did I buy it? Are there returns?', stars: 1, userId: 3, productId: 3 }),
    Review.create({ title: 'So colorful and pretty', text: 'I loooove it', stars: 5, userId: 1, productId: 4 }),
    Review.create({ title: 'Very nice', text: 'I\'m an art collector and I\'m so glad I bought this piece.', stars: 5, userId: 3, productId: 5 }),
    Review.create({ title: 'SO CUTEEEE', text: 'I bought this piece for my daughter\'s room and she loves it!', stars: 5, userId: 2, productId: 6 }),
    Review.create({ title: 'Perfect', text: 'Perfect in every way. So glad Mosaic exists', stars: 5, userId: 3, productId: 7 }),
    Review.create({ title: 'I don\'t love it', text: 'It\'s all right', stars: 3, userId: 1, productId: 8 }),
    Review.create({ title: 'Beautiful', text: 'Simply beautiful. It looks so gorgeous on my white walls.', stars: 5, userId: 3, productId: 9 }),
    Review.create({ title: 'Excellent Buy!', text: 'One of the best decisions I ever made! I put it in my office and it brightens my day!!', stars: 2, userId: 5, productId: 10 }),
  ])

  // Wowzers! We can even `await` on the right-hand side of the assignment operator
  // and store the result that the promise resolves to in a variable! This is nice!
  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${categories.length} categories`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${orderLines.length} orderLines`)
  console.log(`seeded ${orders.length} orderHeaders`)
  console.log(`seeded ${shipmentDetails.length} shipmentDetails`)

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

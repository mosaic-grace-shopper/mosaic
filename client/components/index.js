/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './userHome'
export {default as UserList} from './userList'
export {default as OrderList} from './orderList'
export {Login, Signup} from './auth-form'
export {default as ProductList} from './productList'
export {default as SingleProduct} from './singleProduct'
export {default as Cart} from './cart'
export {default as Checkout} from './checkout'
export {default as CategoryList} from './categoryList'
export {default as AddCategory} from './addCategory'
export {default as ConfirmPage} from './confirmPage'
export {default as ProductsByCategory} from './productsByCategory'
export {default as Reviews} from './reviews'
export {default as SplashPage } from './splash'


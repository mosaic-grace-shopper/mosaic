import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoriesThunk } from '../store';
import CategoryItem from './categoryItem'



export class CategoryList extends Component {

  componentDidMount() {
    this.props.getAllCategories()
  }

  render() {
    const { categories, user } = this.props;
    if (!user.isAdmin) return <h1> Only Admin has access to this Page </h1>
    if (!categories.length) return <div>No categories found</div>
    return (
      <div>
        <div className="categoryList">
          <h1>Categories Goes in here</h1>
          <button>
            <Link to="/addCategory">Add New Category</Link>
          </button>
          <div className="aCategory">
            {categories.map(category => (
              <div key={category.id}>
                <Link to={`categories/${category.id}`} className="orderCard">
                  <CategoryItem category={category} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      )}
}

/**
 * CONTAINER
 */
const mapState = ({ categories, user }) => ({ categories, user })

const mapDispatch = dispatch => ({
  getAllCategories: () => {
    dispatch(getCategoriesThunk())
  }
})
export default connect(mapState, mapDispatch)(CategoryList);
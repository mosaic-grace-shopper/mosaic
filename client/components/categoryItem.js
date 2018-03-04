import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteCategoryThunk } from '../store/categories'

class CategoryItem extends Component {
    render() {
        const { category } = this.props;
        return (
            <div className="userItem">
                <h1> {this.props.category.id}
                    &nbsp;&nbsp;&nbsp;
                    {this.props.category.name}
                </h1>
                <button onClick={() => this.props.handleDeleteCategory(category.id)}>
                    Delete
                <span />
                </button>
            </div>
        );
    }
}

const mapDispatch = dispatch => ({
    handleDeleteCategory: (categoryId) => {
        dispatch(deleteCategoryThunk(categoryId));
    }
});

export default connect(null, mapDispatch)(CategoryItem);

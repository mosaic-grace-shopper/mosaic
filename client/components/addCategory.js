import React, { Component } from "react";
import { connect } from "react-redux";
import { addCategoriesThunk } from '../store/categories'


export class AddCategory extends Component {
    render() {
        return (
            <form onSubmit={this.props.handleFormSubmit} >
                <div>
                    <div>
                        <label htmlFor="categoryname">
                            <small>Category Name</small>
                        </label>
                        <input
                            onChange={this.handleChangeEvent}
                            name="name"
                            type="text"
                        />
                    </div>

                    <div>
                        <label htmlFor="image">
                            <small>Image URL</small>
                        </label>
                        <input
                            onChange={this.handleChangeEvent}
                            name="image"
                            type="text"
                        />
                    </div>
                    <button type="submit">
                        Add Category
                    </button>
                    <button onClick={() => this.props.handleCancelEvent()} > Cancel </button>
                </div>
            </form>
        )
    }
}


const mapState = null;
const mapDispatch = (dispatch, ownProps) => {
    return {
        handleFormSubmit: event => {
            event.preventDefault();
            const newCategory = {
                name: event.target.name.value,
                imageURL: event.target.image.value,
            }
            dispatch(addCategoriesThunk(newCategory, ownProps.history));
        },

        handleCancelEvent: () => {
            ownProps.history.push("/categories")
        },

    }
}

export default connect(mapState, mapDispatch)(AddCategory);
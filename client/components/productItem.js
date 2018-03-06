import React, { Component } from "react";
import { connect } from "react-redux";
import RaisedButton from "material-ui/RaisedButton";
import FontIcon from "material-ui/FontIcon";
import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardTitle,
  CardText
} from "material-ui/Card";

const styles = {
  button: {
    margin: 12
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  }
};

function ProductItem (props) {
    console.log(props)
    const { product } = props;
    return (
      <div className="container">
        <Card>
          <h3>
            <CardTitle title={product.title} /> by {product.artist}
          </h3>
          <h5>
            ${product.price} - <i>{product.quantity} available</i>
          </h5>
          <CardActions>
            <RaisedButton
              label="View Details"
              onClick={() => props.history.push(`/products/${product.id}`)}
              secondary={true}
              style={styles.button}
            />} />
            <img src={product.imgUrl} />
          </CardActions>
        </Card>
      </div>
    )

}

const mapState = state => ({
  currentUser: state.user
});

export default connect(mapState)(ProductItem);

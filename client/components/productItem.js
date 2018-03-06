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

function ProductItem(props) {
  console.log(props);
  const { product } = props;
  return (
    <div className="container">
    <div>
        <Card>
          <h3>
            <CardTitle title={product.title} /> 
            

          </h3>
          <img src={product.imgUrl} />
        
          <CardActions>
            <RaisedButton
              label="View Details"
              onClick={() => props.history.push(`/products/${product.id}`)}
              secondary={true}
              style={styles.button}
            />} />
            </CardActions>
            <CardText>
            Artist: {product.artist}
            <br/>
            ${product.price}
            <br/>
             <i>{product.quantity} available</i>
            </CardText>
        </Card>
      </div>
    </div>
  );
}

const mapState = state => ({
  currentUser: state.user
});

export default connect(mapState)(ProductItem);

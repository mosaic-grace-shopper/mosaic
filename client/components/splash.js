import React, { Component } from "react";

export default function SplashPage () {

    return (
        <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src= "https://res.cloudinary.com/artwork-archive/image/upload/t_jpg_large/v1/user_4446/JillMcLean_BeyondAllDoubt_OilCanvas_43x36_2014_yxcbjr" alt="First slide" />
            <div className="absolute-div">
                        <div className="carousel-caption">
                            <h3>We sell art.</h3>
                        </div>
                    </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://theibizan.com/wp-content/uploads/2014/06/Catherine-Javel-Posidonia-painting-16.06.2014.jpg" alt="Second slide" />
            <div className="absolute-div">
                        <div className="carousel-caption">
                            <h3>We sell art.</h3>
                        </div>
                    </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://d32dm0rphc51dk.cloudfront.net/l1ICgoABfNyEJot-kIz5rw/larger.jpg" alt="Third slide"/>
            <div className="absolute-div">
                        <div className="carousel-caption">
                            <h3>We sell art.</h3>
                        </div>
                    </div>
          </div>
        </div>
      </div>
    );
}

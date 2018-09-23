import React from 'react';
import './Business.css';

const googleMap = 'https://www.google.com/maps/search/?api=1&query=';


class Business extends React.Component {
  priceFix(newPrice) {
    if(typeof newPrice !== 'undefined') {
      return this.props.business.price
    } else {
      return 'n/a'
    }
  }

  render() {
    const distanceCorrector = this.props.business.distance / 1000;
    return (
      <div className="Business">
        <div className="image-container">
          <a href={this.props.business.url} target='_blank'><img src={this.props.business.imageSrc} alt=''/></a>
        </div>
        <h2>{this.props.business.name}</h2>
        <div className="Business-information">
          <div className="Business-address">
            <p><a href={`${googleMap}${this.props.business.address}${this.props.business.city}`}  target='_blank'>{this.props.business.address}</a></p>
            <p>{this.props.business.city}</p>
            <p>{`${this.props.business.state} ${this.props.business.zipCode}`}</p>
            <p>Distance: {distanceCorrector.toFixed(2)} km</p>
          </div>
          <div className="Business-reviews">
            <h3>{this.props.business.category.toUpperCase()}</h3>
            <h3 className="rating">{`${this.props.business.rating} stars`}</h3>
            <p>{`${this.props.business.reviewCount} reviews`}</p>
            <p>{`Price: ${this.priceFix(this.props.business.price)}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;

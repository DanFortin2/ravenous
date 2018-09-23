import React from 'react';
import './BusinessList.css';
import Business from '../Business/Business';

class BusinessList extends React.Component {
  render() {
    return (
      <div className="BusinessList">
        {
          this.props.businesses.map(business => {
            //setting props on business component to equal the unique ID for the business key from Yelp API
            return <Business business={business} key={business.id}/>
          })
        }
      </div>
    );
  }
}

export default BusinessList;

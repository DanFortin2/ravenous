//create constant for API key
const apiKey = 'eQfhcKDOAbWiz-AJhmXO6hCsugYAhMagjCBhanvzaUvv4hP7myGkahj0eC5oQMVQWjXo6HovCtQAZyb7OoaLLwl2T7WEMg6ogA-S31smVqvDShc-nYBgbL2JZqalW3Yx';

//create constant for Yelp object that will hold the yelp functionality
const Yelp = {
  //create method to search
  search(term, location, sortBy) {
    //Your fetch() will currently not function correctly due to CORS restrictions.We can bypass this restriction with an API called CORS Anywhere. CORS Anywhere will take requests sent to its API endpoint, make them for the requesting app with the proper CORS permissions, and then return the response back to the requesting app.Prepend the URL path you passed to the first argument in fetch() with the following:
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
        //present a form of ID for browser. Pass API key as an authorization key in the headers object
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      }
    ).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if (jsonResponse.businesses) {
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count,
          url: business.url,
          distance: business.distance,
          price: business.price
        }));
      }
    });
  }
};


export default Yelp;


//Yelp documentation for API https://www.yelp.com/developers/documentation/v3/business_search

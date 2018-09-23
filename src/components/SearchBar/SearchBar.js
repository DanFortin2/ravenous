import React from 'react';
import './SearchBar.css'

//keys are string values the values are taken from the yelp API nder the sort_by parameter
let sortByOptions = {
  'Best Match': 'best_match',
  'Highest Rated': 'rating',
  'Most Reviewed': 'review_count',
  'Distance': 'distance'
};



class SearchBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {term: '', location: '', sortBy: 'best_match'};
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSortChangeAutoSearch = this.handleSortChangeAutoSearch.bind(this);
    this.handleEnterSearch = this.handleEnterSearch.bind(this);
  }
  //created a custom render method before the typical render(). Will use this to iterate through the sort_by
  //by method and dynamically generate list results
  renderSortByOptions() {
    //The Object.keys() method returns an array of a given object's own property names, in the same order as we get with a normal loop
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      //returned the above value and appended LI elements on it, added a classname attribute to go wtih the css file, and an onClick listener event that binds  handlechange to it
      return <li className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>;
    });
  }

  getSortByClass(sortByOption) {
    if(this.state.sortBy === sortByOption) {
      return 'active'
    } else {
      return ''
    }
  }

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption
    });
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  handleSearch(event) {
    if(this.state.term !== '' && this.state.location !=='') {
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
      event.preventDefault();
    }
  }

  //created new method to hand auto searc when changing categories but only if term and location is not blank
  handleSortChangeAutoSearch(event) {
    if(this.state.term !== '' && this.state.location !=='') {
      this.handleSearch(event)
    }
  }

  //created method to run search based off hitting enter
  handleEnterSearch(event) {
    if(event.key === 'Enter') {
        this.handleSearch(event)
    }
  }


  render() {
    return (
      <div className="SearchBar"   onKeyPress={this.handleEnterSearch}>
        <div className="SearchBar-sort-options">
          <ul onClick={this.handleSortChangeAutoSearch}>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange = {this.handleTermChange} placeholder="Search Businesses - *Required Field*" />
          <input onChange = {this.handleLocationChange} placeholder="Where? - *Required Field*" />
        </div>
        <div className="SearchBar-submit">
          <a onClick={this.handleSearch} >Lets Go</a>
        </div>
      </div>
    );
  }
}

export default SearchBar;

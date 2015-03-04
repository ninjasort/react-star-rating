var React = require('react');
var Review = require('./components/Review.jsx');
var StarRating = require('./components/StarRating.jsx');

var inject = document.querySelector('.inject');

var App = React.createClass({

  handleRatingClick: function (e, data) {
    alert('You left a ' + data.rating + ' star rating for ' + data.title + '!');
  },

  render: function () {
    return (
    	<section className="review">
    	  {/*<Review />*/}
        <StarRating ratingAmount={5} title="Music" onRatingClick={this.handleRatingClick} />
        <StarRating ratingAmount={5} title="Presence" onRatingClick={this.handleRatingClick} />
    	</section>
    );
  }

});

React.render(<App />, inject);
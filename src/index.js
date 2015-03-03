var React = require('react');
var Review = require('./components/Review.jsx');

var inject = document.querySelector('.inject');

var App = React.createClass({

  render: function () {
    return (
    	<section className="review">
    	  <Review />
    	</section>
    );
  }

});

React.render(<App />, inject);
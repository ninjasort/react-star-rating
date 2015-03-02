var React = require('react');
var Review = require('./components/Review.jsx');
var Star = require('./components/Star.jsx');

var inject = document.querySelector('.inject');

var App = React.createClass({

  getInitialState: function () {
    return {
      reviewHidden: true
    }
  },

  showReviewForm: function () {
    this.setState({
      reviewHidden: false
    });
  },

  finishReview: function () {
    this.setState({
      reviewFinished: true
    });
  },

  render: function () {
    var reviewWillOpen = this.state.reviewHidden ? {display: 'block'} : {display: 'none'};
    var reviewDidOpen = reviewWillOpen.display === 'none' ? {display: 'block'} : {display: 'none'};
    return (
    	<section className="review">
        <Star />
    	  {/*<Review reviewHidden={this.state.reviewHidden} />*/}
    	  <button style={reviewWillOpen} onClick={this.showReviewForm}>Leave a review!</button>
    	  <button style={reviewDidOpen} onClick={this.finishReview}>Send review!</button>
    	</section>
    );
  }

});

React.render(<App />, inject);
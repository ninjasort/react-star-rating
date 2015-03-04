var React = require('react');
var StarRating = require('./StarRating.jsx');

module.exports = React.createClass({

  render: function () {
    var reviewHidden = !this.props.reviewHidden ? {display: 'block'} : {display: 'none'};
      return (
        <div className="react-review">
        	<form className="review__form" style={reviewHidden}>
        	  <textarea name="review-content" id="" cols="30" rows="5" placeholder="Write a review..."></textarea>
            <StarRating ratingAmount={5} editing={false} onRatingClick={this.handleRatingClick} />
            <StarRating ratingAmount={5} title="Music" onRatingClick={this.handleRatingClick} />
        	</form>
          <button onClick={this.finishReview}>Send Review</button>
        </div>
      );
  }

});
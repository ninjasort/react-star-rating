var React = require('react');

module.exports = React.createClass({

  render: function () {
    var reviewHidden = !this.props.reviewHidden ? {display: 'block'} : {display: 'none'};
      return (
      	<form className="review__form" style={reviewHidden}>
      	  <input id="rating" type="number" min="0" max="5" step="0.5" /><br />
      	  <textarea name="review-content" id="" cols="30" rows="5" placeholder="Write a review..."></textarea>
      	</form>
      );
  }

});
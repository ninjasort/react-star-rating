var React = require('react');

var Star = React.createClass({

  getStars: function () {
    var stars = '';
    var numRating = this.props.rating;
    for(var i = 0; i < numRating; i++) {
      stars += '\u2605';
    }
    return stars;
  },

  getInitialState: function () {
    return {
      stars: 5,
      rating: 0,
      glyph: this.getStars()
    }
  },

  getPosition: function (e) {
    // var d = this.refs.foo.getDOMNode();
    // return e.pageX - d.offsetLeft;
  },

  handleRangeChange: function (e) {
    this.setState({
      rating: e.target.value
    });
  },

  render: function () {
    return (
      <div className="star-rating rating-xs rating-active">
        <div className="rating-container rating-gly-star">
          <div className="rating-stars" data-content={this.state.glyph}></div>
          <input type="number" className='rating' min="0" max="5" onChange={this.handleRangeChange} />
          {/*<svg height="210" width="500">
            <polygon points="100,10 40,198 190,78 10,78 160,198" style={{fill: 'red'}}/>
          </svg>*/}
        </div>
      </div>
    );
  }
});

module.exports = Star;
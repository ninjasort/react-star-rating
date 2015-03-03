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

  getDefaultProps: function () {
    return {
      step: 0.5,
      min: 0,
      max: 5
    }
  },

  getInitialState: function () {
    return {
      stars: 5,
      rating: 0,
      glyph: this.getStars()
    }
  },

  componentDidMount: function () {
    this.root = this.refs.root.getDOMNode();
    this.ratingStars = this.refs.ratingStars.getDOMNode();
  },

  componentDidUnmount: function () {

  },

  getPosition: function (e) {
    return e.pageX - this.root.offsetLeft;
  },

  applyPrecision: function (val, precision) {
    return parseFloat(val.toFixed(precision));
  },

  getDecimalPlaces: function (num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  },

  getWidthFromValue: function (val) {
    var self = this, min = this.props.min, max = this.props.max;
    if (val <= min || min === max) {
        return 0;
    }
    if (val >= max) {
        return 100;
    }
    return (val - min) * 100 / (max - min);
  },
  
  getValueFromPosition: function (pos) {
    var self = this, precision = this.getDecimalPlaces(this.props.step),
        val, factor, maxWidth = this.ratingStars.offsetWidth,
        diff = this.props.max - this.props.min;
    factor = (diff * pos) / (maxWidth * this.props.step);
    factor = Math.ceil(factor);
    val = this.applyPrecision(parseFloat(this.props.min + factor * this.props.step), precision);
    val = Math.max(Math.min(val, this.props.max), this.props.min);
    return val;
  },

  calculate: function (pos) {
    var val = this.getValueFromPosition(pos),
        width = this.getWidthFromValue(val);
    
    width += '%';
    return {width: width, val: val};
  },

  handleMouseOver: function (e) {
    var pos = this.getPosition(e);
    var rating = this.calculate(pos);
    this.setState({
      pos: rating.width
    });
  },

  handleRangeChange: function (e) {
    this.setState({
      rating: e.target.value
    });
  },

  render: function () {
    return (
      <div ref="root" className="star-rating rating-xs rating-active">
        <div className="rating-container rating-gly-star" data-content={this.state.glyph} onMouseMove={this.handleMouseOver}>
          <div ref="ratingStars" className="rating-stars" data-content={this.state.glyph} style={{width: this.state.pos + '%'}}></div>
          <input type="number" className='rating form-control hide' min={this.props.min} max={this.props.max} onChange={this.handleRangeChange} />
          {/*<svg height="210" width="500">
            <polygon points="100,10 40,198 190,78 10,78 160,198" style={{fill: 'red'}}/>
          </svg>*/}
        </div>
      </div>
    );
  }
});

module.exports = Star;
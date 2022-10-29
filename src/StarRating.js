import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';
import { utils } from './utils';
import './sass/react-star-rating.scss';

function isFloat(n) {
  return n === Number(n) && n % 1 !== 0;
}

// TODO
// - Add support for svg symbol
// - Add svg masking when react supports it
// - Update onClick to onSelect which supports mobile, desktop
// - Add onChange to trigger function when rating changes

/**
 * @fileoverview react-star-rating
 * <StarRating
 *   name={string} - name for form input (required)
 *   caption={string} - caption for rating (optional)
 *   totalStars={number} - the total amount of stars (required, default: 5)
 *   rating={number} - a set rating between the rating amount (optional)
 *   disabled={boolean} - whether to disable the rating from being selected (optional)
 *   editing={boolean} - whether the rating is explicitly in editing mode (optional)
 *   size={number} - size of stars (optional)
 *   onRatingClick={function} - a handler function that gets called onClick of the rating (optional)
 *   />
 */
class StarRating extends React.Component {

  // static propTypes = {
  //   name: React.PropTypes.string.isRequired,
  //   caption: React.PropTypes.string,
  //   totalStars: React.PropTypes.number.isRequired,
  //   rating: React.PropTypes.number,
  //   onRatingClick: React.PropTypes.func,
  //   disabled: React.PropTypes.bool,
  //   editing: React.PropTypes.bool,
  //   size: React.PropTypes.number
  // }

  static defaultProps = {
    step: 1,
    totalStars: 5,
    onRatingClick() {},
    disabled: false,
    size: 50,
    rating: 0
  }

  constructor(props) {
    super(props);

    this.state = {
      currentRatingVal: props.rating,
      currentRatingPos: this.getStarRatingPosition(props.rating),
      editing: props.editing || true,
      rating: props.rating,
      pos: this.getStarRatingPosition(props.rating),
      glyph: this.getStars(),
      size: props.size
    };
  }

  componentWillMount() {
    this.min = 0;
    this.max = this.props.totalStars || 5;

    if (this.props.rating) {
      this.state.editing = this.props.editing || false;
    }
  }

  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this.refs.root);
    this.ratingContainer = ReactDOM.findDOMNode(this.refs.ratingContainer);
  }

  componentWillUnmount() {
    delete this.root;
    delete this.ratingContainer;
  }

  /**
   * Gets the stars based on totalStars
   * @return {string} stars
   */
  getStars() {
    var stars = '';
    var numRating = this.props.totalStars;
    for(var i = 0; i < numRating; i++) {
      stars += '\u2605';
    }
    return stars;
  }

  getWidthFromValue(val) {
    var min = this.min,
        max = this.max;
    if (val <= min || min === max) {
      return 0;
    }
    if (val >= max) {
      return 100;
    }
    return (val - min) * 100 / (max - min);
  }

  calculate(pos) {
    var val = utils.getValueFromPosition(pos, this.props.step, this.ratingContainer, this.min, this.max),
        width = this.getWidthFromValue(val);

    width += '%';
    return {width, val};
  }

  getStarRatingPosition(val) {
    return this.getWidthFromValue(val) + '%';
  }

  getRatingEvent(e) {
    var root = this.root;
    var pos = utils.getPosition(e, root);
    return this.calculate(pos);
  }

  /**
   * Get Star SVG
   */
  getSvg(rating) {
    var stars = [];
    for (var i = 0; i < this.props.totalStars; i++) {
      var attrs = {};
      attrs['transform'] = `translate(${i*50}, 0)`;
      attrs['fill'] = (i+this.props.step <= rating) ? '#FFA91B' : '#C6C6C6';
      stars.push(
        <path {...attrs}
          key={`star-${i}`}
          mask="url(#half-star-mask)"
          d="m0,18.1l19.1,0l5.9,-18.1l5.9,18.1l19.1,0l-15.4,11.2l5.9,18.1l-15.4,-11.2l-15.4,11.2l5.9,-18.1l-15.4,-11.2l0,0z" />
      );
    }

    var styles = {
      width: `${stars.length * this.props.size}px`,
      height: `${this.props.size}px`
    };

    return (
      <svg className="rsr__star"
        style={styles}
        viewBox={`0 0 ${stars.length} 50`}
        preserveAspectRatio="xMinYMin meet"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg">
        {/*
          React Doesn't support `mask` attributes yet
        <defs>
          <mask id="half-star-mask">
            <rect x="0" y="0" width="26" height="50" fill="blue"></rect>
          </mask>
        </defs>*/}
        <g>
          {stars.map((item) => {
            return item;
          })}
        </g>
      </svg>
    );
  }

  /**
   * Update the active rating selection
   * @param  {number} width width based on mouse position
   * @param  {number} val   current rating amount
   */
  updateRating(width, val) {
    this.setState({
      pos: width,
      rating: val
    });
  }

  /**
   * Update rating state if props have changed
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps !== this.props) {
      this.updateRating(
        this.getStarRatingPosition(nextProps.rating),
        nextProps.rating
      );
      return true;
    } else {
      return nextState.currentRatingVal !== this.state.currentRatingVal || nextState.rating !== this.state.rating;
    }
  }

  /**
   * Set position to original state
   */
  handleMouseLeave() {
    this.setState({
      pos: this.state.currentRatingPos,
      rating: this.state.currentRatingVal
    });
  }

  /**
   * Update position to current event state
   * @param  {object} event
   */
  handleMouseMove(e) {
    // get hover position
    var ratingEvent = this.getRatingEvent(e);
    this.updateRating(
      ratingEvent.width,
      ratingEvent.val
    );
  }

  /**
   * Update rating state, Trigger function handler
   * @param  {object} event
   */
  handleClick(e) {
    if (this.props.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return false;
    }

    var payload = {
      currentRatingPos: this.state.pos,
      currentRatingVal: this.state.rating,
      caption: this.props.caption,
      name: this.props.name
    };

    this.setState(payload);

    this.props.onRatingClick(e, {
      rating: this.state.rating,
      position: this.state.pos,
      caption: this.props.caption,
      name: this.props.name
    });
  }

  getClasses() {
    return cx({
      'rsr-root': true,
      'rsr--disabled': this.props.disabled,
      'rsr--editing': this.state.editing
    });
  }

  getCaption() {
    if (this.props.caption) {
      return (<span className="rsr__caption">{this.props.caption}</span>);
    } else {
      return null;
    }
  }

  render() {

    var classes = this.getClasses();
    var caption = this.getCaption();
    var attrs = utils.setAttrs(this.state.editing, this);

    return (
      <span className="rsr-container">
        {caption}
        <div ref="root" className={classes}>
          <div ref="ratingContainer"
            className="rsr rating-gly-star"
            data-content={this.state.glyph} {...attrs}>
            {this.getSvg(this.state.rating)}
            <input type="hidden"
              name={this.props.name}
              value={this.state.currentRatingVal}
              style={{display: 'none !important'}}
              min={this.min}
              max={this.max}
              readOnly />
          </div>
        </div>
      </span>
    );
  }
}

export default StarRating;

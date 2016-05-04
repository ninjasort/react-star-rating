import React from 'react';
import ReactDOM from 'react-dom';
import cx from 'classnames';

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
 * @author @cameronjroe
 * <StarRating
 *   name={string} - name for form input (required)
 *   caption={string} - caption for rating (optional)
 *   totalStars={number} - the total amount of stars (required, default: 5)
 *   rating={number} - a set rating between the rating amount (optional)
 *   disabled={boolean} - whether to disable the rating from being selected (optional)
 *   editing={boolean} - whether the rating is explicitly in editing mode (optional)
 *   size={number} - size of stars (optional)
 *   onRatingClick={function} - a handler function that gets called onClick of the rating (optional)
 *   decimalRating={bool} - round up decimal and create half star
 *   />
 */
class StarRating extends React.Component {

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    caption: React.PropTypes.string,
    totalStars: React.PropTypes.number.isRequired,
    rating: React.PropTypes.number,
    onRatingClick: React.PropTypes.func,
    disabled: React.PropTypes.bool,
    editing: React.PropTypes.bool,
    size: React.PropTypes.number,
    decimalRating: React.PropTypes.bool
  }

  static defaultProps = {
    step: 1,
    totalStars: 5,
    onRatingClick() {},
    disabled: false,
    size: 50,
    rating: 0,
    decimalRating: false
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

  /**
   * Gets the mouse position
   * @param  {event} e
   * @return {number} delta
   */
  getPosition(e) {
    return e.clientX - this.root.getBoundingClientRect().left;
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

  applyPrecision(val, precision) {
    return parseFloat(val.toFixed(precision));
  }

  getDecimalPlaces(num) {
    var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  }

  getValueFromPosition(pos) {
    var precision = this.getDecimalPlaces(this.props.step);
    var maxWidth = this.ratingContainer.offsetWidth;
    var diff = this.max - this.min;
    var factor = (diff * pos) / (maxWidth * this.props.step);
    factor = Math.ceil(factor);
    var val = this.applyPrecision(parseFloat(this.min + factor * this.props.step), precision);
    val = Math.max(Math.min(val, this.max), this.min);
    return val;
  }

  calculate(pos) {
    var val = this.getValueFromPosition(pos),
        width = this.getWidthFromValue(val);

    width += '%';
    return {width, val};
  }

  getStarRatingPosition(val) {
    return this.getWidthFromValue(val) + '%';
  }

  getRatingEvent(e) {
    var pos = this.getPosition(e);
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
   * Get Star SVG With Half
   */
  getHalfSvg(rating) {
    var stars = [];
    console.log('decimal', this.getDecimalPlaces(rating));
    console.log('rating', rating);
    for (var i = 0; i < this.props.totalStars; i++) {
      var attrs = {};
      attrs['transform'] = `translate(${i*22}, 0)`;
      attrs['fill'] = (i+this.props.step <= rating) ? '#FFA91B' : '#C6C6C6';
      if(this.getDecimalPlaces(rating) === 1 && i === Math.floor(rating)) {
        attrs['fill'] = '#FFA91B';
        stars.push(
          <path {...attrs}
            key={`star-${i}`}
            mask="url(#half-star-mask)"
            d="M22,9.744l-7.191-0.617L12,2.5L9.191,9.127L2,9.744v0l0,0l5.455,4.727L5.82,21.5L12,17.772l0,0l6.18,3.727l-1.635-7.029L22,9.744z M12,15.896V6.595l1.71,4.036l4.38,0.376l-3.322,2.878l0.996,4.281L12,15.896z" />
        );
      } else {
        if(i > Math.floor(rating) ) {
          stars.push(
            <path {...attrs}
            key={`star-${i}`}
            mask="url(#half-star-mask)"
            d="M22,9.244l-7.191-0.617L12,2L9.191,8.627L2,9.244l5.455,4.727L5.82,21L12,17.272L18.18,21l-1.635-7.029L22,9.244z M12,15.396l-3.763,2.27l0.996-4.281L5.91,10.507l4.38-0.376L12,6.095l1.71,4.036l4.38,0.376l-3.322,2.878l0.996,4.281L12,15.396z" />
          );
        } else {
          stars.push(
            <polygon {...attrs}
              key={`star-${i}`}
              mask="url(#half-star-mask)"
              points="12,17.273 18.18,21 16.545,13.971 22,9.244 14.809,8.627 12,2 9.191,8.627 2,9.244 7.455,13.971 5.82,21 ">
            </polygon>
          );
        }
      }
    }

    var styles = {
      width: `${stars.length * this.props.size * 1.6}px`,
      height: `${this.props.size + 10}px`
    };

    return (
      <svg className="rsr__star" 
        style={styles} 
        viewBox={`0 0 ${stars.length} 20`} 
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

  treatName(title) {
    if (typeof title === 'string') {
      return title.toLowerCase().split(' ').join('_');
    }
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

  setAttrs() {
    var attrs = {};
    if (this.state.editing) {
      attrs['onMouseMove'] = this.handleMouseMove.bind(this);
      attrs['onMouseLeave'] = this.handleMouseLeave.bind(this);
      attrs['onClick'] = this.handleClick.bind(this);
    }
    return attrs;
  }

  render() {

    var classes = this.getClasses();
    var caption = this.getCaption();
    var attrs = this.setAttrs();

    return (
      <span className="rsr-container">
        {caption}
        <div ref="root" className={classes}>
          <div ref="ratingContainer"
            className="rsr rating-gly-star"
            data-content={this.state.glyph} {...attrs}>
            { !this.props.decimalRating && this.getSvg(this.state.rating)}
            { this.props.decimalRating && this.getHalfSvg(this.state.rating)}
            <input type="number"
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

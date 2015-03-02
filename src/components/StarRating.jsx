var React = require('react');

module.exports = React.createClass({

  getInitialState: function () {
    return {
      value: 0
    }
  },

  setValue: function (e) {
    this.setState({
      value: e.target.value
    });
  },

  render: function () {
    return (
    	<div className="star-rating">
    	  <input ref="r" type="range" min="0" max="10" value={this.state.value} onChange={this.setValue} />
    	  {this.state.value}
    	</div>
    );
  }

});
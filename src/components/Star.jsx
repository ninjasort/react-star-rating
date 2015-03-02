var React = require('react');

var Star = React.createClass({

  render: function () {
    return (
      <div>
        <svg height="210" width="500">
          <polygon points="100,10 40,198 190,78 10,78 160,198" style={{fill: 'red'}}/>
        </svg>
      </div>
    );
  }
});

module.exports = Star;
var React = require('react');
var StarRating = require('./StarRating.jsx');
var pkg = require('../package.json');

var inject = document.querySelector('.inject');

var App = React.createClass({

  handleRatingClick: function (e, data) {
    alert('You left a ' + data.rating + ' star rating for ' + data.name);
  },

  render: function () {
    var currentVersion = pkg.version;

    return (
    	<section>
        <div className="intro">
          <h1 className="main-title">
            {'react-star-rating'}
            <small> easy star ratings with React</small>
          </h1>
          <StarRating name="hotels" size="md" rating={5} editing={true} ratingAmount={5} step={1} />
        </div>
        <div className="ratings-wrap">
          <h2>Installation</h2>
          <hr/>
          <p>You can install react-star-rating with npm or bower.</p>
          <h3>CommonJS/Browserify</h3>
          <code>
            {'$ npm install react-star-rating --save'}
          </code>
          <h3>Bower/AMD</h3>
          <code>
            {'$ bower install react-star-rating --save'}
          </code>
          <h3>Browser Global</h3>
          <p>The bower repo contains react-star-rating.js and react-star-rating.min.js with a global object accessible from window.StarRating.</p>
          <code>
            <p>{'<script src="http://fb.me/react-0.12.2.js"></script>'}</p>
            <p>{'<script src="path/to/react-star-rating/react-star-rating.min.js"></script>'}</p>
            <p>{'<script>'}</p>
            <p><i>{'// window.StarRating'}</i></p>
            <p>{'</script>'}</p>
          </code>
          <h2>Usage</h2>
          <hr/>
          <form action="/" method="GET" className="demo-form">
            <StarRating name="react-star-rating" caption="Rate this component!" ratingAmount={5} />
            <button type="submit" className="btn btn-submit">Submit Rating</button>
          </form>
          <code>
            <p>{'var FormComponent = React.createClass({'}</p>
            <p>{'  render: function () { '}</p>
            <p>{'    return ('}</p>
            <p>{'      <form action="/" method="GET">'}</p>
            <p>{'        <StarRating name="react-star-rating" caption="Rate this component!" ratingAmount={5} />'}</p>
            <p>{'        <button type="submit" className="btn btn-submit">Submit Rating</button>'}</p>
            <p>{'      </form>'}</p>
            <p>{'    );'}</p>
            <p>{'  }'}</p>
            <p>{'});'}</p>
            <p>{' '}</p>
            <p>{'React.render(<FormComponent />, document.getElementById(\'star-rating\')'}</p>
          </code>
          <h2>Options</h2>
          <hr/>
          <ul>
            <li>{'name={string} - name for form input (required)'}</li>
            <li>{'caption={string} - caption for rating (optional)'}</li>
            <li>{'ratingAmount={number} - rating amount (required, default: 5)'}</li>
            <li>{'rating={number} - a set rating between the rating amount (optional)'}</li>
            <li>{'disabled={boolean} - whether to disable the rating from being selected (optional)'}</li>
            <li>{'editing={boolean} - whether the rating is explicitly in editing mode (optional)'}</li>
            <li>{'size={string} - size of stars (optional)'}</li>
            <li>{'onRatingClick={function} - a handler function that gets called onClick of the rating (optional) - gets passed (event, {position, rating, caption, name})'}</li>
          </ul>
          <h2>Examples</h2>
          <hr/>
          <StarRating name="handler" caption="Use onClick Handlers!" ratingAmount={5} step={0.5} onRatingClick={this.handleRatingClick} />
          <p></p>
          <code>
            <p>{'<script>'}</p>
            <p>{'    handleRatingClick: function (e, data) {'}</p>
            <p>{'      alert(\'You left a \' + data.rating + \' star rating for \' + data.caption);'}</p>
            <p>{'    },'}</p>
            <p>{'</script>'}</p>
            <p>{'<StarRating name="handler" caption="Use onClick Handlers!" ratingAmount={5} step={0.5} onRatingClick={handleRatingClick} />'}</p>
          </code>
          <StarRating name="ten-stars" caption="Configure number of stars!" ratingAmount={10} step={1} onRatingClick={this.handleRatingClick} />
          <code>
            {'<StarRating name="ten-stars" caption="Configure number of stars!" ratingAmount={10} step={1} onRatingClick={this.handleRatingClick} />'}
          </code>
          <StarRating name="half-stars" caption="Use half-star steps!" ratingAmount={5} />
          <code>
            {'<StarRating name="half-stars" caption="Use half-star steps!" ratingAmount={5} />'}
          </code>
          <StarRating name="small-rating" caption="Small!" size="sm" ratingAmount={5} rating={3} />
          <code>
            {'<StarRating name="small-rating" caption="Small!" size="sm" ratingAmount={5} rating={3} />'}
          </code>
          <StarRating name="medium-rating" caption="Medium!" size="md" ratingAmount={5} rating={4} />
          <code>
            {'<StarRating name="medium-rating" caption="Medium!" size="md" ratingAmount={5} rating={4} />'}
          </code>
          <StarRating name="large-rating" caption="Large!" size="lg" ratingAmount={5} rating={5} />
          <code>
            {'<StarRating name="large-rating" caption="Large!" size="lg" ratingAmount={5} rating={5} />'}
          </code>
          <StarRating name="disabled" caption="Disabled." ratingAmount={5} rating={3} disabled={true} />
          <code>
            {'<StarRating name="disabled" caption="Disabled." ratingAmount={5} rating={3} disabled={true} />'}
          </code>
        </div>
        <footer>
          <p className="footer-creds">
            <p>Code licensed under <a href="https://github.com/cameronjroe/react-star-rating/blob/master/LICENSE">MIT</a> - Currently v{currentVersion} - <a href="https://github.com/cameronjroe/react-star-rating">Github Repo</a></p>
            <p>Created by <a href="http://twitter.com/cameronjroe">@cameronjroe</a> - <iframe src="https://ghbtns.com/github-btn.html?user=cameronjroe&type=follow&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe></p>
          </p>
        </footer>
    	</section>
    );
  }

});

React.render(<App />, inject);
'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import StarRating from './StarRating';
import pkg from '../package';

var inject = document.querySelector('.inject');

class App extends React.Component {

  handleRatingClick(e, data) {
    console.log(data);
    alert('You left a ' + data.rating + ' star rating for ' + data.name);
  }

  render() {
    var currentVersion = pkg.version;

    return (
      <section>
        <div className="intro">
          <h1 className="main-title">
            {'react-star-rating'}
            <small> easy star ratings with Test</small>
          </h1>
          <StarRating name="hotels" size={50} rating={5} editing={false} totalStars={5} step={1} />
          <p style={{marginBottom: '10px'}}>v{currentVersion}</p>
          <a href="https://github.com/cameronjroe/react-star-rating" className="btn btn-primary">View on Github</a>
        </div>
        <div className="ratings-wrap">
          <h2>Installation</h2>
          <hr/>
          <code>
            {'$ npm install react-star-rating --save'}
          </code>
          <p>Include the css:</p>
          <code>
            {'<link rel="stylesheet" href="node_modules/react-star-rating/dist/css/react-star-rating.min.css">'}
          </code>
          <h2>Usage</h2>
          <hr/>
          <form target="_self" method="GET" className="demo-form">
            <StarRating name="react-star-rating" caption="Rate this component!" totalStars={5} />
            <button type="submit" className="btn btn-primary">Submit Rating</button>
          </form>
          <h3>ES6</h3>
          <code>
            <p>{'import React from \'react\''}</p>
            <p>{'import StarRating from \'react-star-rating\''}</p>
            <p>{' '}</p>
            <p>{'class FormComponent extends React.Component {'}</p>
            <p>{'  render() { '}</p>
            <p>{'    return ('}</p>
            <p>{'      <form target="_self" method="GET">'}</p>
            <p>{'        <StarRating name="react-star-rating" caption="Rate this component!" totalStars={5} />'}</p>
            <p>{'        <button type="submit" className="btn btn-primary">Submit Rating</button>'}</p>
            <p>{'      </form>'}</p>
            <p>{'    );'}</p>
            <p>{'  }'}</p>
            <p>{'}'}</p>
            <p>{' '}</p>
            <p>{'React.render(<FormComponent />, document.getElementById(\'star-rating\'));'}</p>
          </code>
          <h3>ES5</h3>
          <code>
            <p>{'var React = require(\'react\');'}</p>
            <p>{'var StarRating = require(\'react-star-rating\');'}</p>
            <p>{' '}</p>
            <p>{'var FormComponent = React.createClass({'}</p>
            <p>{'  render: function () { '}</p>
            <p>{'    return ('}</p>
            <p>{'      <form target="_self" method="GET">'}</p>
            <p>{'        <StarRating name="react-star-rating" caption="Rate this component!" totalStars={5} />'}</p>
            <p>{'        <button type="submit" className="btn btn-primary">Submit Rating</button>'}</p>
            <p>{'      </form>'}</p>
            <p>{'    );'}</p>
            <p>{'  }'}</p>
            <p>{'});'}</p>
            <p>{' '}</p>
            <p>{'React.render(<FormComponent />, document.getElementById(\'star-rating\'));'}</p>
          </code>
          <h2>Options</h2>
          <hr/>
          <ul>
            <li><strong>name</strong>{'={string} - name for form input (required)'}</li>
            <li><strong>caption</strong>{'={string} - caption for rating (optional)'}</li>
            <li><strong>totalStars</strong>{'={number} - rating amount (required, default: 5)'}</li>
            <li><strong>rating</strong>{'={number} - a set rating between the rating amount (optional)'}</li>
            <li><strong>disabled</strong>{'={boolean} - whether to disable the rating from being selected (optional)'}</li>
            <li><strong>editing</strong>{'={boolean} - whether the rating is explicitly in editing mode (optional)'}</li>
            <li><strong>size</strong>{'={number} - size of stars (optional)'}</li>
            <li><strong>onRatingClick</strong>{'={function} - a handler function that gets called onClick of the rating (optional) - gets passed (event, {position, rating, caption, name})'}</li>
          </ul>
          <h2>Examples</h2>
          <hr/>
          <StarRating name="handler" caption="Use onClick Handlers!" totalStars={5} onRatingClick={this.handleRatingClick.bind(this)} />
          <p></p>
          <code>
            <p>{'// handler in react class'}</p>
            <p>{'handleRatingClick: function (e, data) {'}</p>
            <p>{'    alert(\'You left a \' + data.rating + \' star rating for \' + data.caption);'}</p>
            <p>{'}'}</p>
            <p>{' '}</p>
            <p>{'<StarRating name="handler" caption="Use onClick Handlers!" totalStars={5} onRatingClick={handleRatingClick} />'}</p>
          </code>
          <p></p>
          <blockquote><strong>{'If you\'re using ES6, make sure to bind the handler: '}</strong><code>{'this.handleRatingClick.bind(this, pass, args, here)'}</code></blockquote>
          <StarRating name="ten-stars" caption="Configure number of stars!" totalStars={10} step={1} onRatingClick={this.handleRatingClick.bind(this)} />
          <code>
            {'<StarRating name="ten-stars" caption="Configure number of stars!" totalStars={10} step={1} onRatingClick={this.handleRatingClick} />'}
          </code>
          {/*<StarRating name="half-stars" caption="Use half-star steps!" totalStars={5} />
          <code>
            {'<StarRating name="half-stars" caption="Use half-star steps!" totalStars={5} />'}
          </code>*/}
          <StarRating name="small-rating" caption="Small!" size={30} totalStars={5} rating={3} />
          <code>
            {'<StarRating name="small-rating" caption="Small!" size={30} totalStars={5} rating={3} />'}
          </code>
          <StarRating name="medium-rating" caption="Medium!" size={50} totalStars={5} rating={4} />
          <code>
            {'<StarRating name="medium-rating" caption="Medium!" size={50} totalStars={5} rating={4} />'}
          </code>
          <StarRating name="large-rating" caption="Large!" size={70} totalStars={5} rating={5} />
          <code>
            {'<StarRating name="large-rating" caption="Large!" size={70} totalStars={5} rating={5} />'}
          </code>
          <StarRating name="jumbo-rating" caption="Jumbo!" size={100} totalStars={5} rating={5} />
          <code>
            {'<StarRating name="jumbo-rating" caption="Jumbo!" size={100} totalStars={5} rating={5} />'}
          </code>
          <StarRating name="disabled" caption="Disabled." totalStars={5} rating={3} disabled={true} />
          <code>
            {'<StarRating name="disabled" caption="Disabled." totalStars={5} rating={3} disabled={true} />'}
          </code>
        </div>
        <footer>
          <div className="footer-creds">
            <p>Code licensed under <a href="https://github.com/cameronjroe/react-star-rating/blob/master/LICENSE">MIT</a> - Currently v{currentVersion} - <a href="https://github.com/cameronjroe/react-star-rating">Github Repo</a></p>
            <p>Created by <a href="http://twitter.com/cameronjroe">@cameronjroe</a> - <iframe src="https://ghbtns.com/github-btn.html?user=cameronjroe&type=follow&count=true" frameBorder="0" scrolling="0" width="170px" height="20px"></iframe></p>
          </div>
        </footer>
      </section>
    );
  }

}

ReactDOM.render(<App />, inject);

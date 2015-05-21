# react-star-rating [![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)

<!-- [![Build Status](https://travis-ci.org/)](https://travis-ci.org/) -->
![](src/img/star-rating.png)

> A simple star rating component built with React.

## Install

#### CommonJS/Browserify
```sh
$ npm install react-star-rating --save
```

#### Bower/AMD
```sh
$ bower install react-star-rating --save
```

#### Browser
```html
<link rel="stylesheet" href="path/to/react-star-rating.min.css">
<script src="http://fb.me/react-0.13.0.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.13.0/JSXTransformer.js"></script>
<script src="path/to/react-star-rating/react-star-rating.min.js"></script>
<script>
// window.StarRating
</script>
```

## Usage

```js
var React = require('react');
var StarRating = require('react-star-rating');

var FormComponent = React.createClass({
    render: function () {
      return (
        <form action="/api" method="POST">
          <StarRating name="airbnb-rating" caption="Rate your stay!" ratingAmount={5} />
          <button type="submit" className="btn btn-submit">Submit Rating</button>
        </form>
      );
    }
});

React.render(<FormComponent />, document.getElementById('star-rating'));
```

## Options
  - **name**={string} - name for form input (required)
  - **caption**={string} - caption for rating (optional)
  - **ratingAmount**={number} - rating amount (required, default: 5)
  - **rating**={number} - a set rating between the rating amount (optional)
  - **disabled**={boolean} - whether to disable the rating from being selected (optional)
  - **editing**={boolean} - whether the rating is explicitly in editing mode (optional)
  - **size**={string} - size of stars (optional)
  - **onRatingClick**={function} - a handler function that gets called onClick of the rating (optional) - gets passed (event, {position, rating, caption, name})


## License

[MIT](https://github.com/cameronjroe/react-star-rating/blob/master/LICENSE)
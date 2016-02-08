# react-star-rating ![](https://david-dm.org/cameronjroe/react-star-rating.svg) [![Travis](https://img.shields.io/travis/cameronjroe/react-star-rating.svg?style=flat-square)](https://travis-ci.org/cameronjroe/react-star-rating)
[![NPM](https://nodei.co/npm/react-star-rating.png?compact=true)](https://nodei.co/npm/react-star-rating/)

<!-- [![Build Status](https://travis-ci.org/)](https://travis-ci.org/) -->
![](src/assets/star-rating.png)

> A simple star rating component built with React.

## Install

```sh
$ npm install react-star-rating --save
```

Include the css:

```html
<link rel="stylesheet" href="node_modules/react-star-rating/dist/css/react-star-rating.min.css">
```

## Usage

### ES6
```js
import React from 'react';
import StarRating from 'react-star-rating';

class FormComponent extends React.Component {
  render() {
    return (
      <form action="/api" method="POST">
        <StarRating name="airbnb-rating" caption="Rate your stay!" totalStars={5} />
        <button type="submit" className="btn btn-submit">Submit Rating</button>
      </form>
    );
  }
}

React.render(<FormComponent />, document.getElementById('star-rating'));
```

### ES5
```js
var React = require('react');
var StarRating = require('react-star-rating');

var FormComponent = React.createClass({
    render: function () {
      return (
        <form action="/api" method="POST">
          <StarRating name="airbnb-rating" caption="Rate your stay!" totalStars={5} />
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
  - **totalStars**={number} - rating amount (required, default: 5)
  - **rating**={number} - a set rating between the rating amount (optional)
  - **disabled**={boolean} - whether to disable the rating from being selected (optional)
  - **editing**={boolean} - whether the rating is explicitly in editing mode (optional)
  - **size**={number} - size of stars (optional)
  - **onRatingClick**={function} - a handler function that gets called onClick of the rating (optional) - gets passed (event, {position, rating, caption, name})

## Todo

- [x] Fix ES6 bug with bundling
- [x] Add svg stars
- [x] Double-check touch support works
- [ ] Re-implement star hovering (kinda janky right now)


## License

[MIT](https://github.com/cameronjroe/react-star-rating/blob/master/LICENSE)
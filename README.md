# react-star-rating

<!-- [![Build Status](https://travis-ci.org/)](https://travis-ci.org/) -->

> A simple star rating component.

## Install

### CommonJS/Browserify
```sh
$ npm install react-star-rating --save
```

### Bower/AMD
```sh
$ bower install react-star-rating --save
```

## Usage

```js
var FormComponent = React.createClass({
    render: function () {
      return ('
        <form action="/" method="GET">
          <StarRating name="airbnb-rating" caption="Rate your stay!" ratingAmount={5} />
          <button type="submit" className="btn btn-submit">Submit Rating</button>
        </form>
      );
    }
});

React.render(<FormComponent />, document.getElementById(\'star-rating\')'}</p>
```

## Todos

- component
  - [x] be able to set star rating
  - [ ] emit events on rating select, change, remove
  - [ ] have minimal styling in react-star-rating.min.css
  - [ ] have classes to override styling
  - [ ] unbind, clean up when removed
  - [ ] include tests
- demo
  - [x] gh-pages
  - [ ] CommonJS module support
  - [ ] AMD module support
  - [ ] Browser global support
  - [ ] show usage instructions
import React from 'react/addons';
import StarRating from 'components/StarRating';

describe("Star rating", () => {

  beforeEach(function() {
    let {TestUtils} = React.addons;

    this.component = TestUtils.renderIntoDocument(<StarRating />);
    this.renderedDOM = () => React.findDOMNode(this.component);
  });

  it("should be there", function () {
    expect(this.component).to.be.ok;
  });

});
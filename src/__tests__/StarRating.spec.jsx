import React from 'react/addons';
import StarRating from '../StarRating';

// http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/
describe("Star rating", () => {
  let {TestUtils} = React.addons;

  beforeEach(function() {
  });

  it("has the default props properly set", function() {
    const starRating = <StarRating />;
    expect(starRating.props.step).to.equal(0.5);
    expect(starRating.props.ratingAmount).to.equal(5);
    expect(starRating.props.onRatingClick).to.be.a('function');
    expect(starRating.props.disabled).to.be.false;
  });

  it("should trigger onMouseMove be default", function() {
    const handleMouseMove = sinon.spy();
    const starRating = TestUtils.renderIntoDocument(
      <StarRating name='something' onMouseMove={handleMouseMove} />
    );
    const el = TestUtils.findRenderedDOMComponentWithClass(starRating, 'react-star-rating');

    TestUtils.Simulate.mouseMove(el, {clientX: 10});
    expect(handleMouseMove).to.have.been.called;
  });

  // it("should be a span", function() {
  //   let spans = TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'span');
  //   // console.log(spans);
  // });

});
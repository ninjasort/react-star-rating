import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import StarRating from '../src/StarRating';

// http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/
describe("<StarRating />", () => {
  
  beforeEach(function () {
    this.component = TestUtils.renderIntoDocument(<StarRating name="test-rating" />);
    this.renderedDOM = () => ReactDOM.findDOMNode(this.component);
  });

  it("renders the correct structure", function () {
    // <span class="rsr-container">
    //   <div class="rsr-root rsr--editing">
    //     <div class="rsr" data-content="*****">
    //       <div class="rsr__stars" data-content="*****"></div>
    //       <input type="number" 
    //         name="test-rating"
    //         value="0"
    //         style="display:none !imporant"
    //         min="0"
    //         max="5"
    //         readonly="">
    //     </div>
    //   </div>
    // </span>
    var root = this.renderedDOM();
    expect(root.tagName).to.equal('SPAN');
    expect(root.className).to.contain('rsr-container');
    expect(root.children[0].className).to.contain('rsr-root');
    expect(root.children[0].className).to.contain('rsr--editing');
  });
  
  // it("has the default props properly set", () => {
  //   expect(starRating.props.step).to.equal(0.5);
  //   expect(starRating.props.totalStars).to.equal(5);
  //   expect(starRating.props.onRatingClick).to.be.a('function');
  //   expect(starRating.props.disabled).to.be.false;
  // });

  // it("should trigger onMouseMove be default", function() {
  //   const handleMouseMove = sinon.spy();
  //   const starRating = TestUtils.renderIntoDocument(
  //     <StarRating name='something' onMouseMove={handleMouseMove} />
  //   );
  //   const el = TestUtils.findRenderedDOMComponentWithClass(starRating, 'react-star-rating');

  //   TestUtils.Simulate.mouseMove(el, {clientX: 10});
  //   expect(handleMouseMove).to.have.been.called;
  // });

  // it("should be a span", function() {
  //   let spans = TestUtils.scryRenderedDOMComponentsWithTag(this.component, 'span');
  //   // console.log(spans);
  // });

});
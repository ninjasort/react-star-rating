import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import StarRating from '../StarRating';
import chai from 'chai';
import equalJSX from 'chai-equal-jsx';
import chaiEnzyme from 'chai-enzyme'
import useSheet from 'react-jss';
import {
  shallow,
  describeWithDOM,
  mount,
  spyLifecycle
} from 'enzyme';
chai.use(equalJSX);
chai.use(chaiEnzyme);
let expect = chai.expect;

class Tester extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Something'
    };
  }
  render() {
    return (
      <div className='something'>{this.state.text}</div>
    );
  }
}

const Test = useSheet(Tester, {'rsr-container': {'position': 'relative'}});

// Tutorials to read. Fuck I have so much to do...
// - [ ] http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/
// - [ ] http://www.toptal.com/react/how-react-components-make-ui-testing-easy

describeWithDOM("<StarRating />", function () {
  
  var renderer;
  var wrapper;

  beforeEach(function () {
    renderer = TestUtils.createRenderer();
    renderer.render(
      <StarRating 
        name="test-rating" 
        size={30}
        rating={5} 
        editing={true} 
        caption="test rating caption"
        totalStars={5} 
        step={1} />
      );
    wrapper = mount(
      <StarRating 
        name="test-rating" 
        size={30}
        rating={5} 
        editing={true} 
        caption="test rating caption"
        totalStars={5} 
        step={1} />
      );
  });

  it("should render a span with the className .rsr-container", () => {
    const root = wrapper.find('span').first();
    expect(root.type()).to.equal('span');
    expect(root.prop('className')).to.contain('rsr-container');
  });

  it("should render a caption in a span with the className .rsr__caption", () => {
    expect(wrapper.children('span').first().prop('className')).to.contain('rsr__caption');
  });

  it("should render the caption text", () => {
    expect(wrapper.children('span').first().text()).to.equal('test rating caption');
  });
  
  it("has the default props properly set", () => {
    const defaultRating = mount(<StarRating name='default-rating' />);
    const root = defaultRating.find('span').first();
    expect(root.prop('step')).to.equal(1);
    expect(root.prop('totalStars')).to.equal(5);
    expect(root.prop('onRatingClick')).to.be.a('function');
    expect(root.prop('disabled')).to.equal(false);
  });

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
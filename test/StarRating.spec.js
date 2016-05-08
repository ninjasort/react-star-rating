import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import StarRating from '../src/StarRating';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme'
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
chai.use(chaiEnzyme);
let expect = chai.expect;

// Tutorials to read. Fuck I have so much to do...
// - [ ] http://reactkungfu.com/2015/07/approaches-to-testing-react-components-an-overview/
// - [ ] http://www.toptal.com/react/how-react-components-make-ui-testing-easy

describe("<StarRating />", () => {
  
  var wrapper;

  beforeEach(() => {
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

  it("should trigger onMouseMove by default", () => {
    const handleMouseMove = sinon.spy();
    const rating = mount(
      <StarRating name='mouse-move' onMouseMove={handleMouseMove} />
    );
    rating.simulate('mousemove', {clientX: 10});
    expect(handleMouseMove.calledOnce).to.equal(true);
    expect(handleMouseMove.firstCall.args[0].clientX).to.equal(10);
  });

  it("should support additional props passed in", () => {
    const rating = mount(<StarRating name='rating' className='something' />);
    expect(rating.find('span').first().prop('className')).to.contain('rsr-container');
    expect(rating.find('span').first().prop('className')).to.contain('something');
  });

  // xit('should set editing to true if there is a rating prop', function () {
  //   // expect(wrapper)
  // });

});
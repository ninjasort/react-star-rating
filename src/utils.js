
function getDecimalPlaces(num) {
  var match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  return !match ? 0 : Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
}

function applyPrecision(val, precision) {
  return parseFloat(val.toFixed(precision));
}

export const utils = {
  /**
   * Gets the mouse position
   * @param  {event} e
   * @return {number} delta
   */
  getPosition(e, root) {
    return e.clientX - root.getBoundingClientRect().left;
  },

  setAttrs(isState, obj) {
    var attrs = {};
    if (isState) {
      attrs['onMouseMove'] = obj.handleMouseMove;
      attrs['onMouseLeave'] = obj.handleMouseLeave;
      attrs['onClick'] = obj.handleClick;
    }
    return attrs;
  },

  treatName(title) {
    if (typeof title === 'string') {
      return title.toLowerCase().split(' ').join('_');
    }
  },

  getValueFromPosition(pos, step, container, min, max) {
    var precision = getDecimalPlaces(step);
    var maxWidth = container.offsetWidth;
    var diff = max - min;
    var factor = (diff * pos) / (maxWidth * step);
    factor = Math.ceil(factor);
    var val = applyPrecision(parseFloat(min + factor * step), precision);
    val = Math.max(Math.min(val, max), min);
    return val;
  }

}

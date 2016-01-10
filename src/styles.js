// updates
// - uses rems
export default {
  'rsr': {
    'position': 'relative',
    'vertical-align': 'middle',
    'display': 'inline-block',
    'color': '#e3e3e3',
    'overflow': 'hidden'
  },
  'rsr__stars': {
    'position': 'absolute',
    'left': 0,
    'top': 0,
    'white-space': 'nowrap',
    'overflow': 'hidden',
    'color': '#F5A71B',
    'transition': 'all 0.01s'
  },
  'rsr__caption': {
    'font-size': '1.25em',
    'vertical-align': 'middle',
    'margin-right': '0.5em'
  },
  'rsr--editing': {
    '&:hover': {
      'cursor': 'pointer'
    }
  },
  'rsr--disabled': {
    'cursor': 'not-allowed'
  },
  'rsr-root': {
    'vertical-align': 'middle',
    'display': 'inline-block'
  }
}
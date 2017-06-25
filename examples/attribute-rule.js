new DC.DomRules('_tip', {
  init() {
    console.log('element with attribute "tip" initialized');
  },
  events: {
    mouseover() {
      console.log('over')
    },
    mouseout() {
      console.log('out')
    }
  }
});

DC('button', {
  t: 'dynamic',
  attr: {
    tip: 'yeah'
  }
}).into(document.body);
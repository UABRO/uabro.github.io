const r = new DC.Router;

r.rule(/.*/, () => {
  console.log('default');
});

r.rule(/\/somewhere/, data => {
  console.log('I am somewhere!',r.query, data);
});

r.go('/somewhere', {id:5}, {intrinsic: Math.random()});

/*

Pattern matching goes from down to top, so first define general rules,
then specific rules.

 */
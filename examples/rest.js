const api = new DC.Rest;
api.base = 'http://localhost:3333/api/v1/';
api.setH('token', 'secret jsonWebToken');

api
  .get('profile')
  .then(info => console.log('my profile',info))
  .catch(err => console.log(err));

api
  .headers({
    customHeader: Math.random()
  })
  .get('profile')
  .then(console.log);

api
  .xhr(xhr => {
    // manipulate with xhr
  })
  .get('profile')
  .then(console.log);

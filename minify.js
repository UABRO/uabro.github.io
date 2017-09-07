const fs = require('fs');
const request = require('request');

fs.readFile('domcom.2.js', 'utf8', (err, data) => {
  if (err) return console.log(err);
  request.post({
    url: 'http://closure-compiler.appspot.com/compile', form: {
      output_format: 'json',
      output_info: 'compiled_code',
      compilation_level: 'SIMPLE_OPTIMIZATIONS',
      js_code: data
    }
  }, (err, httpResponse, body) => {
    if (err || httpResponse.statusCode !== 200) return console.log('error', body);
    try {
      body = JSON.parse(body);
      const data =
`/**
 * @name DomCom framework, 2017,
 * @author Oleksii Shnyra, UABRO
 * @website https://uabro.com
*/

` + body.compiledCode;
      fs.writeFile('domcom.2.min.js', data, err => {
        if(err) return console.log(err);
        console.log('finished');
      });
    } catch (err) {
      console.log(err);
    }
  });
});
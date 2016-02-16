var config = require('config');

var Validator = {};

Validator.validate = function(){
  console.log('%j',config);
}

Validator.validateParameter = function(){

}

module.exports = Validator;

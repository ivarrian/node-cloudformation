var config = require('config');

var Validator = {};


Validator.validateParameter = function(parameter){
  var listOfProperties = config.Validation.Parameters.Properties;
  // find all required and valid properties
  var requiredProperties = [];
  var validProperties = [];
  listOfProperties.forEach(function(property){
    if(typeof property.Required != 'undefined'){
      if(property.Required == 'Yes'){
        requiredProperties.push(property);
      }
    }
  });

  // if some property(ies) is(are) required
  if(requiredProperties.length > 0){
    requiredProperties.forEach(function(requiredProperty){
      console.log(requiredProperty);
      var foundRequiredProperty = false;
      for(var key in parameter){
        if(requiredProperty == key)
          foundRequiredProperty = true;
      }
      if(foundRequiredProperty == true){
        console.log(requiredProperty+" found");
      }
      else {
        console.log(requiredProperty+" not found");
      }
    });
  }


}

module.exports = Validator;

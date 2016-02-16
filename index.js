var validator = require('./lib/validator');
var config = require('config');

var defaultFormatVersion = "2010-09-09";

var CloudFormation = function(){
  switch(arguments.length){
    case 0:
      version = undefined;
      description = undefined;
    break;
    case 1:
      version = undefined;
      description = arguments[0];
    break;
    case 2:
      version = arguments[0];
      description = arguments[1];
    break;
  }
  if(typeof version != 'undefined'){
    this.version = version;
  }
  else {
    this.version = defaultFormatVersion;
  }

  if(typeof description != 'undefined'){
    this.description = description;
  }
  else {
    this.description = "";
  }
};

CloudFormation.prototype.addParameter = function(name,parameter){
  if(typeof this.parameters == 'undefined' ) {
    this.parameters = [];
  }
  validator.validate(parameter);
  this.parameters[name]= parameter;
}

CloudFormation.prototype.getJson = function(){
  var fullJson = {};

  /*

  Template Anatomy : http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html

  - Format Version
  - Description
  - Metadata
  - Parameters
  - Mappings
  - Conditions
  - Resources
  - Outputs

  */

  /*****************************************
    - Format Version : http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/format-version-structure.html
  *****************************************/
  fullJson.AWSTemplateFormatVersion = this.version;

  /*****************************************
    - Description : http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-description-structure.html
  *****************************************/
  fullJson.Description = this.description;

  /*****************************************
    - Parameters : http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html
    Loop through each parameter and add them to Parameters section
  *****************************************/
  if(typeof this.parameters != 'undefined'){
      fullJson.Parameters = {};
      for(var key in this.parameters){
        fullJson.Parameters[key] = this.parameters[key];
      }
  }
  return fullJson;
}

CloudFormation.prototype.toString = function(){
  return JSON.stringify(this.getJson());
}

module.exports = CloudFormation;

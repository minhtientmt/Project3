'use strict';


function TemplateProcessor(template) {
  this.template = template;
}


TemplateProcessor.prototype.fillIn = function (dictionary) {
  
  let filledTemplate = this.template;
  const re = /{{[^{]*}}/g;               
  const match = this.template.match(re); 

  match.forEach((placeholder) => {
    const property = placeholder.replace("{{", "").replace("}}", ""); 

    if (dictionary[property]) {
        
      filledTemplate = filledTemplate.replace(placeholder, dictionary[property]); 
    } else {
        
      filledTemplate = filledTemplate.replace(placeholder, ""); 
    }
});

  
  return filledTemplate;
};
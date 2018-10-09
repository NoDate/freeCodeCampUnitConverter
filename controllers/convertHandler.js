/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    var result;
    
    // Get string left of first letter
    if (/[a-zA-Z]/.test(input)) {
      result = input.substring(0, input.match(/[a-zA-Z]/).index);
    } else {
      result = input;
    }
    
    // Check if empty
    if (result.length === 0) {
      return 1;
    }
        
    if (/\//.test(result)) {
      // Get fraction parts
      let index = input.match(/\//).index;
      let num = result.substring(0, index);
      let den = result.substring(index + 1);
      
      // Check if valid
      if (isNaN(num) || isNaN(den)) {
        return 'invalid number';
      }
      
      result = num / den;
    }

    // Check if valid
    if (isNaN(result) || result === Infinity) {
      return 'invalid number';
    }
    
    // Round result
    result = Math.floor(result * 10000) / 10000;
    
    return result;
  };
  
  this.getUnit = function(input) {
    var result = input.toLowerCase();
    
    // Get string right of first letter
    let match = result.match(/[a-zA-Z]/);
    
    if (/[a-zA-Z]/.test(input)) {
      result = result.substring(input.match(/[a-zA-Z]/).index);
    } else {
      return 'invalid unit';
    }
        
    // Check if valid
    if (['gal', 'l', 'kg', 'lbs', 'km', 'mi'].indexOf(result.toLowerCase()) < 0) {
      return 'invalid unit';
    }
    
    // Uppercase liters
    if (result === 'l') {
      result = 'L';
    }
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var input = initUnit.toLowerCase();
        
    if (input === 'gal') {
      return 'L';
    } else if (input === 'l') {
      return 'gal';
    } else if (input === 'lbs') {
      return 'kg';
    } else if (input === 'kg') {
      return 'lbs';
    } else if (input === 'mi') {
      return 'km';
    } else if (input === 'km') {
      return 'mi';
    } else {
      return 'invalid unit';
    }
  };

  this.spellOutUnit = function(unit) {
    var input = unit.toLowerCase();
    
    if (input === 'gal') {
      return 'gallons';
    } else if (input === 'l') {
      return 'liters';
    } else if (input === 'lbs') {
      return 'pounds';
    } else if (input === 'kg') {
      return 'kilograms';
    } else if (input === 'mi') {
      return 'miles';
    } else if (input === 'km') {
      return 'kilometers';
    } else {
      return 'invalid unit';
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    var result;
            
    // Check if valid number
    if (isNaN(initNum)) {
      return 'invalid number';
    }
    
    var unit = initUnit.toLowerCase();
    
    if (unit === 'gal') {
      result = initNum * galToL;
    } else if (unit === 'l') {
      result = initNum / galToL;
    } else if (unit === 'lbs') {
      result = initNum * lbsToKg;
    } else if (unit === 'kg') {
      result = initNum / lbsToKg;
    } else if (unit === 'mi') {
      result = initNum * miToKm;
    } else if (unit === 'km') {
      result = initNum / miToKm;
    } else {
      return 'invalid unit';
    }
        
    // Round result
    result = Math.floor(result * 10000) / 10000;
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    if (initNum === 'invalid number' && initUnit === 'invalid unit') {
      return 'invalid number and unit';
    } else if (initNum === 'invalid number') {
      return 'invalid number';
    } else if (initUnit === 'invalid unit') {
      return 'invalid unit';
    } else {    
      return initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    }
  };
  
}

module.exports = ConvertHandler;

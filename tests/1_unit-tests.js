/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '1.5mi';
      assert.approximately(convertHandler.getNum(input), 1.5, 0.01);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '3/7gal'
      assert.approximately(convertHandler.getNum(input), 3 / 7, 0.01);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '2.6/18.99km';
      assert.approximately(convertHandler.getNum(input), 2.6 / 18.99, 0.01);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input = '5/5/5lbs';
      assert.equal(convertHandler.getNum(input), 'invalid number');
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'kg';
      assert.equal(convertHandler.getNum(input), 1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        let eleLower = ele.toLowerCase();
        
        if (eleLower === 'gal') {
          assert.equal(convertHandler.getUnit(ele), 'gal');
        } else if (eleLower === 'l') {
          assert.equal(convertHandler.getUnit(ele), 'L');
        } else if (eleLower === 'mi') {
          assert.equal(convertHandler.getUnit(ele), 'mi');
        } else if (eleLower === 'km') {
          assert.equal(convertHandler.getUnit(ele), 'km');
        } else if (eleLower === 'lbs') {
          assert.equal(convertHandler.getUnit(ele), 'lbs');
        } else if (eleLower === 'kg') {
          assert.equal(convertHandler.getUnit(ele), 'kg');
        }
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      assert.equal(convertHandler.getUnit('abcd'), 'invalid unit');
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['L','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      assert.approximately(convertHandler.convert(7.5, 'L'), 1.9813, 0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      assert.approximately(convertHandler.convert(12, 'mi'), 19.3121, 0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      assert.approximately(convertHandler.convert(1.75, 'km'), 1.0874, 0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      assert.approximately(convertHandler.convert(135, 'lbs'), 61.2350, 0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      assert.approximately(convertHandler.convert(98.85, 'kg'), 211.3131, 0.1);
      done();
    });
  });
});

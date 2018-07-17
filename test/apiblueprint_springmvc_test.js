'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.apiblueprint_springmvc = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },

  default_options: function (test) {

    var tests = [
      { name: 'Test1', models: ['Test2Base', 'Test2ChildFlat', 'Test2ChildInherit']},
      { name: 'Test2', models: ['Test1BlogPost', 'Test1Author']}
    ];

    test.expect(9);

    tests.forEach(function(testInstance){
      var testName = testInstance.name;
      testInstance.models.forEach(function(modelName) {
        test.equal(
          grunt.file.read('tmp/model/'+modelName+'.java').replace(/\r\n/g, '\n'),
          grunt.file.read('test/expected/'+modelName+'.java').replace(/\r\n/g, '\n'),
          'Generated '+testName+' model should match.');
      });

      // Controller
      test.equal(
        grunt.file.read('tmp/controller/'+testName+'Controller.java').replace(/\r\n/g, '\n'),
        grunt.file.read('test/expected/'+testName+'Controller.java').replace(/\r\n/g, '\n'),
        'Generated '+testName+' controller should match.');

      // Service
      test.equal(
        grunt.file.read('tmp/service/'+testName+'ApiService.java').replace(/\r\n/g, '\n'),
        grunt.file.read('test/expected/'+testName+'ApiService.java').replace(/\r\n/g, '\n'),
        'Generated '+testName+' service should match.');
    });

    test.done();
  }
};

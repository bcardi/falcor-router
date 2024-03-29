var Rx = require('rx');
var Observable = Rx.Observable;
var R = require('../../src/Router');
var TestRunner = require('./../TestRunner');
var falcor = require('falcor');
var $ref = falcor.Model.ref;

module.exports = function() {
    return {
        Integers: function(fn) {
            return [{
                route: 'genreLists[{ranges:indices}]',
                get: function(path) {
                    if (fn) { fn(path); }
                    return Observable.defer(function() {
                        var genreLists = {};
                        TestRunner.rangeToArray(path.indices).
                            forEach(function(x) {
                                genreLists[x] = $ref(['videos', x]);
                            });

                        return Observable.return({
                            jsong: {
                                genreLists: genreLists
                            }
                        });
                    });
                }
            }];
        }
    };
};

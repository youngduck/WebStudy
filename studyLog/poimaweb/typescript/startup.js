"use strict";
exports.__esModule = true;
var _ = require("lodash");
var StartUP = /** @class */ (function () {
    function StartUP() {
    }
    StartUP.main = function () {
        var group = _.groupBy(['one', 'two', 'three'], 'length');
        console.log(group);
        return 0;
    };
    return StartUP;
}());
StartUP.main();

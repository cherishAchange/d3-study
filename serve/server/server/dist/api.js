"use strict";
module.exports = (a, b) => {
    if (process.env) {
        return a + b;
    }
    return a - b;
};

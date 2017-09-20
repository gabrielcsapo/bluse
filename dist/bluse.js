require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"bluse":[function(require,module,exports){
function parser(data, pk) {
  let struct = {};

  Object.keys(data).forEach((k) => {
    if(Array.isArray(data[k]) == true) {
      if(typeof data[k][0] == 'object') {
        // if this array contains objects, parse them accordingly
        var na = data[k].map((sd) => parser(sd, pk ? `${pk}:${k}` : k));
        na.forEach((n, i) => {
          Object.keys(n).forEach((a) => {
            // the key is since we have already run the parser on the data
            // we are simply putting it back on the top level object
            if(struct[a]) {
              struct[a] = struct[a].concat(na[i][a]);
            } else {
              if(Array.isArray(na[i][a])) {
                struct[a] = na[i][a];
              } else {
                struct[a] = [na[i][a]];
              }
            }
          });
        });
      } else {
        // if this is a flat array, just put the data back
        struct[pk ? `${pk}:${k}` : k] = data[k];
      }
    } else if(typeof data[k] == 'object') {
      Object.assign(struct, parser(data[k], pk ? `${pk}:${k}` : k));
    } else {
      // this is a flat attribute
      struct[pk ? `${pk}:${k}` : k] = data[k];
    }
  });

  return struct;
}

module.exports = (data) => {
  if(Array.isArray(data)) {
    let agr = {};
    const ret = data.map((d) => parser(d));

    ret.forEach((r) => {
      Object.keys(r).forEach((k) => {
        if(agr[k]) {
          agr[k] = agr[k].concat(r[k]);
        } else {
          if(Array.isArray(r[k])) {
            agr[k] = r[k];
          } else {
            agr[k] = [r[k]];
          }
        }
      })
    });
    return agr;
  }
  return parser(data);
}

},{}]},{},[]);

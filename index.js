function parser(data, pk) {
  let struct = {};

  Object.keys(data).forEach((k) => {
    if(Array.isArray(data[k]) == true) {
      // deal with mixed array values by separating them
      let objects = [];
      let flat = [];
      data[k].forEach((o) => {
        if(typeof o === 'object') {
          objects.push(o);
        } else {
          flat.push(o);
        }
      });

      if(objects.length > 0) {
        // if this array contains objects, parse them accordingly
        var na = objects.map((sd) => parser(sd, pk ? `${pk}:${k}` : k));
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
      }
      // if this is a flat array, just put the data back
      struct[pk ? `${pk}:${k}` : k] = flat;

    } else if(typeof data[k] == 'object') {
      Object.assign(struct, parser(data[k], pk ? `${pk}:${k}` : k));
    } else {
      // this is a flat attribute
      struct[pk ? `${pk}:${k}` : k] = data[k];
    }
  });

  return struct;
}

function fUnique(value, index, self) {
    return self.indexOf(value) === index;
}

module.exports = (data, options={}) => {
  const { unique=false } = options;

  if(Array.isArray(data)) {
    let agr = {};
    const ret = data.map((d) => parser(d));

    ret.forEach((r) => {
      Object.keys(r).forEach((k) => {
        if(agr[k]) {
          if(unique) {
            agr[k] = agr[k].concat(r[k]).filter(fUnique);
          } else {
            agr[k] = agr[k].concat(r[k]);
          }
        } else {
          if(Array.isArray(r[k])) {
            if(unique) {
              agr[k] = r[k].filter(fUnique);
            } else {
              agr[k] = r[k];
            }
          } else {
            if(unique) {
              agr[k] = [r[k]].filter(fUnique);
            } else {
              agr[k] = [r[k]]
            }
          }
        }
      })
    });
    return agr;
  }
  return parser(data);
}

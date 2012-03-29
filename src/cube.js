cubism.cube = function(host) {
  if (!arguments.length) host = "";
  var iso = d3.time.format.iso;

  var source = cubism_source(function(expression, start, stop, step, callback) {
    d3.json(host + "/1.0/metric"
        + "?expression=" + encodeURIComponent(expression)
        + "&start=" + iso(start)
        + "&stop=" + iso(stop)
        + "&step=" + step, function(data) {
      if (!data) return callback(new Error("unable to load data"));
      callback(null, data.map(function(d) { return [iso.parse(d.time), d.value]; }));
    });
  });

  // Returns the Cube host.
  source.toString = function() {
    return host;
  };

  return source;
};
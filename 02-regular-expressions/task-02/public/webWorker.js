onmessage = function onmessage(e) {
    var iterations = Number(e.data.iteration);
    var resultsEvery = Number(e.data.resultsEvery);
    var inCircle = 0;

    for (var i = 1; i <= iterations; i++) {
        if (generatePoint()) {
            inCircle++;
        }

        if (i % resultsEvery === 0) {
            postMessage({
                iteration: i,
                pi: inCircle / iterations * 4,
                point: inCircle / iterations
            });
        }

        if (i === iterations) {
            postMessage({
                activeButton: true
            });
        }
    }
};

var generatePoint = function generatePoint() {
    var r = 16;
    var x = Math.random() * r * 2 - r;
    var y = Math.random() * r * 2 - r;
    return Math.pow(x, 2) + Math.pow(y, 2) < Math.pow(r, 2);
};
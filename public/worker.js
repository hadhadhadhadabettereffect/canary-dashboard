onmessage = function(msg) {
    switch (msg.data.type) {
        case "stats":
            listStats(msg.data.data);
            break;
    }
};

function listStats(data) {
    var stats = {
        temperature: {
            devices: [],
            max: 0,
            mean: 0,
            min: 0
        },
        humidity: {
            devices: [],
            max: 0,
            mean: 0,
            min: 0
        },
        airquality: {
            devices: [],
            max: 0,
            mean: 0,
            min: 0
        }
    };
    // group devices by type, normalize values
    for (var i=0, j=data.length; i<j; ++i) {
        stats[data[i].type].devices.push({
            name: data[i].name,
            value: (data[i].value >>> 0),
            updatedAt: Date.parse(data[i].updatedAt)
        });
    }
    // check min/max/mean values
    checkRange(stats.temperature);
    checkRange(stats.humidity);
    checkRange(stats.airquality);

    postMessage({
        type: "stats",
        data: stats
    });
}

/**
 * get min, max, and mean of device values
 * @param {Object} obj
 * @param {Object[]} obj.devices - array of device data objects
 * @param {number} obj.min - lowest value from obj.devices
 * @param {number} obj.max - highest value from obj.devices
 * @param {number} obj.mean - average value
 */
function checkRange(obj) {
    var devices = obj.devices;
    var count = devices.length,
        val, min, max, mean;
    if (count) {
        val = devices[0].value;
        min = val;
        max = val;
        mean = val/count;
        for (var i=1; i<count; ++i) {
            val = devices[i].value;
            mean += (val/count);
            if (val < min) min = val;
            if (val > max) max = val;
        }
        obj.min = min;
        obj.max = max;
        obj.mean = Math.round(mean);
    }
}
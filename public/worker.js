var count = 100;
var readings = new Int8Array(count);

onmessage = function(msg) {
    switch (msg.data.type) {
        case "readings":
            parseReadings(msg.data.data);
            break;

        case "stats":
            checkStats(msg.data.data.from, msg.data.data.to);
            break;

        case "list":
            parseDeviceList(msg.data.data);
            break;
    }
};

function checkStats(from, to) {
    if (!readings) return;
    if (to >= readings.length) to = readings.length - 1;

    var min = readings[from],
        max = readings[from],
        ave = readings[from],
        count = 1 + to - from;

    do {
        ave += readings[from];
        if (readings[from] < min) min = readings[from];
        else if (readings[from] > max) max = readings[from];
    } while (++from <= to);

    postMessage({
        type: "stats",
        data: {
            ave: Math.round(ave/count),
            min: min,
            max: max,
            count: count
        }
    });
}

function parseReadings(arr) {
    if (!arr.length) return;

    count = arr.length;

    var values = new Int8Array(count);
    var dates = "";

    for (var i=0; i<count; ++i) {
        values[i] = arr[i].value;
        dates += arr[i].createdAt.substring(0, 10) + "              " +
            arr[i].createdAt.substring(11, 16) + "\n";
    }

    // ensure cached value array is large enough
    if (count >= readings.length) {
        readings = new Int8Array(count);
    }

    // cache reading values
    readings.set(values);

    postMessage({
        type: "readings",
        data: {
            values: values,
            dates: dates
        }
    }, [values.buffer]);

    checkStats(0, count-1);
}

/**
 * get general stats for devices
 * @param {Object[]} data - array of device data objects from api
 */
function parseDeviceList(data) {
    var stats = {
        temperature: {
            devices: [],
            max: 0,
            ave: 0,
            min: 0
        },
        humidity: {
            devices: [],
            max: 0,
            ave: 0,
            min: 0
        },
        airquality: {
            devices: [],
            max: 0,
            ave: 0,
            min: 0
        }
    };
    // group devices by type, normalize values
    for (var i=0, j=data.length; i<j; ++i) {
        stats[data[i].type].devices.push({
            name: data[i].name,
            id: data[i].id,
            value: (data[i].value >>> 0),
            updatedAt: Date.parse(data[i].updatedAt)
        });
    }
    // check min/max/ave values
    checkRange(stats.temperature);
    checkRange(stats.humidity);
    checkRange(stats.airquality);

    postMessage({
        type: "list",
        data: stats
    });
}

/**
 * get min, max, and ave of device values
 * @param {Object} obj
 * @param {Object[]} obj.devices - array of device data objects
 * @param {number} obj.min - lowest value from obj.devices
 * @param {number} obj.max - highest value from obj.devices
 * @param {number} obj.ave - average value
 */
function checkRange(obj) {
    var devices = obj.devices;
    var count = devices.length,
        val, min, max, ave;
    if (count) {
        val = devices[0].value;
        min = val;
        max = val;
        ave = val/count;
        for (var i=1; i<count; ++i) {
            val = devices[i].value;
            ave += (val/count);
            if (val < min) min = val;
            if (val > max) max = val;
        }
        obj.min = min;
        obj.max = max;
        obj.ave = Math.round(ave);
    }
}
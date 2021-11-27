const { InfluxDB, flux } = require("@influxdata/influxdb-client");
const { url, token, org, bucket, timeout } = require("./env");

getCPUUsage = async (startDuration, endDuration) => {
  const queryApi = new InfluxDB({ url, token, timeout }).getQueryApi(org);
  const fluxQuery = flux`from(bucket:"${bucket}") |> range(start: ${startDuration}, stop: ${endDuration}) |> filter(fn: (r) => r._measurement == "cpu") |> filter(fn: (r) => r._field == "usage_user" or r._field == "usage_system" or r._field == "usage_idle") |> filter(fn: (r) => r.cpu == "cpu-total") |> aggregateWindow(every: 1h, fn: last, createEmpty: false) |> last()`;

  const cpuUsageJSON = [];

  await queryApi
    .collectRows(fluxQuery)
    .then((datas) => {
      datas.forEach((data) => {
        cpuUsageJSON.push({
          time: data._time,
          host: data.host,
          measurement: data.cpu,
          usage: (data._value).toFixed(2),
        });
      });
      console.log("\nCPU Usage", cpuUsageJSON.length);
    })
    .catch((error) => {
      console.error(error);
      console.log("\nError in CPU Usage");
    });
  return cpuUsageJSON;
}

module.exports = {
  getCPUUsage
}
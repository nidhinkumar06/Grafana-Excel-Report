const express = require('express');
const moment = require('moment');
const momentGrafana = require('moment-relativism');
const { fluxDuration } = require("@influxdata/influxdb-client");
const { METRIC_HEADERS } = require('./constants');
const { getCPUUsage } = require("./cpuUsage");
const { generateWorkBook } = require("./generateWorkBook");

const app = express();

const downloadExcel = async(req, res) => {
  console.log('req body', JSON.stringify(req.body));
  let message = req.query?.message || req.body?.message || 'Hello World!';
  let startDuration;
  let endDuration;
  let fromDate;
  let toDate;

  if (req.query.from.includes('now')) {
    const from = req.query.from;
    const start = momentGrafana.relativism(from.replace('/', '|'));
    const end = momentGrafana.relativism(req.query.to);
    
    startDuration = moment.utc(start).unix();
    endDuration = moment.utc(end).unix();
      
    fromDate = moment(start).format('YYYY-MM-DDTHH:mm:ss');
    toDate = moment(end).format('YYYY-MM-DDTHH:mm:ss');
  } else {
    startDuration = moment.utc(parseInt(req.query.from)).unix();
    endDuration = moment.utc(parseInt(req.query.to)).unix();
    fromDate = parseInt(req.query.from);
    toDate = parseInt(req.query.to);
  }
  
  const cpuUsageData = await getCPUUsage(startDuration, endDuration);

  const workBookDatas = [
    { sheet_name: 'CPU Usage', sheet_data: cpuUsageData, column_name: METRIC_HEADERS }
  ];

  generateWorkBook(res, workBookDatas);
};

app.get('/excelreport', downloadExcel);

app.listen(3333);
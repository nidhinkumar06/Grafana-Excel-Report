const Excel = require("exceljs");


generateWorkBook = (res, workBookDatas) => {
  var workbook = new Excel.Workbook();

  /** CPU Usage Sheet */

  var cpuUsageSheet = workbook.addWorksheet('CPU USAGE');

  //Excel Setup
  var cpuHeadingRow = cpuUsageSheet.addRow();
  var cpuColumns = workBookDatas[0].column_name;
  var cpuDatas = workBookDatas[0].sheet_data;

  //setting header
  for (let i = 0; i < cpuColumns.length; i++) {
    let currentColumnWidth = cpuColumns[i].width;
    cpuUsageSheet.getColumn(i + 1).width = currentColumnWidth;
    let cell = cpuHeadingRow.getCell(i + 1);
    cell.value = cpuColumns[i].header;
  }

  //setting values
  for (let i = 0; i < cpuDatas.length; i++) {
    var cpuData = cpuUsageSheet.addRow();

    for (let j = 0; j < 4; j++) {
      cpuData.getCell(1).value =  cpuDatas[i].time;
      cpuData.getCell(2).value =  cpuDatas[i].host;
      cpuData.getCell(3).value =  cpuDatas[i].measurement;
      cpuData.getCell(4).value =  cpuDatas[i].usage;
    }
  }
  
  /** Creating workbook */

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader(
    "Content-Disposition",
    "attachment; filename=" + `SystemMetric-${Date.now()}.xlsx`
  );

  return workbook.xlsx.write(res).then(function (result) {
    console.log("excel downloaded successfully");
    res.status(200).end();
  });
};

module.exports = {
  generateWorkBook,
};
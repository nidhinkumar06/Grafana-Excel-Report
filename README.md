<img src="https://user-images.githubusercontent.com/10459220/143685379-1661627c-0e33-4a95-b106-46ce6f17820f.png" alt="GrafanaExcelDownload" title="GrafanaExcelDownload" align="right" height="250" width="250"/>

# Grafana Excel Report Download

In Grafana OSS(Open Source) we can’t download the reports in PDF or Excel format. but there are few plugins available for PDF which would take a snapshot of the panels.
But to download the report as excel we don’t have any option all we have is to download panel data as CSV.

## About

In this PoC we are going to download the data in excel format using Node.js application with Grafana.

## Architecture

<div align="center">
<img src="https://user-images.githubusercontent.com/10459220/143689380-c7eebf64-424f-4367-b937-1cb3b554a3bd.gif" alt="GrafanaExcel" height="400">
</div>


1. User clicks the download report from Grafana
2. Once the user clicks the download it will call the Node.js application which will collect the parameters dates from Grafana
3. Once the request is received it will trigger the InfluxDB with the flux query to collect the necessary system metrics
4. Once the data is received from InfluxDB it is converted into excel format and downloaded

### Stack used for developing

* InfluxDB - Timeseries Database which stores the information collected by Telegraf
* NodeJS - To process the data collected from InfluxDB and download it as Excel report

## Get Started

Follow the below steps to complete all the installation process

1. Clone the repository at first
2. Once cloned do `npm install`
3. Once the necessary packages are installed, Add the InfluxDB credentials to `env.js` file.
4. Once the credentials are added run the node application using the command `node index.js` or `npm run start`
5. Now copy the url along with the port number `http://localhost:3333/excelreport`
6. Now open your local Grafana server and click Settings -> Link
7. Now click `Create Link` and add the details like below

<img src="https://user-images.githubusercontent.com/10459220/143689688-0e27899a-0f2b-471b-b546-c5d328e5a3db.png" alt="GrafanaLink" height="400">

8. Save your dashboard and go ahead and click the Download Excel button

## Demo

https://user-images.githubusercontent.com/10459220/143689743-3b0fb4c3-9799-450b-a3d6-551512c073d6.mp4


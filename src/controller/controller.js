const db = require("../database/model");
const puppeteer = require("puppeteer");
const { blobUpload } = require("../../blobStorage");
const moment = require("moment");


const createTemplate = async (req, res) => {
  try {
    const { html, isImage } = req.body
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

      await page.setViewport({ width: 900, height: 1100 }); // Adjust the width and height as needed
      await page.setContent(html);
      const screenshotBuffer = await page.screenshot();
      const filename = `image-${id}.png`;
      const data = await blobUpload(filename, screenshotBuffer);
      const body = {
        html,
        template : data.blobUrl,
        isImage
      }
    const createData = await db.create(body);
    res.json({ status: true, data : createData });
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
};
const getAlltemplate = async (req, res) => {
  const data = await db.findAll({
    attributes: ["id", "template", "isImage"],
    raw: true,
  });

  const response = []
  for(let obj of data){
    if(obj.isImage === 1){
        obj["showImage"]  = true
    }else if(obj.isImage === 0){
        obj["showImage"] = false
    }
    response.push(obj)
  }

  res.json({ status: true, data : response });
};

const downloadImageBiodata = async (req, res) => {
  try {
    const {
      id,
      name,
      fathersName,
      mothersName,
      caste,
      gothra,
      complexion,
      height,
      dob,
      education,
      hobby,
      occupation,
      address,
      contactNumber,
    } = req.body;

    console.log(req.body, "id", id, req.file.buffer.toString("base64"))
    const { html } = await db.findOne({
      where: { id },
      attributes: ["html"],
      raw: true,
    });
    console.log("html from db", html);
    const modifiedHtml = html
      .replace("${name}", name)
      .replace("${fathersName}", fathersName)
      .replace("${mothersName}", mothersName)
      .replace("${caste}", caste)
      .replace("${gothra}", gothra)
      .replace("${complexion}", complexion)
      .replace("${height}", height)
      .replace("${dob}", moment(dob).format('DD MMM YYYY'))
      .replace("${education}", education)
      .replace("${hobby}", hobby)
      .replace("${occupation}", occupation)
      .replace("${address}", address)
      .replace("${contactNumber}", contactNumber)
      .replace("${imagefile}", req.file.buffer.toString("base64"))

    console.log("modified Html", modifiedHtml);

    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setContent(modifiedHtml);
    const pdfBuffer = await page.pdf({
      path: `biodata_${name}_.pdf`,
      format: "A4",
      printBackground: true, // Enable background printing
      background: "#00008B", // Set the desired background color
    });
    await browser.close();
    res.contentType("application/pdf");
    res.send(pdfBuffer);
  } catch (err) {
    console.log(err);
  }
};

const downloadBiodata = async (req, res) => {
    try {
      const {
        id,
        name,
        fathersName,
        mothersName,
        caste,
        gothra,
        complexion,
        height,
        dob,
        education,
        hobby,
        occupation,
        address,
        contactNumber,
      } = req.body;
  
      const { html } = await db.findOne({
        where: { id },
        attributes: ["html"],
        raw: true,
      });
      console.log("html from db", html);
      const modifiedHtml = html
        .replace("${name}", name)
        .replace("${fathersName}", fathersName)
        .replace("${mothersName}", mothersName)
        .replace("${caste}", caste)
        .replace("${gothra}", gothra)
        .replace("${complexion}", complexion)
        .replace("${height}", height)
        .replace("${dob}", `${moment(dob).format('DD MMM YYYY')}`)
        .replace("${education}", education)
        .replace("${hobby}", hobby)
        .replace("${occupation}", occupation)
        .replace("${address}", address)
        .replace("${contactNumber}", contactNumber)
  
      console.log("modified Html", modifiedHtml);
  
      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      await page.setContent(modifiedHtml);
      const pdfBuffer = await page.pdf({
        path: `biodata_${name}_.pdf`,
        format: "A4",
        printBackground: true, // Enable background printing
        background: "#00008B", // Set the desired background color
      });
      await browser.close();
      res.contentType("application/pdf");
      res.send(pdfBuffer);
    } catch (err) {
      console.log(err);
    }
  };
  
const sampleBioData = async (req, res) => {
  try {
    const images = [];
    const templates = await db.findAll()
    for (const entry of templates) {

      images.push({
        id: entry.id,
        blobUrl: entry.template,
      });
    }

    await browser.close();
  } catch (err) {
    console.log(err);
    res.json(err.message);
  }
};

module.exports = { createTemplate, getAlltemplate, downloadImageBiodata,downloadBiodata, sampleBioData };

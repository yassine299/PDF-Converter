const puppeteer = require('puppeteer');
const express = require("express");
const app = express();
const path = require("path");


// Function that convert website to pdf file
function convert(url) {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        // Navigates to the website
        await page.goto(url);

        // Generates a PDF from the page content
        await page.pdf({ path: 'overview.pdf' });
        console.log("website got Converted")
        await browser.close();
    })();
}

// Display the pdf file
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "overview.pdf"));
})

//convert the website to pdf
app.get("/Convert/:linkID", (req, res) => {
  //  res.send("converted page");
    const { linkID } = req.params;
    console.log("website its converting..... visit...."+" http://localhost:4000/")
    res.send("website its converting..... visit...."+" http://localhost:4000/")
    convert("https://" + linkID);
})

//start the server
app.listen(4000, () => {
    console.log("server is up runing port :4000 ")
})
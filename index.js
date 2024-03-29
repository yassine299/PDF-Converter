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
//Home page
app.get("/",(req,res)=>{
  res.sendFile(path.resolve(__dirname, "index.html"));
})

// Display the pdf file
app.get("/Convert", (req, res) => {
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



/*
const puppeteer = require('puppeteer');
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.goto("https://www.Youtube.com/");
  if (!fs.existsSync("screenshots")) {
    fs.mkdirSync("screenshots");
  }
  //if you want to specifay what to scrrenshot use code below
  //await page.waitForSelector('#heading-section > div.right-side.heading-box.col > div > ul > div.ss-wrapper > div');          // wait for the selector to load
  // const element = await page.$('#heading-section > div.right-side.heading-box.col > div > ul > div.ss-wrapper > div');

  await page.screenshot({ path: 'screenshots/screenshot.png' });
  console.log("its Done !!");
  await browser.close();
})();


// require fs and puppeteer
const fs = require("fs");
const puppeteer = require("puppeteer");

async function captureScreenshot() {
  // if screenshots directory is not exist then create one
  if (!fs.existsSync("screenshots")) {
    fs.mkdirSync("screenshots");
  }

  let browser = null;

  try {
    // launch headless Chromium browser
    browser = await puppeteer.launch({ headless: true });

    // create new page object
    const page = await browser.newPage();

    // set viewport width and height
    await page.setViewport({ width: 1440, height: 1080 });

    await page.goto("https://github.com/sagar-gavhane");

    // capture screenshot and store it into screenshots directory.
    await page.screenshot({ path: `screenshots/github-profile.jpeg` });
  } catch (err) {
    console.log(`❌ Error: ${err.message}`);
  } finally {
    await browser.close();
    console.log(`\n🎉 GitHub profile screenshots captured.`);
  }
}

captureScreenshot();
*/
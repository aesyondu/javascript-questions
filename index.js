const path = require("path")
const { firefox } = require("playwright-firefox");
const { chromium } = require("playwright-chromium");
const { webkit } = require("playwright-webkit");

(async () => {
    // const browser = await firefox.launch({ headless: false })
    // const browser = await chromium.launch({ headless: false })
    const browser = await webkit.launch({ headless: false })
    const context = await browser.newContext()
    context.setDefaultTimeout(9999999)
    const page = await context.newPage()

    await page.goto(`file:${path.join(__dirname, "index.html")}`) // 2. firefox not resolving page.goto file:
    console.log("FIREFOX not outputting this")

    const question = await page.$("h6[id^='1']")
    // await question.scrollIntoViewIfNeeded() // NOT WORKING since already ratio == 1, ARGHH!
    const {x: xStart, y: yStart, width: widthStart} = await question.boundingBox()

    const limit = await page.$("h6[id^='2']")
    const {x: xEnd, y: yEnd} = await limit.boundingBox()

    // await page.$eval("h6[id^='1']", (node, y) => {
    //     window.scrollTo(0, y)
    // }, yStart)

    const heightCalc = yEnd - yStart
    const heightCalc2 = (yEnd - yStart) * 2
    console.log(yStart, yEnd, heightCalc)
    await page.screenshot({
        clip: {
            x: xStart,
            y: yStart,
            width: widthStart,
            height: 1000, // 2. chromium and webkit not using the height here
        },
        // path: "./chromium.png",
        path: "./webkit.png",
    })
    console.log("FINISH")
    await browser.close()
})()

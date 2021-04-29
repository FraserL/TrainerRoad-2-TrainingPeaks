const puppeteer = require('puppeteer');
const fs = require('fs');
const { parseTR } = require("./parseTR");
const { addTP } = require('./addTP');
const config = require('./config');

const { TRinput: { user, pass, startDate, endDate } } = config;

(async () => {

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    //log in to TrainerRoad
    await page.goto('https://www.trainerroad.com/app/login')
    await page.type('input[name="Username"]', user)
    await page.type('input[name="Password"]', pass)
    await page.click('[type="submit"]')


    //wait for it load then navigate to Calendar -might not be needed?
    await page.waitForNavigation()
    await page.goto(`https://www.trainerroad.com/app/career/${user.toLowerCase()}/calendar`)
    await page.waitForSelector('.calendar__day--inner', {
        visible: true,
    });

    //get workouts from these dates
    await page.goto(`https://www.trainerroad.com/app/api/calendar/activities/${user.toLowerCase()}?startDate=${startDate}&endDate=${endDate}`)
    await page.content(); 
    innerText = await page.evaluate(() =>  {
        return JSON.parse(document.querySelector("body").innerText); 
    }); 

    //tidy up the returned workouts
    let json = await parseTR(innerText)

    await browser.close();
    
    await addTP(json)

})();


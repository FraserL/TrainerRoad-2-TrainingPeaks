const puppeteer = require('puppeteer');
const config = require('./config');

const { TPinput: { user, pass } } = config;

async function addTP(json) {

    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();

    //log into TrainingPeaks
    await page.goto('https://home.trainingpeaks.com/login')
    await page.type('input[name="Username"]', user)
    await page.type('input[name="Password"]', pass)
    await page.click('[type="submit"]')

    //wait for it to load fully
    await page.waitForNavigation(),
    await page.waitForSelector(".addWorkout")

    //add each activity
    for (let i = 0; i < json.length; ++i) {

        //select date with picker
        const selectorMonth = parseInt(json[i].date[5].toString() + json[i].date[6].toString()) - 1
        const selectorDay = json[i].date[8].toString() + json[i].date[9].toString()
        
        await page.click(`.datePicker`)
        await page.waitForSelector('.ui-datepicker-title')
        await page.select('[class="ui-datepicker-month"]', selectorMonth.toString())
        await page.evaluate((selectorDay) => {
            [...document.querySelectorAll('.ui-state-default')].find(element => element.textContent === selectorDay).click();
            }, selectorDay.replace(/^0+/, '')); 
    
        //click add workout
        await page.$eval(`[data-date="${json[i].date}"] .addWorkout`, (elem) => elem.click());
        
        //on popup load, click bicycle
        await page.$eval(`[class="addItemButton addWorkout Bike future"] .workoutTitle`, (elem) => elem.click());

        //wait for details popup
        await page.waitForSelector('[class="input-wrapper"]')

        //fill in popup
        await page.type('input[placeholder="Untitled Workout"]', `${json[i].name}`)
        await page.type('#totalTimePlannedField', `${json[i].duration}`)
        await page.type('#tssPlannedField', `${json[i].tss}`)
        await page.click('#descriptionInput')
        await page.evaluate((activity) => {
            let dom = document.querySelector('#descriptionInput');
            dom.innerHTML = `${activity.description}`
            }, json[i]);
        await page.click('#descriptionInput', { clickCount: 2 })
        await page.click('button[id="close"]')
        console.log(json[i].name + ' ' + 'added')
        console.log('------------------')
        
    }

    await browser.close();

}

exports.addTP = addTP
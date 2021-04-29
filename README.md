# TrainerRoad 2 TrainingPeaks
 Puppeteer script that logs into TrainerRoad, pulls the workouts on your Calendar between the specified dates and adds them to TrainingPeaks

This script replicates the action of you logging into TrainerRoad and copy/pasting the details (name, tss, duration, description) of each workout. It doesn't add the actual workout as that would definitely break some T&Cs. *You will need a TrainerRoad subscription and (I think) a TrainingPeaks premium account*

## How to

To run this you will need to install Node and NPM.

Once you have those installed, clone this repo, change into that directory and run ```npm install```. You should now have the required dependencies.

Open the config.js file and change the the placeholder credentionals to yours. The start and end date is important as only the workouts in that range will be pulled.

Once that is saved, return to the terminal and run ```npm start``` - you should see a chromium browser open, don't click or do anything - just let it run.

*Note: TrainingPeaks may have a Captcha on login (I ran this about 20 times and only had it once) you can either manually complete the Captcha, or close the browser and run it again.*

**Note2: I'm not a developer, I just hacked this together. I'll do my best to help fix things but I can't promise anything.**

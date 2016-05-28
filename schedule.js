const moment = require('moment');

module.exports = {
  calculateTimeOfNextBlast(waterInfo, waterGoal) {
    const currentAmountDrank = waterInfo.summary.water;
    const target = waterGoal.goal.goal;
    const percentageOfGoal = currentAmountDrank / target * 100;
    const percentageOfDay = moment().hour() / 24 * 100;

    console.log("Goal percentage", percentageOfGoal);
    console.log("Day percenage", percentageOfDay);
  }
}

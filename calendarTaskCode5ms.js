console.time();
var array = [
  {
    name: "Betty",
    meetings: [
      {
        startTime: "2021-03-10T08:55:39+00:00",
        endTime: "2021-03-10T09:15:39+00:00",
        subject: "Meeting 1",
      },
      {
        startTime: "2021-03-10T09:55:39+00:00",
        endTime: "2021-03-10T10:15:39+00:00",
        subject: "Meeting 2",
      },
      {
        startTime: "2021-03-10T11:55:39+00:00",
        endTime: "2021-03-10T12:15:39+00:00",
        subject: "Meeting 3",
      },
    ],
  },
  {
    name: "John",
    meetings: [
      {
        startTime: "2021-03-10T08:15:39+00:00",
        endTime: "2021-03-10T09:55:39+00:00",
        subject: "Meeting a",
      },
      {
        startTime: "2021-03-10T10:15:39+00:00",
        endTime: "2021-03-10T10:55:39+00:00",
        subject: "Meeting b",
      },
      {
        startTime: "2021-03-10T11:15:39+00:00",
        endTime: "2021-03-10T12:55:39+00:00",
        subject: "Meeting c",
      },
      {
        startTime: "2021-03-10T14:15:39+00:00",
        endTime: "2021-03-10T16:55:39+00:00",
        subject: "Meeting d",
      },
    ],
  },

  {
    name: "zaza",
    meetings: [
      {
        startTime: "2021-03-10T08:35:39+00:00",
        endTime: "2021-03-10T14:55:39+00:00",
        subject: "Meeting az",
      },
      {
        startTime: "2021-03-10T15:15:39+00:00",
        endTime: "2021-03-10T16:55:39+00:00",
        subject: "Meeting bz",
      },
      {
        startTime: "2021-03-10T17:15:39+00:00",
        endTime: "2021-03-10T17:20:39+00:00",
        subject: "Meeting cz",
      },
    ],
  },
  /*
  {
    name: "michael",
    meetings: [
      {
        startTime: "2021-03-10T07:55:39+00:00",
        endTime: "2021-03-10T08:00:39+00:00",
        subject: "Meeting 1",
      },
      {
        startTime: "2021-03-10T08:55:39+00:00",
        endTime: "2021-03-10T09:00:39+00:00",
        subject: "Meeting 2",
      },
      {
        startTime: "2021-03-10T17:40:39+00:00",
        endTime: "2021-03-10T17:50:39+00:00",
        subject: "Meeting 3",
      },
    ],
  },
  */
];
//code is written for n calendars and N meeting in each calendar
var initTwoDimentionalArray = function (arrName, calendarNumber) {
  for (i = 0; i < calendarNumber; i++) {
    arrName[i] = [];
  }
};
function pairsMaxMin(timePairs) {
  let newArray = [];
  initTwoDimentionalArray(newArray, timePairs.length - 1);
  for (i = 0; i < timePairs.length - 1; i++) {
    var ind = 0;
    for (n = 0; n < timePairs[i].length; n = n + 2) {
      for (k = 0; k < timePairs[i + 1].length; k = k + 2) {
        a = Math.max(timePairs[i][n], timePairs[i + 1][k]);
        b = Math.min(timePairs[i][n + 1], timePairs[i + 1][k + 1]);
        if (a < b) {
          newArray[i][ind] = a;
          newArray[i][ind + 1] = b;
          ind = ind + 2;
          //break;
        }
      }
    }
  }
  return newArray;
}
const calendarNumber = array.length;
const startOfTheDayMiliSeconds = new Date(
  "2021-03-10T00:00:00+00:00"
).getTime();
const endOfTheDayMiliSeconds = new Date("2021-03-10T23:59:59+00:00").getTime();

var timePairs1 = [];
initTwoDimentionalArray(timePairs1, calendarNumber);
var timePairs = [];
initTwoDimentionalArray(timePairs, calendarNumber);

var counter = 0;
for (i = 0; i < calendarNumber; i++) {
  for (k = 0; k < array[i].meetings.length; k++) {
    timePairs1[i][counter] = array[i].meetings[k].startTime;
    counter++;
    timePairs1[i][counter] = array[i].meetings[k].endTime;
    counter++;
  }
  counter = 0;
}

for (i = 0; i < calendarNumber; i++) {
  for (k = 0; k < timePairs1[i].length; k++) {
    timePairs[i][k] = new Date(timePairs1[i][k]).getTime();
  }
  timePairs[i].unshift(startOfTheDayMiliSeconds);
  timePairs[i].push(endOfTheDayMiliSeconds);
}
//console.log(timePairs);
//// ALGORITHM
/* in the array timePair we've got ,each pair of numbers represent beginning and the end of free time, number of meetings +1 intervals,
now: we take maximum among minimums of corresponding pairs (that is starting point) and
minimum between maximums of the same pair (that is ending point) compare every one of the pairs to each other
where starting point is bigger then ending point, intervals egnored..sorting not nessesery, 0 intervals egnored automativally..*/
var index = 0;
var arrayToIterrate = [];
arrayToIterrate[index] = timePairs;
while (index < calendarNumber - 1) {
  arrayToIterrate[index + 1] = pairsMaxMin(arrayToIterrate[index]);
  index++;
}
var finalArray = arrayToIterrate[index][0];
var freeTimeSlotsDates = [];
initTwoDimentionalArray(freeTimeSlotsDates, finalArray.length);

//console.log(finalArray);
for (i = 0; i < finalArray.length; i++) {
  freeTimeSlotsDates[i] = new Date(finalArray[i]);
}
// to print out the way you want
delete array[0].meetings[0].subject;
var finalTiming = array[0].meetings[0];
for (i = 0; i < freeTimeSlotsDates.length; i = i + 2) {
  finalTiming.startTime = freeTimeSlotsDates[i];
  finalTiming.endTime = freeTimeSlotsDates[i + 1];
  console.log(finalTiming);
}

console.timeEnd();

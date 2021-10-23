console.time();
var calendar = [
  {
    name: "Betty",
    meetings: [
      {
        startTime: "2021-03-10T00:00:09+00:00",
        endTime: "2021-03-10T09:15:39+00:00",
        subject: "Meeting 1",
      },
      {
        startTime: "2021-03-10T09:16:39+00:00",
        endTime: "2021-03-10T10:15:39+00:00",
        subject: "Meeting 2",
      },
      {
        startTime: "2021-03-10T10:16:39+00:00",
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
        endTime: "2021-03-10T17:14:39+00:00",
        subject: "Meeting bz",
      },
      {
        startTime: "2021-03-10T17:15:39+00:00",
        endTime: "2021-03-10T23:59:39+00:00",
        subject: "Meeting cz",
      },
    ],
  },
];
const calendarNumber = calendar.length;
const startOfTheDaySeconds =
  new Date("2021-03-10T00:00:00+00:00").getTime() / 1000;
function toTimesArray(calendar) {
  let index = 0;
  let a = [];
  for (let i in calendar) {
    for (let j in calendar[i].meetings) {
      delete calendar[i].meetings[j].subject;
      for (let k in calendar[i].meetings[j]) {
        a[index] =
          new Date(calendar[i].meetings[j][k]).getTime() / 1000 -
          startOfTheDaySeconds;
        index++;
      }
    }
  }
  return a;
}
let timesArray = toTimesArray(calendar);
console.log(timesArray);
let index = 0;
let sec = 0;
let numbers = [];
while (sec < 86400) {
  for (let i = 0; i < timesArray.length; i = i + 2) {
    if (!(sec >= timesArray[i] && sec <= timesArray[i + 1])) {
      numbers[index] = sec;
    } else {
      index--;
      break;
    }
  }
  index++;
  sec++;
}
console.log(numbers);
let len = numbers.length;
let num = [];
num[0] = 0;
let i = 0;
let k = 2;
while (i < len - 1) {
  if (numbers[i + 1] - numbers[i] > 1) {
    num[k - 1] = numbers[i];
    num[k] = numbers[i + 1];
    k = k + 2;
  }
  i++;
}
num.push(86399);
//console.log(num);
freeTimeSlotsDates = [];
for (i = 0; i < num.length; i++) {
  freeTimeSlotsDates[i] = new Date((num[i] + startOfTheDaySeconds) * 1000);
}
// to print out the way you want
var finalTiming = calendar[0].meetings[0];
for (i = 0; i < freeTimeSlotsDates.length; i = i + 2) {
  finalTiming.startTime = freeTimeSlotsDates[i];
  finalTiming.endTime = freeTimeSlotsDates[i + 1];
  console.log(finalTiming);
}
console.timeEnd();

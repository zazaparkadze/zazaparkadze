const calendar = [
  {
    name: "Betty",
    meetings: [
      {
        startTime: "2021-03-10T00:08:05+00:00",
        endTime: "2021-03-10T09:15:39+00:00",
        subject: "Meeting 1",
      },
      {
        startTime: "2021-03-10T12:55:39+00:00",
        endTime: "2021-03-10T14:15:39+00:00",
        subject: "Meeting 2",
      },
      {
        startTime: "2021-03-10T16:55:39+00:00",
        endTime: "2021-03-10T17:15:39+00:00",
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
        startTime: "2021-03-10T07:15:39+00:00",
        endTime: "2021-03-10T08:59:39+00:00",
        subject: "Meeting c",
      },
    ],
  },
  {
    name: "zaza",
    meetings: [
      {
        startTime: "2021-03-10T08:35:39+00:00",
        endTime: "2021-03-10T09:15:29+00:00",
        subject: "Meeting az",
      },
      {
        startTime: "2021-03-10T15:15:39+00:00",
        endTime: "2021-03-10T16:55:39+00:00",
        subject: "Meeting bz",
      },
      {
        startTime: "2021-03-10T17:15:39+00:00",
        endTime: "2021-03-10T19:59:49+00:00",
        subject: "Meeting cz",
      },
    ],
  },
]; // 38 lines of code
const startOfTheDaySeconds =
  new Date("2021-03-10T00:00:00+00:00").getTime() / 1000;
const endOfTheDaySeconds =
  new Date("2021-03-10T23:59:59+00:00").getTime() / 1000;
let calStartingPoints = calendar.map((item) =>
  item.meetings.map(
    (i) => new Date(i.startTime).getTime() / 1000 - startOfTheDaySeconds
  )
);
let calEndingPoints = calendar.map((item) =>
  item.meetings.map(
    (i) => new Date(i.endTime).getTime() / 1000 - startOfTheDaySeconds
  )
);
let arr = [];
for (let i = 0; i < 86399; i++) {
  arr[i] = i;
}
for (let j = 0; j < calendar.length; j++) {
  for (let i = 0; i < calendar[j].meetings.length; i++) {
    arr = arr.filter(
      (value) =>
        !(value >= calStartingPoints[j][i] && value <= calEndingPoints[j][i])
    );
  }
}
let endingTimes = arr.filter((v, i, a) => a[i + 1] - a[i] > 1);
let startingTimes = arr.filter((v, i, a) => a[i] - a[i - 1] > 1);
startingTimes.unshift(0);
endingTimes.push(86399);
startingTimes = startingTimes.map(
  (value) => new Date((value + startOfTheDaySeconds) * 1000)
);
endingTimes = endingTimes.map(
  (value) => new Date((value + startOfTheDaySeconds) * 1000)
);
let ft = calendar[0].meetings[0]; // ft ="final timing"
for (i = 0; i < endingTimes.length; i++) {
  ft.startTime = startingTimes[i];
  ft.endTime = endingTimes[i];
  ft.subject = "Meeting " + (1 + i);
  console.log(ft);
}

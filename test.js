let timetable = ["8:15-8:30", "16:35-17:00"];

// Function to convert time string (HH:MM) to a Date object for easier comparison
function getTime(dateString) {
  const now = new Date();
  const [hours, minutes] = dateString.split(":");
  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hours,
    minutes
  );
}

// Function to check if current time is within any of the time ranges
function checkTime() {
  const now = new Date();

  let inTimeRange = timetable.some((timeRange) => {
    let [start, end] = timeRange.split("-");
    let startTime = getTime(start);
    let endTime = getTime(end);

    return now >= startTime && now <= endTime;
  });

  if (inTimeRange) {
    console.log("Within specified time range, do something.");
  } else {
    console.log("Outside of specified time range, do something else.");
  }
}

// Check the time every 5 seconds
setInterval(checkTime, 5000);

const currentDate = document.querySelector(".current-date");
const daysElement = document.querySelector(".days");

const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

const date = new Date();
let year = date.getFullYear();
let month = date.getMonth();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function renderCalendar() {
  daysElement.innerHTML = "";
  currentDate.textContent = `${months[month]} ${year}`;

  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0-6
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate(); // current month last date
  const lastDateOfPreviousMonth = new Date(year, month, 0).getDate(); // previous month last date
  const lastDayOfMonth = new Date(
    year,
    month,
    lastDateOfPreviousMonth
  ).getDay(); // weekday (0-6) of last date

  const fragment = document.createDocumentFragment();

  // Previous month trailing days
  for (let i = firstDayOfMonth; i > 0; i--) {
    const prevDayElement = document.createElement("li");
    prevDayElement.className = "day highlighted-days";
    prevDayElement.textContent = lastDateOfPreviousMonth - i + 1;
    fragment.appendChild(prevDayElement);
  }

  // Current month days
  for (let i = 1; i <= lastDateOfMonth; i++) {
    const dayElement = document.createElement("li");
    dayElement.className = "day";
    if (
      i === new Date().getDate() &&
      year === new Date().getFullYear() &&
      month === new Date().getMonth()
    ) {
      dayElement.classList.add("current-day");
    }
    dayElement.textContent = i;
    fragment.appendChild(dayElement);
  }

  // Next month leading days
  for (let i = lastDayOfMonth; i < 6; i++) {
    const nextDayElement = document.createElement("li");
    nextDayElement.className = "day highlighted-days";
    nextDayElement.textContent = i - lastDayOfMonth + 1;
    fragment.appendChild(nextDayElement);
  }

  daysElement.appendChild(fragment);
}

function nextMonth() {
  month++;
  if (month > 11) {
    month = 0;
    year++;
  }
  renderCalendar();
}

function prevMonth() {
  month--;
  if (month < 0) {
    month = 11;
    year--;
  }
  renderCalendar();
}

nextBtn.addEventListener("click", nextMonth);
prevBtn.addEventListener("click", prevMonth);

renderCalendar();

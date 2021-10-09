// import React from "react";

// const state = {
//   days: [
//     {
//       id: 1,
//       name: "Monday",
//       appointments: [1, 2, 3],
//     },
//     {
//       id: 2,
//       name: "Tuesday",
//       appointments: [4, 5],
//     },
//   ],
//   appointments: {
//     1: { id: 1, time: "12pm", interview: null },
//     2: { id: 2, time: "1pm", interview: null },
//     3: {
//       id: 3,
//       time: "2pm",
//       interview: { student: "Archie Cohen", interviewer: 2 },
//     },
//     4: { id: 4, time: "3pm", interview: null },
//     5: {
//       id: 5,
//       time: "4pm",
//       interview: { student: "Chad Takahashi", interviewer: 2 },
//     },
//   },
// };

// const interviewers = {
//   1: {
//     id: 1,
//     name: "Sylvia Palmer",
//     avatar: "https://i.imgur.com/LpaY82x.png",
//   },
//   2: {
//     id: 2,
//     name: "Tori Malcolm",
//     avatar: "https://i.imgur.com/Nmx0Qxo.png",
//   },
// };
export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find((obj) => obj.name === day);
  if (foundDay === undefined) {
    return [];
  }
  // console.log(foundDay);
  const appointments = foundDay.appointments.map(
    (id) => state.appointments[id]
  );
  return appointments;
}

export function getInterview(state, interview) {
  if (!interview || !interview.interviewer) {
    return null;
  }
  const interviewerId = interview.interviewer;
  return {
    student: interview.student,
    interviewer: state.interviewers[interviewerId],
  };
}

export function getInterviewersForDay(state, day) {
  const foundDay = state.days.find((obj) => obj.name === day);
  if (foundDay === undefined) {
    console.log("we are here");
    return [];
  }
  console.log(foundDay);
  const interviewers = foundDay.interviewers.map(
    (id) => state.interviewers[id]
  );
  return interviewers;
}



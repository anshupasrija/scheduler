
export function getAppointmentsForDay(state, day) {
  const foundDay = state.days.find((obj) => obj.name === day);
  if (foundDay === undefined) return [];
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



import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  const getDays = "http://localhost:8001/api/days";
  const getAppointment = "http://localhost:8001/api/appointments";
  const getInterviewers = "http://localhost:8001/api/interviewers";
  useEffect(() => {
    Promise.all([
      axios.get(getDays),
      axios.get(getAppointment),
      axios.get(getInterviewers),
    ]).then((all) => {
      console.log({ all });
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }, // it will make shallow copy of an interview what ever we are passing through the function and update the interview object
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment, // it will update the appoint acc. to the passed id;
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then((data) => {
      if (data.status === 204) {
        const newdays = state.days.map((item) => {
          return item.name === state.day
            ? { ...item, spots: item.spots - 1 }
            : item;
        });
        setState({ ...state, appointments, days: newdays });
      }
    });
  }
  //if we muting object then you call the setstate it do does the job but better to give a new object . if we mutate directly then react engine might not detect a change in the node
  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then((response) => {
        if (response.status === 204) {
          const newdays = state.days.map((item) => {
            return item.name === state.day
              ? { ...item, spots: item.spots + 1 }
              : item;
          });
          setState({ ...state, appointments, days: newdays });
        }
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}

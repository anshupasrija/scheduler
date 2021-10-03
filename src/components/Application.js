import React, { useState, useEffect } from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay,getInterview } from "helpers/selectors";

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers:{}
  });

  const dailyAppointments = getAppointmentsForDay(state,state.day);

  const setDay = (day) => setState({ ...state, day });

  // useEffect(() => {
  //   axios.get("/api/days").then((response) => {
  //     console.log(response.data);
  //     // response.data = [1,2,3]
  //     // Now, we need to update our state so we have {...state, days: [1,2,3]} as the new state
  //     setDays(response.data); // exactly the same as setState({...state, days: response.data})
  //   });
  // }, []);

  // const setDays = (days) => { //days = response.data
  //   //... your code here ...
  //   // setState({ ...state, days }); // setState({...state, days: response.data})
  //   setState(prev => ({ ...prev, days })); // prev refers to the immediate previous state
  // };

  const getDays = "http://localhost:8001/api/days";
  const getAppointment = "http://localhost:8001/api/appointments";
  const getInterviewers = "http://localhost:8001/api/interviewers";
  useEffect(() => {
    Promise.all([
      axios.get(getDays),
      axios.get(getAppointment),
      axios.get(getInterviewers),
    ]).then((all) => {
      console.log({all});
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  },[]);


  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}

        {dailyAppointments.map((appointment) => {
        const interview = getInterview(state,appointment.interview);
        return(
          <Appointment
            key={appointment.id}
            id={appointment.id}
            time={appointment.time}
            interview={interview}
          />
        )})}
      </section>
    </main>
  );
}

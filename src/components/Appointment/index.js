import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"
  const SAVING = "SAVING"
  const DELETING = "DELETING";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  function onSave(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(SAVING);
    props.bookInterview(props.id, interview).then(() => transition(SHOW));
  }

  function delete() {

    props.cancelInterview(props.id).then(() => transition(EMPTY));

  }


  return (
    <article className="appointment">
      <Header time={props.time} />
      {/* {props.interview ? (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer.name}/>) : (<Empty />)} */}
       {mode === EMPTY && <Empty onAdd={() => transition(CREATE)}  />}
       {mode === SHOW &&  (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode=== CREATE && (<Form interviewers = {props.interviewers} onCancel= {back} onSave ={onSave}/>)}
      {mode===SAVING && (<Status message={'SAVING'}/>)}
      {mode === DELETING && <Status message="Deleting" />}
    </article>
  );
}

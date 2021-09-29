
import React from 'react'
import "./InterviewerListItem.scss";
import classNames from "classnames"; 

export default function InterviewerListItem(props) {
  console.log("props from interview",props)
  const {name,avatar}=props;

  const itemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (   
    <ul>
      <li className={itemClass}
         onClick={props.setInterviewer}>
        <img
          className="interviewers__item-image"
          src={avatar}
          alt={name}          
        />
       {name}
      </li>
    </ul>
  );
}



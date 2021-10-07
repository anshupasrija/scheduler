import { useState } from 'react';

// Every time we add a mode to our history it goes to the top of the stack, this means to transition back to the previous mode, all we need to do is remove the last item from the stack, and then setMode with the last item in the array.

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);



  const transition = (newMode,replace=false)=>{
    if(!replace){
    setHistory((prev)=>[...prev,newMode])  // setting the history, prev is getting the mode value
    setMode(newMode);     
     // This feature will require the addition of a replace argument on the transition function. When replace is true then set the history to reflect that we are replacing the current mode.        
    } else{
      setMode(newMode);
    } 
  }
  const back= ()=>{
    // history =[1,2,3]   
    if(history.length>1) {      
    const newHistory=history.slice(0,history.length-1);
    setMode (newHistory[newHistory.length -1]);
    setHistory(newHistory);
  }
}


  return { mode,transition,back };
}
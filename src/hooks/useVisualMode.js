import { useState } from 'react';

// Every time we add a mode to our history it goes to the top of the stack, this means to transition back to the previous mode, all we need to do is remove the last item from the stack, and then setMode with the last item in the array.

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (newMode,replace=false)=>{

    setHistory((prev)=>[...prev,newMode])  // setting the history, prev is getting the mode value
    setMode(newMode);    
  }
  const back= ()=>{
    // history =[1,2,3]   
    if(history.length>1) {
    history.pop();
    setMode (history[history.length-1]);
    setHistory((prev)=>[...prev]) 
  }
}


  return { mode,transition,back };
}
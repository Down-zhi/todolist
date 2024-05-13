import { useState } from "react";


export function Filter(){
    const[state,setState]=useState();
    function handlealltodo(){}
    function handleactivetodo(){}
    function handlecompltetodo(){}
    return (
        <div class="buts">
      <button id="reset" className="button" onClick={handlealltodo}>All</button>
      <button id="active" className="button2" onClick={handleactivetodo}>Active</button>
      <button id="Completed" className="button3" onClick={handlecompltetodo}>Completed</button>
    </div>
 )
}
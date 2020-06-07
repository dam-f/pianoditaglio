import React from "react";
import Misura from "./Misura";

function creaComponenteMisura(mis) {
  return <Misura numStecche={mis[0]} misuraStecca={mis[1]} />;
}

function Ordine(props) {
  if (props.ordine) {
    return (
      <div className="bg-white pa2 br4 pb4 bb bw2">
        {props.ordine.map(creaComponenteMisura)}
      </div>
    );
  } else {
    return(
      <div>

      </div>
    )
  }
  
}

export default Ordine;

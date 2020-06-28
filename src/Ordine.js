import React from "react";
import Misura from "./Misura";

let idMisOrd = 0;

function creaComponenteMisura(mis) {
  idMisOrd++;
  return <Misura numStecche={mis[0]} misuraStecca={mis[1]} key={"misOrd"+idMisOrd}/>;
}

function Ordine(props) {
  if (props.ordine && props.ordine.length>0) {
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

import React from "react";

//[ 93, "barre tagliate così: ",[199.2,199.2,139.2,109.2]," con scarto: ",3.2000000000000455]

function MisuraPiano(props) {

  function ottimizzaVisualizzazioneTagli(tagli) {
    let newArrOttimizzata = [];
    for (let i = 0; i < tagli.length; i++) {
      let nonCeAncora = true;
      for (let j = 0; j < newArrOttimizzata.length; j++) {
        if (tagli[i] === newArrOttimizzata[j][0]) {
          nonCeAncora = false;
          newArrOttimizzata[j][2]++;
        } 
      }
      if (nonCeAncora) {
        newArrOttimizzata.push([tagli[i],"cm. x",1]);
      }/* 
      if (newArrOttimizzata.indexOf(tagli[i] === -1) {
        newArrOttimizzata.push([tagli[i]," x ",1]);
      } else {
        newArrOttimizzata.indexOf(tagli[i])
      } */
    }
    //[[50," x ",2],[35," x ",3],[27," x ",1],]
    return newArrOttimizzata.map(el => el.join(" "));
  }

  return (
    <div className="bb b--black-30 pl3 flex justify-between pr3 items-center">
      <p>
        - <strong>{props.combPiano[0]}</strong> barre tagliate così:{" "}
        <strong>{ottimizzaVisualizzazioneTagli(props.combPiano[2]).join(" - ")}</strong>
        <br />
        (scarto {Math.round(props.combPiano[4] * 100 + Number.EPSILON) /
          100}{" "}
        cm)
      </p>
    </div>
  );
}

export default MisuraPiano;

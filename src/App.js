import React, { useState } from "react";
import Ordine from "./Ordine";
//import Opzioni from "./Opzioni";
import Pianoditaglio from "./Pianoditaglio";

//AGGIUNGERE GESTIONE SFRIDI

function App() {
  //VARIABILI CONTROLLATE NELLO STATE

  const [teloCorrente, setTeloCorrente] = useState({
    steccheCorrente: "",
    misuraCorrente: ""
  });

  const [ordineSandbox, setOrdine] = useState([]/*[
    [186, 199.2],
    [714, 139.2],
    [248, 119.2],
    [186, 109.2],
    [280, 89.2]
  ]*/);

  const [
    pianoDiTaglioDaRenderizzare,
    setPiano
  ] = useState();

  const [sfridi, setSfridi] = useState([]);

  const [profilo, setProfilo] = useState("AL/1");

  const [opzioni, setOpzioni] = useState({
    maxScarto: 25,
    minSfrido: 65,
    larghezzaLama: 0.5,
    mode: "menoScarto"
  });

  const [descMode, setDescMode] = useState("Criteri da usare per il calcolo del piano");


  const [pianoRef, setPianoRef] = useState([])

  //FUNZIONI PER CAMBIARE LE VARIABILI NELLO STATO

  function impostaOpzioni(event) {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setOpzioni(prevValue => {
      if (inputName === "opzioneScarto") {
        return {
          maxScarto: newValue,
          minSfrido: prevValue.minSfrido,
          larghezzaLama: prevValue.larghezzaLama,
          mode: prevValue.mode
        };
      } else if (inputName === "opzioneSfrido") {
        return {
          maxScarto: prevValue.maxScarto,
          minSfrido: newValue,
          larghezzaLama: prevValue.larghezzaLama,
          mode: prevValue.mode
        };
      } else if (inputName === "opzioneLama") {
        return {
          maxScarto: prevValue.maxScarto,
          minSfrido: prevValue.minSfrido,
          larghezzaLama: newValue,
          mode: prevValue.mode
        };
      }
    });
  }

  function impostaProfilo(event) {
    const newValue = event.target.value;
    if (newValue === "AL/1") {
      setProfilo("AL/1");
    } else if (newValue === "AC/6") {
      setProfilo("AC/6");
    } else if (newValue === "AL/2HD") {
      setProfilo("AL/2HD");
    } else if (newValue === "AL/2") {
      setProfilo("AL/2");
    }
  }

  function impostaMode(event) {
    const newValue = event.target.value;
    setOpzioni(prevValue => {
        return {
            maxScarto: prevValue.maxScarto,
            minSfrido: prevValue.minSfrido,
            larghezzaLama: prevValue.larghezzaLama,
            mode: newValue
          };
      });
    if (newValue === "menoBarre") {
      setDescMode("Usa meno barre possibili senza preoccuparsi dello scarto")
      setOpzioni(prevValue => {
        return {
        maxScarto: 650,
        minSfrido: 0,
        larghezzaLama: prevValue.larghezzaLama,
        mode: newValue
        }
      });
      //aggiungere set opzioni per cambiare i valori di max scarto e min scarto
    } else if (newValue === "acra") {
      setDescMode("Calcola solo le barre necessarie senza creare combinazioni di misura sulla stessa barra")
      setOpzioni(prevValue => {
        return {
        maxScarto: 30,
        minSfrido: 65,
        larghezzaLama: prevValue.larghezzaLama,
        mode: newValue
        }
      });
    } else if (newValue === "menoScarto") {
      setDescMode("Crea un piano di taglio che produca il minor scarto possibile")
      setOpzioni(prevValue => {
        return {
        maxScarto: 25,
        minSfrido: 65,
        larghezzaLama: prevValue.larghezzaLama,
        mode: newValue
        }
      });
    }
  }

  



  function impostaMisuraCorrente(event) {
    const newValue = event.target.value;
    const inputName = event.target.name;
    setTeloCorrente(prevValue => {
      if (inputName === "numStecche") {
        return {
          steccheCorrente: newValue,
          misuraCorrente: prevValue.misuraCorrente
        };
      } else if (inputName === "misura") {
        return {
          steccheCorrente: prevValue.steccheCorrente,
          misuraCorrente: newValue
        };
      }
    });
  }

  function aggiungiMisuraCorrente(event) {
    event.preventDefault();
    setOrdine(prevValue => {
      if (
        teloCorrente.steccheCorrente &&
        teloCorrente.misuraCorrente &&
        (teloCorrente.steccheCorrente > 0 && teloCorrente.misuraCorrente > 0)
      ) {
        // const st = Number()
        return [
          ...prevValue,
          [
            Number(teloCorrente.steccheCorrente),
            Number(teloCorrente.misuraCorrente)
          ]
        ];
      } else {
        return prevValue;
      }
    });
    setTeloCorrente({
      steccheCorrente: "",
      misuraCorrente: ""
    });
  }


  function aggiungiPianoEsempio(event) {
    const newValue = event.target.value;
    if (newValue === "sample1") {
      setOrdine([
        [182, 199.2],
        [699, 139.2],
        [235, 119.2],
        [156, 109.2],
        [273, 89.2]
      ]);
      setPianoRef(<div className="h1 green"><strong className="tc black">REFERENCE SAMPLE 1 - versione 0.3 - 18.929 iterazioni</strong><p></p><p><Pianoditaglio 
        piano={[["Barre utilizzate: ",317,"Scarto totale: ",3413.6000000000013,"Meno scarto possibile"],[91,"barre tagliate così: ",[199.2,199.2,139.2,109.2]," con scarto: ",3.2000000000000455],[152,"barre tagliate così: ",[139.2,139.2,139.2,139.2,89.2]," con scarto: ",4],[60,"barre tagliate così: ",[119.2,119.2,119.2,109.2,89.2,89.2]," con scarto: ",4.7999999999999545],[2,"barre tagliate così: ",[119.2,119.2,119.2,109.2,109.2]," con scarto: ",74],[12,"barre tagliate così: ",[119.2,119.2,119.2,119.2]," con scarto: ",173.2],"(SOLUZ. TEMPORANEA) Infine taglia queste stecche dagli sfridi o da una nuova barra (se sono molte puoi calcolare un nuovo piano di taglio) :",[["-",1,"x",89.2],["-",1,"x",109.2],["-",3,"x",119.2]]]}
        profilo="AL/1"
        mode="menoScarto"
         />
        </p>
        </div>
        )
    } else if (newValue === "sample2") {
      setOrdine([
        [48, 196.7],
        [32, 135.8],
        [37, 81.2],
        [48, 68.2],
        [32, 62.2],
        [37, 48.7]
      ]);
      setPianoRef(<div className="h1 green"><strong className="tc black">REFERENCE SAMPLE 2 - versione 0.3 - 8.940.344 iterazioni</strong><p></p><p><Pianoditaglio 
        piano={[["Barre utilizzate: ",35,"Scarto totale: ",118.59999999999741,"Meno scarto possibile"],[16,"barre tagliate così: ",[196.7,135.8,135.8,62.2,48.7,68.2]," con scarto: ",2.599999999999909],[10,"barre tagliate così: ",[196.7,196.7,68.2,68.2,48.7,68.2]," con scarto: ",3.2999999999999545],[8,"barre tagliate così: ",[81.2,81.2,196.7,81.2,62.2,62.2,81.2]," con scarto: ",4.099999999999909],[1,"barre tagliate così: ",[196.7,196.7,48.7,196.7]," con scarto: ",11.200000000000045],[0,"barre tagliate così: ",[81.2,81.2,81.2,81.2,81.2,48.7,48.7,48.7,81.2]," con scarto: ",16.699999999999932],[0,"barre tagliate così: ",[48.7,48.7,48.7,48.7,48.7,48.7,48.7,48.7,48.7,48.7,48.7]," con scarto: ",114.30000000000007],"(SOLUZ. TEMPORANEA) Infine taglia queste stecche dagli sfridi o da una nuova barra (se sono molte puoi calcolare un nuovo piano di taglio) :",[["-",1,"x",68.2],["-",2,"x",196.7],["-",1,"x",81.2],["-",1,"x",48.7]]]}
        profilo="AL/1"
        mode="menoScarto"
         />
        </p>
        </div>
        )
    } else if (newValue === "sample3") {
      setOrdine([
        [182, 199.2],
        [699, 139.2],
        [235, 119.2],
        [156, 109.2],
        [273, 89.2],
        [159, 50],
        [200, 35.1]
      ]);
      setPianoRef(<div className="h1 green"><strong className="tc black">REFERENCE STRESS TEST - versione 0.3 - 35.697.301 iterazioni</strong><p></p><p><Pianoditaglio 
        piano={[["Barre utilizzate: ",337,"Scarto totale: ",1782.8000000000018,"Meno scarto possibile"],[60,"barre tagliate così: ",[199.2,199.2,50,199.2]," con scarto: ",2.400000000000091],[99,"barre tagliate così: ",[139.2,139.2,139.2,50,35.1,35.1,109.2]," con scarto: ",3],[1,"barre tagliate così: ",[119.2,119.2,139.2,35.1,109.2,35.1,89.2]," con scarto: ",3.799999999999841],[100,"barre tagliate così: ",[139.2,139.2,139.2,139.2,89.2]," con scarto: ",4],[56,"barre tagliate così: ",[119.2,119.2,119.2,109.2,89.2,89.2]," con scarto: ",4.7999999999999545],[20,"barre tagliate così: ",[119.2,119.2,119.2,89.2,89.2,89.2]," con scarto: ",24.799999999999955],[1,"barre tagliate così: ",[119.2,119.2,119.2,119.2]," con scarto: ",173.2],"(SOLUZ. TEMPORANEA) Infine taglia queste stecche dagli sfridi o da una nuova barra (se sono molte puoi calcolare un nuovo piano di taglio) :",[["-",1,"x",199.2],["-",3,"x",139.2],["-",3,"x",119.2]]]}
        profilo="AL/1"
        mode="menoScarto"
         />
        </p>
        </div>
        )
    } else if (newValue === "sample4") {
      setOrdine([
        [182, 199.2],
        [699, 139.2],
        [235, 119.2],
        [156, 109.2],
        [273, 89.2]
      ]);
    }
    
  }

  //FUNZIONONA PIANO DI TAGLIO
  //PER IL MOMENTO QUESTA CALCOLA LA SOLUZIONE CON MENO SCARTO

  //creare un comando per cui si può scegliere tra: soluzione con minor scarto (lasciando sfridi più lunghi di tot), soluzione con minor numero di tagli(per quando si ha fretta), soluzione che usa meno barre intere
  function pianoSandbox() {
    if(ordineSandbox.length>0) {

      // VARIABILI NON MONITORATE

      let modalita;

      if (opzioni.mode === "menoScarto") {
      modalita = "Meno scarto possibile"
      } else if (opzioni.mode === "menoBarre") {
      modalita = "Meno barre possibili"
       } else if (opzioni.mode === "acra") {
      modalita = "Calcolo barre per acra"
      }

      setPiano([])
      let iterazioni = 0

      let ordineDaAnalizzare = ordineSandbox;

      let tutteLeComb = [];
      let combTemp = [];
      let combMigliore;
      let pianoDiTaglioCompleto = [];

      let barreUtilizzate = 0;
      let scartoTotale = 0;

      let barreDaRecuperareAllaFine = [];

      function ciStaAncora(misura, comb, barraRimanente = 650) {
        let lungTemp =
          comb.reduce(function(a, b) {
            return a + b;
          }, 0) +
          opzioni.larghezzaLama * comb.length;
        if (
          misura < 650 - lungTemp &&
          (650 - lungTemp - misura > opzioni.minSfrido ||
            650 - lungTemp - misura < opzioni.maxScarto)
        ) {
          //console.log("ci sta ancora!");
          return true;
        } else {
          //console.log(`comb ${comb}: la misura ${misura} non sta più nei ${650-lungTemp} che rimangono alla barra, che era lunga ${barraRimanente}`);
          return false;
        }
      }

      function aggiungiCombConMisura(misura) {
        combTemp = [];
        combTemp.push(misura);
      }

      let continua = true
      //questa si deve migliorare facendo in modo che vada ad operare solo sul livello di combo aggiunto in precedenza
      function creaTutteLeCombPossibili(arrayMisure) {
        let misPiccola = arrayMisure[arrayMisure.length - 1];

        // PER OGNI MISURA CREO UNA NUOVA COMB
        for (let i = 0; i < arrayMisure.length; i++) {
          aggiungiCombConMisura(arrayMisure[i]);
          tutteLeComb.push(combTemp);
        }
        //il numero dei loop che eseguo sotto è determinato dal numero massimo di tagli che posso fare in una singola barra, e cioé barra/misura più piccola dell'ordine
        let numTagliMassimi = Math.round(650 / (misPiccola + 0.5));
        //ad ogni giro si passa tutte le combiniazioni esistenti e aggiunge una combinazione per ogni misura dell'ordinead ognuna di esse.
        if (continua) {
          for (let k = 0; k < numTagliMassimi; k++) {
          let tempArrCombLength = tutteLeComb.length;
          for (let i = 0; i < tempArrCombLength; i++) {
            let barraRimasta =
              650 -
              tutteLeComb[i].reduce((a, b) => a + b, 0);
            for (let j = 0; j < arrayMisure.length; j++)
              if (ciStaAncora(arrayMisure[j], tutteLeComb[i], barraRimasta)) {
                iterazioni++
                if (iterazioni === 1000000) {
                  if (window.confirm("Hai già raggiunto un milione di iterazioni. Probabilmente l'ordine è molto complesso o contiene almeno una misura molto piccola. Se pensi che il dispositivo su cui stai eseguendo il calcolo sia abbastanza potente, premi OK per continuare")) {
                    continua = true;
                  } else {
                    continua = false;
                  }
                } else if (iterazioni === 5000000) {
                  if (window.confirm("Ora sono cinque milioni di iterazioni. Probabilmente l'ordine è molto complesso o contiene almeno una misura molto piccola. Se pensi che il dispositivo su cui stai eseguendo il calcolo sia abbastanza potente, premi OK per continuare")) {
                    continua = true;
                  } else {
                    continua = false;
                  }
                }
                if(tutteLeComb[i].length>(k)) {
                  let newComb = tutteLeComb[i].slice(0);
                  newComb.push(arrayMisure[j]);
                  tutteLeComb.push(newComb);
                }
              }
            }
          }
        }
      }

      function trovaCombMigliore(allCombs) {
        let bestComb = [allCombs[0]];
        for (let i = 0; i < allCombs.length; i++) {
          let scartoBestComb =
            650 -
            bestComb[0].reduce(function(a, b) {
              return a + b;
            }, 0);
          let scartoThisComb =
            650 -
            allCombs[i].reduce(function(a, b) {
              return a + b;
            }, 0);

          if (scartoBestComb > scartoThisComb) {
            bestComb = [allCombs[i], scartoThisComb];
          }
        }
        return bestComb;
      }

      function quanteBarreConQuestaComb(comb, ordine) {
        let numBarreConQuestaComb = 0;
        let hoFinitoDiTagliareUnaMisura = false;

        let combFittizia = comb[0].slice(0);
        let ordineFittizio = [];
        for (let i = 0; i < ordine.length; i++) {
          ordineFittizio[i] = ordine[i].slice();
        }
        let hoFinitoDiTagliareUnaMisuraFittizia = false;

        let misuraDaTogliereDallOrdine;

        
        //qui faccio prima un loop fittizio in cui decido quante barre servirebbero prima di esaurire una delle misure coinvolte, poi se l'ultima barra non è sfruttata completamente decido di tagliarne una di meno e aggiungere le stecche che mancavano al completamento ad un array da gestire poi in altro modo
        while (!hoFinitoDiTagliareUnaMisuraFittizia) {
          for (let i = 0; i < combFittizia.length; i++) {
            for (let j = 0; j < ordineFittizio.length; j++) {
              if (combFittizia[i] === ordineFittizio[j][1]) {
                ordineFittizio[j][0] = ordineFittizio[j][0] - 1;
                if (ordineFittizio[j][0] === 0) {
                  console.log(
                    "Ho finito di tagliare la misura fittizia ",
                    ordineFittizio[j][1]
                  );
                  hoFinitoDiTagliareUnaMisuraFittizia = true;
                  misuraDaTogliereDallOrdine = ordineFittizio[j][1];
                }
              }
            }
          }
          numBarreConQuestaComb++;
        }

        /*
        console.log(
          "MISURA DA TOGLIERE DALL'ORDINE: ",
          misuraDaTogliereDallOrdine
        );
        console.log("ORDINE: " + ordine);
        */

        // va bene se tutte le barre previste per la combo sono sfruttate appieno, non va bene se l'ultima dà più stecche di quante ne servono
        let nonVaBeneCosi = false;
        for (let i = 0; i < ordineFittizio.length; i++) {
          if (ordineFittizio[i][0] < 0) {
            nonVaBeneCosi = true;
            barreDaRecuperareAllaFine.push(["-",Math.abs(ordineFittizio[i][0]),"x",ordineFittizio[i][1]]);
          }
        }
        // se non va bene ne taglio una in meno
        if (nonVaBeneCosi) {
          numBarreConQuestaComb--;
        }
        //poi ripeto il ciclo che ho fatto prima in modo fittizio ma questa volta toglie effettivamente dal numero di stecche richiesto nell'ordine le stecche tagliate con questa combo
        if (!nonVaBeneCosi) {
          while (!hoFinitoDiTagliareUnaMisura) {
            for (let i = 0; i < comb[0].length; i++) {
              for (let j = 0; j < ordine.length; j++) {
                if (comb[0][i] === ordine[j][1]) {
                  ordine[j][0] = ordine[j][0] - 1;
                  if (ordine[j][0] === 0) {
                    console.log("Ho finito di tagliare la misura ", ordine[j][1]);
                    hoFinitoDiTagliareUnaMisura = true;
                    //COSA MOLTO PERICOLOSA:
                    ordine.splice(j, 1);
                  }
                }
              }
            }
            //numBarreConQuestaComb++ TOLTO DA QUI, MESSO DI LA
          }
        } else {
          for (let i = 0; i < numBarreConQuestaComb; i++) {
            for (let i = 0; i < comb[0].length; i++) {
              for (let j = 0; j < ordine.length; j++) {
                if (comb[0][i] === ordine[j][1]) {
                  ordine[j][0] = ordine[j][0] - 1;
                }
              }
            }
          }
        }
        //tolgo la misura di cui ho tutte le stecche tagliate dall'ordine, così da poter ricreare un nuovo insieme di combinazioni che non tenga più conto di quella misura
        for (let i = 0; i < ordine.length; i++) {
          if (ordine[i][1] === misuraDaTogliereDallOrdine) {
            ordine.splice(i, 1);
          }
        }
        /*
        console.log("ORDINE DOPO AVER TOLTO MISURA: " + ordine);
        console.log(
          "RISULTATO: " +
            numBarreConQuestaComb +
            " barre tagliate cosÃ¬:  " +
            comb[0] +
            " con scarto: " +
            comb[1]
        );
        */

        //CREO UNA RIGA NEL PIANO DI TAGLIO CON QUANTE BARRE DEVO TAGLIARE CON QUESTA COMBO, LE MISURE DELLA COMBO E LO SCARTO
        pianoDiTaglioCompleto.push([
          numBarreConQuestaComb,
          "barre tagliate così: ",
          comb[0],
          " con scarto: ",
          comb[1]
        ]);
      }

      function pianoDiTaglio(ordine) {
        tutteLeComb = [];

        // creo un array solo delle misure
        const arrayMisure = [];
        ordine.forEach((e, i) => arrayMisure.push(e[1]));

        // ORDINO L'ARRAY IN BASE ALLE MISURE
        arrayMisure.sort(function(a, b) {
          return b[1] - a[1];
        });

        creaTutteLeCombPossibili(arrayMisure);

        if (!continua) {
          setPiano([])
          return
        }

        combMigliore = trovaCombMigliore(tutteLeComb);

        //console.log("combMigliore: ", combMigliore);

        quanteBarreConQuestaComb(combMigliore, ordine);
        //console.log(ordine);

        if (ordine.length > 0) {
          pianoDiTaglio(ordine);
        }
      }

      function statistichePiano(piano) {
        for (let i = 0; i < piano.length; i++) {
          barreUtilizzate = barreUtilizzate + piano[i][0];
          scartoTotale = scartoTotale + piano[i][4] * piano[i][0];
        }
      }

      function pianoConStatistiche(ordine) {
        pianoDiTaglio(ordine);
        statistichePiano(pianoDiTaglioCompleto);
        pianoDiTaglioCompleto.unshift([
          "Barre utilizzate: ",
          barreUtilizzate,
          "Scarto totale: ",
          scartoTotale,
          modalita
        ]);
        pianoDiTaglioCompleto.push(
          "(SOLUZ. TEMPORANEA) Infine taglia queste stecche dagli sfridi o da una nuova barra (se sono molte puoi calcolare un nuovo piano di taglio) :",
          barreDaRecuperareAllaFine
        );
      }

      pianoConStatistiche(ordineDaAnalizzare);

      //console.log(pianoDiTaglioCompleto);

      setPiano(pianoDiTaglioCompleto);

      console.log(iterazioni)

      
    }
  }

  //RENDERING DELLA PAGINA

  return (
    <div className="flex flex-wrap">
      <div className="min-vh-100-l bg-gray pt2 fl w-100-ns w-100-m w-40-l">
        {/*ORDINE*/}
        <h1 className="pl2 pa1 bg-gold w-100">ORDINE</h1>
        <div className="pa3">
          <form
            className="bg- br3 flex items-end pa2
            "
          >
            <label className="mr2">
              <strong>N. stecche</strong>
              <br />
              <br />
              <input
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
                type="number"
                id="numStecche"
                name="numStecche"
                value={teloCorrente.steccheCorrente}
                onChange={impostaMisuraCorrente}
              />
            </label>
            <label className="mr2">
              <strong>Misura taglio</strong>
              <br />
              <br />
              <input
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
                type="number"
                id="misura"
                name="misura"
                value={teloCorrente.misuraCorrente}
                onChange={impostaMisuraCorrente}
              />
            </label>
            <br />
            <br />
            <label>
              <input
                className="input-reset bg-blue white b ba b--black-20 pa2 mb2 db w-100"
                type="submit"
                value="Aggiungi"
                onClick={aggiungiMisuraCorrente}
              />
            </label>
          </form>
          <br />
          <div className="pa2 br4">
            <Ordine ordine={ordineSandbox} />
          </div>
        </div>
      </div>
      <div className="bg-blue pt2 fl w-100-ns w-100-m w-20-l">
        {/*Opzioni*/}
        <h1 className="pl2 pa1 bg-gold w-100">OPZIONI</h1>
        <div className="flex items-start flex-wrap pa3">
          <label className="w-third pa2">
            <strong>MODALITÀ</strong>
            <br />
            <br />
            <fieldset
              className="input-reset bw0 pa0 w-100"
              onChange={impostaMode}
            >
              <select
                name="mode"
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
              >
                <option value="menoScarto" selected="selected">
                  Scarto minore
                </option>
                <option value="menoBarre">Meno barre</option>
                <option value="acra">Acra</option>
              </select>
            </fieldset>
            <small id="name-desc" class="f6 db mb2">
              {descMode}
            </small>
          </label>

          <label className="w-third pa2">
            <strong>PROFILO</strong>
            <br />
            <br />
            <fieldset
              className="input-reset bw0 pa0 w-100"
              onChange={impostaProfilo}
            >
              <select
                name="profilo"
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
              >
                <option value="AL/1" selected="selected">
                  AL/1
                </option>
                <option value="AC/6">AC/6</option>
                <option value="AL/2HD">AL/2 HD</option>
                <option value="AL/2">AL/2</option>
              </select>
            </fieldset>
            <small id="name-desc" class="f6 db mb2">
              Info usata per calcolare il numero dei pacchi necessari.
            </small>
          </label>

          <label className="w-third pa2">
            <strong>SCARTO MAX</strong>
            <br />
            <br />
            <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              name="opzioneScarto"
              type="number"
              value={opzioni.maxScarto}
              onChange={impostaOpzioni}
            />
            <small id="name-desc" class="f6 db mb2">
              Lunghezza massimo scarto
            </small>
          </label>
          <label className="w-third pa2">
            <strong>SCARTO MIN</strong>
            <br />
            <br />
            <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              name="opzioneSfrido"
              type="number"
              value={opzioni.minSfrido}
              onChange={impostaOpzioni}
            />
            <small id="name-desc" class="f6 db mb2">
              Lunghezza minima sfrido
            </small>
          </label>
          <label className="w-third pa2">
            <strong>LAMA</strong>
            <br />
            <br />
            <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              name="opzioneLama"
              type="number"
              value={opzioni.larghezzaLama}
              onChange={impostaOpzioni}
            />
            <small id="name-desc" class="f6 db mb2">
              Larghezza lama (imposta 0.5 per alluminio, 0.2 per acciaio)
            </small>
          </label>
          <label className="w-third pa2">
            <strong>DEBUG</strong>
            <br />
            <br />
            <fieldset
              className="input-reset bw0 pa0 w-100"
              onChange={aggiungiPianoEsempio}
            >
              <select
                name="debug"
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
              > 
                <option value="none" selected="selected"></option>
                <option value="sample1">
                  Sample 1
                </option>
                <option value="sample2">Sample 2</option>
                <option value="sample3">Stress test</option>
                <option value="sample4">Sample 4</option>
              </select>
            </fieldset>
            <small id="name-desc" class="f6 db mb2">
            Aggiunge un ordine di esempio.
            </small>
          </label>
        </div>
        {/*<small className="tc self-end">creato da Damiano nel 2020.</small>*/}
      </div>
      <div className="bg-gold pt2 fl w-100 w-100-ns w-100-m w-40-l pa3">
        <h1 className="pl2 pa1">PIANO</h1>
        <p className="pl2 tc">
          <input
            className="input-reset bg-blue b white bw2 bb-black bt-0 bl-0 br-0 pa2 mb2 w-50 br3"
            type="button"
            name="creaPiano"
            onClick={pianoSandbox}
            value="CREA PIANO"
          />
        </p>
        <Pianoditaglio piano={pianoDiTaglioDaRenderizzare} profilo={profilo} mode={opzioni.mode}/>
        <br /><br />
        {pianoRef}
      </div>
    </div>
    
  );
}

export default App;

import React, { useState } from "react";
import Ordine from "./Ordine";
import Pianoditaglio from "./Pianoditaglio";
import { cloneDeep, sum, indexOf, clone } from 'lodash';
//da togliere poi questo sotto:
import { inputTutteComb } from "./tutteComb";
//import "./logoANIMATO.svg";


//AGGIUNGERE GESTIONE SFRIDI

function App() {
  //VARIABILI CONTROLLATE NELLO STATE

  const [teloCorrente, setTeloCorrente] = useState({
    steccheCorrente: "",
    misuraCorrente: ""
  });

  const [ordineImpostato, setOrdineImpostato] = useState([]);

  const [ pianoDiTaglioDaRenderizzare, setPiano ] = useState();

  const [ordineRimasugli, setOrdineRimasugli ] = useState();

  const [sfridi, setSfridi] = useState([]);

  const [profilo, setProfilo] = useState("AL/1");

  const [opzioni, setOpzioni] = useState({
    maxScarto: 30,
    minSfrido: 65,
    larghezzaLama: 0.5,
    mode: "menoScarto"
  });

  const [lungBarra, setLungBarra] = useState(650)

  const [descMode, setDescMode] = useState("Criteri da usare per il calcolo del piano");

  const [pianoRef, setPianoRef] = useState([])

  //modificare questo in false alla fine dei test
  const [debugVisual, setDebugVisual] = useState(true)

  const [input, setInput] = useState("input prova")
  const [input2, setInput2] = useState("input 2 prova")

  const [output, setOutput] = useState("output prova")

  const [stato, setStato] = useState("")

  const [pianiCalcolati, setPianiCalcolati] = useState(0);

  // VAR NON USESTATE

  let misuraDuplicataIndex = false;

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

  function impostaLungBarra(event) {
    let newValue = event.target.value;
    setLungBarra(newValue);
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

  function misuraDuplicata(misura) {
    misuraDuplicataIndex = false
    for (let i = 0; i < ordineImpostato.length; i++) {
      if (misura === ordineImpostato[i][1]) {
        misuraDuplicataIndex = i;
        return true;
      }
    }
  }

  function aggiungiMisuraCorrente(event) {
    event.preventDefault();
    setOrdineImpostato(prevValue => {
      if (
        teloCorrente.steccheCorrente &&
        teloCorrente.misuraCorrente &&
        (teloCorrente.steccheCorrente > 0 && teloCorrente.misuraCorrente > 0)
      ) {
        if (misuraDuplicata(Number(teloCorrente.misuraCorrente))) {
          window.alert("misura già presente nell'ordine. le stecche richieste verranno aggiunte alle stecche già presenti")
          // 1. Make a shallow copy of the items
          let ordinePrec = clone(ordineImpostato);
          // 2. Make a shallow copy of the item you want to mutate
          let misuraDaModCopia = clone(ordineImpostato[misuraDuplicataIndex])
          // 3. Replace the property you're intested in
          misuraDaModCopia[0] = misuraDaModCopia[0]+Number(teloCorrente.steccheCorrente);
          // 4. Put it back into our array. N.B. we *are* mutating the array here, but that's why we made a copy first
          ordinePrec[misuraDuplicataIndex] = misuraDaModCopia;
          return ordinePrec;
        } else {
          return [
            ...prevValue,
            [
              Number(teloCorrente.steccheCorrente),
              Number(teloCorrente.misuraCorrente)
            ]
          ];
        }
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
      setOrdineImpostato([
        [182, 199.2],
        [699, 139.2],
        [235, 119.2],
        [156, 109.2],
        [273, 89.2]
      ]);
      setPianoRef(<div className="h1 green"><strong className="tc black">REFERENCE SAMPLE 1 - versione 0.3 - 18.929 iterazioni</strong><br /><br /><div><Pianoditaglio 
        piano={[["Barre utilizzate: ",317,"Scarto totale: ",3413.6000000000013,"Meno scarto possibile"],[91,"barre tagliate così: ",[199.2,199.2,139.2,109.2]," con scarto: ",3.2000000000000455],[152,"barre tagliate così: ",[139.2,139.2,139.2,139.2,89.2]," con scarto: ",4],[60,"barre tagliate così: ",[119.2,119.2,119.2,109.2,89.2,89.2]," con scarto: ",4.7999999999999545],[2,"barre tagliate così: ",[119.2,119.2,119.2,109.2,109.2]," con scarto: ",74],[12,"barre tagliate così: ",[119.2,119.2,119.2,119.2]," con scarto: ",173.2]]}
        profilo="AL/1"
        mode="menoScarto"
         />
        </div>
        </div>
        )
    } else if (newValue === "sample2") {
      setOrdineImpostato([
        [48, 196.7],
        [32, 135.8],
        [37, 81.2],
        [48, 68.2],
        [32, 62.2],
        [37, 48.7]
      ]);
      setPianoRef(<div className="h1 green"><strong className="tc black">REFERENCE SAMPLE 2 - versione 0.3 - 8.940.344 iterazioni</strong><br /><br /><div><Pianoditaglio 
        piano={[["Barre utilizzate: ",35,"Scarto totale: ",118.59999999999741,"Meno scarto possibile"],[16,"barre tagliate così: ",[196.7,135.8,135.8,62.2,48.7,68.2]," con scarto: ",2.599999999999909],[10,"barre tagliate così: ",[196.7,196.7,68.2,68.2,48.7,68.2]," con scarto: ",3.2999999999999545],[8,"barre tagliate così: ",[81.2,81.2,196.7,81.2,62.2,62.2,81.2]," con scarto: ",4.099999999999909],[1,"barre tagliate così: ",[196.7,196.7,48.7,196.7]," con scarto: ",11.200000000000045],[0,"barre tagliate così: ",[81.2,81.2,81.2,81.2,81.2,48.7,48.7,48.7,81.2]," con scarto: ",16.699999999999932],[0,"barre tagliate così: ",[48.7,48.7,48.7,48.7,48.7,48.7,48.7,48.7,48.7,48.7,48.7]," con scarto: ",114.30000000000007]]}
        profilo="AL/1"
        mode="menoScarto"
         />
        </div>
        </div>
        )
    } else if (newValue === "sample3") {
      setOrdineImpostato([
        [182, 199.2],
        [699, 139.2],
        [235, 119.2],
        [156, 109.2],
        [273, 89.2],
        [159, 50],
        [200, 35.1]
      ]);
      setPianoRef(<div className="h1 green"><strong className="tc black">REFERENCE STRESS TEST - versione 0.3 - 35.697.301 iterazioni</strong><br /><br /><div><Pianoditaglio 
        piano={[["Barre utilizzate: ",337,"Scarto totale: ",1782.8000000000018,"Meno scarto possibile"],[60,"barre tagliate così: ",[199.2,199.2,50,199.2]," con scarto: ",2.400000000000091],[99,"barre tagliate così: ",[139.2,139.2,139.2,50,35.1,35.1,109.2]," con scarto: ",3],[1,"barre tagliate così: ",[119.2,119.2,139.2,35.1,109.2,35.1,89.2]," con scarto: ",3.799999999999841],[100,"barre tagliate così: ",[139.2,139.2,139.2,139.2,89.2]," con scarto: ",4],[56,"barre tagliate così: ",[119.2,119.2,119.2,109.2,89.2,89.2]," con scarto: ",4.7999999999999545],[20,"barre tagliate così: ",[119.2,119.2,119.2,89.2,89.2,89.2]," con scarto: ",24.799999999999955],[1,"barre tagliate così: ",[119.2,119.2,119.2,119.2]," con scarto: ",173.2]]}
        profilo="AL/1"
        mode="menoScarto"
         />
        </div>
        </div>
        )
    } else if (newValue === "sample4") {
      setOrdineImpostato([
        [182, 199.2],
        [699, 139.2],
        [235, 119.2],
        [156, 109.2],
        [273, 89.2]
      ]);
    }
    
  }

  function visualizzaOpzioniDebug() {
    if (!debugVisual) {
      setDebugVisual(true);
    } else {
      setDebugVisual(false);
    }
  }

  function impostaInputManuale(event) {
    const newValue = event.target.value;
    setInput(newValue);
  }

  function fanneUnArray() {
    //NON FUNZIONA BENE
    setInput(Array.from(input))
  }

  function outputToInput() {
    setInput(output);
  }

  function impostaInputPredefinito(event) {
    const newValue = event.target.value;
    if (newValue === "inputTrovaTutteCombo") {
      setInput([199.2, 139.2, 119.2, 109.2, 89.2]);
    } else if (newValue === "inputComboMigliore") {
      setInput(inputTutteComb);
    } else if (newValue === "inputQuanteBarre") {
      setInput([
        [
          119.2,
          119.2,
          119.2,
          109.2,
          89.2,
          89.2
        ],
        4.7999999999999545
      ]);
    } else if (newValue === "ordineIntero") {
      setInput(
        [
          [182, 199.2],
          [699, 139.2],
          [235, 119.2],
          [156, 109.2],
          [273, 89.2]
        ]
      )
    }
  }
  
  function impostaInputPredefinito2(event) {
    const newValue = event.target.value;
    if (newValue === "inputTrovaTutteCombo") {
      setInput2([199.2, 139.2, 119.2, 109.2, 89.2]);
    } else if (newValue === "inputComboMigliore") {
      setInput2(inputTutteComb);
    } else if (newValue === "inputQuanteBarre") {
      setInput2([
        [
          119.2,
          119.2,
          119.2,
          109.2,
          89.2,
          89.2
        ],
        4.7999999999999545
      ]);
    } else if (newValue === "ordineIntero") {
      setInput2(
        [
          [182, 199.2],
          [699, 139.2],
          [235, 119.2],
          [156, 109.2],
          [273, 89.2]
        ]
      )
    }
  }

  function outputToInput2() {
    setInput2(output);
  }

  function ordineToInput() {
    setInput(ordineImpostato)
  }

  function ricaricaPagina() {
    window.location.reload();
  }

  //PROGRAMMA PRINCIPALE
  
  // VAR FUORI DA FUNZ

  let combTemp;
  let arrayMisure;
  
  let iterazioni = 0;
  let tutteLeComb = [];
  
  let combMigliore;
  let pianoDiTaglioCompleto = [];
  let barreUtilizzate = 0;
  let scartoTotale = 0;
  let barreDaRecuperareAllaFine = [];
  let continua = true
  let misuraDaTogliereDallOrdine;
  let combFittizia;
  let ordineFittizio;
  let modalita;
  let numeroDiVolteCheCalcoloIlPIano = 0;
  let ordineDelleCoseCheAvanzano = [];
  

  // FUNZ FUORI DA FUNZ
  

  function ciStaAncora(misura, comb, barraRimanente = lungBarra) {
    //return true or false
    let lungTemp = sum(comb)+
      opzioni.larghezzaLama * comb.length;
    //console.log(comb+" LUNGTEMP "+lungTemp)
    if (
      misura < barraRimanente /*- lungTemp*/ &&
      (barraRimanente - misura > opzioni.minSfrido ||
        barraRimanente - misura < opzioni.maxScarto)
    ) {
      //console.log("ci sta ancora!");
      return true;
    } else {
      //console.log(`comb ${comb}: la misura ${misura} non sta più nei ${lungBarra-lungTemp} che rimangono alla barra, che era lunga ${lungBarra}`);
      return false;
    }
  }

  function aggiungiCombConMisura(misura) {
    //riformulare questa in modo input-return senza effetti collaterali
    combTemp = [];
    combTemp.push(misura);
  }

  function creaArrayDecrescenteMisure(ordine) {
    //TEST: funziona
    // creo un array solo delle misure
    arrayMisure = [];
    ordine.forEach(e => arrayMisure.push(e[1]));
    // ORDINO L'ARRAY DELLE MISURE IN MODO DECRESCENTE
    arrayMisure.sort(function(a, b) {
      return b/*[1]*/ - a/*[1]*/; /*non mi ricordo perché ci fosse l'[1]*/
      });
    return arrayMisure;
  }
  
  function creaTutteLeCombPossibili(arrayMisure) {
    setStato("Creo tutte le combinazioni possibili delle misure dell'ordine")
    let tutteLeCombFunz = []
    //RICHIEDE: arrayMisure in ordine decrescente
    //l'if inizialeOAvanzi iniziava qui
    let misPiccola = arrayMisure[arrayMisure.length - 1];
    let numTagliMassimi = Math.round(lungBarra / (misPiccola + opzioni.larghezzaLama));
    //il numero dei loop che eseguo sotto è determinato dal numero massimo di tagli che posso fare in una singola barra, e cioé barra/misura più piccola dell'ordine (qui individuata con .length-1 perché si presume che l'array sia in ordine decrescente)

    // PER OGNI MISURA CREO UNA NUOVA COMB
    for (let i = 0; i < arrayMisure.length; i++) {
      aggiungiCombConMisura(arrayMisure[i]);
      tutteLeCombFunz.push(combTemp);
    }

    
    //ad ogni giro si passa tutte le combinazioni esistenti e aggiunge una combinazione per ogni misura dell'ordine ad ognuna di esse.
    if (continua) {
      //per tot giri fissi
      for (let ondata = 0; ondata < numTagliMassimi; ondata++) {
        //console.log("ondata "+(ondata+1)+" combs: "+tutteLeCombFunz);
        setStato(`Sto creando tutte le combinazioni possibili tra le misure dell'ordine: Passaggio ${ondata+1} su ${numTagliMassimi}`)
        let tempArrDelleCombLength = tutteLeCombFunz.length;
        // per ogni comb esistente in precedenza
        for (let i = 0; i < tempArrDelleCombLength; i++) {
          //let serveTenereLaCombo = false; /*PRIMA O POI*/
          let combAttuale = tutteLeCombFunz[i];
          let barraRimasta =
            lungBarra -
            sum(combAttuale);
          if(combAttuale.length>(ondata)) {
            //console.log(combAttuale+" è utile");
            // per ogni misura dell'ordine 
          for (let j = 0; j < arrayMisure.length; j++) {
            let misuraOrdine = arrayMisure[j];
            if (ciStaAncora(misuraOrdine, combAttuale, barraRimasta)) {
               {
                iterazioni++
                //SEZIONE PER EVITARE CRASH
                /*
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
                  }*/
                let newComb = combAttuale.slice(0);
                newComb.push(misuraOrdine);
                tutteLeCombFunz.push(newComb);
              }
            } /*else {
              //per il momento tolgo il fatto di cancellare la combo se tutte le misure sono state aggiunte perché non voglio togliere comb mentre ci looppo sopra
              //se almeno una misura non viene aggiunta tengo la combo a cui sto aggiungendo le altre misure perché potrebbe essere il risultato miglliore
              serveTenereLaCombo = true
              //devo capire se mi serve tenere le combo peggiori o no. nel caso in cui si debba ricorrere a combo meno ottimali per fare andare altre barre potrebbero servirmi
            }*/
            }
          }/*  else {
            console.log(combAttuale+" non era utile per l'ondata "+(ondata+1));
          } */
          // quando poi posso cancellare la combo che non mi serve lo faccio qui
        }
        //console.log("GIRO: ",ondata, "NUMERO COMBO: ",tutteLeCombFunz.length);
      }
      //console.log(tutteLeCombFunz);
      return tutteLeCombFunz;
    } else {
      console.log("HAI SCELTO DI NON CONTINUARE O CMQ CONTINUA E' SU FALSE");
    }
    
  }

  function trovaCombMigliore(allCombs) {
    setStato("Sto cercando la combinazione che restituisce meno scarto")
    let bestComb = [allCombs[0]];
    for (let i = 0; i < allCombs.length; i++) {
      let scartoBestComb =
        lungBarra - sum(bestComb[0]);
      let scartoThisComb =
        lungBarra - sum(allCombs[i]);

      if (scartoBestComb > scartoThisComb) {
        //QUESTO SORT NON FUNZIONA????
        bestComb = [allCombs[i]/*.sort(function(a, b) {
          return b[1] - a[1];
        })*/, scartoThisComb];
      }
    }
    return bestComb;
  }

  function neHoTagliateTroppe(ordineConTaglioSimulato) {
    //console.log("neHotagliatetroppe start: "+ordineConTaglioSimulato)
    for (let i = 0; i < ordineConTaglioSimulato.length; i++) {
      if (ordineConTaglioSimulato[i][0]<0) {
        //console.log("ne ho tagliate troppe")
        return true
      }
    }
  }

  function simulazioneTaglioComb(comb, ordinePerQuanteBarre) {
    let numBarreConQuestaCombSim = 0;

    //clono le var per vedere quante barre mi servono. c'è di sicuro un modo meno stupido di vedere quante barre mi servono
    combFittizia = cloneDeep(comb[0])/*comb[0].slice(0)*/;
    ordineFittizio = cloneDeep(ordinePerQuanteBarre)/*[];*/
   
    let hoFinitoDiTagliareUnaMisuraFittizia = false;        
    //qui faccio prima un loop fittizio in cui decido quante barre servirebbero prima di esaurire una delle misure coinvolte, poi se l'ultima barra non è sfruttata completamente decido di tagliarne una di meno e aggiungere le stecche che mancavano al completamento ad un array da gestire poi in altro modo
    while (!hoFinitoDiTagliareUnaMisuraFittizia) {
      // per ogni misura della combo (taglio sulla barra)
      for (let i = 0; i < combFittizia.length; i++) {
        let misuraDellaComb = combFittizia[i];
        // per ogni telo dell'ordine
        for (let j = 0; j < ordineFittizio.length; j++) {
          let misuraDellOrdine = ordineFittizio[j][1];
          let quanteBarreServonoPerQuesta = ordineFittizio[j][0];
          if (misuraDellaComb === misuraDellOrdine) {
            ordineFittizio[j][0] = ordineFittizio[j][0]-1;
            if (quanteBarreServonoPerQuesta === 0) {
              console.log(
                "Ho finito di tagliare la misura fittizia "+
                misuraDellOrdine
              );
              hoFinitoDiTagliareUnaMisuraFittizia = true;
              misuraDaTogliereDallOrdine = misuraDellOrdine;
            }
          }
        }
      }
      numBarreConQuestaCombSim++;
    }

    if (neHoTagliateTroppe(ordineFittizio)) {
      numBarreConQuestaCombSim--
    }
    

    return numBarreConQuestaCombSim
  }

  function eliminaTutteCombContenentiMisura(misura) {
    console.log("elimino tutte le combo con la misura "+misura+". n. combo prima di farlo: "+tutteLeComb.length)
    let newTutteLeComb = [];
    for (let i = 0; i < tutteLeComb.length; i++) {
      if (!(tutteLeComb[i].includes(misura))) {
        //console.log("questa la posso tenere: "+tutteLeComb[i]);
        newTutteLeComb.push(tutteLeComb[i]);
      }      
    }
    tutteLeComb = newTutteLeComb;
    console.log("n. combo dopo averlo fatto: "+tutteLeComb.length)
  }

  function aggiungiBarreDaTagliareAncora(combUtilizzata, ordineFittizio) {
    //questa non dovrebbe servire più
    for (let i = 0; i < ordineFittizio.length; i++) {
      if (ordineFittizio[i][0] < 0) {

      }
      
    }
  }

  function quanteBarreConQuestaComb(comb, ordinePerQuanteBarre) {

    console.log("FACCIO PARTIRE QUANTEBARRE. ORDINE PRIMA: "+ordinePerQuanteBarre)

    let numBarreConQuestaComb = 0;
    let hoFinitoDiTagliareUnaMisura = false;
    // questo arr sotto sarà riempito di arr contententi [misuradatogliere, indice misura da togliere in ordine]
    let misureFiniteDiTagliare = [];
    misuraDaTogliereDallOrdine = "";
    console.log("SIMULO QUANTE BARRE TAGLIARE")
    numBarreConQuestaComb = simulazioneTaglioComb(comb, ordinePerQuanteBarre);
    if (numBarreConQuestaComb === 0) {
      console.log("HO DECISO DI NON TAGLIARNE.");
    } else {
      console.log("HO DECISO DI TAGLIARNE "+numBarreConQuestaComb);
      /*
      while (!hoFinitoDiTagliareUnaMisura) {
        for (let i = 0; i < comb[0].length; i++) {
          for (let j = 0; j < ordinePerQuanteBarre.length; j++) {
            if (comb[0][i] === ordinePerQuanteBarre[j][1]) {
              ordinePerQuanteBarre[j][0] = ordinePerQuanteBarre[j][0] - 1;
              if (ordinePerQuanteBarre[j][0] === 0) {
                console.log("Ho finito di tagliare la misura ", ordinePerQuanteBarre[j][1]);
                hoFinitoDiTagliareUnaMisura = true;
                //COSA MOLTO PERICOLOSA:
                ordinePerQuanteBarre.splice(j, 1);
              }
            }
          }
        }
      }
      */
    
      for (let i = 0; i < numBarreConQuestaComb; i++) {
        for (let i = 0; i < comb[0].length; i++) {
          for (let j = 0; j < ordinePerQuanteBarre.length; j++) {
            if (comb[0][i] === ordinePerQuanteBarre[j][1]) {
              ordinePerQuanteBarre[j][0] = ordinePerQuanteBarre[j][0] - 1;
              if (ordinePerQuanteBarre[j][0] === 0) {
                console.log("Ho finito di tagliare la misura ", ordinePerQuanteBarre[j][1]);
                hoFinitoDiTagliareUnaMisura = true;
                misureFiniteDiTagliare.push([ordinePerQuanteBarre[j][1], j]);
              }
            }
          }
        }
      }

      //tolgo la misura di cui ho tutte le stecche tagliate dall'ordine, così da poter ricreare un nuovo insieme di combinazioni che non tenga più conto di quella misura

      while (misureFiniteDiTagliare.length>0) {
        //le misure erano in un array con anche l'indice a cui erano, ma se ne elimino due insieme l'indice non è più valido e dà problemi, quindi riformulo senza usare l'indice.
        eliminaTutteCombContenentiMisura(misureFiniteDiTagliare[0][0]);
        for (let i = 0; i < ordinePerQuanteBarre.length; i++) {
          if (misureFiniteDiTagliare[0][0] === ordinePerQuanteBarre[i][1]) {
            ordinePerQuanteBarre.splice(i,1)
          }
        }
        misureFiniteDiTagliare.shift();
      }

      /*
      while (misureFiniteDiTagliare.length>0) {
        eliminaTutteCombContenentiMisura(misureFiniteDiTagliare[0][0]);
        //console.log("cancello la misura dall'ordine: "+misureFiniteDiTagliare[0][0]);
        //console.log("la misura nell'ordine che sto andando a cercare è "+ordinePerQuanteBarre[misureFiniteDiTagliare[0][1]])
        ordinePerQuanteBarre.splice(misureFiniteDiTagliare[0][1], 1);
        misureFiniteDiTagliare.shift();
        //console.log("MISURE FINITE DI TAGLIARE DOPO AVER TOLTO: "+misureFiniteDiTagliare)
      }
      */
      /*
      if (hoFinitoDiTagliareUnaMisura) {
        //COSA ALTRETTANTO PERICOLOSA - elimino tutte le combo contenenti la misura
        eliminaTutteCombContenentiMisura(misuraFinitaDiTagliare);
        //COSA MOLTO PERICOLOSA:
        ordinePerQuanteBarre.splice(indexMisuraFinitaDiTagliare, 1);
      }
      */
      /*
      for (let i = 0; i < ordinePerQuanteBarre.length; i++) {
          if (ordinePerQuanteBarre[i][1] === misuraDaTogliereDallOrdine) {
            ordinePerQuanteBarre.splice(i, 1);
          }
      }
      */

      //CREO UNA RIGA NEL PIANO DI TAGLIO CON QUANTE BARRE DEVO TAGLIARE CON QUESTA COMBO, LE MISURE DELLA COMBO E LO SCARTO

      console.log("AGGIUNGO LA COMBO AL PIANO: "+numBarreConQuestaComb+
      "barre tagliate così: "+comb[0]+" con scarto: "+comb[1]);
      pianoDiTaglioCompleto.push([
        numBarreConQuestaComb,
        "barre tagliate così: ",
        comb[0],
        " con scarto: ",
        comb[1]
      ]);
      console.log("PIANO DI TAGLIO COMPLETO: "+pianoDiTaglioCompleto)
    }
    


    //TOLGO LA COMB DA TUTTE LE COMB
    tutteLeComb.splice(tutteLeComb.indexOf(comb[0]),1)


    return numBarreConQuestaComb;
  }

  function rimasugliDaTagliare(ordineNonClonato, piano) {
    let ordineDuplicato = cloneDeep(ordineNonClonato);
    for (let i = 0; i < ordineDuplicato.length; i++) {
      //let misuraDellOrdine = ordineDuplicato[i][1];
      //let quanteBarreServonoPerQuesta = ordineDuplicato[i][0];
        for (let j = 0; j < piano.length; j++) {
          //let quanteNeTaglio = piano[j][0];
          let arrDeiTagliDellaCombo = piano[j][2];
          for (let k = 0; k < arrDeiTagliDellaCombo.length; k++) {
            if (ordineDuplicato[i][1] === arrDeiTagliDellaCombo[k]) {
              console.log(`TOLGO ${piano[j][0]} A ${ordineDuplicato[i][1]}, QUINDI DA `+ordineDuplicato[i][0]);
              ordineDuplicato[i][0] = ordineDuplicato[i][0]-piano[j][0];
              console.log("DOVREBBE PASSARE A: "+ordineDuplicato[i][0]);
            }
          }
        }
    }
    console.log("ORDINE DEI RIMASUGLI: "+ordineDuplicato)
    let ordineDeiRimasugli = ordineDuplicato.filter(misura => misura[0]>0);
    return ordineDeiRimasugli;
  }

  function pianoDiTaglio(ordine) {
    numeroDiVolteCheCalcoloIlPIano++;
    setPianiCalcolati(numeroDiVolteCheCalcoloIlPIano);
    console.log("ESEGUO IL PIANO DI TAGLIO SU "+ordine+". ITERAZIONE N. "+numeroDiVolteCheCalcoloIlPIano)
    if (opzioni.mode !== "acra") {
      //QUESTO LO SPOSTO ALL'INIZIO DELL'ONCLICK
      //tutteLeComb = creaTutteLeCombPossibili(arrayMisure, inizialeOAvanzi);
      if (!continua) {
        //VIA DI FUGA SE FAI ANNULLA - QUESTO E' ANCORA DA CONTROLLARE
        console.log("USCITI");
        setPiano([])
        return false;
      }
      console.log("CERCO LA COMB MIGLIORE");
      combMigliore = trovaCombMigliore(tutteLeComb);
      console.log("COMB MIGLIORE: "+combMigliore);
      console.log("CERCO QUANTE BARRE CON QUESTA COMB");
      quanteBarreConQuestaComb(combMigliore, ordine);
      console.log("QUANTEBARRE ESEGUITO. ORDINE ADESSO: "+ordine);

      //SPOSTATO QUI QUESTO. IMPORTANTISSIMO, LOOP DEL PIANO FINO A QUANDO TUTTO E' TAGLIATO
      if (ordine.length > 0) {
        pianoDiTaglio(ordine);
      }

      /*
      //ANCHE QUESTO E? STATO SPOSTATO QUI
      setStato("Aggiungo le statistiche")
      pianoDiTaglioCompleto.unshift(statistichePiano(pianoDiTaglioCompleto));
      console.log("PIANO DI TAGLIO DOPO AVER AGGIUNTO LE STATISTICHE: "+pianoDiTaglioCompleto);
      setPiano(pianoDiTaglioCompleto);
      setStato("")
      console.log("iterazioni: ",iterazioni)
      //MEGLIO DI NO
      */

    } else {
      //ACRA MODE
      for (let i = 0; i < arrayMisure.length; i++) {
        console.log("ACRA MODE");
        let tempComb = [arrayMisure[i]];
        let barraRimasta =
            lungBarra -
            sum(tempComb);
          console.log("BARRA RIMASTA: "+barraRimasta)
          while (ciStaAncora(arrayMisure[i], tempComb, barraRimasta)) {
            tempComb.push(arrayMisure[i])
            console.log("DENTRO A PRIMO WHILE: "+tempComb);
            barraRimasta = lungBarra -
            sum(tempComb);
          }
          console.log("ACRA MODE - TEMP COMB PRIMA DI PASSARE ALLE ALTRE MISURE: "+tempComb)
          for (let j = i+1; j < arrayMisure.length; j++) {
            while (ciStaAncora(arrayMisure[j], tempComb, barraRimasta)) {
              tempComb.push(arrayMisure[j]);
              barraRimasta = lungBarra -
            sum(tempComb);
            }
          }
          console.log("ACRA MODE - TEMP COMB DOPO ESSERE PASSATO ALLE ALTRE: "+tempComb)
          combMigliore = [tempComb,(lungBarra-sum(tempComb))]
          quanteBarreConQuestaComb(combMigliore, ordine)
      }
    }        

    
  }

  function statistichePiano(piano) {
    
    for (let i = 0; i < piano.length; i++) {
      barreUtilizzate = barreUtilizzate + piano[i][0];
      scartoTotale = scartoTotale + piano[i][4] * piano[i][0];
    }
    return [
      "Barre utilizzate: ",
      barreUtilizzate,
      "Scarto totale: ",
      scartoTotale,
      modalita
    ]
  }

  //CREA PIANO

  function pianoDiTaglioOnClick() {
    if(ordineImpostato.length>0) {
      //clono l'ordine per lasciare l'originale inserito nell'altra sezione e poterlo consultare o rifare il piano con altre impostazioni
      let ordineDuplicato = cloneDeep(ordineImpostato);
      //ordineDelleCoseCheAvanzano = [];
      setPiano([]);
      setStato("Resetto le variabili")
      console.log("RESETTO VARIABILI")
      // VARIABILI NON MONITORATE

      iterazioni = 0;
      tutteLeComb = [];
      combTemp = [];
      pianoDiTaglioCompleto = [];
      barreUtilizzate = 0;
      scartoTotale = 0;
      barreDaRecuperareAllaFine = [];
      continua = true
      //determino la modalità
      if (opzioni.mode === "menoScarto") {
      modalita = "Meno scarto possibile"
      } else if (opzioni.mode === "menoBarre") {
      modalita = "Meno barre possibili"
       } else if (opzioni.mode === "acra") {
      modalita = "Calcolo barre per acra"
      }

      setStato("Clono l'ordine")
      console.log("CREO ARRAY MISURE");
      arrayMisure = creaArrayDecrescenteMisure(ordineDuplicato);
      console.log("ARRAY MISURE: "+arrayMisure);
      console.log("CREO TUTTE LE COMBO");
      tutteLeComb = creaTutteLeCombPossibili(arrayMisure);
      console.log("NUMERO COMBO CREATE: "+tutteLeComb.length);
      //ESEGUO IL PIANO IN LOOP
      if(pianoDiTaglio(ordineDuplicato) === false) {
        // (PIANO DI FUGA SE FACCIO ANNULLA)
        console.log("ESCO DIBRUTTO DALLA FUNZ INIZIALE")
        return;
      }

      if (opzioni.mode !== "acra") {
        setStato("Aggiungo le statistiche")
        pianoDiTaglioCompleto.unshift(statistichePiano(pianoDiTaglioCompleto));
        console.log("PIANO DI TAGLIO DOPO AVER AGGIUNTO LE STATISTICHE: "+pianoDiTaglioCompleto);
        setPiano(pianoDiTaglioCompleto);
        setStato("")
        console.log("iterazioni: ",iterazioni)
      } else {
        //ACRA MODE
        //POI CONTROLLA QUANTE BARRE MANCANO.
        setStato("HO AGGIUNTO LE BARRE DA TAGLIARE A PARTE IN UN NUOVO ORDINE SOTTO IL PIANO. TAGLIA ANCORA QUELLE (DOVREI RISOLVERE MA NON HO TEMPO)")
        
        setOrdineRimasugli(rimasugliDaTagliare(ordineImpostato, pianoDiTaglioCompleto));
        pianoDiTaglioCompleto.unshift(statistichePiano(pianoDiTaglioCompleto));
        console.log("PIANO DI TAGLIO DOPO AVER AGGIUNTO LE STATISTICHE: "+pianoDiTaglioCompleto);
        setPiano(pianoDiTaglioCompleto);
      }
      


      //console.log("ORDINE DELLE COSE CHE AVANZANO ALLA FINE DI TUTTO: "+ordineDelleCoseCheAvanzano)
      
    }
  }


  
  //FUNZIONI DEI TEST

  function provaTrovaCombMigliore() {
    setOutput(/*JSON.stringify(*/trovaCombMigliore(input)/*)*/);
  }

  function provaTrovaTutteComb() {
    setOutput(/*JSON.stringify(*/creaTutteLeCombPossibili(input)/*)*/);
  }

  function provaSimQuanteBarre() {
    setOutput(simulazioneTaglioComb(input, input2));
  }

  function provaQuanteBarre() {
    setOutput(quanteBarreConQuestaComb(input,input2));
  }

  function provaCreaArrayDecrescenteMisure() {
    setOutput(creaArrayDecrescenteMisure(input));
  }

  //RENDERING DELLA PAGINA

  return (
    <div className="flex flex-wrap">
      <div className="min-vh-100-l bg-gray pt2 fl w-100-ns w-100-m w-40-l">
        {/*ORDINE*/}
        <h1 className="pl2 pa1 bg-gold w-100">ORDINE</h1>
        <div className="pa3">
          {debugVisual && 
          <div>
            <div>
              <h2>INPUT</h2>
              <textarea
                type="text"
                size="50"
                rows="5"
                cols= "72"
                value={input}
                onChange={impostaInputManuale}          
              />
              <div>
                <fieldset
                className="input-reset bw0 ma0 pa0"
                onChange={impostaInputPredefinito}
                >
                <select
                  name="inputPredefinito"
                  className="input-reset ba b--black-20 pa2 db"
                  defaultValue="none"
                > 
                  <option value="none">
                    input predefiniti
                  </option>
                  <option value="inputTrovaTutteCombo">
                    per trova tutte le combo (arrayMisure)
                  </option>
                  <option value="inputComboMigliore">per trova combo migliore (tutteLeCombo)</option>
                  <option value="inputQuanteBarre">per quante barre con questa combo (combo)</option>
                  <option value="ordineIntero">ordine intero (ad es. per quante barre)</option>
                </select>
              </fieldset>
              <br />
                <div className="flex">
                  <input
                  className="input-reset ba b--black-20 pa2 db"
                  type="button"
                  name="switchInputOutput"
                  onClick={outputToInput}
                  value="Output to Input"
                  />
                  <input
                  className="input-reset ba b--black-20 pa2 ml2 db"
                  type="button"
                  name="textToArr"
                  onClick={fanneUnArray}
                  value="fanne un array"
                  />
                  <input
                  className="input-reset ba b--black-20 pa2 ml2 db"
                  type="button"
                  name="ordineToInput"
                  onClick={ordineToInput}
                  value="ordine->input"
                  />
                </div>
              </div>
            <br />
            <p>
              {JSON.stringify(input)}
            </p>
            </div>
            <div>
            <h2>INPUT 2</h2>
              <p>{input2}</p>
              {/*<textarea
                type="text"
                size="50"
                rows="5"
                cols= "72"
                value={input}
                onChange={impostaInputManuale}          
              />*/}
              <div>
              <fieldset
              className="input-reset bw0 ma0 pa0"
              onChange={impostaInputPredefinito2}
              >
              <select
                name="inputPredefinito"
                className="input-reset ba b--black-20 pa2 db"
                defaultValue="none"
              > 
                <option value="none">
                  input predefiniti
                </option>
                <option value="inputTrovaTutteCombo">
                  per trova tutte le combo (arrayMisure)
                </option>
                <option value="inputComboMigliore">per trova combo migliore (tutteLeCombo)</option>
                <option value="inputQuanteBarre">per quante barre con questa combo (combo)</option>
                <option value="ordineIntero">ordine intero (ad es per quantebarre)</option>
              </select>
            </fieldset>
            <br />
            <div className="flex">
              <input
              className="input-reset ba b--black-20 pa2 db"
              type="button"
              name="switchInputOutput"
              onClick={outputToInput2}
              value="Output to Input"
              />
              <input
              className="input-reset ba b--black-20 pa2 ml2 db"
              type="button"
              name="textToArr"
              onClick={fanneUnArray}
              value="fanne un array"
              />
            </div>
            </div>
            </div>
            <div>
              <h2>OUTPUT</h2>
              <pre>
                {output}
              </pre>
              <pre>
                JSON STRINGIFIED: {JSON.stringify(output)}
              </pre>
              <br />
              <br />
            </div>
          </div>
          }
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
            <Ordine ordine={ordineImpostato} />
          </div>
          <p>
            <label>
            <strong>Cancella l'ordine</strong>
              <br />
              <br />
            <input
            className="input-reset bg-red white ba b--black-20 pa2 mb2 db"
            type="button"
            name="ricaricaPagina"
            onClick={ricaricaPagina}
            value="RESET"
            />
          </label>
          </p>
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
                defaultValue="menoScarto"
              >
                <option value="menoScarto">
                  Scarto minore
                </option>
                <option value="menoBarre">Meno barre</option>
                <option value="acra">Acra</option>
              </select>
            </fieldset>
            <small id="name-desc" className="f6 db mb2">
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
                defaultValue="AL/1"
              >
                <option value="AL/1">
                  AL/1
                </option>
                <option value="AC/6">AC/6</option>
                <option value="AL/2HD">AL/2 HD</option>
                <option value="AL/2">AL/2</option>
              </select>
            </fieldset>
            <small id="name-desc" className="f6 db mb2">
              Info usata per calcolare il numero dei pacchi necessari.
            </small>
          </label>
          {(opzioni.mode !== "menoBarre") &&
            <>
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
              <small id="name-desc" className="f6 db mb2">
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
              <small id="name-desc" className="f6 db mb2">
                Lunghezza minima sfrido
              </small>
            </label>
            </>
          }
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
            <small id="name-desc" className="f6 db mb2">
              Larghezza lama (imposta 0.5 per alluminio, 0.2 per acciaio)
            </small>
          </label>
          <label className="w-third pa2">
            <strong>LUNG. BARRE</strong>
            <br />
            <br />
            <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              name="lungBarra"
              type="number"
              value={lungBarra}
              onChange={impostaLungBarra}
            />
            <small id="name-desc" className="f6 db mb2">
              Lunghezza barre di partenza
            </small>
          </label>
          
          <label className="w-third pa2">
            <strong>FUNZIONI DEBUG</strong>
            <br />
            <br />
            <input
            className="input-reset ba b--black-20 pa2 mb2 db w-100"
            type="button"
            name="debugOptions"
            onClick={visualizzaOpzioniDebug}
            value="mostra/nascondi"
            />
          </label>
          
          {debugVisual && 
            <>
            <label className="w-third pa2">
            <strong>SAMPLES</strong>
            <br />
            <br />
            <fieldset
              className="input-reset bw0 pa0 w-100"
              onChange={aggiungiPianoEsempio}
            >
              <select
                name="debug"
                className="input-reset ba b--black-20 pa2 mb2 db w-100"
                defaultValue="none"
              > 
                <option value="none">scegli</option>
                <option value="sample1">Sample 1</option>
                <option value="sample2">Sample 2</option>
                <option value="sample3">Stress test</option>
                <option value="sample4">Sample 4</option>
              </select>
            </fieldset>
            <small id="name-desc" className="f6 db mb2">
            Aggiunge un ordine di esempio.
            </small>
            </label>
            <label className="w-third pa2">
              <strong>TROVA TUTTE LE COMB</strong>
              <br />
              <br />
              <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="button"
              name="provaTrovaTutteComb"
              onClick={provaTrovaTutteComb}
              value="prova"
              />
            </label>
            <label className="w-third pa2">
              <strong>TROVA COMB MIGLIORE</strong>
              <br />
              <br />
              <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="button"
              name="provaTrovaCombMigliore"
              onClick={provaTrovaCombMigliore}
              value="prova"
              />
            </label>
            <label className="w-third pa2">
              <strong>SIMULAZ QUANTE BARRE</strong>
              <br />
              <br />
              <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="button"
              name="provaSimQuanteBarre"
              onClick={provaSimQuanteBarre}
              value="prova"
              />
              <small id="name-desc" className="f6 db mb2">
              Input: comb, ordineIntero
              </small>
            </label>
            <label className="w-third pa2">
              <strong>QUANTE BARRE CON COMB</strong>
              <br />
              <br />
              <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="button"
              name="provaQuanteBarre"
              onClick={provaQuanteBarre}
              value="prova"
              />
              <small id="name-desc" className="f6 db mb2">
              Input: comb, ordineIntero
              </small>
            </label>
            <label className="w-third pa2">
              <strong>CREA ARRAY MISURE DECRESCENTI</strong>
              <br />
              <br />
              <input
              className="input-reset ba b--black-20 pa2 mb2 db w-100"
              type="button"
              name="provaCreaArrayDecrescenteMisure"
              onClick={provaCreaArrayDecrescenteMisure}
              value="prova"
              />
              <small id="name-desc" className="f6 db mb2">
              Input: ordine
              </small>
            </label>
            </>
          }
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
            onClick={pianoDiTaglioOnClick}
            value="CREA PIANO"
          />
        </p>
        <p className="tc b">
          {stato}
        </p>
        { pianiCalcolati>0 &&
          <p className="tc b">
          Piani Calcolati: {pianiCalcolati}
        </p>
        }
        <Pianoditaglio piano={pianoDiTaglioDaRenderizzare} profilo={profilo} mode={opzioni.mode}/>
        <br /><br />
        {ordineRimasugli &&
          <>
          <Ordine ordine={ordineRimasugli} />
          </>
        }
        <br /><br />
        {pianoRef}
      </div>
    </div>
    
  );
}

export default App;
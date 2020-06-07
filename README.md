# pianoditaglio

DA FARE ADESSO:

- aggiungere dopo il counter iterazioni (iterazioni++ nel loop delle combo) un alert o qualcosa a:
    
    -100.000 iterazioni
    -500.000 iterazioni
    -1.000.000 it
    -2.000.000
    -3.000.000
    -5.000.000
    -10.000.000
    -ed all'inizio di ogni loop principale (k loop)

    che chiede se proseguire o lasciar perdere, avvertendo che potrebbe far crashare il terminalino / pc
    l'utente può dire sì o no e questo imposta la variabile continua su true o false. inglobare tutti i loop della funzione in un while (continua === true) 

UPGRADE WIP

- possibilità di eliminare misure inserite*
- stampare risultato
- gestione sfridi

modifiche da fare:

- aggiungere id ai moduli creati con i map? (necessario per * ?)

MIGLIORAMENTI MINORI

- la funz principale dovrebbe crearsi una copia dell'ordine e operare sulla copia dell'ordine, in modo da lasciare intatto l'ordine originale e non
toglierlo dal riquadro a sx.

APPUNTI

dopo aver ottimizzato la funz creaTutteLeCombo, un ordine di cinque misure dove però la più piccola è 35 (caso estremo) dà quasi 6.000.000 di iterazioni (santech non è crashato). su un ordine con una decina di misure di cui la più piccola era un 50 santech è crashato.
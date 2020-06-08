# pianoditaglio

DA FARE ADESSO:

- funzione crea ordine di esempio (per debug)
- la variabile predefinita del piano di taglio deve essere [] e sostituire il momento in cui viene creata nella funzione con un push, in modo da supportare questo: 
- quando il contabarre scarta una misura, invece di fare un array con le misure scartate deve ricreare un secondo ordine su cui eseguire un nuovo piano di taglio
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
- lodash clone() per le array fittizie

UPGRADE SUPERFUTURI

- inquadra il foglio dell'ordine per ricrearlo nell'app

MIGLIORAMENTI MINORI

- la funz principale dovrebbe crearsi una copia dell'ordine e operare sulla copia dell'ordine, in modo da lasciare intatto l'ordine originale e non
toglierlo dal riquadro a sx.

APPUNTI

dopo aver ottimizzato la funz creaTutteLeCombo, un ordine di cinque misure dove però la più piccola è 35 (caso estremo) dà quasi 6.000.000 di iterazioni (santech non è crashato). su un ordine con una decina di misure di cui la più piccola era un 50 santech è crashato.
una soluzione per le misure piccole potrebbe essere quella di inserirle. solo dopo un determinato numero di giri k(tipo a metà? o far la differenza tra tagli massimi con misura più piccola e tagli massimi con misura seconda più piccola sopra il 50 e inserirle dopo il giro di questa

# pianoditaglio

DA FARE ADESSO:

- dopo aver scelto le combo migliori vanno messe in ordine di misura 

- la variabile predefinita del piano di taglio deve essere [] e sostituire il momento in cui viene creata nella funzione con un push, in modo da supportare questo:

UPGRADE WIP

- possibilità di eliminare misure inserite
- stampare risultato
- gestione sfridi

modifiche da fare:



UPGRADE SUPERFUTURI

- inquadra il foglio dell'ordine per ricrearlo nell'app

MIGLIORAMENTI MINORI



APPUNTI


la nuova versione in riformuloquante barre dà ancora problemi sugli ordini con misure piccole, perché sono troppe le combo da escludere se le stecche delle misure piccole vengono tagliate quasi tutte subito (come è probabile che sia)



dopo aver ottimizzato la funz creaTutteLeCombo, un ordine di cinque misure dove però la più piccola è 35 (caso estremo) dà quasi 6.000.000 di iterazioni (santech non è crashato). su un ordine con una decina di misure di cui la più piccola era un 50 santech è crashato.
una soluzione per le misure piccole potrebbe essere quella di inserirle. solo dopo un determinato numero di giri k(tipo a metà? o far la differenza tra tagli massimi con misura più piccola e tagli massimi con misura seconda più piccola sopra il 50 e inserirle dopo il giro di questa

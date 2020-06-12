# pianoditaglio

DA FARE ADESSO:

- dopo aver scelto le combo migliori vanno messe in ordine di misura 

- la variabile predefinita del piano di taglio deve essere [] e sostituire il momento in cui viene creata nella funzione con un push, in modo da supportare questo: 
- quando il contabarre scarta una misura, invece di fare un array con le misure scartate deve ricreare un secondo ordine su cui eseguire un nuovo piano di taglio


UPGRADE WIP

- possibilità di eliminare misure inserite*
- stampare risultato
- gestione sfridi

modifiche da fare:

- aggiungere id ai moduli creati con i map? (necessario per * ?)

UPGRADE SUPERFUTURI

- inquadra il foglio dell'ordine per ricrearlo nell'app

MIGLIORAMENTI MINORI



APPUNTI

dopo aver ottimizzato la funz creaTutteLeCombo, un ordine di cinque misure dove però la più piccola è 35 (caso estremo) dà quasi 6.000.000 di iterazioni (santech non è crashato). su un ordine con una decina di misure di cui la più piccola era un 50 santech è crashato.
una soluzione per le misure piccole potrebbe essere quella di inserirle. solo dopo un determinato numero di giri k(tipo a metà? o far la differenza tra tagli massimi con misura più piccola e tagli massimi con misura seconda più piccola sopra il 50 e inserirle dopo il giro di questa

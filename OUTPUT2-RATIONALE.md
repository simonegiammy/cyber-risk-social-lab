# Output 2 | Perché un microsito interattivo

Testo pronto da inserire nel PDF finale. Spiega cosa è l'Output 2, perché abbiamo
scelto il formato del microsito e quali sono i suoi punti di forza.

---

## Cosa è

L'Output 2 è un microsito di apprendimento organizzativo. Non ripete l'analisi del
caso (quella è l'Output 1): la usa come esempio concreto per insegnare alcune regole
generali su come una routine quotidiana può diventare una superficie d'attacco, e su
cosa un team può davvero cambiare.

Il caso del produttore di semiconduttori, la campagna di phishing sincronizzata con il
ciclo annuale di compliance, compare solo come illustrazione. Tutto il resto è scritto
per valere anche fuori da quel caso specifico.

## Perché un microsito, e non una slide o un report

Abbiamo scelto un sito interattivo per tre motivi concreti.

1. **La materia è socio-tecnica, non solo tecnica.** Il punto del caso non è un bug,
   è il modo in cui le persone reagiscono a un segnale sociale ("il 70% l'ha già
   fatto", il collega alla pausa caffè). Un formato interattivo permette di far
   provare quel meccanismo invece di descriverlo soltanto.
2. **L'apprendimento attivo regge di più.** I mini quiz uniti alla teoria, lo scenario
   dell'email con i tre rami e lo slider del punteggio AI fanno prendere una decisione
   all'utente e poi gli spiegano il meccanismo. Si ricorda meglio una scelta fatta che
   un paragrafo letto.
3. **Tre ruoli, un solo incidente.** Operatività, rilevamento e governance vedono lo
   stesso evento in modo diverso. Una struttura a percorsi rende questa pluralità di
   prospettive immediata, cosa che un documento lineare fatica a fare.

## Punti di forza

- **Niente colpevolizzazione.** Nessun punteggio, nessun game over. Ogni opzione dei
  quiz è in parte vera e il feedback spiega il meccanismo, non chi ha sbagliato. È
  coerente con un orientamento all'apprendimento, non alla ricerca del colpevole.
- **Separazione tra esempio e regola.** Una sezione mostra come evolve un problema in
  generale, un'altra estrae le regole riutilizzabili. Il caso resta un'illustrazione,
  marcata in modo esplicito.
- **Interattività al servizio del contenuto.** Ogni elemento interattivo svela un
  meccanismo preciso, non è decorazione.
- **Bilingue.** Inglese di default, toggle per l'italiano in alto. I termini tecnici
  restano in inglese, come è normale nel dominio.
- **Accessibile e leggero.** Tema scuro coerente, tipografia monospace per i dati,
  build statica, nessuna dipendenza pesante lato utente.

## Struttura e link

Mappa delle sezioni (le ancore § corrispondono alla barra di navigazione in alto):

- `§00` Home, inquadra l'esempio e come leggerlo.
- `§01` Come evolve un problema (`/reconstruction`), lo schema generale di un'escalation,
  con l'esempio a illustrare ogni fase.
- `§02` Regole riutilizzabili (`/mechanisms`), tre lezioni con riflessione rapida.
- `§03` Tre prospettive:
  - `§03a` Operatività (`/paths/operations`), lo scenario dell'email interattivo.
  - `§03b` Rilevamento (`/paths/analyst`), lo slider controfattuale sul punteggio AI.
  - `§03c` Governance (`/paths/leadership`), come la leadership decide cosa si impara.

Repository: https://github.com/simonegiammy/cyber-risk-social-lab

Avvio locale:

```
npm install
npm run dev      # sviluppo
npm run build    # build statica di produzione
```

## Come usarlo

Si può seguire il percorso lineare dal passaggio 00 al 03 con il pulsante "Avanti" in
alto, oppure entrare direttamente da una delle tre prospettive di ruolo. Ogni card e
ogni pulsante interattivo riporta un'indicazione esplicita su dove cliccare, così non
si perde nessuna funzione.

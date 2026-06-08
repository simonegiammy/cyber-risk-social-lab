"use client";
import { createContext, useContext, useEffect, useState, useCallback } from "react";

export type Lang = "en" | "it";

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "en",
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const s = typeof window !== "undefined" ? localStorage.getItem("fad-lang") : null;
    if (s === "it" || s === "en") setLangState(s);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try { localStorage.setItem("fad-lang", l); } catch {}
    document.documentElement.lang = l;
  }, []);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

export function useT() {
  const { lang } = useContext(LangContext);
  const t = useCallback(
    (key: keyof typeof dict) => dict[key]?.[lang] ?? (dict[key]?.en ?? String(key)),
    [lang]
  );
  return { t, lang };
}

// This microsite is a worked EXAMPLE for organizational learning, not the case analysis itself
// (that is Output 1). Content is general and reusable; the Group 5 incident is only an illustration.
// Verbatim dossier quotes are cited where they add evidence. Technical / cybersec terms stay in English.
const dict = {
  // ---------- NAV / SHELL ----------
  "nav.next": { en: "Next", it: "Avanti" },
  "nav.menu": { en: "Toggle menu", it: "Apri menu" },
  "nav.start": { en: "Start", it: "Inizio" },
  "nav.anatomy": { en: "How it evolves", it: "Come evolve" },
  "nav.rules": { en: "Rules", it: "Regole" },
  "nav.perspectives": { en: "Perspectives", it: "Prospettive" },
  "lang.toggleEN": { en: "EN", it: "EN" },
  "lang.toggleIT": { en: "IT", it: "IT" },

  "role.operations": { en: "Operations", it: "Operatività" },
  "role.detection": { en: "Detection", it: "Rilevamento" },
  "role.governance": { en: "Governance", it: "Governance" },

  "footer.tag": {
    en: "a worked example for organizational learning, illustrated with one anonymized incident",
    it: "un esempio pratico per l'apprendimento organizzativo, illustrato con un incidente anonimizzato",
  },

  // ---------- LANDING ----------
  "landing.eyebrow": {
    en: "Organizational learning · a worked example · social engineering on a routine",
    it: "Apprendimento organizzativo · un esempio pratico · ingegneria sociale su una routine",
  },
  "landing.leadA": {
    en: "A reusable example for teams. We take one anonymized incident, a phishing campaign timed to an annual compliance routine, and use it to show how an everyday process becomes an attack surface, and what",
    it: "Un esempio riutilizzabile per i team. Prendiamo un incidente anonimizzato, una campagna di phishing sincronizzata con una routine di compliance annuale, e lo usiamo per mostrare come un processo quotidiano diventa una superficie d'attacco, e cosa",
  },
  "landing.leadEm": { en: "a team", it: "un team" },
  "landing.leadB": { en: "can actually change.", it: "può davvero cambiare." },
  "landing.principleLabel": { en: "HOW TO READ THIS", it: "COME LEGGERLO" },
  "landing.principleA": { en: "This is an example, not a verdict on one company, and", it: "Questo è un esempio, non un giudizio su un'azienda, e" },
  "landing.principleNot": { en: "not", it: "non" },
  "landing.principleB": {
    en: "a module about inattention. The people involved acted exactly as their system expected them to.",
    it: "un modulo sulla disattenzione. Le persone coinvolte hanno agito esattamente come il sistema si aspettava.",
  },
  "landing.ctaStart": { en: "Start the example", it: "Inizia l'esempio" },
  "landing.ctaMeta": {
    en: "3 short sections, click any card below to open it",
    it: "3 sezioni brevi, clicca una card qui sotto per aprirla",
  },
  "landing.walkLabel": { en: "THE WALKTHROUGH · CLICK A STEP", it: "IL PERCORSO · CLICCA UN PASSAGGIO" },
  "landing.roleLabel": {
    en: "OR ENTER BY ROLE · THREE PERSPECTIVES ON THE SAME EXAMPLE",
    it: "OPPURE ENTRA PER RUOLO · TRE PROSPETTIVE SULLO STESSO ESEMPIO",
  },
  "landing.enterPath": { en: "OPEN THIS PERSPECTIVE", it: "APRI QUESTA PROSPETTIVA" },
  "landing.clickHint": { en: "click to open", it: "clicca per aprire" },

  "it01.label": { en: "How a problem evolves", it: "Come evolve un problema" },
  "it01.desc": {
    en: "The general shape of an escalation, stage by stage.",
    it: "La forma generale di un'escalation, passo dopo passo.",
  },
  "it02.label": { en: "Rules you can reuse", it: "Regole riutilizzabili" },
  "it02.desc": {
    en: "Three lessons, each paired with a quick reflection.",
    it: "Tre lezioni, ognuna con una riflessione rapida.",
  },
  "it03.label": { en: "Three perspectives", it: "Tre prospettive" },
  "it03.desc": {
    en: "The same example seen from three roles. Pick one.",
    it: "Lo stesso esempio visto da tre ruoli. Scegline uno.",
  },

  "roleTitle.operations": { en: "Operations | Europe", it: "Operatività | Europa" },
  "roleTitle.detection": { en: "Detection | Analyst & Lead", it: "Rilevamento | Analista & Lead" },
  "roleTitle.governance": { en: "Governance | Leadership", it: "Governance | Leadership" },

  "layer.social": { en: "Social / cultural vulnerability", it: "Vulnerabilità sociale / culturale" },
  "layer.procedural": { en: "Procedural vulnerability", it: "Vulnerabilità procedurale" },
  "layer.organisational": { en: "Organisational vulnerability", it: "Vulnerabilità organizzativa" },

  // ---------- SECTION BANNER ----------
  "banner.reconstruction.label": { en: "GENERAL PATTERN", it: "SCHEMA GENERALE" },
  "banner.reconstruction.sub": {
    en: "how an everyday problem can escalate, with one example to illustrate",
    it: "come un problema quotidiano può degenerare, con un esempio a illustrarlo",
  },
  "banner.interpretation.label": { en: "LESSONS", it: "LEZIONI" },
  "banner.interpretation.sub": {
    en: "general rules, drawn from the example, that you can reuse",
    it: "regole generali, ricavate dall'esempio, che puoi riutilizzare",
  },
  "banner.scenario.label": { en: "PERSPECTIVE", it: "PROSPETTIVA" },
  "banner.scenario.sub": {
    en: "no game over, every choice reveals a mechanism",
    it: "nessun game over, ogni scelta svela un meccanismo",
  },
  "banner.reframe.label": { en: "PERSPECTIVE", it: "PROSPETTIVA" },
  "banner.reframe.sub": { en: "", it: "" },

  // ---------- ANATOMY (how a problem evolves) ----------
  "anat.title": { en: "How a problem evolves", it: "Come evolve un problema" },
  "anat.intro": {
    en: "Most incidents are not a single mistake, they are a sequence. Here is a general shape you can recognize early. The chip on each stage shows how it looked in our example.",
    it: "La maggior parte degli incidenti non è un singolo errore, è una sequenza. Ecco una forma generale che puoi riconoscere in anticipo. Il tag su ogni fase mostra come si è presentata nel nostro esempio.",
  },
  "anat.exampleLabel": { en: "in our example", it: "nel nostro esempio" },
  "anat.s1.t": { en: "A trusted routine", it: "Una routine fidata" },
  "anat.s1.g": { en: "A repeated, efficient process that almost nobody questions anymore.", it: "Un processo ripetuto ed efficiente che quasi nessuno mette più in discussione." },
  "anat.s1.e": { en: "An annual SSO credential renewal everyone had done before.", it: "Un rinnovo annuale delle credenziali SSO che tutti avevano già fatto." },
  "anat.s2.t": { en: "A convincing imitation", it: "Un'imitazione convincente" },
  "anat.s2.g": { en: "An attacker copies the routine closely enough to look legitimate.", it: "Un attaccante copia la routine in modo abbastanza fedele da sembrare legittima." },
  "anat.s2.e": { en: "A replica login portal with a valid certificate and the usual tone.", it: "Un portale di login clone con un certificato valido e il solito tono." },
  "anat.s3.t": { en: "A social signal forms", it: "Si forma un segnale sociale" },
  "anat.s3.g": { en: "Early compliance becomes proof that doing it is the normal thing.", it: "L'adesione iniziale diventa la prova che farlo è la cosa normale." },
  "anat.s3.e": { en: 'A reminder said about 70% of the team had already completed it.', it: "Un promemoria diceva che circa il 70% del team l'aveva già completato." },
  "anat.s4.t": { en: "Peers normalize it", it: "I colleghi lo normalizzano" },
  "anat.s4.g": { en: "Informal endorsement travels faster than any official channel.", it: "L'avallo informale viaggia più veloce di qualsiasi canale ufficiale." },
  "anat.s4.e": { en: "A mention at the coffee break removed the last hesitation.", it: "Un accenno alla pausa caffè ha tolto l'ultima esitazione." },
  "anat.s5.t": { en: "Damage accumulates quietly", it: "Il danno si accumula in silenzio" },
  "anat.s5.g": { en: "With no inline check, the problem grows without anyone noticing.", it: "Senza un controllo in linea, il problema cresce senza che nessuno se ne accorga." },
  "anat.s5.e": { en: "Around 40 sets of credentials were submitted before anyone reacted.", it: "Circa 40 set di credenziali sono stati inviati prima che qualcuno reagisse." },
  "anat.s6.t": { en: "A weak signal appears", it: "Compare un segnale debole" },
  "anat.s6.g": { en: "Detection often hangs on one log, one tool, or one person.", it: "Il rilevamento spesso dipende da un log, uno strumento o una persona." },
  "anat.s6.e": { en: "A gateway log anomaly, picked up and escalated by a single analyst.", it: "Un'anomalia nei log del gateway, notata e scalata da un solo analista." },
  "anat.s7.t": { en: "Response, and what gets learned", it: "Risposta, e cosa si impara" },
  "anat.s7.g": { en: "The real fork is whether the organization names the gaps or absorbs them.", it: "Il vero bivio è se l'organizzazione nomina le lacune o le assorbe." },
  "anat.s7.e": { en: 'Reset and review, then a choice between "functioned as designed" and honest learning.', it: 'Reset e revisione, poi una scelta tra "functioned as designed" e apprendimento onesto.' },
  "anat.navPrev": { en: "back to start", it: "torna all'inizio" },
  "anat.navNext": { en: "rules you can reuse", it: "regole riutilizzabili" },

  // ---------- RULES (merged mechanisms 1, 2, 4) ----------
  "rules.title": { en: "Rules you can reuse", it: "Regole riutilizzabili" },
  "rules.intro": {
    en: "Three lessons the example teaches, written to apply far beyond it.",
    it: "Tre lezioni che l'esempio insegna, scritte per valere ben oltre di esso.",
  },
  "rules.introEm": { en: "There is no right answer in the quizzes.", it: "Nei quiz non c'è una risposta giusta." },
  "rules.introB": {
    en: "Every option is partly true; the feedback explains the mechanism, not who was wrong.",
    it: "Ogni opzione è in parte vera; il feedback spiega il meccanismo, non chi ha sbagliato.",
  },
  "rules.ruleLabel": { en: "THE RULE", it: "LA REGOLA" },
  "rules.exampleLabel": { en: "in the example", it: "nell'esempio" },
  "rules.positiveLabel": { en: "A NORM THAT WORKED", it: "UNA NORMA CHE HA FUNZIONATO" },
  "rules.positiveBody": {
    en: "Not everything failed. The team kept a human in the loop on the AI risk score, so a borderline signal was escalated instead of auto-closed. A control is only as good as the norm that governs how people read it.",
    it: "Non tutto è andato male. Il team ha mantenuto una persona nel ciclo sul punteggio di rischio dell'AI, così un segnale incerto è stato scalato invece di chiuso in automatico. Un controllo vale quanto la norma che governa come le persone lo interpretano.",
  },
  "rules.navPrev": { en: "how a problem evolves", it: "come evolve un problema" },
  "rules.navNext": { en: "three perspectives", it: "tre prospettive" },

  "rule1.t": { en: "Efficiency and exposure are the same surface", it: "Efficienza ed esposizione sono la stessa superficie" },
  "rule1.rule": {
    en: "The more standardized and unquestioned a routine, the easier it is to imitate. Build a verification reflex for routine requests, not only for unusual ones.",
    it: "Più una routine è standardizzata e mai messa in discussione, più è facile imitarla. Costruisci un riflesso di verifica per le richieste di routine, non solo per quelle insolite.",
  },
  "rule1.ex": {
    en: "The compliance email matched the real tone so well that careful reading alone would not catch it.",
    it: "L'email di compliance imitava il tono reale così bene che la sola lettura attenta non l'avrebbe colta.",
  },
  "rule1.prompt": { en: "Why did a familiar routine make the attack easier?", it: "Perché una routine familiare ha reso l'attacco più facile?" },
  "rule1.o1": { en: "The attacker got lucky with the timing.", it: "L'attaccante è stato fortunato con il tempismo." },
  "rule1.f1": { en: "Partly, but luck is the wrong frame. A predictable annual routine is a documentable surface, not a coincidence.", it: "In parte, ma la fortuna è la cornice sbagliata. Una routine annuale prevedibile è una superficie documentabile, non una coincidenza." },
  "rule1.o2": { en: "The routine was so well rehearsed it ran without scepticism.", it: "La routine era così collaudata da girare senza scetticismo." },
  "rule1.f2": { en: "Yes. Standardized routines are operationally efficient and socially exploitable at the same time; what makes them work makes them attackable.", it: "Sì. Le routine standardizzate sono efficienti e socialmente sfruttabili allo stesso tempo; ciò che le fa funzionare le rende attaccabili." },
  "rule1.o3": { en: "More training would have caught the inconsistency.", it: "Più formazione avrebbe colto l'incongruenza." },
  "rule1.f3": { en: "Partly. The imitation was near perfect, so training aimed only at anomalies misses attacks that look like routine.", it: "In parte. L'imitazione era quasi perfetta, quindi una formazione mirata solo alle anomalie manca gli attacchi che sembrano routine." },

  "rule2.t": { en: "Social proof can make the safe choice look deviant", it: "Il social proof può far sembrare deviante la scelta sicura" },
  "rule2.rule": {
    en: "A line like 'most people already did this' reframes caution as falling behind. Never let a peer signal stand in for verification.",
    it: "Una frase come 'la maggior parte l'ha già fatto' rilegge la prudenza come un restare indietro. Non lasciare mai che un segnale tra pari sostituisca la verifica.",
  },
  "rule2.ex": {
    en: "'70% completed', plus a colleague's nod at the coffee break, did more than any urgent threat.",
    it: "'70% ha completato', più il cenno di un collega alla pausa caffè, ha fatto più di qualsiasi minaccia urgente.",
  },
  "rule2.prompt": { en: 'What did the "70% completed" line actually do?', it: 'Cosa ha fatto davvero la frase "70% ha completato"?' },
  "rule2.o1": { en: "It created urgency through a deadline.", it: "Ha creato urgenza tramite una scadenza." },
  "rule2.f1": { en: "Partly, but the message had no dramatic urgency. The subtler trick was reframing inaction as deviance from the norm.", it: "In parte, ma il messaggio non aveva urgenza drammatica. Il trucco più sottile era rileggere l'inazione come deviazione dalla norma." },
  "rule2.o2": { en: "It made not completing feel like outlier behaviour.", it: "Ha fatto sembrare il non completare un comportamento anomalo." },
  "rule2.f2": { en: "Yes. This is social proof working as a social fact; conformity pressure activates without the message having to threaten.", it: "Sì. È il social proof che funziona come fatto sociale; la pressione di conformità si attiva senza che il messaggio debba minacciare." },
  "rule2.o3": { en: "The real push came at the coffee break.", it: "La spinta vera è arrivata alla pausa caffè." },
  "rule2.f3": { en: "Also true. Peer endorsement is a secondary social proof, and a predictable outcome of the attack, not an accident.", it: "Anche vero. L'avallo tra pari è un social proof secondario, e un esito prevedibile dell'attacco, non un incidente." },

  "rule3.t": { en: "Authority at the center can leave the edges unchecked", it: "L'autorità al centro può lasciare i bordi senza controllo" },
  "rule3.rule": {
    en: "When decisions happen at the periphery with no inline control, a structural blind spot forms. Put the checkpoint where the action actually happens.",
    it: "Quando le decisioni avvengono in periferia senza un controllo in linea, si forma un punto cieco strutturale. Metti il checkpoint dove l'azione accade davvero.",
  },
  "rule3.ex": {
    en: "Staff reached the credential portal with no verification step in between.",
    it: "Lo staff raggiungeva il portale credenziali senza alcun passaggio di verifica in mezzo.",
  },
  "rule3.prompt": { en: "Where did the verification really fail?", it: "Dove ha fallito davvero la verifica?" },
  "rule3.o1": { en: "At the individual decision to click.", it: "Nella decisione individuale di cliccare." },
  "rule3.f1": { en: "Partly. Individual scrutiny matters, but the gap was structural: nothing checked the request between the inbox and the portal.", it: "In parte. Lo scrutinio individuale conta, ma la lacuna era strutturale: nulla verificava la richiesta tra la posta e il portale." },
  "rule3.o2": { en: "At the architecture, central authority left the periphery exposed.", it: "Nell'architettura, l'autorità centrale lasciava esposta la periferia." },
  "rule3.f2": { en: "Yes. Authority concentrated at the top, autonomy at the edges, and no checkpoint where the real action happened.", it: "Sì. Autorità concentrata al vertice, autonomia ai bordi, e nessun checkpoint dove l'azione reale accadeva." },
  "rule3.o3": { en: "At the AI tool's risk score.", it: "Nel punteggio di rischio dello strumento AI." },
  "rule3.f3": { en: "Partly, but the AI behaved correctly and escalated. The real blind spot was upstream, in the credential flow itself.", it: "In parte, ma l'AI si è comportata correttamente e ha scalato. Il vero punto cieco era a monte, nel flusso credenziali stesso." },

  // ReflectionPoint static labels
  "reflection.label": { en: "QUICK REFLECTION · no score, every option is partly true", it: "RIFLESSIONE RAPIDA · nessun punteggio, ogni opzione è in parte vera" },
  "reflection.feedback": { en: "feedback", it: "feedback" },

  // ---------- PATH FRAME ----------
  "path.rolePath": { en: "PERSPECTIVE", it: "PROSPETTIVA" },
  "col.happened": { en: "WHAT HAPPENED", it: "COSA È SUCCESSO" },
  "col.reveals": { en: "WHAT IT REVEALS", it: "COSA RIVELA" },
  "col.changes": { en: "WHAT WE CHANGED", it: "COSA ABBIAMO CAMBIATO" },
  "roleswitch.label": { en: "SWITCH PERSPECTIVE", it: "CAMBIA PROSPETTIVA" },

  // ---------- OPERATIONS ----------
  "ops.title": { en: "The email arrives. What do you do?", it: "L'email arriva. Cosa fai?" },
  "ops.happened1": { en: "A routine-looking email asked staff to renew their credentials.", it: "Un'email dall'aspetto di routine chiedeva allo staff di rinnovare le credenziali." },
  "ops.happened2": { en: "Many complied quickly, a few waited.", it: "Molti hanno aderito subito, alcuni hanno aspettato." },
  "ops.happened3": { en: "A coffee-break mention spread it across the team.", it: "Un accenno alla pausa caffè l'ha diffusa nel team." },
  "ops.reveals1": { en: "The email was indistinguishable from a real one, so reading it carefully would not help.", it: "L'email era indistinguibile da una vera, quindi leggerla con attenzione non sarebbe servito." },
  "ops.reveals2": { en: "Its formal format carried the authority of the organization itself.", it: "Il suo formato formale portava l'autorità dell'organizzazione stessa." },
  "ops.reveals3": { en: "Nothing verified the request between the inbox and the credential portal.", it: "Nulla verificava la richiesta tra la posta e il portale credenziali." },
  "ops.changes1": { en: "Credential renewals never start from an email link, only from the intranet.", it: "I rinnovi delle credenziali non partono mai da un link in email, solo dall'intranet." },
  "ops.changes2": { en: "An independent mobile authenticator confirms identity out of band.", it: "Un mobile authenticator indipendente conferma l'identità fuori banda." },
  "ops.changes3": { en: "We train a verification reflex for routine requests, not just anomalies.", it: "Alleniamo un riflesso di verifica per le richieste di routine, non solo per le anomalie." },
  "ops.scenarioLabel": { en: "TRY IT · NO GAME OVER · EVERY CHOICE REVEALS A MECHANISM", it: "PROVA · NESSUN GAME OVER · OGNI SCELTA SVELA UN MECCANISMO" },
  "ops.scenarioTitle": { en: "Wednesday, 10:31. Inbox.", it: "Mercoledì, 10:31. Posta in arrivo." },
  "ops.scenarioHint": { en: "Pick one of the three buttons below to see what happens.", it: "Scegli uno dei tre pulsanti qui sotto per vedere cosa succede." },
  "ops.mail.subjectLabel": { en: "Subject:", it: "Oggetto:" },
  "ops.mail.subject": { en: "Annual SSO credential renewal, completion reminder", it: "Rinnovo annuale credenziali SSO, promemoria di completamento" },
  "ops.mail.ssl": { en: "valid certificate", it: "certificato valido" },
  "ops.mail.dear": { en: "Dear colleague,", it: "Gentile collega," },
  "ops.mail.bodyA": { en: "Approximately", it: "Circa il" },
  "ops.mail.bodyB": { en: "of your department has already completed the annual SSO renewal. Please complete the process by end of week to avoid administrative action.", it: "del tuo reparto ha già completato il rinnovo annuale SSO. Completa la procedura entro fine settimana per evitare provvedimenti amministrativi." },
  "ops.mail.link": { en: "Renew credentials [sso.group5-corp.intra/renewal]", it: "Rinnova le credenziali [sso.group5-corp.intra/renewal]" },
  "ops.mail.signoff": { en: "Group 5 Compliance Team", it: "Team Compliance Group 5" },
  "ops.btn.click": { en: "[A] Click & complete", it: "[A] Clicca e completa" },
  "ops.btn.defer": { en: "[B] Defer, read it later", it: "[B] Rinvia, la leggo dopo" },
  "ops.btn.verify": { en: "[C] Open intranet to verify", it: "[C] Apri l'intranet per verificare" },
  "ops.seeMechanism": { en: "see this rule in the lessons", it: "vedi questa regola nelle lezioni" },
  "ops.navPrev": { en: "rules", it: "regole" },
  "ops.navNext": { en: "detection", it: "rilevamento" },
  "ops.br.click.title": { en: "You clicked immediately.", it: "Hai cliccato subito." },
  "ops.br.click.body": {
    en: "You are in the first wave, the group that completes the process at once. At this point the social proof number does not even need to fire, you are generating it. The mechanism in play is routine alignment: the request arrived inside a familiar annual process.",
    it: "Sei nella prima ondata, il gruppo che completa subito la procedura. A questo punto il numero del social proof non ha nemmeno bisogno di attivarsi, lo stai generando tu. Il meccanismo in gioco è l'allineamento alla routine: la richiesta è arrivata dentro un processo annuale familiare.",
  },
  "ops.br.defer.title": { en: "You waited, then a colleague mentioned it at the coffee break.", it: "Hai aspettato, poi un collega te ne ha parlato alla pausa caffè." },
  "ops.br.defer.body": {
    en: "This is the risky branch, and a predictable outcome of the attack. Peer endorsement removes perceived risk and shifts the verification burden onto the group. A formal channel could not have produced that credibility, the informal one did, automatically.",
    it: "È il ramo rischioso, e un esito prevedibile dell'attacco. L'avallo tra pari rimuove il rischio percepito e sposta l'onere della verifica sul gruppo. Un canale formale non avrebbe potuto produrre quella credibilità, quello informale sì, automaticamente.",
  },
  "ops.br.verify.title": { en: "You opened the intranet to verify.", it: "Hai aperto l'intranet per verificare." },
  "ops.br.verify.body": {
    en: "This is the reflex the new system asks for. But here is the systemic point: your single action would not have stopped the campaign on its own. Individual vigilance is necessary but not sufficient, the fix has to be structural (no email links, out-of-band verification).",
    it: "È il riflesso che il nuovo sistema richiede. Ma ecco il punto sistemico: il tuo singolo gesto non avrebbe fermato la campagna da solo. La vigilanza individuale è necessaria ma non sufficiente, la soluzione deve essere strutturale (niente link in email, verifica fuori banda).",
  },

  // ---------- ANALYST ----------
  "an.title": { en: "A weak signal, a single analyst, a few days.", it: "Un segnale debole, un solo analista, qualche giorno." },
  "an.happened1": { en: "A gateway log anomaly surfaced during a daily stand-up.", it: "Un'anomalia nei log del gateway è emersa in uno stand-up giornaliero." },
  "an.happened2": { en: "A junior analyst checked it with an AI tool, got a medium-risk score, and escalated.", it: "Un analista junior l'ha controllata con uno strumento AI, ha ottenuto un rischio medio e ha scalato." },
  "an.happened3": { en: "IT confirmed the phishing only a few days later.", it: "L'IT ha confermato il phishing solo qualche giorno dopo." },
  "an.reveals1": { en: "Detection depended on a single analyst and one tool.", it: "Il rilevamento dipendeva da un solo analista e da uno strumento." },
  "an.reveals2": { en: "A few days passed before confirmation, the damage was already done.", it: "Sono passati alcuni giorni prima della conferma, il danno era già fatto." },
  "an.reveals3": { en: "Keeping a human in the loop on the AI score is what saved it.", it: "Mantenere una persona nel ciclo sul punteggio dell'AI è ciò che l'ha salvata." },
  "an.changes1": { en: "Add redundant detection and senior oversight, so it never rests on one person.", it: "Aggiungere rilevamento ridondante e supervisione senior, così non dipende mai da una sola persona." },
  "an.cfLabel": { en: "WHAT-IF · drag the slider to change the AI score", it: "E SE · trascina lo slider per cambiare il punteggio AI" },
  "an.cfTitle": { en: "Slide the AI risk score.", it: "Sposta il punteggio di rischio AI." },
  "an.cfHint": { en: "Drag the handle below and watch the verdict change.", it: "Trascina la maniglia qui sotto e guarda cambiare il verdetto." },
  "an.range.low": { en: "LOW", it: "BASSO" },
  "an.range.mid": { en: "MEDIUM (actual ≈50)", it: "MEDIO (reale ≈50)" },
  "an.range.high": { en: "HIGH", it: "ALTO" },
  "an.verdict": { en: "verdict:", it: "verdetto:" },
  "an.out.low.label": { en: "LOW, auto-closed", it: "BASSO, chiuso in automatico" },
  "an.out.low.body": { en: "The AI returns low risk. Without a norm that forces escalation, the case is closed at the analyst's desk and the campaign keeps running. This is the counterfactual the example warns about.", it: "L'AI restituisce rischio basso. Senza una norma che imponga l'escalation, il caso si chiude alla scrivania dell'analista e la campagna continua. È il controfattuale da cui l'esempio mette in guardia." },
  "an.out.mid.label": { en: "MEDIUM, escalated (actual)", it: "MEDIO, scalato (reale)" },
  "an.out.mid.body": { en: "This is what happened. The score was medium and the human-in-the-loop norm pushed the signal up instead of absorbing it. Detection worked, barely, and a few days late.", it: "È ciò che è successo. Il punteggio era medio e la norma human-in-the-loop ha spinto il segnale verso l'alto invece di assorbirlo. Il rilevamento ha funzionato, di misura, e con qualche giorno di ritardo." },
  "an.out.high.label": { en: "HIGH, flagged automatically", it: "ALTO, segnalato in automatico" },
  "an.out.high.body": { en: "Faster flag, but still routed through the same single-analyst path. The structural single point of failure is still there.", it: "Segnalazione più rapida, ma sempre instradata sullo stesso percorso a singolo analista. Il single point of failure strutturale resta." },
  "an.navPrev": { en: "operations", it: "operatività" },
  "an.navNext": { en: "governance", it: "governance" },

  // ---------- LEADERSHIP (generic, brief) ----------
  "ld.title": { en: "Did the system function, or did it absorb its own failure?", it: "Il sistema ha funzionato, o ha assorbito il proprio fallimento?" },
  "ld.intro": {
    en: "Leadership rarely decides the incident, it decides what the organization learns from it. The general choice is the same everywhere: name the gaps, or fold them into a story of resilience.",
    it: "La leadership raramente decide l'incidente, decide cosa l'organizzazione impara da esso. La scelta generale è la stessa ovunque: nominare le lacune, o ripiegarle in una storia di resilienza.",
  },
  "ld.framedLabel": { en: "TWO WAYS TO CLOSE A RETROSPECTIVE", it: "DUE MODI DI CHIUDERE UN RETROSPETTIVO" },
  "ld.framedA": { en: '"It functioned as designed."', it: '"Ha funzionato come previsto."' },
  "ld.framedAbody": { en: "Comforting, and it quietly buries the gaps in detection speed, preparedness, and architecture.", it: "Rassicurante, e seppellisce in silenzio le lacune in velocità di rilevamento, preparazione e architettura." },
  "ld.framedB": { en: "Name the gaps.", it: "Nomina le lacune." },
  "ld.framedBbody": { en: "A true learning orientation names the failures instead of absorbing them into institutional resilience.", it: "Un vero orientamento all'apprendimento nomina i fallimenti invece di assorbirli nella resilienza istituzionale." },
  "ld.exampleNote": { en: "In our example, the difference is concrete. Here are the numbers, before and after the intervention.", it: "Nel nostro esempio, la differenza è concreta. Ecco i numeri, prima e dopo l'intervento." },
  "ld.interventionLabel": { en: "OUR INTERVENTION · cost vs friction (example figures)", it: "IL NOSTRO INTERVENTO · costo e attrito (cifre d'esempio)" },
  "ld.toggle.before": { en: "before, email-initiated", it: "prima, avviato via email" },
  "ld.toggle.after": { en: "after, intranet + mobile authenticator", it: "dopo, intranet + mobile authenticator" },
  "ld.stat.compromised": { en: "Compromised accounts", it: "Account compromessi" },
  "ld.stat.lag": { en: "Detection lag", it: "Ritardo di rilevamento" },
  "ld.stat.oob": { en: "Out-of-band check", it: "Verifica fuori banda" },
  "ld.stat.oob.none": { en: "none", it: "assente" },
  "ld.stat.lag.val": { en: "a few days", it: "qualche giorno" },
  "ld.stat.cost": { en: "Integration cost", it: "Costo di integrazione" },
  "ld.stat.friction": { en: "Friction / employee / cycle", it: "Attrito / dipendente / ciclo" },
  "ld.stat.friction.val": { en: "10 to 15 min", it: "10-15 min" },
  "ld.stat.oob.auth": { en: "mobile authenticator", it: "mobile authenticator" },
  "ld.navPrev": { en: "detection", it: "rilevamento" },
  "ld.navNext": { en: "back to start", it: "torna all'inizio" },
} as const;

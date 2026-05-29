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

// Verbatim dossier quotes («…») are NOT translated — they are cited source material.
// Technical cybersec terms (phishing, compliance, SSO, OOB, TLS, log, CSIRT…) kept as loanwords.
const dict = {
  // ---------- NAV / SHELL ----------
  "nav.next": { en: "Next", it: "Avanti" },
  "nav.menu": { en: "Toggle menu", it: "Apri menu" },
  "nav.start": { en: "Start", it: "Inizio" },
  "nav.reconstruction": { en: "Reconstruction", it: "Ricostruzione" },
  "nav.mechanisms": { en: "Mechanisms", it: "Meccanismi" },
  "nav.perspectives": { en: "Perspectives", it: "Prospettive" },
  "nav.reframing": { en: "Reframing", it: "Rilettura" },
  "lang.toggleEN": { en: "EN", it: "EN" },
  "lang.toggleIT": { en: "IT", it: "IT" },

  "role.operations": { en: "Operations", it: "Operatività" },
  "role.detection": { en: "Detection", it: "Rilevamento" },
  "role.governance": { en: "Governance", it: "Governance" },

  "footer.tag": {
    en: "sourced verbatim from technical dossier — group 5",
    it: "fonti verbatim dal dossier tecnico — group 5",
  },

  // ---------- LANDING ----------
  "landing.eyebrow": {
    en: "Group 5 / Semiconductors · annual compliance cycle · phishing campaign",
    it: "Group 5 / Semiconduttori · ciclo di compliance annuale · campagna di phishing",
  },
  "landing.leadA": {
    en: "An organisational learning microsite. We re-open a retrospective that closed too cleanly — and ask what",
    it: "Un microsito di apprendimento organizzativo. Riapriamo un retrospettivo chiuso troppo in fretta — e ci chiediamo cosa",
  },
  "landing.leadEm": { en: '"as designed"', it: '"as designed"' },
  "landing.leadB": { en: "chose not to name.", it: "ha scelto di non nominare." },
  "landing.principleLabel": { en: "PRINCIPLE", it: "PRINCIPIO" },
  "landing.principleA": { en: "This is", it: "Questo" },
  "landing.principleNot": { en: "not", it: "non" },
  "landing.principleB": {
    en: "a module about inattention.",
    it: "è un modulo sulla disattenzione.",
  },
  "landing.ctaStart": { en: "Start the walkthrough", it: "Inizia il percorso" },
  "landing.ctaMeta": {
    en: "4 sections · ~10 min · or jump to a role below",
    it: "4 sezioni · ~10 min · oppure salta a un ruolo qui sotto",
  },
  "landing.walkLabel": { en: "THE WALKTHROUGH · §01 → §04", it: "IL PERCORSO · §01 → §04" },
  "landing.roleLabel": {
    en: "OR ENTER BY ROLE · §03 PERSPECTIVES",
    it: "OPPURE ENTRA PER RUOLO · §03 PROSPETTIVE",
  },
  "landing.enterPath": { en: "ENTER PATH", it: "ENTRA NEL PERCORSO" },

  "it01.label": { en: "Reconstruction", it: "Ricostruzione" },
  "it01.desc": {
    en: "The three days, fact by fact. No interpretation yet.",
    it: "I tre giorni, fatto per fatto. Ancora nessuna interpretazione.",
  },
  "it02.label": { en: "Mechanisms", it: "Meccanismi" },
  "it02.desc": {
    en: "Why it worked — Nelson & Winter, Cialdini, Goffman, Mintzberg.",
    it: "Perché ha funzionato — Nelson & Winter, Cialdini, Goffman, Mintzberg.",
  },
  "it03.label": { en: "Perspectives", it: "Prospettive" },
  "it03.desc": {
    en: "The same incident from three roles. Pick yours.",
    it: "Lo stesso incidente da tre ruoli. Scegli il tuo.",
  },
  "it04.label": { en: "Reframing", it: "Rilettura" },
  "it04.desc": {
    en: 'What "functioned as designed" left unnamed.',
    it: 'Ciò che "functioned as designed" ha lasciato senza nome.',
  },

  "roleTitle.operations": { en: "Operations — Europe", it: "Operatività — Europa" },
  "roleTitle.detection": { en: "Detection — Analyst & Lead", it: "Rilevamento — Analista & Lead" },
  "roleTitle.governance": { en: "Governance — Managing Board", it: "Governance — Managing Board" },

  "layer.social": { en: "Social / Cultural vulnerability", it: "Vulnerabilità sociale / culturale" },
  "layer.procedural": { en: "Procedural vulnerability", it: "Vulnerabilità procedurale" },
  "layer.organisational": { en: "Organisational vulnerability", it: "Vulnerabilità organizzativa" },

  // ---------- SECTION BANNER ----------
  "banner.reconstruction.label": { en: "MODE: RECONSTRUCTION", it: "MODALITÀ: RICOSTRUZIONE" },
  "banner.reconstruction.sub": {
    en: "facts only — interpretation begins in §02",
    it: "solo fatti — l'interpretazione inizia in §02",
  },
  "banner.interpretation.label": { en: "MODE: INTERPRETATION", it: "MODALITÀ: INTERPRETAZIONE" },
  "banner.interpretation.sub": {
    en: "Nelson & Winter · Cialdini · Goffman · Mintzberg",
    it: "Nelson & Winter · Cialdini · Goffman · Mintzberg",
  },
  "banner.scenario.label": { en: "MODE: SCENARIO", it: "MODALITÀ: SCENARIO" },
  "banner.scenario.sub": {
    en: "no game over — every branch reveals a mechanism",
    it: "nessun game over — ogni ramo svela un meccanismo",
  },
  "banner.reframe.label": { en: "MODE: REFRAME", it: "MODALITÀ: RILETTURA" },
  "banner.reframe.sub": {
    en: 'naming what "functioned as designed" left unnamed',
    it: 'nominare ciò che "functioned as designed" ha lasciato senza nome',
  },

  // ---------- RECONSTRUCTION ----------
  "recon.title": { en: "Reconstruction.", it: "Ricostruzione." },
  "recon.legend.attack": { en: "attack vector", it: "vettore d'attacco" },
  "recon.legend.social": { en: "informal / social", it: "informale / sociale" },
  "recon.legend.detection": { en: "detection", it: "rilevamento" },
  "recon.legend.response": { en: "response", it: "risposta" },
  "recon.expand": { en: "expand →", it: "espandi →" },
  "recon.close": { en: "[ ✕ close ]", it: "[ ✕ chiudi ]" },
  "recon.seeMechanism": { en: "→ see mechanism in §02", it: "→ vedi meccanismo in §02" },
  "recon.navPrev": { en: "← §00 landing", it: "← §00 home" },
  "recon.navNext": { en: "§02 mechanisms unpacked →", it: "§02 meccanismi svelati →" },

  "n.time.day": { en: "day", it: "giornata" },
  "n.time.morning": { en: "morning", it: "mattina" },

  "node.n1": { en: "Phishing emails distributed", it: "Email di phishing distribuite" },
  "node.n2": { en: "Replica SSO portal — valid TLS", it: "Portale SSO clone — TLS valido" },
  "node.n3": { en: "Some complete, others defer", it: "Alcuni completano, altri rinviano" },
  "node.n4": { en: 'Follow-up: "≈70% completed"', it: 'Follow-up: "≈70% ha completato"' },
  "node.n5": { en: "Reframed as outlier behavior", it: "Inazione riletta come anomalia" },
  "node.n6": { en: "☕ Coffee break endorsement", it: "☕ Avallo alla pausa caffè" },
  "node.n6b": { en: "Predictable structural outcome", it: "Esito strutturale prevedibile" },
  "node.n7": { en: "≈40 credentials submitted", it: "≈40 credenziali inviate" },
  "node.n8": { en: "Gateway log anomaly flagged", it: "Anomalia nei log del gateway" },
  "node.n9": { en: "Speak-up culture activates", it: "La speak-up culture si attiva" },
  "node.n10": { en: "Junior analyst → AI tool → escalation", it: "Analista junior → tool AI → escalation" },
  "node.n11": { en: "IT confirms: different URL, no email links", it: "L'IT conferma: URL diverso, niente link via email" },
  "node.n12": { en: "CSIRT activation · advisory · forced reset", it: "Attivazione CSIRT · advisory · reset forzato" },
  "node.n13": { en: "Compromised accounts accessed critical files", it: "Account compromessi hanno aperto file critici" },
  "node.n14": { en: "Managing Board session", it: "Sessione del Managing Board" },
  "node.n15": { en: "Systems-level retrospective initiated", it: "Avviato retrospettivo a livello di sistema" },

  // ---------- MECHANISMS ----------
  "mech.title": { en: "Mechanism unpacked.", it: "Meccanismi, svelati." },
  "mech.intro": {
    en: "Four mechanisms that compounded. Each has a theorist, a verbatim claim from the dossier, and a reflection point.",
    it: "Quattro meccanismi che si sono sommati. Ognuno ha un teorico, una citazione verbatim dal dossier e un reflection point.",
  },
  "mech.introEm": { en: "There is no right answer.", it: "Non esiste una risposta giusta." },
  "mech.introB": {
    en: "Every option is partially true; the feedback explains the mechanism — not who was wrong.",
    it: "Ogni opzione è in parte vera; il feedback spiega il meccanismo — non chi ha sbagliato.",
  },
  "mech.positiveLabel": { en: "M·05 · POSITIVE MECHANISM", it: "M·05 · MECCANISMO POSITIVO" },
  "mech.positiveTitle": { en: "AI-in-the-loop worked.", it: "L'AI-in-the-loop ha funzionato." },
  "mech.navPrev": { en: "← §01 reconstruction", it: "← §01 ricostruzione" },
  "mech.navNext": { en: "§03 role paths →", it: "§03 percorsi per ruolo →" },

  "mech.m1.title": { en: "Temporal & contextual alignment", it: "Allineamento temporale e contestuale" },
  "mech.m1.prompt": { en: "Why did the timing of the attack work?", it: "Perché il timing dell'attacco ha funzionato?" },
  "mech.m1.o1": { en: "The attacker got lucky with the compliance window.", it: "L'attaccante è stato fortunato con la finestra di compliance." },
  "mech.m1.f1": { en: "Partial. Luck is the wrong frame. The compliance routine is annual and predictable — it's a documentable surface, not a coincidence.", it: "In parte. La fortuna è la cornice sbagliata. La routine di compliance è annuale e prevedibile — una superficie documentabile, non una coincidenza." },
  "mech.m1.o2": { en: "The routine was so well-rehearsed that it ran without scepticism.", it: "La routine era così collaudata da girare senza scetticismo." },
  "mech.m1.f2": { en: "Yes — Nelson & Winter: standardised routines are operationally efficient and socially exploitable simultaneously. The very thing that makes them work made them attackable.", it: "Sì — Nelson & Winter: le routine standardizzate sono al tempo stesso efficienti e socialmente sfruttabili. Ciò che le fa funzionare le rende attaccabili." },
  "mech.m1.o3": { en: "Training would have caught the inconsistency.", it: "La formazione avrebbe colto l'incongruenza." },
  "mech.m1.f3": { en: "Partial. The email mimicked tone perfectly (p.6: « flawlessly mimicked the formal corporate tone »). Training on anomalies misses attacks that look like routine.", it: "In parte. L'email imitava il tono alla perfezione (p.6: « flawlessly mimicked the formal corporate tone »). La formazione sulle anomalie manca gli attacchi che sembrano routine." },

  "mech.m2.title": { en: "Two-level social proof", it: "Social proof a due livelli" },
  "mech.m2.prompt": { en: 'What did the "70% completed" line actually do?', it: 'Cosa ha fatto davvero la frase "70% ha completato"?' },
  "mech.m2.o1": { en: "It created urgency through a deadline.", it: "Ha creato urgenza tramite una scadenza." },
  "mech.m2.f1": { en: "Partial. The dossier explicitly notes the message lacked dramatic urgency. The trick is subtler: it reframed inaction as deviance from the norm.", it: "In parte. Il dossier nota esplicitamente che il messaggio era privo di urgenza drammatica. Il trucco è più sottile: ha riletto l'inazione come deviazione dalla norma." },
  "mech.m2.o2": { en: "It made non-completion feel like outlier behaviour.", it: "Ha fatto sembrare il non-completamento un comportamento anomalo." },
  "mech.m2.f2": { en: "Yes — this is social proof functioning as a *social fact*. Conformity pressure activates without the email having to threaten.", it: "Sì — è il social proof che funziona come *fatto sociale*. La pressione di conformità si attiva senza che l'email debba minacciare." },
  "mech.m2.o3": { en: "The real damage came at the coffee break.", it: "Il danno vero è arrivato alla pausa caffè." },
  "mech.m2.f3": { en: "Also yes. The peer endorsement was a secondary social proof — and a predictable structural outcome, not an accident.", it: "Anche questo. L'avallo del collega è stato un social proof secondario — un esito strutturale prevedibile, non un incidente." },

  "mech.m3.title": { en: "Standardisation paradox", it: "Paradosso della standardizzazione" },
  "mech.m3.prompt": { en: "Why didn't staff spot the email as suspicious?", it: "Perché lo staff non ha riconosciuto l'email come sospetta?" },
  "mech.m3.o1": { en: "They didn't read it carefully enough.", it: "Non l'hanno letta con abbastanza attenzione." },
  "mech.m3.f1": { en: "No. The dossier is explicit: the email was indistinguishable from legitimate ones. Attention wouldn't have helped.", it: "No. Il dossier è esplicito: l'email era indistinguibile da quelle legittime. L'attenzione non avrebbe aiutato." },
  "mech.m3.o2": { en: "The formal tone is exactly what the system rewards.", it: "Il tono formale è esattamente ciò che il sistema premia." },
  "mech.m3.f2": { en: "Yes — Goffman's impression management. The attacker performed the identity of the compliance infrastructure. Staff acted as the system expected them to.", it: "Sì — l'impression management di Goffman. L'attaccante ha performato l'identità dell'infrastruttura di compliance. Lo staff ha agito come il sistema si aspettava." },
  "mech.m3.o3": { en: "OOB verification was the missing technical control.", it: "La verifica OOB era il controllo tecnico mancante." },
  "mech.m3.f3": { en: "True at the technical layer. But even with OOB, the symbolic legitimacy of the email would still nudge people to proceed. The problem is sociotechnical, not purely technical.", it: "Vero a livello tecnico. Ma anche con l'OOB, la legittimità simbolica dell'email avrebbe comunque spinto a procedere. Il problema è sociotecnico, non puramente tecnico." },

  "mech.m4.title": { en: "Operational periphery as blind spot", it: "La periferia operativa come punto cieco" },
  "mech.m4.prompt": { en: "Where did the verification fail?", it: "Dove ha fallito la verifica?" },
  "mech.m4.o1": { en: "At the individual decision to click.", it: "Nella decisione individuale di cliccare." },
  "mech.m4.f1": { en: "Partial. Individual scrutiny matters, but the dossier names a *structural* gap: no in-line verification mechanism between staff and the credential portal.", it: "In parte. Lo scrutinio individuale conta, ma il dossier indica un gap *strutturale*: nessun meccanismo di verifica in linea tra staff e portale credenziali." },
  "mech.m4.o2": { en: "At the architecture: centralised authority leaves the periphery exposed.", it: "Nell'architettura: l'autorità centralizzata lascia esposta la periferia." },
  "mech.m4.f2": { en: "Yes. Mintzberg's structural shadow — strategic authority concentrated at the top, operational autonomy at the periphery with no verification.", it: "Sì. La structural shadow di Mintzberg — autorità strategica concentrata al vertice, autonomia operativa in periferia senza verifica." },
  "mech.m4.o3": { en: "At the AI tool's risk rating.", it: "Nel punteggio di rischio del tool AI." },
  "mech.m4.f3": { en: "Partial — but the AI tool actually behaved correctly (medium-risk, escalated). The real shadow was upstream: the credential flow itself had no checkpoint.", it: "In parte — ma il tool AI si è comportato correttamente (medium-risk, escalation). L'ombra vera era a monte: il flusso credenziali non aveva checkpoint." },

  // ReflectionPoint static labels
  "reflection.label": { en: "REFLECTION POINT — no scoring, every option is partially true", it: "REFLECTION POINT — nessun punteggio, ogni opzione è in parte vera" },
  "reflection.feedback": { en: "feedback →", it: "feedback →" },

  // ---------- PATH FRAME ----------
  "path.rolePath": { en: "ROLE PATH", it: "PERCORSO RUOLO" },
  "col.happened": { en: "WHAT HAPPENED", it: "COSA È SUCCESSO" },
  "col.reveals": { en: "WHAT IT REVEALS", it: "COSA RIVELA" },
  "col.changes": { en: "WHAT CHANGES", it: "COSA CAMBIA" },
  "roleswitch.label": { en: "SWITCH ROLE →", it: "CAMBIA RUOLO →" },

  // ---------- OPERATIONS ----------
  "ops.title": { en: "The email arrives. What do you do?", it: "L'email arriva. Cosa fai?" },
  "ops.scenarioLabel": { en: "SCENARIO · NO GAME OVER · EVERY BRANCH REVEALS A MECHANISM", it: "SCENARIO · NESSUN GAME OVER · OGNI RAMO SVELA UN MECCANISMO" },
  "ops.scenarioTitle": { en: "Wednesday, 10:31 AM. Inbox.", it: "Mercoledì, 10:31. Posta in arrivo." },
  "ops.mail.subjectLabel": { en: "Subject:", it: "Oggetto:" },
  "ops.mail.subject": { en: "Annual SSO credential renewal — completion reminder", it: "Rinnovo annuale credenziali SSO — promemoria di completamento" },
  "ops.mail.ssl": { en: "valid certificate", it: "certificato valido" },
  "ops.mail.dear": { en: "Dear colleague,", it: "Gentile collega," },
  "ops.mail.bodyA": { en: "Approximately", it: "Circa il" },
  "ops.mail.bodyB": { en: "of your department has already completed the annual SSO renewal. Please complete the process by end of week to avoid administrative action.", it: "del tuo reparto ha già completato il rinnovo annuale SSO. Completa la procedura entro fine settimana per evitare provvedimenti amministrativi." },
  "ops.mail.link": { en: "→ Renew credentials [sso.group5-corp.intra/renewal]", it: "→ Rinnova le credenziali [sso.group5-corp.intra/renewal]" },
  "ops.mail.signoff": { en: "— Group 5 Compliance Team", it: "— Team Compliance Group 5" },
  "ops.btn.click": { en: "→ [A] Click & complete", it: "→ [A] Clicca e completa" },
  "ops.btn.defer": { en: "→ [B] Defer — read it later", it: "→ [B] Rinvia — la leggo dopo" },
  "ops.btn.verify": { en: "→ [C] Open intranet to verify", it: "→ [C] Apri l'intranet per verificare" },
  "ops.seeMechanism": { en: "→ see this mechanism in §02", it: "→ vedi questo meccanismo in §02" },
  "ops.navPrev": { en: "← §02 mechanisms", it: "← §02 meccanismi" },
  "ops.navNext": { en: "§03b detection →", it: "§03b rilevamento →" },
  "ops.br.click.title": { en: "You clicked immediately.", it: "Hai cliccato subito." },
  "ops.br.click.body": {
    en: "The first wave. You're in the bucket of staff the dossier classifies as having completed the process immediately. At this point the social proof statistic doesn't even need to fire — you're generating it. The mechanism active is temporal alignment: the email arrived inside an annual routine you've performed before.",
    it: "La prima ondata. Sei nel gruppo di staff che il dossier classifica come chi ha completato la procedura immediatamente. A questo punto la statistica di social proof non ha nemmeno bisogno di attivarsi — la stai generando tu. Il meccanismo attivo è l'allineamento temporale: l'email è arrivata dentro una routine annuale che hai già svolto.",
  },
  "ops.br.defer.title": { en: "You waited. A colleague mentioned it at the coffee break.", it: "Hai aspettato. Un collega te ne ha parlato alla pausa caffè." },
  "ops.br.defer.body": {
    en: "This is the dangerous branch — and the one the dossier names as a predictable structural outcome. Peer endorsement removes perceived risk; diffusion of responsibility shifts the verification burden onto the collective. The formal channel could not have produced this credibility. The informal one did, automatically.",
    it: "È il ramo pericoloso — e quello che il dossier definisce un esito strutturale prevedibile. L'avallo del collega rimuove il rischio percepito; la diffusione di responsabilità sposta l'onere della verifica sul collettivo. Il canale formale non avrebbe potuto produrre questa credibilità. Quello informale sì, automaticamente.",
  },
  "ops.br.verify.title": { en: "You opened the intranet to verify.", it: "Hai aperto l'intranet per verificare." },
  "ops.br.verify.body": {
    en: "This is the reflex the new system requires (§04). But here is the uncomfortable systemic point: your single act would not have stopped the campaign. Forty colleagues compromised credentials. Individual vigilance is necessary but not sufficient — the fix is structural (no email links, OOB verification).",
    it: "È il riflesso che il nuovo sistema richiede (§04). Ma ecco il punto sistemico scomodo: il tuo singolo gesto non avrebbe fermato la campagna. Quaranta colleghi hanno compromesso le credenziali. La vigilanza individuale è necessaria ma non sufficiente — la soluzione è strutturale (niente link via email, verifica OOB).",
  },

  // ---------- ANALYST ----------
  "an.title": { en: "A weak signal. A single analyst. Three days.", it: "Un segnale debole. Un solo analista. Tre giorni." },
  "an.cfLabel": { en: "COUNTERFACTUAL · what if the AI score had been different?", it: "CONTROFATTUALE · e se il punteggio AI fosse stato diverso?" },
  "an.cfTitle": { en: "Slide the AI risk score.", it: "Sposta il punteggio di rischio AI." },
  "an.range.low": { en: "LOW", it: "BASSO" },
  "an.range.mid": { en: "MEDIUM (actual ≈50)", it: "MEDIO (reale ≈50)" },
  "an.range.high": { en: "HIGH", it: "ALTO" },
  "an.verdict": { en: "verdict:", it: "verdetto:" },
  "an.out.low.label": { en: "LOW → auto-closed", it: "BASSO → chiuso in automatico" },
  "an.out.low.body": { en: "AI returns low risk. Without the org's AI-in-the-loop norm forcing escalation, the case is closed at the analyst's desk. Campaign continues. The dossier names this counterfactual explicitly.", it: "L'AI restituisce rischio basso. Senza la norma AI-in-the-loop dell'organizzazione che impone l'escalation, il caso si chiude alla scrivania dell'analista. La campagna continua. Il dossier nomina questo controfattuale in modo esplicito." },
  "an.out.mid.label": { en: "MEDIUM → escalated (actual)", it: "MEDIO → escalation (reale)" },
  "an.out.mid.body": { en: "This is what happened. AI returned medium-risk; the human-in-the-loop norm meant the signal was escalated rather than absorbed. Detection succeeded — barely, and three days late.", it: "È ciò che è successo. L'AI ha restituito rischio medio; la norma human-in-the-loop ha fatto sì che il segnale venisse scalato invece che assorbito. Il rilevamento ha avuto successo — di misura, e con tre giorni di ritardo." },
  "an.out.high.label": { en: "HIGH → flagged automatically", it: "ALTO → segnalato in automatico" },
  "an.out.high.body": { en: "Faster auto-flag, but still mediated by the same single-analyst pathway. The structural single-point-of-failure remains.", it: "Segnalazione automatica più rapida, ma sempre mediata dallo stesso percorso a singolo analista. Il single-point-of-failure strutturale resta." },
  "an.navPrev": { en: "← §03a operations", it: "← §03a operatività" },
  "an.navNext": { en: "§03c governance →", it: "§03c governance →" },

  // ---------- LEADERSHIP ----------
  "ld.title": { en: "Did the system function? Or did the system absorb its own failure?", it: "Il sistema ha funzionato? O ha assorbito il proprio fallimento?" },
  "ld.transcriptLabel": { en: "BOARDROOM TRANSCRIPT · the difficult node", it: "TRASCRIZIONE DEL CONSIGLIO · il nodo difficile" },
  "ld.transcriptTitle": { en: '"Functioned as designed" — interrogated.', it: '"Functioned as designed" — sotto esame.' },
  "ld.tr.concLabel": { en: "▸ retrospective conclusion (as filed)", it: "▸ conclusione del retrospettivo (agli atti)" },
  "ld.tr.conc": { en: '"The system functioned as designed."', it: '"The system functioned as designed."' },
  "ld.tr.counterLabel": { en: "▸ counter-claim (dossier, p.4)", it: "▸ contro-tesi (dossier, p.4)" },
  "ld.tr.principleLabel": { en: "▸ corrective principle", it: "▸ principio correttivo" },
  "ld.interventionLabel": { en: "INTERVENTION · cost / friction trade-off", it: "INTERVENTO · trade-off costo / attrito" },
  "ld.toggle.before": { en: "before · email-initiated", it: "prima · avviato via email" },
  "ld.toggle.after": { en: "after · intranet + mobile authenticator", it: "dopo · intranet + mobile authenticator" },
  "ld.stat.compromised": { en: "Compromised accounts", it: "Account compromessi" },
  "ld.stat.lag": { en: "Detection lag", it: "Ritardo di rilevamento" },
  "ld.stat.oob": { en: "OOB verification", it: "Verifica OOB" },
  "ld.stat.oob.none": { en: "none", it: "assente" },
  "ld.stat.lag.val": { en: "3 days", it: "3 giorni" },
  "ld.stat.cost": { en: "Integration cost", it: "Costo di integrazione" },
  "ld.stat.friction": { en: "Friction / employee / cycle", it: "Attrito / dipendente / ciclo" },
  "ld.stat.friction.val": { en: "10–15 min", it: "10–15 min" },
  "ld.stat.oob.auth": { en: "mobile authenticator", it: "mobile authenticator" },
  "ld.navPrev": { en: "← §03b detection", it: "← §03b rilevamento" },
  "ld.navNext": { en: "§04 reframing →", it: "§04 rilettura →" },

  // ---------- REFRAMING ----------
  "rf.label": { en: "§04 · REFRAMING", it: "§04 · RILETTURA" },
  "rf.h1a": { en: "The system functioned", it: "Il sistema ha funzionato" },
  "rf.h1b": { en: "as designed.", it: "as designed." },
  "rf.subA": { en: "But", it: "Ma" },
  "rf.subEm1": { en: '"as designed"', it: '"as designed"' },
  "rf.subMid": { en: "is not the same as", it: "non è lo stesso che" },
  "rf.subEm2": { en: '"as it should be."', it: '"as it should be."' },
  "rf.closeLabel": { en: "CLOSING FRAME", it: "CHIUSURA" },
  "rf.closeTitle": { en: "Cybersecurity is not a culture of suspicion.", it: "La cybersecurity non è una cultura del sospetto." },
  "rf.closeTitleB": { en: "It is the operational floor on which", it: "È la base operativa su cui" },
  "rf.closeTrust": { en: "trust", it: "fiducia" },
  "rf.closeAnd": { en: "and", it: "e" },
  "rf.closeInnovation": { en: "innovation", it: "innovazione" },
  "rf.closeBecome": { en: "become possible.", it: "diventano possibili." },
  "rf.closeBody": {
    en: "Systemic responsibility, not individual blame. Routines made legible, not just efficient. The intervention (§03c) — eliminating email-initiated credential links and requiring an independent mobile authenticator — is a structural answer to a structural attack.",
    it: "Responsabilità sistemica, non colpa individuale. Routine rese leggibili, non solo efficienti. L'intervento (§03c) — eliminare i link credenziali avviati via email e richiedere un mobile authenticator indipendente — è una risposta strutturale a un attacco strutturale.",
  },
  "rf.legendLabel": { en: "LEGEND · evidence taxonomy (dossier, p.7)", it: "LEGENDA · tassonomia delle evidenze (dossier, p.7)" },
  "rf.legend.E": { en: "[E] EVIDENCE", it: "[E] EVIDENCE" },
  "rf.legend.E.desc": { en: "Direct factual elements of the case (e.g. 70% line, coffee break endorsement).", it: "Elementi fattuali diretti del caso (es. la frase del 70%, l'avallo alla pausa caffè)." },
  "rf.legend.I": { en: "[I] INFERENCE", it: "[I] INFERENCE" },
  "rf.legend.I.desc": { en: "Analytical readings (procedural inadequacy, standardisation paradox, structural shadow).", it: "Letture analitiche (inadeguatezza procedurale, paradosso della standardizzazione, structural shadow)." },
  "rf.legend.S": { en: "[S] SIMULATION", it: "[S] SIMULATION" },
  "rf.legend.S.desc": { en: "Modelled figures (40 accounts, €45K, 10–15 min friction).", it: "Stime modellate (40 account, €45K, 10–15 min di attrito)." },
  "rf.navPrev": { en: "← §03c governance", it: "← §03c governance" },
  "rf.navNext": { en: "↻ return to §00 →", it: "↻ torna a §00 →" },
} as const;

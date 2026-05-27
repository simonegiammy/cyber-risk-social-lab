// All quotes verbatim from Technical Dossier. Source page noted.
// Type tags: E = Evidence, I = Inference, S = Simulation (per dossier p.7 table)

export type Evidence = "E" | "I" | "S";

export interface Quote {
  text: string;
  source: string; // section + page
  type: Evidence;
}

export const Q = {
  // Landing / Reframing anchor
  functionedAsDesigned: {
    text: "the system functioned as designed",
    source: "Macro-level vulnerabilities — p.4",
    type: "I",
  } as Quote,
  staffNotCareless: {
    text: "Staff were not careless, they were operating as the system expected them to.",
    source: "Sociological persuasion principles — p.3",
    type: "I",
  } as Quote,

  // Timeline (p.2)
  monPhishing: {
    text: "phishing emails mimicking the organisation's formal style were distributed to European operations staff, directing them to a credential-harvesting replica of the SSO portal",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,
  monDeferred: {
    text: "While some recipients completed the process immediately, others deferred, treating it as one of several routine notifications.",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,
  wedSeventy: {
    text: "approximately 70% of your department has already completed",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,
  wedReframing: {
    text: "updated the social information environment, reframing inaction as outlier behavior rather than introducing urgency",
    source: "Timeline reconstruction — p.2",
    type: "I",
  } as Quote,
  coffeeBreak: {
    text: "a colleague mentioned the renewal during a coffee break, describing it as quick and routine, lending the process peer credibility that formal channels could not have produced",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,
  coffeePredictable: {
    text: "This constitutes a secondary social proof, and was a predictable structural outcome of the attack.",
    source: "Timeline reconstruction — p.2",
    type: "I",
  } as Quote,
  thuForty: {
    text: "By Thursday, roughly 40 staff members had submitted credentials.",
    source: "Timeline reconstruction — p.2",
    type: "S",
  } as Quote,
  thuLogAnomaly: {
    text: "Detection came not through automated means but through a routine review of email gateway logs: the emails originated from an external mail server not part of the organisation's authorised infrastructure.",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,
  speakUp: {
    text: "a weak signal, but one that the organisation's speak-up culture converted into an investigation without hesitation",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,
  juniorAnalyst: {
    text: "A junior analyst was assigned, consulted the AI-assisted threat analysis tool which returned a medium-risk classification, and consistently with the organisation's “AI-in-the-loop” norm, escalated to the security team lead.",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,
  friConfirm: {
    text: "Confirmation came on Friday when the IT verified that the legitimate renewal process used a different internal URL and no email links.",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,
  response: {
    text: "the adequate teams were notified, an advisory distributed to all affected staff, and a forced credential reset initiated for compromised accounts",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,
  week2Logs: {
    text: "log analysis of the engineering design environment, obtained through coordination with the external hosting provider, revealed that several compromised accounts had accessed critical files",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,
  week2Board: {
    text: "The Managing Board convened a dedicated session addressing regulatory notification obligations and geopolitical sensitivity of the compromised data.",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,
  retrospective: {
    text: "A structured retrospective was initiated, framed as a systems-level examination rather than an individual blame exercise.",
    source: "Timeline reconstruction — p.2",
    type: "E",
  } as Quote,

  // Mechanisms (p.3)
  nelsonWinter: {
    text: "highly standardised and infrequently interrogated routines are simultaneously the most operationally efficient and the most socially exploitable elements of an organisation's repertoire",
    source: "Core sociological mechanisms — p.3",
    type: "I",
  } as Quote,
  temporalAlignment: {
    text: "by synchronizing with the annual compliance cycle, the attacker bypassed technical controls by simulating an existing routine convincingly enough to trigger conditioned behaviour",
    source: "Core sociological mechanisms — p.3",
    type: "I",
  } as Quote,
  socialProofFact: {
    text: "it reframed non-completion as deviance from the norm, activating conformity pressure without dramatic urgency",
    source: "Sociological persuasion principles — p.3",
    type: "I",
  } as Quote,
  diffusion: {
    text: "since colleagues had already done it, the cognitive burden of verification has shifted to the collective",
    source: "Sociological persuasion principles — p.3",
    type: "I",
  } as Quote,
  goffman: {
    text: "the attacker performed the identity of the organisation's compliance infrastructure, exploiting its symbolic vocabulary, constructed through repeated legitimate use",
    source: "Sociological persuasion principles — p.3",
    type: "I",
  } as Quote,
  standardisationParadox: {
    text: "Rigid adherence to a formal communication style became a weakness: by perfectly mimicking the corporate tone and branding, the malicious email blended seamlessly into the daily flow of legitimate directives.",
    source: "Sociological persuasion principles — p.3",
    type: "I",
  } as Quote,
  mintzbergShadow: {
    text: "a zone of operational autonomy where individual staff made crucial decisions without any in-line verification mechanism",
    source: "Socio-technical analysis — p.1",
    type: "I",
  } as Quote,
  automationBias: {
    text: "The value of AI integration in security operations is defined not just by the model's accuracy, but by the organisational norms governing its interpretation.",
    source: "Core sociological mechanisms — p.4",
    type: "I",
  } as Quote,
  automationAccepting: {
    text: "an automation-accepting posture would have closed the classification",
    source: "Core sociological mechanisms — p.4",
    type: "I",
  } as Quote,

  // Vulnerabilities & mitigation (p.4)
  socialMitigation: {
    text: "verification reflexes for routine administrative requests, not only for anomalous ones",
    source: "Macro-level vulnerabilities — p.4",
    type: "I",
  } as Quote,
  proceduralLag: {
    text: "By the time formal containment began, 40 accounts were compromised.",
    source: "Macro-level vulnerabilities — p.4",
    type: "S",
  } as Quote,
  proceduralMitigation: {
    text: "accelerated response protocols for such scenarios, including real-time monitoring thresholds that trigger automated alerts moving beyond static log reviews",
    source: "Macro-level vulnerabilities — p.4",
    type: "I",
  } as Quote,
  technicalVuln: {
    text: "the SSO process lacks an independent verification channel, creating a frictionless but insecure path for credential harvesting",
    source: "Macro-level vulnerabilities — p.4",
    type: "I",
  } as Quote,
  technicalMitigation: {
    text: "introducing an OOB verification step for all email-initiated credential renewal requests and staff should be directed to the compliance portal exclusively through the intranet landing page, never via email links",
    source: "Macro-level vulnerabilities — p.4",
    type: "I",
  } as Quote,
  singlePointFailure: {
    text: "the detection process carried a single point of failure; a lower AI score might have prematurely closed the case",
    source: "Macro-level vulnerabilities — p.4",
    type: "I",
  } as Quote,
  complacency: {
    text: "declaring the system \"functioned as designed\" ignores critical gaps in detection speed, in employee preparedness, and in credential renewal architecture",
    source: "Macro-level vulnerabilities — p.4",
    type: "I",
  } as Quote,
  learningOrientation: {
    text: "A true learning orientation must name these failures, rather than absorbing them into a narrative of institutional resilience.",
    source: "Macro-level vulnerabilities — p.4",
    type: "I",
  } as Quote,

  // Intervention (p.6)
  problemStatement: {
    text: "the core vulnerability was not a standard technical breach, but the exploitation of an established organizational routine (annual compliance renewal cycle) combined with the lack of OOB verification mechanism for email-initiated credential renewals",
    source: "Rationale for the Selected Intervention — p.6",
    type: "I",
  } as Quote,
  toolFailure: {
    text: "the phishing campaign flawlessly mimicked the formal corporate tone, lacked dramatic urgency, and utilized a valid SSL certificate, maintaining a \"medium risk\" classification",
    source: "Rationale for the Selected Intervention — p.6",
    type: "E",
  } as Quote,
  methodIntervention: {
    text: "we eliminated email-based links for any credential authentication or compliance renewals. Staff are required now to manually navigate to the internal compliance portal via the intranet and must use a mandatory independent mobile authenticator app to complete the process.",
    source: "Rationale for the Selected Intervention — p.6",
    type: "I",
  } as Quote,
  cost45k: {
    text: "an initial €45,000 for software integration, plus an ongoing operational cost represented by increased friction in the workflow of 10 to 15 additional minutes per employee during renewal cycles",
    source: "Rationale for the Selected Intervention — p.6",
    type: "S",
  } as Quote,

  // Org context (p.1)
  twoTier: {
    text: "the company operates under a two-tier board system and a matrix structure combining geographic regions and product lines",
    source: "Socio-technical analysis — p.1",
    type: "E",
  } as Quote,
  trustParadox: {
    text: "encryption of the connection provided a false sense of legitimacy",
    source: "Socio-technical analysis — p.1",
    type: "I",
  } as Quote,
  measuredTone: {
    text: "the messages never raised an alarm precisely because the low-pressure register was indistinguishable from legitimate internal communications",
    source: "Socio-technical analysis — p.1",
    type: "I",
  } as Quote,
};

export type QuoteKey = keyof typeof Q;

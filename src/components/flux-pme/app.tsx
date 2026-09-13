import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  Copy,
  FileText,
  Inbox,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
  Trash2,
} from "lucide-react";

import {
  AUTOMATISATIONS_INITIALES,
  CANAUX,
  CATEGORIES,
  CHECKLIST_LABELS,
  DEMANDES_INITIALES,
  PRINCIPES,
  buildBrouillon,
  type Automatisation,
  type Canal,
  type Demande,
  type Statut,
  type Urgence,
} from "./data";
import { DemoBanner, DemoFooter, DemoSidebar, type Onglet } from "./chrome";

const ETAPES_ANALYSE = [
  "Lecture du message reçu",
  "Identification de l'expéditeur",
  "Extraction des informations clés",
  "Évaluation du niveau d'urgence",
  "Préparation d'un brouillon de réponse",
];

const URGENCES: Urgence[] = ["Faible", "Moyenne", "Haute"];
const STATUTS: Statut[] = ["À vérifier", "Brouillon prêt", "Validée"];

const EXEMPLE_PREREMPLI = {
  nom: "Camille Martin",
  entreprise: "Menuiserie Horizon",
  email: "camille.martin@exemple-fictif.fr",
  telephone: "03 00 00 00 01",
  canal: "E-mail" as Canal,
  categorie: "Demande de devis",
  urgence: "Haute" as Urgence,
  sujet: "Devis pour 12 fenêtres bois-aluminium",
  budget: "15 000 € à 25 000 €",
  message:
    "Bonjour, nous devons remplacer douze fenêtres sur un bâtiment d'atelier avant la fin du trimestre. Pouvez-vous nous transmettre un chiffrage et vos délais de pose ?",
};

function statutClasses(statut: Statut): string {
  if (statut === "Validée") return "bg-emerald-100 text-emerald-800";
  if (statut === "Brouillon prêt") return "bg-blue-100 text-blue-800";
  return "bg-amber-100 text-amber-800";
}

function urgenceClasses(urgence: Urgence): string {
  if (urgence === "Haute") return "bg-red-100 text-red-800";
  if (urgence === "Moyenne") return "bg-orange-100 text-orange-800";
  return "bg-slate-200 text-slate-700";
}

const CARD = "rounded-2xl border border-[#111827]/8 bg-white p-5 shadow-sm";
const FIELD =
  "mt-1 w-full rounded-xl border border-[#111827]/15 bg-white px-3.5 py-2.5 text-sm text-[#111827] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20";
const LABEL = "text-sm font-medium text-[#111827]";

export function FluxApp() {
  const [onglet, setOnglet] = useState<Onglet>("apercu");
  const [demandes, setDemandes] = useState<Demande[]>(DEMANDES_INITIALES);
  const [automatisations, setAutomatisations] = useState<Automatisation[]>(
    AUTOMATISATIONS_INITIALES,
  );
  const [selectionId, setSelectionId] = useState<string | null>(null);
  const [prefill, setPrefill] = useState(0);
  const [analyseRapide, setAnalyseRapide] = useState(true);
  const [afficherAides, setAfficherAides] = useState(true);

  const reset = useCallback(() => {
    setDemandes(DEMANDES_INITIALES);
    setAutomatisations(AUTOMATISATIONS_INITIALES);
    setSelectionId(null);
    setOnglet("apercu");
  }, []);

  const effacer = useCallback(() => {
    setDemandes([]);
    setSelectionId(null);
  }, []);

  const ajouterDemande = useCallback((demande: Demande) => {
    setDemandes((list) => [demande, ...list]);
  }, []);

  const majDemande = useCallback((id: string, patch: Partial<Demande>) => {
    setDemandes((list) =>
      list.map((d) => (d.id === id ? { ...d, ...patch } : d)),
    );
  }, []);

  const demandeSelectionnee =
    demandes.find((d) => d.id === selectionId) ?? null;

  return (
    <div className="min-h-screen bg-[#F4F7FB] text-[#111827]">
      <DemoBanner onReset={reset} />

      <div className="mx-auto flex max-w-[110rem] flex-col lg:flex-row">
        <DemoSidebar onglet={onglet} onChange={setOnglet} />

        <main className="min-w-0 flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {onglet === "apercu" && (
            <VueEnsemble
              demandes={demandes}
              onCreer={() => {
                setPrefill((n) => n + 1);
                setOnglet("nouvelle");
              }}
              onVoirDemandes={() => setOnglet("demandes")}
            />
          )}

          {onglet === "nouvelle" && (
            <NouvelleDemande
              prefillSignal={prefill}
              analyseRapide={analyseRapide}
              onAjout={(demande) => {
                ajouterDemande(demande);
                setSelectionId(demande.id);
              }}
              onOuvrirDemande={(id) => {
                setSelectionId(id);
                setOnglet("demandes");
              }}
            />
          )}

          {onglet === "demandes" && (
            <ListeDemandes
              demandes={demandes}
              selection={demandeSelectionnee}
              onSelect={setSelectionId}
              onUpdate={majDemande}
            />
          )}

          {onglet === "automatisations" && (
            <Automatisations
              automatisations={automatisations}
              onToggle={(id) =>
                setAutomatisations((list) =>
                  list.map((a) => (a.id === id ? { ...a, actif: !a.actif } : a)),
                )
              }
            />
          )}

          {onglet === "parametres" && (
            <Parametres
              analyseRapide={analyseRapide}
              onAnalyseRapide={setAnalyseRapide}
              afficherAides={afficherAides}
              onAfficherAides={setAfficherAides}
              nombre={demandes.length}
              onEffacer={effacer}
              onReset={reset}
            />
          )}

          {afficherAides && <ProtectionDonnees />}
        </main>
      </div>

      <DemoFooter />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Vue d'ensemble                                                      */
/* ------------------------------------------------------------------ */

function VueEnsemble({
  demandes,
  onCreer,
  onVoirDemandes,
}: {
  demandes: Demande[];
  onCreer: () => void;
  onVoirDemandes: () => void;
}) {
  const metriques = [
    { label: "Demandes enregistrées", valeur: demandes.length, icon: Inbox },
    {
      label: "À vérifier",
      valeur: demandes.filter((d) => d.statut === "À vérifier").length,
      icon: AlertTriangle,
    },
    {
      label: "Brouillons prêts",
      valeur: demandes.filter((d) => d.statut === "Brouillon prêt").length,
      icon: FileText,
    },
    {
      label: "Validées",
      valeur: demandes.filter((d) => d.statut === "Validée").length,
      icon: CheckCircle2,
    },
  ];

  return (
    <section aria-labelledby="titre-apercu">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1
            id="titre-apercu"
            className="font-heading text-2xl font-bold sm:text-3xl"
          >
            Vue d&apos;ensemble
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-[#111827]/70">
            Toutes les valeurs affichées sont fictives et recalculées à partir
            des demandes présentes dans cette simulation.
          </p>
        </div>
        <button
          type="button"
          onClick={onCreer}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8]"
        >
          <Sparkles className="size-4" aria-hidden="true" />
          Créer une demande fictive
        </button>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metriques.map(({ label, valeur, icon: Icon }) => (
          <article key={label} className={CARD}>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#111827]/70">{label}</p>
              <Icon className="size-4 text-[#2563EB]" aria-hidden="true" />
            </div>
            <p className="mt-3 font-heading text-3xl font-bold">{valeur}</p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <article className={CARD}>
          <h2 className="font-heading text-lg font-semibold">
            Chronologie d&apos;activité
          </h2>
          {demandes.length === 0 ? (
            <p className="mt-4 text-sm text-[#111827]/70">
              Aucune activité : les données de démonstration ont été effacées.
            </p>
          ) : (
            <ol className="mt-5 space-y-5">
              {demandes.slice(0, 5).map((d) => (
                <li key={d.id} className="flex gap-3">
                  <span className="mt-1 size-2.5 shrink-0 rounded-full bg-[#2563EB]" />
                  <div>
                    <p className="text-sm font-semibold">
                      {d.id} — {d.sujet}
                    </p>
                    <p className="text-xs text-[#111827]/60">
                      {d.recu} · {d.canal} · statut : {d.statut}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          )}
          <button
            type="button"
            onClick={onVoirDemandes}
            className="mt-6 rounded-full border border-[#111827]/15 px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#F4F7FB]"
          >
            Ouvrir le tableau des demandes
          </button>
        </article>

        <article className={CARD}>
          <h2 className="font-heading text-lg font-semibold">
            Ce que montre cette simulation
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-[#111827]/75">
            {[
              "Une demande entrante est enregistrée au même endroit.",
              "Les informations utiles en sont extraites automatiquement.",
              "Une réponse est préparée, jamais envoyée seule.",
              "Une validation humaine termine systématiquement le circuit.",
            ].map((texte) => (
              <li key={texte} className="flex gap-2">
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-[#2563EB]"
                  aria-hidden="true"
                />
                {texte}
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Nouvelle demande + analyse simulée                                  */
/* ------------------------------------------------------------------ */

interface Erreurs {
  nom?: string;
  email?: string;
  sujet?: string;
  message?: string;
}

function NouvelleDemande({
  prefillSignal,
  analyseRapide,
  onAjout,
  onOuvrirDemande,
}: {
  prefillSignal: number;
  analyseRapide: boolean;
  onAjout: (demande: Demande) => void;
  onOuvrirDemande: (id: string) => void;
}) {
  const [nom, setNom] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [canal, setCanal] = useState<Canal>("E-mail");
  const [categorie, setCategorie] = useState<string>("Demande de devis");
  const [urgence, setUrgence] = useState<Urgence>("Moyenne");
  const [sujet, setSujet] = useState("");
  const [budget, setBudget] = useState("");
  const [message, setMessage] = useState("");
  const [erreurs, setErreurs] = useState<Erreurs>({});

  const [etape, setEtape] = useState(-1);
  const [resultat, setResultat] = useState<Demande | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout);
    },
    [],
  );

  const preremplir = useCallback(() => {
    setNom(EXEMPLE_PREREMPLI.nom);
    setEntreprise(EXEMPLE_PREREMPLI.entreprise);
    setEmail(EXEMPLE_PREREMPLI.email);
    setTelephone(EXEMPLE_PREREMPLI.telephone);
    setCanal(EXEMPLE_PREREMPLI.canal);
    setCategorie(EXEMPLE_PREREMPLI.categorie);
    setUrgence(EXEMPLE_PREREMPLI.urgence);
    setSujet(EXEMPLE_PREREMPLI.sujet);
    setBudget(EXEMPLE_PREREMPLI.budget);
    setMessage(EXEMPLE_PREREMPLI.message);
    setErreurs({});
  }, []);

  useEffect(() => {
    if (prefillSignal > 0) preremplir();
  }, [prefillSignal, preremplir]);

  function valider(): Erreurs {
    const next: Erreurs = {};
    if (nom.trim().length < 2) next.nom = "Indiquez le nom du contact.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Indiquez une adresse e-mail valide.";
    if (sujet.trim().length < 3) next.sujet = "Indiquez l'objet de la demande.";
    if (message.trim().length < 10)
      next.message = "Le message doit contenir au moins dix caractères.";
    return next;
  }

  function soumettre(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = valider();
    setErreurs(next);
    if (Object.keys(next).length > 0) return;

    const id = `DEM-${Math.floor(3000 + Math.random() * 6999)}`;
    const demande: Demande = {
      id,
      recu: "À l'instant",
      nom: nom.trim(),
      entreprise: entreprise.trim(),
      email: email.trim(),
      telephone: telephone.trim(),
      canal,
      sujet: sujet.trim(),
      message: message.trim(),
      budget: budget.trim() === "" ? "Non précisé" : budget.trim(),
      statut: "À vérifier",
      urgence,
      categorie,
      resume: `${categorie} transmise par ${canal.toLowerCase()} : ${sujet.trim()}.`,
      brouillon: buildBrouillon({
        nom: nom.trim(),
        entreprise: entreprise.trim(),
        categorie,
        sujet: sujet.trim(),
        urgence,
      }),
      verifie: false,
      checklist: [false, false, false, false, false],
    };

    setResultat(null);
    setEtape(0);
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const pas = analyseRapide ? 320 : 750;
    ETAPES_ANALYSE.forEach((_, index) => {
      timers.current.push(
        setTimeout(() => setEtape(index + 1), pas * (index + 1)),
      );
    });
    timers.current.push(
      setTimeout(() => {
        setResultat(demande);
        onAjout(demande);
      }, pas * (ETAPES_ANALYSE.length + 1)),
    );
  }

  const enCours = etape >= 0 && resultat === null;
  const progression =
    etape < 0 ? 0 : Math.min(100, (etape / ETAPES_ANALYSE.length) * 100);

  return (
    <section aria-labelledby="titre-nouvelle">
      <h1
        id="titre-nouvelle"
        className="font-heading text-2xl font-bold sm:text-3xl"
      >
        Nouvelle demande
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[#111827]/70">
        Étape 1 : saisissez une demande entrante. Rien n&apos;est envoyé, tout
        reste dans votre navigateur.
      </p>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <form onSubmit={soumettre} noValidate className={CARD}>
          <button
            type="button"
            onClick={preremplir}
            className="rounded-full border border-[#2563EB]/30 px-4 py-2 text-sm font-semibold text-[#2563EB] transition-colors hover:bg-[#2563EB] hover:text-white"
          >
            Préremplir avec un exemple
          </button>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={LABEL} htmlFor="flux-nom">
                Nom du contact
              </label>
              <input
                id="flux-nom"
                className={FIELD}
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                aria-invalid={!!erreurs.nom}
              />
              {erreurs.nom && <Erreur>{erreurs.nom}</Erreur>}
            </div>
            <div>
              <label className={LABEL} htmlFor="flux-entreprise">
                Entreprise
              </label>
              <input
                id="flux-entreprise"
                className={FIELD}
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="flux-email">
                E-mail
              </label>
              <input
                id="flux-email"
                type="email"
                className={FIELD}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!erreurs.email}
              />
              {erreurs.email && <Erreur>{erreurs.email}</Erreur>}
            </div>
            <div>
              <label className={LABEL} htmlFor="flux-tel">
                Téléphone
              </label>
              <input
                id="flux-tel"
                type="tel"
                className={FIELD}
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
              />
            </div>
            <div>
              <label className={LABEL} htmlFor="flux-canal">
                Canal de réception
              </label>
              <select
                id="flux-canal"
                className={FIELD}
                value={canal}
                onChange={(e) => setCanal(e.target.value as Canal)}
              >
                {CANAUX.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="flux-categorie">
                Catégorie
              </label>
              <select
                id="flux-categorie"
                className={FIELD}
                value={categorie}
                onChange={(e) => setCategorie(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="flux-urgence">
                Niveau d&apos;urgence
              </label>
              <select
                id="flux-urgence"
                className={FIELD}
                value={urgence}
                onChange={(e) => setUrgence(e.target.value as Urgence)}
              >
                {URGENCES.map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="flux-budget">
                Budget indiqué{" "}
                <span className="text-[#111827]/50">(facultatif)</span>
              </label>
              <input
                id="flux-budget"
                className={FIELD}
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className={LABEL} htmlFor="flux-sujet">
              Objet de la demande
            </label>
            <input
              id="flux-sujet"
              className={FIELD}
              value={sujet}
              onChange={(e) => setSujet(e.target.value)}
              aria-invalid={!!erreurs.sujet}
            />
            {erreurs.sujet && <Erreur>{erreurs.sujet}</Erreur>}
          </div>

          <div className="mt-4">
            <label className={LABEL} htmlFor="flux-message">
              Message reçu
            </label>
            <textarea
              id="flux-message"
              rows={5}
              className={FIELD}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              aria-invalid={!!erreurs.message}
            />
            {erreurs.message && <Erreur>{erreurs.message}</Erreur>}
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8] sm:w-auto"
          >
            Lancer la simulation de traitement
          </button>
        </form>

        <div className={CARD}>
          <h2 className="font-heading text-lg font-semibold">
            Étape 2 : analyse simulée
          </h2>
          <p className="mt-2 text-sm text-[#111827]/70">
            Le traitement ci-dessous est joué localement, sans appel à un
            service externe.
          </p>

          <div
            className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[#F4F7FB]"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(progression)}
            aria-label="Progression de l'analyse simulée"
          >
            <div
              className="h-full rounded-full bg-[#2563EB] transition-[width] duration-300"
              style={{ width: `${progression}%` }}
            />
          </div>

          <ol className="mt-5 space-y-3" aria-live="polite">
            {ETAPES_ANALYSE.map((label, index) => {
              const fait = etape > index;
              const active = enCours && etape === index;
              return (
                <li key={label} className="flex items-center gap-2 text-sm">
                  {fait ? (
                    <CheckCircle2
                      className="size-4 shrink-0 text-emerald-600"
                      aria-hidden="true"
                    />
                  ) : active ? (
                    <Loader2
                      className="size-4 shrink-0 animate-spin text-[#2563EB]"
                      aria-hidden="true"
                    />
                  ) : (
                    <span className="size-4 shrink-0 rounded-full border border-[#111827]/20" />
                  )}
                  <span
                    className={
                      fait ? "text-[#111827]" : "text-[#111827]/60"
                    }
                  >
                    {label}
                  </span>
                </li>
              );
            })}
          </ol>

          {resultat && (
            <div className="mt-6 rounded-2xl border border-[#2563EB]/20 bg-[#F4F7FB] p-4">
              <p className="font-heading text-sm font-semibold">
                Fiche structurée générée
              </p>
              <dl className="mt-3 space-y-2 text-sm">
                <Ligne terme="Référence" valeur={resultat.id} />
                <Ligne
                  terme="Contact"
                  valeur={`${resultat.nom}${
                    resultat.entreprise ? ` — ${resultat.entreprise}` : ""
                  }`}
                />
                <Ligne terme="Catégorie" valeur={resultat.categorie} />
                <Ligne terme="Urgence" valeur={resultat.urgence} />
                <Ligne terme="Budget" valeur={resultat.budget} />
                <Ligne terme="Résumé" valeur={resultat.resume} />
              </dl>
              <button
                type="button"
                onClick={() => onOuvrirDemande(resultat.id)}
                className="mt-4 rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
              >
                Ouvrir la demande dans le tableau
              </button>
              <p className="mt-3 text-xs text-[#111827]/60">
                Mode démonstration : aucune donnée n&apos;a été envoyée.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Ligne({ terme, valeur }: { terme: string; valeur: string }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] gap-2">
      <dt className="text-[#111827]/60">{terme}</dt>
      <dd className="font-medium">{valeur}</dd>
    </div>
  );
}

function Erreur({ children }: { children: string }) {
  return <span className="mt-1 block text-xs text-red-700">{children}</span>;
}

/* ------------------------------------------------------------------ */
/* Tableau des demandes + brouillon + validation                        */
/* ------------------------------------------------------------------ */

function ListeDemandes({
  demandes,
  selection,
  onSelect,
  onUpdate,
}: {
  demandes: Demande[];
  selection: Demande | null;
  onSelect: (id: string) => void;
  onUpdate: (id: string, patch: Partial<Demande>) => void;
}) {
  const [recherche, setRecherche] = useState("");
  const [filtreStatut, setFiltreStatut] = useState<Statut | "Tous">("Tous");
  const [filtreUrgence, setFiltreUrgence] = useState<Urgence | "Toutes">(
    "Toutes",
  );

  const filtrees = useMemo(() => {
    const q = recherche.trim().toLowerCase();
    return demandes.filter((d) => {
      const correspond =
        q === "" ||
        [d.id, d.nom, d.entreprise, d.sujet, d.categorie]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const statutOk = filtreStatut === "Tous" || d.statut === filtreStatut;
      const urgenceOk =
        filtreUrgence === "Toutes" || d.urgence === filtreUrgence;
      return correspond && statutOk && urgenceOk;
    });
  }, [demandes, recherche, filtreStatut, filtreUrgence]);

  return (
    <section aria-labelledby="titre-demandes">
      <h1
        id="titre-demandes"
        className="font-heading text-2xl font-bold sm:text-3xl"
      >
        Demandes
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[#111827]/70">
        Étape 3 : retrouvez, filtrez et ouvrez une demande pour préparer sa
        réponse.
      </p>

      <div className={`mt-8 ${CARD}`}>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <label className={LABEL} htmlFor="flux-recherche">
              Rechercher
            </label>
            <input
              id="flux-recherche"
              type="search"
              className={FIELD}
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Nom, entreprise, objet…"
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="flux-filtre-statut">
              Statut
            </label>
            <select
              id="flux-filtre-statut"
              className={FIELD}
              value={filtreStatut}
              onChange={(e) =>
                setFiltreStatut(e.target.value as Statut | "Tous")
              }
            >
              <option value="Tous">Tous</option>
              {STATUTS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={LABEL} htmlFor="flux-filtre-urgence">
              Urgence
            </label>
            <select
              id="flux-filtre-urgence"
              className={FIELD}
              value={filtreUrgence}
              onChange={(e) =>
                setFiltreUrgence(e.target.value as Urgence | "Toutes")
              }
            >
              <option value="Toutes">Toutes</option>
              {URGENCES.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filtrees.length === 0 ? (
          <p className="mt-6 text-sm text-[#111827]/70">
            Aucune demande ne correspond à cette recherche.
          </p>
        ) : (
          <>
            {/* Tableau (écrans larges) */}
            <div className="mt-6 hidden overflow-x-auto lg:block">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">
                  Liste des demandes fictives enregistrées
                </caption>
                <thead>
                  <tr className="border-b border-[#111827]/10 text-xs tracking-wide text-[#111827]/60 uppercase">
                    <th scope="col" className="py-2 pr-3">Référence</th>
                    <th scope="col" className="py-2 pr-3">Contact</th>
                    <th scope="col" className="py-2 pr-3">Objet</th>
                    <th scope="col" className="py-2 pr-3">Statut</th>
                    <th scope="col" className="py-2 pr-3">Urgence</th>
                    <th scope="col" className="py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtrees.map((d) => (
                    <tr
                      key={d.id}
                      className="border-b border-[#111827]/5 last:border-0"
                    >
                      <td className="py-3 pr-3 font-medium">{d.id}</td>
                      <td className="py-3 pr-3">
                        {d.nom}
                        <span className="block text-xs text-[#111827]/60">
                          {d.entreprise || "—"}
                        </span>
                      </td>
                      <td className="py-3 pr-3">{d.sujet}</td>
                      <td className="py-3 pr-3">
                        <Pastille classe={statutClasses(d.statut)}>
                          {d.statut}
                        </Pastille>
                      </td>
                      <td className="py-3 pr-3">
                        <Pastille classe={urgenceClasses(d.urgence)}>
                          {d.urgence}
                        </Pastille>
                      </td>
                      <td className="py-3">
                        <button
                          type="button"
                          onClick={() => onSelect(d.id)}
                          className="rounded-full border border-[#111827]/15 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-[#F4F7FB]"
                        >
                          Ouvrir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cartes (mobile et tablette) */}
            <ul className="mt-6 space-y-3 lg:hidden">
              {filtrees.map((d) => (
                <li
                  key={d.id}
                  className="rounded-xl border border-[#111827]/10 p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-semibold">{d.id}</span>
                    <Pastille classe={statutClasses(d.statut)}>
                      {d.statut}
                    </Pastille>
                    <Pastille classe={urgenceClasses(d.urgence)}>
                      {d.urgence}
                    </Pastille>
                  </div>
                  <p className="mt-2 text-sm font-medium">{d.sujet}</p>
                  <p className="text-xs text-[#111827]/60">
                    {d.nom}
                    {d.entreprise ? ` — ${d.entreprise}` : ""} · {d.recu}
                  </p>
                  <button
                    type="button"
                    onClick={() => onSelect(d.id)}
                    className="mt-3 w-full rounded-full border border-[#111827]/15 px-3 py-2 text-sm font-semibold transition-colors hover:bg-[#F4F7FB]"
                  >
                    Ouvrir la demande
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      {selection && (
        <DetailDemande
          key={selection.id}
          demande={selection}
          onUpdate={onUpdate}
        />
      )}
    </section>
  );
}

function Pastille({
  classe,
  children,
}: {
  classe: string;
  children: string;
}) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${classe}`}
    >
      {children}
    </span>
  );
}

function DetailDemande({
  demande,
  onUpdate,
}: {
  demande: Demande;
  onUpdate: (id: string, patch: Partial<Demande>) => void;
}) {
  const [copie, setCopie] = useState(false);

  useEffect(() => {
    if (!copie) return;
    const t = setTimeout(() => setCopie(false), 2500);
    return () => clearTimeout(t);
  }, [copie]);

  const coches = demande.checklist.filter(Boolean).length;
  const complet = coches === CHECKLIST_LABELS.length;

  async function copier() {
    try {
      await navigator.clipboard.writeText(demande.brouillon);
      setCopie(true);
    } catch {
      setCopie(false);
    }
  }

  return (
    <div className="mt-6 grid gap-6 xl:grid-cols-2">
      <article className={CARD}>
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="font-heading text-lg font-semibold">
            {demande.id} — {demande.sujet}
          </h2>
          <Pastille classe={statutClasses(demande.statut)}>
            {demande.statut}
          </Pastille>
        </div>
        <dl className="mt-4 space-y-2 text-sm">
          <Ligne terme="Contact" valeur={demande.nom} />
          <Ligne terme="Entreprise" valeur={demande.entreprise || "—"} />
          <Ligne terme="E-mail" valeur={demande.email} />
          <Ligne terme="Téléphone" valeur={demande.telephone || "—"} />
          <Ligne terme="Canal" valeur={demande.canal} />
          <Ligne terme="Catégorie" valeur={demande.categorie} />
          <Ligne terme="Urgence" valeur={demande.urgence} />
          <Ligne terme="Budget" valeur={demande.budget} />
          <Ligne terme="Reçu" valeur={demande.recu} />
        </dl>
        <div className="mt-4 rounded-xl bg-[#F4F7FB] p-4 text-sm leading-relaxed text-[#111827]/80">
          <p className="font-semibold text-[#111827]">Message reçu</p>
          <p className="mt-2">{demande.message}</p>
        </div>
        <p className="mt-4 text-sm text-[#111827]/70">
          <span className="font-semibold text-[#111827]">Résumé extrait :</span>{" "}
          {demande.resume}
        </p>
      </article>

      <article className={CARD}>
        <h2 className="font-heading text-lg font-semibold">
          Étape 4 : brouillon de réponse
        </h2>
        <p className="mt-2 text-sm text-[#111827]/70">
          Ce texte est généré à partir des informations de la demande. Vous
          pouvez le modifier librement.
        </p>
        <label className="sr-only" htmlFor={`brouillon-${demande.id}`}>
          Brouillon de réponse
        </label>
        <textarea
          id={`brouillon-${demande.id}`}
          rows={10}
          className={FIELD}
          value={demande.brouillon}
          onChange={(e) => onUpdate(demande.id, { brouillon: e.target.value })}
        />

        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={copier}
            className="inline-flex items-center gap-2 rounded-full border border-[#111827]/15 px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#F4F7FB]"
          >
            <Copy className="size-4" aria-hidden="true" />
            Copier le brouillon
          </button>
          <button
            type="button"
            onClick={() =>
              onUpdate(demande.id, {
                verifie: true,
                statut:
                  demande.statut === "Validée" ? "Validée" : "Brouillon prêt",
              })
            }
            className="inline-flex items-center gap-2 rounded-full bg-[#111827] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#2563EB]"
          >
            <ClipboardCheck className="size-4" aria-hidden="true" />
            Marquer comme vérifié
          </button>
        </div>
        <p aria-live="polite" className="mt-2 min-h-5 text-xs text-emerald-700">
          {copie ? "Brouillon copié dans le presse-papiers." : ""}
          {!copie && demande.verifie ? (
            <span className="text-[#111827]/60">
              Brouillon marqué comme vérifié.
            </span>
          ) : null}
        </p>

        <hr className="my-6 border-[#111827]/10" />

        <h2 className="font-heading text-lg font-semibold">
          Étape 5 : validation humaine
        </h2>
        <p className="mt-2 text-sm text-[#111827]/70">
          Les cinq points doivent être cochés pour débloquer la validation.
        </p>
        <ul className="mt-4 space-y-3">
          {CHECKLIST_LABELS.map((label, index) => (
            <li key={label}>
              <label className="flex items-start gap-3 text-sm text-[#111827]/85">
                <input
                  type="checkbox"
                  className="mt-0.5 size-4 accent-[#2563EB]"
                  checked={demande.checklist[index] === true}
                  onChange={(e) => {
                    const next = [...demande.checklist];
                    next[index] = e.target.checked;
                    onUpdate(demande.id, { checklist: next });
                  }}
                />
                <span>{label}</span>
              </label>
            </li>
          ))}
        </ul>

        <button
          type="button"
          disabled={!complet}
          onClick={() => onUpdate(demande.id, { statut: "Validée" })}
          className="mt-5 w-full rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:bg-[#111827]/20 disabled:text-[#111827]/50"
        >
          Valider la simulation
        </button>
        <p className="mt-2 text-xs text-[#111827]/60">
          {coches} critère{coches > 1 ? "s" : ""} sur {CHECKLIST_LABELS.length}{" "}
          coché{coches > 1 ? "s" : ""}.
        </p>

        {demande.statut === "Validée" && (
          <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm">
            <p className="font-heading font-semibold text-emerald-900">
              Récapitulatif de la simulation
            </p>
            <ul className="mt-3 space-y-1.5 text-emerald-900/85">
              <li>Demande {demande.id} classée « {demande.categorie} ».</li>
              <li>Urgence retenue : {demande.urgence}.</li>
              <li>Contact : {demande.nom} ({demande.email}).</li>
              <li>Brouillon relu et validé par une personne.</li>
              <li>Les cinq critères de contrôle ont été confirmés.</li>
            </ul>
            <p className="mt-3 text-xs text-emerald-900/70">
              Mode démonstration : aucune réponse n&apos;a été envoyée.
            </p>
          </div>
        )}
      </article>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Automatisations                                                     */
/* ------------------------------------------------------------------ */

function Automatisations({
  automatisations,
  onToggle,
}: {
  automatisations: Automatisation[];
  onToggle: (id: string) => void;
}) {
  return (
    <section aria-labelledby="titre-automatisations">
      <h1
        id="titre-automatisations"
        className="font-heading text-2xl font-bold sm:text-3xl"
      >
        Automatisations
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[#111827]/70">
        Activez ou désactivez chaque règle. Les interrupteurs agissent
        uniquement sur cette simulation.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {automatisations.map((a) => (
          <article key={a.id} className={CARD}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-heading text-base font-semibold">
                  {a.titre}
                </h2>
                <p className="mt-2 text-sm text-[#111827]/70">{a.texte}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={a.actif}
                aria-label={`${a.actif ? "Désactiver" : "Activer"} : ${a.titre}`}
                onClick={() => onToggle(a.id)}
                className={`relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors ${
                  a.actif ? "bg-[#2563EB]" : "bg-[#111827]/20"
                }`}
              >
                <span
                  className={`absolute top-0.5 size-5 rounded-full bg-white transition-all ${
                    a.actif ? "left-5.5" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            <p className="mt-4 text-xs font-semibold text-[#111827]/60">
              {a.actif ? "Activée" : "Désactivée"}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-dashed border-[#2563EB]/40 bg-[#2563EB]/5 p-5">
        <h2 className="font-heading text-sm font-semibold">
          À quoi sert une automatisation
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-[#111827]/75">
          Une automatisation ne remplace pas une décision : elle prépare le
          travail, réduit les oublis et fait gagner du temps sur les tâches
          répétitives. Le dernier mot revient toujours à une personne, en
          particulier lorsqu&apos;un message engage un prix, un délai ou une
          responsabilité.
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Paramètres                                                          */
/* ------------------------------------------------------------------ */

function Parametres({
  analyseRapide,
  onAnalyseRapide,
  afficherAides,
  onAfficherAides,
  nombre,
  onEffacer,
  onReset,
}: {
  analyseRapide: boolean;
  onAnalyseRapide: (v: boolean) => void;
  afficherAides: boolean;
  onAfficherAides: (v: boolean) => void;
  nombre: number;
  onEffacer: () => void;
  onReset: () => void;
}) {
  return (
    <section aria-labelledby="titre-parametres">
      <h1
        id="titre-parametres"
        className="font-heading text-2xl font-bold sm:text-3xl"
      >
        Paramètres
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-[#111827]/70">
        Ces réglages ne concernent que la simulation affichée dans votre
        navigateur.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className={CARD}>
          <h2 className="font-heading text-lg font-semibold">
            Contrôles de simulation
          </h2>
          <div className="mt-4 space-y-4">
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="mt-0.5 size-4 accent-[#2563EB]"
                checked={analyseRapide}
                onChange={(e) => onAnalyseRapide(e.target.checked)}
              />
              <span>
                Accélérer l&apos;analyse simulée
                <span className="block text-xs text-[#111827]/60">
                  Réduit la durée de chaque étape de traitement.
                </span>
              </span>
            </label>
            <label className="flex items-start gap-3 text-sm">
              <input
                type="checkbox"
                className="mt-0.5 size-4 accent-[#2563EB]"
                checked={afficherAides}
                onChange={(e) => onAfficherAides(e.target.checked)}
              />
              <span>
                Afficher la section pédagogique
                <span className="block text-xs text-[#111827]/60">
                  Masque ou affiche les explications sur la protection des
                  données.
                </span>
              </span>
            </label>
          </div>

          <button
            type="button"
            onClick={onReset}
            className="mt-6 rounded-full border border-[#111827]/15 px-4 py-2 text-sm font-semibold transition-colors hover:bg-[#F4F7FB]"
          >
            Restaurer les demandes d&apos;exemple
          </button>
        </article>

        <article className={CARD}>
          <h2 className="font-heading text-lg font-semibold">
            Données de démonstration
          </h2>
          <p className="mt-2 text-sm text-[#111827]/70">
            {nombre} demande{nombre > 1 ? "s" : ""} fictive
            {nombre > 1 ? "s" : ""} en mémoire. Rien n&apos;est enregistré en
            dehors de cette page.
          </p>
          <button
            type="button"
            onClick={onEffacer}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
          >
            <Trash2 className="size-4" aria-hidden="true" />
            Effacer les données de démonstration
          </button>
          <p className="mt-3 flex items-start gap-2 text-xs text-[#111827]/60">
            <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
            Ce bouton reste disponible à tout moment : aucune donnée ne doit
            survivre à la volonté de la personne concernée.
          </p>
        </article>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Protection des données                                              */
/* ------------------------------------------------------------------ */

function ProtectionDonnees() {
  return (
    <section className="mt-10 rounded-2xl border border-[#111827]/8 bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2">
        <ShieldCheck className="size-5 text-[#2563EB]" aria-hidden="true" />
        <h2 className="font-heading text-lg font-semibold">
          Une automatisation doit rester contrôlée
        </h2>
      </div>
      <p className="mt-2 max-w-3xl text-sm text-[#111827]/70">
        Cinq principes appliqués dans cette simulation, et transposables à un
        vrai outil de gestion des demandes.
      </p>

      <ol className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {PRINCIPES.map((p, i) => (
          <li
            key={p.titre}
            className="rounded-xl border border-[#111827]/10 bg-[#F4F7FB] p-4"
          >
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-[#111827] text-xs font-bold text-white">
              {i + 1}
            </span>
            <p className="mt-3 font-heading text-sm font-semibold">{p.titre}</p>
            <p className="mt-1 text-xs leading-relaxed text-[#111827]/70">
              {p.texte}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}

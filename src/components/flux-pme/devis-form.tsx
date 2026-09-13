import { useState, type FormEvent } from "react";
import { Info } from "lucide-react";

interface Errors {
  nom?: string;
  email?: string;
  entreprise?: string;
  description?: string;
  consentement?: string;
}

export function FluxDevisForm() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [entreprise, setEntreprise] = useState("");
  const [nbEmployes, setNbEmployes] = useState("");
  const [description, setDescription] = useState("");
  const [consentement, setConsentement] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (nom.trim().length < 2) next.nom = "Indiquez votre nom et votre prénom.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Indiquez une adresse e-mail valide.";
    if (entreprise.trim().length < 2)
      next.entreprise = "Indiquez le nom de votre entreprise.";
    if (description.trim().length < 10)
      next.description = "Décrivez votre besoin en quelques mots.";
    if (!consentement)
      next.consentement = "Votre accord est nécessaire pour continuer.";
    return next;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
  }

  const field =
    "mt-1 w-full rounded-xl border border-white/[0.12] bg-[#0d1117] px-4 py-2.5 text-sm text-white outline-none focus:border-[#1f6feb] focus:ring-2 focus:ring-[#1f6feb]/30";
  const labelCls = "text-sm font-medium text-white/80";

  return (
    <section id="contact" className="bg-[#161b22] py-16 text-white sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Demandez une démonstration
        </h2>
        <p className="mt-3 flex items-start gap-2 text-sm text-white/60">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Formulaire de démonstration : aucune information n&apos;est enregistrée
          ni transmise.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="flux-nom">
                Nom et prénom
              </label>
              <input
                id="flux-nom"
                className={field}
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                aria-invalid={!!errors.nom}
                autoComplete="name"
              />
              {errors.nom && <FieldError>{errors.nom}</FieldError>}
            </div>
            <div>
              <label className={labelCls} htmlFor="flux-email">
                E-mail professionnel
              </label>
              <input
                id="flux-email"
                type="email"
                className={field}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!errors.email}
                autoComplete="email"
              />
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </div>
            <div>
              <label className={labelCls} htmlFor="flux-entreprise">
                Nom de l&apos;entreprise
              </label>
              <input
                id="flux-entreprise"
                className={field}
                value={entreprise}
                onChange={(e) => setEntreprise(e.target.value)}
                aria-invalid={!!errors.entreprise}
                autoComplete="organization"
              />
              {errors.entreprise && (
                <FieldError>{errors.entreprise}</FieldError>
              )}
            </div>
            <div>
              <label className={labelCls} htmlFor="flux-employes">
                Nombre d&apos;employés{" "}
                <span className="text-white/40">(facultatif)</span>
              </label>
              <select
                id="flux-employes"
                className={field}
                value={nbEmployes}
                onChange={(e) => setNbEmployes(e.target.value)}
              >
                <option value="">Sélectionner</option>
                <option value="1-10">1 à 10</option>
                <option value="11-50">11 à 50</option>
                <option value="51-200">51 à 200</option>
                <option value="200+">Plus de 200</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="flux-desc">
              Décrivez votre besoin
            </label>
            <textarea
              id="flux-desc"
              rows={5}
              className={field}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-invalid={!!errors.description}
              placeholder="Quels processus souhaitez-vous automatiser ?"
            />
            {errors.description && (
              <FieldError>{errors.description}</FieldError>
            )}
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm text-white/70">
              <input
                type="checkbox"
                checked={consentement}
                onChange={(e) => setConsentement(e.target.checked)}
                aria-invalid={!!errors.consentement}
                className="mt-0.5 size-4 accent-[#1f6feb]"
              />
              <span>
                J&apos;accepte que ces informations soient utilisées pour
                répondre à ma demande (démonstration : rien n&apos;est
                enregistré).
              </span>
            </label>
            {errors.consentement && (
              <FieldError>{errors.consentement}</FieldError>
            )}
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-[#1f6feb] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1f6feb]/90 sm:w-auto"
          >
            Envoyer ma demande
          </button>

          <p aria-live="polite" className="min-h-6">
            {submitted && (
              <span className="inline-block rounded-xl bg-[#1f6feb] px-4 py-3 text-sm font-semibold text-white">
                Mode démonstration : aucune donnée n&apos;a été envoyée.
              </span>
            )}
          </p>
        </form>
      </div>
    </section>
  );
}

function FieldError({ children }: { children: string }) {
  return <span className="mt-1 block text-xs text-[#f85149]">{children}</span>;
}

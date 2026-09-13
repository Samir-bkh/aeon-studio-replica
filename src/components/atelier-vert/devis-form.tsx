import { useState, type FormEvent } from "react";
import { ImagePlus, Info, Trash2 } from "lucide-react";

import { PROJECT_TYPES, type ProjectType } from "./sections";

interface Errors {
  nom?: string;
  telephone?: string;
  email?: string;
  commune?: string;
  description?: string;
  consentement?: string;
}

export function DemoDevisForm({
  projectType,
  onProjectTypeChange,
}: {
  projectType: ProjectType;
  onProjectTypeChange: (type: ProjectType) => void;
}) {
  const [nom, setNom] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [commune, setCommune] = useState("");
  const [surface, setSurface] = useState("");
  const [description, setDescription] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  const [consentement, setConsentement] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function validate(): Errors {
    const next: Errors = {};
    if (nom.trim().length < 2) next.nom = "Indiquez votre nom et votre prénom.";
    if (!/^[0-9+\s().-]{8,}$/.test(telephone.trim()))
      next.telephone = "Indiquez un numéro de téléphone valide.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = "Indiquez une adresse e-mail valide.";
    if (commune.trim().length < 2)
      next.commune = "Indiquez la commune du chantier.";
    if (description.trim().length < 10)
      next.description = "Décrivez votre projet en quelques mots.";
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
    "mt-1 w-full rounded-xl border border-[#173F35]/20 bg-white px-4 py-2.5 text-sm text-[#1E2522] outline-none focus:border-[#173F35] focus:ring-2 focus:ring-[#A8C69F]";
  const labelCls = "text-sm font-medium text-[#1E2522]";

  return (
    <section id="contact" className="bg-[#F5F1E8] py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-heading text-2xl font-bold text-[#1E2522] sm:text-3xl">
          Parlez-nous de votre projet
        </h2>
        <p className="mt-3 flex items-start gap-2 text-sm text-[#1E2522]/70">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          Formulaire de démonstration : aucune information n&apos;est enregistrée
          ni transmise.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelCls} htmlFor="avert-nom">
                Nom et prénom
              </label>
              <input
                id="avert-nom"
                className={field}
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                aria-invalid={!!errors.nom}
                autoComplete="name"
              />
              {errors.nom && <FieldError>{errors.nom}</FieldError>}
            </div>
            <div>
              <label className={labelCls} htmlFor="avert-tel">
                Téléphone
              </label>
              <input
                id="avert-tel"
                type="tel"
                className={field}
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                aria-invalid={!!errors.telephone}
                autoComplete="tel"
              />
              {errors.telephone && <FieldError>{errors.telephone}</FieldError>}
            </div>
            <div>
              <label className={labelCls} htmlFor="avert-email">
                E-mail
              </label>
              <input
                id="avert-email"
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
              <label className={labelCls} htmlFor="avert-commune">
                Commune du chantier
              </label>
              <input
                id="avert-commune"
                className={field}
                value={commune}
                onChange={(e) => setCommune(e.target.value)}
                aria-invalid={!!errors.commune}
              />
              {errors.commune && <FieldError>{errors.commune}</FieldError>}
            </div>
            <div>
              <label className={labelCls} htmlFor="avert-type">
                Type de projet
              </label>
              <select
                id="avert-type"
                className={field}
                value={projectType}
                onChange={(e) =>
                  onProjectTypeChange(e.target.value as ProjectType)
                }
              >
                {PROJECT_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls} htmlFor="avert-surface">
                Surface approximative{" "}
                <span className="text-[#1E2522]/50">(facultatif)</span>
              </label>
              <input
                id="avert-surface"
                className={field}
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
                placeholder="Par exemple 150 m²"
              />
            </div>
          </div>

          <div>
            <label className={labelCls} htmlFor="avert-desc">
              Description du projet
            </label>
            <textarea
              id="avert-desc"
              rows={5}
              className={field}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              aria-invalid={!!errors.description}
            />
            {errors.description && <FieldError>{errors.description}</FieldError>}
          </div>

          <div>
            <p className={labelCls}>Photos du terrain</p>
            <button
              type="button"
              onClick={() =>
                setPhotos((p) => [...p, `Photo de démonstration ${p.length + 1}`])
              }
              className="mt-2 inline-flex items-center gap-2 rounded-xl border border-dashed border-[#173F35]/35 px-4 py-2.5 text-sm font-medium text-[#173F35] transition-colors hover:bg-white"
            >
              <ImagePlus className="size-4" aria-hidden="true" />
              Simuler l&apos;ajout d&apos;une photo
            </button>
            <p className="mt-1 text-xs text-[#1E2522]/60">
              L&apos;ajout de photos est simulé : aucun fichier n&apos;est lu ni
              envoyé.
            </p>
            {photos.length > 0 && (
              <ul className="mt-3 space-y-2">
                {photos.map((p, i) => (
                  <li
                    key={p}
                    className="flex items-center justify-between rounded-xl bg-white px-3 py-2 text-sm text-[#1E2522]/80"
                  >
                    {p}
                    <button
                      type="button"
                      onClick={() =>
                        setPhotos((list) => list.filter((_, j) => j !== i))
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-[#173F35] hover:underline"
                    >
                      <Trash2 className="size-3.5" aria-hidden="true" />
                      Retirer
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="flex items-start gap-3 text-sm text-[#1E2522]/80">
              <input
                type="checkbox"
                checked={consentement}
                onChange={(e) => setConsentement(e.target.checked)}
                aria-invalid={!!errors.consentement}
                className="mt-0.5 size-4 accent-[#173F35]"
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
            className="w-full rounded-full bg-[#173F35] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#173F35]/90 sm:w-auto"
          >
            Envoyer ma demande
          </button>

          <p aria-live="polite" className="min-h-6">
            {submitted && (
              <span className="inline-block rounded-xl bg-[#173F35] px-4 py-3 text-sm font-semibold text-white">
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
  return <span className="mt-1 block text-xs text-[#8a2f2f]">{children}</span>;
}

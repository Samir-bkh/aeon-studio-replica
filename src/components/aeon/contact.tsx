

import { type FormEvent, useState } from "react"
import { CheckCircle2, Info, Loader2, Mail, MapPin, MessageSquare, ShieldCheck } from "lucide-react"
import { Button } from "@/components/aeon-ui/button"
import { Checkbox } from "@/components/aeon-ui/checkbox"
import { Input } from "@/components/aeon-ui/input"
import { Label } from "@/components/aeon-ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/aeon-ui/select"
import { Textarea } from "@/components/aeon-ui/textarea"
import { Reveal } from "@/components/aeon/reveal"
import { siteConfig } from "@/lib/site-config"

const NEED_OPTIONS = [
  { value: "creation", label: "Création d'un site" },
  { value: "refonte", label: "Refonte complète" },
  { value: "amelioration", label: "Amélioration ciblée" },
  { value: "automatisation", label: "Automatisation" },
  { value: "inconnu", label: "Je ne sais pas encore" },
]

const BUDGET_OPTIONS = [
  { value: "moins-500", label: "Moins de 500 €" },
  { value: "500-1000", label: "500 à 1 000 €" },
  { value: "1000-2500", label: "1 000 à 2 500 €" },
  { value: "plus-2500", label: "Plus de 2 500 €" },
  { value: "inconnu", label: "Je ne sais pas encore" },
]

interface FormValues {
  name: string
  company: string
  email: string
  phone: string
  website: string
  need: string
  budget: string
  message: string
  consent: boolean
}

const INITIAL_VALUES: FormValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  website: "",
  need: "",
  budget: "",
  message: "",
  consent: false,
}

type FormStatus = "idle" | "submitting" | "success" | "not-configured" | "error"

export function Contact() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES)
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({})
  const [status, setStatus] = useState<FormStatus>("idle")

  const update = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {}

    if (!values.name.trim()) nextErrors.name = "Merci d'indiquer votre nom et prénom."
    if (!values.email.trim()) {
      nextErrors.email = "Merci d'indiquer une adresse e-mail."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      nextErrors.email = "Cette adresse e-mail ne semble pas valide."
    }
    if (!values.need) nextErrors.need = "Merci de sélectionner un type de besoin."
    if (!values.message.trim()) {
      nextErrors.message = "Merci de décrire brièvement votre projet."
    }
    if (!values.consent) {
      nextErrors.consent = "Merci d'accepter cette condition pour continuer."
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return

    if (!siteConfig.formspreeEndpoint) {
      setStatus("not-configured")
      return
    }

    setStatus("submitting")

    try {
      const response = await fetch(siteConfig.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(e.currentTarget),
      })

      if (response.ok) {
        setStatus("success")
        setValues(INITIAL_VALUES)
      } else {
        setStatus("error")
      }
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <Reveal>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Parlons de votre projet
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
              Décrivez brièvement votre activité et votre besoin. Je pourrai
              ensuite vous proposer un premier échange afin de déterminer la
              solution la plus pertinente.
            </p>

            {status === "success" ? (
              <div className="mt-10 flex items-start gap-3 rounded-2xl border border-[#39D9C6]/30 bg-[#39D9C6]/[0.06] p-6">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-[#39D9C6]" aria-hidden="true" />
                <div>
                  <p className="font-heading text-base font-semibold text-foreground">
                    Votre demande a bien été envoyée
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Merci pour votre message, je reviens vers vous rapidement.
                  </p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-10 space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="name"
                    label="Nom et prénom"
                    required
                    error={errors.name}
                  >
                    <Input
                      id="name"
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={(e) => update("name", e.target.value)}
                      aria-invalid={!!errors.name}
                    />
                  </Field>

                  <Field id="company" label="Nom de l'entreprise">
                    <Input
                      id="company"
                      name="company"
                      autoComplete="organization"
                      value={values.company}
                      onChange={(e) => update("company", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="email"
                    label="Adresse e-mail"
                    required
                    error={errors.email}
                  >
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(e) => update("email", e.target.value)}
                      aria-invalid={!!errors.email}
                    />
                  </Field>

                  <Field id="phone" label="Téléphone (facultatif)">
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      value={values.phone}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </Field>
                </div>

                <Field id="website" label="Adresse du site actuel (facultatif)">
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    placeholder="https://"
                    value={values.website}
                    onChange={(e) => update("website", e.target.value)}
                  />
                </Field>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="need"
                    label="Type de besoin"
                    required
                    error={errors.need}
                  >
                    <Select
                      value={values.need}
                      onValueChange={(v) => update("need", v ?? "")}
                      name="need"
                    >
                      <SelectTrigger id="need" className="w-full" aria-invalid={!!errors.need}>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {NEED_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field id="budget" label="Budget indicatif (facultatif)">
                    <Select
                      value={values.budget}
                      onValueChange={(v) => update("budget", v ?? "")}
                      name="budget"
                    >
                      <SelectTrigger id="budget" className="w-full">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {BUDGET_OPTIONS.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>

                <Field
                  id="message"
                  label="Description du projet"
                  required
                  error={errors.message}
                >
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={values.message}
                    onChange={(e) => update("message", e.target.value)}
                    aria-invalid={!!errors.message}
                  />
                </Field>

                <div>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="consent"
                      name="consent"
                      checked={values.consent}
                      onCheckedChange={(checked) => update("consent", checked === true)}
                      aria-invalid={!!errors.consent}
                      className="mt-0.5"
                    />
                    <Label htmlFor="consent" className="text-sm font-normal leading-relaxed text-muted-foreground">
                      J&apos;accepte que les informations saisies soient
                      utilisées uniquement pour répondre à ma demande.
                    </Label>
                  </div>
                  {errors.consent && (
                    <p className="mt-1.5 text-xs text-destructive" role="alert">
                      {errors.consent}
                    </p>
                  )}
                </div>

                {status === "not-configured" && (
                  <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4 text-sm text-amber-200/90">
                    <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    <p>
                      Ce formulaire de démonstration doit encore être
                      configuré avec un endpoint Formspree dans{" "}
                      <code className="rounded bg-white/10 px-1 py-0.5 text-xs">
                        lib/site-config.ts
                      </code>{" "}
                      pour que les messages soient réellement envoyés. En
                      attendant, vous pouvez me contacter directement par
                      e-mail.
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/[0.06] p-4 text-sm text-destructive" role="alert">
                    Une erreur est survenue lors de l&apos;envoi. Vous pouvez
                    réessayer ou me contacter directement par e-mail.
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={status === "submitting"}
                  className="h-12 w-full rounded-full text-base sm:w-auto sm:px-8"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                      Envoi en cours
                    </>
                  ) : (
                    "Envoyer ma demande"
                  )}
                </Button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-white/[0.07] bg-[#121824] p-7">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Informations
              </h3>
              <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-[#5B8CFF]" aria-hidden="true" />
                  <span>
                    Basé à {siteConfig.city}
                    <br />
                    Disponible dans toute la France
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 size-4 shrink-0 text-[#5B8CFF]" aria-hidden="true" />
                  {siteConfig.email ? (
                    <a href={`mailto:${siteConfig.email}`} className="hover:text-foreground">
                      {siteConfig.email}
                    </a>
                  ) : (
                    <span>Adresse e-mail à venir</span>
                  )}
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 size-4 shrink-0 text-[#5B8CFF]" aria-hidden="true" />
                  <span>Réponse personnalisée</span>
                </li>
                <li className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 size-4 shrink-0 text-[#5B8CFF]" aria-hidden="true" />
                  <span>Aucun engagement après le premier échange</span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string
  label: string
  required?: boolean
  error?: string | undefined
  children: React.ReactNode
}) {
  return (
    <div>
      <Label htmlFor={id} className="text-sm text-foreground/90">
        {label}
        {required && <span className="text-[#5B8CFF]"> *</span>}
      </Label>
      <div className="mt-1.5">{children}</div>
      {error && (
        <p className="mt-1.5 text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

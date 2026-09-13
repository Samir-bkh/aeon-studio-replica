import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

interface NovaModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export function NovaModal({ open, title, onClose, children }: NovaModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Fermer la fenêtre"
        onClick={onClose}
        className="absolute inset-0 bg-[#2a2a26]/60"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl bg-white p-6 text-[#3a3a36] shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 inline-flex size-9 items-center justify-center rounded-full border border-[#c8531c]/20 text-[#c8531c] transition-colors hover:bg-[#f5f1e8]"
        >
          <X className="size-4" aria-hidden="true" />
          <span className="sr-only">Fermer</span>
        </button>
        {children}
      </div>
    </div>
  );
}

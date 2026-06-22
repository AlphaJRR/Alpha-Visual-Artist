import { useId, useRef, useState } from "react";
import { joinList } from "@/lib/klaviyo";
import "@/styles/ava-tokens.css";
import "./email-capture-form.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type FormStatus = "idle" | "loading" | "success" | "error";

export type EmailCaptureFormProps = {
  /** Klaviyo custom_source value for consent attribution */
  source?: string;
  /** Override default CTA label */
  submitLabel?: string;
  className?: string;
};

export function EmailCaptureForm({
  source = "ACP landing page",
  submitLabel = "Join the Waitlist",
  className = "",
}: EmailCaptureFormProps) {
  const formId = useId();
  const emailInputId = `${formId}-email`;
  const statusId = `${formId}-status`;
  const emailRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [error, setError] = useState("");

  const validateEmail = (value: string): string | null => {
    const trimmed = value.trim();
    if (!trimmed) return "Enter your email address.";
    if (!EMAIL_PATTERN.test(trimmed)) return "Enter a valid email address.";
    return null;
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");

    const validationError = validateEmail(email);
    if (validationError) {
      setStatus("error");
      setError(validationError);
      emailRef.current?.focus();
      return;
    }

    const trimmed = email.trim();
    setStatus("loading");

    const result = await joinList(trimmed, source);
    if (result.ok) {
      setStatus("success");
      return;
    }

    setStatus("error");
    setError(result.message);
    emailRef.current?.focus();
  };

  if (status === "success") {
    return (
      <div
        className={`email-capture email-capture--success ${className}`.trim()}
        role="status"
        aria-live="polite"
        id={statusId}
      >
        <p className="email-capture__success-title">You&apos;re on the list.</p>
        <p className="email-capture__success-body">
          Watch your inbox for ALPHA Creators updates and early access news.
        </p>
      </div>
    );
  }

  return (
    <form
      className={`email-capture ${className}`.trim()}
      onSubmit={onSubmit}
      noValidate
      aria-label="Join the waitlist"
    >
      <div className="email-capture__row">
        <label htmlFor={emailInputId} className="email-capture__label">
          Email address
        </label>
        <input
          ref={emailRef}
          id={emailInputId}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          enterKeyHint="send"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            if (status === "error") {
              setStatus("idle");
              setError("");
            }
          }}
          placeholder="you@email.com"
          className="email-capture__input"
          disabled={status === "loading"}
          aria-invalid={status === "error"}
          aria-describedby={error ? statusId : undefined}
        />
        <button type="submit" className="email-capture__submit" disabled={status === "loading"}>
          {status === "loading" ? "Submitting…" : submitLabel}
        </button>
      </div>

      {error ? (
        <p className="email-capture__error" id={statusId} role="alert" aria-live="assertive">
          {error}
        </p>
      ) : null}

      <p className="email-capture__fine-print">
        One list. No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}

export default EmailCaptureForm;

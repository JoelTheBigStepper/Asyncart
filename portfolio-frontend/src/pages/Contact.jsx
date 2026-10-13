import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import LetterField from "../components/LetterField";
import AmbientOrbs from "../components/AmbientOrbs";
import Reveal from "../components/Reveal";

const SEND_URL = "https://asyncart.onrender.com/send-email";
const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "idle", text: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: "idle", text: "" });

    const next = {};
    if (!name.trim()) next.name = "Tell me your name.";
    if (!email.trim()) next.email = "Add an email so I can reply.";
    else if (!validateEmail(email)) next.email = "That email does not look right. Check it and try again.";
    if (!message.trim()) next.message = "Say a few words about what you have in mind.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    try {
      const response = await fetch(SEND_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await response.json();

      if (data.success) {
        setStatus({ type: "success", text: "Message sent. I will get back to you as soon as I can." });
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setStatus({ type: "error", text: data.message || "The message did not send. Please try again." });
      }
    } catch {
      setStatus({ type: "error", text: "Could not reach the server. Check your connection and try again." });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative scroll-mt-16 overflow-hidden px-6 py-20 md:px-12 md:py-28"
    >
      <AmbientOrbs tone="onCanvas" />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          id="contact-title"
          title="Say hello"
          intro="Fill in the letter below. It lands straight in my inbox."
        />

        <Reveal className="glass-strong mt-14 max-w-3xl rounded-3xl p-6 md:p-10">
        <form onSubmit={handleSubmit} noValidate className="space-y-10">
          <LetterField
            id="contact-name"
            lead="Hi Joel, my name is"
            value={name}
            onChange={setName}
            error={errors.name}
            autoComplete="name"
          />
          <LetterField
            id="contact-email"
            lead="and you can reach me at"
            type="email"
            value={email}
            onChange={setEmail}
            error={errors.email}
            autoComplete="email"
          />
          <LetterField
            id="contact-message"
            lead="I would like to talk about"
            value={message}
            onChange={setMessage}
            error={errors.message}
            multiline
          />

          <div className="flex flex-wrap items-center gap-6">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-8 py-4 font-semibold text-canvas transition-colors hover:bg-link disabled:opacity-60"
            >
              {sending ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" /> Sending
                </>
              ) : (
                <>
                  Send message <Send className="h-4 w-4" aria-hidden="true" />
                </>
              )}
            </button>

            <p
              role={status.type === "error" ? "alert" : "status"}
              className={`font-semibold ${status.type === "error" ? "text-danger" : "text-link"}`}
            >
              {status.text}
            </p>
          </div>
        </form>
        </Reveal>
      </div>
    </section>
  );
}

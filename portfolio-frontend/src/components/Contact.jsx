import React, { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setFeedback("");

    const newErrors = {};
    if (!name) newErrors.name = "Name is required!";
    if (!email) newErrors.email = "Email is required!";
    else if (!validateEmail(email)) newErrors.email = "Please enter a valid email!";
    if (!message) newErrors.message = "Message is required!";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSending(true);

    try {
      const response = await fetch("https://asyncart.onrender.com/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (data.success) {
        setFeedback("Your message has been sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        // Display email-specific error if present
        if (data.message?.toLowerCase().includes("email")) {
          setErrors(prev => ({ ...prev, email: data.message }));
        } else {
          setFeedback(data.message || "There was an error sending your message.");
        }
      }

    } catch (error) {
      setFeedback("Something went wrong. Please try again later.");
    } finally {
      setSending(false);
      setTimeout(() => {
        setFeedback("");
      }, 5000);
    }
  };

  return (
    <section id="contact" className="p-10 mx-auto max-w-lg sm:max-w-xl md:max-w-2xl">
      <h2 className="text-3xl font-bold mb-6">Contact Me</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded border border-1 border-stone-600 bg-transparent dark:bg-stone-800 placeholder:text-stone-500 placeholder:dark:text-white"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded border border-1 border-stone-600 bg-transparent dark:bg-stone-800 placeholder:text-stone-500 placeholder:dark:text-white"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        <div>
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-3 rounded border border-1 border-stone-600 bg-transparent dark:bg-stone-800 placeholder:text-stone-500 placeholder:dark:text-white h-32"
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>

        <button
          type="submit"
          className="dark:bg-white bg-black text-stone-300 dark:text-black font-medium px-6 py-3 rounded w-full"
          disabled={sending}
        >
          {sending ? "Sending..." : "Send Message"}
        </button>

        {feedback && (
          <p className={`text-sm ${feedback.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
            {feedback}
          </p>
        )}
      </form>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [feedback, setFeedback] = useState("");
  const [sending, setSending] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

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
        setFeedback("✅ Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else {
        setFeedback(data.message || "There was an issue sending your message.");
      }
    } catch {
      setFeedback("Something went wrong. Please try again later.");
    } finally {
      setSending(false);
      setTimeout(() => setFeedback(""), 5000);
    }
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-20 bg-white text-stone-900 dark:bg-black dark:text-white transition-colors duration-500"
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl text-center space-y-6"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Get In <span className="text-amber-500">Touch</span>
        </h2>
        <p className="text-stone-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
          Have a project, idea, or collaboration in mind? Drop me a message — I’ll get back to you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Message */}
          <div>
            <textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full p-4 rounded-xl border border-stone-300 dark:border-stone-700 bg-transparent placeholder:text-stone-400 dark:placeholder:text-stone-500 h-32 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
          </div>

          {/* Button */}
          <motion.button
            type="submit"
            disabled={sending}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-amber-500 text-white dark:text-black dark:bg-white font-semibold px-6 py-3 rounded-xl hover:bg-amber-600 dark:hover:bg-stone-200 transition-all shadow-md"
          >
            {sending ? "Sending..." : "Send Message"}
          </motion.button>

          {/* Feedback */}
          {feedback && (
            <p
              className={`text-sm text-center ${
                feedback.includes("success") ? "text-green-500" : "text-red-500"
              }`}
            >
              {feedback}
            </p>
          )}
        </form>
      </motion.div>
    </section>
  );
}

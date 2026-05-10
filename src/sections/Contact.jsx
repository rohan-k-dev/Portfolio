import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import TitleHeader from "../components/TitleHeader";
import ContactExperience from "../components/models/contact/ContactExperience";

const STATES = { idle: "idle", loading: "loading", sent: "sent", error: "error" };

const Contact = () => {
  const formRef = useRef(null);
  const [status, setStatus] = useState(STATES.idle);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(STATES.loading);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setForm({ name: "", email: "", message: "" });
      setStatus(STATES.sent);
    } catch {
      setStatus(STATES.error);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-inner">
        <TitleHeader
          title="Let's Work Together"
          sub="📬 Open to Internships & Collaborations"
        />

        <div className="contact-grid">
          {/* Form */}
          <div className="contact-form-wrap">
            {status === STATES.sent ? (
              <div className="contact-feedback contact-feedback--sent" role="status">
                <span className="contact-feedback-icon">✓</span>
                <p className="contact-feedback-title">Message sent.</p>
                <p className="contact-feedback-sub">I'll get back to you within 24 hours.</p>
                <button
                  className="contact-feedback-reset"
                  onClick={() => setStatus(STATES.idle)}
                >
                  Send another
                </button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="contact-form"
                noValidate
              >
                {status === STATES.error && (
                  <div className="contact-error" role="alert">
                    Something went wrong. Try emailing me directly at{" "}
                    <a href="mailto:rohan@example.com" className="contact-error-link">
                      rohan@example.com
                    </a>
                  </div>
                )}

                <div className="contact-field">
                  <label htmlFor="name" className="contact-label">Name</label>
                  <input
                    type="text" id="name" name="name"
                    value={form.name} onChange={handleChange}
                    placeholder="Your name"
                    className="contact-input"
                    required autoComplete="name"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="email" className="contact-label">Email</label>
                  <input
                    type="email" id="email" name="email"
                    value={form.email} onChange={handleChange}
                    placeholder="you@company.com"
                    className="contact-input"
                    required autoComplete="email"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="message" className="contact-label">Message</label>
                  <textarea
                    id="message" name="message"
                    value={form.message} onChange={handleChange}
                    placeholder="Tell me about the opportunity..."
                    rows="5"
                    className="contact-input contact-textarea"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="contact-submit"
                  disabled={status === STATES.loading}
                  aria-busy={status === STATES.loading}
                >
                  {status === STATES.loading ? (
                    <><span className="contact-spinner" aria-hidden="true" /> Sending…</>
                  ) : (
                    "Send Message →"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* 3D panel */}
          <div className="contact-3d-wrap">
            <ContactExperience />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

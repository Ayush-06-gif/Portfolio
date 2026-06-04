"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle,
  XCircle,
  ArrowUpRight,
} from "lucide-react";
import { contactInfo, socialLinks } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";

function GithubIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function TwitterIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ style }: { style?: React.CSSProperties }) {
  return (
    <svg style={style} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.975-9.658a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
    </svg>
  );
}

const socialIconMap: Record<string, React.ReactNode> = {
  Github: <GithubIcon style={{ width: 20, height: 20 }} />,
  Linkedin: <LinkedinIcon style={{ width: 20, height: 20 }} />,
  Twitter: <TwitterIcon style={{ width: 20, height: 20 }} />,
  Instagram: <InstagramIcon style={{ width: 20, height: 20 }} />,
  Mail: <Mail style={{ width: 20, height: 20 }} />,
};

type FormStatus = "idle" | "sending" | "success" | "error" | "validation-error";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");



  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        paddingTop: "var(--section-padding)",
        paddingBottom: "var(--section-padding)",
      }}
    >
      <div
        className="blob blob-rose"
        style={{ width: 400, height: 400, top: "20%", left: "-5%", animation: "blob-drift 13s ease-in-out infinite 2s" }}
      />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 1.5rem" }}>
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind or want to collaborate? Let's talk!"
        />

        <div className="contact-layout" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "3rem" }}>
          {/* Left: Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2rem" }}>
              {[
                { icon: <Mail style={{ width: 20, height: 20 }} />, label: "Email", value: contactInfo.email, href: `https://mail.google.com/mail/?view=cm&fs=1&to=${contactInfo.email}` },
                { icon: <Phone style={{ width: 20, height: 20 }} />, label: "Phone", value: contactInfo.phone, href: `tel:${contactInfo.phone}` },
                { icon: <MapPin style={{ width: 20, height: 20 }} />, label: "Location", value: contactInfo.location, href: undefined },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  whileHover={{ x: 4 }}
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <div style={{
                    width: 48,
                    height: 48,
                    borderRadius: 12,
                    background: "rgba(199, 92, 44, 0.06)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--terracotta)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s",
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-caption" style={{ marginBottom: 2 }}>{item.label}</p>
                    {item.href ? (
                      <a href={item.href} style={{ fontSize: "0.9rem", color: "var(--charcoal)", transition: "color 0.2s" }}>
                        {item.value}
                      </a>
                    ) : (
                      <p style={{ fontSize: "0.9rem", color: "var(--charcoal)" }}>{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social */}
            <div>
              <p className="text-caption" style={{ marginBottom: "1rem" }}>Connect</p>
              <div style={{ display: "flex", gap: 10 }}>
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: "var(--parchment)",
                      border: "1px solid var(--border-subtle)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--stone)",
                      transition: "all 0.3s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--terracotta)";
                      e.currentTarget.style.borderColor = "rgba(199, 92, 44, 0.25)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--stone)";
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                    }}
                    aria-label={social.ariaLabel}
                  >
                    {socialIconMap[social.icon]}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="card paper-texture" style={{ padding: "2rem" }}>
              <form noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem", position: "relative", zIndex: 1 }}>
                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
                  <div>
                    <label htmlFor="name" className="text-caption" style={{ display: "block", marginBottom: 8 }}>Full Name</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" className="input" style={{ position: "relative", zIndex: 2 }} />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-caption" style={{ display: "block", marginBottom: 8 }}>Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" className="input" style={{ position: "relative", zIndex: 2 }} />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="text-caption" style={{ display: "block", marginBottom: 8 }}>Subject</label>
                  <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} placeholder="Project collaboration" className="input" style={{ position: "relative", zIndex: 2 }} />
                </div>
                <div>
                  <label htmlFor="message" className="text-caption" style={{ display: "block", marginBottom: 8 }}>Message</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Tell me about your project..." className="input" style={{ resize: "none", position: "relative", zIndex: 2 }} />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // Validation
                    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
                      setStatus("validation-error");
                      setTimeout(() => setStatus("idle"), 4000);
                      return;
                    }

                    setStatus("sending");

                    fetch("https://api.web3forms.com/submit", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      body: JSON.stringify({
                        access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
                        name: formData.name,
                        email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                      }),
                    })
                      .then((res) => res.json())
                      .then((result) => {
                        if (result.success) {
                          setStatus("success");
                          setFormData({ name: "", email: "", subject: "", message: "" });
                        } else {
                          console.error("Web3Forms API Error:", result);
                          setStatus("error");
                        }
                        setTimeout(() => setStatus("idle"), 5000);
                      })
                      .catch((err) => {
                        console.error("Fetch Error:", err);
                        setStatus("error");
                        setTimeout(() => setStatus("idle"), 5000);
                      });
                  }}
                  disabled={status === "sending"}
                  className="btn btn-primary"
                  style={{
                    width: "100%",
                    padding: "1rem",
                    opacity: status === "sending" ? 0.6 : 1,
                    cursor: status === "sending" ? "not-allowed" : "pointer",
                    position: "relative",
                    zIndex: 2,
                  }}
                  aria-label="Send message"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 style={{ width: 16, height: 16, animation: "spin-slow 1s linear infinite" }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send style={{ width: 16, height: 16 }} />
                      Send Message
                      <ArrowUpRight style={{ width: 14, height: 14 }} />
                    </>
                  )}
                </button>
              </form>

              {/* Toast */}
              <AnimatePresence>
                {(status === "success" || status === "error" || status === "validation-error") && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    style={{
                      marginTop: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "0.75rem 1rem",
                      borderRadius: 12,
                      fontSize: "0.85rem",
                      ...(status === "success"
                        ? { background: "rgba(123, 158, 107, 0.08)", color: "var(--sage)", border: "1px solid rgba(123, 158, 107, 0.2)" }
                        : { background: "rgba(199, 92, 44, 0.08)", color: "var(--terracotta)", border: "1px solid rgba(199, 92, 44, 0.2)" }),
                    }}
                  >
                    {status === "success" ? (
                      <><CheckCircle style={{ width: 16, height: 16 }} /> Message sent successfully!</>
                    ) : status === "validation-error" ? (
                      <><XCircle style={{ width: 16, height: 16 }} /> Please fill out all fields before sending.</>
                    ) : (
                      <><XCircle style={{ width: 16, height: 16 }} /> Something went wrong. Please try again.</>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @media (min-width: 640px) {
          .form-row { grid-template-columns: 1fr 1fr !important; }
        }
        @media (min-width: 768px) {
          .contact-layout { grid-template-columns: 2fr 3fr !important; }
        }
      `}</style>
    </section>
  );
}

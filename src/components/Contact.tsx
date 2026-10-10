import { Mail, MapPin, Phone, Copy, CheckCheck } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { personalInfo } from '../data/site'

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function Contact() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [emailVisible, setEmailVisible] = useState(false)
  const [phoneVisible, setPhoneVisible] = useState(false)

  const validateForm = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {}

    if (!form.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!form.email.trim()) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Please enter a valid email address.'
    }
    if (!form.subject.trim()) nextErrors.subject = 'Please add a subject.'
    if (!form.message.trim()) nextErrors.message = 'Please write a brief message.'

    return nextErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateForm()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: 'info', message: 'Preparing your email draft...' })

    const mailtoBody = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      '',
      'Message:',
      form.message,
    ].join('\n')

    const mailtoLink = `mailto:${personalInfo.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(mailtoBody)}`

    window.location.href = mailtoLink
    setForm(initialForm)
    setErrors({})
    setStatus({
      type: 'success',
      message: 'Your email application should open with a prefilled message so you can send it. This site does not have a backend form service enabled.',
    })
    setIsSubmitting(false)
  }

  const handleCopyEmail = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(personalInfo.email)
      } else {
        const tempInput = document.createElement('input')
        tempInput.value = personalInfo.email
        document.body.appendChild(tempInput)
        tempInput.select()
        document.execCommand('copy')
        document.body.removeChild(tempInput)
      }

      setCopied(true)
      setStatus({ type: 'success', message: 'Email address copied to your clipboard.' })
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setStatus({ type: 'error', message: 'Clipboard access is unavailable. You can copy the email manually instead.' })
    }
  }

  return (
    <section id="contact" className="content-section contact-section">
      <div className="container contact-layout">
        <div className="section-intro reveal">
          <span className="section-label">04 / LET&apos;S CONNECT</span>
          <h2>Have an Idea? Let&apos;s Build Something Great.</h2>
        </div>

        <div className="contact-grid reveal">
          <aside className="contact-panel" aria-label="Contact details">
            <p className="privacy-note">{personalInfo.privacyNote}</p>

            <div className="contact-item">
              {emailVisible ? (
                <a href={`mailto:${personalInfo.email}`}>
                  <Mail size={18} />
                  {personalInfo.email}
                </a>
              ) : (
                <button
                  type="button"
                  className="privacy-toggle"
                  onClick={() => setEmailVisible(true)}
                  aria-label="Reveal email address"
                >
                  <Mail size={18} />
                  Reveal Email Address
                </button>
              )}
            </div>

            <div className="contact-item">
              {phoneVisible ? (
                <a href={`tel:${personalInfo.phone}`}>
                  <Phone size={18} />
                  {personalInfo.phone}
                </a>
              ) : (
                <button
                  type="button"
                  className="privacy-toggle"
                  onClick={() => setPhoneVisible(true)}
                  aria-label="Show phone number"
                >
                  <Phone size={18} />
                  Show Phone Number
                </button>
              )}
            </div>

            <div className="contact-item">
              <a href={personalInfo.github} target="_blank" rel="noreferrer">
                <MapPin size={18} />
                GitHub Profile
              </a>
            </div>

            {emailVisible ? (
              <button type="button" className="copy-button" onClick={handleCopyEmail}>
                {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                {copied ? 'Copied' : 'Copy Email'}
              </button>
            ) : null}
          </aside>

          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="field-row">
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  placeholder="Your name"
                />
                {errors.name ? <small id="name-error">{errors.name}</small> : null}
              </label>

              <label>
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(event) => setForm({ ...form, email: event.target.value })}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  placeholder="you@example.com"
                />
                {errors.email ? <small id="email-error">{errors.email}</small> : null}
              </label>
            </div>

            <label>
              <span>Subject</span>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={(event) => setForm({ ...form, subject: event.target.value })}
                aria-invalid={Boolean(errors.subject)}
                aria-describedby={errors.subject ? 'subject-error' : undefined}
                placeholder="Project inquiry"
              />
              {errors.subject ? <small id="subject-error">{errors.subject}</small> : null}
            </label>

            <label>
              <span>Message</span>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={(event) => setForm({ ...form, message: event.target.value })}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'message-error' : undefined}
                placeholder="Tell me about your idea..."
              />
              {errors.message ? <small id="message-error">{errors.message}</small> : null}
            </label>

            <div className="form-note">
              This form uses your email app to draft and send the message. A real backend is not configured yet.
            </div>

            <button type="submit" className="primary-button submit-button" disabled={isSubmitting}>
              {isSubmitting ? 'Preparing...' : 'Submit'}
            </button>

            {status ? (
              <p className={`form-status ${status.type}`} aria-live="polite">
                {status.message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact

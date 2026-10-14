import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Mail, Copy, Check, Send, ShieldCheck, FileDown, Building2, User } from 'lucide-react';

export const Contact: React.FC = () => {
  const { data, setIsDossierOpen } = usePlayer();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    inquiryType: 'Scouting Assessment / Trial',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    // Construct standard mailto link
    const subjectLine = encodeURIComponent(
      `[${formData.inquiryType}] ${formData.subject || 'Player Inquiry for Luciano Johnson'}`
    );
    const bodyText = encodeURIComponent(
      `Hello Luciano Johnson,\n\nName: ${formData.name}\nEmail: ${formData.email}\nOrganization/Club: ${formData.organization || 'N/A'}\nInquiry Type: ${formData.inquiryType}\n\nMessage:\n${formData.message}\n\nSent via Official Digital Portfolio`
    );

    window.location.href = `mailto:${data.email}?subject=${subjectLine}&body=${bodyText}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-20 lg:py-28 bg-[#08080a] border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto pb-12">
          <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Professional Representation & Direct Scouting
          </div>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
            Contact Luciano Johnson
          </h2>
          <p className="mt-3 text-base text-zinc-400">
            Dedicated channel for football clubs, sporting directors, head coaches, scouts, licensed agents, and football representatives.
          </p>
        </div>

        {/* 2-Column Contact Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Credentials & Dossier */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Primary Email Card */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-7 shadow-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>Official Direct Email</span>
              </div>

              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/80 flex items-center justify-between gap-3">
                <span className="font-mono text-sm sm:text-base font-bold text-white truncate selection:bg-amber-400 selection:text-black">
                  {data.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer shrink-0"
                  title="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`mailto:${data.email}?subject=Scouting Inquiry for Luciano Johnson`}
                  className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-bold uppercase text-xs tracking-wider hover:from-amber-300 hover:to-amber-400 transition-all text-center"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email</span>
                </a>

                <button
                  onClick={() => setIsDossierOpen(true)}
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-zinc-300 hover:text-white border border-zinc-700 hover:border-amber-400/50 text-xs font-semibold transition-all cursor-pointer"
                >
                  <FileDown className="w-4 h-4 text-amber-400" />
                  <span>Scouting Sheet</span>
                </button>
              </div>
            </div>

            {/* Representative Verification Notice */}
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6">
              <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Verified Player Channels</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                All communications sent to <strong className="text-white">{data.email}</strong> are routed directly to Luciano Johnson and authorized career representatives. Club trials, contract offers, and match scouting inquiries receive priority response.
              </p>

              <div className="mt-4 pt-4 border-t border-zinc-800/80 space-y-2 text-xs text-zinc-400">
                <div className="flex items-center justify-between">
                  <span>Current Club Status:</span>
                  <span className="text-zinc-200 font-semibold">{data.currentClub}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Career Clubs:</span>
                  <span className="text-zinc-200 font-semibold">5 Teams Recorded</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Response Time:</span>
                  <span className="text-emerald-400 font-semibold">Within 24–48 Hours</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Scouting & Club Contact Form */}
          <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8 shadow-xl">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white">
              Send Official Inquiry
            </h3>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Submit your inquiry below to immediately prepare and dispatch an official scouting message.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-display text-2xl font-bold uppercase text-white">
                  Inquiry Dispatched
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
                  Your email draft has been generated for <strong>{data.email}</strong>. Thank you for reaching out regarding Luciano Johnson.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-5 inline-flex items-center px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-700 rounded-lg cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Johnathan Smith"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 pl-10 pr-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Your Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. scout@footballclub.com"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 pl-10 pr-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Organization */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Club / Agency / Organization
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Vasco FC / Scout Agency"
                        className="w-full rounded-lg border border-zinc-700 bg-zinc-900 pl-10 pr-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                      Inquiry Nature
                    </label>
                    <select
                      value={formData.inquiryType}
                      onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                      className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                    >
                      <option value="Scouting Assessment / Trial">Scouting Assessment / Trial</option>
                      <option value="Contract / Club Transfer Opportunity">Contract / Club Transfer Opportunity</option>
                      <option value="Agent / Agency Representation">Agent / Agency Representation</option>
                      <option value="Friendly / Competitive Fixture Scout">Fixture Scout Invitation</option>
                      <option value="General Football Inquiry">General Football Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Trial Invitation & Senior Squad Opportunity"
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1.5">
                    Inquiry Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Please include details of the trial schedule, match attendance, or representation inquiry..."
                    className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-lg bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500 text-black font-bold uppercase tracking-wider text-sm hover:from-amber-300 hover:to-amber-400 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.99] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Scout Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

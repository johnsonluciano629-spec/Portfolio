import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { X, Save, RotateCcw, User, Shield, FileText } from 'lucide-react';

export const EditProfileModal: React.FC = () => {
  const { data, updateProfile, isEditModalOpen, setIsEditModalOpen, resetToDefault } = usePlayer();

  const [formData, setFormData] = useState({
    fullName: data.fullName,
    email: data.email,
    position: data.position,
    secondaryPosition: data.secondaryPosition,
    nationality: data.nationality,
    height: data.height,
    preferredFoot: data.preferredFoot,
    currentClub: data.currentClub,
    squadNumber: data.squadNumber,
    headline: data.headline,
    heroIntro: data.heroIntro,
    bioParagraph0: data.bioParagraphs[0] || '',
    bioParagraph1: data.bioParagraphs[1] || '',
    bioParagraph2: data.bioParagraphs[2] || '',
    strengthsText: data.strengths.join(', ')
  });

  if (!isEditModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: formData.fullName,
      email: formData.email,
      position: formData.position,
      secondaryPosition: formData.secondaryPosition,
      nationality: formData.nationality,
      height: formData.height,
      preferredFoot: formData.preferredFoot,
      currentClub: formData.currentClub,
      squadNumber: formData.squadNumber,
      headline: formData.headline,
      heroIntro: formData.heroIntro,
      bioParagraphs: [formData.bioParagraph0, formData.bioParagraph1, formData.bioParagraph2].filter(Boolean),
      strengths: formData.strengthsText.split(',').map((s) => s.trim()).filter(Boolean)
    });
    setIsEditModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
      <div className="relative my-8 w-full max-w-3xl rounded-2xl border border-zinc-700 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Player Administration
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white">
              Edit Player Portfolio Details
            </h3>
          </div>
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          {/* Section 1: Core Player Identity */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              <User className="w-4 h-4" />
              <span>Core Player Identity</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Squad Number</label>
                <input
                  type="text"
                  value={formData.squadNumber}
                  onChange={(e) => setFormData({ ...formData, squadNumber: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Custom Picture Uploader */}
            <div className="mt-4 p-4 rounded-xl border border-zinc-800 bg-zinc-900/60">
              <label className="block text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                Player Portrait / Match Picture
              </label>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {data.heroPortrait ? (
                  <div className="relative h-20 w-16 rounded-lg overflow-hidden border border-zinc-700 bg-zinc-950 shrink-0">
                    <img
                      src={data.heroPortrait}
                      alt="Current player portrait"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-20 w-16 rounded-lg border border-dashed border-zinc-700 bg-zinc-950 flex flex-col items-center justify-center text-xs text-zinc-500 shrink-0">
                    No photo
                  </div>
                )}
                <div className="flex-1 flex flex-wrap items-center gap-3">
                  <label className="cursor-pointer px-4 py-2 text-xs font-semibold rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-amber-400/50 transition-all">
                    <span>Upload New Picture</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (ev) => {
                            if (ev.target?.result) {
                              updateProfile({ heroPortrait: ev.target.result as string });
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                  {data.heroPortrait && (
                    <button
                      type="button"
                      onClick={() => updateProfile({ heroPortrait: '' })}
                      className="px-3 py-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      Remove Picture
                    </button>
                  )}
                  <span className="text-[11px] text-zinc-500">
                    Will be displayed on hero banner and scouting sheet
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Technical & Physical Specifications */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              <Shield className="w-4 h-4" />
              <span>Technical & Physical Attributes</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Primary Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Secondary Position</label>
                <input
                  type="text"
                  value={formData.secondaryPosition}
                  onChange={(e) => setFormData({ ...formData, secondaryPosition: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Current Club</label>
                <input
                  type="text"
                  value={formData.currentClub}
                  onChange={(e) => setFormData({ ...formData, currentClub: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Nationality</label>
                <input
                  type="text"
                  value={formData.nationality}
                  onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Height</label>
                <input
                  type="text"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                  placeholder="e.g. 182 cm"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Preferred Foot</label>
                <input
                  type="text"
                  value={formData.preferredFoot}
                  onChange={(e) => setFormData({ ...formData, preferredFoot: e.target.value })}
                  placeholder="e.g. Right / Left / Both"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-zinc-400 mb-1">
                  Key Strengths (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.strengthsText}
                  onChange={(e) => setFormData({ ...formData, strengthsText: e.target.value })}
                  placeholder="Pace, Dribbling, Press Resistance, Stamina"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Biography */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
              <FileText className="w-4 h-4" />
              <span>Player Biography & Ethos</span>
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Paragraph 1 (Career Overview)</label>
                <textarea
                  rows={2}
                  value={formData.bioParagraph0}
                  onChange={(e) => setFormData({ ...formData, bioParagraph0: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Paragraph 2 (Development & Teamwork)</label>
                <textarea
                  rows={2}
                  value={formData.bioParagraph1}
                  onChange={(e) => setFormData({ ...formData, bioParagraph1: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">Paragraph 3 (Ambition & Goals)</label>
                <textarea
                  rows={2}
                  value={formData.bioParagraph2}
                  onChange={(e) => setFormData({ ...formData, bioParagraph2: e.target.value })}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
            <button
              type="button"
              onClick={resetToDefault}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset To Default Values</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Save Portfolio Details</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

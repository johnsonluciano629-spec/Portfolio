import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { ClubExperience } from '../types';
import { Shield, Calendar, Award, Edit3, CheckCircle, ChevronRight, Layers, ListFilter } from 'lucide-react';

export const Career: React.FC = () => {
  const { data, updateClub } = usePlayer();
  const [selectedClubId, setSelectedClubId] = useState<string>(data.clubs[0]?.id || 'club-old-mutual');
  const [editingClub, setEditingClub] = useState<ClubExperience | null>(null);
  const [viewMode, setViewMode] = useState<'timeline' | 'grid'>('timeline');

  const selectedClub = data.clubs.find((c) => c.id === selectedClubId) || data.clubs[0];

  const handleSaveClubEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClub) {
      updateClub(editingClub.id, {
        years: editingClub.years,
        position: editingClub.position,
        tierOrLeague: editingClub.tierOrLeague,
        highlights: editingClub.highlights
      });
      setEditingClub(null);
    }
  };

  return (
    <section id="career" className="relative py-20 lg:py-28 bg-[#08080a] border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Career Experience & Club Trajectory
            </div>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Football Clubs
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Verified career record including current club <strong className="text-amber-400">ONE FC</strong> alongside competitive club trajectory across Old Mutual FC, Cape Umoya FC, Clarewood FC, Antalyaspor FC, and Vasco FC. Click any club to inspect or update details.
            </p>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-lg self-start md:self-auto">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>Timeline View</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-amber-400 text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All Clubs Grid</span>
            </button>
          </div>
        </div>

        {/* TIMELINE INTERACTIVE VIEW */}
        {viewMode === 'timeline' && (
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Clubs Navigation Column */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              {data.clubs.map((club, index) => {
                const isSelected = club.id === selectedClubId;
                return (
                  <button
                    key={club.id}
                    onClick={() => setSelectedClubId(club.id)}
                    className={`group w-full text-left p-4 rounded-xl border transition-all cursor-pointer relative overflow-hidden ${
                      isSelected
                        ? 'border-amber-400 bg-zinc-900/90 shadow-lg shadow-amber-500/10'
                        : 'border-zinc-800 bg-zinc-950/70 hover:border-zinc-700 hover:bg-zinc-900/60'
                    }`}
                  >
                    {/* Active Indicator Bar */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-400" />
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        {/* Club Badge space */}
                        <div
                          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-zinc-700 text-base font-bold uppercase tracking-wider text-white shadow-inner"
                          style={{
                            backgroundColor: club.crestColor || '#18181b',
                            borderColor: isSelected ? '#f59e0b' : '#3f3f46'
                          }}
                        >
                          {club.shortName || club.name.slice(0, 2)}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold">
                              0{index + 1}
                            </span>
                            <span className="text-[11px] text-zinc-400">·</span>
                            <span className="text-[11px] text-zinc-400">{club.tierOrLeague}</span>
                          </div>
                          <h3 className="font-display text-2xl font-bold uppercase text-white group-hover:text-amber-300 transition-colors">
                            {club.name}
                          </h3>
                        </div>
                      </div>

                      <ChevronRight
                        className={`w-5 h-5 transition-transform ${
                          isSelected ? 'text-amber-400 translate-x-1' : 'text-zinc-600'
                        }`}
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs border-t border-zinc-800/80 pt-2.5">
                      <span className="text-zinc-400">{club.years}</span>
                      <span className="text-zinc-300 font-medium">{club.position}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Club Detailed Showcase Panel */}
            <div className="lg:col-span-7 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 sm:p-8 backdrop-blur-md relative">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-zinc-800">
                <div className="flex items-center gap-4">
                  {/* Space for Club Logo / Crest */}
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl border border-amber-400/40 text-xl font-black uppercase text-white shadow-lg"
                    style={{ backgroundColor: selectedClub.crestColor || '#18181b' }}
                  >
                    {selectedClub.shortName || selectedClub.name.slice(0, 2)}
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                      Verified Club Experience
                    </div>
                    <h3 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-white">
                      {selectedClub.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setEditingClub({ ...selectedClub })}
                  className="inline-flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Edit Club Info</span>
                </button>
              </div>

              {/* Editable Fields Summary */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-lg bg-zinc-950/70 p-4 border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Years / Season</span>
                  </div>
                  <div className="mt-2 text-sm sm:text-base font-semibold text-white">
                    {selectedClub.years}
                  </div>
                </div>

                <div className="rounded-lg bg-zinc-950/70 p-4 border border-zinc-800">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400">
                    <Shield className="w-3.5 h-3.5 text-amber-400" />
                    <span>Position Played</span>
                  </div>
                  <div className="mt-2 text-sm sm:text-base font-semibold text-white">
                    {selectedClub.position}
                  </div>
                </div>
              </div>

              {/* Highlights & Experience Notes */}
              <div className="mt-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>Career Highlights & Development Milestones</span>
                </div>
                <div className="space-y-2.5">
                  {selectedClub.highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 rounded-lg border border-zinc-800/80 bg-zinc-950/40 p-3.5 text-sm text-zinc-300"
                    >
                      <CheckCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-500">
                <span>Sequence preserved per official player career profile</span>
                <span className="text-emerald-400 font-medium">Verified Club Record</span>
              </div>
            </div>
          </div>
        )}

        {/* ALL CLUBS GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.clubs.map((club, idx) => (
              <div
                key={club.id}
                className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/70 p-6 hover:border-amber-400/50 transition-all hover:bg-zinc-900"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-700 text-base font-bold uppercase text-white"
                      style={{ backgroundColor: club.crestColor || '#18181b' }}
                    >
                      {club.shortName || club.name.slice(0, 2)}
                    </div>
                    <div className="flex items-center gap-2">
                      {club.id === 'club-one-fc' && (
                        <span className="rounded bg-amber-400 text-black text-[10px] font-black px-2 py-0.5 uppercase tracking-wider">
                          Current Club
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold text-amber-400">
                        0{idx + 1} / 0{data.clubs.length}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase text-white">
                    {club.name}
                  </h3>
                  <div className="text-xs text-zinc-400 mt-0.5">{club.tierOrLeague}</div>

                  <div className="mt-4 pt-3 border-t border-zinc-800/80 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Years:</span>
                      <span className="text-zinc-300 font-medium">{club.years}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-zinc-500">Position:</span>
                      <span className="text-zinc-300 font-medium">{club.position}</span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-1.5">
                    {club.highlights.slice(0, 2).map((h, i) => (
                      <div key={i} className="text-xs text-zinc-400 flex items-start gap-1.5">
                        <span className="text-amber-400 mt-0.5">·</span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800 flex justify-end">
                  <button
                    onClick={() => {
                      setSelectedClubId(club.id);
                      setEditingClub({ ...club });
                    }}
                    className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Club</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* QUICK CLUB EDIT MODAL */}
      {editingClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-700 bg-zinc-950 p-6 shadow-2xl">
            <h3 className="font-display text-2xl font-bold uppercase text-white">
              Edit Club: {editingClub.name}
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Update playing years, position, and club highlights. Changes are saved locally.
            </p>

            <form onSubmit={handleSaveClubEdit} className="mt-5 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  Years / Seasons Played
                </label>
                <input
                  type="text"
                  value={editingClub.years}
                  onChange={(e) =>
                    setEditingClub({ ...editingClub, years: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  placeholder="e.g. 2023 - 2024"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  Position Played
                </label>
                <input
                  type="text"
                  value={editingClub.position}
                  onChange={(e) =>
                    setEditingClub({ ...editingClub, position: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  placeholder="e.g. Winger / Attacking Midfielder"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  League / Tier Description
                </label>
                <input
                  type="text"
                  value={editingClub.tierOrLeague}
                  onChange={(e) =>
                    setEditingClub({ ...editingClub, tierOrLeague: e.target.value })
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  placeholder="e.g. Football Club / Professional League"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  Career Highlights (One per line)
                </label>
                <textarea
                  rows={3}
                  value={editingClub.highlights.join('\n')}
                  onChange={(e) =>
                    setEditingClub({
                      ...editingClub,
                      highlights: e.target.value.split('\n').filter((l) => l.trim().length > 0)
                    })
                  }
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                  placeholder="Enter highlights on separate lines"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setEditingClub(null)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

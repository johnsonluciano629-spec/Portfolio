import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { Target, Flame, Users, Award, Edit2 } from 'lucide-react';

export const About: React.FC = () => {
  const { data, setIsEditModalOpen } = usePlayer();

  const corePillars = [
    {
      title: 'Passion For The Game',
      icon: Flame,
      description:
        'A lifelong devotion to football that fuels intense work ethic, competitive hunger, and a love for competing at the highest professional tempo.'
    },
    {
      title: 'Commitment To Development',
      icon: Target,
      description:
        'Dedicated to ongoing physical conditioning, positional intelligence, match sharpness, and absorbing tactical directions from elite coaches.'
    },
    {
      title: 'Teamwork & Discipline',
      icon: Users,
      description:
        'Unselfish playing style prioritizing collective squad goals, high-pressing synchronization, mutual respect, and accountability.'
    },
    {
      title: 'High Professional Ambition',
      icon: Award,
      description:
        'Determined mindset geared toward continuous career ascension, international standards, and bringing victory to club crests.'
    }
  ];

  return (
    <section id="about" className="relative py-20 lg:py-28 bg-[#0a0a0c] border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-zinc-800/80">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Player Biography
            </div>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              About Luciano Johnson
            </h2>
          </div>
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 border border-zinc-700 hover:border-amber-400/50 rounded-lg transition-colors cursor-pointer"
          >
            <Edit2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Edit Bio & Details</span>
          </button>
        </div>

        {/* Content Layout */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Main Biography Prose */}
          <div className="lg:col-span-7 space-y-6 text-zinc-300 leading-relaxed text-base sm:text-lg">
            {data.bioParagraphs.map((para, index) => (
              <p key={index} className="font-normal text-zinc-300">
                {para}
              </p>
            ))}

            {/* Editable Scouting Placeholder Notice */}
            <div className="mt-8 rounded-xl border border-zinc-800 bg-zinc-900/50 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                Note For Scouts & Sporting Directors
              </div>
              <p className="text-xs sm:text-sm text-zinc-400 leading-normal">
                This digital portfolio only displays verified career clubs and verified biographical data. Specific seasonal statistics, contract timelines, and match video clips can be added or updated via the profile editor or requested directly via email.
              </p>
            </div>
          </div>

          {/* Core Athletic Pillars */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {corePillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-800 bg-zinc-900/70 p-5 transition-all hover:border-amber-400/40 hover:bg-zinc-850"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-amber-400/30 bg-amber-400/10 text-amber-400">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold uppercase tracking-wide text-white">
                        {pillar.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

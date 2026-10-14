import React, { useEffect } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

export const LightboxModal: React.FC = () => {
  const { activeLightboxPhoto, setActiveLightboxPhoto, gallery } = usePlayer();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightboxPhoto) return;
      if (e.key === 'Escape') {
        setActiveLightboxPhoto(null);
      } else if (e.key === 'ArrowRight') {
        const currentIndex = gallery.findIndex((p) => p.id === activeLightboxPhoto.id);
        if (currentIndex < gallery.length - 1) {
          setActiveLightboxPhoto(gallery[currentIndex + 1]);
        }
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = gallery.findIndex((p) => p.id === activeLightboxPhoto.id);
        if (currentIndex > 0) {
          setActiveLightboxPhoto(gallery[currentIndex - 1]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxPhoto, gallery, setActiveLightboxPhoto]);

  if (!activeLightboxPhoto) return null;

  const currentIndex = gallery.findIndex((p) => p.id === activeLightboxPhoto.id);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6"
      onClick={() => setActiveLightboxPhoto(null)}
    >
      <div
        className="relative max-h-[92vh] max-w-5xl w-full flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              {activeLightboxPhoto.category}
            </span>
            <span className="text-zinc-600">·</span>
            <span className="text-xs text-zinc-400">
              {currentIndex + 1} of {gallery.length}
            </span>
          </div>

          <button
            onClick={() => setActiveLightboxPhoto(null)}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Media Frame */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden max-h-[70vh]">
          <img
            src={activeLightboxPhoto.imageUrl}
            alt={activeLightboxPhoto.title}
            className="max-h-full max-w-full object-contain"
            referrerPolicy="no-referrer"
          />

          {/* Navigation Arrows */}
          {currentIndex > 0 && (
            <button
              onClick={() => setActiveLightboxPhoto(gallery[currentIndex - 1])}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 text-white hover:bg-amber-400 hover:text-black transition-all cursor-pointer border border-zinc-700"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {currentIndex < gallery.length - 1 && (
            <button
              onClick={() => setActiveLightboxPhoto(gallery[currentIndex + 1])}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/70 text-white hover:bg-amber-400 hover:text-black transition-all cursor-pointer border border-zinc-700"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Bottom Details */}
        <div className="p-6 bg-zinc-950 border-t border-zinc-850">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-white">
                {activeLightboxPhoto.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-300">
                {activeLightboxPhoto.caption}
              </p>
            </div>
            {activeLightboxPhoto.dateTag && (
              <span className="self-start sm:self-auto text-xs font-mono text-zinc-400 border border-zinc-800 px-2.5 py-1 rounded bg-zinc-900 shrink-0">
                {activeLightboxPhoto.dateTag}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

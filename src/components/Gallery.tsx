import React, { useState, useRef } from 'react';
import { usePlayer } from '../context/PlayerContext';
import { GalleryPhoto } from '../types';
import { Upload, Eye, Trash2, Image as ImageIcon, Plus } from 'lucide-react';

export const Gallery: React.FC = () => {
  const { gallery, addGalleryPhoto, deleteGalleryPhoto, setActiveLightboxPhoto } = usePlayer();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  // New photo state
  const [newTitle, setNewTitle] = useState('');
  const [newCaption, setNewCaption] = useState('');
  const [newCategory, setNewCategory] = useState<GalleryPhoto['category']>('match');
  const [newImageData, setNewImageData] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', label: 'All Photos' },
    { id: 'match', label: 'Match Action' },
    { id: 'training', label: 'Training Ground' },
    { id: 'action', label: 'Action Shots' },
    { id: 'portrait', label: 'Player Portraits' },
    { id: 'club', label: 'Club & Arena' }
  ];

  const filteredPhotos =
    activeTab === 'all'
      ? gallery
      : gallery.filter((p) => p.category === activeTab);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEv) => {
        if (loadEv.target?.result) {
          setNewImageData(loadEv.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageData) {
      alert('Please select an image file to upload.');
      return;
    }

    addGalleryPhoto({
      title: newTitle.trim() || 'Luciano Johnson Football Media',
      caption: newCaption.trim() || 'Verified media asset.',
      category: newCategory,
      imageUrl: newImageData,
      dateTag: 'Uploaded Media'
    });

    // Reset
    setNewTitle('');
    setNewCaption('');
    setNewImageData('');
    setIsUploadModalOpen(false);
  };

  return (
    <section id="gallery" className="relative py-20 lg:py-28 bg-[#08080a] border-b border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Media & Photographic Archive
            </div>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-black uppercase text-white tracking-tight">
              Football Gallery
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-2xl">
              Photographs capturing matchplay, tactical agility drills, official portraits, and club arenas. Luciano can upload match and training photos directly to expand this portfolio.
            </p>
          </div>

          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="self-start md:self-auto flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <Upload className="w-4 h-4" />
            <span>Upload New Photo</span>
          </button>
        </div>

        {/* Filter Bar (Section 1.A: Functional buttons with click handlers) */}
        <div className="mt-8 flex flex-wrap items-center gap-2 p-1.5 bg-zinc-900/80 border border-zinc-800 rounded-xl w-fit">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === cat.id
                  ? 'bg-amber-400 text-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Bento Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition-all hover:border-amber-400/50 hover:shadow-xl hover:shadow-amber-500/10"
            >
              {/* Media Container */}
              <div
                className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900 cursor-pointer"
                onClick={() => setActiveLightboxPhoto(photo)}
              >
                <img
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {/* Hover Quick Action */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/85 text-xs font-bold text-amber-300 border border-amber-400/50">
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Fullscreen</span>
                  </span>
                </div>

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="rounded bg-black/80 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-amber-400 border border-zinc-800">
                    {photo.category}
                  </span>
                  {photo.dateTag && (
                    <span className="rounded bg-black/80 px-2 py-0.5 text-[10px] text-zinc-300 border border-zinc-800">
                      {photo.dateTag}
                    </span>
                  )}
                </div>

                {/* Delete button for custom uploaded photos */}
                {photo.id.startsWith('gal-custom-') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Delete this uploaded photograph?')) {
                        deleteGalleryPhoto(photo.id);
                      }
                    }}
                    className="absolute top-3 right-3 p-1.5 rounded bg-black/80 text-rose-400 hover:text-rose-300 border border-zinc-800 hover:border-rose-400 cursor-pointer"
                    title="Delete custom photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Photo Caption / Information */}
              <div className="p-4 bg-zinc-950 border-t border-zinc-850">
                <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="mt-1 text-xs text-zinc-400 line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state when filter has no photos */}
        {filteredPhotos.length === 0 && (
          <div className="mt-12 text-center py-16 border border-dashed border-zinc-800 rounded-xl">
            <ImageIcon className="mx-auto w-10 h-10 text-zinc-600 mb-3" />
            <div className="text-base font-bold text-zinc-300">No photos in this category yet</div>
            <p className="mt-1 text-xs text-zinc-500">
              Upload match or training photos to showcase your moments.
            </p>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-black bg-amber-400 rounded-lg cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Upload First Photo</span>
            </button>
          </div>
        )}
      </div>

      {/* UPLOAD PHOTO MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-700 bg-zinc-950 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
              <h3 className="font-display text-2xl font-bold uppercase text-white">
                Upload Football Media
              </h3>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-zinc-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUploadSubmit} className="mt-5 space-y-4">
              {/* Image Picker */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1.5">
                  Select Image File (Match, Training, Portrait)
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-zinc-700 hover:border-amber-400/80 bg-zinc-900/50 p-6 cursor-pointer transition-all"
                >
                  {newImageData ? (
                    <div className="relative aspect-[16/9] w-full max-h-48 overflow-hidden rounded-lg">
                      <img
                        src={newImageData}
                        alt="Preview"
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-1 text-xs text-amber-400 font-semibold">
                        Change File
                      </span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-amber-400 mb-2" />
                      <div className="text-sm font-semibold text-zinc-200">
                        Click to browse photograph
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">
                        PNG, JPG, WEBP from your device
                      </div>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  Photo Title
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. League Match vs Cape Umoya FC"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="match">Match Action</option>
                  <option value="training">Training Photographs</option>
                  <option value="action">Football Action Shots</option>
                  <option value="portrait">Professional Player Portraits</option>
                  <option value="club">Club Photographs</option>
                </select>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-bold uppercase text-zinc-400 mb-1">
                  Caption / Description
                </label>
                <textarea
                  rows={2}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Details about the match, opponent, tactical drill, or club milestone..."
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-2 text-sm text-white focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-black bg-amber-400 hover:bg-amber-300 rounded-lg cursor-pointer"
                >
                  Add To Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

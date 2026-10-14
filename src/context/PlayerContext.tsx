import React, { createContext, useContext, useState, useEffect } from 'react';
import { PlayerProfileData, GalleryPhoto, ClubExperience } from '../types';
import { initialPlayerData, initialGalleryPhotos } from '../data/defaultPlayerData';

interface PlayerContextType {
  data: PlayerProfileData;
  gallery: GalleryPhoto[];
  isEditing: boolean;
  setIsEditing: (val: boolean) => void;
  updateProfile: (updates: Partial<PlayerProfileData>) => void;
  updateClub: (clubId: string, updates: Partial<ClubExperience>) => void;
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  deleteGalleryPhoto: (photoId: string) => void;
  resetToDefault: () => void;
  activeLightboxPhoto: GalleryPhoto | null;
  setActiveLightboxPhoto: (photo: GalleryPhoto | null) => void;
  isDossierOpen: boolean;
  setIsDossierOpen: (open: boolean) => void;
  isEditModalOpen: boolean;
  setIsEditModalOpen: (open: boolean) => void;
}

const LOCAL_STORAGE_KEY_PROFILE = 'luciano_player_portfolio_data_v4';
const LOCAL_STORAGE_KEY_GALLERY = 'luciano_player_gallery_data_v4';

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PlayerProfileData>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PROFILE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return initialPlayerData;
  });

  const [gallery, setGallery] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY_GALLERY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback to initial
    }
    return initialGalleryPhotos;
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_PROFILE, JSON.stringify(data));
    } catch (e) {
      console.warn('LocalStorage save failed', e);
    }
  }, [data]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY_GALLERY, JSON.stringify(gallery));
    } catch (e) {
      console.warn('LocalStorage save gallery failed', e);
    }
  }, [gallery]);

  const updateProfile = (updates: Partial<PlayerProfileData>) => {
    setData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const updateClub = (clubId: string, updates: Partial<ClubExperience>) => {
    setData((prev) => ({
      ...prev,
      clubs: prev.clubs.map((c) => (c.id === clubId ? { ...c, ...updates } : c)),
    }));
  };

  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `gal-custom-${Date.now()}`
    };
    setGallery((prev) => [newPhoto, ...prev]);
  };

  const deleteGalleryPhoto = (photoId: string) => {
    setGallery((prev) => prev.filter((p) => p.id !== photoId));
  };

  const resetToDefault = () => {
    if (window.confirm('Reset all details to default profile data? Any unsaved edits will be restored.')) {
      setData(initialPlayerData);
      setGallery(initialGalleryPhotos);
      try {
        localStorage.removeItem(LOCAL_STORAGE_KEY_PROFILE);
        localStorage.removeItem(LOCAL_STORAGE_KEY_GALLERY);
      } catch {
        // ignore
      }
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        data,
        gallery,
        isEditing,
        setIsEditing,
        updateProfile,
        updateClub,
        addGalleryPhoto,
        deleteGalleryPhoto,
        resetToDefault,
        activeLightboxPhoto,
        setActiveLightboxPhoto,
        isDossierOpen,
        setIsDossierOpen,
        isEditModalOpen,
        setIsEditModalOpen,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};

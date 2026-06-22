import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type TeaserContextValue = {
  bannerDismissed: boolean;
  dismissBanner: () => void;
  modalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  modalShownThisSession: boolean;
  markModalShown: () => void;
};

const TeaserContext = createContext<TeaserContextValue | null>(null);

export function TeaserProvider({ children }: { children: React.ReactNode }) {
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalShownThisSession, setModalShownThisSession] = useState(false);

  const dismissBanner = useCallback(() => setBannerDismissed(true), []);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);
  const markModalShown = useCallback(() => setModalShownThisSession(true), []);

  const value = useMemo(
    () => ({
      bannerDismissed,
      dismissBanner,
      modalOpen,
      openModal,
      closeModal,
      modalShownThisSession,
      markModalShown,
    }),
    [bannerDismissed, dismissBanner, modalOpen, openModal, closeModal, modalShownThisSession, markModalShown],
  );

  return <TeaserContext.Provider value={value}>{children}</TeaserContext.Provider>;
}

export function useTeaser(): TeaserContextValue {
  const ctx = useContext(TeaserContext);
  if (!ctx) {
    throw new Error("useTeaser must be used within TeaserProvider");
  }
  return ctx;
}

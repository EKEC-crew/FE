import { create } from "zustand";

type ModalType = "signUpPrompt" | "passwordError" | null;

interface ErrorModalState {
  modalType: ModalType;
  showSignUpPromptModal: () => void;
  showPasswordErrorModal: () => void;
  closeModal: () => void;
}

export const useErrorModal = create<ErrorModalState>((set) => ({
  modalType: null,
  showSignUpPromptModal: () => set({ modalType: "signUpPrompt" }),
  showPasswordErrorModal: () => set({ modalType: "passwordError" }),
  closeModal: () => set({ modalType: null }),
}));

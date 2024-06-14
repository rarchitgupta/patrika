import { Range } from "@tiptap/react";
import { create } from "zustand";

interface DialogState {
  editor: null | any;
  range: null | Range;
  aiStream: string;
  isAiDialogOpen: boolean;
  isApiKeyDialogOpen: boolean;
  isFileUploadDialogOpen: boolean;
  aiGenerateLoading: boolean;
  editorState: "saved" | "editing";
  setEditorState: (state: "saved" | "editing") => void;
  setAiGenerateLoading: (loading: boolean) => void;
  openApiKeyDialog: () => void;
  closeApiKeyDialog: () => void;
  openAiDialog: () => void;
  closeAiDialog: () => void;
  openFileUploadDialog: () => void;
  closeFileUploadDialog: () => void;
  setEditor: (editor: any) => void;
  setRange: (range: Range) => void;
  setAiStream: (stream: string) => void;
}

export const useAppStore = create<DialogState>((set) => ({
  range: null,
  editor: null,
  aiStream: "",
  isAiDialogOpen: false,
  isApiKeyDialogOpen: false,
  aiGenerateLoading: false,
  isFileUploadDialogOpen: false,
  editorState: "editing",
  setEditorState: (state) => set({ editorState: state }),
  setAiGenerateLoading: (loading) => set({ aiGenerateLoading: loading }),
  openApiKeyDialog: () => set({ isApiKeyDialogOpen: true }),
  closeApiKeyDialog: () => set({ isApiKeyDialogOpen: false }),
  openAiDialog: () => set({ isAiDialogOpen: true }),
  closeAiDialog: () => set({ isAiDialogOpen: false }),
  openFileUploadDialog: () => set({ isFileUploadDialogOpen: true }),
  closeFileUploadDialog: () => set({ isFileUploadDialogOpen: false }),
  setAiStream: (stream) => set({ aiStream: stream }),
  setEditor: (editor) => set({ editor }),
  setRange: (range) => set({ range }),
}));

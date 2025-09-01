import { create } from "zustand";

interface UiState {
  showDialog: boolean;
  taskId: string | number;
  colId: string | number ;
  mode: "add-column" | "add-task" | "edit-task";
  defaultValue: string;
  closeDialog: () => void;
  openDialog: (
    mode: UiState["mode"],
    taskId?: string | number,
    colId?: string | number ,
    defaultValue?: string
  ) => void;
}

const useUiStore = create<UiState>((set) => ({
  showDialog: false,
  taskId: '',
  colId: '',
  mode: "add-column",
  defaultValue: "",
  closeDialog: () => set({ showDialog: false, defaultValue: "" }),
  openDialog: (mode, colId = '', taskId = '', defaultValue = "") =>
    set({
      showDialog: true,
      defaultValue: defaultValue,
      taskId: taskId,
      colId: colId,
      mode: mode,
    }),
}));
export default useUiStore;

import { create } from 'zustand';
import { MODAL_TYPES } from '../constants/modalTypes';

const useStaticDataStore = create((set) => ({
    selectedGroup: null,
    setSelectedGroup: (group) => set({ selectedGroup: group }),
    selectedResource: null,
    setSelectedResource: (data) => set({ selectedResource: data }),
    activeModal: null,
    setActiveModal: (modalType) => set({ activeModal: modalType }),
    closeModal: () => set({ activeModal: null }),
    setErrorModal: () => set({ activeModal: MODAL_TYPES.ERROR }),
    showColorPicker: false,
    setShowColorPicker: (state) => set({ showColorPicker: state }),
    clipboard: null,
    setClipboard: (value) => set({ clipboard: value }),
}));

export default useStaticDataStore;

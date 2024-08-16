import { create } from 'zustand';

const useStaticDataStore = create((set) => ({
    selectedGroup: null,
    setSelectedGroup: (group) => set({ selectedGroup: group }),
    selectedResource: null,
    setSelectedResource: (data) => set({ selectedResource: data }),
    showColorPicker: false,
    setShowColorPicker: (state) => set({ showColorPicker: state }),
    clipboard: null,
    setClipboard: (value) => set({ clipboard: value }),
}));

export default useStaticDataStore;

import React, { useEffect, useState } from 'react';
import useStaticDataStore from '../stores/staticDataStore';
import useLoadGroups from '../hooks/useLoadGroups';
import useLoadLights from '../hooks/useLoadLights';
import useLoadScenes from '../hooks/useLoadScenes';
import useSelectGroup from '../hooks/useSelectGroup';
import StaticHeader from '../components/static-page/StaticHeader';
import StaticPanel from '../components/static-page/StaticPanel';
import ColorPicker from '../components/color-picker/ColorPicker';
import { MODAL_TYPES } from '../constants/modalTypes';
import Modal from '../components/shared/Modal';
import DeleteSceneModal from '../components/static-page/scenes/DeleteSceneModal';
import UpdateSceneModal from '../components/static-page/scenes/UpdateSceneModal';
import ErrorModal from '../components/shared/ErrorModal';
import LoadingScreen from '../components/shared/LoadingScreen';

function StaticPage() {
    const { selectedGroup, setSelectedGroup, showColorPicker, activeModal } = useStaticDataStore(); //prettier-ignore
    const [cachedLightGroups, setCachedLightGroups] = useState([]);
    const [cachedLights, setCachedLights] = useState([]);
    const [cachedScenes, setCachedScenes] = useState([]);
    // TODO: refactor loading states into a single state { pageLoading, panelLoading, ... }
    const [pageLoading, setPageLoading] = useState(true);
    const [prefLoading, setPrefLoading] = useState(true);
    const [panelLoading, setPanelLoading] = useState(true);
    const [lightsLoading, setLightsLoading] = useState(true);
    const [scenesLoading, setScenesLoading] = useState(true);

    useLoadGroups(setCachedLightGroups);
    useLoadLights(
        selectedGroup,
        setCachedLights,
        setLightsLoading,
        prefLoading
    );
    useLoadScenes(
        selectedGroup,
        setCachedScenes,
        setScenesLoading,
        prefLoading
    );
    useSelectGroup(cachedLightGroups, selectedGroup, setSelectedGroup);

    useEffect(() => {
        const fetchPreferredGroup = async () => {
            const prefGroupID =
                await window.huemidi.settings.fetchPreferredGroup();
            const prefGroup = cachedLightGroups.find(
                (group) => group.id === prefGroupID
            );
            setSelectedGroup(prefGroup);
            setPrefLoading(false);
        };

        if (cachedLightGroups && cachedLightGroups.length > 0) {
            fetchPreferredGroup();
        }
    }, [cachedLightGroups, setSelectedGroup]);

    useEffect(() => {
        if (!lightsLoading && !scenesLoading) {
            setPageLoading(false);
            setPanelLoading(false);
        }
    }, [lightsLoading, scenesLoading]);

    const setLoading = () => {
        setPanelLoading(true);
        setLightsLoading(true);
        setScenesLoading(true);
    };

    const updateCachedLights = (id, data, updateAll = false) => {
        setCachedLights((prevLights) =>
            prevLights.map((light) =>
                light.id === id || updateAll
                    ? { ...light, state: { ...light.state, ...data } }
                    : light
            )
        );
    };

    if (pageLoading && activeModal !== MODAL_TYPES.ERROR)
        return <LoadingScreen />;

    const renderPanel = () => {
        if (panelLoading) return <LoadingScreen />;

        return (
            <StaticPanel
                selectedGroup={selectedGroup}
                cachedLights={cachedLights}
                updateCachedLights={updateCachedLights}
                cachedScenes={cachedScenes}
            />
        );
    };

    const renderModal = () => {
        let modalComponent;

        switch (activeModal) {
            case MODAL_TYPES.DELETE_SCENE:
                modalComponent = (
                    <Modal>
                        <DeleteSceneModal setCachedScenes={setCachedScenes} />
                    </Modal>
                );
                break;
            case MODAL_TYPES.CREATE_SCENE:
                // modalComponent = <CreateSceneModal cachedLights={cachedLights} setCachedScenes={setCachedScenes} />;
                modalComponent = (
                    <Modal>
                        <UpdateSceneModal
                            cachedLights={cachedLights}
                            setCachedScenes={setCachedScenes}
                            options={{ label: 'create' }}
                        />
                    </Modal>
                );
                break;
            case MODAL_TYPES.EDIT_SCENE:
                modalComponent = (
                    <Modal>
                        <UpdateSceneModal
                            cachedLights={cachedLights}
                            setCachedScenes={setCachedScenes}
                            options={{ label: 'save' }}
                        />
                    </Modal>
                );
                break;
            case MODAL_TYPES.ERROR:
                modalComponent = (
                    <Modal>
                        <ErrorModal />
                    </Modal>
                );
                break;
            default:
                return null;
        }

        return (
            <div className='absolute h-full w-full flex justify-center bg-black/50 z-40 overflow-hidden'>
                {modalComponent}
            </div>
        );
    };

    return (
        <div className='relative h-full flex flex-col bg-gray-950'>
            <StaticHeader
                cachedLightGroups={cachedLightGroups}
                cachedLights={cachedLights}
                updateCachedLights={updateCachedLights}
                setLoading={setLoading}
            />
            {renderPanel()}
            {showColorPicker && (
                <div className='absolute w-full h-full bg-black/50 z-40 overflow-hidden'>
                    <ColorPicker updateCachedLights={updateCachedLights} />
                </div>
            )}
            {renderModal()}
        </div>
    );
}

export default StaticPage;

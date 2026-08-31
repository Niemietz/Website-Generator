import { useRef, useState } from 'react';

let idCounter = 0;

function nextId(prefix) {
	idCounter += 1;
	return `${prefix}-${idCounter}`;
}

function makeField(name = '', type = 'String', nullable = false, unique = false) {
	return {id: nextId('field'), name, type, nullable, unique};
}

function makeEntity(name) {
	return {
		id: nextId('entity'),
		name,
		//screens: {list: true, detail: true, form: true},
		fields: [makeField('name', 'String'), makeField('customFlag', 'Boolean')],
	};
}

const initialState = {
	projectName: "MyApp",
	description: "",
	port: 5000,
	auth: false,
	staticPage: true,
	/*project: {
		appName: 'MyApp',
		includeLogin: false,
		includeFirebase: true,
		includeGoogleMaps: true,
		includeAzureMaps: false,
		includeSqlConnectVariant: false,
		includeFirestore: false,
		includeLottie: true,
	},
	sync: {
		maxRetries: 3,
		periodicSyncEnabled: false,
		periodicSyncIntervalMinutes: 15,
	},
	imageCache: {
		syncEnabled: true,
		syncIntervalMinutes: 60,
	},
	imageBackend: 'rest',*/
	entities: [makeEntity('Entity')],
	/*extraScreens: [],
	googleMapsApiKey: 'abcdefg',
	azureMapsApiKey: 'abcdefg',*/
};

/** Keeps the same "entity counter never goes back down" default-naming quirk as the original. */
function useEntityCounter() {
	const ref = useRef(1); // seed entity 'Task' already consumed counter #1
	return () => {
		ref.current += 1;
		return ref.current;
	};
}

export default function useGeneratorState() {
	const [state, setState] = useState(initialState);
	const nextEntityNumber = useEntityCounter();

	const setProp = (key, value) =>
		setState((s) => ({...s, [key]: value}));

	const setSyncField = (key, value) => setState((s) => ({...s, sync: {...s.sync, [key]: value}}));

	const setImageCacheField = (key, value) =>
		setState((s) => ({...s, imageCache: {...s.imageCache, [key]: value}}));

	const setImageBackend = (value) => setState((s) => ({...s, imageBackend: value}));

	const setSigningField = (key, value) => setState((s) => ({...s, signing: {...s.signing, [key]: value}}));

	const setGoogleMapsApiKey = (value) => setState((s) => ({...s, googleMapsApiKey: value}));
	const setAzureMapsApiKey = (value) => setState((s) => ({...s, azureMapsApiKey: value}));

	/** Firebase toggle disables/forces dependent fields, mirroring syncFirebaseDependents(). */
	const setIncludeFirebase = (checked) =>
		setState((s) => ({
			...s,
			includeFirebase: checked,
			includeSqlConnectVariant: checked ? s.project.includeSqlConnectVariant : false,
			includeFirestore: checked ? s.project.includeFirestore : false,
			imageBackend: checked ? s.imageBackend : s.imageBackend === 'firebase-storage' ? 'rest' : s.imageBackend,
		}));

	// --- Entities -----------------------------------------------------------
	const addEntity = (name = '') =>
		setState((s) => ({...s, entities: [...s.entities, makeEntity(name || `Entity${nextEntityNumber()}`)]}));

	const removeEntity = (id) => setState((s) => ({...s, entities: s.entities.filter((e) => e.id !== id)}));

	const updateEntity = (id, patch) =>
		setState((s) => ({...s, entities: s.entities.map((e) => (e.id === id ? {...e, ...patch} : e))}));

	const updateEntityScreens = (id, key, value) =>
		setState((s) => ({
			...s,
			entities: s.entities.map((e) => (e.id === id ? {...e, screens: {...e.screens, [key]: value}} : e)),
		}));

	const addField = (entityId) =>
		setState((s) => ({
			...s,
			entities: s.entities.map((e) => (e.id === entityId ? {...e, fields: [...e.fields, makeField()]} : e)),
		}));

	const removeField = (entityId, fieldId) =>
		setState((s) => ({
			...s,
			entities: s.entities.map((e) =>
				e.id === entityId ? {...e, fields: e.fields.filter((f) => f.id !== fieldId)} : e
			),
		}));

	const updateField = (entityId, fieldId, patch) =>
		setState((s) => ({
			...s,
			entities: s.entities.map((e) =>
				e.id === entityId
					? {...e, fields: e.fields.map((f) => (f.id === fieldId ? {...f, ...patch} : f))}
					: e
			),
		}));

	// --- Extra screens --------------------------------------------------------
	const addExtraScreen = (name) =>
		setState((s) =>
			({...s, extraScreens: [...s.extraScreens, name]})
		);
	const removeExtraScreen = (idx) =>
		setState((s) =>
			({...s, extraScreens: s.extraScreens.filter((_, i) => i !== idx)})
		);

	return {
		state,
		actions: {
			setProp,
			setSyncField,
			setImageCacheField,
			setImageBackend,
			setSigningField,
			setGoogleMapsApiKey,
			setAzureMapsApiKey,
			setIncludeFirebase,
			addEntity,
			removeEntity,
			updateEntity,
			updateEntityScreens,
			addField,
			removeField,
			updateField,
			addExtraScreen,
			removeExtraScreen,
		},
	};
}

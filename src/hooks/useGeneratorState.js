import { useRef, useState } from 'react';

String.prototype.capitalize = function() {
	return (this.length > 1) ? this.charAt(0).toUpperCase() + this.slice(1) : this
}

let idCounter = 0;
let idNavigationCounter = 0;

function nextId(prefix) {
	idCounter += 1;
	return `${prefix}-${idCounter}`;
}

function nextIdForNavigation(prefix) {
	idNavigationCounter += 1;
	return `${prefix}-${idNavigationCounter}`;
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

function makeNavigation(name = '', isAnchor = false, isCta = false, ctaText = null) {
	return {
		id: nextIdForNavigation('navigation'),
		name: name,
		componentName: name.capitalize(),
		href: (isAnchor) ? `#${name.capitalize()}` : `/${name.capitalize()}`,
		isAnchor: isAnchor,
		isCta: isCta,
		ctaText: ctaText
	};
}

const initialState = {
	projectName: "MyApp",
	description: "",
	port: 5000,
	auth: false,
	staticPage: true,
	contact: true,
	content: {
		logo: "",
		primaryColor: "#FFA07A",
		secondaryColor: "#FFF3E6",
		accentColor: "#6B3E2A",
		mutedColor: "#BFA08A",
		hero: {
			image: "",
			title: "Welcome to MyApp",
			subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra consequat leo et euismod.",
		},
		main: {
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
		},
		footer: {
			bottomCards: [],
			title: "Lorem ipsum dolor",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra consequat leo et euismod.",
			ctaText: "CALL TO ACTION",

			rightCornerTitle1: "Lorem: ",
			rightCornerValue1: "ipsum",

			rightCornerTitle2: "Lorem: ",
			rightCornerValue2: "ipsum",

			cardTitle1: "Lorem ipsum",

			cardTitle2: "Lorem: ",
			cardValue2: "ipsum dolor sit amet",

			cardTitle3: "Lorem: ",
			cardValue3: "ipsum dolor sit amet"
		},
		notFoundMessage: "",
	},
	navigation: [makeNavigation("About", false, false, null)],
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
	const ref = useRef(1);
	return () => {
		ref.current += 1;
		return ref.current;
	};
}

function useNavigationCounter() {
	const ref = useRef(1);
	return () => {
		ref.current += 1;
		return ref.current;
	};
}

export default function useGeneratorState() {
	const [state, setState] = useState(initialState);
	const nextEntityNumber = useEntityCounter();
	const nextNavigationNumber = useNavigationCounter();

	const setProp = (key, value) =>
		setState((s) => ({...s, [key]: value}));

	const setContent = (key, value) =>
		setState((s) => ({...s, content: {...s.content, [key]: value}}));

	const setHero = (key, value) =>
		setState((s) => ({...s, content: {...s.content, hero: {...s.content.hero, [key]: value}}}));

	const setMain = (key, value) =>
		setState((s) => ({...s, content: {...s.content, main: {...s.content.main, [key]: value}}}));

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

	const addNavigation = (name = '') =>
		setState((s) => ({...s, navigation: [...s.navigation, makeNavigation(name || `Nav${nextNavigationNumber()}`)]}));

	const removeEntity = (id) => setState((s) => ({...s, entities: s.entities.filter((e) => e.id !== id)}));

	const removeNavigation = (id) => setState((s) => ({...s, navigation: s.navigation.filter((e) => e.id !== id)}));

	const updateEntity = (id, patch) =>
		setState((s) => ({...s, entities: s.entities.map((e) => (e.id === id ? {...e, ...patch} : e))}));

	const updateNavigation = (id, patch) =>
		setState((s) => ({...s, navigation: s.navigation.map((e) => (e.id === id ? {...e, ...patch} : e))}));

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
			setContent,
			setHero,
			setMain,
			setSyncField,
			setImageCacheField,
			setImageBackend,
			setSigningField,
			setGoogleMapsApiKey,
			setAzureMapsApiKey,
			setIncludeFirebase,
			addEntity,
			addNavigation,
			removeEntity,
			removeNavigation,
			updateEntity,
			updateNavigation,
			updateEntityScreens,
			addField,
			removeField,
			updateField,
			addExtraScreen,
			removeExtraScreen,
		},
	};
}

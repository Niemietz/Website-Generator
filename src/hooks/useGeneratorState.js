import { useRef, useState } from 'react';

String.prototype.capitalize = function() {
	return (this.length > 1) ? this.charAt(0).toUpperCase() + this.slice(1) : this
}

let idCounter = 0;
let idNavigationCounter = 0;
let idUserCounter = 0;
let idBottomCardCounter = 0;

function nextId(prefix) {
	idCounter += 1;
	return `${prefix}-${idCounter}`;
}

function nextIdForNavigation(prefix) {
	idNavigationCounter += 1;
	return `${prefix}-${idNavigationCounter}`;
}

function nextIdForUser(prefix) {
	idUserCounter += 1;
	return `${prefix}-${idUserCounter}`;
}

function nextIdForBottomCard(prefix) {
	idBottomCardCounter += 1;
	return `${prefix}-${idBottomCardCounter}`;
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

function makeUser(name = '', password = '') {
	return {
		id: nextIdForUser('user'),
		name,
		password,
	};
}

function makeBottomCard(title, description) {
	return {
		id: nextIdForBottomCard('bottomCard'),
		title,
		description,
	};
}

String.prototype.convertToValidFilename = function () {
	if (!this.includes(' ')) {
		return this
	}
	let sb = "";
	this.split(" ").map((word) => {
		sb += word.capitalize()
	})
	return sb
}

function makeNavigation(name = '', isAnchor = false, isCta = false, ctaText = null) {
	return {
		id: nextIdForNavigation('navigation'),
		name: name,
		componentName: name.convertToValidFilename(),
		href: (isAnchor) ? `#${name.convertToValidFilename()}` : `/${name.convertToValidFilename()}`,
		isAnchor: isAnchor,
		isCta: isCta,
		ctaText: ctaText
	};
}

const initialState = (initialPublicWebsite) => ({
	projectName: "MyApp",
	description: "",
	port: 5000,
	auth: false,
	publicWebsite: initialPublicWebsite,
	contact: true,
	content: {
		logo: "",
		primaryColor: "#FFA07A",
		secondaryColor: "#FFF3E6",
		accentColor: "#6B3E2A",
		mutedColor: "#BFA08A",
		primaryColorDarkMode: "#803f25",
		secondaryColorDarkMode: "#9d682e",
		accentColorDarkMode: "#FFF3E6",
		mutedColorDarkMode: "#56483e",
		hero: {
			image: "",
			title: "Welcome to MyApp",
			subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam pharetra consequat leo et euismod.",
		},
		main: {
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
		},
		footer: {
			bottomCards: [
				makeBottomCard("Lorem ipsum", "Lorem ipsum dolor sit amet, consectetur adipiscing elit."),
				makeBottomCard("Lorem ipsum", "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
			],
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
	includeLogin: false,
	includeAdmin: false,
	includePaymentService: false,
	includeMercadoPago: true,
	includePagBank: false,
	includeSqlConnect: false,
	includeMongoDB: true,
	includeNotifications: false,
	includeGoogleMaps: false,
	includeAzureMaps: false,
	login: {
		users: []
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
});

/** Keeps the same "entity counter never goes back down" default-naming quirk as the original. */
function useEntityCounter() {
	const ref = useRef(1);
	return () => {
		ref.current += 1;
		return ref.current;
	};
}

function useUserCounter() {
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

function useBottomCardCounter() {
	const ref = useRef(1);
	return () => {
		ref.current += 1;
		return ref.current;
	};
}

export default function useGeneratorState(initialPublicWebsite) {
	const [state, setState] = useState(initialState(initialPublicWebsite));
	const nextEntityNumber = useEntityCounter();
	const nextUserNumber = useUserCounter();
	const nextNavigationNumber = useNavigationCounter();
	const nextBottomCardNumber = useBottomCardCounter();

	const setProp = (key, value) =>
		setState((s) => ({...s, [key]: value}));

	const setContent = (key, value) =>
		setState((s) => ({...s, content: {...s.content, [key]: value}}));

	const setHero = (key, value) =>
		setState((s) => ({...s, content: {...s.content, hero: {...s.content.hero, [key]: value}}}));

	const setMain = (key, value) =>
		setState((s) => ({...s, content: {...s.content, main: {...s.content.main, [key]: value}}}));

	const setFooter = (key, value) =>
		setState((s) => ({...s, content: {...s.content, footer: {...s.content.footer, [key]: value}}}));

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

	// --- Navigation -----------------------------------------------------------
	const addNavigation = (name = '', isAnchor = false, isCta = false, ctaText = null) =>
		setState((s) => ({...s, navigation: [...s.navigation, makeNavigation(name || `Nav${nextNavigationNumber()}`, isAnchor || false, isCta || false, ctaText)]}));

	const removeNavigation = (id) => setState((s) => ({...s, navigation: s.navigation.filter((e) => e.id !== id)}));

	const updateNavigation = (id, patch) =>
		setState((s) => ({...s, navigation: s.navigation.map((e) => (e.id === id ? {...e, ...patch} : e))}));

	// --- Users -----------------------------------------------------------
	const addUser = (name = '', password = '') =>
		setState((s) => ({...s, login: {...s.login, users: [...s.login.users, makeUser(name || `User${nextUserNumber()}`, password || `123456`)]}}));

	const removeUser = (id) =>
		setState((s) => ({...s, login: {...s.login, users: s.login.users.filter((e) => e.id !== id)}}));

	const updateUser = (id, patch) =>
		setState((s) => ({...s, login: {...s.login, users: [...s.login.users, s.login.users.map((e) => (e.id === id ? {...e, ...patch} : e))]}}));

	// --- Footer Bottom Card -----------------------------------------------------------
	const addBottomCard = (title = '', description = '') =>
		setState((s) => ({...s, content: {...s.content, footer: {...s.content.footer, bottomCards: [...s.content.footer.bottomCards, makeBottomCard(title || `BottomCard${nextBottomCardNumber()}`, description || ``)]}}}));

	const removeBottomCard = (id) =>
		setState((s) => ({...s, content: {...s.content, footer: {...s.content.footer, bottomCards: s.content.footer.bottomCards.filter((e) => e.id !== id) } } }));

	const updateBottomCard = (id, patch) =>
		setState((s) => ({...s, content: {...s.content, footer: {...s.content.footer, bottomCards: s.content.footer.bottomCards.map((e) => (e.id === id ? {...e, ...patch} : e))} } }));

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
			setFooter,
			setSyncField,
			setImageCacheField,
			setImageBackend,
			setSigningField,
			setGoogleMapsApiKey,
			setAzureMapsApiKey,
			setIncludeFirebase,
			addEntity,
			addUser,
			addBottomCard,
			addNavigation,
			removeEntity,
			removeUser,
			removeBottomCard,
			removeNavigation,
			updateEntity,
			updateUser,
			updateBottomCard,
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

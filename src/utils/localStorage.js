const LOCAL_STORAGE_KEY = "state"
const localStorageInitialValue = {
	"templateChose": false,
}

function setLocalStorage(key, value) {
	localStorage.setItem(
		LOCAL_STORAGE_KEY,
		JSON.stringify(
			{
				...(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || JSON.stringify(localStorageInitialValue))),
				[key]: value
			}
		)
	);
}

function getLocalStorage(key) {
	return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || JSON.stringify(localStorageInitialValue))[key] || null
}

export const storage = { setLocalStorage, getLocalStorage }
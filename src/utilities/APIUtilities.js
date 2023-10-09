// Server url from .env file
const serverURL = process.env.REACT_APP_SERV_BASE_URL;

// common method to call GET API
export function getJsonData(url) {
    return fetch(serverURL + url, {
        method: 'GET',
        headers: {
            token: localStorage.getItem('token')
        }
    }).then(res => res.json())
}

// common method to call POST API
export function postJsonData(url, obj) {
    return fetch(serverURL + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(obj)
    }).then(res => res.json())
}

// common method to PUT API 
export function putJsonData(url, obj) {
    return fetch(serverURL + url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: localStorage.getItem('token')
        },
        body: JSON.stringify(obj)
    }).then(res => res.json())
}
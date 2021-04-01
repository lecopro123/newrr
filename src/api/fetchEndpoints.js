import { BASE_URI } from './base'

export default function fetchEndpoints(
    endpoint,
    options = {
        method: 'GET',
        headers: [
            { name: 'Content-Type', value: 'application/json' }
        ],
        body: ''
    }
) {
    const requestURL = BASE_URI + `${endpoint}`
    const requestHeaders = new Headers()

    // requestHeaders.append(
    //   'Authorization',
    //   'Client-ID CDk34t9WKXMunCgr3HpxuI1sDh3sy02h9LSp7Wu7BUA'
    // )

    options.headers &&
        options.headers.map((header) =>
            requestHeaders.append(header.name, header.value)
        )

    let driveRequest
    if (!options.body) {
        driveRequest = new Request(requestURL, {
            method: options.method,
            headers: requestHeaders
        })
    } else {
        driveRequest = new Request(requestURL, {
            method: options.method,
            headers: requestHeaders,
            body: options.body
        })
    }

    return fetch(driveRequest).then((response) => {
        if (response.ok && response.status === 200) {
            return response.json()
        }
        throw response.status
    })
}

exports.getStoreIsOpen = (request, response) => {
let storeName = request.params.storeName
response.json({ store: storeName, status: 'Open' })
}
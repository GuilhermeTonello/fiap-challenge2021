const API_BASE_URL = 'https://fiap-api.apps.pd01e.edc1.cf.ford.com';

const API_ENDPOINT_VEHICLES = `${API_BASE_URL}/vehicles`;
const API_ENDPOINT_PACKAGES = `${API_BASE_URL}/packages`;
const API_ENDPOINT_MODELS = `${API_BASE_URL}/models`;

function getVehicleById(id) {
    return fetch(`${API_ENDPOINT_VEHICLES}/${id}`)
        .then(res => res.json())
        .then(data => data);
}

function getPackageByPackageId(id) {
    return fetch(`${API_ENDPOINT_PACKAGES}/${id}`)
        .then(res => res.json())
        .then(data => data);
}

function getModelByModelId(id) {
    return fetch(`${API_ENDPOINT_MODELS}/${id}`)
        .then(res => res.json())
        .then(data => data);
}

function generateVehicleInfo(vehicleId) {
    let vehicleInfoField = document.querySelector('div#container div#seuCarro div.panel ul');
    getVehicleById(vehicleId)
        .then(vehicleData => getPackageByPackageId(vehicleData.packageId)
            .then(packageData => getModelByModelId(packageData.modelId)
                .then(modelData => {
                    vehicleInfoField.insertAdjacentHTML('beforeend', `
                        <li>ID: ${vehicleData.id}</li>
                        <li>Modelo: ${modelData.descriptions.nameplate}</li>
                        <li>Ano: ${packageData.modelYear}</li>
                        <li>Placa: ${vehicleData.plate}</li>
                    `);
                })
            )
        );
}

generateVehicleInfo('YLYE8TGFZSWK25204');

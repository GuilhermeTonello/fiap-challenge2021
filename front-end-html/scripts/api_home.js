const API_BASE_URL = 'https://fiap-api.apps.pd01e.edc1.cf.ford.com';

const API_ENDPOINT_VEHICLES = `${API_BASE_URL}/vehicles`;
const API_ENDPOINT_PACKAGES = `${API_BASE_URL}/packages`;
const API_ENDPOINT_MODELS = `${API_BASE_URL}/models`;
const API_ENDPOINT_TELEMETRY = `${API_BASE_URL}/telemetry`;

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

function getTelemetryByVehicleId(id) {
    return fetch(`${API_ENDPOINT_TELEMETRY}/?vehicleId=${id}`)
        .then(res => res.json())
        .then(data => data);
}

function generateVehicleInfo(vehicleId) {
    getVehicleById(vehicleId)
        .then(vehicleData => getPackageByPackageId(vehicleData.packageId)
            .then(packageData => getModelByModelId(packageData.modelId)
                .then(modelData => getTelemetryByVehicleId(vehicleId)
                    .then(telemetryData => {
                        let vehicleImg = document.querySelector('div.propaganda img');
						vehicleImg.src = `${modelData.imageUrl}`;
						
						let km = document.querySelector('div.utilidades div.nivel h3#km');
						km.innerHTML = `${telemetryData[0].odometer.value} KM`
                    })
                )
            )
        );
}

generateVehicleInfo('YLYE8TGFZSWK25204');

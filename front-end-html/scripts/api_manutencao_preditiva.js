const API_BASE_URL_FORD = 'https://fiap-api.apps.pd01e.edc1.cf.ford.com';
const API_ENDPOINT_TELEMETRY_FORD = `${API_BASE_URL_FORD}/telemetry`;

const API_BASE_URL_PREDIZER = 'http://equipe-guardian.com.br/ford/py';
const API_ENDPOINT_PREDIZER = `${API_BASE_URL_PREDIZER}/predizer`;

function getTelemetryByVehicleId(id) {
    return fetch(`${API_ENDPOINT_TELEMETRY_FORD}/?vehicleId=${id}`)
        .then(res => res.json())
        .then(data => data);
}

function predizerManutencao(km) {
    return fetch(`${API_ENDPOINT_PREDIZER}?km=${km}`)
        .then(res => res.text());
}

function generateManutencaoPreditiva(vehicleId) {
    getTelemetryByVehicleId(vehicleId)
        .then(telemetryData => predizerManutencao(telemetryData[0].odometer.value)
            .then(predicaoApi => {
                let kmRodadosField = document.querySelector('div.tabela div.table-data p span#S');
                kmRodadosField.innerHTML = telemetryData[0].odometer.value;

                let manutencaoTable = document.querySelector('div.man_recomendada div.tabela');

                predicaoArray = predicaoApi
                    .replace('[', '')
                    .replace(']', '')
                    .replaceAll("'", '')
                    .split(',');

                for (let predicao of predicaoArray) {
                    predicao = predicao.trim();
                    if (predicao != 0) {
                        manutencaoTable.insertAdjacentHTML("beforeend", `
                            <div class="table-data">
                                <p>${predicao}</p>
                            </div>
                        `);
                    }
                }

                // Ordem do array
                //Trocar óleo do motor
                //Trocar filtro do óleo do motor
                //Trocar filtro de combustível
                //Trocar filtro de pólem
                //Trocar filtro de ar
                //valor em R$
            }));
}

generateManutencaoPreditiva(new URLSearchParams(location.search).get('vehicleId'));

const API_BASE_URL_FORD = 'https://fiap-api.apps.pd01e.edc1.cf.ford.com';
const API_ENDPOINT_TELEMETRY_FORD = `${API_BASE_URL_FORD}/telemetry`;

const API_BASE_URL_PREDIZER = 'https://4b81-150-230-88-140.ngrok.io';
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
                
                let predicao = predicaoApi
                    .replace("[", "")
                    .replace("]", "")
                    .replace(".]", "")
                    .replace("[  ", "")
                    .replace(/\s/g, '')
                    .split(".");

                let manutencoesRecomendadas = [];
                for (let i = 0; i < predicao.length; i++) {
                    if (predicao[i] == '1' && i != 5) {
                        switch (i) {
                            case 0:
                                manutencoesRecomendadas.push('Trocar óleo do motor');
                                break;
                            case 1:
                                manutencoesRecomendadas.push('Trocar filtro do óleo do motor');
                                break;
                            case 2:
                                manutencoesRecomendadas.push('Trocar filtro de combustível');
                                break;
                            case 3:
                                manutencoesRecomendadas.push('Trocar filtro de pólem');
                                break;
                            case 4:
                                manutencoesRecomendadas.push('Trocar filtro de ar');
                                break;
                        }
                    }
                    if (i == 5) {
                        manutencoesRecomendadas.push(`Valor previsto: R$ ${predicao[i]}`);
                    }
                }
                let manutencaoTable = document.querySelector('div.man_recomendada div.tabela');
                for (let man of manutencoesRecomendadas) {
                    manutencaoTable.insertAdjacentHTML("beforeend", `
                    <div class="table-data">
                        <p>${man}</p>
                    </div>
                `);
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

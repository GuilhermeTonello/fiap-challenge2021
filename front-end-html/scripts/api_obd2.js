const API_BASE_URL = 'http://150.230.88.140:3000';

const API_ENDPOINT_OBD2 = `${API_BASE_URL}/obd2`;

function getObd2InfoById(id) {
    return fetch(`${API_ENDPOINT_OBD2}?ID=${id}`)
        .then(res => res.json())
        .then(data => data);
}

function generateObd2InfoById(id) {
    let obd2InfoField = document.querySelector('div.conteudo_second div table');
    getObd2InfoById(id).then(obd2Data => {
            let obd2 = obd2Data[0];
            obd2InfoField.insertAdjacentHTML('beforeend', `
            <tr>
            <td>GPS Time</td>
            <td>${obd2.GPS_TIME}</td>
            </tr>
            <tr>
                <td>Device Time</td>
                <td>${obd2.DEVICE_TIME}</td>
            </tr>
            <tr>
                <td>Longitude</td>
                <td>${obd2.LONGITUDE}</td>
            </tr>
            <tr>
                <td>Latitude</td>
                <td>${obd2.LATITUDE}</td>
            </tr>
            <tr>
                <td>GPS Speed</td>
                <td>${obd2.GPS_SPEED}</td>
            </tr>
            <tr>
                <td>Horizontal Dilution of Precision</td>
                <td>${obd2.HORIZONTAL_DILUTION}</td>
            </tr>
            <tr>
                <td>Altitude</td>
                <td>${obd2.ALTITUDE}</td>
            </tr>
        `);
    })
    .catch(e => {
        fetch(`https://guardian-obd2-ford-fiap.herokuapp.com/obd2/?ID=${id}`)
        .then(res => res.json())
        .then(obd2Data => {
            let obd2 = obd2Data[0];
            obd2InfoField.insertAdjacentHTML('beforeend', `
                <tr>
                <td>GPS Time</td>
                <td>${obd2.GPS_TIME}</td>
                </tr>
                <tr>
                    <td>Device Time</td>
                    <td>${obd2.DEVICE_TIME}</td>
                </tr>
                <tr>
                    <td>Longitude</td>
                    <td>${obd2.LONGITUDE}</td>
                </tr>
                <tr>
                    <td>Latitude</td>
                    <td>${obd2.LATITUDE}</td>
                </tr>
                <tr>
                    <td>GPS Speed</td>
                    <td>${obd2.GPS_SPEED}</td>
                </tr>
                <tr>
                    <td>Horizontal Dilution of Precision</td>
                    <td>${obd2.HORIZONTAL_DILUTION}</td>
                </tr>
                <tr>
                    <td>Altitude</td>
                    <td>${obd2.ALTITUDE}</td>
                </tr>
            `);
        })
    });
}

generateObd2InfoById('3');


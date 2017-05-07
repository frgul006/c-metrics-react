import fetch from 'isomorphic-fetch';

class MetricApi {

    static getStats(startDate, endDate) {
        return new Promise((resolve, reject) => {
            fetch(`http://localhost:3001/stats?startDate=${startDate}&endDate=${endDate}`)
                .then(response => response.json())
                .then(json => {
                    resolve(Object.assign([], json));
                }).catch(function(e) {
                    reject(e);
                });
        });
    }
}

export default MetricApi;
import delay from './delay';

class MetricApi {

    static getStats(startDate, endDate) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], this.getStatsAsJson(startDate, endDate)));
            }, delay);
        });
    }
}

export default MetricApi;
export class Aggregator {
    constructor(name) {
        this.aggEventSources = {};
        this.name = name;
    }
    getEventSources() {
        return this.aggEventSources;
    }
    addEventSource(aggEventSource) {
        this.aggEventSources[aggEventSource.uuid] = aggEventSource;
    }
}

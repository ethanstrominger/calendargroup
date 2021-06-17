import { v4 as uuidv4 } from "uuid";
export class AggEventSource {
  constructor(name, sourceType, source) {
    // C Field -
    this.aggEvents = [];
    this.uuid = "";
    this.addAggEvent = (aggEvent) => this.aggEventsgi(aggEvent);
    this.addAggEvents = (aggEvents) =>
      aggEvents.map((aggEvent) => {
        this.addAggEvent(aggEvent);
      });
    this.uuid = uuidv4();
    this.name = name;
    this.sourceType = sourceType;
    this.source = source;
    AggEventSource.aggEventSources[this.uuid] = this;
  }
  static getByUUID(uuid) {
    return AggEventSource.aggEventSources[uuid];
  }
}
AggEventSource.aggEventSources = {};

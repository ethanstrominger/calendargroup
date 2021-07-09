import { AggEvent } from "./AggEvent";
import { v4 as uuidv4 } from "uuid";

export class AggEventSource {
  // C Field -
  readonly aggEventsWithKeys: { [key: string]: AggEvent } = {};
  readonly uuid: string = "";
  name: string;
  sourceType: string;
  source: string;

  static aggEventSources: { [key: string]: AggEventSource } = {};
  static getByUuid(uuid: string) {
    return AggEventSource.aggEventSources[uuid];
  }

  constructor(name, sourceType, source) {
    this.uuid = uuidv4();
    this.name = name;
    this.sourceType = sourceType;
    this.source = source;
    AggEventSource.aggEventSources[this.uuid] = this;
  }

  addAggEvent = (aggEvent: AggEvent) => {
    this.aggEventsWithKeys[aggEvent.uid] = aggEvent;
  };

  addAggEvents = (aggEvents: AggEvent[]) =>
    aggEvents.map((aggEvent) => {
      this.addAggEvent(aggEvent);
    });

  get aggEvents() {
    return Object.values(this.aggEventsWithKeys);
  }

  getEventByUid = (uid: string) => this.aggEventsWithKeys[uid];
}

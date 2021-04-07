import { AggEvent } from "./AggEvent";
import { v4 as uuidv4 } from "uuid";

export interface ISmartEventSource {
  aggEvents: { [key: string]: AggEvent };
}

export class SmartEventSource implements ISmartEventSource {
  // C Field -
  readonly aggEvents: { [key: string]: AggEvent } = {};
  readonly uuid: string = "";
  name: string;
  sourceType: string;
  source: string;

  static smartEventSources: { [key: string]: SmartEventSource } = {};
  static getByUUID(uuid: string) {
    return SmartEventSource.smartEventSources[uuid];
  }

  constructor(name, sourceType, source) {
    this.uuid = uuidv4();
    this.name = name;
    this.sourceType = sourceType;
    this.source = source;
    SmartEventSource.smartEventSources[this.uuid] = this;
  }

  addAggEvent = (aggEvent: AggEvent) =>
    (this.aggEvents[aggEvent.uniqueOccurenceId] = aggEvent);

  addAggEvents = (aggEvents: AggEvent[]) =>
    aggEvents.map((aggEvent) => {
      this.addAggEvent(aggEvent);
    });
}

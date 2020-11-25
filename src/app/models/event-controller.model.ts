import { Event } from '../models/event.model';

/**
 * A Singleton Event controller will keep track of all events and notify the user
 * when certain events are triggered/alarmed
 */
export class EventController {
    private static _instance: EventController;
    eventsCollection: Array<Event> = [];
    
    
    constructor() {
        
    }

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }


    /**
     * adding event to the collection
     * TO DO:  perform validations and only add
     * event if it meets all validations,
     * otherwise return an error message.
     * @param event
     */
    public addEventToCollection(event: Event): boolean {
        this.eventsCollection.push(event);
        return true;
    }
    
    
}

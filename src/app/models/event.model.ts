export class Event {
    /**
     * Class variables
     */
    id?: string;
    title: string;
    desc?: string;
    startTime: any;
    endTime: any;
    allDay: boolean;
    alarm?: boolean;

    /**
     * constrcutor method
     */
    constructor(title: string, id?: string) {
        this.title = title;
        this.id = id;
    }

    private setId(id: string): void {
        this.id = id;
    }

    public setTitle(title: string): void {
        this.title = title;
    }

    public getId(): string {
        return this.id;
    }



}

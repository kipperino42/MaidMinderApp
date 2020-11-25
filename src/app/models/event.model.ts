export class Event {
    /**
     * Class variables
     */
    id?: string;
    title: string;
    desc?: string;
    startDate: Date;
    startTime: Date;
    endTime: Date;
    duration: number;
    allDay: boolean;
    alarm?: boolean;

    /**
     * constrcutor method
     */
    constructor(data?: any) {
        Object.assign(this,data);
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

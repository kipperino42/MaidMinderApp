export class Calendar {

    /**
     * class variables
     */
    mode: string;
    currentDate: Date;
    showEventDetail: boolean;
    formatMonthTitle: string;  // title format
    startingDayMonth: number;  // 1 = Start on monday, 0 = Sunday
    startingDayWeek: number;  // Start on monday, 0 = Sunday
    dateFormatter: any;
    
    /**
     * construct calendar object with default values
     */
    constructor(mode: string, defaultDate: string | Date, showDetail: boolean,
                monthFormat: string, startDate: number, startWeek: number
                ) {
        
        this.mode = mode || 'month';
        
        if (typeof defaultDate === 'string') {
            this.currentDate = new Date(defaultDate);
        } else {
            this.currentDate = defaultDate || new Date();    
        }
        
        this.showEventDetail = showDetail || true;
        this.formatMonthTitle = monthFormat || 'MMMM yyyy';
        this.startingDayMonth = startDate || 0;
        this.startingDayWeek = startWeek || 1;
        
    
    }
    
    
    private setDateFormatter() {
        this.dateFormatter = {
            formatMonthViewDay: (date: Date) => {
                return date.getDate().toString();
            },
            formatMonthViewDayHeader: (date: Date) => {
                return 'MonMH';
            },
            formatMonthViewTitle: (date: Date) => {
                return 'testMT';
            },
            formatWeekViewDayHeader: (date: Date) => {
                return 'MonWH';
            },
            formatWeekViewTitle: (date: Date) => {
                return 'testWT';
            },
            formatWeekViewHourColumn: (date: Date) => {
                return 'testWH';
            },
            formatDayViewHourColumn: (date: Date) => {
                return 'testDH';
            },
            formatDayViewTitle: (date: Date) => {
                return 'testDT';
            }
        };


    }
    
}

export class EventLog {
    constructor(
        public id: string,
        public description: string,
        public type: string, 
        public date: Date,
    ) {}
}
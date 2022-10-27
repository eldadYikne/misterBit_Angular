import { Moves } from "./moves";

export class Contact {

    constructor(
        public _id?: string,
        public name: string = '',
        public email: string = '',
        public phone: string = '',
        public coins:number=0,
        public moves?: Moves[]
       ) {
    }

    setId?(id: string = 'r101') {
        // Implement your own set Id
        this._id = id
    }
}


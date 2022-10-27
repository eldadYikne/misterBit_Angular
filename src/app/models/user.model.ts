import { Moves } from "./moves";

export interface User {
    _id?:string,
    name: string,
    coins: number,
    moves: Moves[],

}

// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.36
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';
import { PlayerSchema } from './PlayerSchema'
import { GameAreaSchema } from './GameAreaSchema'
import { PuckSchema } from './PuckSchema'

export class PongRoomState extends Schema {
    @type(PlayerSchema) public playerOne: PlayerSchema = new PlayerSchema();
    @type(PlayerSchema) public playerTwo: PlayerSchema = new PlayerSchema();
    @type(GameAreaSchema) public gameArea: GameAreaSchema = new GameAreaSchema();
    @type(PuckSchema) public puck: PuckSchema = new PuckSchema();
    @type("number") public winner!: number;
}

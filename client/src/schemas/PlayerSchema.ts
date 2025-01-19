// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.36
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';
import { Vector2Schema } from './Vector2Schema'

export class PlayerSchema extends Schema {
    @type("string") public sessionId!: string;
    @type("number") public id!: number;
    @type(Vector2Schema) public position: Vector2Schema = new Vector2Schema();
    @type(Vector2Schema) public size: Vector2Schema = new Vector2Schema();
}

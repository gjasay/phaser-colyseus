// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.36
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';
import { EntitySchema } from './EntitySchema'

export class PlayerSchema extends EntitySchema {
    @type("string") public sessionId!: string;
    @type("int8") public score!: number;
}

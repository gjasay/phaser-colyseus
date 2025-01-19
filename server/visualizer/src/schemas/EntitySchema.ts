// 
// THIS FILE HAS BEEN GENERATED AUTOMATICALLY
// DO NOT CHANGE IT MANUALLY UNLESS YOU KNOW WHAT YOU'RE DOING
// 
// GENERATED USING @colyseus/schema 2.0.36
// 

import { Schema, type, ArraySchema, MapSchema, SetSchema, DataChange } from '@colyseus/schema';


export class EntitySchema extends Schema {
    @type("int32") public x!: number;
    @type("int32") public y!: number;
    @type("int32") public width!: number;
    @type("int32") public height!: number;
}

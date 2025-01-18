import { Schema, type } from "@colyseus/schema";

export class Vector2Schema extends Schema {
  @type("number") x: number = -1;
  @type("number") y: number = -1;
}

export class PlayerSchema extends Schema {
  @type("string") sessionId: string;
  @type(Vector2Schema) position: Vector2Schema = new Vector2Schema();
  @type(Vector2Schema) size: Vector2Schema = new Vector2Schema();
}

export class PuckSchema extends Schema {
  @type(Vector2Schema) position: Vector2Schema = new Vector2Schema();
  @type(Vector2Schema) size: Vector2Schema = new Vector2Schema();
}

export class GameAreaSchema extends Schema {
  @type("number") width: number = 100;
  @type("number") height: number = 100;
}

export class PongRoomState extends Schema {
  @type(PlayerSchema) playerOne: PlayerSchema = new PlayerSchema();
  @type(PlayerSchema) playerTwo: PlayerSchema = new PlayerSchema();
  @type(GameAreaSchema) gameArea: GameAreaSchema = new GameAreaSchema();
  @type(PuckSchema) puck: PuckSchema = new PuckSchema();
  @type("number") winner: number = -1;
}

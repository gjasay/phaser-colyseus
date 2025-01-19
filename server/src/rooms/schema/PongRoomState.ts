import { Schema, type } from "@colyseus/schema";

export class Vector2Schema extends Schema {
  @type("number") x: number = -1;
  @type("number") y: number = -1;

  constructor(x: number = -1, y: number = -1) {
    super();
    this.x = x;
    this.y = y;
  }
}

export class PlayerSchema extends Schema {
  @type("string") sessionId: string;
  @type("int8") score: number = 0;
  @type(Vector2Schema) position: Vector2Schema = new Vector2Schema();
  @type(Vector2Schema) size: Vector2Schema = new Vector2Schema(30, 8);

  constructor(position: Vector2Schema = new Vector2Schema())
  {
    super();
    this.position = position;
  }
}

export class PuckSchema extends Schema {
  @type(Vector2Schema) position: Vector2Schema = new Vector2Schema(0, 0);
  @type(Vector2Schema) size: Vector2Schema = new Vector2Schema(5, 5);
}

export class GameAreaSchema extends Schema {
  @type("number") width: number = 100;
  @type("number") height: number = 100;
}

export class PongRoomState extends Schema {
  @type(PlayerSchema) playerOne: PlayerSchema = new PlayerSchema(new Vector2Schema(-30, -90));
  @type(PlayerSchema) playerTwo: PlayerSchema = new PlayerSchema(new Vector2Schema(-30, 90));
  @type(GameAreaSchema) gameArea: GameAreaSchema = new GameAreaSchema();
  @type(PuckSchema) puck: PuckSchema = new PuckSchema();
  @type("int8") countdown: number = 5;
  @type("int8") winner: number = -1;
}

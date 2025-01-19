import { Schema, type } from "@colyseus/schema";

export class EntitySchema extends Schema {
  @type("float32") x: number = -1;
  @type("float32") y: number = -1;
  @type("float32") width: number = -1;
  @type("float32") height: number = -1;

  constructor(
    x: number = -1,
    y: number = -1,
    width: number = -1,
    height: number = -1,
  ) {
    super();
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

export class PlayerSchema extends EntitySchema {
  @type("string") sessionId: string;
  @type("int8") score: number = 0;

  constructor(x: number, y: number) {
    super();
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 8;
  }
}

export class PuckSchema extends EntitySchema {
  constructor() {
    super();
    this.width = 5;
    this.height = 5;
    this.x = 100;
    this.y = 100;
  }
}

export class GameAreaSchema extends Schema {
  @type("number") width: number = 200;
  @type("number") height: number = 200;
}

export class PongRoomState extends Schema {
  @type(PlayerSchema) playerOne: PlayerSchema = new PlayerSchema(100, 190);
  @type(PlayerSchema) playerTwo: PlayerSchema = new PlayerSchema(100, 10);
  @type(GameAreaSchema) gameArea: GameAreaSchema = new GameAreaSchema();
  @type(PuckSchema) puck: PuckSchema = new PuckSchema();
  @type("int8") countdown: number = 3;
  @type("int8") winner: number = -1;
}

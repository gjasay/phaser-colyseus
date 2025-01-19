import { Vector2Schema } from "./schema/PongRoomState";

export interface Entity {
  position: Vector2Schema;
  size: Vector2Schema;
}

export interface InputMessage {
  left: boolean;
  right: boolean;
}

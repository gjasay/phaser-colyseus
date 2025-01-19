import { PlayerSchema } from "../schemas/PlayerSchema";
import { InputMessage } from "../../../server/src/types/messages";
import { PuckSchema } from "../schemas/PuckSchema";

export type PlayerUpdateHook = (playerState: PlayerSchema) => void;
export type PuckUpdateHook = (puckState: PuckSchema) => void;

export interface IGameStateManager {
    joinGame: (id: string) => Promise<void>;
    getPlayerId: () => number | undefined;
    updatePlayer: (input: InputMessage) => void;
    hookPlayerOneUpdate: (hook: PlayerUpdateHook) => void;
    hookPlayerTwoUpdate: (hook: PlayerUpdateHook) => void;
    hookPuckUpdate: (hook: PuckUpdateHook) => void;

    update: () => void;
};
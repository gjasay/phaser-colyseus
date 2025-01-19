import { InputMessage } from "../../../server/src/types/messages";
import { PlayerSchema } from "../schemas/PlayerSchema";
import { PuckSchema } from "../schemas/PuckSchema";
import { Vector2Schema } from "../schemas/Vector2Schema";
import { IGameStateManager, PlayerUpdateHook, PuckUpdateHook } from "./IGameStateManager";

export class MockGameStateManager implements IGameStateManager {
    private _playerOne: PlayerSchema;
    private _playerTwo: PlayerSchema;
    private _puck: PuckSchema;

    private _playerOneHook: PlayerUpdateHook;
    private _playerTwoHook: PlayerUpdateHook;
    private _puckHook: PuckUpdateHook;

    private _puckVec: Vector2Schema;

    constructor(){
        this._puckVec.x = 1;
        this._puckVec.y = 1;
    }

    async joinGame(id: string): Promise<void> {
        console.log("I'm in!");
    }

    getPlayerId(): number | undefined {
        return 1;
    }

    updatePlayer(input: InputMessage): void {
        if(input.left) {
            this._playerOne.position.x--;
        }
        else if(input.right) {
            this._playerOne.position.x++;
        }
        this._playerOneHook(this._playerOne);
    }

    hookPlayerOneUpdate(hook: PlayerUpdateHook): void {
        this._playerOneHook = hook;
    }

    hookPlayerTwoUpdate(hook: PlayerUpdateHook): void {
        this._playerTwoHook = hook;
    }

    hookPuckUpdate(hook: PuckUpdateHook): void {
        this._puckHook = hook;
    }

    update(): void {
        this._puck.position.x += this._puckVec.x;
        this._puck.position.y += this._puckVec.y;

        if(this._puck.position.x > 100){
            this._puckVec.x *= -1;
            this._puck.position.x = 99;
        }
        if(this._puck.position.x < 0) {
            this._puck.position.x = 1;
            this._puckVec.x *= -1;
        }

        if(this._puck.position.y > 100) {
            this._puck.position.y = 99;
            this._puckVec.y *= 1;
        }

        if(this._puck.position.y < 0) {
            this._puck.position.y = 1;
            this._puckVec.y *= -1;
        }

        this._puckHook(this._puck);
    }
}
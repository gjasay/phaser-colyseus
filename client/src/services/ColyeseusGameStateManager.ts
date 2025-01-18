import * as Colyseus from 'colyseus.js'

interface PongRoomState{}

export class ColyseusGameStateManager {
    private _client: Colyseus.Client;
    private _room: Colyseus.Room<PongRoomState>;
    constructor() {
        this._client = new Colyseus.Client('ws://localhost:2567');
    }

    async initialize(id: string): Promise<void> {
        this._room = await this._client.joinOrCreate<PongRoomState>(id);
    }
}
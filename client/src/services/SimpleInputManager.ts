import { IInputManager, IKeyState } from "./IInputManager";


export class SimpleInputManager implements IInputManager {
    private _keyStates: Map<string, IKeyState> = new Map;

    constructor() {
    }

    setKeyDown(key: string, time: number): void {
        const keyState = this._keyStates.get(key);
        if(keyState !== undefined) {
            keyState.edge = true;
            keyState.state = true;
            keyState.time = time;
        } else {
            this._keyStates.set(key, {
                edge: true,
                state: true,
                time: time
            });
        }
    }

    setKeyUp(key: string, time: number): void {
        const keyState = this._keyStates.get(key);
        if(keyState !== undefined) {
            keyState.edge = true;
            keyState.state = false;
            keyState.time = time;
        } else {
            this._keyStates.set(key, {
                edge: true,
                state: false,
                time: time
            });
        }

    }

    keyDown(key: string): boolean {
        return this._keyStates.get(key)?.state === true;
    }

    keyDownEdge(key: string): boolean {
        const keyState = this._keyStates.get(key);
        return (keyState?.state === true) && (keyState?.edge === true);
    }

    keyUp(key: string): boolean {
        return !this.keyDown(key);
    }

    keyUpEdge(key: string): boolean {
        const keyState = this._keyStates.get(key);
        return (keyState?.state === false) && (keyState?.edge === true);
    }

    getKeyState(key: string): IKeyState {
        let keyState = this._keyStates.get(key);
        if(keyState === undefined) {
            keyState = {
                edge: false,
                state: false,
                time: 0
            };
            this._keyStates.set(key, keyState)
        }
        return keyState;
    }

    update(): void {
        for(let keyState of this._keyStates.values()){
            keyState.edge = false;
        }
    }
}
export interface IKeyState {
    state: boolean;
    edge: boolean;
    time: number;
}

export interface IInputManager {
    setKeyDown: (key: string, time: number) => void;
    setKeyUp: (key: string, time: number) => void;

    keyDown: (key: string) => boolean;
    keyUp: (key: string) => boolean;
    keyDownEdge: (key: string) => boolean;
    keyUpEdge: (key: string) => boolean;

    getKeyState(key: string): IKeyState;

    update: () => void;
}
export abstract class ManagedObject<T> extends Phaser.GameObjects.Sprite {
    private _managedState: T;

    constructor(scene: Phaser.Scene, x: number, y: number, key: string, texture: string | Phaser.Textures.Texture) {
        super(scene, x, y, texture);
    }
}
import Phaser from "phaser";

export default class Laser extends Phaser.Physics.Arcade.Sprite{
    constructor(scene,x,y){
        super(scene,x,y,'laser');

        this.speed=Phaser.Math.GetSpeed(500,1);
        this.setScale(0.6)


    }

    fire(x,y,direction){
        this.setPosition(x,y)
        this.setActive(true)
        this.setVisible(true)

        this.direction=direction
        this.rotation=this.direction
    }

    update(time,delta){
        this.x +=Math.cos(this.direction) * this.speed * delta
        this.y +=Math.sin(this.direction) * this.speed * delta

    }
}
import Phaser from "phaser";
import Meteor from "../entities/Meteor";
import Laser from "../entities/Laser";

export default class PlayScene extends Phaser.Scene{
    constructor(){
        super('play-scene')
    }

    preload(){}

    create(){
        this.player=this.physics.add.image(200,200,'player')
        this.player.setDrag(0.99)
        this.player.setMaxVelocity(150)
        this.player.setScale(0.5)
        this.player.setCollideWorldBounds(true)

        this.cursor=this.input.keyboard.createCursorKeys()

        const width=this.cameras.main.width
        const height=this.cameras.main.width

        this.score=0

        this.scoreText=this.add.bitmapText(width-200,20,'arcade','Score: 0000',24)


        //generate meteors
        this.meteorGroup=this.physics.add.group()
        this.meteorArray=[]

        for(let i=0; i<10; i++){
            const meteor=new Meteor(this,300,300)

            const xPos=Phaser.Math.RND.between(0,800)
            const yPos=Phaser.Math.RND.between(0,600)

            meteor.setPosition(xPos,yPos)
            meteor.setActive(true)
            meteor.setVisible(true)

            this.meteorGroup.add(meteor,true)
            this.meteorArray.push(meteor)
        }


        //Laser
        this.laserGroup=this.physics.add.group({
            classType:Laser,
            maxSize:1,
            runChildUpdate:true

        })
    }

    update(time,delta){

        if(this.cursor.up.isDown){
            this.physics.velocityFromRotation(this.player.rotation,150,this.player.body.velocity)
        }else {
            this.player.setVelocity(0)

        }
        if(this.cursor.left.isDown){
            this.player.setAngularVelocity(-300)
        }else if(this.cursor.right.isDown){
            this.player.setAngularVelocity(300)
        }else{
            this.player.setAngularVelocity(0)
        }

        if(this.cursor.space.isDown){
            const shoot=this.laserGroup.get()
            if(shoot){
                shoot.fire(this.player.x,this.player,this.player.rotation)
                this.sound.play('shoot')
            }
        }


        this.scoreText.setText('Score: '+ this.score)

        for(const meteor of this.meteorArray){
            meteor.update(time,delta)
        }
    }

   
}
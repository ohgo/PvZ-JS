var g_GameCharacterLayer;

var GameCharacterLayer = cc.Layer.extend({
    _time:null,
    _levelManager:null,
    _state:0,
    _bacteriaAnimation:null,
    doctor:null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function(){
        var bRet = false;
        if (this._super()) {
            //cc.SpriteFrameCache.getInstance().addSpriteFrames(s_bacteria_plist);

            PvZ.CONTAINER.BACTERIAS = [];
            PvZ.ACTIVE_BACTERIA = 0;
            this._state = g_GameStatus.play;

            var winSize = cc.Director.getInstance().getWinSize();

            this._levelManager = new LevelManager(this);

            // bacteria animation batch node
            cc.SpriteFrameCache.getInstance().addSpriteFrames(bacteria_plist);
            var bacteriaAnimationTexture = cc.TextureCache.getInstance().addImage(bacteria_png);
            this._bacteriaAnimation = cc.SpriteBatchNode.createWithTexture(bacteriaAnimationTexture);
            //this._bacteriaAnimation.setBlendFunc(gl.SRC_ALPHA, gl.ONE);
            this.addChild(this._bacteriaAnimation);
            Bacteria.sharedAnimation();

            // schedule
            this.scheduleUpdate();
            this.schedule(this.oneSecondTick, 1);
//            this.schedule(this.scoreCounter, 1);
			this.initDoctor();
            bRet = true;

            g_GameCharacterLayer = this;

            //pre set
            //Bacteria.preSet();
            bRet = true;
        }
        return bRet;
    },

    oneSecondTick:function () {
        // check if it's a spawn time of any monster
        if (this._state == g_GameStatus.play) {
            this._time++;
            //cc.log("Tick: " + this._time);
            this._levelManager.loadLevelResource(this._time);
        }
    },

    update:function (dt) {
        if(this._state == g_GameStatus.play){
//            this.checkIsCollide();
        }
    },

//    checkIsCollide:function(){
//        //cc.log("checkIsCollide");
//    },

//    initBacteria:function(){
//        //add bacteriaSprite
//        var bacteria = new BacteriaHappyGray();
//        bacteria.initData();
//       bacteria.setPosition(cc.p(960,320));
//
//        this.addChild(bacteria,1);
//       // bacteria.runAction(cc.MoveBy.create(5, cc.p(500,320)));
////        bacteria.update(2);
//        cc.log("add bacteria");
//        this.addChild(bacteria,1);
       // bacteria.runAction(cc.MoveBy.create(5, cc.p(500,320)));
//        bacteria.update(2);
//        cc.log("add bacteria");
//    },

    /* To be finished - Huimin
     //display doctor card
     //??????????
     var doctorCardNormal = cc.Sprite.create(s_Doctor);
     var doctorCardSelected = cc.Sprite.create(s_Doctor);
     //var doctorCardDisabled = cc.Sprite.create(s_Doctor);

     var newDoctor = cc.MenuItemSprite.create(doctorCardNormal, doctorCardSelected,this.newDoctorSprite, this);
     var cardDock = cc.Menu.create(newDoctor);
     this.gameLayer.addChild(cardDock,g_GameZOder.ui);
     cardDock.setPosition(0,500);

     },
     newDoctorSprite:function(){
     cc.log("New Doctor!");
     //this.onButtonEffect();
     //add doctor
     */

    //Create Doctor Sprite

    initDoctor:function(){
        var size = cc.Director.getInstance().getWinSize();
        this.doctor = new DoctorSprite();
        this.doctor.setAnchorPoint(cc.p(0.5,0.5));
        //this.doctor.setPosition(910,590);
        this.doctor.setPosition(size.width/5,4*size.height/5);
        //this.doctor.setScale(0.7,0.7);
        this.addChild(this.doctor,1);
        this.actDoctorAnimation(true);
    },
    //deal with the animation of doctors
    actDoctorAnimation:function(active){
        if(active){
            var animation = cc.Animation.create();
            //var frame = new Array(s_doctorWalk01,s_doctorWalk02,s_doctorWalk03,s_doctorWalk04);
            var frameArray = new Array(s_doctorPunch01,s_doctorPunch02);
            // Add 60 frames
            for (var j = 0; j < 30; j++) {
                for (var i = 0; i < 2; i++) {
                    animation.addSpriteFrameWithFile(frameArray[i]);
                    //cc.log("frame"+i+" added");
                }
            }
            animation.setDelayPerUnit(40 / 60);
            animation.setLoops(9999);
            animation.setRestoreOriginalFrame(true);
            var action = cc.Animate.create(animation);
            this.doctor.runAction(action);
        }
    }
//    update:function(dt){
//        this.bacteria.update(dt);
//    }

});

//GameCharacterLayer.prototype.addEnemy = function (bacteria, z, tag) {
//    this._texTransparentBatch.addChild(bacteria, z, tag);
//};

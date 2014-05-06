var g_GameCharacterLayer;

var GameCharacterLayer = cc.Layer.extend({
    _time:null,
    _levelManager:null,
    _state:0,
    _bacteriaAnimation:null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function () {
        cc.log("GameCharacterLayer");
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
            //_bacteriaAnimation.sharedAnimation();

            // schedule
            this.scheduleUpdate();
            this.schedule(this.oneSecondTick, 1);

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
            cc.log("Tick: " + this._time);
            this._levelManager.loadLevelResource(this._time);
        }
    },

    update:function (dt) {
        if(this._state == g_GameStatus.play){
            this.checkIsCollide();
        }
    },

    checkIsCollide:function(){
        //cc.log("checkIsCollide");
    }

//    initBacteria:function(){
//        //add bacteriaSprite
//        var bacteria = new BacteriaHappyGray();
//        bacteria.initData();
//        bacteria.setPosition(cc.p(960,320));
//
//        this.addChild(bacteria,1);
//       // bacteria.runAction(cc.MoveBy.create(5, cc.p(500,320)));
////        bacteria.update(2);
//        cc.log("add bacteria");
//    }

});

//GameCharacterLayer.prototype.addEnemy = function (bacteria, z, tag) {
//    this._texTransparentBatch.addChild(bacteria, z, tag);
//};
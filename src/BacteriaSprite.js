var BacteriaSprite = cc.Sprite.extend({
    isHit: false,   //for collision detection
    HP:0,
    radius:0    //collision radius
});

var BacteriaHappyGray = BacteriaSprite.extend({
    ctor: function () {
        this._super();
        this.initWithFile(s_BacteriaHappyGray);
    },
    initData:function(){
        this.isHit = false;
        this.HP = 10;
        this.radius = 110;
        this.velocity = cc.p(100,100);

        a0 = cc.MoveBy.create(5, cc.p(-960,0));
        a1 = cc.ShakyTiles3D.create(5, cc.size(15, 10), 4, false);
        tmpAction = cc.Spawn.create(a0, a1);

        this.runAction(tmpAction);
        cc.log("add bacteria!!!");
    }
    //update: function (dt) {
        //this.setPosition(cc.pMult(this.getPosition(),cc.pMult(this.velocity, dt)),310);
        //this.checkHitEdge();
    //}

})
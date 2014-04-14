var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        this.addLayer();
    },

    addLayer:function(){
        var gBGLayer = new GameBGLayer();
        var gCharacterLayer = new GameCharacterLayer();
        this.addChild(gBGLayer);
        this.addChild(gCharacterLayer);
        gBGLayer.init();
        gCharacterLayer.init();
    },

    onBackCallback:function (pSender) {
        var scene = cc.Scene.create();
        scene.addChild(MainMenuLayer.create());
        cc.Director.getInstance().replaceScene(cc.TransitionFade.create(1.2, scene));
    }
});



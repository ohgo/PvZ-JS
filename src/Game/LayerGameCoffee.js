/**
 * Created by Ohgo on 4/23/14.
 */

var LayerGameCoffee = cc.Layer.extend({
    _size:null,

    ctor:function () {
        this._super();
        this.init();
    },

    init:function(){
        this._size = cc.Director.getInstance().getWinSize();
        cc.SpriteFrameCache.getInstance().addSpriteFrames(coffee_plist);
        //Coffee.scaleAnimation();
        this.schedule(this.spawnCoffee, 3);


        // top left coffee logo
        //var coffeeLogo = Coffee.getOrCreateDoctor(DoctorType[0]);
        //doctor.setAnchorPoint(cc.p(0.5,0.5));
        //doctor.setPosition(this._size.width/5,5*this._size.height/6);
    },

    spawnCoffee:function() {
        Coffee.getOrCreateCoffee();
    }
})
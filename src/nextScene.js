//nextScene.js
var NextLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        var label = cc.LabelTTF.create("This is Next Scene!!", "Arial", 26);
        label.setPosition(size.width / 2, size.height / 2);
        this.addChild(label, 1);

        return true;
    },
});


var dropLayer = cc.Layer.extend({
    sprite: null,
    // ブロックを保持しておく配列
    dropSpriteArray: null,
    // 配列の宣言　ブロックの名前を指定
    dropArray: [res.drop01_png, res.drop02_png, res.drop03_png, res.drop04_png, res.drop05_png],
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        this.dropSpriteArray = new Array();
        var i = 1;
        for (i = 0; i < 10; i++) {
            var rnd = Math.floor(Math.random() * 5);
            var rnd2 = Math.floor(Math.random() * 10);
            this.sprite = new cc.Sprite(this.dropArray[rnd]);
            cc.log(i);
            cc.log(this.dropArray[i]);
            this.sprite.attr({
                x: size.width * Math.random(),
                y: size.height * Math.random(),
                scale: 0.1 + Math.random() * 1.9,
                rotation: 0
            });
            this.dropSpriteArray.push(this.sprite);
            // this.addChild(this.sprite);
            this.addChild(this.dropSpriteArray[i], 0);


            //  var drop01 = cc.Sprite.create(res.drop01_png);　
            //  drop01.setPosition(size.width * i / 6, size.height / 5);　
            //  this.addChild(drop01);
        }

        // タップイベントリスナーを登録する
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: this.onTouchBegan,
            onTouchMoved: this.onTouchMoved,
            onTouchEnded: this.onTouchEnded
        }, this);
        return true;
    },
    onTouchBegan: function(touch, event) {
        return true;
    },
    onTouchMoved: function(touch, event) {},
    //シーン切り替え
    onTouchEnded: function(touch, event) {
        cc.director.runScene(new ThirdScene());
    },
});

var NextScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 200, 140, 128));
        this.addChild(backgroundLayer);

        var layer1 = new dropLayer();
        this.addChild(layer1);
        // 一秒後にオーブが消える
        setTimeout(function() {
            layer1.removeAllChildren();
        }, 3000);

        var layer2 = new NextLayer();
        this.addChild(layer2);
    }
});

//thirdScene.js
var ThirdLayer = cc.Layer.extend({
    ctor: function() {
        this._super();
        var size = cc.director.getWinSize();

        var label = cc.LabelTTF.create("Game Over", "Arial", 50);
        label.setPosition(size.width / 2, size.height * 0.8);
        this.addChild(label, 1);

        return true;
    },
});


var dropLayer2 = cc.Layer.extend({
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
        var n = 1;
        for (i = 0; i < 5; i++) {
          for(n = 0; n < 5; n++){
            var rnd = Math.floor(Math.random() * 5);
            this.sprite = new cc.Sprite(this.dropArray[rnd]);
            cc.log(i);
            cc.log(this.dropArray[i]);
            this.sprite.attr({
                x: size.width  *0.2 + 50 * n ,
                y: size.height  * 0.2 + 50 * i,
                scale: 1.0,
                rotation: 0
            });
            //this.dropSpriteArray.push(this.sprite);
            // this.addChild(this.sprite);
            this.addChild(this.sprite, 0);


        }
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
    onTouchEnded: function(touch, event) {
        // 次のシーンに切り替える
        cc.director.runScene(new MyScene());
    },
  });

var ThirdScene = cc.Scene.extend({
    onEnter: function() {
        this._super();

        // 背景レイヤーをその場で作る
        var backgroundLayer = new cc.LayerColor(new cc.Color(140, 100, 140, 128));
        this.addChild(backgroundLayer);

        var layer1 = new dropLayer2();
        this.addChild(layer1);
        // 一秒後にオーブが消える
        setTimeout(function() {
            layer1.removeAllChildren();
        }, 3000);

        var layer2 = new ThirdLayer();
        this.addChild(layer2);
    }
});

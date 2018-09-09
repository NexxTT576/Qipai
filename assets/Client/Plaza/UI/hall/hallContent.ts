// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class hallContent extends cc.Component {
  @property(cc.Node)
  firstNode: cc.Node = null;

  @property(cc.Node)
  second: cc.Node = null;

  @property(cc.Node)
  titileNode: cc.Node = null;

  girlAnim: cc.Animation = null;
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    this.firstNode.active = true;
    this.second.active = false;
    this.girlAnim = cc
      .find("Canvas/global/main/girl")
      .getComponent(cc.Animation);
  }

  // update (dt) {}
  showRoomContent(eventTouch, eventData) {
    this.second.active = true;
    this.second.getComponent(cc.Animation).play("playway_display");
    this.girlAnim.play("girl_to_left");
    let children = this.titileNode.children;
    for (let i = 0; i < children.length; i++) {
      if (children[i].name == eventData) children[i].active = true;
      else children[i].active = false;
    }
  }

  closeRoomContent() {
    this.second.active = false;
    this.girlAnim.play("girl_to_right");
  }
}

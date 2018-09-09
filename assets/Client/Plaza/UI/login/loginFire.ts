import { ManagerWindow } from "../../Managers/ManagerWindow";
import { ManagerRes } from "../../Managers/ManagerRes";
import { PlazaConfig } from "../../Configs/PlazaConfig";

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
export default class loginFire extends cc.Component {
  // LIFE-CYCLE CALLBACKS:

  // onLoad () {}

  start() {
    ManagerWindow.instance;
  }

  // update (dt) {}
  /**
   * 游客登陆
   */
  async clickVisitor() {
    let res: cc.Prefab = await ManagerRes.instance.cacheRes(
      PlazaConfig.prefab.visitorLogin
    );
    ManagerWindow.instance.show(res);
  }

  /**
   * 微信登陆
   */
  clickWX() {
    cc.director.loadScene("hall");
  }
}

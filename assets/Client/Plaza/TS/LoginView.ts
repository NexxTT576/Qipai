import { windowManager } from "../../../Manager/WindowManager";
import { netManager } from "../../../Manager/NetManager";
import { LoginMsg } from "../QPStruct/QPPLazaMsg";
import { QPStruct } from "../QPStruct/QPStruct";

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
export default class LoginView extends cc.Component {
    @property(cc.Prefab)
    visitorWindow: cc.Prefab = null
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {
        windowManager.init()
    }

    // update (dt) {}

    /**
     * 游客登陆
     */
    clickVisitor() {
        windowManager.show(this.visitorWindow)
    }

    /**
     * 微信登陆
     */
    clickWX() {
        cc.director.loadScene('hall')
    }
}

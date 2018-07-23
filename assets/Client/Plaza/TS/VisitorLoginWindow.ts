import WindowComponent from "./WindowComponent";
import { QPStruct } from "../QPStruct/QPStruct";
import { QPHong } from "../QPHong/QPHong";

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
export default class VisitorLoginWindow extends WindowComponent {

    @property(cc.EditBox)
    account: cc.EditBox = null

    @property(cc.EditBox)
    password: cc.EditBox = null
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start() {

    }

    // update (dt) {}
    clickLogin() {
        let msg = new QPStruct.LoginMsg()
        msg.userName = this.account.string
        msg.passWord = this.password.string
        mqant.init({
            host: '127.0.0.1',
            port: 3653,
            client_id: "111",
            onSuccess: () => {
                cc.log('onSuccess')
                mqant.request(QPHong.PlazaTopic.Login,
                    msg, (data) => {
                        var msg = JSON.parse(data.payloadString)
                        if (msg.Error != '') {
                            cc.log(msg.Error)
                            return
                        }
                        cc.log(msg.Result)
                    })
            },
            //    onConnectionLost:()=>{
            //     cc.log('onConnectionLost')
            //    }
        })
    }
}

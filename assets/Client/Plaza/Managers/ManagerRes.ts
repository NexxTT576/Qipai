import { IResLoadConfig } from "../Configs/PlazaConfig";

class ManagerRes {
  constructor() {
    cc.log(this._cache);
  }
  private static m_instance: ManagerRes = null;
  static get instance(): ManagerRes {
    if (!ManagerRes.m_instance) ManagerRes.m_instance = new ManagerRes();
    return ManagerRes.m_instance;
  }

  async res(info: IResLoadConfig): Promise<cc.Prefab>;
  async res(info: IResLoadConfig): Promise<cc.Texture2D>;
  async res(info: IResLoadConfig): Promise<cc.SpriteFrame>;
  async res(info: IResLoadConfig): Promise<cc.SpriteAtlas>;
  async res(info: IResLoadConfig): Promise<cc.JsonAsset>;
  async res(info: IResLoadConfig): Promise<cc.TextAsset>;
  async res(info: IResLoadConfig): Promise<cc.ParticleAsset>;
  async res(info: IResLoadConfig): Promise<cc.AnimationClip>;
  async res(info: IResLoadConfig): Promise<cc.AudioClip>;
  async res(info: IResLoadConfig): Promise<cc.Font>;
  async res(info: IResLoadConfig): Promise<cc.BitmapFont>;
  async res(info: IResLoadConfig): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      cc.loader.load({ uuid: info.uuid, type: "uuid" }, (err, res) => {
        if (err) {
          cc.warn(`ManagerRes getRes uuid: ${info.uuid}`);
          info.path = info.path.replace(/db:\/\/assets\/resources\//, "");
          let plistReq = /.+\.plist+\/+\w/;
          if (plistReq.test(info.path)) {
            cc.log(info.path.replace(/\.plist+.*/, ""));
            cc.loader.loadRes(
              info.path.replace(/\.plist+.*/, ""),
              cc.SpriteAtlas,
              (err, res: cc.SpriteAtlas) => {
                if (err) {
                  cc.warn(
                    `ManagerRes getRes path: ${info.path} SpriteAtlas Error`
                  );
                  reject();
                  return;
                }
                let str = info.path.replace(/.+\.plist+\//, "");
                str = str.replace(/\.\w+$/, "");
                let spriteFrame = res.getSpriteFrame(str);
                if (spriteFrame == null) {
                  cc.warn(
                    `ManagerRes getRes path: ${info.path} spriteFrame Error`
                  );
                  reject();
                  return;
                }
                resolve(spriteFrame);
              }
            );
            return;
          }
          let ext = info.path.replace(/.+\./, "");
          info.path = info.path.replace(/\.\w+$/, "");
          let str = info.path.replace(/\.\w+\/\w+$/, "");
          if (str != info.path) {
            cc.loader.loadRes(str, cc.SpriteFrame, (err2, res2) => {
              if (err2) {
                cc.warn(`ManagerRes getRes path: ${info.path}`);
                reject();
                return;
              }
              resolve(res2);
            });
          } else {
            cc.loader.loadRes(info.path, (err2, res2) => {
              if (err2) {
                cc.warn(`ManagerRes getRes path: ${info.path}`);
                reject();
                return;
              }
              resolve(res2);
            });
          }
          return;
        }
        resolve(res);
      });
    });
  }

  _cache = {};
  async cacheRes(info: IResLoadConfig): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      if (ManagerRes.instance._cache[info.uuid]) {
        resolve(ManagerRes.instance._cache[info.uuid]);
      } else {
        let res = await ManagerRes.instance.res(info);
        if (res) {
          ManagerRes.instance._cache[info.uuid] = res;
          resolve(ManagerRes.instance._cache[info.uuid]);
        } else {
          reject();
        }
      }
    });
  }
}

export { ManagerRes };

class WindowManager {
    managerNode: cc.Node = null;
    bg: cc.Node = null;
    children: cc.Node[] = [];

    init() {
        this.managerNode = cc.find('windowManager')
        cc.game.addPersistRootNode(this.managerNode)
        this.bg = this.managerNode.getChildByName('bg')
        this.bg.active = false
    }

    show(prefab: cc.Prefab) {
        this.bg.active = true
        let node = cc.instantiate(prefab)
        this.children.push(node)
        this.bg.zIndex = this.children.length
        node.parent = this.managerNode
        node.zIndex = this.children.length
    }

    pop() {
        if (this.children.length == 0) {
            this.bg.active = false
            return
        }
        let node = this.children.pop()
        node.removeFromParent()
        this.bg.zIndex = this.children.length - 1
        if (this.children.length == 0) this.bg.active = false
    }
}

let windowManager = new WindowManager()

export { windowManager }
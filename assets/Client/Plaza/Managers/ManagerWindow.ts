class ManagerWindow {
    private managerNode: cc.Node = null
    private bg: cc.Node = null
    private children: cc.Node[] = []
    private static m_instance: ManagerWindow = null
    constructor() {
        this.managerNode = cc.find('WindowManager')
        cc.game.addPersistRootNode(this.managerNode)
        this.bg = this.managerNode.getChildByName('bg')
        this.bg.active = false
    }
    static get instance(): ManagerWindow {
        if (!ManagerWindow.m_instance)
            ManagerWindow.m_instance = new ManagerWindow()
        return ManagerWindow.m_instance;
    }

    /**
     * ManagerWindow show
     * @param prefab 预制或者节点
     */
    show(prefab: cc.Prefab): cc.Node
    show(prefab: cc.Node): cc.Node
    show(prefab): cc.Node {
        this.bg.width = cc.find('Canvas').width
        this.bg.height = cc.find('Canvas').height
        this.managerNode.x = cc.find('Canvas').width / 2
        this.managerNode.y = cc.find('Canvas').height / 2
        this.bg.active = true
        let node = cc.instantiate(prefab)
        node.scale = 0.5
        this.children.push(node)
        this.bg.zIndex = this.children.length
        node.parent = this.managerNode
        node.zIndex = this.children.length
        node.runAction(cc.scaleTo(0.1, 1))
        return node
    }
    /**
     * 移除最上层
     */
    pop(): cc.Node {
        if (this.children.length == 0) {
            this.bg.active = false
            return
        }
        let node = this.children.pop()
        node.removeFromParent()
        this.bg.zIndex = this.children.length - 1
        if (this.children.length == 0) this.bg.active = false
        return node
    }
}


export { ManagerWindow }
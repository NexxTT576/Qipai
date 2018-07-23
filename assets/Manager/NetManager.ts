class NetManager {
    ws: WebSocket = null;
    init(url: string) {
        this.ws = new WebSocket(url)
        this.ws.onopen = this.onopen.bind(this)
        this.ws.onclose = this.onclose.bind(this)
        this.ws.onerror = this.onerror.bind(this)
        this.ws.onmessage = this.onmessage.bind(this)
    }

    onopen(evt) {
        cc.log('onopen')
        cc.log(evt)
        this.send('Hello', {
            Name:'wo de tian'
        })
    }

    onclose(evt) {
        cc.log('onclose')
        cc.log(evt)
    }

    onerror(evt) {
        cc.log('onerror')
        cc.log(evt)
    }

    onmessage(evt) {
        cc.log('onmessage')
        cc.log(evt)
    }

    send(root: string, data) {
        if (data == null) data = {}
        var a = {}
        a[root] = data
        let str = JSON.stringify(a)
        cc.log(str)
        this.ws.send(str)
    }
}

let netManager = new NetManager()
export { netManager } 
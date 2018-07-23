declare module mqant {
    export interface mqantInitinterface {
        host: string;
        port: number;
        client_id: string;
        useSSL?: boolean;
        onSuccess: Function;
        onConnectionLost?: Function;
    }

    export class Message {
        destinationName: string;
        duplicate: boolean;
        payloadBytes: Uint8Array;
        payloadString: string;
        qos: number;
        retained: boolean;
    }

    export interface IFunc {
        (msg: Message): void
    }

    export function init(prop: mqantInitinterface)

    export function request(topic: string, msg: object, callback: IFunc)

    export function requestNR(topic: string, msg: object)

    export function on(topic: string, callback: IFunc)
}
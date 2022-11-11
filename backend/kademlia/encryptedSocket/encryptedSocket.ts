import { ENCRYPTED_CHANNEL, FINISH_HANDSHAKE, HELLO, HOLE_PUNCH, RESPONSE_HELLO } from "./messageTypes/MessageTypes";
import socketMultiplexer from "./socketMultiplexer/socketMultiplexer";

export default function encryptedSocket(){
    const { send , getICEfromServer, addReciveListener } = socketMultiplexer();

    addReciveListener(bufferReader)
    const _onHolePunchListeners= new Set<(rinfo: {address:string, port:number})=> void>();



    return { getICEfromServer, forceHello, addOnHolePunchListener}

    function forceHello(ip:string, port:number){
        send({ip,port}, new Uint8Array([HELLO,]))
    }

    function addOnHolePunchListener(){
        _onHolePunchListeners.add()
    }
    

    function bufferReader(message: Uint8Array, rinfo: {address:string, port:number}){
        try{
            const kind = message[0];
            {
                [HOLE_PUNCH]: pong,
                [HELLO]: hello,
                [RESPONSE_HELLO]: responseHello,
                [FINISH_HANDSHAKE]: finishHanshake,
                [ENCRYPTED_CHANNEL]: encryptedChannel,
            }[ kind ](message, rinfo)
        }
        catch{}
    }


}
import dg from 'react-native-udp'
import Address from './Address';
import isEqual from './isEqual';
import STUN from './STUN';

export default function STUNDgram(dgram: ReturnType<typeof dg.createSocket>){
    const { createSTUN, readXORIPV4STUN } = STUN();
    let transactionId : Uint8Array;
    let openForIceChange: boolean = false;
    let resolve : (addresses: Address[]) => void;
    let resolved : boolean = false;
    let addresses: Address[];

    dgram.addListener('message' , bufferReader)
    
    return {
        getICEfromServer
    }

   function bufferReader (message : Buffer)  {
        /* ignore other requests if in this mode */
        try{
        if(openForIceChange)
        {
            //rinfo.address check if its registered stun server
            const translated = readXORIPV4STUN(message);
            
            if(translated && openForIceChange && 
                isEqual(translated.transactionId, transactionId)
                ){
             openForIceChange = false;
                    resolve([{
                    ip: translated.ip,
                    port: translated.port,
                }])
                addresses=[{
                    ip: translated.ip,
                    port: translated.port,
                }]
                resolved = true;
            }/*add local ip just for if in same wifi router*/
            
        }
        }catch{}}

    function getICEfromServer(server:string, port: number, useCache = false){
            const stun = createSTUN()
            transactionId = stun.transactionId
            openForIceChange = true;
            resolved = false;
            if(useCache && addresses){
                return new Promise(r=>r(addresses))
            }
            dgram.send(stun.STUN, stun.offset , stun.length, port, server)
            return new Promise<Address[]>((r, reject) => {
                resolve = r;
                setTimeout(() =>{ if(!resolved)reject()},1000)
            })
    }

}
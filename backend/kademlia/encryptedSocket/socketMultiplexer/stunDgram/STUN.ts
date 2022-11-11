export default function STUN(){
    return { readXORIPV4STUN, createSTUN}
    
    function createSTUN(){
        const STUN_MESSAGE_BYTES = 20;
        const STUN = new Uint8Array(STUN_MESSAGE_BYTES);
        /*STUN type*/
        STUN[0] = 0;
        STUN[1] = 1;

        /*STUN message length*/
        STUN[2] = 0;
        STUN[3] = 0;

        /*STUN magic cookie 0x21, 0x12, 0xa4, 0x42,*/
        STUN[4] = 33;
        STUN[5] = 18;
        STUN[6] = 164;
        STUN[7] = 66;

        /* transaction id random 12 bytes */
        for(let index=8; index<STUN_MESSAGE_BYTES; index+=1)
            {
                STUN[index] = Math.floor(Math.random() * 256);
            }
        const transactionId = STUN.slice(8,STUN_MESSAGE_BYTES)
        const length = 8 * STUN_MESSAGE_BYTES;
        const offset = 0;
        return { STUN , transactionId, length, offset} 
    }
    
    function readXORIPV4STUN(STUNResponse: Uint8Array){
        if(STUNResponse.length !== 32) return undefined
        /*Response head*/
        if(STUNResponse[0] !== 1 || STUNResponse[1] !== 1) return undefined
        /*Message length*/
        if(STUNResponse[2] !== 0 || STUNResponse[3] !== 12) return undefined
        /*magic cookie*/
        if(STUNResponse[4] !== 33 || STUNResponse[5] !== 18 || STUNResponse[6] !== 164 || STUNResponse[7] !== 66) return undefined;
        /*XOR response*/
        if(STUNResponse[20] !== 0 || STUNResponse[21] !== 32) return undefined;
        /*IPV4 length*/
        if(STUNResponse[22] !== 0 || STUNResponse[23] !== 8) return undefined; 
        const port = STUNResponse[26] ^ STUNResponse[4] *256 + STUNResponse[27] ^STUNResponse[5];
        const ip = `${STUNResponse[28] ^ STUNResponse[4]}.${STUNResponse[29] ^ STUNResponse[5]}.${STUNResponse[30] ^ STUNResponse[6]}.${STUNResponse[31] ^ STUNResponse[7]}` as const
       const transactionId = STUNResponse.subarray(8,20)
        return {
            port,
            ip,
            transactionId
        } as const
    }

}
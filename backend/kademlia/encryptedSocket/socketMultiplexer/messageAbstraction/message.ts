import Partitions from "./Partitions";

export default function message(){
    return { encodeMessage, decodePartitionMessage}
    function encodeMessage(m: Uint8Array){
        const partitions = Math.ceil(m.length / 1024)
        const array: {array: Uint8Array, offset:number, length:number}[] = [];
        
        const sum_0 = Math.floor(Math.random()*256)
        const sum_1 = Math.floor(Math.random()*256)
        const sum_2 = Math.floor(Math.random()*256)
        const sum_3 = Math.floor(Math.random()*256)
        if(partitions > 256){
            throw new Error("Message is too long")
        }
        for(let i=0; i<partitions; i++)
        {
            const partition = m.slice(i* 1000, (i+1) * 1000);
    
            array.push({ 
                array : new Uint8Array([2,i,sum_0,sum_1,sum_2,sum_3,partitions, ...partition]),
                offset: 0 ,length: partition.length + 7})
        }
        return array;
    }
    function decodePartitionMessage(message: Uint8Array):Partitions | undefined{
        if(message.length < 7)
            return undefined;
        if(message[0] != 2)
            return undefined;
        if(message.length > (1024+7))
            return undefined;
        const i = message[1] ;
        const sum_0 = message[2] ;  
        const sum_1 = message[3] ;
        const sum_2 = message[4] ;
        const sum_3 = message[5] ;
        const partitions = message[6] ;
        const partition = message.slice(7, message.length)
        return { i, sum_0, sum_1, sum_2, sum_3, partitions, partition }
    }
}
import dg from 'react-native-udp';
import message from './message';
import messageCache from './messageCache';

export default function messageAbstraction(dgram: ReturnType<typeof dg.createSocket>){
    const { decodePartitionMessage, encodeMessage } = message();
    const { addPartition, getAllPartitions } = messageCache();
    const _recivers = new Set<(message: Uint8Array,rinfo: {address:string, port:number, family:'IPv6'| 'IPv4'}) => void>();
    dgram.addListener('message' , bufferReader);

    return {
        send,
        addReciveListener,
    };

    function addReciveListener(listener: (message: Uint8Array,rinfo: {address:string, port:number, family:'IPv6'| 'IPv4'}) => void){
        _recivers.add(listener);
    }

    function bufferReader(message:Buffer,  rinfo: {address:string, port:number, family:'IPv6'| 'IPv4'})
    {
        const translated = decodePartitionMessage(message);
        if(translated)
        {
            addPartition(rinfo.address, rinfo.port, translated);
            const allSumPartitions = getAllPartitions(rinfo.address, rinfo.port, translated);
            if(allSumPartitions){
                _recivers.forEach(listener => listener(allSumPartitions, rinfo));
            }
        }
    }

    function send({port, ip}: {ip: string, port: number}, message: Uint8Array){
        encodeMessage(message).forEach(({array, length, offset}) =>
            dgram.send(array,offset,length, port, ip));
    }
}
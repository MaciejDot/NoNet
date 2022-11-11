import dgram from 'react-native-udp'
import messageAbstraction from './messageAbstraction/messageAbstraction';
import STUNDgram from './stunDgram/STUNDgram';

export default function socketMultiplexer(){
    const socket = dgram.createSocket({type: 'udp4'});
    socket.bind(16000);
    return {
        ...STUNDgram(socket),
        ...messageAbstraction(socket),
    }
}
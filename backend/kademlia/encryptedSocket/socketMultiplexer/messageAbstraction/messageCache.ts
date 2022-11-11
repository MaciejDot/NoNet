import forceDefined from './forceDefined';
import Partitions from './Partitions';

export default function messageCache(){
    const _cache = new Map<string, Partitions[]>();
    
    return { addPartition, getAllPartitions };

    function getAllPartitions(ip:string, port:number, partition:Partitions){
        if(!_cache.has(ip+port))
        {
            return;
        }
        const partitions = forceDefined(_cache.get(ip+port));
        const allSumPartitions = partitions.filter(({sum_0, sum_1, sum_2, sum_3})=>
            partition.sum_0 === sum_0 && partition.sum_1 === sum_1 && partition.sum_2 === sum_2 && partition.sum_3 === sum_3);
        if(allSumPartitions.length === partition.partitions){
            _cache.set(ip+port, partitions.filter(({sum_0, sum_1, sum_2, sum_3})=>
                !(partition.sum_0 === sum_0 && partition.sum_1 === sum_1 && partition.sum_2 === sum_2 && partition.sum_3 === sum_3)));
            return new Uint8Array(allSumPartitions.sort((a,b) => a.i - b.i).flatMap(x=>[...x.partition]));
        }
        return;
    }
    
    function addPartition(ip:string, port:number, partition:Partitions){
        if(!_cache.has(ip+port))
        {
            _cache.set(ip + port, [partition]); 
            return;
        }
        const partitions = forceDefined(_cache.get(ip+port));
        partitions.push(partition);
        if(partitions.length > 256)
            _cache.delete(ip+port);
        if(_cache.size > 512)
            _cache.clear();
    }
    
    
}
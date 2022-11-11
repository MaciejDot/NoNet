export default function encryptionCache(){
    const _encryptionContext = new Map<string, 
    {
        cookieA: Uint8Array,
        cookieB?: Uint8Array,
        other_id?: Uint8Array,
        other_key?: Uint8Array,
        compoundKey? : CryptoKey
    }>()

    return {
        
    }

    function get(ip:string, port:number){
        return _encryptionContext.get(ip+port)
    }
}
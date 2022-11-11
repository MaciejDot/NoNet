export default function asyncEncryption(){
    return{
        generateKeyPair, exportKey, rawPublicKeySize, importKey
    };
    function generateKeyPair(){
        return crypto.subtle.generateKey({name: 'ECDH', namedCurve: 'P-521'},true, ['deriveBits', 'deriveKey']);
    }
    
    function exportKey(key: CryptoKey){
        return crypto.subtle.exportKey('raw', key);
    }

    function rawPublicKeySize(){
        return 133;
    }

    function importKey(key: ArrayBuffer){
        return crypto.subtle.importKey('raw', key, { name:'ECDH', namedCurve:'P-521' }, true, ['deriveBits', 'deriveKey']);
    }
}
export default function syncEncryption(){
    return{
        secret, encrypt, decrypt
    }

          function secret(publicKey: CryptoKey, privateKey: CryptoKey, randBits: Uint8Array){
            return crypto.subtle.deriveBits({
                name: "ECDH",
                public: publicKey,
            },
            privateKey, 
            521
        ).then(r=> crypto.subtle.digest('SHA-256', new Uint8Array([ ...new Uint8Array(r), ...randBits ])))
        .then(r=> crypto.subtle.importKey('raw', r, {name:'AES-CBC'}, true, ['encrypt', 'decrypt']))
        };
        async function encrypt(message: ArrayBuffer, secret: CryptoKey)
        {
            const iv = new Uint8Array(16);

            crypto.getRandomValues(iv);

            const encrypted = await crypto.subtle.encrypt( {
                name: 'AES-CBC',
                iv
            }, secret, message) ;
            return { encrypted : new Uint8Array(encrypted as ArrayBuffer), iv };
        };
        async function decrypt(message: {encrypted: Uint8Array, iv: Uint8Array}, secret: CryptoKey){
            const {encrypted, iv} = message;

            const decrypted = await crypto.subtle.decrypt( {
                name: 'AES-CBC',
                iv
            }, secret, encrypted);
            return new Uint8Array(decrypted as ArrayBuffer);
        };
    }
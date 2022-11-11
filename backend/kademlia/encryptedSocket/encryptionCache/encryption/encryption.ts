import asyncEncryption from "./asyncEncryption";
import syncEncryption from "./syncEncryption";

export default function encryption(){
    return {
        ...asyncEncryption(),
        ...syncEncryption()
    }
}
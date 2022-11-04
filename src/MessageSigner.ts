import { MessageEntity } from "typegram";
import SignatureStorage from "./SignatureStorage";

class MessageSigner {
    constructor(
        public readonly signatureStorage: SignatureStorage
    ){}

    public sign(text: string, entities: MessageEntity[]) {
        let newText = "" + text + "\n\n";
        const nativeTextLen = newText.length;
        newText = `${newText}${this.signatureStorage.text}`;
        

        const newEntities = this.signatureStorage.entities !== undefined ? 
            this.signatureStorage.entities.map(entity => {
                const newEntity = Object.assign({}, entity);
                newEntity.offset = newEntity.offset + nativeTextLen;
                return newEntity;
            }) : 
            [];
    
        return {
            text: newText,
            entities: [...entities, ...newEntities]
        }
    }
}

export default MessageSigner;

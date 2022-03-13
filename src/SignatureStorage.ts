import fs from "fs";
import { MessageEntity } from "typegram";

type SignatureStorageData = {
    text: string,
    entities: MessageEntity[]
};

class SignatureStorage implements SignatureStorageData {
    public text: string = "";
    public entities: MessageEntity[] = [];

    constructor(
        private _path: string
    ) {
        const json = fs.readFileSync("signature.json").toString();
        const data = JSON.parse(json) as SignatureStorageData;
        this.text = data.text;
        this.entities = data.entities;
    }

    public write() {
        fs.writeFileSync("signature.json", JSON.stringify({
            text: this.text || "",
            entities: this.entities || []
        }));
    }
}

export default SignatureStorage;
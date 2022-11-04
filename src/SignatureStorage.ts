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
        const json = fs.readFileSync(_path).toString();
        const data = JSON.parse(json) as SignatureStorageData;
        this.text = data.text;
        this.entities = data.entities || [];
    }

    public write() {
        fs.writeFileSync(this._path, JSON.stringify({
            text: this.text || "",
            entities: this.entities || []
        }));
    }
}

export default SignatureStorage;
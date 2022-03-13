import Level from "level-ts";
import Channel from "./channel";

class ChannelStorage {
    constructor(public readonly db: Level) {}

    public async get(chainId: number) {
        if(!await this.exsits(chainId)) {
            return undefined;
        }
        
        const data: string = await this.db.get(`ch${chainId}`);
        const obj = JSON.parse(data);
        return obj as Channel;
    }

    public async update(ch: Channel) {
        const batch = this.db.chain;

        if(await this.exsits(ch.id)) {
            batch.del(`ch${ch.id}`);
        }
        batch.put(`ch${ch.id}`, JSON.stringify(ch));

        await batch.finish();
    }

    public async create(ch: Channel) {
        if(await this.exsits(ch.id)) {
            throw new Error(`Channel ${ch.id} already exists in database`);
            return;
        }

        await this.db.put(`ch${ch.id}`, JSON.stringify(ch));
    }

    public async exsits(channelId: number) {
        return await this.db.exists(`ch${channelId}`);
    }
}

export default ChannelStorage;
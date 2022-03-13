import { MessageEntity } from "typegram";

type ChannelPostExternal = {
    text?: string;
    caption?: string;
    photo: any[];
    entities?: MessageEntity[];
    caption_entities: MessageEntity[];
};

export default ChannelPostExternal;

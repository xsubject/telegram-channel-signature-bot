class Channel {
    constructor(
        public id: number,
        public owner: number,
        public lastProcessedMessage: number,
        public verefied: boolean,
    ) {}
}

export default Channel;
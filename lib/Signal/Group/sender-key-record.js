import { BufferJSON } from '../../Utils/generics.js';
import { SenderKeyState } from './sender-key-state.js';
export class SenderKeyRecord {
    constructor(serialized) {
        this.MAX_STATES = 5;
        this.senderKeyStates = [];
        if (serialized) {
            for (const structure of serialized) {
                this.senderKeyStates.push(new SenderKeyState(null, null, null, null, null, null, structure));
            }
        }
    }
    isEmpty() {
        return this.senderKeyStates.length === 0;
    }
    getSenderKeyState(keyId) {
        if (keyId === undefined && this.senderKeyStates.length) {
            // Prefer our own local state (one that can sign). Foreign states
            // (received SKDMs, e.g. from our phone sharing the same signal address)
            // never carry a private key and cannot encrypt outgoing messages.
            for (let i = this.senderKeyStates.length - 1; i >= 0; i--) {
                if (this.senderKeyStates[i].getSigningKeyPrivate().length) {
                    return this.senderKeyStates[i];
                }
            }
            return this.senderKeyStates[this.senderKeyStates.length - 1];
        }
        return this.senderKeyStates.find(state => state.getKeyId() === keyId);
    }
    hasLocalState() {
        return this.senderKeyStates.some(state => state.getSigningKeyPrivate().length > 0);
    }
    addSenderKeyState(id, iteration, chainKey, signatureKey) {
        this.senderKeyStates.push(new SenderKeyState(id, iteration, chainKey, null, signatureKey));
        if (this.senderKeyStates.length > this.MAX_STATES) {
            this.senderKeyStates.shift();
        }
    }
    addLocalSenderKeyState(id, iteration, chainKey, keyPair) {
        this.senderKeyStates.push(new SenderKeyState(id, iteration, chainKey, keyPair));
        while (this.senderKeyStates.length > this.MAX_STATES) {
            // Evict the oldest foreign state first, keep our local states.
            const foreignIndex = this.senderKeyStates.findIndex(state => !state.getSigningKeyPrivate().length);
            this.senderKeyStates.splice(foreignIndex !== -1 ? foreignIndex : 0, 1);
        }
    }
    setSenderKeyState(id, iteration, chainKey, keyPair) {
        this.senderKeyStates.length = 0;
        this.senderKeyStates.push(new SenderKeyState(id, iteration, chainKey, keyPair));
    }
    serialize() {
        return this.senderKeyStates.map(state => state.getStructure());
    }
    static deserialize(data) {
        const str = Buffer.from(data).toString('utf-8');
        const parsed = JSON.parse(str, BufferJSON.reviver);
        return new SenderKeyRecord(parsed);
    }
}
//# sourceMappingURL=sender-key-record.js.map
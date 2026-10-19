export class SenderKeyRecord {
    static deserialize(data: any): SenderKeyRecord;
    constructor(serialized: any);
    MAX_STATES: number;
    senderKeyStates: SenderKeyState[];
    isEmpty(): boolean;
    getSenderKeyState(keyId: any): SenderKeyState | undefined;
    hasLocalState(): boolean;
    addSenderKeyState(id: any, iteration: any, chainKey: any, signatureKey: any): void;
    addLocalSenderKeyState(id: any, iteration: any, chainKey: any, keyPair: any): void;
    setSenderKeyState(id: any, iteration: any, chainKey: any, keyPair: any): void;
    serialize(): any[];
}
import { SenderKeyState } from './sender-key-state.js';

/**
 * Represents the payload for creating or updating a message.
 * This class encapsulates all the parameters needed to send a message in Discord.
 */
export class MessagePayload {
    private _content?: string;
    private _nonce?: string | number;
    private _tts?: boolean;
    private _embeds?: any[];
    private _allowedMentions?: {
        everyone?: boolean;
        repliedUser?: boolean;
        roles?: boolean | string[];
        users?: boolean | string[];
    };
    private _messageReference?: {
        messageID: string;
        channelID?: string;
        guildID?: string;
        failIfNotExists?: boolean;
    };
    private _components?: any[];
    private _stickerIDs?: string[];
    private _attachments?: {
        id: number;
        filename: string;
        description?: string;
    }[];
    private _flags?: number;
    private _enforceNonce?: boolean;
    private _poll?: any;

    /**
     * Creates a new `MessagePayload` instance.
     * @param data Optional initial data to set in the payload.
     */
    constructor(data?: {
        content?: string;
        nonce?: string | number;
        tts?: boolean;
        embeds?: any[];
        allowed_mentions?: {
            everyone?: boolean;
            repliedUser?: boolean;
            roles?: boolean | string[];
            users?: boolean | string[];
        };
        message_reference?: {
            messageID: string;
            channelID?: string;
            guildID?: string;
            failIfNotExists?: boolean;
        };
        components?: any[];
        sticker_ids?: string[];
        attachments?: {
            id: number;
            filename: string;
            description?: string;
        }[];
        flags?: number;
        enforce_nonce?: boolean;
        poll?: any;
    }) {
        if (data) {
            this._content = data.content;
            this._nonce = data.nonce;
            this._tts = data.tts;
            this._embeds = data.embeds;
            this._allowedMentions = data.allowed_mentions;
            this._messageReference = data.message_reference;
            this._components = data.components;
            this._stickerIDs = data.sticker_ids;
            this._attachments = data.attachments;
            this._flags = data.flags;
            this._enforceNonce = data.enforce_nonce;
            this._poll = data.poll;
        }
    }

    /**
     * Gets the content of the message.
     * @returns The message content.
     */
    get content() {
        return this._content;
    }

    /**
     * Sets the content of the message.
     * @param value The message content. Should be up to 2000 characters.
     * @throws Error if the content exceeds 2000 characters.
     */
    set content(value: string | undefined) {
        if (value && value.length > 2000) {
            throw new Error("Content must be up to 2000 characters.");
        }
        this._content = value;
    }

    /**
     * Gets the nonce for the message.
     * @returns The nonce value.
     */
    get nonce() {
        return this._nonce;
    }

    /**
     * Sets the nonce for the message.
     * @param value The nonce value. Should be up to 25 characters if string.
     * @throws Error if the nonce exceeds 25 characters.
     */
    set nonce(value: string | number | undefined) {
        if (value && (typeof value === 'string' && value.length > 25)) {
            throw new Error("Nonce must be up to 25 characters.");
        }
        this._nonce = value;
    }

    /**
     * Gets the TTS flag for the message.
     * @returns True if the message is a TTS message.
     */
    get tts() {
        return this._tts;
    }

    /**
     * Sets the TTS flag for the message.
     * @param value True if the message should be sent as TTS.
     */
    set tts(value: boolean | undefined) {
        this._tts = value;
    }

    /**
     * Gets the embeds for the message.
     * @returns An array of embed objects.
     */
    get embeds() {
        return this._embeds;
    }

    /**
     * Sets the embeds for the message.
     * @param value An array of embed objects. Up to 10 embeds allowed.
     * @throws Error if the array exceeds 10 embeds.
     */
    set embeds(value: any[] | undefined) {
        if (value && value.length > 10) {
            throw new Error("Cannot include more than 10 embeds.");
        }
        this._embeds = value;
    }

    /**
     * Gets the allowed mentions for the message.
     * @returns The allowed mentions object.
     */
    get allowedMentions() {
        return this._allowedMentions;
    }

    /**
     * Sets the allowed mentions for the message.
     * @param value The allowed mentions object.
     */
    set allowedMentions(value: {
        everyone?: boolean;
        repliedUser?: boolean;
        roles?: boolean | string[];
        users?: boolean | string[];
    } | undefined) {
        this._allowedMentions = value;
    }

    /**
     * Gets the message reference object.
     * @returns The message reference object.
     */
    get messageReference() {
        return this._messageReference;
    }

    /**
     * Sets the message reference object for replies or forwards.
     * @param value The message reference object. Must include `messageID`.
     * @throws Error if `messageID` is not provided.
     */
    set messageReference(value: {
        messageID: string;
        channelID?: string;
        guildID?: string;
        failIfNotExists?: boolean;
    } | undefined) {
        if (value && !value.messageID) {
            throw new Error("Message reference must include a messageID.");
        }
        this._messageReference = value;
    }

    /**
     * Gets the components for the message.
     * @returns An array of message component objects.
     */
    get components() {
        return this._components;
    }

    /**
     * Sets the components for the message.
     * @param value An array of message component objects.
     */
    set components(value: any[] | undefined) {
        this._components = value;
    }

    /**
     * Gets the sticker IDs for the message.
     * @returns An array of sticker IDs.
     */
    get stickerIDs() {
        return this._stickerIDs;
    }

    /**
     * Sets the sticker IDs for the message.
     * @param value An array of sticker IDs. Up to 3 stickers allowed.
     * @throws Error if the array exceeds 3 stickers.
     */
    set stickerIDs(value: string[] | undefined) {
        if (value && value.length > 3) {
            throw new Error("Cannot include more than 3 stickers.");
        }
        this._stickerIDs = value;
    }

    /**
     * Gets the attachments for the message.
     * @returns An array of attachment objects.
     */
    get attachments() {
        return this._attachments;
    }

    /**
     * Sets the attachments for the message.
     * @param value An array of attachment objects.
     */
    set attachments(value: {
        id: number;
        filename: string;
        description?: string;
    }[] | undefined) {
        this._attachments = value;
    }

    /**
     * Gets the flags for the message.
     * @returns The message flags.
     */
    get flags() {
        return this._flags;
    }

    /**
     * Sets the flags for the message.
     * @param value The message flags as a bitfield.
     */
    set flags(value: number | undefined) {
        this._flags = value;
    }

    /**
     * Gets the enforce nonce flag.
     * @returns True if nonce uniqueness should be enforced.
     */
    get enforceNonce() {
        return this._enforceNonce;
    }

    /**
     * Sets the enforce nonce flag.
     * @param value True if nonce uniqueness should be enforced.
     */
    set enforceNonce(value: boolean | undefined) {
        this._enforceNonce = value;
    }

    /**
     * Gets the poll object for the message.
     * @returns The poll object.
     */
    get poll() {
        return this._poll;
    }

    /**
     * Sets the poll object for the message.
     * @param value The poll object.
     */
    set poll(value: any | undefined) {
        this._poll = value;
    }

    public async resolveFiles(): Promise<{ content?: string; nonce?: string | number; tts?: boolean; embeds?: any[]; allowed_mentions?: any; message_reference?: any; components?: any[]; sticker_ids?: string[]; attachments?: any[]; flags?: number; enforce_nonce?: boolean; poll?: any; files: any[] }> {
        const body: any = this.toJSON(); // Get the JSON representation of the payload
        const files: any[] = [];
    
        // Process attachments (if any)
        if (this._attachments && this._attachments.length > 0) {
            for (const attachment of this._attachments) {
                try {
                    files.push({
                        file: attachment,  // Add the file details
                        name: attachment.filename
                    });
                } catch (error) {
                    console.error(`Failed to retrieve file with ID ${attachment.id}:`, error);
                }
            }
        }
    
        // Return all properties and the file list at the top level
        return {
            content: body.content,
            nonce: body.nonce,
            tts: body.tts,
            embeds: body.embeds,
            allowed_mentions: body.allowed_mentions,
            message_reference: body.message_reference,
            components: body.components,
            sticker_ids: body.sticker_ids,
            attachments: body.attachments,
            flags: body.flags,
            enforce_nonce: body.enforce_nonce,
            poll: body.poll,
            files: files
        };
    }
    


    /**
     * Converts the payload to a JSON-serializable object.
     * @returns A JSON-serializable representation of the payload.
     */
    toJSON() {
        const result: any = {};
        if (this._content !== undefined) result.content = this._content;
        if (this._nonce !== undefined) result.nonce = this._nonce;
        if (this._tts !== undefined) result.tts = this._tts;
        if (this._embeds !== undefined) result.embeds = this._embeds;
        if (this._allowedMentions !== undefined) result.allowed_mentions = this._allowedMentions;
        if (this._messageReference !== undefined) result.message_reference = this._messageReference;
        if (this._components !== undefined) result.components = this._components;
        if (this._stickerIDs !== undefined) result.sticker_ids = this._stickerIDs;
        if (this._attachments !== undefined) result.attachments = this._attachments;
        if (this._flags !== undefined) result.flags = this._flags;
        if (this._enforceNonce !== undefined) result.enforce_nonce = this._enforceNonce;
        if (this._poll !== undefined) result.poll = this._poll;
        return result;
    }
}

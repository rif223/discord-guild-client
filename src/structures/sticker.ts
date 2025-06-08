import { Client } from "../client";
import { User } from "./user";

/**
 * Represents a Discord sticker object.
 */
export class Sticker {
    private _client: Client;

    public id: string;
    public packId?: string;
    public name: string;
    public description?: string;
    public tags: string;
    public type: number;
    public formatType: number;
    public available?: boolean;
    public guildId?: string;
    public user?: User;
    public sortValue?: number;

    /**
     * Creates a new Sticker instance.
     * @param {Client} client - The client instance.
     * @param {any} data - The raw data from the Discord API.
     */
    constructor(client: Client, data: any) {
        this._client = client;
        this._update(data);
    }

    /**
     * Updates the sticker properties with the provided data.
     * @param {Object} data - The data object containing sticker information.
     */
    private _update(data: any): void {
        /**
         * The unique ID of the sticker.
         * @type {string}
         */
        this.id = data.id;

        /**
         * The ID of the sticker pack (if standard sticker).
         * @type {string | undefined}
         */
        this.packId = data.pack_id;

        /**
         * The name of the sticker.
         * @type {string}
         */
        this.name = data.name;

        /**
         * The description of the sticker (can be null).
         * @type {string | undefined}
         */
        this.description = data.description ?? undefined;

        /**
         * Tags for autocomplete/suggestions (max 200 characters).
         * @type {string}
         */
        this.tags = data.tags;

        /**
         * Type of sticker.
         * @type {number}
         */
        this.type = data.type;

        /**
         * Sticker format type.
         * @type {number}
         */
        this.formatType = data.format_type;

        /**
         * Whether the sticker is available for use.
         * @type {boolean | undefined}
         */
        this.available = data.available;

        /**
         * ID of the guild that owns the sticker (if any).
         * @type {string | undefined}
         */
        this.guildId = data.guild_id;

        /**
         * The user who uploaded the sticker (if applicable).
         * @type {User | undefined}
         */
        this.user = data.user ? new User(this._client, data.user) : undefined;

        /**
         * Sort value of standard stickers within a pack.
         * @type {number | undefined}
         */
        this.sortValue = data.sort_value;
    }
}

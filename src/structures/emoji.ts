import { Client } from "../client";
import { User } from "./user";

/**
 * Represents a custom guild emoji.
 */
export class Emoji {
    private _client: Client;

    public id?: string;
    public name?: string;
    public roles: string[] = [];
    public user?: User;
    public requireColons?: boolean;
    public managed?: boolean;
    public animated?: boolean;
    public available?: boolean;

    /**
     * Constructs a new Emoji object.
     * @param {Client} client - The client instance managing this emoji.
     * @param {any} data - The raw data from the API representing the emoji.
     */
    constructor(client: Client, data: any) {
        this._client = client;
        this._update(data);
    }

    /**
     * Updates the emoji properties with the provided data.
     * @param {any} data - The data object containing emoji information.
     */
    private _update(data: any) {
        /**
         * The emoji ID.
         * @type {string | undefined}
         */
        this.id = data.id;

        /**
         * The emoji name (nullable in some cases).
         * @type {string | undefined}
         */
        this.name = data.name;

        /**
         * The roles allowed to use this emoji.
         * @type {string[]}
         */
        this.roles = data.roles || [];

        /**
         * The user that created this emoji.
         * @type {User | undefined}
         */
        this.user = data.user ? new User(this._client, data.user) : undefined;

        /**
         * Whether this emoji must be wrapped in colons.
         * @type {boolean | undefined}
         */
        this.requireColons = data.require_colons;

        /**
         * Whether this emoji is managed by an integration.
         * @type {boolean | undefined}
         */
        this.managed = data.managed;

        /**
         * Whether this emoji is animated.
         * @type {boolean | undefined}
         */
        this.animated = data.animated;

        /**
         * Whether this emoji is available for use.
         * @type {boolean | undefined}
         */
        this.available = data.available;
    }
}

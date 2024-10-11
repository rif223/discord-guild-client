import { Client } from "../client";
import { apiEndpoints } from "../rest/endpoints";
import { RestApi } from "../rest/request";

/**
 * Represents an application command in Discord.
 */
export class ApplicationCommand {
    private _client: Client;

    /**
     * Unique ID of the command.
     * @type {string}
     */
    public id!: string;

    /**
     * ID of the parent application.
     * @type {string}
     */
    public application_id!: string;

    /**
     * The name of the command (1-32 characters).
     * @type {string}
     */
    public name!: string;

    /**
     * A dictionary for localized names of the command.
     * @type {object | undefined}
     */
    public name_localizations?: { [key: string]: string };

    /**
     * Description for CHAT_INPUT commands (1-100 characters), or an empty string for other types.
     * @type {string}
     */
    public description!: string;

    /**
     * A dictionary for localized descriptions of the command.
     * @type {object | undefined}
     */
    public description_localizations?: { [key: string]: string };

    /**
     * Command options (up to 25) for CHAT_INPUT commands.
     * @type {array | undefined}
     */
    public options?: Array<object>;

    /**
     * Permission bit set representing the permissions required to use the command.
     * @type {string | undefined}
     */
    public default_member_permissions?: string;

    /**
     * Whether the command is available in DMs.
     * @type {boolean | undefined}
     */
    public dm_permission?: boolean;

    /**
     * Whether the command is enabled by default when added to a guild.
     * @type {boolean | undefined}
     */
    public default_permission?: boolean;

    /**
     * Whether the command is NSFW (age-restricted).
     * @type {boolean}
     */
    public nsfw: boolean = false;

    /**
     * The list of integration types where the command is available.
     * @type {Array<string> | undefined}
     */
    public integration_types?: Array<string>;

    /**
     * The interaction contexts where the command can be used.
     * @type {Array<string> | undefined}
     */
    public contexts?: Array<string>;

    /**
     * Autoincrementing version identifier for the command.
     * @type {string}
     */
    public version!: string;

    /**
     * Constructor for creating a new ApplicationCommand instance.
     * @param {Client} client - The client instance.
     * @param {any} data - The raw data representing the application command.
     */
    constructor(client: Client, data: any) {
        this._client = client;
        this._update(data);
    }

    /**
     * Updates the command properties with the provided data.
     * @param {Object} data - The data representing the command.
     */
    private _update(data: any) {
        this.id = data.id;
        this.application_id = data.application_id;
        this.name = data.name;
        this.name_localizations = data.name_localizations;
        this.description = data.description;
        this.description_localizations = data.description_localizations;
        this.options = data.options;
        this.default_member_permissions = data.default_member_permissions;
        this.dm_permission = data.dm_permission;
        this.default_permission = data.default_permission;
        this.nsfw = data.nsfw;
        this.integration_types = data.integration_types;
        this.contexts = data.contexts;
        this.version = data.version;
    }
}

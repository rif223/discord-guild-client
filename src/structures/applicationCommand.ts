import { Client } from "../client";
import { apiEndpoints } from "../rest/endpoints";
import { RestApi } from "../rest/request";

export class ApplicationCommand {
    private _client: Client;

    public id!: string;
    public application_id!: string;
    public name!: string;
    public name_localizations?: { [key: string]: string };
    public description!: string;
    public description_localizations?: { [key: string]: string };
    public options?: Array<object>;
    public default_member_permissions?: string;
    public dm_permission?: boolean;
    public default_permission?: boolean;
    public nsfw: boolean = false;
    public integration_types?: Array<string>;
    public contexts?: Array<string>;
    public version!: string;

    constructor(client: Client, data: any) {
        this._client = client;
        this._update(data);
    }

    private _update(data: any) {
        /**
         * Unique ID of the command.
         * @type {string}
         */
        this.id = data.id;

        /**
         * ID of the parent application.
         * @type {string}
         */
        this.application_id = data.application_id;

        /**
         * The name of the command (1–32 characters).
         * @type {string}
         */
        this.name = data.name;

        /**
         * A dictionary for localized names of the command.
         * @type {object | undefined}
         */
        this.name_localizations = data.name_localizations;

        /**
         * Description for CHAT_INPUT commands (1–100 characters), or empty for other types.
         * @type {string}
         */
        this.description = data.description;

        /**
         * A dictionary for localized descriptions of the command.
         * @type {object | undefined}
         */
        this.description_localizations = data.description_localizations;

        /**
         * Command options (up to 25) for CHAT_INPUT commands.
         * @type {Array<object> | undefined}
         */
        this.options = data.options;

        /**
         * Bitfield representing required permissions to use the command.
         * @type {string | undefined}
         */
        this.default_member_permissions = data.default_member_permissions;

        /**
         * Whether the command is available in DMs.
         * @type {boolean | undefined}
         */
        this.dm_permission = data.dm_permission;

        /**
         * Whether the command is enabled by default when added to a guild.
         * @type {boolean | undefined}
         */
        this.default_permission = data.default_permission;

        /**
         * Whether the command is age-restricted (NSFW).
         * @type {boolean}
         */
        this.nsfw = data.nsfw;

        /**
         * List of integration types where the command is available.
         * @type {Array<string> | undefined}
         */
        this.integration_types = data.integration_types;

        /**
         * The interaction contexts where the command can be used.
         * @type {Array<string> | undefined}
         */
        this.contexts = data.contexts;

        /**
         * Autoincrementing version identifier for the command.
         * @type {string}
         */
        this.version = data.version;
    }
}


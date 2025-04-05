declare module "rest/endpoints" {
    export const apiEndpoints: {
        user: () => string;
        guild: () => string;
        guildInteractionCallback: (interactionId: string, interactionToken: string) => string;
        guildCommands: () => string;
        guildCommand: (cmdId: string) => string;
        guildCommandPermissions: () => string;
        guildBans: () => string;
        guildBan: (userId: string) => string;
        guildBulkBanMembers: () => string;
        guildChannels: () => string;
        guildChannel: (channelId: string) => string;
        guildChannelPermissions: (channelId: string, overwriteId: string) => string;
        guildChannelMessages: (channelId: string) => string;
        guildChannelMessage: (channelId: string, messageId: string) => string;
        guildChannelMessageReaction: (channelId: string, messageId: string, emojiId: string) => string;
        guildChannelMessageReactionUser: (channelId: string, messageId: string, emojiId: string, userId: string) => string;
        guildChannelMessageReactions: (channelId: string, messageId: string) => string;
        guildMembers: () => string;
        guildMember: (memberId: string) => string;
        guildMemberRoles: (memberId: string) => string;
        guildMemberRole: (memberId: string, roleId: string) => string;
        guildRoles: () => string;
        guildRole: (roleId: string) => string;
    };
}
declare module "rest/request" {
    import { Axios } from "axios";
    /**
     * The `RestApi` class provides a simplified interface for making HTTP requests
     * to a specified server using Axios. It supports common HTTP methods and
     * manages authorization headers.
     */
    export class RestApi {
        axios: Axios;
        /**
         * Creates an instance of `RestApi`.
         *
         * @param {string} host - The base URL of the API server (e.g., "https://api.example.com").
         * @param {string} token - The authorization token to include in the request headers.
         */
        constructor(host: string, token: string);
        /**
         * Enum-like object defining supported HTTP methods.
         * This is a constant object that maps HTTP method names to their string representations.
         *
         * Available methods:
         * - `GET`: Fetch data from the server.
         * - `POST`: Submit data to the server.
         * - `PUT`: Replace data on the server.
         * - `PATCH`: Partially update data on the server.
         * - `DELETE`: Remove data from the server.
         */
        static HttpMethod: {
            readonly GET: "GET";
            readonly POST: "POST";
            readonly PUT: "PUT";
            readonly PATCH: "PATCH";
            readonly DELETE: "DELETE";
        };
        /**
         * Sends an HTTP request to the server using the specified method and URL.
         *
         * @param {keyof typeof RestApi.HttpMethod} method - The HTTP method to use (GET, POST, PUT, PATCH, DELETE).
         * @param {string} url - The endpoint URL (relative to the base URL).
         * @param {any} [body] - Optional data to send in the request body (used with POST, PUT, PATCH).
         * @returns {Promise<any>} A promise that resolves to the server's response data.
         *
         * @throws {Error} Logs and throws the error if the request fails.
         */
        request(method: keyof typeof RestApi.HttpMethod, url: string, body?: any): Promise<any>;
    }
}
declare module "utils/collection" {
    import { Client } from "client";
    /**
     * A generic collection class that extends Map to store objects with their IDs.
     * @template T - The type of objects stored in the collection.
     */
    export class Collection<T> extends Map<string, T> {
        private _limit?;
        private _client;
        private _obj;
        /**
         * Constructs a new Collection object.
         * @param {Client} client - The client instance to be used for creating items.
         * @param {new (client: Client, data: any) => T} obj - The constructor function for items in the collection.
         * @param {number} [limit] - The maximum number of items allowed in the collection.
         */
        constructor(client: Client, obj: new (client: Client, data: any) => T, limit?: number);
        /**
         * Adds an item to the collection.
         * @param {string} id - The ID of the item.
         * @param {any} data - The data of the item.
         */
        add(id: string, data: any): void;
        /**
         * Retrieves an item from the collection by its ID.
         * @param {string} id - The ID of the item.
         * @returns {T | undefined} The item if found, otherwise undefined.
         */
        get(id: string): T | undefined;
        /**
         * Removes an item from the collection by its ID.
         * @param {string} id - The ID of the item.
         * @returns {boolean} True if the item was removed, otherwise false.
         */
        remove(id: string): boolean;
        /**
         * Clears all items from the collection.
         */
        clear(): void;
        /**
         * Checks if an item exists in the collection by its ID.
         * @param {string} id - The ID of the item.
         * @returns {boolean} True if the item exists, otherwise false.
         */
        has(id: string): boolean;
        /**
         * Returns an array of all items in the collection.
         * @returns {T[]} An array of all items.
         */
        toArray(): T[];
    }
}
declare module "structures/channelPayload" {
    /**
     * Represents the payload for creating or updating a Discord channel.
     * This class encapsulates all the parameters needed to create or update a channel in Discord.
     */
    export class ChannelPayload {
        private _name?;
        private _type?;
        private _topic?;
        private _bitrate?;
        private _userLimit?;
        private _rateLimitPerUser?;
        private _position?;
        private _permissionOverwrites?;
        private _parentId?;
        private _nsfw?;
        private _rtcRegion?;
        private _videoQualityMode?;
        private _defaultAutoArchiveDuration?;
        private _defaultReactionEmoji?;
        private _availableTags?;
        private _defaultSortOrder?;
        private _defaultForumLayout?;
        private _defaultThreadRateLimitPerUser?;
        /**
         * Creates a new `ChannelPayload` instance.
         * @param data Optional initial data to set in the payload.
         */
        constructor(data?: {
            name?: string;
            type?: number;
            topic?: string;
            bitrate?: number;
            user_limit?: number;
            rate_limit_per_user?: number;
            position?: number;
            permission_overwrites?: any[];
            parent_id?: string;
            nsfw?: boolean;
            rtc_region?: string;
            video_quality_mode?: number;
            default_auto_archive_duration?: number;
            default_reaction_emoji?: any;
            available_tags?: any[];
            default_sort_order?: number;
            default_forum_layout?: number;
            default_thread_rate_limit_per_user?: number;
        });
        /**
         * Gets the name of the channel.
         * @returns The channel name.
         */
        get name(): string | undefined;
        /**
         * Sets the name of the channel.
         * @param value The name of the channel. Must be between 1 and 100 characters.
         * @throws Error if the name is not between 1 and 100 characters.
         */
        set name(value: string | undefined);
        /**
         * Gets the type of the channel.
         * @returns The channel type.
         */
        get type(): number | undefined;
        /**
         * Sets the type of the channel.
         * @param value The type of the channel.
         */
        set type(value: number | undefined);
        /**
         * Gets the topic of the channel.
         * @returns The channel topic.
         */
        get topic(): string | undefined;
        /**
         * Sets the topic of the channel.
         * @param value The topic of the channel. Must be up to 1024 characters.
         * @throws Error if the topic exceeds 1024 characters.
         */
        set topic(value: string | undefined);
        /**
         * Gets the bitrate of the voice channel.
         * @returns The bitrate value.
         */
        get bitrate(): number | undefined;
        /**
         * Sets the bitrate of the voice channel.
         * @param value The bitrate value.
         */
        set bitrate(value: number | undefined);
        /**
         * Gets the user limit for a voice channel.
         * @returns The user limit value.
         */
        get userLimit(): number | undefined;
        /**
         * Sets the user limit for a voice channel.
         * @param value The user limit.
         */
        set userLimit(value: number | undefined);
        /**
         * Gets the rate limit per user for a text channel.
         * @returns The rate limit in seconds.
         */
        get rateLimitPerUser(): number | undefined;
        /**
         * Sets the rate limit per user for a text channel.
         * @param value The rate limit in seconds (0 to 21600).
         * @throws Error if the value is out of range.
         */
        set rateLimitPerUser(value: number | undefined);
        /**
         * Gets the position of the channel.
         * @returns The channel position.
         */
        get position(): number | undefined;
        /**
         * Sets the position of the channel.
         * @param value The channel position.
         */
        set position(value: number | undefined);
        /**
         * Gets the permission overwrites for the channel.
         * @returns An array of permission overwrites.
         */
        get permissionOverwrites(): any[] | undefined;
        /**
         * Sets the permission overwrites for the channel.
         * @param value An array of permission overwrites.
         */
        set permissionOverwrites(value: any[] | undefined);
        /**
         * Gets the parent ID of the channel (for categories).
         * @returns The parent channel ID.
         */
        get parentId(): string | undefined;
        /**
         * Sets the parent ID of the channel (for categories).
         * @param value The parent channel ID.
         */
        set parentId(value: string | undefined);
        /**
         * Gets the NSFW status of the channel.
         * @returns True if the channel is NSFW.
         */
        get nsfw(): boolean | undefined;
        /**
         * Sets the NSFW status of the channel.
         * @param value True if the channel should be marked NSFW.
         */
        set nsfw(value: boolean | undefined);
        /**
         * Gets the RTC region for a voice channel.
         * @returns The RTC region value.
         */
        get rtcRegion(): string | undefined;
        /**
         * Sets the RTC region for a voice channel.
         * @param value The RTC region value.
         */
        set rtcRegion(value: string | undefined);
        /**
         * Gets the video quality mode for a voice channel.
         * @returns The video quality mode.
         */
        get videoQualityMode(): number | undefined;
        /**
         * Sets the video quality mode for a voice channel.
         * @param value The video quality mode.
         */
        set videoQualityMode(value: number | undefined);
        /**
         * Gets the default auto-archive duration for threads in the channel.
         * @returns The default auto-archive duration in minutes.
         */
        get defaultAutoArchiveDuration(): number | undefined;
        /**
         * Sets the default auto-archive duration for threads in the channel.
         * @param value The auto-archive duration in minutes.
         */
        set defaultAutoArchiveDuration(value: number | undefined);
        /**
         * Gets the default reaction emoji for messages in the channel.
         * @returns The default reaction emoji object.
         */
        get defaultReactionEmoji(): any | undefined;
        /**
         * Sets the default reaction emoji for messages in the channel.
         * @param value The default reaction emoji object.
         */
        set defaultReactionEmoji(value: any | undefined);
        /**
         * Gets the available tags for the channel.
         * @returns An array of tags.
         */
        get availableTags(): any[] | undefined;
        /**
         * Sets the available tags for the channel.
         * @param value An array of tags.
         */
        set availableTags(value: any[] | undefined);
        /**
         * Gets the default sort order for forum posts.
         * @returns The default sort order.
         */
        get defaultSortOrder(): number | undefined;
        /**
         * Sets the default sort order for forum posts.
         * @param value The default sort order.
         */
        set defaultSortOrder(value: number | undefined);
        /**
         * Gets the default forum layout for the channel.
         * @returns The default forum layout.
         */
        get defaultForumLayout(): number | undefined;
        /**
         * Sets the default forum layout for the channel.
         * @param value The default forum layout.
         */
        set defaultForumLayout(value: number | undefined);
        /**
         * Gets the default rate limit for threads in the channel.
         * @returns The rate limit in seconds.
         */
        get defaultThreadRateLimitPerUser(): number | undefined;
        /**
         * Sets the default rate limit for threads in the channel.
         * @param value The rate limit in seconds.
         */
        set defaultThreadRateLimitPerUser(value: number | undefined);
        /**
         * Converts the payload to a JSON-serializable object.
         * @returns A JSON-serializable representation of the payload.
         */
        toJSON(): any;
    }
}
declare module "structures/user" {
    import { Client } from "client";
    /**
     * Represents a Discord user.
     */
    export class User {
        private _client;
        /**
         * The user's unique ID.
         * @type {string}
         */
        id: string;
        /**
         * The user's username, which is not unique across the platform.
         * @type {string}
         */
        username: string;
        /**
         * The user's Discord tag, also known as the discriminator (e.g., #1234).
         * @type {string}
         */
        discriminator: string;
        /**
         * The user's global display name, if set. For bots, this is the application name.
         * @type {?string}
         */
        globalName?: string;
        /**
         * The user's avatar hash, if set.
         * @type {?string}
         */
        avatar?: string;
        /**
         * Whether the user belongs to an OAuth2 application (i.e., if the user is a bot).
         * @type {?boolean}
         */
        bot?: boolean;
        /**
         * Whether the user is an official Discord system user (part of the urgent message system).
         * @type {?boolean}
         */
        system?: boolean;
        /**
         * Whether the user has two-factor authentication enabled.
         * @type {?boolean}
         */
        mfaEnabled?: boolean;
        /**
         * The user's banner hash, if set.
         * @type {?string}
         */
        banner?: string;
        /**
         * The user's banner color, represented as an integer value of the hexadecimal color code.
         * @type {?number}
         */
        accentColor?: number;
        /**
         * The user's chosen language option (e.g., "en-US").
         * @type {?string}
         */
        locale?: string;
        /**
         * Whether the email on the user's account has been verified.
         * @type {?boolean}
         */
        verified?: boolean;
        /**
         * The user's email, if available.
         * @type {?string}
         */
        email?: string;
        /**
         * The flags on the user's account, represented as an integer bitfield.
         * @type {?number}
         */
        flags?: number;
        /**
         * The type of Nitro subscription on the user's account.
         * @type {?number}
         */
        premiumType?: number;
        /**
         * The public flags on the user's account, represented as an integer bitfield.
         * @type {?number}
         */
        publicFlags?: number;
        /**
         * Data for the user's avatar decoration, if available.
         * @type {?any}
         */
        avatarDecorationData?: any;
        /**
         * Constructs a new User object.
         * @param {Client} client - The client instance managing this user.
         * @param {any} data - The raw data from the API representing the user.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the user's properties with the provided data.
         * @param {Object} data - The data object containing user information.
         */
        private _update;
    }
}
declare module "structures/member" {
    import { Client } from "client";
    import { User } from "structures/user";
    /**
     * Represents a member of the guild.
     */
    export class Member {
        private _client;
        /**
         * The user object that this guild member represents.
         * @type {User}
         */
        user?: User;
        /**
         * The user's guild nickname.
         * @type {string | undefined}
         */
        nick?: string;
        /**
         * The hash of the member's guild avatar.
         * @type {string | undefined}
         */
        avatar?: string;
        /**
         * An array of role IDs assigned to the member.
         * @type {string[]}
         */
        roles: string[];
        /**
         * The timestamp when the user joined the guild (ISO8601 format).
         * @type {string}
         */
        joinedAt: string;
        /**
         * The timestamp when the user started boosting the guild, or `undefined` if not boosting.
         * @type {string | undefined}
         */
        premiumSince?: string;
        /**
         * Whether the user is deafened in voice channels.
         * @type {boolean}
         */
        deaf: boolean;
        /**
         * Whether the user is muted in voice channels.
         * @type {boolean}
         */
        mute: boolean;
        /**
         * Guild member flags represented as a bit set.
         * @type {number}
         */
        flags: number;
        /**
         * Whether the user has not yet passed the guild's Membership Screening requirements.
         * @type {boolean | undefined}
         */
        pending?: boolean;
        /**
         * Total permissions of the member in the channel, including overwrites.
         * @type {string | undefined}
         */
        permissions?: string;
        /**
         * When the user's timeout will expire and the user will be able to communicate in the guild again, or `null` if the user is not timed out.
         * @type {string | null | undefined}
         */
        communicationDisabledUntil?: string | null;
        /**
         * Data for the member's guild avatar decoration, or `undefined` if no decoration is set.
         * @type {any | undefined}
         */
        avatarDecorationData?: any;
        /**
       * Constructs a newMember object.
       * @param {Client} client - The client instance managing this member.
       * @param {any} data - The raw data from the API representing the member.
       */
        constructor(client: Client, data: any);
        /**
         * Updates the member properties with the provided data.
         * @param {Object} data - The data object containing member information.
         */
        private _update;
        /**
         * Kicks a user from the guild with the specified reason.
         *
         * This method performs a kick operation, which removes a user from the guild. It sends a request to the Discord API to update the guild member's status and then removes the member from the local cache.
         *
         * @param reason The reason for kicking the user. This reason will be included in the audit log for the kick operation, which helps to track why the user was kicked. The reason should be a string and can be up to 512 characters long.
         *
         * @throws {Error} Throws an error if the user's ID is not available. This occurs when `this.user?.id` is `undefined`, which means the user cannot be identified, and the kick operation cannot proceed.
         *
         * @returns {Promise<void>} A promise that resolves when the kick operation is completed. The `request` method sends the API request to Discord, and the `remove` method updates the local cache of members.
         */
        kick(reason: string): Promise<void>;
        /**
         * Bans a user with the given reason and options.
         * @param reason The reason for banning the user.
         * @param options Optional parameters for the ban.
         * @param options.delete_message_seconds The number of seconds to delete messages for (0-604800, where 0 is no deletion).
         */
        ban(reason: string, options?: {
            delete_message_days?: number;
            delete_message_seconds?: number;
        }): Promise<any>;
        /**
         * Unbans a user from the guild with the specified reason.
         *
         * This method performs an unban operation, which removes a ban from a user in the guild. It sends a request to the Discord API to lift the ban and includes a reason for the action in the audit log.
         *
         * @param userId The ID of the user to be unbanned. This ID uniquely identifies the user within the guild.
         * @param reason The reason for unbanning the user. This reason will be included in the audit log for the unban operation, which helps to track why the user was unbanned. The reason should be a string and can be up to 512 characters long.
         *
         * @throws {Error} Throws an error if the `userId` is not provided or invalid. This means the user cannot be identified, and the unban operation cannot proceed.
         *
         * @returns {Promise<void>} A promise that resolves when the unban operation is completed. The `request` method sends the API request to Discord.
         */
        unban(userId: string, reason: string): Promise<void>;
        /**
         * Edits the properties of the guild member with the specified options.
         *
         * This method sends a request to the Discord API to update the member's attributes
         * identified by their user ID within the guild. The updated member data will be reflected
         * in the current instance after the operation is successful.
         *
         * @param {Object} options - The options for editing the member.
         * @param {string} [options.nick] - The nickname to set for the user.
         * @param {string[]} [options.roles] - An array of role IDs to assign to the member.
         * @param {boolean} [options.mute] - Whether to mute the user in voice channels.
         * @param {boolean} [options.deaf] - Whether to deafen the user in voice channels.
         * @param {string} [options.channel_id] - The ID of the channel to move the user to if they are connected to voice.
         * @param {string | null} [options.communication_disabled_until] - The timestamp until the user is muted, or null to remove the timeout.
         * @param {number} [options.flags] - Guild member flags to set for the member.
         *
         * @returns {Promise<Member>} A promise that resolves to the updated Member instance.
         *
         * @throws {Error} If the user's ID is not available or if the API request fails.
         */
        edit(options: {
            nick?: string;
            roles?: string[];
            mute?: boolean;
            deaf?: boolean;
            channel_id?: string;
            communication_disabled_until?: string | null;
            flags?: number;
        }): Promise<Member>;
        /**
         * Adds a role to a member in the guild.
         *
         * @param roleId - The ID of the role to be added.
         * @throws Error - If the guildID or memberID is missing.
         * @throws Error - If an error occurs during the API request.
         */
        addRole(roleId: string): Promise<void>;
        /**
         * Removes a role from a member in the guild.
         *
         * This method sends a request to the Discord API to remove the specified role from the member.
         * It ensures that the member's ID is available before proceeding with the request.
         *
         * @param roleId - The ID of the role to be removed.
         * @throws Error - If the member's ID is missing.
         * @throws Error - If an error occurs during the API request.
         */
        removeRole(roleId: string): Promise<void>;
    }
}
declare module "structures/attachment" {
    import { Client } from "client";
    /**
     * Represents an attachment in a message, such as a file, image, or media.
     */
    export class Attachment {
        private _client;
        /**
         * The unique identifier for the attachment.
         * @type {string}
         */
        id: string;
        /**
         * The name of the file attached.
         * @type {string}
         */
        filename: string;
        /**
         * The title of the file (optional).
         * @type {string | undefined}
         */
        title?: string;
        /**
         * A description for the file (max 1024 characters) (optional).
         * @type {string | undefined}
         */
        description?: string;
        /**
         * The media type of the attachment, usually in MIME format (optional).
         * @type {string | undefined}
         */
        content_type?: string;
        /**
         * The size of the file in bytes.
         * @type {number}
         */
        size: number;
        /**
         * The URL where the attachment can be accessed.
         * @type {string}
         */
        url: string;
        /**
         * A proxied URL for the attachment.
         * @type {string}
         */
        proxy_url: string;
        /**
         * The height of the file, if it's an image (optional).
         * @type {number | undefined}
         */
        height?: number;
        /**
         * The width of the file, if it's an image (optional).
         * @type {number | undefined}
         */
        width?: number;
        /**
         * Whether this attachment is ephemeral, meaning it will be deleted after a certain period of time (optional).
         * @type {boolean | undefined}
         */
        ephemeral?: boolean;
        /**
         * The duration of the audio file in seconds, typically used for voice messages (optional).
         * @type {number | undefined}
         */
        duration_secs?: number;
        /**
         * A base64 encoded byte array representing the sampled waveform of an audio file (optional).
         * This is used for visualizing voice messages.
         * @type {string | undefined}
         */
        waveform?: string;
        /**
         * The attachment flags, combined as a bitfield (optional).
         * @type {number | undefined}
         */
        flags?: number;
        /**
         * Constructs a new Attachments object.
         * @param {Client} client - The client instance managing this attachment.
         * @param {any} data - The raw data from the API representing the attachment.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the attachment properties with the provided data.
         * @param {Object} data - The data object containing attachment information.
         */
        private _update;
    }
}
declare module "structures/embed" {
    import { Client } from "client";
    /**
     * Represents an embed object, typically used in rich media messages.
     * An embed is a message containing rich media, such as images, links, and videos.
     */
    export class Embed {
        private _client;
        /**
         * The title of the embed.
         * @type {string | undefined}
         */
        title?: string;
        /**
         * The type of the embed. Default is "rich", but other types include "image", "video", etc.
         * @type {string | undefined}
         */
        type?: string;
        /**
         * The description text of the embed.
         * @type {string | undefined}
         */
        description?: string;
        /**
         * The URL associated with the embed.
         * @type {string | undefined}
         */
        url?: string;
        /**
         * The timestamp of the embed in ISO8601 format.
         * @type {string | undefined}
         */
        timestamp?: string;
        /**
         * The color code of the embed, usually represented as an integer.
         * @type {number | undefined}
         */
        color?: number;
        /**
         * The footer section of the embed, typically containing text and an optional icon.
         * @type {EmbedFooter | undefined}
         */
        footer?: EmbedFooter;
        /**
         * The image section of the embed, typically containing a URL to an image.
         * @type {EmbedImage | undefined}
         */
        image?: EmbedImage;
        /**
         * The thumbnail section of the embed, typically a small image preview.
         * @type {EmbedThumbnail | undefined}
         */
        thumbnail?: EmbedThumbnail;
        /**
         * The video section of the embed, containing video information (optional).
         * @type {EmbedVideo | undefined}
         */
        video?: EmbedVideo;
        /**
         * The provider of the embed, which includes the name and URL of the service that generated the embed (optional).
         * @type {EmbedProvider | undefined}
         */
        provider?: EmbedProvider;
        /**
         * The author section of the embed, typically containing the author's name, URL, and an optional icon.
         * @type {EmbedAuthor | undefined}
         */
        author?: EmbedAuthor;
        /**
         * An array of field objects, which add custom structured data to the embed. Maximum of 25 fields.
         * @type {EmbedField[] | undefined}
         */
        fields?: EmbedField[];
        /**
         * Constructs a new Embed object.
         * @param {Client} client - The client instance managing this embed.
         * @param {any} data - The raw data from the API representing the embed.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the embed properties with the provided data.
         * @param {Object} data - The data object containing embed information.
         */
        private _update;
    }
    /**
     * Represents the footer section of an embed.
     * The footer typically contains small, supplementary text and optionally an icon.
     */
    export class EmbedFooter {
        /**
         * The footer text.
         * @type {string}
         */
        text: string;
        /**
         * The URL of the footer icon (optional).
         * @type {string | undefined}
         */
        icon_url?: string;
        /**
         * A proxied URL of the footer icon (optional).
         * @type {string | undefined}
         */
        proxy_icon_url?: string;
        /**
         * Constructs a new EmbedFooter object.
         * @param {Object} data - The data representing the footer.
         */
        constructor(data: any);
    }
    /**
     * Represents the image section of an embed.
     * Contains a URL to an image and optional dimensions.
     */
    export class EmbedImage {
        /**
         * The URL of the image.
         * @type {string}
         */
        url: string;
        /**
         * A proxied URL of the image (optional).
         * @type {string | undefined}
         */
        proxy_url?: string;
        /**
         * The height of the image in pixels (optional).
         * @type {number | undefined}
         */
        height?: number;
        /**
         * The width of the image in pixels (optional).
         * @type {number | undefined}
         */
        width?: number;
        /**
         * Constructs a new EmbedImage object.
         * @param {Object} data - The data representing the image.
         */
        constructor(data: any);
    }
    /**
     * Represents the thumbnail section of an embed.
     * Typically a small image preview at the top right of the embed.
     */
    export class EmbedThumbnail {
        /**
         * The URL of the thumbnail image.
         * @type {string}
         */
        url: string;
        /**
         * A proxied URL of the thumbnail image (optional).
         * @type {string | undefined}
         */
        proxy_url?: string;
        /**
         * The height of the thumbnail image in pixels (optional).
         * @type {number | undefined}
         */
        height?: number;
        /**
         * The width of the thumbnail image in pixels (optional).
         * @type {number | undefined}
         */
        width?: number;
        /**
         * Constructs a new EmbedThumbnail object.
         * @param {Object} data - The data representing the thumbnail.
         */
        constructor(data: any);
    }
    /**
     * Represents the video section of an embed.
     * Contains a URL to a video and optional dimensions.
     */
    export class EmbedVideo {
        /**
         * The URL of the video (optional).
         * @type {string | undefined}
         */
        url?: string;
        /**
         * A proxied URL of the video (optional).
         * @type {string | undefined}
         */
        proxy_url?: string;
        /**
         * The height of the video in pixels (optional).
         * @type {number | undefined}
         */
        height?: number;
        /**
         * The width of the video in pixels (optional).
         * @type {number | undefined}
         */
        width?: number;
        /**
         * Constructs a new EmbedVideo object.
         * @param {Object} data - The data representing the video.
         */
        constructor(data: any);
    }
    /**
     * Represents the provider section of an embed.
     * Typically contains the name and URL of the service that generated the embed.
     */
    export class EmbedProvider {
        /**
         * The name of the provider (optional).
         * @type {string | undefined}
         */
        name?: string;
        /**
         * The URL of the provider (optional).
         * @type {string | undefined}
         */
        url?: string;
        /**
         * Constructs a new EmbedProvider object.
         * @param {Object} data - The data representing the provider.
         */
        constructor(data: any);
    }
    /**
     * Represents the author section of an embed.
     * Contains the author's name, URL, and an optional icon.
     */
    export class EmbedAuthor {
        /**
         * The name of the author.
         * @type {string}
         */
        name: string;
        /**
         * The URL of the author (optional).
         * @type {string | undefined}
         */
        url?: string;
        /**
         * The URL of the author's icon (optional).
         * @type {string | undefined}
         */
        icon_url?: string;
        /**
         * A proxied URL of the author's icon (optional).
         * @type {string | undefined}
         */
        proxy_icon_url?: string;
        /**
         * Constructs a new EmbedAuthor object.
         * @param {Object} data - The data representing the author.
         */
        constructor(data: any);
    }
    /**
     * Represents a field in an embed.
     * Each field contains a name, value, and an optional inline setting.
     */
    export class EmbedField {
        /**
         * The name of the field.
         * @type {string}
         */
        name: string;
        /**
         * The value of the field.
         * @type {string}
         */
        value: string;
        /**
         * Whether the field should be displayed inline.
         * @type {boolean | undefined}
         */
        inline?: boolean;
        /**
         * Constructs a new EmbedField object.
         * @param {Object} data - The data representing the field.
         */
        constructor(data: any);
    }
}
declare module "structures/reaction" {
    import { Client } from "client";
    import { Member } from "structures/member";
    /**
     * Represents a reaction to a message in a guild or channel.
     */
    export class Reaction {
        private _client;
        /**
         * The ID of the user who reacted.
         * @type {string}
         */
        userID: string;
        /**
         * The ID of the channel where the reaction occurred.
         * @type {string}
         */
        channelID: string;
        /**
         * The ID of the message that was reacted to.
         * @type {string}
         */
        messageID: string;
        /**
         * The ID of the guild where the reaction occurred, if applicable.
         * @type {?string}
         */
        guildID?: string;
        /**
         * The member who reacted, if this reaction occurred in a guild.
         * @type {?Member}
         */
        member?: Member;
        /**
         * The emoji used for the reaction.
         * @type {any}
         */
        emoji: any;
        /**
         * The ID of the user who authored the message that was reacted to.
         * @type {?string}
         */
        messageAuthorID?: string;
        /**
         * Whether this is a "super-reaction" (a special burst reaction).
         * @type {boolean}
         */
        burst: boolean;
        /**
         * Colors used for the super-reaction animation, in hexadecimal format (e.g., "#rrggbb").
         * @type {?string[]}
         */
        burstColors?: string[];
        /**
         * The type of the reaction, typically represented as an integer.
         * @type {number}
         */
        type: number;
        /**
         * Constructs a new Reaction object.
         * @param {Client} client - The client instance managing this reaction.
         * @param {any} data - The raw data from the API representing the reaction.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the properties of the reaction with the provided data.
         * @param {Object} data - The data object containing reaction information.
         */
        private _update;
    }
}
declare module "structures/rolePayload" {
    /**
     * Represents the payload for creating or updating a role in a guild.
     * This class encapsulates all the parameters needed to define a role.
     */
    export class RolePayload {
        private _name?;
        private _permissions?;
        private _color?;
        private _hoist?;
        private _icon?;
        private _unicodeEmoji?;
        private _mentionable?;
        /**
         * Creates a new `RolePayload` instance.
         * @param data Optional initial data to set in the payload.
         */
        constructor(data?: {
            name?: string;
            permissions?: string;
            color?: number;
            hoist?: boolean;
            icon?: string | null;
            unicode_emoji?: string | null;
            mentionable?: boolean;
        });
        /**
         * Gets the name of the role.
         * @returns The name of the role.
         */
        get name(): string | undefined;
        /**
         * Sets the name of the role.
         * @param value The name of the role (max 100 characters).
         * @throws Error if the name exceeds 100 characters.
         */
        set name(value: string | undefined);
        /**
         * Gets the permissions for the role.
         * @returns The permissions as a string.
         */
        get permissions(): string | undefined;
        /**
         * Sets the permissions for the role.
         * @param value The permissions as a bitwise string.
         */
        set permissions(value: string | undefined);
        /**
         * Gets the color of the role.
         * @returns The color as an integer.
         */
        get color(): number | undefined;
        /**
         * Sets the color of the role.
         * @param value The color as an integer (RGB value).
         */
        set color(value: number | undefined);
        /**
         * Gets the hoist status of the role.
         * @returns True if the role should be hoisted.
         */
        get hoist(): boolean | undefined;
        /**
         * Sets the hoist status of the role.
         * @param value True if the role should be displayed separately in the sidebar.
         */
        set hoist(value: boolean | undefined);
        /**
         * Gets the icon for the role.
         * @returns The icon as a string, or null if not set.
         */
        get icon(): string | null | undefined;
        /**
         * Sets the icon for the role.
         * @param value The icon as a string, or null to remove it.
         */
        set icon(value: string | null | undefined);
        /**
         * Gets the unicode emoji for the role.
         * @returns The unicode emoji as a string, or null if not set.
         */
        get unicodeEmoji(): string | null | undefined;
        /**
         * Sets the unicode emoji for the role.
         * @param value The unicode emoji as a string, or null to remove it.
         */
        set unicodeEmoji(value: string | null | undefined);
        /**
         * Gets the mentionable status of the role.
         * @returns True if the role is mentionable.
         */
        get mentionable(): boolean | undefined;
        /**
         * Sets the mentionable status of the role.
         * @param value True if the role should be mentionable.
         */
        set mentionable(value: boolean | undefined);
        /**
         * Converts the payload to a JSON-serializable object.
         * @returns A JSON-serializable representation of the payload.
         */
        toJSON(): any;
    }
}
declare module "structures/role" {
    import { Client } from "client";
    import { RolePayload } from "structures/rolePayload";
    /**
     * Represents a role of the guild.
     */
    export class Role {
        private _client;
        /**
         * The unique identifier for the role.
         * @type {string}
         */
        id: string;
        /**
         * The name of the role.
         * @type {string}
         */
        name: string;
        /**
         * The color of the role represented as an integer.
         * @type {number}
         */
        color: number;
        /**
         * Whether this role is pinned in the user listing.
         * @type {boolean}
         */
        hoist: boolean;
        /**
         * The hash of the role icon, or `undefined` if no icon is set.
         * @type {string | undefined}
         */
        icon?: string;
        /**
         * The unicode emoji associated with the role, or `undefined` if no emoji is set.
         * @type {string | undefined}
         */
        unicodeEmoji?: string;
        /**
         * The position of the role in the role hierarchy.
         * Roles with the same position are sorted by ID.
         * @type {number}
         */
        position: number;
        /**
         * The permission bit set for this role.
         * @type {string}
         */
        permissions: string;
        /**
         * Whether this role is managed by an integration.
         * @type {boolean}
         */
        managed: boolean;
        /**
         * Whether this role is mentionable.
         * @type {boolean}
         */
        mentionable: boolean;
        /**
         * The tags associated with this role, or `undefined` if no tags are set.
         * @type {any | undefined}
         */
        tags?: any;
        /**
         * The role flags combined as a bitfield.
         * @type {number}
         */
        flags: number;
        /**
       * Constructs a new Role object.
       * @param {Client} client - The client instance managing this role.
       * @param {any} data - The raw data from the API representing the role.
       */
        constructor(client: Client, data: any);
        /**
         * Updates the role properties with the provided data.
         * @param {Object} data - The data object containing role information.
         */
        private _update;
        /**
         * Creates a new role in the guild with the specified options.
         *
         * This function accepts either a `RolePayload` instance or a plain options object to create and send a role creation request.
         * It validates the options, prepares the payload, and then sends the request to create the role.
         * Finally, it returns a promise that resolves to the newly created role's data.
         *
         * @param {RolePayload | object} options - The role creation options, which can be an instance of `RolePayload` or a plain object with role data.
         * @returns {Promise<Role>} A promise that resolves to the newly created Role instance.
         *
         * @throws {Error} If there is an issue with the provided options or the API request.
         */
        create(options: RolePayload | object): Promise<Role>;
        /**
         * Edits the properties of the role with the specified options.
         *
         * This method sends a request to the Discord API to update the role's attributes
         * identified by its ID within the guild. The updated role data will be reflected
         * in the current instance after the operation is successful.
         *
         * @param {RolePayload | object} options - The options for editing the role, which can be an
         *                                         instance of `RolePayload` or a plain object with role data.
         * @returns {Promise<Role>} A promise that resolves to the updated Role instance.
         *
         * @throws {Error} If there is an issue with the provided options or the API request fails,
         *                 such as insufficient permissions or invalid data.
         */
        edit(options: RolePayload | object): Promise<Role>;
        /**
         * Deletes the specified role from the guild.
         *
         * This method sends a request to the Discord API to permanently delete a role
         * identified by its ID within the guild. Once deleted, the role cannot be recovered,
         * and users assigned to this role will lose all permissions associated with it.
         *
         * @returns {Promise<void>} A promise that resolves when the role has been successfully deleted.
         *
         * @throws {Error} Throws an error if the deletion request fails. This may occur due to insufficient permissions,
         *                 if the role does not exist, or if the guild is not accessible.
         */
        delete(): Promise<void>;
    }
}
declare module "structures/messagePayload" {
    /**
     * Represents the payload for creating or updating a message.
     * This class encapsulates all the parameters needed to send a message in Discord.
     */
    export class MessagePayload {
        private _content?;
        private _nonce?;
        private _tts?;
        private _embeds?;
        private _allowedMentions?;
        private _messageReference?;
        private _components?;
        private _stickerIDs?;
        private _attachments?;
        private _flags?;
        private _enforceNonce?;
        private _poll?;
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
        });
        /**
         * Gets the content of the message.
         * @returns The message content.
         */
        get content(): string | undefined;
        /**
         * Sets the content of the message.
         * @param value The message content. Should be up to 2000 characters.
         * @throws Error if the content exceeds 2000 characters.
         */
        set content(value: string | undefined);
        /**
         * Gets the nonce for the message.
         * @returns The nonce value.
         */
        get nonce(): string | number | undefined;
        /**
         * Sets the nonce for the message.
         * @param value The nonce value. Should be up to 25 characters if string.
         * @throws Error if the nonce exceeds 25 characters.
         */
        set nonce(value: string | number | undefined);
        /**
         * Gets the TTS flag for the message.
         * @returns True if the message is a TTS message.
         */
        get tts(): boolean | undefined;
        /**
         * Sets the TTS flag for the message.
         * @param value True if the message should be sent as TTS.
         */
        set tts(value: boolean | undefined);
        /**
         * Gets the embeds for the message.
         * @returns An array of embed objects.
         */
        get embeds(): any[] | undefined;
        /**
         * Sets the embeds for the message.
         * @param value An array of embed objects. Up to 10 embeds allowed.
         * @throws Error if the array exceeds 10 embeds.
         */
        set embeds(value: any[] | undefined);
        /**
         * Gets the allowed mentions for the message.
         * @returns The allowed mentions object.
         */
        get allowedMentions(): {
            everyone?: boolean;
            repliedUser?: boolean;
            roles?: boolean | string[];
            users?: boolean | string[];
        } | undefined;
        /**
         * Sets the allowed mentions for the message.
         * @param value The allowed mentions object.
         */
        set allowedMentions(value: {
            everyone?: boolean;
            repliedUser?: boolean;
            roles?: boolean | string[];
            users?: boolean | string[];
        } | undefined);
        /**
         * Gets the message reference object.
         * @returns The message reference object.
         */
        get messageReference(): {
            messageID: string;
            channelID?: string;
            guildID?: string;
            failIfNotExists?: boolean;
        } | undefined;
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
        } | undefined);
        /**
         * Gets the components for the message.
         * @returns An array of message component objects.
         */
        get components(): any[] | undefined;
        /**
         * Sets the components for the message.
         * @param value An array of message component objects.
         */
        set components(value: any[] | undefined);
        /**
         * Gets the sticker IDs for the message.
         * @returns An array of sticker IDs.
         */
        get stickerIDs(): string[] | undefined;
        /**
         * Sets the sticker IDs for the message.
         * @param value An array of sticker IDs. Up to 3 stickers allowed.
         * @throws Error if the array exceeds 3 stickers.
         */
        set stickerIDs(value: string[] | undefined);
        /**
         * Gets the attachments for the message.
         * @returns An array of attachment objects.
         */
        get attachments(): {
            id: number;
            filename: string;
            description?: string;
        }[] | undefined;
        /**
         * Sets the attachments for the message.
         * @param value An array of attachment objects.
         */
        set attachments(value: {
            id: number;
            filename: string;
            description?: string;
        }[] | undefined);
        /**
         * Gets the flags for the message.
         * @returns The message flags.
         */
        get flags(): number | undefined;
        /**
         * Sets the flags for the message.
         * @param value The message flags as a bitfield.
         */
        set flags(value: number | undefined);
        /**
         * Gets the enforce nonce flag.
         * @returns True if nonce uniqueness should be enforced.
         */
        get enforceNonce(): boolean | undefined;
        /**
         * Sets the enforce nonce flag.
         * @param value True if nonce uniqueness should be enforced.
         */
        set enforceNonce(value: boolean | undefined);
        /**
         * Gets the poll object for the message.
         * @returns The poll object.
         */
        get poll(): any | undefined;
        /**
         * Sets the poll object for the message.
         * @param value The poll object.
         */
        set poll(value: any | undefined);
        resolveFiles(): Promise<{
            content?: string;
            nonce?: string | number;
            tts?: boolean;
            embeds?: any[];
            allowed_mentions?: any;
            message_reference?: any;
            components?: any[];
            sticker_ids?: string[];
            attachments?: any[];
            flags?: number;
            enforce_nonce?: boolean;
            poll?: any;
            files: any[];
        }>;
        /**
         * Converts the payload to a JSON-serializable object.
         * @returns A JSON-serializable representation of the payload.
         */
        toJSON(): any;
    }
}
declare module "structures/interaction" {
    import { Client } from "client";
    import { Guild } from "structures/guild";
    import { GuildChannel } from "structures/guildChannel";
    import { Member } from "structures/member";
    import { Message } from "structures/message";
    import { MessagePayload } from "structures/messagePayload";
    import { User } from "structures/user";
    /**
     * Represents a Discord interaction.
     */
    export class Interaction {
        private _client;
        /**
         * The unique ID of the interaction.
         * @type {string}
         */
        id: string;
        /**
         * The ID of the application this interaction is for.
         * @type {string}
         */
        applicationId: string;
        /**
         * The type of interaction.
         * @type {number}
         */
        type: number;
        /**
         * The interaction data payload, if any.
         * @type {?any}
         */
        data?: any;
        /**
         * The partial guild object from which the interaction was sent, if applicable.
         * @type {?Guild}
         */
        guild?: Guild;
        /**
         * The ID of the guild from which the interaction was sent, if applicable.
         * @type {?string}
         */
        guildId?: string;
        /**
         * The partial channel object from which the interaction was sent, if applicable.
         * @type {?GuildChannel}
         */
        channel?: GuildChannel;
        /**
         * The ID of the channel from which the interaction was sent, if applicable.
         * @type {?string}
         */
        channelId?: string;
        /**
         * The guild member object for the invoking user, including permissions, if applicable.
         * @type {?Member}
         */
        member?: Member;
        /**
         * The user object for the invoking user, if invoked in a DM.
         * @type {?User}
         */
        user?: User;
        /**
         * The continuation token for responding to the interaction.
         * @type {string}
         */
        token: string;
        /**
         * The read-only version property, always set to 1.
         * @type {number}
         */
        version: number;
        /**
         * The message object for components, if applicable.
         * @type {?Message}
         */
        message?: Message;
        /**
         * The bitwise set of permissions the app has in the source location of the interaction.
         * @type {?string}
         */
        appPermissions?: string;
        /**
         * The selected language of the invoking user, if available.
         * @type {?string}
         */
        locale?: string;
        /**
         * The preferred locale of the guild, if invoked in a guild.
         * @type {?string}
         */
        guildLocale?: string;
        /**
         * For monetized apps, any entitlements for the invoking user, representing access to premium SKUs.
         * @type {?any[]}
         */
        entitlements?: any[];
        /**
         * A mapping of installation contexts that the interaction was authorized for, related to user or guild IDs.
         * @type {?any}
         */
        authorizingIntegrationOwners?: any;
        /**
         * The context where the interaction was triggered from, if applicable.
         * @type {?number}
         */
        context?: number;
        /**
         * Constructs a new Interaction object.
         * @param {Client} client - The client instance managing this interaction.
         * @param {any} data - The raw data from the API representing the interaction.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the interaction's properties with the provided data.
         * @param {Object} data - The data object containing interaction information.
         */
        private _update;
        /**
          * Sends a reply to an interaction with the specified options.
          * @param {MessagePayload | object} options - The reply options, which can be an instance
          * of `MessagePayload` or a plain object with message data.
          * @returns A promise that resolves with the result of the interaction reply.
          *
          * @throws Error If there is an issue with processing the interaction or sending the reply.
          */
        reply(options: MessagePayload | object): Promise<any>;
    }
}
declare module "structures/message" {
    import { Client } from "client";
    import { User } from "structures/user";
    import { Attachment } from "structures/attachment";
    import { Embed } from "structures/embed";
    import { Reaction } from "structures/reaction";
    import { Role } from "structures/role";
    import { GuildChannel } from "structures/guildChannel";
    import { Interaction } from "structures/interaction";
    /**
     * Represents a message in a channel.
     */
    export class Message {
        private _client;
        /**
         * The unique ID of the message.
         * @type {string}
         */
        id: string;
        /**
         * The unique ID of the channel where the message was sent.
         * @type {string}
         */
        channelID: string;
        /**
         * The channel object where the message was sent.
         * @type {GuildChannel | null}
         */
        channel: GuildChannel | null;
        /**
         * The author of the message (not guaranteed to be a valid user).
         * @type {User | null}
         */
        author: User | null;
        /**
         * The content of the message.
         * @type {string}
         */
        content: string;
        /**
         * The timestamp of when the message was sent (ISO8601 format).
         * @type {string}
         */
        timestamp: string;
        /**
         * The timestamp of when the message was last edited, or `null` if never edited.
         * @type {string | null}
         */
        editedTimestamp: string | null;
        /**
         * Whether the message was text-to-speech.
         * @type {boolean}
         */
        tts: boolean;
        /**
         * Whether the message mentioned everyone.
         * @type {boolean}
         */
        mentionEveryone: boolean;
        /**
         * Users specifically mentioned in the message.
         * @type {User[]}
         */
        mentions: User[];
        /**
         * Roles specifically mentioned in the message.
         * @type {Role[]}
         */
        mentionRoles: Role[];
        /**
         * Channels specifically mentioned in the message.
         * @type {Channel[] | null}
         */
        mentionChannels: GuildChannel[] | null;
        /**
         * Any attached files.
         * @type {Attachment[]}
         */
        attachments: Attachment[];
        /**
         * Any embedded content.
         * @type {Embed[]}
         */
        embeds: Embed[];
        /**
         * Reactions to the message.
         * @type {Reaction[] | null}
         */
        reactions: Reaction[] | null;
        /**
         * A nonce value to validate message sending.
         * @type {string | number | null}
         */
        nonce: string | number | null;
        /**
         * Whether the message is pinned in the channel.
         * @type {boolean}
         */
        pinned: boolean;
        /**
         * The ID of the webhook that sent the message, if applicable.
         * @type {string | null}
         */
        webhookID: string | null;
        /**
         * The type of the message.
         * @type {number}
         */
        type: number;
        /**
         * Activity related to the message, such as Rich Presence.
         * @type {any | null}
         */
        activity: any | null;
        /**
         * Application data associated with the message.
         * @type {any | null}
         */
        application: any | null;
        /**
         * The application ID if the message is associated with an application.
         * @type {string | null}
         */
        applicationID: string | null;
        /**
         * Bitfield flags for the message.
         * @type {number | null}
         */
        flags: number | null;
        /**
         * Data showing the source of a crosspost, channel follow add, pin, or reply message.
         * @type {any}
         */
        messageReference: any;
        /**
         * The message object associated with the message reference, if any.
         * @type {Message | null}
         */
        referencedMessage: Message | null;
        /**
         * Metadata about any interaction associated with the message.
         * @type {any}
         */
        interactionMetadata: any;
        /**
         * Deprecated interaction object (use interactionMetadata instead).
         * @type {Interaction | null}
         * @deprecated
         */
        interaction: Interaction | null;
        /**
         * The thread started by this message, if applicable.
         * @type {GuildChannel | null}
         */
        thread: GuildChannel | null;
        /**
         * Interactive components (buttons, select menus, etc.) attached to the message.
         * @type {any[]}
         */
        components: any[];
        /**
         * Sticker items included with the message.
         * @type {any[]}
         */
        stickerItems: any[];
        /**
         * Deprecated sticker field. Use `stickerItems` instead.
         * @type {any[]}
         * @deprecated
         */
        stickers: any[];
        /**
         * Represents the approximate position of the message in a thread.
         * @type {number | null}
         */
        position: number | null;
        /**
         * Role subscription data related to the message, if applicable.
         * @type {any | null}
         */
        roleSubscriptionData: any | null;
        /**
         * Data for users, members, channels, and roles in the message's auto-populated select menus.
         * @type {any | null}
         */
        resolved: any | null;
        /**
         * Poll data associated with the message, if applicable.
         * @type {any | null}
         */
        poll: any | null;
        /**
         * Call data associated with the message, if applicable.
         * @type {any | null}
         */
        call: any | null;
        /**
         * Constructs a new Message object.
         * @param {Client} client - The client instance managing this message.
         * @param {any} data - The raw data representing the message.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the message properties with the provided data.
         * @param {any} data - The data object containing message information.
         */
        private _update;
        /**
         * Edits the properties of the message with the specified options.
         *
         * This method sends a request to the Discord API to update the message's attributes
         * identified by its ID within the specified channel. The updated message data will be reflected
         * in the current instance after the operation is successful.
         *
         * @param {object} options - The options for editing the message, which can include:
         *                           - `content`: The new content of the message (up to 2000 characters).
         *                           - `embeds`: An array of embed objects (up to 10 rich embeds).
         *                           - `flags`: Integer to edit the flags of a message (currently only SUPPRESS_EMBEDS).
         *                           - `allowed_mentions`: An object specifying allowed mentions.
         *                           - `components`: An array of message components (buttons, select menus, etc.).
         *                           - `attachments`: An array of attachment objects for new files.
         * @returns {Promise<Message>} A promise that resolves to the updated Message instance.
         *
         * @throws {Error} If there is an issue with the provided options or the API request fails,
         *                 such as insufficient permissions or invalid data.
         */
        edit(options: {
            content?: string;
            embeds?: any[];
            flags?: number;
            allowed_mentions?: any;
            components?: any[];
            attachments?: any[];
        }): Promise<Message>;
        /**
         * Deletes a message from the specified channel.
         *
         * This method sends a request to the Discord API to permanently delete a specific message
         * identified by its ID within the given channel. Once deleted, the message cannot be recovered.
         *
         * @returns {Promise<void>} A promise that resolves when the message has been successfully deleted.
         *
         * @throws {Error} Throws an error if the deletion request fails. This may occur due to insufficient permissions,
         *                 if the message does not exist, or if the channel is not accessible.
         */
        delete(): Promise<void>;
        /**
         * Retrieves the reactions for a specific message using the provided emoji.
         *
         * This method sends a request to the Discord API to get a list of reactions for a specific message
         * with the provided emoji. The emoji can be a Unicode emoji or a custom emoji ID.
         *
         * @param {string} emoji - The emoji to search for. This can be a Unicode emoji or a custom emoji in the format `name:id`.
         * @param {object} options - Optional query parameters to refine the results.
         * @param {number} [options.type=0] - The type of reaction (optional).
         * @param {string} [options.after] - Get reactions after this user ID (optional).
         * @param {number} [options.limit=25] - Max number of reactions to return (1-100).
         * @returns {Promise<Reaction[]>} A promise that resolves to an array of Reaction instances for the given emoji.
         *
         * @throws {Error} If there is an issue with the provided emoji or the API request fails.
         */
        getReactions(emoji: string, options?: {
            type?: number;
            after?: string;
            limit?: number;
        }): Promise<Reaction[]>;
        /**
         * Adds a reaction to the specified message using the provided emoji.
         *
         * This method sends a request to the Discord API to add a reaction to a message in a specific channel.
         * The reaction is represented by the emoji provided as a string (Unicode emoji or custom emoji ID).
         *
         * @param {string} emoji - The emoji to react with. This can be a Unicode emoji or a custom emoji in the format `name:id`.
         * @returns {Promise<void>} A promise that resolves when the reaction has been added.
         *
         * @throws {Error} If there is an issue with the provided emoji or the API request fails.
         */
        addReaction(emoji: string): Promise<void>;
        /**
         * Removes the user's reaction from the specified message.
         *
         * This method sends a request to the Discord API to remove a reaction that the user added to a message.
         * If a user ID is provided, it removes that specific user's reaction; otherwise, it removes the current user's reaction.
         *
         * @param {string} emoji - The emoji for the reaction to be removed. This can be a Unicode emoji or a custom emoji in the format `name:id`.
         * @param {string} [userId] - Optional. The ID of the user whose reaction should be removed. If not provided, it removes the current user's reaction.
         * @returns {Promise<void>} A promise that resolves when the reaction has been removed.
         *
         * @throws {Error} If there is an issue with the API request or required properties are missing.
         */
        removeReaction(emoji: string, userId?: string): Promise<void>;
        /**
         * Removes all reactions from the specified message.
         *
         * This method sends a request to the Discord API to remove all reactions from a message in a specific channel.
         * It removes reactions for all emojis that were added to the message.
         *
         * @returns {Promise<void>} A promise that resolves when all reactions have been removed.
         *
         * @throws {Error} If there is an issue with the API request or required properties are missing.
         */
        removeAllReactions(): Promise<void>;
    }
}
declare module "structures/guildChannel" {
    import { Client } from "client";
    import { ChannelPayload } from "structures/channelPayload";
    import { Member } from "structures/member";
    import { MessagePayload } from "structures/messagePayload";
    /**
     * Represents a Discord guild channel.
     */
    export class GuildChannel {
        private _client;
        /**
         * The unique ID of this channel.
         * @type {string}
         */
        id: string;
        /**
         * The type of the channel.
         * @type {number}
         */
        type: number;
        /**
         * The ID of the guild this channel belongs to, if applicable.
         * @type {?string}
         */
        guildId?: string;
        /**
         * The sorting position of the channel. Channels with the same position are sorted by ID.
         * @type {?number}
         */
        position?: number;
        /**
         * Explicit permission overwrites for members and roles.
         * @type {?any[]}
         */
        permissionOverwrites?: any[];
        /**
         * The name of the channel (1-100 characters).
         * @type {?string}
         */
        name?: string;
        /**
         * The channel topic (0-4096 characters for GUILD_FORUM and GUILD_MEDIA channels, 0-1024 characters for all others).
         * @type {?string}
         */
        topic?: string;
        /**
         * Whether the channel is NSFW (Not Safe For Work).
         * @type {boolean}
         */
        nsfw: boolean;
        /**
         * The ID of the last message sent in this channel (or thread for GUILD_FORUM or GUILD_MEDIA channels). May not point to an existing or valid message or thread.
         * @type {?string}
         */
        lastMessageId?: string;
        /**
         * The bitrate (in bits) of the voice channel.
         * @type {?number}
         */
        bitrate?: number;
        /**
         * The user limit of the voice channel.
         * @type {?number}
         */
        userLimit?: number;
        /**
         * The amount of seconds a user must wait before sending another message (0-21600); bots and users with permission to manage messages or channels are unaffected.
         * @type {?number}
         */
        rateLimitPerUser?: number;
        /**
         * The recipients of the DM (Direct Message) channel.
         * @type {?any[]}
         */
        recipients?: any[];
        /**
         * The icon hash of the group DM.
         * @type {?string}
         */
        icon?: string;
        /**
         * The ID of the creator of the group DM or thread.
         * @type {?string}
         */
        ownerId?: string;
        /**
         * The application ID of the group DM creator if it is bot-created.
         * @type {?string}
         */
        applicationId?: string;
        /**
         * Whether the channel is managed by an application via the `gdm.join` OAuth2 scope for group DM channels.
         * @type {?boolean}
         */
        managed?: boolean;
        /**
         * The ID of the parent category for a guild channel, or the ID of the text channel this thread was created from.
         * @type {?string}
         */
        parentId?: string;
        /**
         * When the last pinned message was pinned. This may be null in events such as `GUILD_CREATE` when a message is not pinned.
         * @type {?string}
         */
        lastPinTimestamp?: string;
        /**
         * The voice region ID for the voice channel. Automatic when set to null.
         * @type {?string}
         */
        rtcRegion?: string;
        /**
         * The camera video quality mode of the voice channel. Defaults to 1 when not present.
         * @type {number}
         */
        videoQualityMode: number;
        /**
         * The number of messages (not including the initial message or deleted messages) in a thread.
         * @type {?number}
         */
        messageCount?: number;
        /**
         * An approximate count of users in a thread. Stops counting at 50.
         * @type {number}
         */
        memberCount: number;
        /**
         * Thread-specific fields not needed by other channels.
         * @type {?any}
         */
        threadMetadata?: any;
        /**
         * The thread member object for the current user, if they have joined the thread. Only included on certain API endpoints.
         * @type {?Member}
         */
        member?: Member;
        /**
         * The default duration (in minutes) for newly created threads. Threads will stop showing in the channel list after the specified period of inactivity.
         * Can be set to: 60, 1440, 4320, 10080.
         * @type {number}
         */
        defaultAutoArchiveDuration: number;
        /**
         * Computed permissions for the invoking user in the channel, including overwrites. Only included when part of the resolved data received on a slash command interaction.
         * This does not include implicit permissions, which may need to be checked separately.
         * @type {?string}
         */
        permissions?: string;
        /**
         * The combined channel flags as a bitfield.
         * @type {number}
         */
        flags: number;
        /**
         * The number of messages ever sent in a thread. Similar to `messageCount` but will not decrement when a message is deleted.
         * @type {?number}
         */
        totalMessageSent?: number;
        /**
         * The set of tags that can be used in a GUILD_FORUM or GUILD_MEDIA channel.
         * @type {?any[]}
         */
        availableTags?: any[];
        /**
         * The IDs of the set of tags that have been applied to a thread in a GUILD_FORUM or GUILD_MEDIA channel.
         * @type {?string[]}
         */
        appliedTags?: string[];
        /**
         * The emoji to show in the add reaction button on a thread in a GUILD_FORUM or GUILD_MEDIA channel.
         * @type {?any}
         */
        defaultReactionEmoji?: any;
        /**
         * The initial rate_limit_per_user to set on newly created threads in a channel. This field is copied to the thread at creation time and does not live update.
         * @type {number}
         */
        defaultThreadRateLimitPerUser: number;
        /**
         * The default sort order type used to order posts in GUILD_FORUM and GUILD_MEDIA channels. Defaults to null, indicating that a preferred sort order hasn't been set by a channel admin.
         * @type {?number}
         */
        defaultSortOrder?: number;
        /**
         * The default forum layout view used to display posts in GUILD_FORUM channels. Defaults to 0, indicating that a layout view has not been set by a channel admin.
         * @type {number}
         */
        defaultForumLayout: number;
        /**
         * Constructs a new GuildChannel object.
         * @param {Client} client - The client instance managing this channel.
         * @param {any} data - The raw data from the API representing the channel.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the channel's properties with the provided data.
         * @param {Object} data - The data object containing channel information.
         */
        private _update;
        /**
         * Sends a message to the channel with the specified options.
         *
         * This function accepts either a `MessagePayload` instance or a plain options object to create and send a message.
         * It processes attachments and files, then sends the message to the channel.
         * Finally, it returns a `Message` instance representing the sent message.
         *
         * @param {MessagePayload | object} options - The message options, which can be an instance of `MessagePayload` or a plain object with message data.
         * @returns A promise that resolves to a `Message` instance representing the sent message.
         *
         * @throws Error If there is an issue with processing the attachments or files.
         */
        sendMessage(options: MessagePayload | object): Promise<any>;
        /**
         * Creates a new channel with the specified options.
         *
         * This function accepts either a `ChannelPayload` instance or a plain options object to create and send a channel creation request.
         * It validates the options, prepares the payload, and then sends the request to create the channel.
         * Finally, it returns a promise that resolves to the created channel's data.
         *
         * @param {ChannelPayload | object} options - The channel creation options, which can be an instance of `ChannelPayload` or a plain object with channel data.
         * @returns A promise that resolves to the newly created channel's data.
         *
         * @throws Error If there is an issue with the provided options or the API request.
         */
        create(options: ChannelPayload | object): Promise<any>;
        /**
         * Edits the properties of the channel with the specified options.
         *
         * This method sends a request to the Discord API to update the channel's attributes
         * identified by its ID within the guild. The updated channel data will be reflected
         * in the current instance after the operation is successful.
         *
         * @param {ChannelPayload | object} options - The options for editing the channel, which can be an
         *                                             instance of `ChannelPayload` or a plain object with channel data.
         * @returns {Promise<GuildChannel>} A promise that resolves to the updated GuildChannel instance.
         *
         * @throws {Error} If there is an issue with the provided options or the API request fails,
         *                 such as insufficient permissions or invalid data.
         */
        edit(options: ChannelPayload | object): Promise<GuildChannel>;
        /**
         * Deletes the channel from the guild.
         *
         * This method sends a request to the Discord API to permanently delete the specified channel.
         * It is important to note that this action cannot be undone, and the channel will be removed
         * from the guild and all associated data will be lost.
         *
         * @returns {Promise<void>} A promise that resolves when the channel has been successfully deleted.
         *
         * @throws {Error} Throws an error if the deletion request fails. This may occur due to insufficient permissions
         *                 or if the channel does not exist.
         */
        delete(): Promise<void>;
    }
}
declare module "structures/guild" {
    import { Client } from "client";
    export class Guild {
        private _client;
        /**
         * The unique ID of the guild.
         * @type {string}
         */
        id?: string;
        /**
         * The name of the guild. It must be between 2 and 100 characters.
         * @type {string}
         */
        name?: string;
        /**
         * The icon hash of the guild, used for the guild's image.
         * @type {?string}
         */
        icon?: string;
        /**
         * The alternative hash for the icon, used in templates.
         * @type {?string}
         */
        iconHash?: string;
        /**
         * The splash image hash for the guild's invite screen.
         * @type {?string}
         */
        splash?: string;
        /**
         * The splash image hash for guilds discoverable in the Discord UI.
         * Available only for guilds with the "DISCOVERABLE" feature.
         * @type {?string}
         */
        discoverySplash?: string;
        /**
         * The banner image hash for the guild, used for decoration in the guild's profile.
         * @type {?string}
         */
        banner?: string;
        /**
         * The ID of the guild owner.
         * @type {string}
         */
        ownerID?: string;
        /**
         * Whether the current user is the owner of the guild.
         * @type {boolean}
         */
        owner?: boolean;
        /**
         * The total permissions available to the user within the guild.
         * Excludes overwrites and implicit permissions.
         * @type {?string}
         */
        permissions?: string;
        /**
         * The ID of the AFK (away-from-keyboard) voice channel.
         * @type {?string}
         */
        afkChannelID?: string;
        /**
         * The timeout duration (in seconds) after which members are moved to the AFK channel.
         * @type {number}
         */
        afkTimeout?: number;
        /**
         * Whether the server widget is enabled, showing information about the guild.
         * @type {boolean}
         */
        widgetEnabled?: boolean;
        /**
         * The ID of the channel used to generate a widget invite.
         * @type {?string}
         */
        widgetChannelID?: string;
        /**
         * The level of verification required for members to participate in the guild.
         * @type {number}
         */
        verificationLevel?: number;
        /**
         * The default notification setting for the guild (all messages or only mentions).
         * @type {number}
         */
        defaultNotifications?: number;
        /**
         * The level of explicit content filtering applied to messages in the guild.
         * @type {number}
         */
        explicitContentFilter?: number;
        /**
         * The multi-factor authentication (MFA) level required for the guild.
         * @type {number}
         */
        mfaLevel?: number;
        /**
         * The application ID of the guild creator, if it was created by a bot.
         * @type {?string}
         */
        applicationID?: string;
        /**
         * The ID of the system channel, where system messages like welcome or boost events are posted.
         * @type {?string}
         */
        systemChannelID?: string;
        /**
         * Flags for controlling the behavior of the system channel (e.g., suppressing join notifications).
         * @type {number}
         */
        systemChannelFlags?: number;
        /**
         * The ID of the rules channel, where Community guilds display their rules and guidelines.
         * @type {?string}
         */
        rulesChannelID?: string;
        /**
         * The maximum number of presences (online members) allowed in the guild.
         * Can be `null` for large guilds.
         * @type {?number}
         */
        maxPresences?: number | null;
        /**
         * The maximum number of members that can join the guild.
         * @type {number}
         */
        maxMembers?: number;
        /**
         * The vanity URL code for the guild, used for custom invite links.
         * @type {?string}
         */
        vanityURL?: string;
        /**
         * A description of the guild, often used for Community guilds.
         * @type {?string}
         */
        description?: string;
        /**
         * The premium tier of the guild, which indicates the level of boosts.
         * @type {number}
         */
        premiumTier?: number;
        /**
         * The number of active boosts for the guild.
         * @type {number}
         */
        premiumSubscriptionCount?: number;
        /**
         * The preferred locale of the guild (e.g., "en-US").
         * @type {string}
         */
        preferredLocale?: string;
        /**
         * The ID of the channel where admins and moderators receive community updates.
         * @type {?string}
         */
        publicUpdatesChannelID?: string;
        /**
         * The maximum number of users allowed in a video channel.
         * @type {number}
         */
        maxVideoChannelUsers?: number;
        /**
         * The maximum number of users allowed in a stage video channel.
         * @type {number}
         */
        maxStageVideoChannelUsers?: number;
        /**
         * The approximate number of members in the guild.
         * Available when with_counts is true in certain API calls.
         * @type {?number}
         */
        approximateMemberCount?: number;
        /**
         * The approximate number of non-offline members in the guild.
         * Available when with_counts is true in certain API calls.
         * @type {?number}
         */
        approximatePresenceCount?: number;
        /**
         * The welcome screen displayed to new members in Community guilds.
         * @type {Object}
         */
        welcomeScreen?: {
            /** Description of the welcome screen */
            description: string;
            /** Channels that are displayed in the welcome screen */
            welcomeChannels: {
                /** The ID of the channel in the welcome screen */
                channelID: string;
                /** Description of the channel in the welcome screen */
                description: string;
                /** Optional emoji ID associated with the welcome channel */
                emojiID?: string;
                /** Optional emoji name associated with the welcome channel */
                emojiName?: string;
            }[];
        };
        /**
         * Whether the guild is marked as NSFW (Not Safe For Work).
         * @type {boolean}
         */
        nsfw?: boolean;
        /**
         * The NSFW (Not Safe For Work) level of the guild.
         * @type {number}
         */
        nsfwLevel?: number;
        /**
         * Custom stickers that have been uploaded to the guild.
         * @type {any[]}
         */
        stickers?: any[];
        /**
         * Whether the boost progress bar is enabled in the guild.
         * @type {boolean}
         */
        premiumProgressBarEnabled?: boolean;
        /**
         * The ID of the channel where safety alerts are sent to admins and moderators.
         * @type {?string}
         */
        safetyAlertsChannelID?: string;
        /**
         * Features enabled for the guild, such as "DISCOVERABLE" or "COMMUNITY".
         * @type {string[]}
         */
        features?: string[];
        /**
         * Custom emojis uploaded to the guild.
         * @type {any[]}
         */
        emojis?: any[];
        /**
         * Constructs a new Guild object.
         * @param {Client} client - The client instance managing this guild.
         * @param {any} data - The raw data from the API representing the guild.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the guild properties with the provided data.
         * @param {Object} data - The data object containing guild information.
         */
        private _update;
    }
}
declare module "ws/websocket" {
    import WebSocket, { ErrorEvent } from 'ws';
    import { Client } from "client";
    /**
     * The `WebSocketClient` class handles the creation and management of a WebSocket connection to a given server.
     * It can send and receive messages, handle errors, and close the connection gracefully.
     */
    export class WebSocketClient {
        ws: WebSocket;
        _client: Client;
        conn: boolean;
        /**
         * Creates an instance of `WebSocketClient`.
         *
         * @param {Client} client - The main client instance that manages the bot or app's connection.
         * @param {string} host - The WebSocket server host URL (http or https will be converted to ws or wss).
         * @param {string} token - The authorization token used to authenticate with the WebSocket server.
         */
        constructor(client: Client, host: string, token: string);
        /**
         * Event handler for the "open" WebSocket event.
         *
         * This function is called when the WebSocket connection is successfully established.
         * It sends a "Connected" message to the server and logs the connection status.
         */
        open(): void;
        /**
         * Event handler for the "message" WebSocket event.
         *
         * This function is called when a message is received from the WebSocket server.
         * If the message is valid JSON, it triggers the client event registration process. Otherwise, it logs the message.
         *
         * @param {any} d - The raw message data received from the WebSocket server.
         */
        message(d: any): void;
        /**
         * Event handler for the "error" WebSocket event.
         *
         * This function is called when an error occurs on the WebSocket connection.
         * It logs the error message to the console.
         *
         * @param {ErrorEvent} err - The error event containing details about the WebSocket error.
         */
        error(err: ErrorEvent): void;
        /**
         * Event handler for the "close" WebSocket event.
         *
         * This function is called when the WebSocket connection is closed.
         * If the connection was established earlier, it sends a "Disconnected" message and logs the event.
         * Otherwise, it logs a connection failure.
         */
        close(): void;
        /**
         * Helper function to check if a string is valid JSON.
         *
         * @param {string} data - The string to check for valid JSON format.
         * @returns {boolean} Returns true if the string is a valid JSON object or array, otherwise false.
         */
        isJson(data: string): boolean;
    }
}
declare module "structures/voiceState" {
    import { Client } from "client";
    import { GuildChannel } from "structures/guildChannel";
    import { Member } from "structures/member";
    /**
     * Represents the voice state of a user in a guild's voice channel.
     */
    export class VoiceState {
        private _client;
        /**
         * The ID of the guild this voice state belongs to.
         * @type {?string}
         */
        guildID?: string;
        /**
         * The ID of the channel the user is connected to, if applicable.
         * @type {?string}
         */
        channelID?: string;
        /**
         * The channel the user is connected to, if applicable.
         * @type {?GuildChannel | null}
         */
        channel?: GuildChannel | null;
        /**
         * The ID of the user this voice state belongs to.
         * @type {string}
         */
        userID: string;
        /**
         * The guild member this voice state is associated with, if applicable.
         * @type {?Member}
         */
        member?: Member;
        /**
         * The session ID for this voice state.
         * @type {string}
         */
        sessionID: string;
        /**
         * Whether the user is deafened by the server.
         * @type {boolean}
         */
        deaf: boolean;
        /**
         * Whether the user is muted by the server.
         * @type {boolean}
         */
        mute: boolean;
        /**
         * Whether the user is locally deafened.
         * @type {boolean}
         */
        selfDeaf: boolean;
        /**
         * Whether the user is locally muted.
         * @type {boolean}
         */
        selfMute: boolean;
        /**
         * Whether the user is streaming using "Go Live".
         * @type {?boolean}
         */
        selfStream?: boolean;
        /**
         * Whether the user's camera is enabled.
         * @type {boolean}
         */
        selfVideo: boolean;
        /**
         * Whether the user's permission to speak is denied.
         * @type {boolean}
         */
        suppress: boolean;
        /**
         * The time at which the user requested to speak, if applicable.
         * @type {?string}
         */
        requestToSpeakTimestamp?: string;
        /**
         * Constructs a new VoiceState object.
         * @param {Client} client - The client instance managing this voice state.
         * @param {any} data - The raw data from the API representing the voice state.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the properties of the voice state with the provided data.
         * @param {Object} data - The data object containing voice state information.
         */
        private _update;
    }
}
declare module "structures/guildBan" {
    import { Client } from "client";
    /**
     * Represents a ban in a Discord guild.
     */
    export class GuildBan {
        private _client;
        /**
         * The unique ID of the guild where the ban was applied.
         * @type {string}
         */
        guildId: string;
        /**
         * The user object representing the user who was banned.
         * @type {any}
         */
        user: any;
        /**
         * Constructs a new GuildBan object.
         * @param {any} data - The raw data from the API representing the ban.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the ban's properties with the provided data.
         * @param {Object} data - The data object containing ban information.
         */
        private _update;
    }
}
declare module "structures/applicationCommand" {
    import { Client } from "client";
    /**
     * Represents an application command in Discord.
     */
    export class ApplicationCommand {
        private _client;
        /**
         * Unique ID of the command.
         * @type {string}
         */
        id: string;
        /**
         * ID of the parent application.
         * @type {string}
         */
        application_id: string;
        /**
         * The name of the command (1-32 characters).
         * @type {string}
         */
        name: string;
        /**
         * A dictionary for localized names of the command.
         * @type {object | undefined}
         */
        name_localizations?: {
            [key: string]: string;
        };
        /**
         * Description for CHAT_INPUT commands (1-100 characters), or an empty string for other types.
         * @type {string}
         */
        description: string;
        /**
         * A dictionary for localized descriptions of the command.
         * @type {object | undefined}
         */
        description_localizations?: {
            [key: string]: string;
        };
        /**
         * Command options (up to 25) for CHAT_INPUT commands.
         * @type {array | undefined}
         */
        options?: Array<object>;
        /**
         * Permission bit set representing the permissions required to use the command.
         * @type {string | undefined}
         */
        default_member_permissions?: string;
        /**
         * Whether the command is available in DMs.
         * @type {boolean | undefined}
         */
        dm_permission?: boolean;
        /**
         * Whether the command is enabled by default when added to a guild.
         * @type {boolean | undefined}
         */
        default_permission?: boolean;
        /**
         * Whether the command is NSFW (age-restricted).
         * @type {boolean}
         */
        nsfw: boolean;
        /**
         * The list of integration types where the command is available.
         * @type {Array<string> | undefined}
         */
        integration_types?: Array<string>;
        /**
         * The interaction contexts where the command can be used.
         * @type {Array<string> | undefined}
         */
        contexts?: Array<string>;
        /**
         * Autoincrementing version identifier for the command.
         * @type {string}
         */
        version: string;
        /**
         * Constructor for creating a new ApplicationCommand instance.
         * @param {Client} client - The client instance.
         * @param {any} data - The raw data representing the application command.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the command properties with the provided data.
         * @param {Object} data - The data representing the command.
         */
        private _update;
    }
}
declare module "structures/commandPayload" {
    /**
     * Represents the payload for creating or updating a Discord application command.
     * This class encapsulates all the parameters needed to define a command and provides
     * necessary validation for the fields.
     */
    export class CommandPayload {
        private _name;
        private _nameLocalizations?;
        private _description?;
        private _descriptionLocalizations?;
        private _options?;
        private _defaultMemberPermissions?;
        private _defaultPermission?;
        private _type?;
        private _nsfw?;
        /**
         * Creates a new `CommandPayload` instance.
         * @param data Optional initial data to set in the payload.
         */
        constructor(data?: {
            name: string;
            name_localizations?: {
                [key: string]: string;
            };
            description?: string;
            description_localizations?: {
                [key: string]: string;
            };
            options?: any[];
            default_member_permissions?: string;
            default_permission?: boolean;
            type?: number;
            nsfw?: boolean;
        });
        /**
         * Gets the name of the command.
         * @returns The name of the command.
         */
        get name(): string;
        /**
         * Sets the name of the command.
         * The name must be between 1 and 32 characters.
         * @param value The name of the command.
         * @throws Error if the name is not within the allowed length (1-32 characters).
         */
        set name(value: string);
        /**
         * Gets the localization dictionary for the command's name.
         * @returns A dictionary of localized names with locale keys.
         */
        get nameLocalizations(): {
            [key: string]: string;
        } | undefined;
        /**
         * Sets the localization dictionary for the command's name.
         * @param value A dictionary with locale keys and localized name strings.
         */
        set nameLocalizations(value: {
            [key: string]: string;
        } | undefined);
        /**
         * Gets the description of the command.
         * @returns The description of the command.
         */
        get description(): string | undefined;
        /**
         * Sets the description of the command.
         * The description must be between 1 and 100 characters for `CHAT_INPUT` commands.
         * @param value The description of the command.
         * @throws Error if the description is not within the allowed length (1-100 characters).
         */
        set description(value: string | undefined);
        /**
         * Gets the localization dictionary for the command's description.
         * @returns A dictionary of localized descriptions with locale keys.
         */
        get descriptionLocalizations(): {
            [key: string]: string;
        } | undefined;
        /**
         * Sets the localization dictionary for the command's description.
         * @param value A dictionary with locale keys and localized description strings.
         */
        set descriptionLocalizations(value: {
            [key: string]: string;
        } | undefined);
        /**
         * Gets the options for the command.
         * @returns An array of command options.
         */
        get options(): any[] | undefined;
        /**
         * Sets the options for the command.
         * Options are the parameters for the command, and the maximum number allowed is 25.
         * @param value An array of command options.
         * @throws Error if more than 25 options are provided.
         */
        set options(value: any[] | undefined);
        /**
         * Gets the default member permissions for the command.
         * @returns A string representing the default member permissions as a bit set.
         */
        get defaultMemberPermissions(): string | undefined;
        /**
         * Sets the default member permissions for the command.
         * The permissions are represented as a bitwise string.
         * @param value A string representing the default permissions as a bit set.
         */
        set defaultMemberPermissions(value: string | undefined);
        /**
         * Gets whether the command is enabled by default.
         * @returns True if the command is enabled by default, false otherwise.
         */
        get defaultPermission(): boolean | undefined;
        /**
         * Sets whether the command is enabled by default.
         * @param value True if the command should be enabled by default, false otherwise.
         */
        set defaultPermission(value: boolean | undefined);
        /**
         * Gets the type of the command.
         * @returns The type of the command.
         */
        get type(): number | undefined;
        /**
         * Sets the type of the command.
         * The type determines whether the command is a `CHAT_INPUT`, `USER`, or `MESSAGE` command.
         * @param value The command type as a number.
         */
        set type(value: number | undefined);
        /**
         * Gets whether the command is age-restricted (NSFW).
         * @returns True if the command is NSFW, false otherwise.
         */
        get nsfw(): boolean | undefined;
        /**
         * Sets whether the command is age-restricted (NSFW).
         * @param value True if the command should be marked as NSFW, false otherwise.
         */
        set nsfw(value: boolean | undefined);
        /**
         * Converts the command payload to a JSON-serializable object.
         * This method ensures that only the defined fields are included in the output.
         * @returns A JSON-serializable representation of the command payload.
         */
        toJSON(): any;
    }
}
declare module "client" {
    import { EventEmitter } from "events";
    import { Guild } from "structures/guild";
    import { RestApi } from "rest/request";
    import { WebSocketClient } from "ws/websocket";
    import { Message } from "structures/message";
    import { Role } from "structures/role";
    import { GuildChannel } from "structures/guildChannel";
    import { Member } from "structures/member";
    import { Reaction } from "structures/reaction";
    import { VoiceState } from "structures/voiceState";
    import { Interaction } from "structures/interaction";
    import { GuildBan } from "structures/guildBan";
    import { Collection } from "utils/collection";
    import { User } from "structures/user";
    import { ApplicationCommand } from "structures/applicationCommand";
    import { CommandPayload } from "structures/commandPayload";
    /**
     * Interface representing the various events emitted by a client.
     */
    export interface ClientEvents {
        /**
         * Triggered when a the client is connected.
         */
        react: [];
        /**
         * Triggered when a new message is created in a channel.
         * @param message - The message that was created.
         */
        messageCreate: [message: Message];
        /**
         * Triggered when an existing message is updated.
         * @param message - The message that was updated.
         */
        messageUpdate: [message: Message];
        /**
         * Triggered when a message is deleted from a channel.
         * @param message - The message that was deleted.
         */
        messageDelete: [message: Message];
        /**
         * Triggered when a reaction is added to a message.
         * @param reaction - The reaction that was added.
         */
        messageReactionAdd: [reaction: Reaction];
        /**
         * Triggered when a reaction is removed from a message.
         * @param reaction - The reaction that was removed.
         */
        messageReactionRemove: [reaction: Reaction];
        /**
         * Triggered when all reactions are removed from a message.
         * @param reaction - The reaction object for the cleared reactions.
         */
        messageReactionRemoveAll: [reaction: Reaction];
        /**
         * Triggered when a new member joins the guild.
         * @param member - The member who joined.
         */
        guildMemberAdd: [member: Member];
        /**
         * Triggered when a guild member's information is updated.
         * @param member - The member whose information was updated.
         */
        guildMemberUpdate: [member: Member];
        /**
         * Triggered when a member leaves or is removed from the guild.
         * @param member - The member who left or was removed.
         */
        guildMemberRemove: [member: Member];
        /**
         * Triggered when a guild ban is added.
         * @param guildBan - The guild ban that was added.
         */
        guildBanAdd: [guildBan: GuildBan];
        /**
         * Triggered when a guild ban is removed.
         * @param guildBan - The guild ban that was removed.
         */
        guildBanRemove: [guildBan: GuildBan];
        /**
         * Triggered when a guild is updated.
         * @param guild - The guild that was updated.
         */
        guildUpdate: [guild: Guild];
        /**
         * Triggered when a role is created in the guild.
         * @param role - The role that was created.
         */
        roleCreate: [role: Role];
        /**
         * Triggered when an existing role is updated.
         * @param role - The role that was updated.
         */
        roleUpdate: [role: Role];
        /**
         * Triggered when a role is deleted from the guild.
         * @param role - The role that was deleted.
         */
        roleDelete: [role: Role];
        /**
         * Triggered when a new channel is created in the guild.
         * @param channel - The channel that was created.
         */
        channelCreate: [channel: GuildChannel];
        /**
         * Triggered when a channel's information is updated.
         * @param channel - The channel that was updated.
         */
        channelUpdate: [channel: GuildChannel];
        /**
         * Triggered when a channel is deleted from the guild.
         * @param channel - The channel that was deleted.
         */
        channelDelete: [channel: GuildChannel];
        /**
         * Triggered when a user's voice state changes in a voice channel.
         * @param voiceState - The updated voice state.
         */
        voiceStateUpdate: [voiceState: VoiceState];
        /**
         * Triggered when an interaction is created, such as a slash command or button click.
         * @param interaction - The interaction that was created.
         */
        interactionCreate: [interaction: Interaction];
    }
    /**
     * Represents the main client for interacting with the API and WebSocket.
     * Extends the EventEmitter to handle events.
     */
    export class Client extends EventEmitter {
        /**
         * WebSocket client instance used to handle real-time events and updates from the server.
         * @type {WebSocketClient}
         */
        ws: WebSocketClient;
        /**
         * REST API client instance used for making HTTP requests to the server.
         * @type {RestApi}
         */
        rest: RestApi;
        /**
         * Represents the bot user object for the client.
         * This property is initialized asynchronously and may be undefined until the initialization is complete.
         * @type {User}
         */
        user?: User;
        /**
         * Represents the guild object for the client.
         * This property is initialized asynchronously and may be undefined until the initialization is complete.
         * @type {Guild}
         */
        guild?: Guild;
        /**
         * A collection of channels associated with the client.
         *
         * This property is initialized asynchronously after the client is created and
         * contains all channels associated with the current guild.
         *
         * The collection is managed by the `Collection` class and uses the channel ID
         * as the key to access individual channels.
         *
         * Note: The `channels` property may be `undefined` if the initialization is not
         * yet complete or if there was an error fetching the channels. Ensure to check
         * the state of this property before attempting to access channels.
         * @type {Collection<GuildChannel> | undefined}
         */
        channels?: Collection<GuildChannel> | undefined;
        /**
         * A collection of members associated with the client.
         *
         * This property is initialized asynchronously after the client is created and
         * contains all members associated with the current guild.
         *
         * The collection is managed by the `Collection` class and uses the member ID
         * as the key to access individual members.
         *
         * Note: The `members` property may be `undefined` if the initialization is not
         * yet complete or if there was an error fetching the members. Ensure to check
         * the state of this property before attempting to access members.
         * @type {Collection<Member> | undefined}
         */
        members?: Collection<Member> | undefined;
        /**
         * A collection of roles associated with the client.
         *
         * This property is initialized asynchronously after the client is created and
         * contains all roles associated with the current guild.
         *
         * The collection is managed by the `Collection` class and uses the role ID
         * as the key to access individual roles.
         *
         * Note: The `roles` property may be `undefined` if the initialization is not
         * yet complete or if there was an error fetching the roles. Ensure to check
         * the state of this property before attempting to access roles.
         * @type {Collection<Role> | undefined}
         */
        roles?: Collection<Role> | undefined;
        /**
         * Creates an instance of the Client class.
         * Initializes the WebSocket and REST API clients and sets up the guild data.
         *
         * @param host - The base URL of the API server.
         * @param token - The authentication token for the API requests.
         */
        constructor(host: string, token: string);
        on<Event extends keyof ClientEvents>(event: Event, listener: (...args: ClientEvents[Event]) => void): this;
        /**
         * Initializes the client by fetching the guild data and setting it to the guild property.
         * This method is called in the constructor to ensure the client is ready to use after creation.
         *
         * @returns {Promise<void>} A promise that resolves when the initialization is complete.
         *
         * @throws {Error} Throws an error if the API request fails or the data cannot be processed.
         */
        private initialize;
        _registerEvent(name: string, data: any): void;
        /**
          * Registers a new application command.
          * @param {CommandPayload | object} options - The command creation options.
          * @returns {Promise<ApplicationCommand>} The registered application command.
          */
        registerCommand(options: CommandPayload): Promise<ApplicationCommand>;
        /**
          * Retrieves all application commands for the guild.
          * @returns {Promise<any>} A promise that resolves to an array of application commands for the guild.
          */
        getCommands(): Promise<any>;
        /**
          * Retrieves a specific application command by its ID.
          * @param {string} id - The unique ID of the application command.
          * @returns {Promise<any>} A promise that resolves to the application command data.
          */
        getCommand(id: string): Promise<any>;
        /**
          * Unregister the application command.
          * @returns {Promise<void>} Resolves when the command is unregistered.
          */
        unregisterCommand(id: string): Promise<void>;
    }
}
declare module "index" {
    export { ChannelPayload } from "structures/channelPayload";
    export { CommandPayload } from "structures/commandPayload";
    export { MessagePayload } from "structures/messagePayload";
    export { RolePayload } from "structures/rolePayload";
    export { Attachment } from "structures/attachment";
    export { Embed } from "structures/embed";
    export { Guild } from "structures/guild";
    export { GuildBan } from "structures/guildBan";
    export { GuildChannel } from "structures/guildChannel";
    export { Interaction } from "structures/interaction";
    export { Member } from "structures/member";
    export { Message } from "structures/message";
    export { Reaction } from "structures/reaction";
    export { Role } from "structures/role";
    export { User } from "structures/user";
    export { VoiceState } from "structures/voiceState";
    export { ApplicationCommand } from "structures/applicationCommand";
    export { Client } from "client";
}
//# sourceMappingURL=index.d.ts.map
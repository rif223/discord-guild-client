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
        guildChannelInvites: (channelId: string) => string;
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
declare module "structures/user" {
    import { Client } from "client";
    /**
     * Represents a Discord user.
     */
    export class User {
        private _client;
        id: string;
        username: string;
        discriminator: string;
        globalName?: string;
        avatar?: string;
        bot?: boolean;
        system?: boolean;
        mfaEnabled?: boolean;
        banner?: string;
        accentColor?: number;
        locale?: string;
        verified?: boolean;
        email?: string;
        flags?: number;
        premiumType?: number;
        publicFlags?: number;
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
declare module "structures/emoji" {
    import { Client } from "client";
    import { User } from "structures/user";
    /**
     * Represents a custom guild emoji.
     */
    export class Emoji {
        private _client;
        id?: string;
        name?: string;
        roles: string[];
        user?: User;
        requireColons?: boolean;
        managed?: boolean;
        animated?: boolean;
        available?: boolean;
        /**
         * Constructs a new Emoji object.
         * @param {Client} client - The client instance managing this emoji.
         * @param {any} data - The raw data from the API representing the emoji.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the emoji properties with the provided data.
         * @param {any} data - The data object containing emoji information.
         */
        private _update;
    }
}
declare module "structures/guildPayload" {
    /**
     * Represents the payload for updating or creating a Discord guild.
     */
    export class GuildPayload {
        private _name?;
        private _region?;
        private _verificationLevel?;
        private _defaultMessageNotifications?;
        private _explicitContentFilter?;
        private _afkChannelId?;
        private _afkTimeout?;
        private _icon?;
        private _ownerId?;
        private _splash?;
        private _discoverySplash?;
        private _banner?;
        private _systemChannelId?;
        private _systemChannelFlags?;
        private _rulesChannelId?;
        private _publicUpdatesChannelId?;
        private _preferredLocale?;
        private _features?;
        private _description?;
        private _premiumProgressBarEnabled?;
        private _safetyAlertsChannelId?;
        /**
         * Creates a new GuildPayload instance.
         * @param data Optional initial data to populate the guild payload.
         */
        constructor(data?: {
            name?: string;
            region?: string;
            verification_level?: number;
            default_message_notifications?: number;
            explicit_content_filter?: number;
            afk_channel_id?: string;
            afk_timeout?: number;
            icon?: string;
            owner_id?: string;
            splash?: string;
            discovery_splash?: string;
            banner?: string;
            system_channel_id?: string;
            system_channel_flags?: number;
            rules_channel_id?: string;
            public_updates_channel_id?: string;
            preferred_locale?: string;
            features?: string[];
            description?: string;
            premium_progress_bar_enabled?: boolean;
            safety_alerts_channel_id?: string;
        });
        /**
         * The guild's name.
         * Must be between 2 and 100 characters if specified.
         */
        get name(): string | undefined;
        set name(value: string | undefined);
        /**
         * The guild voice region id (deprecated).
         */
        get region(): string | undefined;
        set region(value: string | undefined);
        /**
         * Verification level of the guild (0-4).
         */
        get verificationLevel(): number | undefined;
        set verificationLevel(value: number | undefined);
        /**
         * Default message notification level.
         */
        get defaultMessageNotifications(): number | undefined;
        set defaultMessageNotifications(value: number | undefined);
        /**
         * Explicit content filter level.
         */
        get explicitContentFilter(): number | undefined;
        set explicitContentFilter(value: number | undefined);
        /**
         * ID for the AFK channel.
         */
        get afkChannelId(): string | undefined;
        set afkChannelId(value: string | undefined);
        /**
         * AFK timeout in seconds.
         * Valid values: 60, 300, 900, 1800, 3600.
         */
        get afkTimeout(): number | undefined;
        set afkTimeout(value: number | undefined);
        /**
         * Base64 encoded 1024x1024 png/jpeg/gif image for the guild icon.
         */
        get icon(): string | undefined;
        set icon(value: string | undefined);
        /**
         * User ID to transfer guild ownership to (must be the owner).
         */
        get ownerId(): string | undefined;
        set ownerId(value: string | undefined);
        /**
         * Base64 encoded 16:9 png/jpeg image for the guild splash.
         */
        get splash(): string | undefined;
        set splash(value: string | undefined);
        /**
         * Base64 encoded 16:9 png/jpeg image for the guild discovery splash.
         */
        get discoverySplash(): string | undefined;
        set discoverySplash(value: string | undefined);
        /**
         * Base64 encoded 16:9 png/jpeg image for the guild banner.
         */
        get banner(): string | undefined;
        set banner(value: string | undefined);
        /**
         * The ID of the channel where guild notices such as welcome messages and boost events are posted.
         */
        get systemChannelId(): string | undefined;
        set systemChannelId(value: string | undefined);
        /**
         * System channel flags.
         */
        get systemChannelFlags(): number | undefined;
        set systemChannelFlags(value: number | undefined);
        /**
         * The ID of the channel where Community guilds display rules and/or guidelines.
         */
        get rulesChannelId(): string | undefined;
        set rulesChannelId(value: string | undefined);
        /**
         * The ID of the channel where admins and moderators of Community guilds receive notices from Discord.
         */
        get publicUpdatesChannelId(): string | undefined;
        set publicUpdatesChannelId(value: string | undefined);
        /**
         * The preferred locale of a Community guild used in server discovery and notices from Discord.
         */
        get preferredLocale(): string | undefined;
        set preferredLocale(value: string | undefined);
        /**
         * Enabled guild features.
         */
        get features(): string[] | undefined;
        set features(value: string[] | undefined);
        /**
         * The description for the guild.
         */
        get description(): string | undefined;
        set description(value: string | undefined);
        /**
         * Whether the guild's boost progress bar should be enabled.
         */
        get premiumProgressBarEnabled(): boolean | undefined;
        set premiumProgressBarEnabled(value: boolean | undefined);
        /**
         * The ID of the channel where admins and moderators of Community guilds receive safety alerts from Discord.
         */
        get safetyAlertsChannelId(): string | undefined;
        set safetyAlertsChannelId(value: string | undefined);
        /**
         * Converts the payload to a JSON object.
         * @returns JSON representation of the guild payload.
         */
        toJSON(): any;
    }
}
declare module "structures/sticker" {
    import { Client } from "client";
    import { User } from "structures/user";
    /**
     * Represents a Discord sticker object.
     */
    export class Sticker {
        private _client;
        id: string;
        packId?: string;
        name: string;
        description?: string;
        tags: string;
        type: number;
        formatType: number;
        available?: boolean;
        guildId?: string;
        user?: User;
        sortValue?: number;
        /**
         * Creates a new Sticker instance.
         * @param {Client} client - The client instance.
         * @param {any} data - The raw data from the Discord API.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the sticker properties with the provided data.
         * @param {Object} data - The data object containing sticker information.
         */
        private _update;
    }
}
declare module "structures/guild" {
    import { Client } from "client";
    import { Emoji } from "structures/emoji";
    import { GuildPayload } from "structures/guildPayload";
    import { Sticker } from "structures/sticker";
    export class Guild {
        private _client;
        id?: string;
        name?: string;
        icon?: string;
        iconHash?: string;
        splash?: string;
        discoverySplash?: string;
        banner?: string;
        ownerID?: string;
        owner?: boolean;
        permissions?: string;
        afkChannelID?: string;
        afkTimeout?: number;
        widgetEnabled?: boolean;
        widgetChannelID?: string;
        verificationLevel?: number;
        defaultNotifications?: number;
        explicitContentFilter?: number;
        mfaLevel?: number;
        applicationID?: string;
        systemChannelID?: string;
        systemChannelFlags?: number;
        rulesChannelID?: string;
        maxPresences?: number | null;
        maxMembers?: number;
        vanityURL?: string;
        description?: string;
        premiumTier?: number;
        premiumSubscriptionCount?: number;
        preferredLocale?: string;
        publicUpdatesChannelID?: string;
        maxVideoChannelUsers?: number;
        maxStageVideoChannelUsers?: number;
        approximateMemberCount?: number;
        approximatePresenceCount?: number;
        welcomeScreen?: {
            description: string;
            welcomeChannels: {
                channelID: string;
                description: string;
                emojiID?: string;
                emojiName?: string;
            }[];
        };
        nsfw?: boolean;
        nsfwLevel?: number;
        stickers?: Sticker[];
        premiumProgressBarEnabled?: boolean;
        safetyAlertsChannelID?: string;
        features?: string[];
        emojis?: Emoji[];
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
        /**
         * Edits the guild with the provided options.
         * @param {GuildPayload} options - Fields to update on the guild.
         * @returns {Promise<Guild>} The updated Guild object.
         * @throws {Error} Throws if the API request fails.
         */
        edit(options: GuildPayload | object): Promise<Guild>;
    }
}
declare module "structures/attachment" {
    import { Client } from "client";
    /**
     * Represents an attachment in a message, such as a file, image, or media.
     */
    export class Attachment {
        private _client;
        id: string;
        filename: string;
        title?: string;
        description?: string;
        content_type?: string;
        size: number;
        url: string;
        proxy_url: string;
        height?: number;
        width?: number;
        ephemeral?: boolean;
        duration_secs?: number;
        waveform?: string;
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
        title?: string;
        type?: string;
        description?: string;
        url?: string;
        timestamp?: string;
        color?: number;
        footer?: EmbedFooter;
        image?: EmbedImage;
        thumbnail?: EmbedThumbnail;
        video?: EmbedVideo;
        provider?: EmbedProvider;
        author?: EmbedAuthor;
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
        text: string;
        icon_url?: string;
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
        url: string;
        proxy_url?: string;
        height?: number;
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
        url: string;
        proxy_url?: string;
        height?: number;
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
        url?: string;
        proxy_url?: string;
        height?: number;
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
        name?: string;
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
        name: string;
        url?: string;
        icon_url?: string;
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
        name: string;
        value: string;
        inline?: boolean;
        /**
         * Constructs a new EmbedField object.
         * @param {Object} data - The data representing the field.
         */
        constructor(data: any);
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
        user?: User;
        nick?: string;
        avatar?: string;
        roles: string[];
        joinedAt: string;
        premiumSince?: string;
        deaf: boolean;
        mute: boolean;
        flags: number;
        pending?: boolean;
        permissions?: string;
        communicationDisabledUntil?: string | null;
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
declare module "structures/reaction" {
    import { Client } from "client";
    import { Emoji } from "structures/emoji";
    import { Member } from "structures/member";
    /**
     * Represents a reaction to a message in a guild or channel.
     */
    export class Reaction {
        private _client;
        userID: string;
        channelID: string;
        messageID: string;
        guildID?: string;
        member?: Member;
        emoji?: Emoji;
        messageAuthorID?: string;
        burst: boolean;
        burstColors?: string[];
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
        id: string;
        name: string;
        color: number;
        hoist: boolean;
        icon?: string;
        unicodeEmoji?: string;
        position: number;
        permissions: string;
        managed: boolean;
        mentionable: boolean;
        tags?: any;
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
declare module "structures/application" {
    import { Client } from "client";
    import { Guild } from "structures/guild";
    import { User } from "structures/user";
    export class Application {
        private _client;
        id: string;
        name: string;
        icon?: string;
        description: string;
        rpcOrigins?: string[];
        botPublic: boolean;
        botRequireCodeGrant: boolean;
        bot?: User;
        termsOfServiceUrl?: string;
        privacyPolicyUrl?: string;
        owner?: User;
        verifyKey: string;
        team?: any;
        guildID?: string;
        guild?: Guild;
        primarySkuID?: string;
        slug?: string;
        coverImage?: string;
        flags?: number;
        approximateGuildCount?: number;
        approximateUserInstallCount?: number;
        redirectUris?: string[];
        interactionsEndpointUrl?: string;
        roleConnectionsVerificationUrl?: string;
        eventWebhooksUrl?: string;
        eventWebhooksStatus: number;
        eventWebhooksTypes?: string[];
        tags?: string[];
        installParams?: any;
        integrationTypesConfig?: Record<string, any>;
        customInstallUrl?: string;
        /**
         * Constructs a new Application object.
         * @param {Client} client - The client instance managing this application.
         * @param {any} data - The raw data from the API representing the application.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the application properties with the provided data.
         * @param {any} data - The data object containing application information.
         */
        private _update;
    }
}
declare module "structures/invite" {
    import { Client } from "client";
    import { Application } from "structures/application";
    import { Guild } from "structures/guild";
    import { GuildChannel } from "structures/guildChannel";
    import { User } from "structures/user";
    export class Invite {
        private _client;
        type: number;
        code: string;
        guild?: Guild;
        channel?: GuildChannel;
        inviter?: User;
        targetType?: number;
        targetUser?: User;
        targetApplication?: Application;
        approximatePresenceCount?: number;
        approximateMemberCount?: number;
        expiresAt?: string | null;
        stageInstance?: any;
        guildScheduledEvent?: any;
        /**
         * Constructs a new Invite object.
         * @param {Client} client - The client instance managing this invite.
         * @param {any} data - The raw data from the API representing the invite.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the invite properties with the provided data.
         * @param {any} data - The data object containing invite information.
         */
        private _update;
    }
}
declare module "structures/invitePayload" {
    /**
     * Represents the payload for creating a Discord invite.
     * This class encapsulates all parameters needed to create an invite.
     */
    export class InvitePayload {
        private _maxAge?;
        private _maxUses?;
        private _temporary?;
        private _unique?;
        private _targetType?;
        private _targetUserId?;
        private _targetApplicationId?;
        /**
         * Creates a new `InvitePayload` instance.
         * @param data Optional initial data to set in the payload.
         */
        constructor(data?: {
            max_age?: number;
            max_uses?: number;
            temporary?: boolean;
            unique?: boolean;
            target_type?: number;
            target_user_id?: string;
            target_application_id?: string;
        });
        /**
         * Gets the duration (in seconds) before the invite expires.
         * 0 means the invite never expires.
         * Must be between 0 and 604800 (7 days).
         * @returns The invite expiration duration in seconds.
         */
        get maxAge(): number | undefined;
        /**
         * Sets the duration (in seconds) before the invite expires.
         * @param value Duration in seconds (0 to 604800).
         * @throws Error if the value is out of range.
         */
        set maxAge(value: number | undefined);
        /**
         * Gets the maximum number of uses for the invite.
         * 0 means unlimited uses.
         * Must be between 0 and 100.
         * @returns The maximum number of uses.
         */
        get maxUses(): number | undefined;
        /**
         * Sets the maximum number of uses for the invite.
         * @param value Maximum uses (0 to 100).
         * @throws Error if the value is out of range.
         */
        set maxUses(value: number | undefined);
        /**
         * Gets whether the invite grants temporary membership.
         * @returns True if temporary membership is granted.
         */
        get temporary(): boolean | undefined;
        /**
         * Sets whether the invite grants temporary membership.
         * @param value True to grant temporary membership.
         */
        set temporary(value: boolean | undefined);
        /**
         * Gets whether the invite should always create a new unique invite.
         * Useful for generating one-time-use invites.
         * @returns True if invite is unique.
         */
        get unique(): boolean | undefined;
        /**
         * Sets whether the invite should always create a new unique invite.
         * @param value True to create a unique invite.
         */
        set unique(value: boolean | undefined);
        /**
         * Gets the target type of the voice channel invite.
         * 1 = Stream, 2 = Embedded Application.
         * @returns The target type number.
         */
        get targetType(): number | undefined;
        /**
         * Sets the target type of the voice channel invite.
         * @param value Target type (1 for Stream, 2 for Embedded Application).
         * @throws Error if the value is not 1 or 2.
         */
        set targetType(value: number | undefined);
        /**
         * Gets the user ID whose stream should be displayed.
         * Required if target_type is 1 (Stream).
         * @returns The target user ID.
         */
        get targetUserId(): string | undefined;
        /**
         * Sets the user ID whose stream should be displayed.
         * @param value Target user ID.
         */
        set targetUserId(value: string | undefined);
        /**
         * Gets the ID of the embedded application to launch.
         * Required if target_type is 2 (Embedded Application).
         * @returns The target application ID.
         */
        get targetApplicationId(): string | undefined;
        /**
         * Sets the ID of the embedded application to launch.
         * @param value Target application ID.
         */
        set targetApplicationId(value: string | undefined);
        /**
         * Converts the payload to a JSON-serializable object.
         * @returns A JSON object representation of the invite payload.
         */
        toJSON(): any;
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
declare module "structures/guildChannel" {
    import { Client } from "client";
    import { ChannelPayload } from "structures/channelPayload";
    import { Invite } from "structures/invite";
    import { InvitePayload } from "structures/invitePayload";
    import { Member } from "structures/member";
    import { MessagePayload } from "structures/messagePayload";
    /**
     * Represents a Discord guild channel.
     */
    export class GuildChannel {
        private _client;
        id: string;
        type: number;
        guildId?: string;
        position?: number;
        permissionOverwrites?: any[];
        name?: string;
        topic?: string;
        nsfw: boolean;
        lastMessageId?: string;
        bitrate?: number;
        userLimit?: number;
        rateLimitPerUser?: number;
        recipients?: any[];
        icon?: string;
        ownerId?: string;
        applicationId?: string;
        managed?: boolean;
        parentId?: string;
        lastPinTimestamp?: string;
        rtcRegion?: string;
        videoQualityMode: number;
        messageCount?: number;
        memberCount: number;
        threadMetadata?: any;
        member?: Member;
        defaultAutoArchiveDuration: number;
        permissions?: string;
        flags: number;
        totalMessageSent?: number;
        availableTags?: any[];
        appliedTags?: string[];
        defaultReactionEmoji?: any;
        defaultThreadRateLimitPerUser: number;
        defaultSortOrder?: number;
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
        /**
         * Creates a new invite for this channel.
         *
         * Sends a request to the Discord API to create an invite link with the specified options.
         *
         * @param {InvitePayload} options - Options for creating the invite.
         * @returns {Promise<Invite>} The invite object returned from the API.
         *
         * @throws {Error} Throws if the request fails due to permission issues, invalid parameters, or network errors.
         */
        createInvite(options: InvitePayload): Promise<Invite>;
        /**
         * Retrieves all active invites for this guild channel.
         *
         * This method calls the Discord API to fetch all invite links that have been created for this specific channel.
         * The returned invites include metadata such as the creator, usage limits, expiration time, etc.
         *
         * ⚠️ Requires the `MANAGE_CHANNELS` permission on the channel.
         *
         * @returns {Promise<Invite[]>} A promise that resolves to an array of {@link Invite} objects.
         *
         * @throws {Error} Throws if the request fails due to permission issues, network errors, or invalid channel ID.
         */
        getInvites(): Promise<Invite[]>;
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
        _client: Client;
        id: string;
        applicationId: string;
        type: number;
        data?: any;
        guild?: Guild;
        guildId?: string;
        channel?: GuildChannel;
        channelId?: string;
        member?: Member;
        user?: User;
        token: string;
        version: number;
        message?: Message;
        appPermissions?: string;
        locale?: string;
        guildLocale?: string;
        entitlements?: any[];
        authorizingIntegrationOwners?: any;
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
    import { Sticker } from "structures/sticker";
    /**
     * Represents a message in a channel.
     */
    export class Message {
        private _client;
        id: string;
        channelID: string;
        channel: GuildChannel | null;
        author: User | null;
        content: string;
        timestamp: string;
        editedTimestamp: string | null;
        tts: boolean;
        mentionEveryone: boolean;
        mentions: User[];
        mentionRoles: Role[];
        mentionChannels: GuildChannel[] | null;
        attachments: Attachment[];
        embeds: Embed[];
        reactions: Reaction[] | null;
        nonce: string | number | null;
        pinned: boolean;
        webhookID: string | null;
        type: number;
        activity: any | null;
        application: any | null;
        applicationID: string | null;
        flags: number | null;
        messageReference: any;
        referencedMessage: Message | null;
        interactionMetadata: any;
        interaction: Interaction | null;
        thread: GuildChannel | null;
        components: any[];
        stickerItems: any[];
        stickers: Sticker[];
        position: number | null;
        roleSubscriptionData: any | null;
        resolved: any | null;
        poll: any | null;
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
declare module "structures/voiceState" {
    import { Client } from "client";
    import { GuildChannel } from "structures/guildChannel";
    import { Member } from "structures/member";
    /**
     * Represents the voice state of a user in a guild's voice channel.
     */
    export class VoiceState {
        private _client;
        guildID?: string;
        channelID?: string;
        channel?: GuildChannel | null;
        userID: string;
        member?: Member;
        sessionID: string;
        deaf: boolean;
        mute: boolean;
        selfDeaf: boolean;
        selfMute: boolean;
        selfStream?: boolean;
        selfVideo: boolean;
        suppress: boolean;
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
        guildId: string;
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
declare module "structures/commandInteraction" {
    import { Client } from "client";
    import { Interaction } from "structures/interaction";
    /**
     * Represents a command-based (slash command) interaction.
     */
    export class CommandInteraction extends Interaction {
        commandName: string;
        commandId: string;
        options?: any;
        /**
         * Creates a new CommandInteraction.
         * @param {Client} client - The client instance.
         * @param {any} data - The raw interaction data.
         */
        constructor(client: Client, data: any);
        /**
         * Updates the specific command-related fields.
         * @param {any} data - The data object from the API.
         */
        private _updateCommandData;
        /**
         * Convenience method for getting a specific option by name.
         * @param {string} name - The name of the option to retrieve.
         * @returns The matching option or undefined.
         */
        getOption(name: string): any | undefined;
    }
}
declare module "structures/messageComponentInteraction" {
    import { Client } from "client";
    import { Interaction } from "structures/interaction";
    /**
     * Represents a message component interaction (buttons, select menus).
     */
    export class MessageComponentInteraction extends Interaction {
        customId: string;
        componentType: number;
        values?: string[];
        constructor(client: Client, data: any);
        private _updateComponentData;
    }
}
declare module "structures/autocompleteInteraction" {
    import { Client } from "client";
    import { Interaction } from "structures/interaction";
    export class AutocompleteInteraction extends Interaction {
        commandName: string;
        commandId: string;
        focusedOptionName?: string;
        options?: Array<any>;
        constructor(client: Client, data: any);
        private _updateAutocompleteData;
    }
}
declare module "structures/modalSubmitInteraction" {
    import { Client } from "client";
    import { Interaction } from "structures/interaction";
    /**
     * Represents a modal submit interaction.
     */
    export class ModalSubmitInteraction extends Interaction {
        customId: string;
        components?: any[];
        constructor(client: Client, data: any);
        private _updateModalData;
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
        private _registerEvent;
        /**
         * Helper function to check if a string is valid JSON.
         *
         * @param {string} data - The string to check for valid JSON format.
         * @returns {boolean} Returns true if the string is a valid JSON object or array, otherwise false.
         */
        isJson(data: string): boolean;
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
declare module "structures/applicationCommand" {
    import { Client } from "client";
    export class ApplicationCommand {
        private _client;
        id: string;
        application_id: string;
        name: string;
        name_localizations?: {
            [key: string]: string;
        };
        description: string;
        description_localizations?: {
            [key: string]: string;
        };
        options?: Array<object>;
        default_member_permissions?: string;
        dm_permission?: boolean;
        default_permission?: boolean;
        nsfw: boolean;
        integration_types?: Array<string>;
        contexts?: Array<string>;
        version: string;
        constructor(client: Client, data: any);
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
declare module "clientEvents" {
    import { Guild } from "structures/guild";
    import { GuildBan } from "structures/guildBan";
    import { GuildChannel } from "structures/guildChannel";
    import { Interaction } from "structures/interaction";
    import { Member } from "structures/member";
    import { Message } from "structures/message";
    import { Reaction } from "structures/reaction";
    import { Role } from "structures/role";
    import { VoiceState } from "structures/voiceState";
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
}
declare module "client" {
    import { EventEmitter } from "events";
    import { Guild } from "structures/guild";
    import { RestApi } from "rest/request";
    import { WebSocketClient } from "ws/websocket";
    import { Role } from "structures/role";
    import { GuildChannel } from "structures/guildChannel";
    import { Member } from "structures/member";
    import { Collection } from "utils/collection";
    import { User } from "structures/user";
    import { ApplicationCommand } from "structures/applicationCommand";
    import { CommandPayload } from "structures/commandPayload";
    import { ClientEvents } from "clientEvents";
    /**
     * Represents the main client for interacting with the API and WebSocket.
     * Extends the EventEmitter to handle events.
     */
    export class Client extends EventEmitter {
        ws: WebSocketClient;
        rest: RestApi;
        user?: User;
        guild?: Guild;
        channels?: Collection<GuildChannel> | undefined;
        members?: Collection<Member> | undefined;
        roles?: Collection<Role> | undefined;
        commands?: Collection<ApplicationCommand> | undefined;
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
        /**
          * Registers a new application command.
          * @param {CommandPayload | object} options - The command creation options.
          * @returns {Promise<ApplicationCommand>} The registered application command.
          */
        registerCommand(options: CommandPayload): Promise<ApplicationCommand>;
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
    export { GuildPayload } from "structures/guildPayload";
    export { InvitePayload } from "structures/invitePayload";
    export { Invite } from "structures/invite";
    export { Application } from "structures/application";
    export { ApplicationCommand } from "structures/applicationCommand";
    export { Attachment } from "structures/attachment";
    export { Embed, EmbedFooter, EmbedAuthor, EmbedImage, EmbedThumbnail, EmbedVideo, EmbedField, EmbedProvider } from "structures/embed";
    export { Guild } from "structures/guild";
    export { GuildBan } from "structures/guildBan";
    export { GuildChannel } from "structures/guildChannel";
    export { Interaction } from "structures/interaction";
    export { AutocompleteInteraction } from "structures/autocompleteInteraction";
    export { ModalSubmitInteraction } from "structures/modalSubmitInteraction";
    export { CommandInteraction } from "structures/commandInteraction";
    export { MessageComponentInteraction } from "structures/messageComponentInteraction";
    export { Emoji } from "structures/emoji";
    export { Member } from "structures/member";
    export { Message } from "structures/message";
    export { Reaction } from "structures/reaction";
    export { Role } from "structures/role";
    export { Sticker } from "structures/sticker";
    export { User } from "structures/user";
    export { VoiceState } from "structures/voiceState";
    export { Client } from "client";
    export { ClientEvents } from "clientEvents";
    export { Collection } from "utils/collection";
    export { RestApi } from "rest/request";
    export { apiEndpoints } from "rest/endpoints";
    export { WebSocketClient } from "ws/websocket";
}
//# sourceMappingURL=index.d.ts.map
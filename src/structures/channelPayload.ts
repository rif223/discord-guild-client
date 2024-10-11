/**
 * Represents the payload for creating or updating a Discord channel.
 * This class encapsulates all the parameters needed to create or update a channel in Discord.
 */
export class ChannelPayload {
    private _name?: string;
    private _type?: number;
    private _topic?: string;
    private _bitrate?: number;
    private _userLimit?: number;
    private _rateLimitPerUser?: number;
    private _position?: number;
    private _permissionOverwrites?: any[];
    private _parentId?: string;
    private _nsfw?: boolean;
    private _rtcRegion?: string;
    private _videoQualityMode?: number;
    private _defaultAutoArchiveDuration?: number;
    private _defaultReactionEmoji?: any;
    private _availableTags?: any[];
    private _defaultSortOrder?: number;
    private _defaultForumLayout?: number;
    private _defaultThreadRateLimitPerUser?: number;

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
    }) {
        if (data) {
            this._name = data.name;
            this._type = data.type;
            this._topic = data.topic;
            this._bitrate = data.bitrate;
            this._userLimit = data.user_limit;
            this._rateLimitPerUser = data.rate_limit_per_user;
            this._position = data.position;
            this._permissionOverwrites = data.permission_overwrites;
            this._parentId = data.parent_id;
            this._nsfw = data.nsfw;
            this._rtcRegion = data.rtc_region;
            this._videoQualityMode = data.video_quality_mode;
            this._defaultAutoArchiveDuration = data.default_auto_archive_duration;
            this._defaultReactionEmoji = data.default_reaction_emoji;
            this._availableTags = data.available_tags;
            this._defaultSortOrder = data.default_sort_order;
            this._defaultForumLayout = data.default_forum_layout;
            this._defaultThreadRateLimitPerUser = data.default_thread_rate_limit_per_user;
        }
    }

    /**
     * Gets the name of the channel.
     * @returns The channel name.
     */
    get name() {
        return this._name;
    }

    /**
     * Sets the name of the channel.
     * @param value The name of the channel. Must be between 1 and 100 characters.
     * @throws Error if the name is not between 1 and 100 characters.
     */
    set name(value: string | undefined) {
        if (value && (value.length < 1 || value.length > 100)) {
            throw new Error("Name must be between 1 and 100 characters.");
        }
        this._name = value;
    }

    /**
     * Gets the type of the channel.
     * @returns The channel type.
     */
    get type() {
        return this._type;
    }

    /**
     * Sets the type of the channel.
     * @param value The type of the channel.
     */
    set type(value: number | undefined) {
        this._type = value;
    }

    /**
     * Gets the topic of the channel.
     * @returns The channel topic.
     */
    get topic() {
        return this._topic;
    }

    /**
     * Sets the topic of the channel.
     * @param value The topic of the channel. Must be up to 1024 characters.
     * @throws Error if the topic exceeds 1024 characters.
     */
    set topic(value: string | undefined) {
        if (value && value.length > 1024) {
            throw new Error("Topic must be up to 1024 characters.");
        }
        this._topic = value;
    }

    /**
     * Gets the bitrate of the voice channel.
     * @returns The bitrate value.
     */
    get bitrate() {
        return this._bitrate;
    }

    /**
     * Sets the bitrate of the voice channel.
     * @param value The bitrate value.
     */
    set bitrate(value: number | undefined) {
        this._bitrate = value;
    }

    /**
     * Gets the user limit for a voice channel.
     * @returns The user limit value.
     */
    get userLimit() {
        return this._userLimit;
    }

    /**
     * Sets the user limit for a voice channel.
     * @param value The user limit.
     */
    set userLimit(value: number | undefined) {
        this._userLimit = value;
    }

    /**
     * Gets the rate limit per user for a text channel.
     * @returns The rate limit in seconds.
     */
    get rateLimitPerUser() {
        return this._rateLimitPerUser;
    }

    /**
     * Sets the rate limit per user for a text channel.
     * @param value The rate limit in seconds (0 to 21600).
     * @throws Error if the value is out of range.
     */
    set rateLimitPerUser(value: number | undefined) {
        if (value && (value < 0 || value > 21600)) {
            throw new Error("Rate limit must be between 0 and 21600 seconds.");
        }
        this._rateLimitPerUser = value;
    }

    /**
     * Gets the position of the channel.
     * @returns The channel position.
     */
    get position() {
        return this._position;
    }

    /**
     * Sets the position of the channel.
     * @param value The channel position.
     */
    set position(value: number | undefined) {
        this._position = value;
    }

    /**
     * Gets the permission overwrites for the channel.
     * @returns An array of permission overwrites.
     */
    get permissionOverwrites() {
        return this._permissionOverwrites;
    }

    /**
     * Sets the permission overwrites for the channel.
     * @param value An array of permission overwrites.
     */
    set permissionOverwrites(value: any[] | undefined) {
        this._permissionOverwrites = value;
    }

    /**
     * Gets the parent ID of the channel (for categories).
     * @returns The parent channel ID.
     */
    get parentId() {
        return this._parentId;
    }

    /**
     * Sets the parent ID of the channel (for categories).
     * @param value The parent channel ID.
     */
    set parentId(value: string | undefined) {
        this._parentId = value;
    }

    /**
     * Gets the NSFW status of the channel.
     * @returns True if the channel is NSFW.
     */
    get nsfw() {
        return this._nsfw;
    }

    /**
     * Sets the NSFW status of the channel.
     * @param value True if the channel should be marked NSFW.
     */
    set nsfw(value: boolean | undefined) {
        this._nsfw = value;
    }

    /**
     * Gets the RTC region for a voice channel.
     * @returns The RTC region value.
     */
    get rtcRegion() {
        return this._rtcRegion;
    }

    /**
     * Sets the RTC region for a voice channel.
     * @param value The RTC region value.
     */
    set rtcRegion(value: string | undefined) {
        this._rtcRegion = value;
    }

    /**
     * Gets the video quality mode for a voice channel.
     * @returns The video quality mode.
     */
    get videoQualityMode() {
        return this._videoQualityMode;
    }

    /**
     * Sets the video quality mode for a voice channel.
     * @param value The video quality mode.
     */
    set videoQualityMode(value: number | undefined) {
        this._videoQualityMode = value;
    }

    /**
     * Gets the default auto-archive duration for threads in the channel.
     * @returns The default auto-archive duration in minutes.
     */
    get defaultAutoArchiveDuration() {
        return this._defaultAutoArchiveDuration;
    }

    /**
     * Sets the default auto-archive duration for threads in the channel.
     * @param value The auto-archive duration in minutes.
     */
    set defaultAutoArchiveDuration(value: number | undefined) {
        this._defaultAutoArchiveDuration = value;
    }

    /**
     * Gets the default reaction emoji for messages in the channel.
     * @returns The default reaction emoji object.
     */
    get defaultReactionEmoji() {
        return this._defaultReactionEmoji;
    }

    /**
     * Sets the default reaction emoji for messages in the channel.
     * @param value The default reaction emoji object.
     */
    set defaultReactionEmoji(value: any | undefined) {
        this._defaultReactionEmoji = value;
    }

    /**
     * Gets the available tags for the channel.
     * @returns An array of tags.
     */
    get availableTags() {
        return this._availableTags;
    }

    /**
     * Sets the available tags for the channel.
     * @param value An array of tags.
     */
    set availableTags(value: any[] | undefined) {
        this._availableTags = value;
    }

    /**
     * Gets the default sort order for forum posts.
     * @returns The default sort order.
     */
    get defaultSortOrder() {
        return this._defaultSortOrder;
    }

    /**
     * Sets the default sort order for forum posts.
     * @param value The default sort order.
     */
    set defaultSortOrder(value: number | undefined) {
        this._defaultSortOrder = value;
    }

    /**
     * Gets the default forum layout for the channel.
     * @returns The default forum layout.
     */
    get defaultForumLayout() {
        return this._defaultForumLayout;
    }

    /**
     * Sets the default forum layout for the channel.
     * @param value The default forum layout.
     */
    set defaultForumLayout(value: number | undefined) {
        this._defaultForumLayout = value;
    }

    /**
     * Gets the default rate limit for threads in the channel.
     * @returns The rate limit in seconds.
     */
    get defaultThreadRateLimitPerUser() {
        return this._defaultThreadRateLimitPerUser;
    }

    /**
     * Sets the default rate limit for threads in the channel.
     * @param value The rate limit in seconds.
     */
    set defaultThreadRateLimitPerUser(value: number | undefined) {
        this._defaultThreadRateLimitPerUser = value;
    }

    /**
     * Converts the payload to a JSON-serializable object.
     * @returns A JSON-serializable representation of the payload.
     */
    toJSON() {
        const result: any = {};
        if (this._name !== undefined) result.name = this._name;
        if (this._type !== undefined) result.type = this._type;
        if (this._topic !== undefined) result.topic = this._topic;
        if (this._bitrate !== undefined) result.bitrate = this._bitrate;
        if (this._userLimit !== undefined) result.user_limit = this._userLimit;
        if (this._rateLimitPerUser !== undefined) result.rate_limit_per_user = this._rateLimitPerUser;
        if (this._position !== undefined) result.position = this._position;
        if (this._permissionOverwrites !== undefined) result.permission_overwrites = this._permissionOverwrites;
        if (this._parentId !== undefined) result.parent_id = this._parentId;
        if (this._nsfw !== undefined) result.nsfw = this._nsfw;
        if (this._rtcRegion !== undefined) result.rtc_region = this._rtcRegion;
        if (this._videoQualityMode !== undefined) result.video_quality_mode = this._videoQualityMode;
        if (this._defaultAutoArchiveDuration !== undefined) result.default_auto_archive_duration = this._defaultAutoArchiveDuration;
        if (this._defaultReactionEmoji !== undefined) result.default_reaction_emoji = this._defaultReactionEmoji;
        if (this._availableTags !== undefined) result.available_tags = this._availableTags;
        if (this._defaultSortOrder !== undefined) result.default_sort_order = this._defaultSortOrder;
        if (this._defaultForumLayout !== undefined) result.default_forum_layout = this._defaultForumLayout;
        if (this._defaultThreadRateLimitPerUser !== undefined) result.default_thread_rate_limit_per_user = this._defaultThreadRateLimitPerUser;
        return result;
    }
}

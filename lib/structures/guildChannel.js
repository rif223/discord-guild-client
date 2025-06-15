import { apiEndpoints } from "../rest/endpoints.js";
import { RestApi } from "../rest/request.js";
import { ChannelPayload } from "./channelPayload.js";
import { Invite } from "./invite.js";
import { InvitePayload } from "./invitePayload.js";
import { Member } from "./member.js";
import { Message } from "./message.js";
import { MessagePayload } from "./messagePayload.js";
/**
 * Represents a Discord guild channel.
 */
export class GuildChannel {
  videoQualityMode = 1;
  /**
   * Constructs a new GuildChannel object.
   * @param {Client} client - The client instance managing this channel.
   * @param {any} data - The raw data from the API representing the channel.
   */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the channel's properties with the provided data.
   * @param {Object} data - The data object containing channel information.
   */
  _update(data) {
    /**
     * The unique ID of this channel.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The type of the channel.
     * @type {number}
     */
    this.type = data.type;

    /**
     * The ID of the guild this channel belongs to, if applicable.
     * @type {?string}
     */
    this.guildId = data.guild_id ?? null;

    /**
     * The sorting position of the channel. Channels with the same position are sorted by ID.
     * @type {?number}
     */
    this.position = data.position ?? null;

    /**
     * Explicit permission overwrites for members and roles.
     * @type {?any[]}
     */
    this.permissionOverwrites = data.permission_overwrites ?? null;

    /**
     * The name of the channel (1-100 characters).
     * @type {?string}
     */
    this.name = data.name ?? null;

    /**
     * The channel topic (0-4096 characters for GUILD_FORUM and GUILD_MEDIA channels, 0-1024 characters for all others).
     * @type {?string}
     */
    this.topic = data.topic ?? null;

    /**
     * Whether the channel is NSFW (Not Safe For Work).
     * @type {boolean}
     */
    this.nsfw = data.nsfw;

    /**
     * The ID of the last message sent in this channel (or thread for GUILD_FORUM or GUILD_MEDIA channels). May not point to an existing or valid message or thread.
     * @type {?string}
     */
    this.lastMessageId = data.last_message_id ?? null;

    /**
     * The bitrate (in bits) of the voice channel.
     * @type {?number}
     */
    this.bitrate = data.bitrate ?? null;

    /**
     * The user limit of the voice channel.
     * @type {?number}
     */
    this.userLimit = data.user_limit ?? null;

    /**
     * The amount of seconds a user must wait before sending another message (0-21600); bots and users with permission to manage messages or channels are unaffected.
     * @type {?number}
     */
    this.rateLimitPerUser = data.rate_limit_per_user ?? null;

    /**
     * The recipients of the DM (Direct Message) channel.
     * @type {?any[]}
     */
    this.recipients = data.recipients ?? null;

    /**
     * The icon hash of the group DM.
     * @type {?string}
     */
    this.icon = data.icon ?? null;

    /**
     * The ID of the creator of the group DM or thread.
     * @type {?string}
     */
    this.ownerId = data.owner_id ?? null;

    /**
     * The application ID of the group DM creator if it is bot-created.
     * @type {?string}
     */
    this.applicationId = data.application_id ?? null;

    /**
     * Whether the channel is managed by an application via the `gdm.join` OAuth2 scope for group DM channels.
     * @type {?boolean}
     */
    this.managed = data.managed ?? null;

    /**
     * The ID of the parent category for a guild channel, or the ID of the text channel this thread was created from.
     * @type {?string}
     */
    this.parentId = data.parent_id ?? null;

    /**
     * When the last pinned message was pinned. This may be null in events such as `GUILD_CREATE` when a message is not pinned.
     * @type {?string}
     */
    this.lastPinTimestamp = data.last_pin_timestamp ?? null;

    /**
     * The voice region ID for the voice channel. Automatic when set to null.
     * @type {?string}
     */
    this.rtcRegion = data.rtc_region ?? null;

    /**
     * The camera video quality mode of the voice channel. Defaults to 1 when not present.
     * @type {number}
     */
    this.videoQualityMode = data.video_quality_mode ?? 1;

    /**
     * The number of messages (not including the initial message or deleted messages) in a thread.
     * @type {?number}
     */
    this.messageCount = data.message_count ?? null;

    /**
     * An approximate count of users in a thread. Stops counting at 50.
     * @type {number}
     */
    this.memberCount = data.member_count;

    /**
     * Thread-specific fields not needed by other channels.
     * @type {?any}
     */
    this.threadMetadata = data.thread_metadata ?? null;

    /**
     * The thread member object for the current user, if they have joined the thread. Only included on certain API endpoints.
     * @type {?Member}
     */
    this.member = data.member ? new Member(this._client, data.member) : undefined;

    /**
     * The default duration (in minutes) for newly created threads. Threads will stop showing in the channel list after the specified period of inactivity.
     * Can be set to: 60, 1440, 4320, 10080.
     * @type {number}
     */
    this.defaultAutoArchiveDuration = data.default_auto_archive_duration;

    /**
     * Computed permissions for the invoking user in the channel, including overwrites. Only included when part of the resolved data received on a slash command interaction.
     * This does not include implicit permissions, which may need to be checked separately.
     * @type {?string}
     */
    this.permissions = data.permissions ?? null;

    /**
     * The combined channel flags as a bitfield.
     * @type {number}
     */
    this.flags = data.flags;

    /**
     * The number of messages ever sent in a thread. Similar to `messageCount` but will not decrement when a message is deleted.
     * @type {?number}
     */
    this.totalMessageSent = data.total_message_sent ?? null;

    /**
     * The set of tags that can be used in a GUILD_FORUM or GUILD_MEDIA channel.
     * @type {?any[]}
     */
    this.availableTags = data.available_tags ?? null;

    /**
     * The IDs of the set of tags that have been applied to a thread in a GUILD_FORUM or GUILD_MEDIA channel.
     * @type {?string[]}
     */
    this.appliedTags = data.applied_tags ?? null;

    /**
     * The emoji to show in the add reaction button on a thread in a GUILD_FORUM or GUILD_MEDIA channel.
     * @type {?any}
     */
    this.defaultReactionEmoji = data.default_reaction_emoji ?? null;

    /**
     * The initial rate_limit_per_user to set on newly created threads in a channel. This field is copied to the thread at creation time and does not live update.
     * @type {number}
     */
    this.defaultThreadRateLimitPerUser = data.default_thread_rate_limit_per_user;

    /**
     * The default sort order type used to order posts in GUILD_FORUM and GUILD_MEDIA channels. Defaults to null, indicating that a preferred sort order hasn't been set by a channel admin.
     * @type {?number}
     */
    this.defaultSortOrder = data.default_sort_order ?? null;

    /**
     * The default forum layout view used to display posts in GUILD_FORUM channels. Defaults to 0, indicating that a layout view has not been set by a channel admin.
     * @type {number}
     */
    this.defaultForumLayout = data.default_forum_layout;
  }

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
  async sendMessage(options) {
    let messagePayload;

    // Check if the options are already a MessagePayload object
    if (options instanceof MessagePayload) {
      messagePayload = options;
    } else {
      messagePayload = new MessagePayload(options);
    }

    // Resolve the message data and files
    options = await messagePayload.resolveFiles();
    try {
      // Send the message to the channel
      const data = await this._client.rest.request(RestApi.HttpMethod.POST, apiEndpoints.guildChannelMessages(this.id), options);
      return new Message(this._client, data);
    } catch (error) {
      console.error("Failed to send message:", error); // Log the error
      throw error; // Re-throw the error for higher-level handling
    }
  }

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
  async create(options) {
    let channelPayload;

    // Check if the options are already a ChannelPayload object
    if (options instanceof ChannelPayload) {
      channelPayload = options;
    } else {
      channelPayload = new ChannelPayload(options);
    }

    // Validate required fields
    if (!channelPayload.name || channelPayload.name.length < 1 || channelPayload.name.length > 100) {
      throw new Error('Channel name must be between 1 and 100 characters.');
    }

    // Prepare the payload for the API request
    const payload = channelPayload.toJSON();
    try {
      // Call the API to create the channel
      const data = await this._client.rest.request(RestApi.HttpMethod.POST, apiEndpoints.guildChannels(), payload);
      return new GuildChannel(this._client, data); // Assuming `Channel` is a class representing the created channel
    } catch (error) {
      console.error("Failed to create channel:", error); // Log the error
      throw error; // Re-throw the error for higher-level handling
    }
  }

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
  async edit(options) {
    let channelPayload;

    // Check if the options are already a ChannelPayload object
    if (options instanceof ChannelPayload) {
      channelPayload = options;
    } else {
      channelPayload = new ChannelPayload(options);
    }

    // Validate required fields
    if (channelPayload.name && (channelPayload.name.length < 1 || channelPayload.name.length > 100)) {
      throw new Error('Channel name must be between 1 and 100 characters.');
    }

    // Prepare the payload for the API request
    const payload = channelPayload.toJSON();
    try {
      // Call the API to edit the channel
      const data = await this._client.rest.request(RestApi.HttpMethod.PATCH, apiEndpoints.guildChannel(this.id), payload);
      return new GuildChannel(this._client, data);
    } catch (error) {
      console.error("Failed to edit channel:", error); // Log the error
      throw error; // Re-throw the error for higher-level handling
    }
  }

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
  delete() {
    return this._client.rest.request(RestApi.HttpMethod.DELETE, apiEndpoints.guildChannel(this.id));
  }

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
  async createInvite(options) {
    let invitePayload;

    // Check if the options are already a InvitePayload object
    if (options instanceof InvitePayload) {
      invitePayload = options;
    } else {
      invitePayload = new InvitePayload(options);
    }

    // Prepare the payload for the API request
    const payload = invitePayload.toJSON();
    try {
      const data = await this._client.rest.request(RestApi.HttpMethod.POST, apiEndpoints.guildChannelInvites(this.id), payload);
      return new Invite(this._client, data);
    } catch (error) {
      console.error(`Failed to create invite for channel ${this.id}:`, error);
      throw error;
    }
  }

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
  async getInvites() {
    try {
      const data = await this._client.rest.request(RestApi.HttpMethod.GET, apiEndpoints.guildChannelInvites(this.id));
      return data.map(inviteData => new Invite(this._client, inviteData));
    } catch (error) {
      console.error(`Failed to fetch invites for channel ${this.id}:`, error);
      throw error;
    }
  }
}
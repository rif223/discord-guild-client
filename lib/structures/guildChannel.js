import { apiEndpoints } from "../rest/endpoints.js";
import { RestApi } from "../rest/request.js";
import { ChannelPayload } from "./channelPayload.js";
import { Member } from "./member.js";
import { Message } from "./message.js";
import { MessagePayload } from "./messagePayload.js";
/**
 * Represents a Discord guild channel.
 */
export class GuildChannel {
  /**
   * The unique ID of this channel.
   * @type {string}
   */

  /**
   * The type of the channel.
   * @type {number}
   */

  /**
   * The ID of the guild this channel belongs to, if applicable.
   * @type {?string}
   */

  /**
   * The sorting position of the channel. Channels with the same position are sorted by ID.
   * @type {?number}
   */

  /**
   * Explicit permission overwrites for members and roles.
   * @type {?any[]}
   */

  /**
   * The name of the channel (1-100 characters).
   * @type {?string}
   */

  /**
   * The channel topic (0-4096 characters for GUILD_FORUM and GUILD_MEDIA channels, 0-1024 characters for all others).
   * @type {?string}
   */

  /**
   * Whether the channel is NSFW (Not Safe For Work).
   * @type {boolean}
   */

  /**
   * The ID of the last message sent in this channel (or thread for GUILD_FORUM or GUILD_MEDIA channels). May not point to an existing or valid message or thread.
   * @type {?string}
   */

  /**
   * The bitrate (in bits) of the voice channel.
   * @type {?number}
   */

  /**
   * The user limit of the voice channel.
   * @type {?number}
   */

  /**
   * The amount of seconds a user must wait before sending another message (0-21600); bots and users with permission to manage messages or channels are unaffected.
   * @type {?number}
   */

  /**
   * The recipients of the DM (Direct Message) channel.
   * @type {?any[]}
   */

  /**
   * The icon hash of the group DM.
   * @type {?string}
   */

  /**
   * The ID of the creator of the group DM or thread.
   * @type {?string}
   */

  /**
   * The application ID of the group DM creator if it is bot-created.
   * @type {?string}
   */

  /**
   * Whether the channel is managed by an application via the `gdm.join` OAuth2 scope for group DM channels.
   * @type {?boolean}
   */

  /**
   * The ID of the parent category for a guild channel, or the ID of the text channel this thread was created from.
   * @type {?string}
   */

  /**
   * When the last pinned message was pinned. This may be null in events such as `GUILD_CREATE` when a message is not pinned.
   * @type {?string}
   */

  /**
   * The voice region ID for the voice channel. Automatic when set to null.
   * @type {?string}
   */

  /**
   * The camera video quality mode of the voice channel. Defaults to 1 when not present.
   * @type {number}
   */
  videoQualityMode = 1;

  /**
   * The number of messages (not including the initial message or deleted messages) in a thread.
   * @type {?number}
   */

  /**
   * An approximate count of users in a thread. Stops counting at 50.
   * @type {number}
   */

  /**
   * Thread-specific fields not needed by other channels.
   * @type {?any}
   */

  /**
   * The thread member object for the current user, if they have joined the thread. Only included on certain API endpoints.
   * @type {?Member}
   */

  /**
   * The default duration (in minutes) for newly created threads. Threads will stop showing in the channel list after the specified period of inactivity.
   * Can be set to: 60, 1440, 4320, 10080.
   * @type {number}
   */

  /**
   * Computed permissions for the invoking user in the channel, including overwrites. Only included when part of the resolved data received on a slash command interaction.
   * This does not include implicit permissions, which may need to be checked separately.
   * @type {?string}
   */

  /**
   * The combined channel flags as a bitfield.
   * @type {number}
   */

  /**
   * The number of messages ever sent in a thread. Similar to `messageCount` but will not decrement when a message is deleted.
   * @type {?number}
   */

  /**
   * The set of tags that can be used in a GUILD_FORUM or GUILD_MEDIA channel.
   * @type {?any[]}
   */

  /**
   * The IDs of the set of tags that have been applied to a thread in a GUILD_FORUM or GUILD_MEDIA channel.
   * @type {?string[]}
   */

  /**
   * The emoji to show in the add reaction button on a thread in a GUILD_FORUM or GUILD_MEDIA channel.
   * @type {?any}
   */

  /**
   * The initial rate_limit_per_user to set on newly created threads in a channel. This field is copied to the thread at creation time and does not live update.
   * @type {number}
   */

  /**
   * The default sort order type used to order posts in GUILD_FORUM and GUILD_MEDIA channels. Defaults to null, indicating that a preferred sort order hasn't been set by a channel admin.
   * @type {?number}
   */

  /**
   * The default forum layout view used to display posts in GUILD_FORUM channels. Defaults to 0, indicating that a layout view has not been set by a channel admin.
   * @type {number}
   */

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
    if (data.id !== undefined) this.id = data.id;
    if (data.type !== undefined) this.type = data.type;
    if (data.guild_id !== undefined) this.guildId = data.guild_id ?? null;
    if (data.position !== undefined) this.position = data.position ?? null;
    if (data.permission_overwrites !== undefined) this.permissionOverwrites = data.permission_overwrites ?? null;
    if (data.name !== undefined) this.name = data.name ?? null;
    if (data.topic !== undefined) this.topic = data.topic ?? null;
    if (data.nsfw !== undefined) this.nsfw = data.nsfw;
    if (data.last_message_id !== undefined) this.lastMessageId = data.last_message_id ?? null;
    if (data.bitrate !== undefined) this.bitrate = data.bitrate ?? null;
    if (data.user_limit !== undefined) this.userLimit = data.user_limit ?? null;
    if (data.rate_limit_per_user !== undefined) this.rateLimitPerUser = data.rate_limit_per_user ?? null;
    if (data.recipients !== undefined) this.recipients = data.recipients ?? null;
    if (data.icon !== undefined) this.icon = data.icon ?? null;
    if (data.owner_id !== undefined) this.ownerId = data.owner_id ?? null;
    if (data.application_id !== undefined) this.applicationId = data.application_id ?? null;
    if (data.managed !== undefined) this.managed = data.managed ?? null;
    if (data.parent_id !== undefined) this.parentId = data.parent_id ?? null;
    if (data.last_pin_timestamp !== undefined) this.lastPinTimestamp = data.last_pin_timestamp ?? null;
    if (data.rtc_region !== undefined) this.rtcRegion = data.rtc_region ?? null;
    if (data.video_quality_mode !== undefined) this.videoQualityMode = data.video_quality_mode ?? 1;
    if (data.message_count !== undefined) this.messageCount = data.message_count ?? null;
    if (data.member_count !== undefined) this.memberCount = data.member_count;
    if (data.thread_metadata !== undefined) this.threadMetadata = data.thread_metadata ?? null;
    if (data.member !== undefined) this.member = data.member ? new Member(this._client, data.member) : undefined;
    if (data.default_auto_archive_duration !== undefined) this.defaultAutoArchiveDuration = data.default_auto_archive_duration;
    if (data.permissions !== undefined) this.permissions = data.permissions ?? null;
    if (data.flags !== undefined) this.flags = data.flags;
    if (data.total_message_sent !== undefined) this.totalMessageSent = data.total_message_sent ?? null;
    if (data.available_tags !== undefined) this.availableTags = data.available_tags ?? null;
    if (data.applied_tags !== undefined) this.appliedTags = data.applied_tags ?? null;
    if (data.default_reaction_emoji !== undefined) this.defaultReactionEmoji = data.default_reaction_emoji ?? null;
    if (data.default_thread_rate_limit_per_user !== undefined) this.defaultThreadRateLimitPerUser = data.default_thread_rate_limit_per_user;
    if (data.default_sort_order !== undefined) this.defaultSortOrder = data.default_sort_order ?? null;
    if (data.default_forum_layout !== undefined) this.defaultForumLayout = data.default_forum_layout;
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
}
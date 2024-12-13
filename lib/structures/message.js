import { User } from "./user.js";
import { Attachment } from "./attachment.js";
import { Embed } from "./embed.js";
import { Reaction } from "./reaction.js";
import { GuildChannel } from "./guildChannel.js";
import { Interaction } from "./interaction.js";
import { RestApi } from "../rest/request.js";
import { apiEndpoints } from "../rest/endpoints.js";
/**
 * Represents a message in a channel.
 */
export class Message {
  /**
   * The unique ID of the message.
   * @type {string}
   */

  /**
   * The unique ID of the channel where the message was sent.
   * @type {string}
   */

  /**
   * The channel object where the message was sent.
   * @type {GuildChannel | null}
   */

  /**
   * The author of the message (not guaranteed to be a valid user).
   * @type {User | null}
   */

  /**
   * The content of the message.
   * @type {string}
   */

  /**
   * The timestamp of when the message was sent (ISO8601 format).
   * @type {string}
   */

  /**
   * The timestamp of when the message was last edited, or `null` if never edited.
   * @type {string | null}
   */

  /**
   * Whether the message was text-to-speech.
   * @type {boolean}
   */

  /**
   * Whether the message mentioned everyone.
   * @type {boolean}
   */

  /**
   * Users specifically mentioned in the message.
   * @type {User[]}
   */

  /**
   * Roles specifically mentioned in the message.
   * @type {Role[]}
   */

  /**
   * Channels specifically mentioned in the message.
   * @type {Channel[] | null}
   */

  /**
   * Any attached files.
   * @type {Attachment[]}
   */

  /**
   * Any embedded content.
   * @type {Embed[]}
   */

  /**
   * Reactions to the message.
   * @type {Reaction[] | null}
   */

  /**
   * A nonce value to validate message sending.
   * @type {string | number | null}
   */

  /**
   * Whether the message is pinned in the channel.
   * @type {boolean}
   */

  /**
   * The ID of the webhook that sent the message, if applicable.
   * @type {string | null}
   */

  /**
   * The type of the message.
   * @type {number}
   */

  /**
   * Activity related to the message, such as Rich Presence.
   * @type {any | null}
   */

  /**
   * Application data associated with the message.
   * @type {any | null}
   */

  /**
   * The application ID if the message is associated with an application.
   * @type {string | null}
   */

  /**
   * Bitfield flags for the message.
   * @type {number | null}
   */

  /**
   * Data showing the source of a crosspost, channel follow add, pin, or reply message.
   * @type {any}
   */

  /**
   * The message object associated with the message reference, if any.
   * @type {Message | null}
   */

  /**
   * Metadata about any interaction associated with the message.
   * @type {any}
   */

  /**
   * Deprecated interaction object (use interactionMetadata instead).
   * @type {Interaction | null}
   * @deprecated
   */

  /**
   * The thread started by this message, if applicable.
   * @type {GuildChannel | null}
   */

  /**
   * Interactive components (buttons, select menus, etc.) attached to the message.
   * @type {any[]}
   */

  /**
   * Sticker items included with the message.
   * @type {any[]}
   */

  /**
   * Deprecated sticker field. Use `stickerItems` instead.
   * @type {any[]}
   * @deprecated
   */

  /**
   * Represents the approximate position of the message in a thread.
   * @type {number | null}
   */

  /**
   * Role subscription data related to the message, if applicable.
   * @type {any | null}
   */

  /**
   * Data for users, members, channels, and roles in the message's auto-populated select menus.
   * @type {any | null}
   */

  /**
   * Poll data associated with the message, if applicable.
   * @type {any | null}
   */

  /**
   * Call data associated with the message, if applicable.
   * @type {any | null}
   */

  /**
   * Constructs a new Message object.
   * @param {Client} client - The client instance managing this message.
   * @param {any} data - The raw data representing the message.
   */
  constructor(client, data) {
    this._client = client;
    if (data && data.channel_id) {
      this.channel = this._client.channels?.get(data.channel_id) || null;
    } else {
      console.error("Invalid data received for Message:", data);
    }
    this._update(data);
  }

  /**
   * Updates the message properties with the provided data.
   * @param {any} data - The data object containing message information.
   */
  _update(data) {
    this.id = data.id;
    this.channelID = data.channel_id;
    this.author = data.author ? new User(this._client, data.author) : null;
    this.content = data.content || "";
    this.timestamp = data.timestamp;
    this.editedTimestamp = data.edited_timestamp || null;
    this.tts = data.tts || false;
    this.mentionEveryone = data.mention_everyone || false;
    this.mentions = data.mentions || [];
    this.mentionRoles = data.mention_roles || [];
    this.mentionChannels = data.mention_channels || null;
    this.attachments = data.attachments ? data.attachments.map(attachmentData => new Attachment(this._client, attachmentData)) : null;
    this.embeds = data.embeds ? data.embeds.map(embedData => new Embed(this._client, embedData)) : null;
    this.reactions = data.reactions ? data.reactions.map(reactionData => new Reaction(this._client, reactionData)) : null;
    this.nonce = data.nonce || null;
    this.pinned = data.pinned || false;
    this.webhookID = data.webhook_id || null;
    this.type = data.type || 0;
    this.activity = data.activity || null;
    this.application = data.application || null;
    this.applicationID = data.application_id || null;
    this.flags = data.flags || null;
    this.messageReference = data.message_reference || null;
    this.referencedMessage = data.referenced_message ? new Message(this._client, data.referenced_message) : null;
    this.interactionMetadata = data.interaction_metadata || null;
    this.interaction = data.interaction ? new Interaction(this._client, data.interaction) : null;
    this.thread = data.thread ? new GuildChannel(this._client, data.thread) : null;
    this.components = data.components || [];
    this.stickerItems = data.sticker_items || [];
    this.stickers = data.stickers || [];
    this.position = data.position || null;
    this.roleSubscriptionData = data.role_subscription_data || null;
    this.resolved = data.resolved || null;
    this.poll = data.poll || null;
    this.call = data.call || null;
  }

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
  async edit(options) {
    // Prepare the payload for the API request
    const payload = {
      content: options.content ?? this.content,
      // Use current content if not provided
      embeds: options.embeds ?? [],
      flags: options.flags ?? null,
      allowed_mentions: options.allowed_mentions ?? null,
      components: options.components ?? [],
      attachments: options.attachments ?? []
    };
    try {
      // Call the API to edit the message
      const data = await this._client.rest.request(RestApi.HttpMethod.PATCH, apiEndpoints.guildChannelMessage(this.channelID, this.id), payload);
      return new Message(this._client, data);
    } catch (error) {
      console.error("Failed to edit message:", error); // Log the error
      throw error; // Re-throw the error for higher-level handling
    }
  }

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
  delete() {
    return this._client.rest.request(RestApi.HttpMethod.DELETE, apiEndpoints.guildChannelMessage(this.channelID, this.id));
  }

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
  async getReactions(emoji, options = {}) {
    // Ensure necessary properties (channelID and messageID) are available
    if (!this.channelID || !this.id) {
      throw new Error('Missing channelID or messageID. Cannot retrieve reactions.');
    }

    // Set default options if not provided
    const {
      type = 0,
      after,
      limit = 25
    } = options;

    // Prepare query parameters
    const queryParams = {
      type,
      after,
      limit
    };

    // Encode the emoji to be used in the API request
    const encodedEmoji = encodeURIComponent(emoji);
    try {
      // Make the API request to get users who reacted with the specified emoji
      const data = await this._client.rest.request(RestApi.HttpMethod.GET, apiEndpoints.guildChannelMessageReaction(this.channelID, this.id, encodedEmoji), {
        query: queryParams
      });

      // Return an array of Reaction instances
      return data.map(reactionData => new Reaction(this._client, reactionData));
    } catch (error) {
      console.error("Failed to retrieve reactions:", error); // Log the error
      throw error; // Re-throw error for higher-level handling
    }
  }

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
  async addReaction(emoji) {
    // Ensure necessary properties (channelID and messageID) are available
    if (!this.channelID || !this.id) {
      throw new Error('Missing channelID or messageID. Cannot add reaction.');
    }

    // Encode the emoji to be used in the API request
    const encodedEmoji = encodeURIComponent(emoji);
    try {
      // Make the API request to add the reaction
      await this._client.rest.request(RestApi.HttpMethod.PUT, apiEndpoints.guildChannelMessageReaction(this.channelID, this.id, encodedEmoji), {});
    } catch (error) {
      console.error("Failed to add reaction:", error); // Log the error
      throw error; // Re-throw error for higher-level handling
    }
  }

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
  async removeReaction(emoji, userId) {
    // Ensure necessary properties (channelID and messageID) are available
    if (!this.channelID || !this.id) {
      throw new Error('Missing channelID or messageID. Cannot remove reaction.');
    }

    // Encode the emoji to be used in the API request
    const encodedEmoji = encodeURIComponent(emoji);
    try {
      // Make the API request to remove the reaction
      if (userId) {
        // Remove a specific user's reaction
        await this._client.rest.request(RestApi.HttpMethod.DELETE, apiEndpoints.guildChannelMessageReactionUser(this.channelID, this.id, encodedEmoji, userId), {});
      } else {
        // Remove the current user's reaction
        await this._client.rest.request(RestApi.HttpMethod.DELETE, apiEndpoints.guildChannelMessageReaction(this.channelID, this.id, encodedEmoji), {});
      }
    } catch (error) {
      console.error("Failed to remove reaction:", error); // Log the error
      throw error; // Re-throw error for higher-level handling
    }
  }

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
  async removeAllReactions() {
    // Ensure necessary properties (channelID and messageID) are available
    if (!this.channelID || !this.id) {
      throw new Error('Missing channelID or messageID. Cannot remove all reactions.');
    }
    try {
      // Make the API request to remove all reactions
      await this._client.rest.request(RestApi.HttpMethod.DELETE, apiEndpoints.guildChannelMessageReactions(this.channelID, this.id), {});
    } catch (error) {
      console.error("Failed to remove all reactions:", error); // Log the error
      throw error; // Re-throw error for higher-level handling
    }
  }
}
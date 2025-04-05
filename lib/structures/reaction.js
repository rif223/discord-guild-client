import { Member } from "./member.js";
/**
 * Represents a reaction to a message in a guild or channel.
 */
export class Reaction {
  /**
   * Constructs a new Reaction object.
   * @param {Client} client - The client instance managing this reaction.
   * @param {any} data - The raw data from the API representing the reaction.
   */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the properties of the reaction with the provided data.
   * @param {Object} data - The data object containing reaction information.
   */
  _update(data) {
    /**
     * The ID of the user who reacted.
     * @type {string}
     */
    this.userID = data.user_id;

    /**
     * The ID of the channel where the reaction occurred.
     * @type {string}
     */
    this.channelID = data.channel_id;

    /**
     * The ID of the message that was reacted to.
     * @type {string}
     */
    this.messageID = data.message_id;

    /**
     * The ID of the guild where the reaction occurred, if applicable.
     * @type {?string}
     */
    this.guildID = data.guild_id ?? null;

    /**
     * The member who reacted, if this reaction occurred in a guild.
     * @type {?Member}
     */
    this.member = data.member ? new Member(this._client, data.member) : undefined;

    /**
     * The emoji used for the reaction.
     * @type {any}
     */
    this.emoji = data.emoji;

    /**
     * The ID of the user who authored the message that was reacted to.
     * @type {?string}
     */
    this.messageAuthorID = data.message_author_id ?? null;

    /**
     * Whether this is a "super-reaction" (a special burst reaction).
     * @type {boolean}
     */
    this.burst = data.burst;

    /**
     * Colors used for the super-reaction animation, in hexadecimal format (e.g., "#rrggbb").
     * @type {?string[]}
     */
    this.burstColors = data.burst_colors ?? null;

    /**
     * The type of the reaction, typically represented as an integer.
     * @type {number}
     */
    this.type = data.type;
  }
}
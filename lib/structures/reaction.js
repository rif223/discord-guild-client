import { Member } from "./member.js";
/**
 * Represents a reaction to a message in a guild or channel.
 */
export class Reaction {
  /**
   * The ID of the user who reacted.
   * @type {string}
   */

  /**
   * The ID of the channel where the reaction occurred.
   * @type {string}
   */

  /**
   * The ID of the message that was reacted to.
   * @type {string}
   */

  /**
   * The ID of the guild where the reaction occurred, if applicable.
   * @type {?string}
   */

  /**
   * The member who reacted, if this reaction occurred in a guild.
   * @type {?Member}
   */

  /**
   * The emoji used for the reaction.
   * @type {any}
   */

  /**
   * The ID of the user who authored the message that was reacted to.
   * @type {?string}
   */

  /**
   * Whether this is a "super-reaction" (a special burst reaction).
   * @type {boolean}
   */

  /**
   * Colors used for the super-reaction animation, in hexadecimal format (e.g., "#rrggbb").
   * @type {?string[]}
   */

  /**
   * The type of the reaction, typically represented as an integer.
   * @type {number}
   */

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
    if (data.user_id !== undefined) this.userID = data.user_id;
    if (data.channel_id !== undefined) this.channelID = data.channel_id;
    if (data.message_id !== undefined) this.messageID = data.message_id;
    if (data.guild_id !== undefined) this.guildID = data.guild_id ?? null;
    if (data.member !== undefined) this.member = data.member ? new Member(this._client, data.member) : undefined;
    if (data.emoji !== undefined) this.emoji = data.emoji;
    if (data.message_author_id !== undefined) this.messageAuthorID = data.message_author_id ?? null;
    if (data.burst !== undefined) this.burst = data.burst;
    if (data.burst_colors !== undefined) this.burstColors = data.burst_colors ?? null;
    if (data.type !== undefined) this.type = data.type;
  }
}
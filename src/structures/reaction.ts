import { Client } from "../client";
import { apiEndpoints } from "../rest/endpoints";
import { RestApi } from "../rest/request";
import { Emoji } from "./emoji";
import { Member } from "./member";

/**
 * Represents a reaction to a message in a guild or channel.
 */
export class Reaction {
  private _client: Client;

  public userID!: string;
  public channelID!: string;
  public messageID!: string;
  public guildID?: string;
  public member?: Member;
  public emoji?: Emoji;
  public messageAuthorID?: string;
  public burst!: boolean;
  public burstColors?: string[];
  public type!: number;

  /**
   * Constructs a new Reaction object.
   * @param {Client} client - The client instance managing this reaction.
   * @param {any} data - The raw data from the API representing the reaction.
   */
  constructor(client: Client, data: any) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the properties of the reaction with the provided data.
   * @param {Object} data - The data object containing reaction information.
   */
  private _update(data: any) {
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
     * @type {Emoji}
     */
    this.emoji = data.emoji ? new Emoji(this._client, data.emoji) : undefined;

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
import { Client } from "../client";
import { apiEndpoints } from "../rest/endpoints";
import { RestApi } from "../rest/request";
import { Member } from "./member";

/**
 * Represents a reaction to a message in a guild or channel.
 */
export class Reaction {
  private _client: Client;

  /**
   * The ID of the user who reacted.
   * @type {string}
   */
  public userID!: string;

  /**
   * The ID of the channel where the reaction occurred.
   * @type {string}
   */
  public channelID!: string;

  /**
   * The ID of the message that was reacted to.
   * @type {string}
   */
  public messageID!: string;

  /**
   * The ID of the guild where the reaction occurred, if applicable.
   * @type {?string}
   */
  public guildID?: string;

  /**
   * The member who reacted, if this reaction occurred in a guild.
   * @type {?Member}
   */
  public member?: Member;

  /**
   * The emoji used for the reaction.
   * @type {any}
   */
  public emoji!: any;

  /**
   * The ID of the user who authored the message that was reacted to.
   * @type {?string}
   */
  public messageAuthorID?: string;

  /**
   * Whether this is a "super-reaction" (a special burst reaction).
   * @type {boolean}
   */
  public burst!: boolean;

  /**
   * Colors used for the super-reaction animation, in hexadecimal format (e.g., "#rrggbb").
   * @type {?string[]}
   */
  public burstColors?: string[];

  /**
   * The type of the reaction, typically represented as an integer.
   * @type {number}
   */
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

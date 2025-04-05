import { Client } from "../client";
import { apiEndpoints } from "../rest/endpoints";
import { RestApi } from "../rest/request";
import { GuildChannel } from "./guildChannel";
import { Member } from "./member";

/**
 * Represents the voice state of a user in a guild's voice channel.
 */
export class VoiceState {
  private _client: Client;

  public guildID?: string;
  public channelID?: string;
  public channel?: GuildChannel | null;
  public userID!: string;
  public member?: Member;
  public sessionID!: string;
  public deaf!: boolean;
  public mute!: boolean;
  public selfDeaf!: boolean;
  public selfMute!: boolean;
  public selfStream?: boolean;
  public selfVideo!: boolean;
  public suppress!: boolean;
  public requestToSpeakTimestamp?: string;

  /**
   * Constructs a new VoiceState object.
   * @param {Client} client - The client instance managing this voice state.
   * @param {any} data - The raw data from the API representing the voice state.
   */
  constructor(client: Client, data: any) {
    this._client = client;

    this._update(data);
  }

  /**
   * Updates the properties of the voice state with the provided data.
   * @param {Object} data - The data object containing voice state information.
   */
  private _update(data: any) {
    /**
     * The ID of the guild this voice state belongs to.
     * @type {?string}
     */
    this.guildID = data.guild_id ?? null;

    /**
     * The ID of the channel the user is connected to, if applicable.
     * @type {?string}
     */
    this.channelID = data.channel_id ?? null;

    /**
     * The channel the user is connected to, if applicable.
     * @type {?GuildChannel | null}
     */
    this.channel = this._client.channels?.get(data.channel_id) || null;

    /**
     * The ID of the user this voice state belongs to.
     * @type {string}
     */
    this.userID = data.user_id;

    /**
     * The guild member this voice state is associated with, if applicable.
     * @type {?Member}
     */
    this.member = data.member ? new Member(this._client, data.member) : undefined;

    /**
     * The session ID for this voice state.
     * @type {string}
     */
    this.sessionID = data.session_id;

    /**
     * Whether the user is deafened by the server.
     * @type {boolean}
     */
    this.deaf = data.deaf;

    /**
     * Whether the user is muted by the server.
     * @type {boolean}
     */
    this.mute = data.mute;

    /**
     * Whether the user is locally deafened.
     * @type {boolean}
     */
    this.selfDeaf = data.self_deaf;

    /**
     * Whether the user is locally muted.
     * @type {boolean}
     */
    this.selfMute = data.self_mute;

    /**
     * Whether the user is streaming using "Go Live".
     * @type {?boolean}
     */
    this.selfStream = data.self_stream ?? null;

    /**
     * Whether the user's camera is enabled.
     * @type {boolean}
     */
    this.selfVideo = data.self_video;

    /**
     * Whether the user's permission to speak is denied.
     * @type {boolean}
     */
    this.suppress = data.suppress;

    /**
     * The time at which the user requested to speak, if applicable.
     * @type {?string}
     */
    this.requestToSpeakTimestamp = data.request_to_speak_timestamp ?? null;
  }
}
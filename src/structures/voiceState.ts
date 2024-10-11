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

  /**
   * The ID of the guild this voice state belongs to.
   * @type {?string}
   */
  public guildID?: string;

  /**
   * The ID of the channel the user is connected to, if applicable.
   * @type {?string}
   */
  public channelID?: string;

  /**
   * The channel the user is connected to, if applicable.
   * @type {?GuildChannel | null}
   */
  public channel?: GuildChannel | null;

  /**
   * The ID of the user this voice state belongs to.
   * @type {string}
   */
  public userID!: string;

  /**
   * The guild member this voice state is associated with, if applicable.
   * @type {?Member}
   */
  public member?: Member;

  /**
   * The session ID for this voice state.
   * @type {string}
   */
  public sessionID!: string;

  /**
   * Whether the user is deafened by the server.
   * @type {boolean}
   */
  public deaf!: boolean;

  /**
   * Whether the user is muted by the server.
   * @type {boolean}
   */
  public mute!: boolean;

  /**
   * Whether the user is locally deafened.
   * @type {boolean}
   */
  public selfDeaf!: boolean;

  /**
   * Whether the user is locally muted.
   * @type {boolean}
   */
  public selfMute!: boolean;

  /**
   * Whether the user is streaming using "Go Live".
   * @type {?boolean}
   */
  public selfStream?: boolean;

  /**
   * Whether the user's camera is enabled.
   * @type {boolean}
   */
  public selfVideo!: boolean;

  /**
   * Whether the user's permission to speak is denied.
   * @type {boolean}
   */
  public suppress!: boolean;

  /**
   * The time at which the user requested to speak, if applicable.
   * @type {?string}
   */
  public requestToSpeakTimestamp?: string;

  /**
   * Constructs a new VoiceState object.
   * @param {Client} client - The client instance managing this voice state.
   * @param {any} data - The raw data from the API representing the voice state.
   */
  constructor(client: Client, data: any) {
    this._client = client;

    if (data && data.channel_id) {
      this.channel = this._client.channels?.get(data.channel_id) || null;
    } else {
      console.error("Invalid data received for VoiceState:", data);
    }

    this._update(data);
  }

  /**
   * Updates the properties of the voice state with the provided data.
   * @param {Object} data - The data object containing voice state information.
   */
  private _update(data: any) {
    if (data.guild_id !== undefined) this.guildID = data.guild_id ?? null;
    if (data.channel_id !== undefined) this.channelID = data.channel_id ?? null;
    if (data.user_id !== undefined) this.userID = data.user_id;
    if (data.member !== undefined) this.member = data.member ? new Member(this._client, data.member) : undefined;
    if (data.session_id !== undefined) this.sessionID = data.session_id;
    if (data.deaf !== undefined) this.deaf = data.deaf;
    if (data.mute !== undefined) this.mute = data.mute;
    if (data.self_deaf !== undefined) this.selfDeaf = data.self_deaf;
    if (data.self_mute !== undefined) this.selfMute = data.self_mute;
    if (data.self_stream !== undefined) this.selfStream = data.self_stream ?? null;
    if (data.self_video !== undefined) this.selfVideo = data.self_video;
    if (data.suppress !== undefined) this.suppress = data.suppress;
    if (data.request_to_speak_timestamp !== undefined) this.requestToSpeakTimestamp = data.request_to_speak_timestamp ?? null;
  }
}

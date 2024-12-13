import { Member } from "./member.js";
/**
 * Represents the voice state of a user in a guild's voice channel.
 */
export class VoiceState {
  /**
   * The ID of the guild this voice state belongs to.
   * @type {?string}
   */

  /**
   * The ID of the channel the user is connected to, if applicable.
   * @type {?string}
   */

  /**
   * The channel the user is connected to, if applicable.
   * @type {?GuildChannel | null}
   */

  /**
   * The ID of the user this voice state belongs to.
   * @type {string}
   */

  /**
   * The guild member this voice state is associated with, if applicable.
   * @type {?Member}
   */

  /**
   * The session ID for this voice state.
   * @type {string}
   */

  /**
   * Whether the user is deafened by the server.
   * @type {boolean}
   */

  /**
   * Whether the user is muted by the server.
   * @type {boolean}
   */

  /**
   * Whether the user is locally deafened.
   * @type {boolean}
   */

  /**
   * Whether the user is locally muted.
   * @type {boolean}
   */

  /**
   * Whether the user is streaming using "Go Live".
   * @type {?boolean}
   */

  /**
   * Whether the user's camera is enabled.
   * @type {boolean}
   */

  /**
   * Whether the user's permission to speak is denied.
   * @type {boolean}
   */

  /**
   * The time at which the user requested to speak, if applicable.
   * @type {?string}
   */

  /**
   * Constructs a new VoiceState object.
   * @param {Client} client - The client instance managing this voice state.
   * @param {any} data - The raw data from the API representing the voice state.
   */
  constructor(client, data) {
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
  _update(data) {
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
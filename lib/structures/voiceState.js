import { Member } from "./member.js";
/**
 * Represents the voice state of a user in a guild's voice channel.
 */
export class VoiceState {
  /**
   * Constructs a new VoiceState object.
   * @param {Client} client - The client instance managing this voice state.
   * @param {any} data - The raw data from the API representing the voice state.
   */
  constructor(client, data) {
    this._client = client;

    /**
     * The channel the user is connected to, if applicable.
     * @type {?GuildChannel | null}
     */
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
    /**
     * The ID of the guild this voice state belongs to.
     * @type {?string}
     */
    if (data.guild_id !== undefined) this.guildID = data.guild_id ?? null;

    /**
     * The ID of the channel the user is connected to, if applicable.
     * @type {?string}
     */
    if (data.channel_id !== undefined) this.channelID = data.channel_id ?? null;

    /**
     * The ID of the user this voice state belongs to.
     * @type {string}
     */
    if (data.user_id !== undefined) this.userID = data.user_id;

    /**
     * The guild member this voice state is associated with, if applicable.
     * @type {?Member}
     */
    if (data.member !== undefined) this.member = data.member ? new Member(this._client, data.member) : undefined;

    /**
     * The session ID for this voice state.
     * @type {string}
     */
    if (data.session_id !== undefined) this.sessionID = data.session_id;

    /**
     * Whether the user is deafened by the server.
     * @type {boolean}
     */
    if (data.deaf !== undefined) this.deaf = data.deaf;

    /**
     * Whether the user is muted by the server.
     * @type {boolean}
     */
    if (data.mute !== undefined) this.mute = data.mute;

    /**
     * Whether the user is locally deafened.
     * @type {boolean}
     */
    if (data.self_deaf !== undefined) this.selfDeaf = data.self_deaf;

    /**
     * Whether the user is locally muted.
     * @type {boolean}
     */
    if (data.self_mute !== undefined) this.selfMute = data.self_mute;

    /**
     * Whether the user is streaming using "Go Live".
     * @type {?boolean}
     */
    if (data.self_stream !== undefined) this.selfStream = data.self_stream ?? null;

    /**
     * Whether the user's camera is enabled.
     * @type {boolean}
     */
    if (data.self_video !== undefined) this.selfVideo = data.self_video;

    /**
     * Whether the user's permission to speak is denied.
     * @type {boolean}
     */
    if (data.suppress !== undefined) this.suppress = data.suppress;

    /**
     * The time at which the user requested to speak, if applicable.
     * @type {?string}
     */
    if (data.request_to_speak_timestamp !== undefined) this.requestToSpeakTimestamp = data.request_to_speak_timestamp ?? null;
  }
}
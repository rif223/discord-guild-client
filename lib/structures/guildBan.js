/**
 * Represents a ban in a Discord guild.
 */
export class GuildBan {
  /**
   * Constructs a new GuildBan object.
   * @param {any} data - The raw data from the API representing the ban.
   */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the ban's properties with the provided data.
   * @param {Object} data - The data object containing ban information.
   */
  _update(data) {
    /**
     * The unique ID of the guild where the ban was applied.
     * @type {string}
     */
    this.guildId = data.guild_id;

    /**
     * The user object representing the user who was banned.
     * @type {any}
     */
    this.user = data.user;
  }
}
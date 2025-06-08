import { User } from "./user.js";
/**
 * Represents a Discord sticker object.
 */
export class Sticker {
  /**
   * Creates a new Sticker instance.
   * @param {Client} client - The client instance.
   * @param {any} data - The raw data from the Discord API.
   */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the sticker properties with the provided data.
   * @param {Object} data - The data object containing sticker information.
   */
  _update(data) {
    /**
     * The unique ID of the sticker.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The ID of the sticker pack (if standard sticker).
     * @type {string | undefined}
     */
    this.packId = data.pack_id;

    /**
     * The name of the sticker.
     * @type {string}
     */
    this.name = data.name;

    /**
     * The description of the sticker (can be null).
     * @type {string | undefined}
     */
    this.description = data.description ?? undefined;

    /**
     * Tags for autocomplete/suggestions (max 200 characters).
     * @type {string}
     */
    this.tags = data.tags;

    /**
     * Type of sticker.
     * @type {number}
     */
    this.type = data.type;

    /**
     * Sticker format type.
     * @type {number}
     */
    this.formatType = data.format_type;

    /**
     * Whether the sticker is available for use.
     * @type {boolean | undefined}
     */
    this.available = data.available;

    /**
     * ID of the guild that owns the sticker (if any).
     * @type {string | undefined}
     */
    this.guildId = data.guild_id;

    /**
     * The user who uploaded the sticker (if applicable).
     * @type {User | undefined}
     */
    this.user = data.user ? new User(this._client, data.user) : undefined;

    /**
     * Sort value of standard stickers within a pack.
     * @type {number | undefined}
     */
    this.sortValue = data.sort_value;
  }
}
/**
 * Represents a Discord user.
 */
export class User {
  /**
   * Constructs a new User object.
   * @param {Client} client - The client instance managing this user.
   * @param {any} data - The raw data from the API representing the user.
   */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the user's properties with the provided data.
   * @param {Object} data - The data object containing user information.
   */
  _update(data) {
    /**
     * The user's unique ID.
     * @type {string}
     */
    if (data.id !== undefined) this.id = data.id;

    /**
     * The user's username, which is not unique across the platform.
     * @type {string}
     */
    if (data.username !== undefined) this.username = data.username;

    /**
     * The user's Discord tag, also known as the discriminator (e.g., #1234).
     * @type {string}
     */
    if (data.discriminator !== undefined) this.discriminator = data.discriminator;

    /**
     * The user's global display name, if set. For bots, this is the application name.
     * @type {?string}
     */
    if (data.global_name !== undefined) this.globalName = data.global_name ?? null;

    /**
     * The user's avatar hash, if set.
     * @type {?string}
     */
    if (data.avatar !== undefined) this.avatar = data.avatar ?? null;

    /**
     * Whether the user belongs to an OAuth2 application (i.e., if the user is a bot).
     * @type {?boolean}
     */
    if (data.bot !== undefined) this.bot = data.bot ?? null;

    /**
     * Whether the user is an official Discord system user (part of the urgent message system).
     * @type {?boolean}
     */
    if (data.system !== undefined) this.system = data.system ?? null;

    /**
     * Whether the user has two-factor authentication enabled.
     * @type {?boolean}
     */
    if (data.mfa_enabled !== undefined) this.mfaEnabled = data.mfa_enabled ?? null;

    /**
     * The user's banner hash, if set.
     * @type {?string}
     */
    if (data.banner !== undefined) this.banner = data.banner ?? null;

    /**
     * The user's banner color, represented as an integer value of the hexadecimal color code.
     * @type {?number}
     */
    if (data.accent_color !== undefined) this.accentColor = data.accent_color ?? null;

    /**
     * The user's chosen language option (e.g., "en-US").
     * @type {?string}
     */
    if (data.locale !== undefined) this.locale = data.locale ?? null;

    /**
     * Whether the email on the user's account has been verified.
     * @type {?boolean}
     */
    if (data.verified !== undefined) this.verified = data.verified ?? null;

    /**
     * The user's email, if available.
     * @type {?string}
     */
    if (data.email !== undefined) this.email = data.email ?? null;

    /**
     * The flags on the user's account, represented as an integer bitfield.
     * @type {?number}
     */
    if (data.flags !== undefined) this.flags = data.flags ?? null;

    /**
     * The type of Nitro subscription on the user's account.
     * @type {?number}
     */
    if (data.premium_type !== undefined) this.premiumType = data.premium_type ?? null;

    /**
     * The public flags on the user's account, represented as an integer bitfield.
     * @type {?number}
     */
    if (data.public_flags !== undefined) this.publicFlags = data.public_flags ?? null;

    /**
     * Data for the user's avatar decoration, if available.
     * @type {?any}
     */
    if (data.avatar_decoration_data !== undefined) this.avatarDecorationData = data.avatar_decoration_data ?? null;
  }
}
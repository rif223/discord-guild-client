import { Client } from "../client";

/**
 * Represents a Discord user.
 */
export class User {
  private _client: Client;

  /**
   * The user's unique ID.
   * @type {string}
   */
  public id!: string;

  /**
   * The user's username, which is not unique across the platform.
   * @type {string}
   */
  public username!: string;

  /**
   * The user's Discord tag, also known as the discriminator (e.g., #1234).
   * @type {string}
   */
  public discriminator!: string;

  /**
   * The user's global display name, if set. For bots, this is the application name.
   * @type {?string}
   */
  public globalName?: string;

  /**
   * The user's avatar hash, if set.
   * @type {?string}
   */
  public avatar?: string;

  /**
   * Whether the user belongs to an OAuth2 application (i.e., if the user is a bot).
   * @type {?boolean}
   */
  public bot?: boolean;

  /**
   * Whether the user is an official Discord system user (part of the urgent message system).
   * @type {?boolean}
   */
  public system?: boolean;

  /**
   * Whether the user has two-factor authentication enabled.
   * @type {?boolean}
   */
  public mfaEnabled?: boolean;

  /**
   * The user's banner hash, if set.
   * @type {?string}
   */
  public banner?: string;

  /**
   * The user's banner color, represented as an integer value of the hexadecimal color code.
   * @type {?number}
   */
  public accentColor?: number;

  /**
   * The user's chosen language option (e.g., "en-US").
   * @type {?string}
   */
  public locale?: string;

  /**
   * Whether the email on the user's account has been verified.
   * @type {?boolean}
   */
  public verified?: boolean;

  /**
   * The user's email, if available.
   * @type {?string}
   */
  public email?: string;

  /**
   * The flags on the user's account, represented as an integer bitfield.
   * @type {?number}
   */
  public flags?: number;

  /**
   * The type of Nitro subscription on the user's account.
   * @type {?number}
   */
  public premiumType?: number;

  /**
   * The public flags on the user's account, represented as an integer bitfield.
   * @type {?number}
   */
  public publicFlags?: number;

  /**
   * Data for the user's avatar decoration, if available.
   * @type {?any}
   */
  public avatarDecorationData?: any;

  /**
   * Constructs a new User object.
   * @param {Client} client - The client instance managing this user.
   * @param {any} data - The raw data from the API representing the user.
   */
  constructor(client: Client, data: any) {
    this._client = client;

    this._update(data);
  }

  /**
   * Updates the user's properties with the provided data.
   * @param {Object} data - The data object containing user information.
   */
  private _update(data: any) {
    if (data.id !== undefined) this.id = data.id;
    if (data.username !== undefined) this.username = data.username;
    if (data.discriminator !== undefined) this.discriminator = data.discriminator;
    if (data.global_name !== undefined) this.globalName = data.global_name ?? null;
    if (data.avatar !== undefined) this.avatar = data.avatar ?? null;
    if (data.bot !== undefined) this.bot = data.bot ?? null;
    if (data.system !== undefined) this.system = data.system ?? null;
    if (data.mfa_enabled !== undefined) this.mfaEnabled = data.mfa_enabled ?? null;
    if (data.banner !== undefined) this.banner = data.banner ?? null;
    if (data.accent_color !== undefined) this.accentColor = data.accent_color ?? null;
    if (data.locale !== undefined) this.locale = data.locale ?? null;
    if (data.verified !== undefined) this.verified = data.verified ?? null;
    if (data.email !== undefined) this.email = data.email ?? null;
    if (data.flags !== undefined) this.flags = data.flags ?? null;
    if (data.premium_type !== undefined) this.premiumType = data.premium_type ?? null;
    if (data.public_flags !== undefined) this.publicFlags = data.public_flags ?? null;
    if (data.avatar_decoration_data !== undefined) this.avatarDecorationData = data.avatar_decoration_data ?? null;
  }
}

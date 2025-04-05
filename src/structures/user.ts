import { Client } from "../client";

/**
 * Represents a Discord user.
 */
export class User {
  private _client: Client;

  public id!: string;
  public username!: string;
  public discriminator!: string;
  public globalName?: string;
  public avatar?: string;
  public bot?: boolean;
  public system?: boolean;
  public mfaEnabled?: boolean;
  public banner?: string;
  public accentColor?: number;
  public locale?: string;
  public verified?: boolean;
  public email?: string;
  public flags?: number;
  public premiumType?: number;
  public publicFlags?: number;
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
    /**
     * The user's unique ID.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The user's username, which is not unique across the platform.
     * @type {string}
     */
    this.username = data.username;

    /**
     * The user's Discord tag, also known as the discriminator (e.g., #1234).
     * @type {string}
     */
    this.discriminator = data.discriminator;

    /**
     * The user's global display name, if set. For bots, this is the application name.
     * @type {?string}
     */
    this.globalName = data.global_name ?? null;

    /**
     * The user's avatar hash, if set.
     * @type {?string}
     */
    this.avatar = data.avatar ?? null;

    /**
     * Whether the user belongs to an OAuth2 application (i.e., if the user is a bot).
     * @type {?boolean}
     */
    this.bot = data.bot ?? null;

    /**
     * Whether the user is an official Discord system user (part of the urgent message system).
     * @type {?boolean}
     */
    this.system = data.system ?? null;

    /**
     * Whether the user has two-factor authentication enabled.
     * @type {?boolean}
     */
    this.mfaEnabled = data.mfa_enabled ?? null;

    /**
     * The user's banner hash, if set.
     * @type {?string}
     */
    this.banner = data.banner ?? null;

    /**
     * The user's banner color, represented as an integer value of the hexadecimal color code.
     * @type {?number}
     */
    this.accentColor = data.accent_color ?? null;

    /**
     * The user's chosen language option (e.g., "en-US").
     * @type {?string}
     */
    this.locale = data.locale ?? null;

    /**
     * Whether the email on the user's account has been verified.
     * @type {?boolean}
     */
    this.verified = data.verified ?? null;

    /**
     * The user's email, if available.
     * @type {?string}
     */
    this.email = data.email ?? null;

    /**
     * The flags on the user's account, represented as an integer bitfield.
     * @type {?number}
     */
    this.flags = data.flags ?? null;

    /**
     * The type of Nitro subscription on the user's account.
     * @type {?number}
     */
    this.premiumType = data.premium_type ?? null;

    /**
     * The public flags on the user's account, represented as an integer bitfield.
     * @type {?number}
     */
    this.publicFlags = data.public_flags ?? null;

    /**
     * Data for the user's avatar decoration, if available.
     * @type {?any}
     */
    this.avatarDecorationData = data.avatar_decoration_data ?? null;
  }
}
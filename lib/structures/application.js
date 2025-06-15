export class Application {
  /**
   * Constructs a new Application object.
   * @param {Client} client - The client instance managing this application.
   * @param {any} data - The raw data from the API representing the application.
   */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the application properties with the provided data.
   * @param {any} data - The data object containing application information.
   */
  _update(data) {
    /**
     * The application ID.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The application's name.
     * @type {string}
     */
    this.name = data.name;

    /**
     * The icon hash of the application.
     * @type {?string}
     */
    this.icon = data.icon;

    /**
     * The description of the application.
     * @type {string}
     */
    this.description = data.description;

    /**
     * List of RPC origin URLs, if RPC is enabled.
     * @type {?string[]}
     */
    this.rpcOrigins = data.rpc_origins;

    /**
     * Whether the bot is public.
     * @type {boolean}
     */
    this.botPublic = data.bot_public;

    /**
     * Whether the bot requires code grant.
     * @type {boolean}
     */
    this.botRequireCodeGrant = data.bot_require_code_grant;

    /**
     * Partial user object for the bot.
     * @type {?any}
     */
    this.bot = data.bot;

    /**
     * Terms of Service URL.
     * @type {?string}
     */
    this.termsOfServiceUrl = data.terms_of_service_url;

    /**
     * Privacy Policy URL.
     * @type {?string}
     */
    this.privacyPolicyUrl = data.privacy_policy_url;

    /**
     * Owner of the application.
     * @type {?any}
     */
    this.owner = data.owner;

    /**
     * Hex-encoded verification key.
     * @type {string}
     */
    this.verifyKey = data.verify_key;

    /**
     * Team object if the app belongs to a team.
     * @type {?any}
     */
    this.team = data.team;

    /**
     * ID of the associated guild.
     * @type {?string}
     */
    this.guildID = data.guild_id;

    /**
     * Partial object of the associated guild.
     * @type {?any}
     */
    this.guild = data.guild;

    /**
     * ID of the primary SKU if app is a game.
     * @type {?string}
     */
    this.primarySkuID = data.primary_sku_id;

    /**
     * Slug for the store page.
     * @type {?string}
     */
    this.slug = data.slug;

    /**
     * Cover image hash for rich presence.
     * @type {?string}
     */
    this.coverImage = data.cover_image;

    /**
     * Public flags of the application.
     * @type {?number}
     */
    this.flags = data.flags;

    /**
     * Approximate number of guilds the app is in.
     * @type {?number}
     */
    this.approximateGuildCount = data.approximate_guild_count;

    /**
     * Approximate number of users who installed the app.
     * @type {?number}
     */
    this.approximateUserInstallCount = data.approximate_user_install_count;

    /**
     * Redirect URIs for OAuth2.
     * @type {?string[]}
     */
    this.redirectUris = data.redirect_uris;

    /**
     * Interactions endpoint URL.
     * @type {?string}
     */
    this.interactionsEndpointUrl = data.interactions_endpoint_url;

    /**
     * Role connection verification URL.
     * @type {?string}
     */
    this.roleConnectionsVerificationUrl = data.role_connections_verification_url;

    /**
     * Webhook URL for events.
     * @type {?string}
     */
    this.eventWebhooksUrl = data.event_webhooks_url;

    /**
     * Status of webhook event delivery.
     * 1 = disabled (default), 2 = enabled, 3 = disabled by Discord.
     * @type {number}
     */
    this.eventWebhooksStatus = data.event_webhooks_status;

    /**
     * List of webhook event types subscribed to.
     * @type {?string[]}
     */
    this.eventWebhooksTypes = data.event_webhooks_types;

    /**
     * Tags describing the app's content and functionality.
     * Max 5.
     * @type {?string[]}
     */
    this.tags = data.tags;

    /**
     * Install parameters for in-app auth.
     * @type {?any}
     */
    this.installParams = data.install_params;

    /**
     * Default scopes/permissions per integration context.
     * @type {?Record<string, any>}
     */
    this.integrationTypesConfig = data.integration_types_config;

    /**
     * Custom install URL.
     * @type {?string}
     */
    this.customInstallUrl = data.custom_install_url;
  }
}
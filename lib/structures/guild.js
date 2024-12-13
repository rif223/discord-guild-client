export class Guild {
  /** 
   * The unique ID of the guild. 
   * @type {string}
   */

  /** 
   * The name of the guild. It must be between 2 and 100 characters.
   * @type {string}
   */

  /** 
   * The icon hash of the guild, used for the guild's image.
   * @type {?string}
   */

  /** 
   * The alternative hash for the icon, used in templates.
   * @type {?string}
   */

  /** 
   * The splash image hash for the guild's invite screen.
   * @type {?string}
   */

  /** 
   * The splash image hash for guilds discoverable in the Discord UI.
   * Available only for guilds with the "DISCOVERABLE" feature.
   * @type {?string}
   */

  /** 
   * The banner image hash for the guild, used for decoration in the guild's profile.
   * @type {?string}
   */

  /** 
   * The ID of the guild owner.
   * @type {string}
   */

  /** 
   * Whether the current user is the owner of the guild.
   * @type {boolean}
   */

  /** 
   * The total permissions available to the user within the guild.
   * Excludes overwrites and implicit permissions.
   * @type {?string}
   */

  /** 
   * The ID of the AFK (away-from-keyboard) voice channel.
   * @type {?string}
   */

  /** 
   * The timeout duration (in seconds) after which members are moved to the AFK channel.
   * @type {number}
   */

  /** 
   * Whether the server widget is enabled, showing information about the guild.
   * @type {boolean}
   */

  /** 
   * The ID of the channel used to generate a widget invite.
   * @type {?string}
   */

  /** 
   * The level of verification required for members to participate in the guild.
   * @type {number}
   */

  /** 
   * The default notification setting for the guild (all messages or only mentions).
   * @type {number}
   */

  /** 
   * The level of explicit content filtering applied to messages in the guild.
   * @type {number}
   */

  /** 
   * The multi-factor authentication (MFA) level required for the guild.
   * @type {number}
   */

  /** 
   * The application ID of the guild creator, if it was created by a bot.
   * @type {?string}
   */

  /** 
   * The ID of the system channel, where system messages like welcome or boost events are posted.
   * @type {?string}
   */

  /** 
   * Flags for controlling the behavior of the system channel (e.g., suppressing join notifications).
   * @type {number}
   */

  /** 
   * The ID of the rules channel, where Community guilds display their rules and guidelines.
   * @type {?string}
   */

  /** 
   * The maximum number of presences (online members) allowed in the guild.
   * Can be `null` for large guilds.
   * @type {?number}
   */

  /** 
   * The maximum number of members that can join the guild.
   * @type {number}
   */

  /** 
   * The vanity URL code for the guild, used for custom invite links.
   * @type {?string}
   */

  /** 
   * A description of the guild, often used for Community guilds.
   * @type {?string}
   */

  /** 
   * The premium tier of the guild, which indicates the level of boosts.
   * @type {number}
   */

  /** 
   * The number of active boosts for the guild.
   * @type {number}
   */

  /** 
   * The preferred locale of the guild (e.g., "en-US").
   * @type {string}
   */

  /** 
   * The ID of the channel where admins and moderators receive community updates.
   * @type {?string}
   */

  /** 
   * The maximum number of users allowed in a video channel.
   * @type {number}
   */

  /** 
   * The maximum number of users allowed in a stage video channel.
   * @type {number}
   */

  /** 
   * The approximate number of members in the guild. 
   * Available when with_counts is true in certain API calls.
   * @type {?number}
   */

  /** 
   * The approximate number of non-offline members in the guild.
   * Available when with_counts is true in certain API calls.
   * @type {?number}
   */

  /** 
   * The welcome screen displayed to new members in Community guilds.
   * @type {Object}
   */

  /** 
   * Whether the guild is marked as NSFW (Not Safe For Work).
   * @type {boolean}
   */

  /** 
   * The NSFW (Not Safe For Work) level of the guild.
   * @type {number}
   */

  /** 
   * Custom stickers that have been uploaded to the guild.
   * @type {any[]}
   */

  /** 
   * Whether the boost progress bar is enabled in the guild.
   * @type {boolean}
   */

  /** 
   * The ID of the channel where safety alerts are sent to admins and moderators.
   * @type {?string}
   */

  /** 
   * Features enabled for the guild, such as "DISCOVERABLE" or "COMMUNITY".
   * @type {string[]}
   */

  /** 
   * Custom emojis uploaded to the guild.
   * @type {any[]}
   */

  /**
   * Constructs a new Guild object.
   * @param {Client} client - The client instance managing this guild.
   * @param {any} data - The raw data from the API representing the guild.
   */
  constructor(client, data) {
    this._client = client;

    // Initialize guild data with API requests
    //this.initialize();

    this._update(data);
  }

  /*
  private async initialize() {
    this.channels = (await this._client.rest.request(RestApi.HttpMethod.GET, apiEndpoints.getGuildChannels())).map((data: any) => new GuildChannel(this._client, data));
    this.members = (await this._client.rest.request(RestApi.HttpMethod.GET, apiEndpoints.getGuildMembers())).map((data: any) => new Member(this._client, data));
    this.roles = (await this._client.rest.request(RestApi.HttpMethod.GET, apiEndpoints.getGuildRoles())).map((data: any) => new Role(this._client, data));
  }
  */

  /**
   * Updates the guild properties with the provided data.
   * @param {Object} data - The data object containing guild information.
   */
  _update(data) {
    if (data.id !== undefined) this.id = data.id;
    if (data.name !== undefined) this.name = data.name;
    if (data.icon !== undefined) this.icon = data.icon;
    if (data.icon_hash !== undefined) this.iconHash = data.icon_hash;
    if (data.splash !== undefined) this.splash = data.splash;
    if (data.discovery_splash !== undefined) this.discoverySplash = data.discovery_splash;
    if (data.banner !== undefined) this.banner = data.banner;
    if (data.owner_id !== undefined) this.ownerID = data.owner_id;
    if (data.owner !== undefined) this.owner = data.owner;
    if (data.permissions !== undefined) this.permissions = data.permissions;
    if (data.afk_channel_id !== undefined) this.afkChannelID = data.afk_channel_id;
    if (data.afk_timeout !== undefined) this.afkTimeout = data.afk_timeout;
    if (data.widget_enabled !== undefined) this.widgetEnabled = data.widget_enabled;
    if (data.widget_channel_id !== undefined) this.widgetChannelID = data.widget_channel_id;
    if (data.verification_level !== undefined) this.verificationLevel = data.verification_level;
    if (data.default_message_notifications !== undefined) this.defaultNotifications = data.default_message_notifications;
    if (data.explicit_content_filter !== undefined) this.explicitContentFilter = data.explicit_content_filter;
    if (data.mfa_level !== undefined) this.mfaLevel = data.mfa_level;
    if (data.application_id !== undefined) this.applicationID = data.application_id;
    if (data.system_channel_id !== undefined) this.systemChannelID = data.system_channel_id;
    if (data.system_channel_flags !== undefined) this.systemChannelFlags = data.system_channel_flags;
    if (data.rules_channel_id !== undefined) this.rulesChannelID = data.rules_channel_id;
    if (data.max_presences !== undefined) this.maxPresences = data.max_presences;
    if (data.max_members !== undefined) this.maxMembers = data.max_members;
    if (data.vanity_url_code !== undefined) this.vanityURL = data.vanity_url_code;
    if (data.description !== undefined) this.description = data.description;
    if (data.premium_tier !== undefined) this.premiumTier = data.premium_tier;
    if (data.premium_subscription_count !== undefined) this.premiumSubscriptionCount = data.premium_subscription_count;
    if (data.preferred_locale !== undefined) this.preferredLocale = data.preferred_locale;
    if (data.public_updates_channel_id !== undefined) this.publicUpdatesChannelID = data.public_updates_channel_id;
    if (data.max_video_channel_users !== undefined) this.maxVideoChannelUsers = data.max_video_channel_users;
    if (data.max_stage_video_channel_users !== undefined) this.maxStageVideoChannelUsers = data.max_stage_video_channel_users;
    if (data.approximate_member_count !== undefined) this.approximateMemberCount = data.approximate_member_count;
    if (data.approximate_presence_count !== undefined) this.approximatePresenceCount = data.approximate_presence_count;
    if (data.welcome_screen !== undefined) {
      this.welcomeScreen = {
        description: data.welcome_screen.description,
        welcomeChannels: data.welcome_screen.welcome_channels?.map(c => ({
          channelID: c.channel,
          description: c.description,
          emojiID: c.emoji_id,
          emojiName: c.emoji_name
        }))
      };
    }
    if (data.nsfw !== undefined) this.nsfw = data.nsfw;
    if (data.nsfw_level !== undefined) this.nsfwLevel = data.nsfw_level;
    if (data.stickers !== undefined) this.stickers = data.stickers;
    if (data.premium_progress_bar_enabled !== undefined) this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
    if (data.safety_alerts_channel_id !== undefined) this.safetyAlertsChannelID = data.safety_alerts_channel_id;
    if (data.features !== undefined) this.features = data.features;
    if (data.emojis !== undefined) this.emojis = data.emojis;
  }

  /*
  edit() {
    return;
  }
  */
  // ToDo
}
/**
 * Represents the payload for updating or creating a Discord guild.
 */
export class GuildPayload {
  /**
   * Creates a new GuildPayload instance.
   * @param data Optional initial data to populate the guild payload.
   */
  constructor(data) {
    if (data) {
      this.name = data.name;
      this.region = data.region;
      this.verificationLevel = data.verification_level;
      this.defaultMessageNotifications = data.default_message_notifications;
      this.explicitContentFilter = data.explicit_content_filter;
      this.afkChannelId = data.afk_channel_id;
      this.afkTimeout = data.afk_timeout;
      this.icon = data.icon;
      this.ownerId = data.owner_id;
      this.splash = data.splash;
      this.discoverySplash = data.discovery_splash;
      this.banner = data.banner;
      this.systemChannelId = data.system_channel_id;
      this.systemChannelFlags = data.system_channel_flags;
      this.rulesChannelId = data.rules_channel_id;
      this.publicUpdatesChannelId = data.public_updates_channel_id;
      this.preferredLocale = data.preferred_locale;
      this.features = data.features;
      this.description = data.description;
      this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;
      this.safetyAlertsChannelId = data.safety_alerts_channel_id;
    }
  }

  /**
   * The guild's name.
   * Must be between 2 and 100 characters if specified.
   */
  get name() {
    return this._name;
  }
  set name(value) {
    if (value && (value.length < 2 || value.length > 100)) {
      throw new Error("Name must be between 2 and 100 characters.");
    }
    this._name = value;
  }

  /**
   * The guild voice region id (deprecated).
   */
  get region() {
    return this._region;
  }
  set region(value) {
    this._region = value;
  }

  /**
   * Verification level of the guild (0-4).
   */
  get verificationLevel() {
    return this._verificationLevel;
  }
  set verificationLevel(value) {
    if (value !== undefined && (value < 0 || value > 4)) {
      throw new Error("Verification level must be between 0 and 4.");
    }
    this._verificationLevel = value;
  }

  /**
   * Default message notification level.
   */
  get defaultMessageNotifications() {
    return this._defaultMessageNotifications;
  }
  set defaultMessageNotifications(value) {
    this._defaultMessageNotifications = value;
  }

  /**
   * Explicit content filter level.
   */
  get explicitContentFilter() {
    return this._explicitContentFilter;
  }
  set explicitContentFilter(value) {
    this._explicitContentFilter = value;
  }

  /**
   * ID for the AFK channel.
   */
  get afkChannelId() {
    return this._afkChannelId;
  }
  set afkChannelId(value) {
    this._afkChannelId = value;
  }

  /**
   * AFK timeout in seconds.
   * Valid values: 60, 300, 900, 1800, 3600.
   */
  get afkTimeout() {
    return this._afkTimeout;
  }
  set afkTimeout(value) {
    const validTimeouts = [60, 300, 900, 1800, 3600];
    if (value !== undefined && !validTimeouts.includes(value)) {
      throw new Error("afk_timeout must be one of: 60, 300, 900, 1800, 3600.");
    }
    this._afkTimeout = value;
  }

  /**
   * Base64 encoded 1024x1024 png/jpeg/gif image for the guild icon.
   */
  get icon() {
    return this._icon;
  }
  set icon(value) {
    this._icon = value;
  }

  /**
   * User ID to transfer guild ownership to (must be the owner).
   */
  get ownerId() {
    return this._ownerId;
  }
  set ownerId(value) {
    this._ownerId = value;
  }

  /**
   * Base64 encoded 16:9 png/jpeg image for the guild splash.
   */
  get splash() {
    return this._splash;
  }
  set splash(value) {
    this._splash = value;
  }

  /**
   * Base64 encoded 16:9 png/jpeg image for the guild discovery splash.
   */
  get discoverySplash() {
    return this._discoverySplash;
  }
  set discoverySplash(value) {
    this._discoverySplash = value;
  }

  /**
   * Base64 encoded 16:9 png/jpeg image for the guild banner.
   */
  get banner() {
    return this._banner;
  }
  set banner(value) {
    this._banner = value;
  }

  /**
   * The ID of the channel where guild notices such as welcome messages and boost events are posted.
   */
  get systemChannelId() {
    return this._systemChannelId;
  }
  set systemChannelId(value) {
    this._systemChannelId = value;
  }

  /**
   * System channel flags.
   */
  get systemChannelFlags() {
    return this._systemChannelFlags;
  }
  set systemChannelFlags(value) {
    this._systemChannelFlags = value;
  }

  /**
   * The ID of the channel where Community guilds display rules and/or guidelines.
   */
  get rulesChannelId() {
    return this._rulesChannelId;
  }
  set rulesChannelId(value) {
    this._rulesChannelId = value;
  }

  /**
   * The ID of the channel where admins and moderators of Community guilds receive notices from Discord.
   */
  get publicUpdatesChannelId() {
    return this._publicUpdatesChannelId;
  }
  set publicUpdatesChannelId(value) {
    this._publicUpdatesChannelId = value;
  }

  /**
   * The preferred locale of a Community guild used in server discovery and notices from Discord.
   */
  get preferredLocale() {
    return this._preferredLocale;
  }
  set preferredLocale(value) {
    this._preferredLocale = value;
  }

  /**
   * Enabled guild features.
   */
  get features() {
    return this._features;
  }
  set features(value) {
    this._features = value;
  }

  /**
   * The description for the guild.
   */
  get description() {
    return this._description;
  }
  set description(value) {
    this._description = value;
  }

  /**
   * Whether the guild's boost progress bar should be enabled.
   */
  get premiumProgressBarEnabled() {
    return this._premiumProgressBarEnabled;
  }
  set premiumProgressBarEnabled(value) {
    this._premiumProgressBarEnabled = value;
  }

  /**
   * The ID of the channel where admins and moderators of Community guilds receive safety alerts from Discord.
   */
  get safetyAlertsChannelId() {
    return this._safetyAlertsChannelId;
  }
  set safetyAlertsChannelId(value) {
    this._safetyAlertsChannelId = value;
  }

  /**
   * Converts the payload to a JSON object.
   * @returns JSON representation of the guild payload.
   */
  toJSON() {
    const result = {};
    if (this._name !== undefined) result.name = this._name;
    if (this._region !== undefined) result.region = this._region;
    if (this._verificationLevel !== undefined) result.verification_level = this._verificationLevel;
    if (this._defaultMessageNotifications !== undefined) result.default_message_notifications = this._defaultMessageNotifications;
    if (this._explicitContentFilter !== undefined) result.explicit_content_filter = this._explicitContentFilter;
    if (this._afkChannelId !== undefined) result.afk_channel_id = this._afkChannelId;
    if (this._afkTimeout !== undefined) result.afk_timeout = this._afkTimeout;
    if (this._icon !== undefined) result.icon = this._icon;
    if (this._ownerId !== undefined) result.owner_id = this._ownerId;
    if (this._splash !== undefined) result.splash = this._splash;
    if (this._discoverySplash !== undefined) result.discovery_splash = this._discoverySplash;
    if (this._banner !== undefined) result.banner = this._banner;
    if (this._systemChannelId !== undefined) result.system_channel_id = this._systemChannelId;
    if (this._systemChannelFlags !== undefined) result.system_channel_flags = this._systemChannelFlags;
    if (this._rulesChannelId !== undefined) result.rules_channel_id = this._rulesChannelId;
    if (this._publicUpdatesChannelId !== undefined) result.public_updates_channel_id = this._publicUpdatesChannelId;
    if (this._preferredLocale !== undefined) result.preferred_locale = this._preferredLocale;
    if (this._features !== undefined) result.features = this._features;
    if (this._description !== undefined) result.description = this._description;
    if (this._premiumProgressBarEnabled !== undefined) result.premium_progress_bar_enabled = this._premiumProgressBarEnabled;
    if (this._safetyAlertsChannelId !== undefined) result.safety_alerts_channel_id = this._safetyAlertsChannelId;
    return result;
  }
}
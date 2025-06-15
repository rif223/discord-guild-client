import { apiEndpoints } from "../rest/endpoints.js";
import { RestApi } from "../rest/request.js";
import { Emoji } from "./emoji.js";
import { GuildPayload } from "./guildPayload.js";
import { Sticker } from "./sticker.js";
export class Guild {
  /**
   * Constructs a new Guild object.
   * @param {Client} client - The client instance managing this guild.
   * @param {any} data - The raw data from the API representing the guild.
   */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the guild properties with the provided data.
   * @param {Object} data - The data object containing guild information.
   */
  _update(data) {
    /**
     * The unique ID of the guild.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The name of the guild. It must be between 2 and 100 characters.
     * @type {string}
     */
    this.name = data.name;

    /**
     * The icon hash of the guild, used for the guild's image.
     * @type {?string}
     */
    this.icon = data.icon;

    /**
     * The alternative hash for the icon, used in templates.
     * @type {?string}
     */
    this.iconHash = data.icon_hash;

    /**
     * The splash image hash for the guild's invite screen.
     * @type {?string}
     */
    this.splash = data.splash;

    /**
     * The splash image hash for guilds discoverable in the Discord UI.
     * Available only for guilds with the "DISCOVERABLE" feature.
     * @type {?string}
     */
    this.discoverySplash = data.discovery_splash;

    /**
     * The banner image hash for the guild, used for decoration in the guild's profile.
     * @type {?string}
     */
    this.banner = data.banner;

    /**
     * The ID of the guild owner.
     * @type {string}
     */
    this.ownerID = data.owner_id;

    /**
     * Whether the current user is the owner of the guild.
     * @type {boolean}
     */
    this.owner = data.owner;

    /**
     * The total permissions available to the user within the guild.
     * Excludes overwrites and implicit permissions.
     * @type {?string}
     */
    this.permissions = data.permissions;

    /**
     * The ID of the AFK (away-from-keyboard) voice channel.
     * @type {?string}
     */
    this.afkChannelID = data.afk_channel_id;

    /**
     * The timeout duration (in seconds) after which members are moved to the AFK channel.
     * @type {number}
     */
    this.afkTimeout = data.afk_timeout;

    /**
     * Whether the server widget is enabled, showing information about the guild.
     * @type {boolean}
     */
    this.widgetEnabled = data.widget_enabled;

    /**
     * The ID of the channel used to generate a widget invite.
     * @type {?string}
     */
    this.widgetChannelID = data.widget_channel_id;

    /**
     * The level of verification required for members to participate in the guild.
     * @type {number}
     */
    this.verificationLevel = data.verification_level;

    /**
     * The default notification setting for the guild (all messages or only mentions).
     * @type {number}
     */
    this.defaultNotifications = data.default_message_notifications;

    /**
     * The level of explicit content filtering applied to messages in the guild.
     * @type {number}
     */
    this.explicitContentFilter = data.explicit_content_filter;

    /**
     * The multi-factor authentication (MFA) level required for the guild.
     * @type {number}
     */
    this.mfaLevel = data.mfa_level;

    /**
     * The application ID of the guild creator, if it was created by a bot.
     * @type {?string}
     */
    this.applicationID = data.application_id;

    /**
     * The ID of the system channel, where system messages like welcome or boost events are posted.
     * @type {?string}
     */
    this.systemChannelID = data.system_channel_id;

    /**
     * Flags for controlling the behavior of the system channel (e.g., suppressing join notifications).
     * @type {number}
     */
    this.systemChannelFlags = data.system_channel_flags;

    /**
     * The ID of the rules channel, where Community guilds display their rules and guidelines.
     * @type {?string}
     */
    this.rulesChannelID = data.rules_channel_id;

    /**
     * The maximum number of presences (online members) allowed in the guild.
     * Can be `null` for large guilds.
     * @type {?number}
     */
    this.maxPresences = data.max_presences;

    /**
     * The maximum number of members that can join the guild.
     * @type {number}
     */
    this.maxMembers = data.max_members;

    /**
     * The vanity URL code for the guild, used for custom invite links.
     * @type {?string}
     */
    this.vanityURL = data.vanity_url_code;

    /**
     * A description of the guild, often used for Community guilds.
     * @type {?string}
     */
    this.description = data.description;

    /**
     * The premium tier of the guild, which indicates the level of boosts.
     * @type {number}
     */
    this.premiumTier = data.premium_tier;

    /**
     * The number of active boosts for the guild.
     * @type {number}
     */
    this.premiumSubscriptionCount = data.premium_subscription_count;

    /**
     * The preferred locale of the guild (e.g., "en-US").
     * @type {string}
     */
    this.preferredLocale = data.preferred_locale;

    /**
     * The ID of the channel where admins and moderators receive community updates.
     * @type {?string}
     */
    this.publicUpdatesChannelID = data.public_updates_channel_id;

    /**
     * The maximum number of users allowed in a video channel.
     * @type {number}
     */
    this.maxVideoChannelUsers = data.max_video_channel_users;

    /**
     * The maximum number of users allowed in a stage video channel.
     * @type {number}
     */
    this.maxStageVideoChannelUsers = data.max_stage_video_channel_users;

    /**
     * The approximate number of members in the guild.
     * Available when with_counts is true in certain API calls.
     * @type {?number}
     */
    this.approximateMemberCount = data.approximate_member_count;

    /**
     * The approximate number of non-offline members in the guild.
     * Available when with_counts is true in certain API calls.
     * @type {?number}
     */
    this.approximatePresenceCount = data.approximate_presence_count;

    /**
     * The welcome screen displayed to new members in Community guilds.
     * @type {Object}
     */
    this.welcomeScreen = data.welcome_screen ? {
      description: data.welcome_screen.description,
      welcomeChannels: data.welcome_screen.welcome_channels?.map(c => ({
        channelID: c.channel,
        description: c.description,
        emojiID: c.emoji_id,
        emojiName: c.emoji_name
      }))
    } : undefined;

    /**
     * Whether the guild is marked as NSFW (Not Safe For Work).
     * @type {boolean}
     */
    this.nsfw = data.nsfw;

    /**
     * The NSFW (Not Safe For Work) level of the guild.
     * @type {number}
     */
    this.nsfwLevel = data.nsfw_level;

    /**
     * Custom stickers that have been uploaded to the guild.
     * @type {Sticker[]}
     */
    this.stickers = data.stickers ? data.stickers.map(stickerData => new Sticker(this._client, stickerData)) : null;

    /**
     * Whether the boost progress bar is enabled in the guild.
     * @type {boolean}
     */
    this.premiumProgressBarEnabled = data.premium_progress_bar_enabled;

    /**
     * The ID of the channel where safety alerts are sent to admins and moderators.
     * @type {?string}
     */
    this.safetyAlertsChannelID = data.safety_alerts_channel_id;

    /**
     * Features enabled for the guild, such as "DISCOVERABLE" or "COMMUNITY".
     * @type {string[]}
     */
    this.features = data.features;

    /**
     * Custom emojis uploaded to the guild.
     * @type {Emoji[]}
     */
    this.emojis = data.emojis ? data.emojis.map(emojiData => new Emoji(this._client, emojiData)) : null;
  }

  /**
   * Edits the guild with the provided options.
   * @param {GuildPayload} options - Fields to update on the guild.
   * @returns {Promise<Guild>} The updated Guild object.
   * @throws {Error} Throws if the API request fails.
   */
  async edit(options) {
    let guildPayload;

    // Check if the options are already a GuildPayload object
    if (options instanceof GuildPayload) {
      guildPayload = options;
    } else {
      guildPayload = new GuildPayload(options);
    }

    // Validate required fields
    if (guildPayload.name && (guildPayload.name.length < 1 || guildPayload.name.length > 100)) {
      throw new Error('Guild name must be between 1 and 100 characters.');
    }

    // Prepare the payload for the API request
    const payload = guildPayload.toJSON();
    try {
      const data = await this._client.rest.request(RestApi.HttpMethod.PATCH, apiEndpoints.guild(), payload);
      return new Guild(this._client, data);
    } catch (error) {
      console.error(`Failed to edit guild ${this.id}:`, error);
      throw error;
    }
  }
}
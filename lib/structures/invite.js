export class Invite {
  /**
   * Constructs a new Invite object.
   * @param {Client} client - The client instance managing this invite.
   * @param {any} data - The raw data from the API representing the invite.
   */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the invite properties with the provided data.
   * @param {any} data - The data object containing invite information.
   */
  _update(data) {
    /**
     * The type of the invite.
     * @type {number}
     */
    this.type = data.type;

    /**
     * The unique invite code.
     * @type {string}
     */
    this.code = data.code;

    /**
     * The partial guild object this invite is for.
     * @type {?Guild}
     */
    this.guild = data.guild;

    /**
     * The partial channel object this invite is for.
     * @type {?GuildChannel}
     */
    this.channel = data.channel;

    /**
     * The user who created the invite.
     * @type {?User}
     */
    this.inviter = data.inviter;

    /**
     * The type of target for this voice channel invite.
     * @type {?number}
     */
    this.targetType = data.target_type;

    /**
     * The user whose stream to display (if applicable).
     * @type {?User}
     */
    this.targetUser = data.target_user;

    /**
     * The embedded application to open (for embedded app invites).
     * @type {?Application}
     */
    this.targetApplication = data.target_application;

    /**
     * Approximate number of online members.
     * Available when with_counts is true.
     * @type {?number}
     */
    this.approximatePresenceCount = data.approximate_presence_count;

    /**
     * Approximate total member count.
     * Available when with_counts is true.
     * @type {?number}
     */
    this.approximateMemberCount = data.approximate_member_count;

    /**
     * The expiration time of the invite in ISO8601 format.
     * Available when with_expiration is true.
     * @type {?string}
     */
    this.expiresAt = data.expires_at;

    /**
     * Stage instance data for public stage invites (deprecated).
     * @type {?object}
     */
    this.stageInstance = data.stage_instance;

    /**
     * Guild scheduled event data.
     * @type {?object}
     */
    this.guildScheduledEvent = data.guild_scheduled_event;
  }
}
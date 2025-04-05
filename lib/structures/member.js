import { apiEndpoints } from "../rest/endpoints.js";
import { RestApi } from "../rest/request.js";
import { User } from "./user.js";
/**
 * Represents a member of the guild.
 */
export class Member {
  roles = [];
  /**
  * Constructs a newMember object.
  * @param {Client} client - The client instance managing this member.
  * @param {any} data - The raw data from the API representing the member.
  */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the member properties with the provided data.
   * @param {Object} data - The data object containing member information.
   */
  _update(data) {
    /**
     * The user object that this guild member represents.
     * @type {User}
     */
    this.user = data.user ? new User(this._client, data.user) : undefined;

    /**
     * The user's guild nickname.
     * @type {string | undefined}
     */
    this.nick = data.nick;

    /**
     * The hash of the member's guild avatar.
     * @type {string | undefined}
     */
    this.avatar = data.avatar;

    /**
     * An array of role IDs assigned to the member.
     * @type {string[]}
     */
    this.roles = data.roles || [];

    /**
     * The timestamp when the user joined the guild (ISO8601 format).
     * @type {string}
     */
    this.joinedAt = data.joined_at;

    /**
     * The timestamp when the user started boosting the guild, or `undefined` if not boosting.
     * @type {string | undefined}
     */
    this.premiumSince = data.premium_since;

    /**
     * Whether the user is deafened in voice channels.
     * @type {boolean}
     */
    this.deaf = data.deaf;

    /**
     * Whether the user is muted in voice channels.
     * @type {boolean}
     */
    this.mute = data.mute;

    /**
     * Guild member flags represented as a bit set.
     * @type {number}
     */
    this.flags = data.flags;

    /**
     * Whether the user has not yet passed the guild's Membership Screening requirements.
     * @type {boolean | undefined}
     */
    this.pending = data.pending;

    /**
     * Total permissions of the member in the channel, including overwrites.
     * @type {string | undefined}
     */
    this.permissions = data.permissions;

    /**
     * When the user's timeout will expire and the user will be able to communicate in the guild again, or `null` if the user is not timed out.
     * @type {string | null | undefined}
     */
    this.communicationDisabledUntil = data.communication_disabled_until ?? null;

    /**
     * Data for the member's guild avatar decoration, or `undefined` if no decoration is set.
     * @type {any | undefined}
     */
    this.avatarDecorationData = data.avatar_decoration_data;
  }

  /**
   * Kicks a user from the guild with the specified reason.
   * 
   * This method performs a kick operation, which removes a user from the guild. It sends a request to the Discord API to update the guild member's status and then removes the member from the local cache.
   * 
   * @param reason The reason for kicking the user. This reason will be included in the audit log for the kick operation, which helps to track why the user was kicked. The reason should be a string and can be up to 512 characters long.
   * 
   * @throws {Error} Throws an error if the user's ID is not available. This occurs when `this.user?.id` is `undefined`, which means the user cannot be identified, and the kick operation cannot proceed.
   * 
   * @returns {Promise<void>} A promise that resolves when the kick operation is completed. The `request` method sends the API request to Discord, and the `remove` method updates the local cache of members.
   */
  kick(reason) {
    const userId = this.user?.id;
    if (!userId) {
      throw new Error('User ID is undefined. Cannot perform kick operation.');
    }
    this._client.members?.remove(userId);
    return this._client.rest.request(RestApi.HttpMethod.DELETE, apiEndpoints.guildMember(userId), {
      reason
    });
  }

  /**
   * Bans a user with the given reason and options.
   * @param reason The reason for banning the user.
   * @param options Optional parameters for the ban.
   * @param options.delete_message_seconds The number of seconds to delete messages for (0-604800, where 0 is no deletion).
   */
  ban(reason, options = {}) {
    // Validate the options
    const {
      delete_message_days,
      delete_message_seconds
    } = options;

    // Check for deprecated delete_message_days
    if (delete_message_days !== undefined) {
      console.warn('Warning: delete_message_days is deprecated. Use delete_message_seconds instead.');
    }

    // Ensure delete_message_seconds is within the valid range
    if (delete_message_seconds !== undefined) {
      if (delete_message_seconds < 0 || delete_message_seconds > 604800) {
        throw new Error('delete_message_seconds must be between 0 and 604800 seconds.');
      }
    }

    // Validate the reason
    if (!reason || typeof reason !== 'string') {
      throw new Error('A valid reason must be provided for the ban.');
    }

    // Prepare the payload
    const payload = {
      reason,
      delete_message_seconds: delete_message_seconds !== undefined ? delete_message_seconds : delete_message_days !== undefined ? delete_message_days * 86400 // Convert days to seconds
      : 0 // Default to 0 if neither is provided
    };

    // Ensure the payload always has the delete_message_seconds property
    if (delete_message_days !== undefined && delete_message_seconds === undefined) {
      payload.delete_message_seconds = delete_message_days * 86400; // Convert days to seconds
    }
    const userId = this.user?.id;
    if (!userId) {
      throw new Error('User ID is undefined. Cannot perform ban operation.');
    }
    this._client.members?.remove(userId);

    // Perform the ban operation
    return this._client.rest.request(RestApi.HttpMethod.PUT, apiEndpoints.guildBan(userId), payload);
  }

  /**
   * Unbans a user from the guild with the specified reason.
   * 
   * This method performs an unban operation, which removes a ban from a user in the guild. It sends a request to the Discord API to lift the ban and includes a reason for the action in the audit log.
   * 
   * @param userId The ID of the user to be unbanned. This ID uniquely identifies the user within the guild.
   * @param reason The reason for unbanning the user. This reason will be included in the audit log for the unban operation, which helps to track why the user was unbanned. The reason should be a string and can be up to 512 characters long.
   * 
   * @throws {Error} Throws an error if the `userId` is not provided or invalid. This means the user cannot be identified, and the unban operation cannot proceed.
   * 
   * @returns {Promise<void>} A promise that resolves when the unban operation is completed. The `request` method sends the API request to Discord.
   */
  unban(userId, reason) {
    return this._client.rest.request(RestApi.HttpMethod.DELETE, apiEndpoints.guildBan(userId), {
      reason
    });
  }

  /**
   * Edits the properties of the guild member with the specified options.
   * 
   * This method sends a request to the Discord API to update the member's attributes 
   * identified by their user ID within the guild. The updated member data will be reflected 
   * in the current instance after the operation is successful.
   *
   * @param {Object} options - The options for editing the member.
   * @param {string} [options.nick] - The nickname to set for the user.
   * @param {string[]} [options.roles] - An array of role IDs to assign to the member.
   * @param {boolean} [options.mute] - Whether to mute the user in voice channels.
   * @param {boolean} [options.deaf] - Whether to deafen the user in voice channels.
   * @param {string} [options.channel_id] - The ID of the channel to move the user to if they are connected to voice.
   * @param {string | null} [options.communication_disabled_until] - The timestamp until the user is muted, or null to remove the timeout.
   * @param {number} [options.flags] - Guild member flags to set for the member.
   * 
   * @returns {Promise<Member>} A promise that resolves to the updated Member instance.
   *
   * @throws {Error} If the user's ID is not available or if the API request fails.
   */
  async edit(options) {
    const userId = this.user?.id;
    if (!userId) {
      throw new Error('User ID is undefined. Cannot perform edit operation.');
    }

    // Prepare the payload for the API request
    const payload = {
      nick: options.nick,
      roles: options.roles,
      mute: options.mute,
      deaf: options.deaf,
      channel_id: options.channel_id,
      communication_disabled_until: options.communication_disabled_until,
      flags: options.flags
    };
    try {
      // Call the API to edit the member
      const data = await this._client.rest.request(RestApi.HttpMethod.PATCH, apiEndpoints.guildMember(userId), payload);
      return new Member(this._client, data);
    } catch (error) {
      console.error("Failed to edit member:", error); // Log the error
      throw error; // Re-throw the error for higher-level handling
    }
  }

  /**
   * Adds a role to a member in the guild.
   *
   * @param roleId - The ID of the role to be added.
   * @throws Error - If the guildID or memberID is missing.
   * @throws Error - If an error occurs during the API request.
   */
  async addRole(roleId) {
    // Ensure necessary properties (guildID and memberID) are available
    if (!this.user?.id) {
      throw new Error('Missing memberID. Cannot add role.');
    }
    try {
      // Make the API request to add the role
      await this._client.rest.request(RestApi.HttpMethod.PUT, apiEndpoints.guildMemberRole(this.user.id, roleId), {});
    } catch (error) {
      console.error("Failed to add role:", error); // Log the error
      throw error; // Re-throw error for higher-level handling
    }
  }

  /**
   * Removes a role from a member in the guild.
   *
   * This method sends a request to the Discord API to remove the specified role from the member.
   * It ensures that the member's ID is available before proceeding with the request.
   *
   * @param roleId - The ID of the role to be removed.
   * @throws Error - If the member's ID is missing.
   * @throws Error - If an error occurs during the API request.
   */
  async removeRole(roleId) {
    // Ensure necessary properties (memberID) are available
    if (!this.user?.id) {
      throw new Error('Missing memberID. Cannot remove role.');
    }
    try {
      // Make the API request to remove the role
      await this._client.rest.request(RestApi.HttpMethod.DELETE, apiEndpoints.guildMemberRole(this.user.id, roleId), {});
    } catch (error) {
      console.error("Failed to remove role:", error); // Log the error
      throw error; // Re-throw error for higher-level handling
    }
  }
}
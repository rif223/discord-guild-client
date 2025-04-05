import { apiEndpoints } from "../rest/endpoints.js";
import { RestApi } from "../rest/request.js";
import { RolePayload } from "./rolePayload.js";
/**
 * Represents a role of the guild.
 */
export class Role {
  /**
  * Constructs a new Role object.
  * @param {Client} client - The client instance managing this role.
  * @param {any} data - The raw data from the API representing the role.
  */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the role properties with the provided data.
   * @param {Object} data - The data object containing role information.
   */
  _update(data) {
    /**
     * The unique identifier for the role.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The name of the role.
     * @type {string}
     */
    this.name = data.name;

    /**
     * The color of the role represented as an integer.
     * @type {number}
     */
    this.color = data.color;

    /**
     * Whether this role is pinned in the user listing.
     * @type {boolean}
     */
    this.hoist = data.hoist;

    /**
     * The hash of the role icon, or `undefined` if no icon is set.
     * @type {string | undefined}
     */
    this.icon = data.icon;

    /**
     * The unicode emoji associated with the role, or `undefined` if no emoji is set.
     * @type {string | undefined}
     */
    this.unicodeEmoji = data.unicode_emoji;

    /**
     * The position of the role in the role hierarchy.
     * Roles with the same position are sorted by ID.
     * @type {number}
     */
    this.position = data.position;

    /**
     * The permission bit set for this role.
     * @type {string}
     */
    this.permissions = data.permissions;

    /**
     * Whether this role is managed by an integration.
     * @type {boolean}
     */
    this.managed = data.managed;

    /**
     * Whether this role is mentionable.
     * @type {boolean}
     */
    this.mentionable = data.mentionable;

    /**
     * The tags associated with this role, or `undefined` if no tags are set.
     * @type {any | undefined}
     */
    this.tags = data.tags;

    /**
     * The role flags combined as a bitfield.
     * @type {number}
     */
    this.flags = data.flags;
  }

  /**
   * Creates a new role in the guild with the specified options.
   * 
   * This function accepts either a `RolePayload` instance or a plain options object to create and send a role creation request.
   * It validates the options, prepares the payload, and then sends the request to create the role.
   * Finally, it returns a promise that resolves to the newly created role's data.
   *
   * @param {RolePayload | object} options - The role creation options, which can be an instance of `RolePayload` or a plain object with role data.
   * @returns {Promise<Role>} A promise that resolves to the newly created Role instance.
   *
   * @throws {Error} If there is an issue with the provided options or the API request.
   */
  async create(options) {
    let rolePayload;

    // Check if the options are already a RolePayload object
    if (options instanceof RolePayload) {
      rolePayload = options;
    } else {
      rolePayload = new RolePayload(options);
    }

    // Validate required fields
    if (!rolePayload.name || rolePayload.name.length < 1 || rolePayload.name.length > 100) {
      throw new Error('Role name must be between 1 and 100 characters.');
    }

    // Prepare the payload for the API request
    const payload = rolePayload.toJSON();
    try {
      // Call the API to create the role
      const data = await this._client.rest.request(RestApi.HttpMethod.POST, apiEndpoints.guildRoles(), payload);
      return new Role(this._client, data);
    } catch (error) {
      console.error("Failed to create role:", error); // Log the error
      throw error; // Re-throw the error for higher-level handling
    }
  }

  /**
   * Edits the properties of the role with the specified options.
   * 
   * This method sends a request to the Discord API to update the role's attributes 
   * identified by its ID within the guild. The updated role data will be reflected 
   * in the current instance after the operation is successful.
   *
   * @param {RolePayload | object} options - The options for editing the role, which can be an 
   *                                         instance of `RolePayload` or a plain object with role data.
   * @returns {Promise<Role>} A promise that resolves to the updated Role instance.
   *
   * @throws {Error} If there is an issue with the provided options or the API request fails, 
   *                 such as insufficient permissions or invalid data.
   */
  async edit(options) {
    let rolePayload;

    // Check if the options are already a RolePayload object
    if (options instanceof RolePayload) {
      rolePayload = options;
    } else {
      rolePayload = new RolePayload(options);
    }

    // Prepare the payload for the API request
    const payload = rolePayload.toJSON();
    try {
      // Call the API to edit the role
      const data = await this._client.rest.request(RestApi.HttpMethod.PATCH, apiEndpoints.guildRole(this.id), payload);
      return new Role(this._client, data);
    } catch (error) {
      console.error("Failed to edit role:", error); // Log the error
      throw error; // Re-throw the error for higher-level handling
    }
  }

  /**
   * Deletes the specified role from the guild.
   * 
   * This method sends a request to the Discord API to permanently delete a role 
   * identified by its ID within the guild. Once deleted, the role cannot be recovered,
   * and users assigned to this role will lose all permissions associated with it.
   *
   * @returns {Promise<void>} A promise that resolves when the role has been successfully deleted.
   *
   * @throws {Error} Throws an error if the deletion request fails. This may occur due to insufficient permissions,
   *                 if the role does not exist, or if the guild is not accessible.
   */
  delete() {
    return this._client.rest.request(RestApi.HttpMethod.DELETE, apiEndpoints.guildRole(this.id));
  }
}
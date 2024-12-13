import { apiEndpoints } from "../rest/endpoints.js";
import { RestApi } from "../rest/request.js";
import { Guild } from "./guild.js";
import { GuildChannel } from "./guildChannel.js";
import { Member } from "./member.js";
import { Message } from "./message.js";
import { MessagePayload } from "./messagePayload.js";
import { User } from "./user.js";
/**
 * Represents a Discord interaction.
 */
export class Interaction {
  /**
   * The unique ID of the interaction.
   * @type {string}
   */

  /**
   * The ID of the application this interaction is for.
   * @type {string}
   */

  /**
   * The type of interaction.
   * @type {number}
   */

  /**
   * The interaction data payload, if any.
   * @type {?any}
   */

  /**
   * The partial guild object from which the interaction was sent, if applicable.
   * @type {?Guild}
   */

  /**
   * The ID of the guild from which the interaction was sent, if applicable.
   * @type {?string}
   */

  /**
   * The partial channel object from which the interaction was sent, if applicable.
   * @type {?GuildChannel}
   */

  /**
   * The ID of the channel from which the interaction was sent, if applicable.
   * @type {?string}
   */

  /**
   * The guild member object for the invoking user, including permissions, if applicable.
   * @type {?Member}
   */

  /**
   * The user object for the invoking user, if invoked in a DM.
   * @type {?User}
   */

  /**
   * The continuation token for responding to the interaction.
   * @type {string}
   */

  /**
   * The read-only version property, always set to 1.
   * @type {number}
   */
  version = 1;

  /**
   * The message object for components, if applicable.
   * @type {?Message}
   */

  /**
   * The bitwise set of permissions the app has in the source location of the interaction.
   * @type {?string}
   */

  /**
   * The selected language of the invoking user, if available.
   * @type {?string}
   */

  /**
   * The preferred locale of the guild, if invoked in a guild.
   * @type {?string}
   */

  /**
   * For monetized apps, any entitlements for the invoking user, representing access to premium SKUs.
   * @type {?any[]}
   */

  /**
   * A mapping of installation contexts that the interaction was authorized for, related to user or guild IDs.
   * @type {?any}
   */

  /**
   * The context where the interaction was triggered from, if applicable.
   * @type {?number}
   */

  /**
   * Constructs a new Interaction object.
   * @param {Client} client - The client instance managing this interaction.
   * @param {any} data - The raw data from the API representing the interaction.
   */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the interaction's properties with the provided data.
   * @param {Object} data - The data object containing interaction information.
   */
  _update(data) {
    if (data.id !== undefined) this.id = data.id;
    if (data.application_id !== undefined) this.applicationId = data.application_id;
    if (data.type !== undefined) this.type = data.type;
    if (data.data !== undefined) this.data = data.data ?? null;
    if (data.guild !== undefined) this.guild = data.guild ? new Guild(this._client, data.guild) : undefined;
    if (data.guild_id !== undefined) this.guildId = data.guild_id ?? null;
    if (data.channel !== undefined) this.channel = data.channel ? new GuildChannel(this._client, data.channel) : undefined;
    if (data.channel_id !== undefined) this.channelId = data.channel_id ?? null;
    if (data.member !== undefined) this.member = data.member ? new Member(this._client, data.member) : undefined;
    if (data.user !== undefined) this.user = data.user ? new User(this._client, data.user) : undefined;
    if (data.token !== undefined) this.token = data.token;
    if (data.version !== undefined) this.version = data.version ?? 1;
    if (data.message !== undefined) this.message = data.message ? new Message(this._client, data.message) : undefined;
    if (data.app_permissions !== undefined) this.appPermissions = data.app_permissions ?? null;
    if (data.locale !== undefined) this.locale = data.locale ?? null;
    if (data.guild_locale !== undefined) this.guildLocale = data.guild_locale ?? null;
    if (data.entitlements !== undefined) this.entitlements = data.entitlements ?? null;
    if (data.authorizing_integration_owners !== undefined) this.authorizingIntegrationOwners = data.authorizing_integration_owners ?? null;
    if (data.context !== undefined) this.context = data.context ?? null;
  }

  /**
    * Sends a reply to an interaction with the specified options.
    * @param {MessagePayload | object} options - The reply options, which can be an instance 
    * of `MessagePayload` or a plain object with message data.
    * @returns A promise that resolves with the result of the interaction reply.
    * 
    * @throws Error If there is an issue with processing the interaction or sending the reply.
    */
  async reply(options) {
    let messagePayload;

    // Check if the options are already a MessagePayload object
    if (options instanceof MessagePayload) {
      messagePayload = options;
    } else {
      messagePayload = new MessagePayload(options);
    }

    // Resolve the message data and files if necessary
    options = await messagePayload.resolveFiles();
    options = {
      data: options,
      type: 4
    };
    try {
      // Send the reply to the interaction
      const data = await this._client.rest.request(RestApi.HttpMethod.POST, apiEndpoints.guildInteractionCallback(this.id, this.token), options);
      return data; // Return the API response for further processing if necessary
    } catch (error) {
      console.error("Failed to send interaction reply:", error); // Log the error
      throw error; // Re-throw the error for higher-level handling
    }
  }
}
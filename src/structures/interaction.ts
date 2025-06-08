import { Client } from "../client";
import { apiEndpoints } from "../rest/endpoints";
import { RestApi } from "../rest/request";
import { Guild } from "./guild";
import { GuildChannel } from "./guildChannel";
import { Member } from "./member";
import { Message } from "./message";
import { MessagePayload } from "./messagePayload";
import { User } from "./user";

/**
 * Represents a Discord interaction.
 */
export class Interaction {
  public _client: Client;

  public id!: string;
  public applicationId!: string;
  public type!: number;
  public data?: any;
  public guild?: Guild;
  public guildId?: string;
  public channel?: GuildChannel;
  public channelId?: string;
  public member?: Member;
  public user?: User;
  public token!: string;
  public version: number = 1;
  public message?: Message;
  public appPermissions?: string;
  public locale?: string;
  public guildLocale?: string;
  public entitlements?: any[];
  public authorizingIntegrationOwners?: any;
  public context?: number;

  /**
   * Constructs a new Interaction object.
   * @param {Client} client - The client instance managing this interaction.
   * @param {any} data - The raw data from the API representing the interaction.
   */
  constructor(client: Client, data: any) {
    this._client = client;

    this._update(data);
  }

  /**
   * Updates the interaction's properties with the provided data.
   * @param {Object} data - The data object containing interaction information.
   */
  private _update(data: any) {
    /**
     * The unique ID of the interaction.
     * @type {string}
     */
    this.id = data.id;

    /**
     * The ID of the application this interaction is for.
     * @type {string}
     */
    this.applicationId = data.application_id;

    /**
     * The type of interaction.
     * @type {number}
     */
    this.type = data.type;

    /**
     * The interaction data payload, if any.
     * @type {?any}
     */
    this.data = data.data ?? null;

    /**
     * The partial guild object from which the interaction was sent, if applicable.
     * @type {?Guild}
     */
    this.guild = data.guild ? new Guild(this._client, data.guild) : undefined;

    /**
     * The ID of the guild from which the interaction was sent, if applicable.
     * @type {?string}
     */
    this.guildId = data.guild_id ?? null;

    /**
     * The partial channel object from which the interaction was sent, if applicable.
     * @type {?GuildChannel}
     */
    this.channel = data.channel ? new GuildChannel(this._client, data.channel) : undefined;

    /**
     * The ID of the channel from which the interaction was sent, if applicable.
     * @type {?string}
     */
    this.channelId = data.channel_id ?? null;

    /**
     * The guild member object for the invoking user, including permissions, if applicable.
     * @type {?Member}
     */
    this.member = data.member ? new Member(this._client, data.member) : undefined;

    /**
     * The user object for the invoking user, if invoked in a DM.
     * @type {?User}
     */
    this.user = data.user ? new User(this._client, data.user) : undefined;

    /**
     * The continuation token for responding to the interaction.
     * @type {string}
     */
    this.token = data.token;

    /**
     * The read-only version property, always set to 1.
     * @type {number}
     */
    this.version = data.version ?? 1;

    /**
     * The message object for components, if applicable.
     * @type {?Message}
     */
    this.message = data.message ? new Message(this._client, data.message) : undefined;

    /**
     * The bitwise set of permissions the app has in the source location of the interaction.
     * @type {?string}
     */
    this.appPermissions = data.app_permissions ?? null;

    /**
     * The selected language of the invoking user, if available.
     * @type {?string}
     */
    this.locale = data.locale ?? null;

    /**
     * The preferred locale of the guild, if invoked in a guild.
     * @type {?string}
     */
    this.guildLocale = data.guild_locale ?? null;

    /**
     * For monetized apps, any entitlements for the invoking user, representing access to premium SKUs.
     * @type {?any[]}
     */
    this.entitlements = data.entitlements ?? null;

    /**
     * A mapping of installation contexts that the interaction was authorized for, related to user or guild IDs.
     * @type {?any}
     */
    this.authorizingIntegrationOwners = data.authorizing_integration_owners ?? null;

    /**
     * The context where the interaction was triggered from, if applicable.
     * @type {?number}
     */
    this.context = data.context ?? null;
  }

  /**
    * Sends a reply to an interaction with the specified options.
    * @param {MessagePayload | object} options - The reply options, which can be an instance 
    * of `MessagePayload` or a plain object with message data.
    * @returns A promise that resolves with the result of the interaction reply.
    * 
    * @throws Error If there is an issue with processing the interaction or sending the reply.
    */
  public async reply(options: MessagePayload | object): Promise<any> {
    let messagePayload: MessagePayload;

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
    }

    try {
      // Send the reply to the interaction
      const data = await this._client.rest.request(
        RestApi.HttpMethod.POST,
        apiEndpoints.guildInteractionCallback(this.id, this.token),
        options
      );

      return data; // Return the API response for further processing if necessary

    } catch (error) {
      console.error("Failed to send interaction reply:", error); // Log the error
      throw error; // Re-throw the error for higher-level handling
    }
  }

}
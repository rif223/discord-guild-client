'use strict';

import { EventEmitter } from "events";
import { Guild } from "./structures/guild.js";
import { apiEndpoints } from "./rest/endpoints.js";
import { RestApi } from "./rest/request.js";
import { WebSocketClient } from "./ws/websocket.js";
import { Message } from "./structures/message.js";
import { Role } from "./structures/role.js";
import { GuildChannel } from "./structures/guildChannel.js";
import { Member } from "./structures/member.js";
import { Reaction } from "./structures/reaction.js";
import { VoiceState } from "./structures/voiceState.js";
import { Interaction } from "./structures/interaction.js";
import { GuildBan } from "./structures/guildBan.js";
import { Collection } from "./utils/collection.js";
import { User } from "./structures/user.js";
import { ApplicationCommand } from "./structures/applicationCommand.js";
import { CommandPayload } from "./structures/commandPayload.js";
/**
 * Interface representing the various events emitted by a client.
 */
/**
 * Represents the main client for interacting with the API and WebSocket.
 * Extends the EventEmitter to handle events.
 */
export class Client extends EventEmitter {
  /**
   * WebSocket client instance used to handle real-time events and updates from the server.
   * @type {WebSocketClient}
   */

  /**
   * REST API client instance used for making HTTP requests to the server.
   * @type {RestApi}
   */

  /**
   * Represents the bot user object for the client.
   * This property is initialized asynchronously and may be undefined until the initialization is complete.
   * @type {User}
   */

  /**
   * Represents the guild object for the client.
   * This property is initialized asynchronously and may be undefined until the initialization is complete.
   * @type {Guild}
   */

  /**
   * A collection of channels associated with the client.
   * 
   * This property is initialized asynchronously after the client is created and
   * contains all channels associated with the current guild.
   * 
   * The collection is managed by the `Collection` class and uses the channel ID
   * as the key to access individual channels.
   * 
   * Note: The `channels` property may be `undefined` if the initialization is not
   * yet complete or if there was an error fetching the channels. Ensure to check
   * the state of this property before attempting to access channels.
   * @type {Collection<GuildChannel> | undefined}
   */

  /**
   * A collection of members associated with the client.
   * 
   * This property is initialized asynchronously after the client is created and
   * contains all members associated with the current guild.
   * 
   * The collection is managed by the `Collection` class and uses the member ID
   * as the key to access individual members.
   * 
   * Note: The `members` property may be `undefined` if the initialization is not
   * yet complete or if there was an error fetching the members. Ensure to check
   * the state of this property before attempting to access members.
   * @type {Collection<Member> | undefined}
   */

  /**
   * A collection of roles associated with the client.
   * 
   * This property is initialized asynchronously after the client is created and
   * contains all roles associated with the current guild.
   * 
   * The collection is managed by the `Collection` class and uses the role ID
   * as the key to access individual roles.
   * 
   * Note: The `roles` property may be `undefined` if the initialization is not
   * yet complete or if there was an error fetching the roles. Ensure to check
   * the state of this property before attempting to access roles.
   * @type {Collection<Role> | undefined}
   */

  /**
   * Creates an instance of the Client class.
   * Initializes the WebSocket and REST API clients and sets up the guild data.
   *
   * @param host - The base URL of the API server.
   * @param token - The authentication token for the API requests.
   */
  constructor(host, token) {
    super();
    this.ws = new WebSocketClient(this, host, token);
    this.rest = new RestApi(host, token);
    this.channels = new Collection(this, GuildChannel);
    this.members = new Collection(this, Member);
    this.roles = new Collection(this, Role);
    this.initialize();
  }
  on(event, listener) {
    return super.on(event, listener);
  }

  /**
   * Initializes the client by fetching the guild data and setting it to the guild property.
   * This method is called in the constructor to ensure the client is ready to use after creation.
   *
   * @returns {Promise<void>} A promise that resolves when the initialization is complete.
   * 
   * @throws {Error} Throws an error if the API request fails or the data cannot be processed.
   */
  async initialize() {
    //if(!this.ws.conn) return;

    let channels = await this.rest.request(RestApi.HttpMethod.GET, apiEndpoints.guildChannels());
    for (const channel of channels) {
      this.channels?.add(channel.id, channel);
    }
    let members = await this.rest.request(RestApi.HttpMethod.GET, apiEndpoints.guildMembers());
    for (const member of members) {
      this.members?.add(member.user.id, member);
    }
    let roles = await this.rest.request(RestApi.HttpMethod.GET, apiEndpoints.guildRoles());
    for (const role of roles) {
      this.roles?.add(role.id, role);
    }
    this.user = new User(this, await this.rest.request(RestApi.HttpMethod.GET, apiEndpoints.user()));
    this.guild = new Guild(this, await this.rest.request(RestApi.HttpMethod.GET, apiEndpoints.guild()));

    // Ready Events
    /**
     * Emits an event when the client is ready.
     * 
     * @event ready
     */
    this.emit("ready");
    return;
  }
  _registerEvent(name, data) {
    switch (name) {
      // Message Events
      /**
       * Emits an event when a new message is created.
       * 
       * @event messageCreate
       * @param {Message} message - The message that was created.
       */
      case "MESSAGE_CREATE":
        this.emit("messageCreate", new Message(this, data));
        break;
      /**
       * Emits an event when an existing message is updated.
       * 
       * @event messageUpdate
       * @param {Message} message - The message that was updated.
       */
      case "MESSAGE_UPDATE":
        this.emit("messageUpdate", new Message(this, data));
        break;
      /**
       * Emits an event when a message is deleted.
       * 
       * @event messageDelete
       * @param {Message} message - The message that was deleted.
       */
      case "MESSAGE_DELETE":
        this.emit("messageDelete", new Message(this, data));
        break;

      // Reaction Events
      /**
       * Emits an event when a reaction is added to a message.
       * 
       * @event messageReactionAdd
       * @param {Reaction} reaction - The reaction that was added.
       */
      case "MESSAGE_REACTION_ADD":
        this.emit("messageReactionAdd", new Reaction(this, data));
        break;
      /**
       * Emits an event when a reaction is removed from a message.
       * 
       * @event messageReactionRemove
       * @param {Reaction} reaction - The reaction that was removed.
       */
      case "MESSAGE_REACTION_REMOVE":
        this.emit("messageReactionRemove", new Reaction(this, data));
        break;
      /**
       * Emits an event when all reactions are removed from a message.
       * 
       * @event messageReactionRemoveAll
       * @param {Reaction} reaction - The reaction data, if available.
       */
      case "MESSAGE_REACTION_REMOVE_ALL":
        this.emit("messageReactionRemoveAll", new Reaction(this, data));
        break;

      // Guild Member Events
      /**
       * Emits an event when a new member joins the guild.
       * 
       * @event guildMemberAdd
       * @param {Member} member - The member who joined the guild.
       */
      case "GUILD_MEMBER_ADD":
        this.members?.add(data.user_id, data);
        this.emit("guildMemberAdd", new Member(this, data));
        break;
      /**
       * Emits an event when a member's details are updated.
       * 
       * @event guildMemberUpdate
       * @param {Member} member - The member whose details were updated.
       */
      case "GUILD_MEMBER_UPDATE":
        this.members?.add(data.user_id, data);
        this.emit("guildMemberUpdate", new Member(this, data));
        break;
      /**
       * Emits an event when a member leaves the guild.
       * 
       * @event guildMemberRemove
       * @param {Member} member - The member who left the guild.
       */
      case "GUILD_MEMBER_REMOVE":
        this.members?.remove(data.user_id);
        this.emit("guildMemberRemove", new Member(this, data));
        break;

      // Guild Ban Events
      /**
       * Emits an event when a member is banned from the guild.
       * 
       * @event guildBanAdd
       * @param {GuildBan} guildBan - The guild ban details.
       */
      case "GUILD_BAN_ADD":
        this.emit("guildBanAdd", new GuildBan(this, data));
        break;
      /**
       * Emits an event when a member is unbanned from the guild.
       * 
       * @event guildBanRemove
       * @param {GuildBan} guildBan - The guild ban details.
       */
      case "GUILD_BAN_REMOVE":
        this.emit("guildBanRemove", new GuildBan(this, data));
        break;

      // Guild Update Event
      /**
       * Emits an event when the guild details are updated.
       * 
       * @event guildUpdate
       * @param {Guild} guild - The updated guild details.
       */
      case "GUILD_UPDATE":
        this.emit("guildUpdate", new Guild(this, data));
        break;

      // Role Events
      /**
       * Emits an event when a new role is created in the guild.
       * 
       * @event roleCreate
       * @param {Role} role - The new role that was created.
       */
      case "GUILD_ROLE_CREATE":
        this.roles?.add(data.id, data);
        this.emit("roleCreate", new Role(this, data));
        break;
      /**
       * Emits an event when a role is updated in the guild.
       * 
       * @event roleUpdate
       * @param {Role} role - The role that was updated.
       */
      case "GUILD_ROLE_UPDATE":
        this.roles?.add(data.id, data);
        this.emit("roleUpdate", new Role(this, data));
        break;
      /**
       * Emits an event when a role is deleted from the guild.
       * 
       * @event roleDelete
       * @param {Role} role - The role that was deleted.
       */
      case "GUILD_ROLE_DELETE":
        this.roles?.remove(data.id);
        this.emit("roleDelete", new Role(this, data));
        break;

      // Channel Events
      /**
       * Emits an event when a new channel is created in the guild.
       * 
       * @event channelCreate
       * @param {GuildChannel} channel - The new channel that was created.
       */
      case "CHANNEL_CREATE":
        this.channels?.add(data.id, data);
        this.emit("channelCreate", new GuildChannel(this, data));
        break;
      /**
       * Emits an event when a channel is updated in the guild.
       * 
       * @event channelUpdate
       * @param {GuildChannel} channel - The channel that was updated.
       */
      case "CHANNEL_UPDATE":
        this.channels?.add(data.id, data);
        this.emit("channelUpdate", new GuildChannel(this, data));
        break;
      /**
       * Emits an event when a channel is deleted from the guild.
       * 
       * @event channelDelete
       * @param {GuildChannel} channel - The channel that was deleted.
       */
      case "CHANNEL_DELETE":
        this.channels?.remove(data.id);
        this.emit("channelDelete", new GuildChannel(this, data));
        break;

      // Voice State Update Event
      /**
       * Emits an event when a user's voice state changes.
       * 
       * @event voiceStateUpdate
       * @param {VoiceState} voiceState - The updated voice state details.
       */
      case "VOICE_STATE_UPDATE":
        this.emit("voiceStateUpdate", new VoiceState(this, data));
        break;

      // Interaction Event
      /**
       * Emits an event when an interaction is created.
       * 
       * @event interactionCreate
       * @param {Interaction} interaction - The interaction that was created.
       */
      case "INTERACTION_CREATE":
        this.emit("interactionCreate", new Interaction(this, data));
        break;
      default:
        console.warn(`Unknown event: ${name}`);
        break;
    }
  }

  /**
    * Registers a new application command.
    * @param {CommandPayload | object} options - The command creation options.
    * @returns {Promise<ApplicationCommand>} The registered application command.
    */
  async registerCommand(options) {
    try {
      let commandPayload;

      // Check if the options are already a RolePayload object
      if (options instanceof CommandPayload) {
        commandPayload = options;
      } else {
        commandPayload = new CommandPayload(options);
      }

      // Prepare the payload for the API request
      const payload = commandPayload.toJSON();
      const data = await this.rest.request(RestApi.HttpMethod.POST, apiEndpoints.guildCommands(), payload);
      return new ApplicationCommand(this, data);
    } catch (error) {
      console.error("Failed to create command:", error);
      throw error;
    }
  }

  /**
    * Retrieves all application commands for the guild.
    * @returns {Promise<any>} A promise that resolves to an array of application commands for the guild.
    */
  async getCommands() {
    return this.rest.request(RestApi.HttpMethod.GET, apiEndpoints.guildCommands());
  }

  /**
    * Retrieves a specific application command by its ID.
    * @param {string} id - The unique ID of the application command.
    * @returns {Promise<any>} A promise that resolves to the application command data.
    */
  async getCommand(id) {
    return this.rest.request(RestApi.HttpMethod.GET, apiEndpoints.guildCommand(id));
  }

  /**
    * Unregister the application command.
    * @returns {Promise<void>} Resolves when the command is unregistered.
    */
  async unregisterCommand(id) {
    try {
      await this.rest.request(RestApi.HttpMethod.DELETE, apiEndpoints.guildCommand(id));
    } catch (error) {
      console.error("Failed to delete command:", error);
      throw error;
    }
  }
}
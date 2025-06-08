'use strict';

import { EventEmitter } from "events";
import { Guild } from "./structures/guild.js";
import { apiEndpoints } from "./rest/endpoints.js";
import { RestApi } from "./rest/request.js";
import { WebSocketClient } from "./ws/websocket.js";
import { Role } from "./structures/role.js";
import { GuildChannel } from "./structures/guildChannel.js";
import { Member } from "./structures/member.js";
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
   * Creates an instance of the Client class.
   * Initializes the WebSocket and REST API clients and sets up the guild data.
   *
   * @param host - The base URL of the API server.
   * @param token - The authentication token for the API requests.
   */
  constructor(host, token) {
    super();

    /**
     * WebSocket client instance used to handle real-time events and updates from the server.
     * @type {WebSocketClient}
     */
    this.ws = new WebSocketClient(this, host, token);

    /**
     * REST API client instance used for making HTTP requests to the server.
     * @type {RestApi}
     */
    this.rest = new RestApi(host, token);

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
    this.channels = new Collection(this, GuildChannel);

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
    this.members = new Collection(this, Member);

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
    this.roles = new Collection(this, Role);

    /**
     * A collection of application commands associated with the client.
     * 
     * This property is initialized asynchronously after the client is created and
     * contains all commands registered in the current guild.
     * 
     * The collection is managed by the `Collection` class and uses the command ID
     * as the key to access individual commands.
     * 
     * Note: The `commands` property may be `undefined` if the initialization is not
     * yet complete or if there was an error fetching the commands. Ensure to check
     * the state of this property before attempting to access commands.
     * @type {Collection<ApplicationCommand> | undefined}
     */
    this.commands = new Collection(this, ApplicationCommand);
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
    let commands = await this.rest.request(RestApi.HttpMethod.GET, apiEndpoints.guildCommands());
    for (const command of commands) {
      this.commands?.add(command.id, command);
    }

    /**
     * Represents the bot user object for the client.
     * This property is initialized asynchronously and may be undefined until the initialization is complete.
     * @type {User}
     */
    this.user = new User(this, await this.rest.request(RestApi.HttpMethod.GET, apiEndpoints.user()));

    /**
     * Represents the guild object for the client.
     * This property is initialized asynchronously and may be undefined until the initialization is complete.
     * @type {Guild}
     */
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
      this.commands?.add(data.id, data);
      return new ApplicationCommand(this, data);
    } catch (error) {
      console.error("Failed to create command:", error);
      throw error;
    }
  }

  /**
    * Unregister the application command.
    * @returns {Promise<void>} Resolves when the command is unregistered.
    */
  async unregisterCommand(id) {
    try {
      await this.rest.request(RestApi.HttpMethod.DELETE, apiEndpoints.guildCommand(id));
      this.commands?.remove(id);
    } catch (error) {
      console.error("Failed to delete command:", error);
      throw error;
    }
  }
}
'use strict';

import { EventEmitter } from "events";
import { Guild } from "./structures/guild";
import { apiEndpoints } from "./rest/endpoints";
import { RestApi } from "./rest/request";
import { WebSocketClient } from "./ws/websocket";
import { Message } from "./structures/message";
import { Role } from "./structures/role";
import { GuildChannel } from "./structures/guildChannel";
import { Member } from "./structures/member";
import { Reaction } from "./structures/reaction";
import { VoiceState } from "./structures/voiceState";
import { Interaction } from "./structures/interaction";
import { GuildBan } from "./structures/guildBan";
import { Collection } from "./utils/collection";
import { User } from "./structures/user";
import { ApplicationCommand } from "./structures/applicationCommand";
import { CommandPayload } from "./structures/commandPayload";

/**
 * Interface representing the various events emitted by a client.
 */
export interface ClientEvents {
  /**
   * Triggered when a the client is connected.
   */
  react: [];

  /**
   * Triggered when a new message is created in a channel.
   * @param message - The message that was created.
   */
  messageCreate: [message: Message];

  /**
   * Triggered when an existing message is updated.
   * @param message - The message that was updated.
   */
  messageUpdate: [message: Message];

  /**
   * Triggered when a message is deleted from a channel.
   * @param message - The message that was deleted.
   */
  messageDelete: [message: Message];

  /**
   * Triggered when a reaction is added to a message.
   * @param reaction - The reaction that was added.
   */
  messageReactionAdd: [reaction: Reaction];

  /**
   * Triggered when a reaction is removed from a message.
   * @param reaction - The reaction that was removed.
   */
  messageReactionRemove: [reaction: Reaction];

  /**
   * Triggered when all reactions are removed from a message.
   * @param reaction - The reaction object for the cleared reactions.
   */
  messageReactionRemoveAll: [reaction: Reaction];

  /**
   * Triggered when a new member joins the guild.
   * @param member - The member who joined.
   */
  guildMemberAdd: [member: Member];

  /**
   * Triggered when a guild member's information is updated.
   * @param member - The member whose information was updated.
   */
  guildMemberUpdate: [member: Member];

  /**
   * Triggered when a member leaves or is removed from the guild.
   * @param member - The member who left or was removed.
   */
  guildMemberRemove: [member: Member];

  /**
   * Triggered when a guild ban is added.
   * @param guildBan - The guild ban that was added.
   */
  guildBanAdd: [guildBan: GuildBan];

  /**
   * Triggered when a guild ban is removed.
   * @param guildBan - The guild ban that was removed.
   */
  guildBanRemove: [guildBan: GuildBan];

  /**
   * Triggered when a guild is updated.
   * @param guild - The guild that was updated.
   */
  guildUpdate: [guild: Guild];

  /**
   * Triggered when a role is created in the guild.
   * @param role - The role that was created.
   */
  roleCreate: [role: Role];

  /**
   * Triggered when an existing role is updated.
   * @param role - The role that was updated.
   */
  roleUpdate: [role: Role];

  /**
   * Triggered when a role is deleted from the guild.
   * @param role - The role that was deleted.
   */
  roleDelete: [role: Role];

  /**
   * Triggered when a new channel is created in the guild.
   * @param channel - The channel that was created.
   */
  channelCreate: [channel: GuildChannel];

  /**
   * Triggered when a channel's information is updated.
   * @param channel - The channel that was updated.
   */
  channelUpdate: [channel: GuildChannel];

  /**
   * Triggered when a channel is deleted from the guild.
   * @param channel - The channel that was deleted.
   */
  channelDelete: [channel: GuildChannel];

  /**
   * Triggered when a user's voice state changes in a voice channel.
   * @param voiceState - The updated voice state.
   */
  voiceStateUpdate: [voiceState: VoiceState];

  /**
   * Triggered when an interaction is created, such as a slash command or button click.
   * @param interaction - The interaction that was created.
   */
  interactionCreate: [interaction: Interaction];
}

/**
 * Represents the main client for interacting with the API and WebSocket.
 * Extends the EventEmitter to handle events.
 */
export class Client extends EventEmitter {

  public ws: WebSocketClient;
  public rest: RestApi;
  public user?: User;
  public guild?: Guild;
  public channels?: Collection<GuildChannel> | undefined;
  public members?: Collection<Member> | undefined;
  public roles?: Collection<Role> | undefined;
  public commands?: Collection<ApplicationCommand> | undefined;

  /**
   * Creates an instance of the Client class.
   * Initializes the WebSocket and REST API clients and sets up the guild data.
   *
   * @param host - The base URL of the API server.
   * @param token - The authentication token for the API requests.
   */
  constructor(host: string, token: string) {
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
    this.channels = new Collection<GuildChannel>(this, GuildChannel);

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
    this.members = new Collection<Member>(this, Member);

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
    this.roles = new Collection<Role>(this, Role);

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
    this.commands = new Collection<ApplicationCommand>(this, ApplicationCommand);

    this.initialize();
  }

  override on<Event extends keyof ClientEvents>(event: Event, listener: (...args: ClientEvents[Event]) => void): this {
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
  private async initialize(): Promise<void> {
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
  public async registerCommand(options: CommandPayload): Promise<ApplicationCommand> {

    try {

      let commandPayload: CommandPayload;

      // Check if the options are already a RolePayload object
      if (options instanceof CommandPayload) {
        commandPayload = options;
      } else {
        commandPayload = new CommandPayload(options);
      }

      // Prepare the payload for the API request
      const payload = commandPayload.toJSON();

      const data = await this.rest.request(
        RestApi.HttpMethod.POST,
        apiEndpoints.guildCommands(),
        payload
      );

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
  public async unregisterCommand(id: string): Promise<void> {
    try {
      await this.rest.request(
        RestApi.HttpMethod.DELETE,
        apiEndpoints.guildCommand(id)
      );

      this.commands?.remove(id);
    } catch (error) {
      console.error("Failed to delete command:", error);
      throw error;
    }
  }

}
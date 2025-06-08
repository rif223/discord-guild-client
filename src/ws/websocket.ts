import WebSocket, { ErrorEvent, MessageEvent } from 'ws';
import { Client } from '../client';
import { Guild } from "../structures/guild";
import { Message } from "../structures/message";
import { Role } from "../structures/role";
import { GuildChannel } from "../structures/guildChannel";
import { Member } from "../structures/member";
import { Reaction } from "../structures/reaction";
import { VoiceState } from "../structures/voiceState";
import { Interaction } from "../structures/interaction";
import { GuildBan } from "../structures/guildBan";
import { CommandInteraction } from '../structures/commandInteraction';
import { MessageComponentInteraction } from '../structures/messageComponentInteraction';
import { AutocompleteInteraction } from '../structures/autocompleteInteraction';
import { ModalSubmitInteraction } from '../structures/modalSubmitInteraction';

/**
 * The `WebSocketClient` class handles the creation and management of a WebSocket connection to a given server.
 * It can send and receive messages, handle errors, and close the connection gracefully.
 */
export class WebSocketClient {

    public ws: WebSocket;
    public _client: Client;
    public conn: boolean;

    /**
     * Creates an instance of `WebSocketClient`.
     * 
     * @param {Client} client - The main client instance that manages the bot or app's connection.
     * @param {string} host - The WebSocket server host URL (http or https will be converted to ws or wss).
     * @param {string} token - The authorization token used to authenticate with the WebSocket server.
     */
    constructor(client: Client, host: string, token: string) {

        // Ensure the correct WebSocket protocol based on the host URL.
        if (host.startsWith('https://')) {
            host = 'wss://' + host.substring(8);
        } else if (host.startsWith('http://')) {
            host = 'ws://' + host.substring(7);
        }

        /**
         * WebSocket client instance used to handle real-time events and updates from the server.
         * @type {WebSocket}
         * @public
         */
        this.ws = new WebSocket(host + "/ws", {
            headers: {
                authorization: token
            }
        });

        /**
         * Represents the main client for interacting with the API and WebSocket.
         * @type {Client}
         */
        this._client = client;

        /**
         * Indicates whether the WebSocket connection is established or not.
         * @type {boolean}
         */
        this.conn = false;

        // Setup WebSocket event handlers.
        this.ws.on("open", this.open.bind(this));
        this.ws.on("message", this.message.bind(this));
        this.ws.on("error", this.error.bind(this));
        this.ws.on("close", this.close.bind(this));
    }

    /**
     * Event handler for the "open" WebSocket event.
     * 
     * This function is called when the WebSocket connection is successfully established.
     * It sends a "Connected" message to the server and logs the connection status.
     */
    open(): void {
        try {
            this.ws.send("Connected: " + new Date());
            console.info("Connected: " + new Date());
            this.conn = true;
        } catch { }
    }

    /**
     * Event handler for the "message" WebSocket event.
     * 
     * This function is called when a message is received from the WebSocket server.
     * If the message is valid JSON, it triggers the client event registration process. Otherwise, it logs the message.
     * 
     * @param {any} d - The raw message data received from the WebSocket server.
     */
    message(d: any): void {
        d = d.toString("utf8");
        if (this.isJson(d)) {
            const { name, data } = JSON.parse(d);
            this._registerEvent(name, data);
        } else {
            console.log(d);
        }
    }

    /**
     * Event handler for the "error" WebSocket event.
     * 
     * This function is called when an error occurs on the WebSocket connection.
     * It logs the error message to the console.
     * 
     * @param {ErrorEvent} err - The error event containing details about the WebSocket error.
     */
    error(err: ErrorEvent): void {
        console.error(err.message);
    }

    /**
     * Event handler for the "close" WebSocket event.
     * 
     * This function is called when the WebSocket connection is closed.
     * If the connection was established earlier, it sends a "Disconnected" message and logs the event.
     * Otherwise, it logs a connection failure.
     */
    close(): void {
        if (this.conn) {
            console.info("Disconnected: " + new Date());
            this.ws.send("Disconnected: " + new Date());
        } else {
            console.error("Connection failed!");
        }
    }

    private _registerEvent(name: string, data: any): void {
        switch (name) {
            // Message Events
            /**
             * Emits an event when a new message is created.
             * 
             * @event messageCreate
             * @param {Message} message - The message that was created.
             */
            case "MESSAGE_CREATE":
                this._client.emit("messageCreate", new Message(this._client, data));
                break;
            /**
             * Emits an event when an existing message is updated.
             * 
             * @event messageUpdate
             * @param {Message} message - The message that was updated.
             */
            case "MESSAGE_UPDATE":
                this._client.emit("messageUpdate", new Message(this._client, data));
                break;
            /**
             * Emits an event when a message is deleted.
             * 
             * @event messageDelete
             * @param {Message} message - The message that was deleted.
             */
            case "MESSAGE_DELETE":
                this._client.emit("messageDelete", new Message(this._client, data));
                break;

            // Reaction Events
            /**
             * Emits an event when a reaction is added to a message.
             * 
             * @event messageReactionAdd
             * @param {Reaction} reaction - The reaction that was added.
             */
            case "MESSAGE_REACTION_ADD":
                this._client.emit("messageReactionAdd", new Reaction(this._client, data));
                break;
            /**
             * Emits an event when a reaction is removed from a message.
             * 
             * @event messageReactionRemove
             * @param {Reaction} reaction - The reaction that was removed.
             */
            case "MESSAGE_REACTION_REMOVE":
                this._client.emit("messageReactionRemove", new Reaction(this._client, data));
                break;
            /**
             * Emits an event when all reactions are removed from a message.
             * 
             * @event messageReactionRemoveAll
             * @param {Reaction} reaction - The reaction data, if available.
             */
            case "MESSAGE_REACTION_REMOVE_ALL":
                this._client.emit("messageReactionRemoveAll", new Reaction(this._client, data));
                break;

            // Guild Member Events
            /**
             * Emits an event when a new member joins the guild.
             * 
             * @event guildMemberAdd
             * @param {Member} member - The member who joined the guild.
             */
            case "GUILD_MEMBER_ADD":
                this._client.members?.add(data.user_id, data);
                this._client.emit("guildMemberAdd", new Member(this._client, data));
                break;
            /**
             * Emits an event when a member's details are updated.
             * 
             * @event guildMemberUpdate
             * @param {Member} member - The member whose details were updated.
             */
            case "GUILD_MEMBER_UPDATE":
                this._client.members?.add(data.user_id, data);
                this._client.emit("guildMemberUpdate", new Member(this._client, data));
                break;
            /**
             * Emits an event when a member leaves the guild.
             * 
             * @event guildMemberRemove
             * @param {Member} member - The member who left the guild.
             */
            case "GUILD_MEMBER_REMOVE":
                this._client.members?.remove(data.user_id);
                this._client.emit("guildMemberRemove", new Member(this._client, data));
                break;

            // Guild Ban Events
            /**
             * Emits an event when a member is banned from the guild.
             * 
             * @event guildBanAdd
             * @param {GuildBan} guildBan - The guild ban details.
             */
            case "GUILD_BAN_ADD":
                this._client.emit("guildBanAdd", new GuildBan(this._client, data));
                break;
            /**
             * Emits an event when a member is unbanned from the guild.
             * 
             * @event guildBanRemove
             * @param {GuildBan} guildBan - The guild ban details.
             */
            case "GUILD_BAN_REMOVE":
                this._client.emit("guildBanRemove", new GuildBan(this._client, data));
                break;

            // Guild Update Event
            /**
             * Emits an event when the guild details are updated.
             * 
             * @event guildUpdate
             * @param {Guild} guild - The updated guild details.
             */
            case "GUILD_UPDATE":
                this._client.emit("guildUpdate", new Guild(this._client, data));
                break;

            // Role Events
            /**
             * Emits an event when a new role is created in the guild.
             * 
             * @event roleCreate
             * @param {Role} role - The new role that was created.
             */
            case "GUILD_ROLE_CREATE":
                this._client.roles?.add(data.id, data);
                this._client.emit("roleCreate", new Role(this._client, data));
                break;
            /**
             * Emits an event when a role is updated in the guild.
             * 
             * @event roleUpdate
             * @param {Role} role - The role that was updated.
             */
            case "GUILD_ROLE_UPDATE":
                this._client.roles?.add(data.id, data);
                this._client.emit("roleUpdate", new Role(this._client, data));
                break;
            /**
             * Emits an event when a role is deleted from the guild.
             * 
             * @event roleDelete
             * @param {Role} role - The role that was deleted.
             */
            case "GUILD_ROLE_DELETE":
                this._client.roles?.remove(data.id);
                this._client.emit("roleDelete", new Role(this._client, data));
                break;

            // Channel Events
            /**
             * Emits an event when a new channel is created in the guild.
             * 
             * @event channelCreate
             * @param {GuildChannel} channel - The new channel that was created.
             */
            case "CHANNEL_CREATE":
                this._client.channels?.add(data.id, data)
                this._client.emit("channelCreate", new GuildChannel(this._client, data));
                break;
            /**
             * Emits an event when a channel is updated in the guild.
             * 
             * @event channelUpdate
             * @param {GuildChannel} channel - The channel that was updated.
             */
            case "CHANNEL_UPDATE":
                this._client.channels?.add(data.id, data)
                this._client.emit("channelUpdate", new GuildChannel(this._client, data));
                break;
            /**
             * Emits an event when a channel is deleted from the guild.
             * 
             * @event channelDelete
             * @param {GuildChannel} channel - The channel that was deleted.
             */
            case "CHANNEL_DELETE":
                this._client.channels?.remove(data.id)
                this._client.emit("channelDelete", new GuildChannel(this._client, data));
                break;

            // Voice State Update Event
            /**
             * Emits an event when a user's voice state changes.
             * 
             * @event voiceStateUpdate
             * @param {VoiceState} voiceState - The updated voice state details.
             */
            case "VOICE_STATE_UPDATE":
                this._client.emit("voiceStateUpdate", new VoiceState(this._client, data));
                break;

            // Interaction Event
            /**
             * Emits an event when an interaction is created.
             * 
             * @event interactionCreate
             * @param {Interaction} interaction - The interaction that was created.
             */
            case "INTERACTION_CREATE":
                let interactionInstance: Interaction;

                switch (data.type) {
                    case 1: // PING
                        // You can either use the base Interaction class or create a PingInteraction class
                        interactionInstance = new Interaction(this._client, data);
                        break;
                    case 2: // APPLICATION_COMMAND (Slash Command)
                        interactionInstance = new CommandInteraction(this._client, data);
                        break;
                    case 3: // MESSAGE_COMPONENT (Buttons, Select Menus)
                        interactionInstance = new MessageComponentInteraction(this._client, data);
                        break;
                    case 4: // APPLICATION_COMMAND_AUTOCOMPLETE
                        interactionInstance = new AutocompleteInteraction(this._client, data);
                        break;
                    case 5: // MODAL_SUBMIT
                        interactionInstance = new ModalSubmitInteraction(this._client, data);
                        break;
                    default:
                        // Unknown type - fallback to base Interaction class
                        interactionInstance = new Interaction(this._client, data);
                        break;
                }

                this._client.emit("interactionCreate", interactionInstance);
                break;

            default:
                console.warn(`Unknown event: ${name}`);
                break;
        }
    }

    /**
     * Helper function to check if a string is valid JSON.
     * 
     * @param {string} data - The string to check for valid JSON format.
     * @returns {boolean} Returns true if the string is a valid JSON object or array, otherwise false.
     */
    isJson(data: string): boolean {
        return (data.startsWith('{') && data.endsWith('}')) || (data.startsWith('[') && data.endsWith(']'));
    }
}

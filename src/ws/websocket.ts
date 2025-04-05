import WebSocket, { ErrorEvent, MessageEvent } from 'ws';
import { Client } from '../client';

/**
 * The `WebSocketClient` class handles the creation and management of a WebSocket connection to a given server.
 * It can send and receive messages, handle errors, and close the connection gracefully.
 */
export class WebSocketClient {

    /**
     * WebSocket client instance used to handle real-time events and updates from the server.
     * @type {WebSocket}
     */
    public ws: WebSocket;

    /**
     * Represents the main client for interacting with the API and WebSocket.
     * @type {Client}
     */
    public _client: Client;

    /**
     * Indicates whether the WebSocket connection is established or not.
     * @type {boolean}
     */
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

        // Initialize the WebSocket connection.
        this.ws = new WebSocket(host + "/ws", {
            headers: {
                authorization: token
            }
        });
        this._client = client;
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
        } catch {}
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
            this._client._registerEvent(name, data);
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

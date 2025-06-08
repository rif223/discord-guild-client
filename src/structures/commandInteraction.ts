import { Client } from "../client";
import { Interaction } from "./interaction";

/**
 * Represents a command-based (slash command) interaction.
 */
export class CommandInteraction extends Interaction {

    public commandName!: string;
    public commandId!: string;
    public options?: any;

    /**
     * Creates a new CommandInteraction.
     * @param {Client} client - The client instance.
     * @param {any} data - The raw interaction data.
     */
    constructor(client: Client, data: any) {
        super(client, data);

        this._updateCommandData(data);
    }

    /**
     * Updates the specific command-related fields.
     * @param {any} data - The data object from the API.
     */
    private _updateCommandData(data: any) {
        const interactionData = data;
        const cmd = this._client.commands.get(interactionData.id);

        if (interactionData) {
            /**
             * The command name.
             */
            this.commandName = cmd.name;

            /**
             * The command ID.
             */
            this.commandId = cmd.id;

            /**
             * The options array, defaulting to empty array.
             */
            this.options = cmd.options ?? [];
        }
    }

    /**
     * Convenience method for getting a specific option by name.
     * @param {string} name - The name of the option to retrieve.
     * @returns The matching option or undefined.
     */
    public getOption(name: string): any | undefined {
        return this.options?.find((opt: any) => opt.name === name);
    }
}

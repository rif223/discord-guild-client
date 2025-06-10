import { Interaction } from "./interaction.js";
/**
 * Represents a command-based (slash command) interaction.
 */
export class CommandInteraction extends Interaction {
  /**
   * Creates a new CommandInteraction.
   * @param {Client} client - The client instance.
   * @param {any} data - The raw interaction data.
   */
  constructor(client, data) {
    super(client, data);
    this._updateCommandData(data);
  }

  /**
   * Updates the specific command-related fields.
   * @param {any} data - The data object from the API.
   */
  _updateCommandData(data) {
    /**
     * The command name.
     */
    this.commandName = data.data.name;
    /**
     * The command ID.
     */
    this.commandId = data.data.id;
    /**
     * The options array, defaulting to empty array.
     */
    this.options = data.data.options ?? [];
  }

  /**
   * Convenience method for getting a specific option by name.
   * @param {string} name - The name of the option to retrieve.
   * @returns The matching option or undefined.
   */
  getOption(name) {
    return this.options?.find(opt => opt.name === name);
  }
}
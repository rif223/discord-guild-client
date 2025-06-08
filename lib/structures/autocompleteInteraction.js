import { Interaction } from "./interaction.js";
export class AutocompleteInteraction extends Interaction {
  constructor(client, data) {
    super(client, data);
    this._updateAutocompleteData(data);
  }
  _updateAutocompleteData(data) {
    /**
     * The command name that triggered the autocomplete interaction.
     * @type {string}
     */
    this.commandName = data.data.name;

    /**
     * The ID of the command triggering the autocomplete.
     * @type {string}
     */
    this.commandId = data.data.id;

    /**
     * The options provided with the interaction.
     * @type {Array<any> | undefined}
     */
    this.options = data.data.options ?? [];

    /**
     * The name of the option currently focused (being autocompleted).
     * @type {string | undefined}
     */
    const focusedOption = this.options.find(opt => opt.focused);
    this.focusedOptionName = focusedOption?.name;
  }
}
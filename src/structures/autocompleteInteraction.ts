import { Client } from "../client";
import { apiEndpoints } from "../rest/endpoints";
import { RestApi } from "../rest/request";
import { Interaction } from "./interaction";

export class AutocompleteInteraction extends Interaction {
    public commandName!: string;
    public commandId!: string;
    public focusedOptionName?: string;
    public options?: Array<any>;

    constructor(client: Client, data: any) {
        super(client, data);
        this._updateAutocompleteData(data);
    }

    private _updateAutocompleteData(data: any) {
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
        const focusedOption = this.options.find((opt: any) => opt.focused);
        this.focusedOptionName = focusedOption?.name;
    }
}

import { Client } from "../client";
import { Interaction } from "./interaction";

/**
 * Represents a modal submit interaction.
 */
export class ModalSubmitInteraction extends Interaction {
    
    public customId!: string;
    public components?: any[];

    constructor(client: Client, data: any) {
        super(client, data);
        this._updateModalData(data);
    }

    private _updateModalData(data: any) {
        const d = data.data;

        /**
         * The custom ID of the submitted modal.
         */
        this.customId = d.custom_id;

        /**
         * The components submitted in the modal (usually input fields).
         */
        this.components = d.components ?? [];
    }
}

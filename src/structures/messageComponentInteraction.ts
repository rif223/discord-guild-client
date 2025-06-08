import { Client } from "../client";
import { Interaction } from "./interaction";
import { Message } from "./message";

/**
 * Represents a message component interaction (buttons, select menus).
 */
export class MessageComponentInteraction extends Interaction {
    public customId!: string;
    public componentType!: number;
    public values?: string[];

    constructor(client: Client, data: any) {
        super(client, data);
        this._updateComponentData(data);
    }

    private _updateComponentData(data: any) {
        const d = data.data;

        /**
         * The custom ID of the component that was interacted with.
         */
        this.customId = d.custom_id;

        /**
         * The type of component interaction (e.g., button or select menu).
         */
        this.componentType = d.component_type;

        /**
         * The selected values (only for select menus).
         */
        this.values = d.values ?? undefined;
    }
}

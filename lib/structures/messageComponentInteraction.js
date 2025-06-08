import { Interaction } from "./interaction.js";
/**
 * Represents a message component interaction (buttons, select menus).
 */
export class MessageComponentInteraction extends Interaction {
  constructor(client, data) {
    super(client, data);
    this._updateComponentData(data);
  }
  _updateComponentData(data) {
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
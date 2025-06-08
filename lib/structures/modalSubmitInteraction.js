import { Interaction } from "./interaction.js";
/**
 * Represents a modal submit interaction.
 */
export class ModalSubmitInteraction extends Interaction {
  constructor(client, data) {
    super(client, data);
    this._updateModalData(data);
  }
  _updateModalData(data) {
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
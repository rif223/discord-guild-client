/**
 * Represents an attachment in a message, such as a file, image, or media.
 */
export class Attachment {
  /**
   * Constructs a new Attachments object.
   * @param {Client} client - The client instance managing this attachment.
   * @param {any} data - The raw data from the API representing the attachment.
   */
  constructor(client, data) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the attachment properties with the provided data.
   * @param {Object} data - The data object containing attachment information.
   */
  _update(data) {
    /**
     * The unique identifier for the attachment.
     * @type {string}
     */
    if (data.id !== undefined) this.id = data.id;

    /**
     * The name of the file attached.
     * @type {string}
     */
    if (data.filename !== undefined) this.filename = data.filename;

    /**
     * The title of the file (optional).
     * @type {string | undefined}
     */
    if (data.title !== undefined) this.title = data.title;

    /**
     * A description for the file (max 1024 characters) (optional).
     * @type {string | undefined}
     */
    if (data.description !== undefined) this.description = data.description;

    /**
     * The media type of the attachment, usually in MIME format (optional).
     * @type {string | undefined}
     */
    if (data.content_type !== undefined) this.content_type = data.content_type;

    /**
     * The size of the file in bytes.
     * @type {number}
     */
    if (data.size !== undefined) this.size = data.size;

    /**
     * The URL where the attachment can be accessed.
     * @type {string}
     */
    if (data.url !== undefined) this.url = data.url;

    /**
     * A proxied URL for the attachment.
     * @type {string}
     */
    if (data.proxy_url !== undefined) this.proxy_url = data.proxy_url;

    /**
     * The height of the file, if it's an image (optional).
     * @type {number | undefined}
     */
    if (data.height !== undefined) this.height = data.height;

    /**
     * The width of the file, if it's an image (optional).
     * @type {number | undefined}
     */
    if (data.width !== undefined) this.width = data.width;

    /**
     * Whether this attachment is ephemeral, meaning it will be deleted after a certain period of time (optional).
     * @type {boolean | undefined}
     */
    if (data.ephemeral !== undefined) this.ephemeral = data.ephemeral;

    /**
     * The duration of the audio file in seconds, typically used for voice messages (optional).
     * @type {number | undefined}
     */
    if (data.duration_secs !== undefined) this.duration_secs = data.duration_secs;

    /**
     * A base64 encoded byte array representing the sampled waveform of an audio file (optional).
     * @type {string | undefined}
     */
    if (data.waveform !== undefined) this.waveform = data.waveform;

    /**
     * The attachment flags, combined as a bitfield (optional).
     * @type {number | undefined}
     */
    if (data.flags !== undefined) this.flags = data.flags;
  }
}
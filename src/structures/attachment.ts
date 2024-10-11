import { Client } from "../client";

/**
 * Represents an attachment in a message, such as a file, image, or media.
 */
export class Attachment {
  private _client: Client;

  /** 
   * The unique identifier for the attachment. 
   * @type {string}
   */
  public id!: string;

  /** 
   * The name of the file attached.
   * @type {string}
   */
  public filename!: string;

  /** 
   * The title of the file (optional).
   * @type {string | undefined}
   */
  public title?: string;

  /** 
   * A description for the file (max 1024 characters) (optional).
   * @type {string | undefined}
   */
  public description?: string;

  /** 
   * The media type of the attachment, usually in MIME format (optional).
   * @type {string | undefined}
   */
  public content_type?: string;

  /** 
   * The size of the file in bytes.
   * @type {number}
   */
  public size!: number;

  /** 
   * The URL where the attachment can be accessed.
   * @type {string}
   */
  public url!: string;

  /** 
   * A proxied URL for the attachment.
   * @type {string}
   */
  public proxy_url!: string;

  /** 
   * The height of the file, if it's an image (optional).
   * @type {number | undefined}
   */
  public height?: number;

  /** 
   * The width of the file, if it's an image (optional).
   * @type {number | undefined}
   */
  public width?: number;

  /** 
   * Whether this attachment is ephemeral, meaning it will be deleted after a certain period of time (optional).
   * @type {boolean | undefined}
   */
  public ephemeral?: boolean;

  /** 
   * The duration of the audio file in seconds, typically used for voice messages (optional).
   * @type {number | undefined}
   */
  public duration_secs?: number;

  /** 
   * A base64 encoded byte array representing the sampled waveform of an audio file (optional).
   * This is used for visualizing voice messages.
   * @type {string | undefined}
   */
  public waveform?: string;

  /** 
   * The attachment flags, combined as a bitfield (optional).
   * @type {number | undefined}
   */
  public flags?: number;

  /**
   * Constructs a new Attachments object.
   * @param {Client} client - The client instance managing this attachment.
   * @param {any} data - The raw data from the API representing the attachment.
   */
  constructor(client: Client, data: any) {
    this._client = client;
    this._update(data);
  }

  /**
   * Updates the attachment properties with the provided data.
   * @param {Object} data - The data object containing attachment information.
   */
  private _update(data: any) {
    if (data.id !== undefined) this.id = data.id;
    if (data.filename !== undefined) this.filename = data.filename;
    if (data.title !== undefined) this.title = data.title;
    if (data.description !== undefined) this.description = data.description;
    if (data.content_type !== undefined) this.content_type = data.content_type;
    if (data.size !== undefined) this.size = data.size;
    if (data.url !== undefined) this.url = data.url;
    if (data.proxy_url !== undefined) this.proxy_url = data.proxy_url;
    if (data.height !== undefined) this.height = data.height;
    if (data.width !== undefined) this.width = data.width;
    if (data.ephemeral !== undefined) this.ephemeral = data.ephemeral;
    if (data.duration_secs !== undefined) this.duration_secs = data.duration_secs;
    if (data.waveform !== undefined) this.waveform = data.waveform;
    if (data.flags !== undefined) this.flags = data.flags;
  }
}

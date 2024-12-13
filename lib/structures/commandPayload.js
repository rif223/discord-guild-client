/**
 * Represents the payload for creating or updating a Discord application command.
 * This class encapsulates all the parameters needed to define a command and provides
 * necessary validation for the fields.
 */
export class CommandPayload {
  /**
   * Creates a new `CommandPayload` instance.
   * @param data Optional initial data to set in the payload.
   */
  constructor(data) {
    this._name = data?.name || '';
    this._nameLocalizations = data?.name_localizations;
    this._description = data?.description;
    this._descriptionLocalizations = data?.description_localizations;
    this._options = data?.options;
    this._defaultMemberPermissions = data?.default_member_permissions;
    this._defaultPermission = data?.default_permission;
    this._type = data?.type;
    this._nsfw = data?.nsfw;
  }

  /**
   * Gets the name of the command.
   * @returns The name of the command.
   */
  get name() {
    return this._name;
  }

  /**
   * Sets the name of the command.
   * The name must be between 1 and 32 characters.
   * @param value The name of the command.
   * @throws Error if the name is not within the allowed length (1-32 characters).
   */
  set name(value) {
    if (value.length < 1 || value.length > 32) {
      throw new Error("Command name must be between 1 and 32 characters.");
    }
    this._name = value;
  }

  /**
   * Gets the localization dictionary for the command's name.
   * @returns A dictionary of localized names with locale keys.
   */
  get nameLocalizations() {
    return this._nameLocalizations;
  }

  /**
   * Sets the localization dictionary for the command's name.
   * @param value A dictionary with locale keys and localized name strings.
   */
  set nameLocalizations(value) {
    this._nameLocalizations = value;
  }

  /**
   * Gets the description of the command.
   * @returns The description of the command.
   */
  get description() {
    return this._description;
  }

  /**
   * Sets the description of the command.
   * The description must be between 1 and 100 characters for `CHAT_INPUT` commands.
   * @param value The description of the command.
   * @throws Error if the description is not within the allowed length (1-100 characters).
   */
  set description(value) {
    if (value && (value.length < 1 || value.length > 100)) {
      throw new Error("Command description must be between 1 and 100 characters.");
    }
    this._description = value;
  }

  /**
   * Gets the localization dictionary for the command's description.
   * @returns A dictionary of localized descriptions with locale keys.
   */
  get descriptionLocalizations() {
    return this._descriptionLocalizations;
  }

  /**
   * Sets the localization dictionary for the command's description.
   * @param value A dictionary with locale keys and localized description strings.
   */
  set descriptionLocalizations(value) {
    this._descriptionLocalizations = value;
  }

  /**
   * Gets the options for the command.
   * @returns An array of command options.
   */
  get options() {
    return this._options;
  }

  /**
   * Sets the options for the command.
   * Options are the parameters for the command, and the maximum number allowed is 25.
   * @param value An array of command options.
   * @throws Error if more than 25 options are provided.
   */
  set options(value) {
    if (value && value.length > 25) {
      throw new Error("Command options cannot exceed 25.");
    }
    this._options = value;
  }

  /**
   * Gets the default member permissions for the command.
   * @returns A string representing the default member permissions as a bit set.
   */
  get defaultMemberPermissions() {
    return this._defaultMemberPermissions;
  }

  /**
   * Sets the default member permissions for the command.
   * The permissions are represented as a bitwise string.
   * @param value A string representing the default permissions as a bit set.
   */
  set defaultMemberPermissions(value) {
    this._defaultMemberPermissions = value;
  }

  /**
   * Gets whether the command is enabled by default.
   * @returns True if the command is enabled by default, false otherwise.
   */
  get defaultPermission() {
    return this._defaultPermission;
  }

  /**
   * Sets whether the command is enabled by default.
   * @param value True if the command should be enabled by default, false otherwise.
   */
  set defaultPermission(value) {
    this._defaultPermission = value;
  }

  /**
   * Gets the type of the command.
   * @returns The type of the command.
   */
  get type() {
    return this._type;
  }

  /**
   * Sets the type of the command.
   * The type determines whether the command is a `CHAT_INPUT`, `USER`, or `MESSAGE` command.
   * @param value The command type as a number.
   */
  set type(value) {
    this._type = value;
  }

  /**
   * Gets whether the command is age-restricted (NSFW).
   * @returns True if the command is NSFW, false otherwise.
   */
  get nsfw() {
    return this._nsfw;
  }

  /**
   * Sets whether the command is age-restricted (NSFW).
   * @param value True if the command should be marked as NSFW, false otherwise.
   */
  set nsfw(value) {
    this._nsfw = value;
  }

  /**
   * Converts the command payload to a JSON-serializable object.
   * This method ensures that only the defined fields are included in the output.
   * @returns A JSON-serializable representation of the command payload.
   */
  toJSON() {
    const result = {
      name: this._name
    };
    if (this._nameLocalizations !== undefined) result.name_localizations = this._nameLocalizations;
    if (this._description !== undefined) result.description = this._description;
    if (this._descriptionLocalizations !== undefined) result.description_localizations = this._descriptionLocalizations;
    if (this._options !== undefined) result.options = this._options;
    if (this._defaultMemberPermissions !== undefined) result.default_member_permissions = this._defaultMemberPermissions;
    if (this._defaultPermission !== undefined) result.default_permission = this._defaultPermission;
    if (this._type !== undefined) result.type = this._type;
    if (this._nsfw !== undefined) result.nsfw = this._nsfw;
    return result;
  }
}
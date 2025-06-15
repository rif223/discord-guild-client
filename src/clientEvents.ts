import { Guild } from "./structures/guild";
import { GuildBan } from "./structures/guildBan";
import { GuildChannel } from "./structures/guildChannel";
import { Interaction } from "./structures/interaction";
import { Member } from "./structures/member";
import { Message } from "./structures/message";
import { Reaction } from "./structures/reaction";
import { Role } from "./structures/role";
import { VoiceState } from "./structures/voiceState";

/**
 * Interface representing the various events emitted by a client.
 */
export interface ClientEvents {
  /**
   * Triggered when a the client is connected.
   */
  react: [];

  /**
   * Triggered when a new message is created in a channel.
   * @param message - The message that was created.
   */
  messageCreate: [message: Message];

  /**
   * Triggered when an existing message is updated.
   * @param message - The message that was updated.
   */
  messageUpdate: [message: Message];

  /**
   * Triggered when a message is deleted from a channel.
   * @param message - The message that was deleted.
   */
  messageDelete: [message: Message];

  /**
   * Triggered when a reaction is added to a message.
   * @param reaction - The reaction that was added.
   */
  messageReactionAdd: [reaction: Reaction];

  /**
   * Triggered when a reaction is removed from a message.
   * @param reaction - The reaction that was removed.
   */
  messageReactionRemove: [reaction: Reaction];

  /**
   * Triggered when all reactions are removed from a message.
   * @param reaction - The reaction object for the cleared reactions.
   */
  messageReactionRemoveAll: [reaction: Reaction];

  /**
   * Triggered when a new member joins the guild.
   * @param member - The member who joined.
   */
  guildMemberAdd: [member: Member];

  /**
   * Triggered when a guild member's information is updated.
   * @param member - The member whose information was updated.
   */
  guildMemberUpdate: [member: Member];

  /**
   * Triggered when a member leaves or is removed from the guild.
   * @param member - The member who left or was removed.
   */
  guildMemberRemove: [member: Member];

  /**
   * Triggered when a guild ban is added.
   * @param guildBan - The guild ban that was added.
   */
  guildBanAdd: [guildBan: GuildBan];

  /**
   * Triggered when a guild ban is removed.
   * @param guildBan - The guild ban that was removed.
   */
  guildBanRemove: [guildBan: GuildBan];

  /**
   * Triggered when a guild is updated.
   * @param guild - The guild that was updated.
   */
  guildUpdate: [guild: Guild];

  /**
   * Triggered when a role is created in the guild.
   * @param role - The role that was created.
   */
  roleCreate: [role: Role];

  /**
   * Triggered when an existing role is updated.
   * @param role - The role that was updated.
   */
  roleUpdate: [role: Role];

  /**
   * Triggered when a role is deleted from the guild.
   * @param role - The role that was deleted.
   */
  roleDelete: [role: Role];

  /**
   * Triggered when a new channel is created in the guild.
   * @param channel - The channel that was created.
   */
  channelCreate: [channel: GuildChannel];

  /**
   * Triggered when a channel's information is updated.
   * @param channel - The channel that was updated.
   */
  channelUpdate: [channel: GuildChannel];

  /**
   * Triggered when a channel is deleted from the guild.
   * @param channel - The channel that was deleted.
   */
  channelDelete: [channel: GuildChannel];

  /**
   * Triggered when a user's voice state changes in a voice channel.
   * @param voiceState - The updated voice state.
   */
  voiceStateUpdate: [voiceState: VoiceState];

  /**
   * Triggered when an interaction is created, such as a slash command or button click.
   * @param interaction - The interaction that was created.
   */
  interactionCreate: [interaction: Interaction];
}
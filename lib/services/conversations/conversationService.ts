// File: E:\quintos_ai\lib\services\conversations\conversationService.ts

import prisma from "@/lib/db/prisma";
import { CreateConversationData, CreateMessageData } from "@/lib/validations/conversation";
import { Prisma, Conversation, Message } from "@prisma/client";

export type ConversationWithMessages = Prisma.ConversationGetPayload<{
  include: {
    messages: true;
  };
}>;

export class ConversationService {
  /**
   * Creates a new conversation session for a user.
   */
  async createConversation(
    data: CreateConversationData,
    userId: string
  ): Promise<Conversation> {
    return prisma.conversation.create({
      data: {
        userId,
        projectId: data.projectId || null,
        title: data.title,
        model: data.model,
        context: data.context,
      },
    });
  }

  /**
   * Appends a message to an existing conversation.
   */
  async addMessage(data: CreateMessageData): Promise<Message> {
    return prisma.message.create({
      data: {
        conversationId: data.conversationId,
        role: data.role,
        content: data.content,
        model: data.model || null,
        tokens: data.tokens || null,
      },
    });
  }

  /**
   * Lists conversations belonging to a user with pagination.
   */
  async listUserConversations(
    userId: string,
    limit = 50
  ): Promise<ConversationWithMessages[]> {
    return prisma.conversation.findMany({
      where: { userId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
  }

  /**
   * Retrieves a single conversation with messages, verifying ownership.
   */
  async getConversationById(
    conversationId: string,
    userId: string
  ): Promise<ConversationWithMessages | null> {
    return prisma.conversation.findFirst({
      where: {
        id: conversationId,
        userId,
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });
  }

  /**
   * Updates conversation title.
   */
  async updateConversationTitle(
    conversationId: string,
    title: string,
    userId: string
  ): Promise<Prisma.BatchPayload> {
    return prisma.conversation.updateMany({
      where: {
        id: conversationId,
        userId,
      },
      data: {
        title,
      },
    });
  }

  /**
   * Deletes a conversation and cascaded messages.
   */
  async deleteConversation(
    conversationId: string,
    userId: string
  ): Promise<Prisma.BatchPayload> {
    return prisma.conversation.deleteMany({
      where: {
        id: conversationId,
        userId,
      },
    });
  }
}

export const conversationService = new ConversationService();


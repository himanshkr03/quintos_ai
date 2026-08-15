// File: E:\quintos_ai\app\api\ai\conversations\route.ts

import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/session";
import { conversationService } from "@/lib/services/conversations/conversationService";
import { getAIConfig } from "@/lib/ai/config";

/**
 * GET /api/ai/conversations
 * Retrieves all saved conversation sessions for the authenticated user.
 */
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const config = getAIConfig();

    if (!user) {
      if (config.isDemoMode) {
        return NextResponse.json({ success: true, conversations: [] });
      }
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Sign in required." } },
        { status: 401 }
      );
    }

    const conversations = await conversationService.listUserConversations(user.id);
    return NextResponse.json({ success: true, conversations });
  } catch (error) {
    console.error("[Get Conversations Error]:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Failed to fetch conversations." } },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/ai/conversations?id=...
 * Deletes a conversation owned by the authenticated user.
 */
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Sign in required." } },
        { status: 401 }
      );
    }

    const { searchParams } = request.nextUrl;
    const conversationId = searchParams.get("id");

    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: { code: "BAD_REQUEST", message: "Conversation ID required." } },
        { status: 400 }
      );
    }

    await conversationService.deleteConversation(conversationId, user.id);
    return NextResponse.json({ success: true, message: "Conversation deleted." });
  } catch (error) {
    console.error("[Delete Conversation Error]:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Failed to delete conversation." } },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/ai/conversations
 * Renames a conversation owned by the authenticated user.
 */
export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Sign in required." } },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { id, title } = body;

    if (!id || !title || typeof title !== "string") {
      return NextResponse.json(
        { success: false, error: { code: "BAD_REQUEST", message: "ID and title required." } },
        { status: 400 }
      );
    }

    await conversationService.updateConversationTitle(id, title.trim(), user.id);
    return NextResponse.json({ success: true, message: "Conversation renamed." });
  } catch (error) {
    console.error("[Rename Conversation Error]:", error);
    return NextResponse.json(
      { success: false, error: { code: "INTERNAL_ERROR", message: "Failed to rename conversation." } },
      { status: 500 }
    );
  }
}

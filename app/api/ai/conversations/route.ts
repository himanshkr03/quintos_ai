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
        {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Sign in required." },
        },
        { status: 401 }
      );
    }

    const conversations = await conversationService.listUserConversations(
      user.id
    );
    return NextResponse.json({ success: true, conversations });
  } catch (error) {
    console.error("[Get Conversations Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch conversations.",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/ai/conversations?id=...
 * Deletes a conversation owned strictly by the authenticated user.
 */
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Sign in required." },
        },
        { status: 401 }
      );
    }

    const { searchParams } = request.nextUrl;
    const conversationId = searchParams.get("id");

    if (!conversationId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Conversation ID required.",
          },
        },
        { status: 400 }
      );
    }

    const result = await conversationService.deleteConversation(
      conversationId,
      user.id
    );

    if (result.count === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "Conversation not found or unauthorized.",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Conversation deleted.",
    });
  } catch (error) {
    console.error("[Delete Conversation Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to delete conversation.",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/ai/conversations
 * Renames a conversation owned strictly by the authenticated user.
 */
export async function PATCH(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "UNAUTHORIZED", message: "Sign in required." },
        },
        { status: 401 }
      );
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: { code: "BAD_REQUEST", message: "Invalid JSON body." },
        },
        { status: 400 }
      );
    }

    const { id, title } = (body || {}) as { id?: string; title?: string };

    if (!id || !title || typeof title !== "string" || !title.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BAD_REQUEST",
            message: "Valid conversation ID and title required.",
          },
        },
        { status: 400 }
      );
    }

    const result = await conversationService.updateConversationTitle(
      id,
      title.trim(),
      user.id
    );

    if (result.count === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "NOT_FOUND",
            message: "Conversation not found or unauthorized.",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Conversation renamed.",
    });
  } catch (error) {
    console.error("[Rename Conversation Error]:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to rename conversation.",
        },
      },
      { status: 500 }
    );
  }
}

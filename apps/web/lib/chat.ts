import axios from "axios";

const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:5000";

export type ChatSession = {
    id: string;
    userId: string;
    title: string;
    model: string;
    systemPrompt: string | null;
    temperature: string;
    maxTokens: number;
    isPinned: boolean;
    isArchived: boolean;
    createdAt: string;
    updatedAt: string;
    messages?: ChatMessage[];
};

export type ChatMessage = {
    id: string;
    chatSessionId: string;
    role: "user" | "assistant" | "system";
    content: string;
    createdAt: string;
};

export type CreateChatRequest = {
    title?: string;
    model?: string;
    systemPrompt?: string;
    temperature?: number;
    maxTokens?: number;
};

export type CreateChatResponse = {
    success: boolean;
    data: ChatSession;
    message?: string;
};

export type GetChatsResponse = {
    success: boolean;
    data: ChatSession[];
    message?: string;
};

export type GetChatResponse = {
    success: boolean;
    data: ChatSession;
    message?: string;
};

export type UpdateChatRequest = {
    id: string;
    isPinned: boolean;
    title: string;
};

export type UpdateChatResponse = {
    success: boolean;
    data: {
        count: number;
    };
    message?: string;
};

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = getAuthTokenCookie();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

function extractErrorMessage(error: unknown, fallback: string): string {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data as
            | { message?: string; error?: string }
            | string
            | undefined;

        if (typeof data === "string") return data || fallback;
        if (data?.message) return data.message;
        if (data?.error) return data.error;

        return error.message || fallback;
    }

    if (error instanceof Error) return error.message || fallback;
    return fallback;
}

function getAuthTokenCookie(): string | null {
    if (typeof document === "undefined") return null;

    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) =>
        row.startsWith("gonka_token=")
    );

    if (!tokenCookie) return null;

    const token = tokenCookie.split("=")[1];
    return token || null;
}

export async function createChat(
    options: CreateChatRequest = {}
): Promise<CreateChatResponse> {
    try {
        const { data } = await apiClient.post<CreateChatResponse>("/chats", options);

        if (!data?.success) {
            throw new Error(data?.message || "Failed to create chat");
        }

        return data;
    } catch (error) {
        const message = extractErrorMessage(error, "Failed to create chat");
        throw new Error(message);
    }
}

export async function getChats(): Promise<GetChatsResponse> {
    try {
        const { data } = await apiClient.get<GetChatsResponse>("/chats");

        if (!data?.success) {
            throw new Error(data?.message || "Failed to get chats");
        }

        return data;
    } catch (error) {
        const message = extractErrorMessage(error, "Failed to get chats");
        throw new Error(message);
    }
}

export async function getChat(id: string): Promise<GetChatResponse> {
    if (!id || typeof id !== "string") {
        throw new Error("Chat ID is required");
    }

    try {
        const { data } = await apiClient.get<GetChatResponse>(`/chats/${id}`);

        if (!data?.success) {
            throw new Error(data?.message || "Failed to get chat");
        }

        return data;
    } catch (error) {
        const message = extractErrorMessage(error, "Failed to get chat");
        throw new Error(message);
    }
}

export async function deleteChat(id: string): Promise<{ success: boolean }> {
    if (!id || typeof id !== "string") {
        throw new Error("Chat ID is required");
    }

    try {
        const { data } = await apiClient.delete<{ success: boolean }>(`/chats/${id}`);
        return data;
    } catch (error) {
        const message = extractErrorMessage(error, "Failed to delete chat");
        throw new Error(message);
    }
}

export async function updateChat({
    id,
    isPinned,
    title,
}: UpdateChatRequest): Promise<UpdateChatResponse> {
    if (!id || typeof id !== "string") {
        throw new Error("Chat ID is required");
    }

    try {
        const { data } = await apiClient.patch<UpdateChatResponse>(`/chats/${id}/update`, {
            isPinned,
            title,
        });

        if (!data?.success) {
            throw new Error(data?.message || "Failed to update chat");
        }

        return data;
    } catch (error) {
        const message = extractErrorMessage(error, "Failed to update chat");
        throw new Error(message);
    }
}
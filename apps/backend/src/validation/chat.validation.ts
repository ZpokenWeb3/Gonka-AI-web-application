export function validateChatTitle(rawTitle: unknown) {
    if (typeof rawTitle !== "string") {
        return { ok: false, message: "Title must be a string" } as const;
    }

    const title = rawTitle.trim();

    if (!title) {
        return { ok: false, message: "Title must not be empty" } as const;
    }

    if (title.length > 20) {
        return { ok: false, message: "Title must be at most 20 characters" } as const;
    }

    return { ok: true, title } as const;
}


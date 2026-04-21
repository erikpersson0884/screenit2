export const tags = {
    events: {
        name: "📅 Events",
        description: "Event management and posters",
    },
    auth: {
        name: "🔐 Auth",
        description: "Authentication and OAuth (Gamma SSO)",
    },
    users: {
        name: "👤 Users",
        description: "User management",
    },

    groups: {
        name: "👥 Groups",
        description: "Group management and permissions",
    },
    system: {
        name: "⚙️ System",
        description: "Health and system endpoints",
    },
} as const;

export const tagNames = {
    auth: tags.auth.name,
    users: tags.users.name,
    events: tags.events.name,
    groups: tags.groups.name,
    system: tags.system.name,
} as const;

export type TagKey = keyof typeof tags;
export type Tag = typeof tags[TagKey];
export default tags;
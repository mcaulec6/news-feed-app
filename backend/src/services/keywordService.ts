import { findUserById } from "./userService";

export function getKeywords(userId: string): string[] | null {
    const user = findUserById(userId);
    if (!user) throw new Error("User not found");
    return user.keywords;
}

export function addKeyword(userId: string, keyword: string): string[] {
    const user = findUserById(userId);
    if (!user) throw new Error("User not found");

    const normalizedKeyword = keyword.trim().toLowerCase();
    if (!normalizedKeyword) throw new Error("Keyword cannot be empty");
    if (!user.keywords.includes(normalizedKeyword)) {
        user.keywords.push(normalizedKeyword);
    }
    return user.keywords;

}

export function removeKeyword(userId: string, keyword: string): string[] {
    const user = findUserById(userId);
    if (!user) throw new Error("User not found");

    const normalizedKeyword = keyword.trim().toLowerCase();
    user.keywords = user.keywords.filter(k => k !== normalizedKeyword);
    return user.keywords;
}
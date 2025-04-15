export type User = {
    username: string,
    email: string,
    status: "WAITING_ACTIVATION" | "ACTIVATED" | "DEACTIVATED"
}
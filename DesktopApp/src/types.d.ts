export {};

declare global {
    type UserType = "S" | "I" | "";

    interface Subject {
        id: number;
        nome: string;
    }
}

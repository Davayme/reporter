import { Server } from "@prisma/client";

export interface DatabaseInterface {
    connect(server: Server): Promise<void>;
    executeQuery(query: string): Promise<any>;
}
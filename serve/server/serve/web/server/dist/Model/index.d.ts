declare class Model {
    private client;
    private dbUrl;
    private dbName;
    constructor();
    createConnect(): Promise<unknown>;
    insertDocuments(collectionName: string, documents: object): Promise<unknown>;
    queryDocuments(collectionName: string, query: object): Promise<[]>;
    closeConnect(): void;
}
export default Model;

export interface DBConfig {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: Boolean;
    logging: Boolean;
    entities: any[];
    subscribers: any[];
    migrations: any[];
    // type: "postgres",
    // host: "localhost",
    // port: 5432,
    // username: "test",
    // password: "test",
    // database: "test",
    // synchronize: true,
    // logging: true,
    // entities: [Post, Category],
    // subscribers: [],
    // migrations: [],
}

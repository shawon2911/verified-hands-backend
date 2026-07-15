export declare const auth: import("better-auth").Auth<{
    database: (options: import("better-auth").BetterAuthOptions) => import("better-auth").DBAdapter<import("better-auth").BetterAuthOptions>;
    secret: string;
    baseURL: string;
    emailAndPassword: {
        enabled: true;
        autoSignIn: true;
    };
    user: {
        additionalFields: {
            role: {
                type: "string";
                required: false;
                defaultValue: string;
                input: true;
            };
        };
    };
    socialProviders: {};
    trustedOrigins: string[];
}>;

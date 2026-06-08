const fs = require("fs");
const swaggerAutogen = require("swagger-autogen")();

const doc = {
    openapi: "3.0.0",
    info: {
        title: "API",
        version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3000" }],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./router/router.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    const output = JSON.parse(fs.readFileSync(outputFile, "utf8"));
    if (output.swagger && output.openapi) {
        delete output.swagger;
    }

    if (output.paths) {
        Object.entries(output.paths).forEach(([path, methods]) => {
            const matches = path.match(/\{[^}]+\}/g) || [];
            const paramNames = matches.map((m) => m.slice(1, -1));
            if (paramNames.length === 0) {
                return;
            }
            Object.values(methods).forEach((op) => {
                op.parameters = paramNames.map((name) => ({
                    name,
                    in: "path",
                    required: true,
                    schema: { type: "string" },
                }));
            });
        });

        const bodySchemas = {
            "/create_user": {
                type: "object",
                required: ["name", "password", "full_name", "user_type"],
                properties: {
                    name: { type: "string" },
                    password: { type: "string" },
                    full_name: { type: "string" },
                    user_type: { type: "string" },
                },
            },
            "/update_password_user": {
                type: "object",
                required: ["id", "password"],
                properties: {
                    id: { type: "integer" },
                    password: { type: "string" },
                },
            },
            "/active_deactive_user": {
                type: "object",
                required: ["id"],
                properties: {
                    id: { type: "integer" },
                },
            },
            "/insert_interface": {
                type: "object",
                required: ["english_name", "arabic_name", "father_id"],
                properties: {
                    english_name: { type: "string", description: "اسم الواجهة بالإنجليزية" },
                    arabic_name: { type: "string", description: "اسم الواجهة بالعربية" },
                    father_id: { type: "integer", description: "معرّف الواجهة الأب" },
                },
            },
            "/add_premission": {
                type: "object",
                required: ["user_type_id", "interface_id"],
                properties: {
                    user_type_id: { type: "integer", description: "معرّف نوع المستخدم" },
                    interface_id: { type: "integer", description: "معرّف الواجهة" },
                },
            },
            "/insert_list_by_tablename": {
                type: "object",
                required: ["tablename", "name"],
                properties: {
                    tablename: { type: "string", description: "اسم الجدول" },
                    name: { type: "string", description: "اسم العنصر المراد إضافته" },
                },
            },
        };

        Object.entries(output.paths).forEach(([path, methods]) => {
            Object.entries(methods).forEach(([method, op]) => {
                if (method !== "post" && method !== "put") {
                    return;
                }
                const schema = bodySchemas[path] || {
                    type: "object",
                    additionalProperties: true,
                };
                op.requestBody = {
                    required: true,
                    content: {
                        "application/json": { schema },
                    },
                };
            });
        });
    }

    fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
});
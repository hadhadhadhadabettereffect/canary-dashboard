export const deviceFormFields = [
    {
        name: "name",
        type: "text",
        required: true
    }, {
        name: "type",
        type: "select",
        options: ["temperature", "humidity", "airquality"]
    }
];

export const readingFormFields = [
    {
        name: "value",
        type: "number",
        required: true
    }, {
        name: "createdAt",
        type: "date"
    }
];

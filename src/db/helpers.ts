import { snakeCase } from "change-case";

type FieldValues = {
    values: any[],
    fields: string[]
}

export function getFieldValues (data: Record <string, unknown>): FieldValues {
     
    // dynamically build out a query string and array
    const fields: string[] = [];
    const values: any = [];
    let fieldCount = 1;

    // for each field in data object
    Object.keys(data).forEach((key) => {
        // include fields if they are provided
        const value = data[key];
        if (value === undefined) {
            return;
        }

        const dbFieldName = snakeCase(key);
        // add them to fields ex: phone = $2, email = $3, etc...
        fields.push(`${dbFieldName} = $${fieldCount}`);
        // add them to values - userData.phone, userData.email ...
        values.push(value);
        fieldCount++;
    })

    return { fields, values };
    
}

"use client"

import {useState} from 'react';
import axios from 'axios';

function SQLBuilder() {
    const [sqlQuery, setSqlQuery] = useState('');
    const [sqlQueryError, setSqlQueryError] = useState('');

    const generateSQLQuery = async () => {
        try {
            const data = {
                prompt: "Find all items with id 1.",
                type: "mysql",
                schema: "Items (id, ..."
            };

            const response = await axios.post('/api/sql/', data);
            setSqlQuery(response.data);
        } catch (error) {
            console.error('Error:', error);
            setSqlQueryError("Error generating SQL query.")
        }
    }

return (
    <div className="flex flex-col justify-center items-center text-white">
        <h1>SQL Builder</h1>
        <button onClick={generateSQLQuery} className="bg-gray-600 px-8 py-2 rounded-xl">Generate SQL Query</button>
        {sqlQuery && <pre>{JSON.stringify(sqlQuery, null, 2)}</pre>}
        {sqlQueryError && <p>{sqlQueryError}</p>}
    </div>
);
}

export default SQLBuilder;
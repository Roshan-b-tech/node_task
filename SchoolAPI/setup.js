const connection = require('./database');

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        address TEXT NOT NULL,
        latitude DECIMAL(9,6) NOT NULL,
        longitude DECIMAL(9,6) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

connection.query(createTableQuery, (err, result) => {
    if (err) {
        console.error("❌ Error creating table:", err.sqlMessage);
        process.exit(1);
    }
    console.log("✅ Table 'schools' is ready!");

    // Insert sample data (Optional)
    const insertSampleData = `
        INSERT INTO schools (name, address, latitude, longitude)
        VALUES 
        ('Sunrise Public School', '123 Street, City', 28.7041, 77.1025),
        ('Greenwood High', '456 Avenue, City', 28.7052, 77.1030)
        ON DUPLICATE KEY UPDATE name = name;
    `;

    connection.query(insertSampleData, (err, result) => {
        if (err) {
            console.error("❌ Error inserting sample data:", err.sqlMessage);
            process.exit(1);
        }
        console.log("✅ Sample data inserted successfully!");
        process.exit(0);
    });
});

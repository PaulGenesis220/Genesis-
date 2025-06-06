-- PostgreSQL memory schema
CREATE TABLE memory_log (
 id SERIAL PRIMARY KEY,
 input TEXT,
 response TEXT,
 timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
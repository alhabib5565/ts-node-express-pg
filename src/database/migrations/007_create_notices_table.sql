CREATE TABLE IF NOT EXISTS notices (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    title VARCHAR(255) NOT NULL,
    notice_category_id INTEGER NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) NOT NULL CHECK (
        status IN (
            'new',
            'active',
            'upcoming',
            'expired'
        )
    ),
    priority VARCHAR(50) NOT NULL CHECK (
        priority IN ('high', 'low', 'medium')
    ),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_notices_notice_category_id_notice_categories FOREIGN KEY (notice_category_id) REFERENCES notice_categories (id) ON DELETE SET NULL
);
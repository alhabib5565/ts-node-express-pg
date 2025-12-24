CREATE TABLE IF NOT EXISTS courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    bio VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    thumbnail VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    level VARCHAR(255) NOT NULL CHECK (
        level IN (
            'beginner',
            'intermediate',
            'advanced'
        )
    ),
    category_id INTEGER NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT fk_courses_category_id_categories FOREIGN KEY (category_id) REFERENCES course_categories (id) ON DELETE SET NULL
);
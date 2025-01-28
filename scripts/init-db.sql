-- =========================
-- 1) Enable PostGIS
-- =========================
CREATE EXTENSION IF NOT EXISTS postgis;

-- =========================
-- 2) Helper function for updated_at
-- =========================
CREATE OR REPLACE FUNCTION update_timestamp()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- =========================
-- 3) Users Table
-- =========================
CREATE TABLE users (
                       id                  SERIAL PRIMARY KEY,
                       username            VARCHAR(50) UNIQUE NOT NULL,
                       email               VARCHAR(100) UNIQUE NOT NULL,
                       password_hash       TEXT NOT NULL,
                       bio                 TEXT,
                       gender              INT,
                       interested_in       VARCHAR(20),
                       location            GEOGRAPHY(Point, 4326),
                       profile_picture_url TEXT,
                       created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_update_users_timestamp
    BEFORE UPDATE ON users
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- =========================
-- 4) Preferences (1:1 with Users)
-- =========================
CREATE TABLE preferences (
                             user_id             INT PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
                             min_age             INT,
                             max_age             INT,
                             gender_preference   VARCHAR(20),
                             max_distance        INT,
                             interests           TEXT
);

-- =========================
-- 5) Prompts
-- =========================
CREATE TABLE prompts (
                         id      SERIAL PRIMARY KEY,
                         content TEXT NOT NULL,
                         "group" TEXT
);

-- =========================
-- 6) Cards
-- =========================
CREATE TABLE cards (
                       id          SERIAL PRIMARY KEY,
                       description TEXT,
                       image       TEXT,
                       card_type   VARCHAR(50),
                       rarity      VARCHAR(50),
                       bio         TEXT,
                       prompt_id   INT REFERENCES prompts(id),
                       created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_update_cards_timestamp
    BEFORE UPDATE ON cards
    FOR EACH ROW
EXECUTE PROCEDURE update_timestamp();

-- =========================
-- 7) Matches
-- =========================
CREATE TABLE matches (
                         id          SERIAL PRIMARY KEY,
                         user1_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                         user2_id    INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                         matched_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         is_mutual   BOOLEAN DEFAULT FALSE
);

ALTER TABLE matches
    ADD CONSTRAINT unique_user_pair
        UNIQUE (LEAST(user1_id, user2_id), GREATEST(user1_id, user2_id));

-- =========================
-- 8) (Optional) Messages
-- =========================
-- CREATE TABLE messages (
--     id         SERIAL PRIMARY KEY,
--     match_id   INT NOT NULL REFERENCES matches(id) ON DELETE CASCADE,
--     sender_id  INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
--     content    TEXT NOT NULL,
--     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

-- =========================
-- 9) Basic Indexes (Optional)
-- =========================
CREATE INDEX idx_users_location ON users USING GIST (location);
CREATE INDEX idx_users_email ON users (email);
CREATE INDEX idx_users_username ON users (username);

CREATE INDEX idx_matches_user1 ON matches (user1_id);
CREATE INDEX idx_matches_user2 ON matches (user2_id);

-- =========================
-- Done!
-- =========================

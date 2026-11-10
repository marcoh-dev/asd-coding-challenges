import sql from "./lib/db";

export async function register() {
	await sql`
    CREATE TABLE IF NOT EXISTS deliveries (
      id SERIAL PRIMARY KEY,
      pickup TEXT NOT NULL,
      destination TEXT NOT NULL,
      status TEXT NOT NULL
    )
  `;

	await sql`
    INSERT INTO deliveries (pickup, destination, status)
    SELECT *
    FROM (
      VALUES
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled'),
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled'),
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled'),
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled'),
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled'),
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled'),
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled'),
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled'),
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled'),
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled'),
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled'),
		('Bakery', 'Clock Tower', 'active'),
		('Harbour', 'Hillside Cafe', 'accepted'),
		('Bookshop', 'Lighthouse', 'denied'),
		('Market Square', 'Train Station', 'fulfilled')
    ) AS mock_data(pickup, destination, status)
    WHERE NOT EXISTS (
      SELECT 1 FROM deliveries
    )
  `;
}

require('dotenv').config();
const { pool } = require('../config/db');

const initializeVitrivaDatabase = async () => {
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    console.log('Starting Vitriva Wellness database initialization...');

    // 1. Create Types (if they don't exist)
    await client.query(`
      DO $$ BEGIN
        CREATE TYPE user_role AS ENUM ('customer', 'admin');
      EXCEPTION WHEN duplicate_object THEN null; END $$;
      
      DO $$ BEGIN
        CREATE TYPE order_status AS ENUM ('pending', 'processing', 'shipped', 'delivered', 'cancelled');
      EXCEPTION WHEN duplicate_object THEN null; END $$;
      
      DO $$ BEGIN
        CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed');
      EXCEPTION WHEN duplicate_object THEN null; END $$;
    `);

    // 2. Create Tables
    await client.query(`
      -- Categories Table
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) UNIQUE NOT NULL,
        description TEXT,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );

      -- Products Table
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        compare_at_price DECIMAL(10, 2),
        sku VARCHAR(255) UNIQUE NOT NULL,
        stock_quantity INTEGER NOT NULL DEFAULT 0,
        images JSONB DEFAULT '[]'::jsonb,
        category_id UUID REFERENCES categories(id) ON DELETE RESTRICT,
        is_active BOOLEAN DEFAULT true,
        sales_count INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );

      -- Profiles Table (linked to auth.users)
      CREATE TABLE IF NOT EXISTS profiles (
        id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
        full_name TEXT,
        role user_role DEFAULT 'customer',
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );

      -- Orders Table
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
        guest_email VARCHAR(255),
        shipping_address JSONB NOT NULL,
        items JSONB NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        tax DECIMAL(10, 2) NOT NULL,
        shipping_cost DECIMAL(10, 2) NOT NULL,
        total DECIMAL(10, 2) NOT NULL,
        status order_status DEFAULT 'pending',
        payment_status payment_status DEFAULT 'pending',
        payment_method VARCHAR(255) DEFAULT 'Razorpay (stubbed)',
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // 3. Enable RLS and Policies (Optional but good practice for Supabase)
    // Note: Since we are running this via direct postgres connection, 
    // we are bypassing RLS anyway, but it's good for the frontend.
    await client.query(`
      ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
      ALTER TABLE products ENABLE ROW LEVEL SECURITY;
      ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
      ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

      -- Select policies
      DO $$ BEGIN
        CREATE POLICY "Allow public select on categories" ON categories FOR SELECT USING (true);
      EXCEPTION WHEN duplicate_object THEN null; END $$;

      DO $$ BEGIN
        CREATE POLICY "Allow public select on products" ON products FOR SELECT USING (true);
      EXCEPTION WHEN duplicate_object THEN null; END $$;

      DO $$ BEGIN
        CREATE POLICY "Allow users to view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
      EXCEPTION WHEN duplicate_object THEN null; END $$;

      DO $$ BEGIN
        CREATE POLICY "Allow admin to view all profiles" ON profiles FOR SELECT USING (
          EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
        );
      EXCEPTION WHEN duplicate_object THEN null; END $$;
    `);

    // 4. Seed Data
    console.log('Seeding initial Vitriva Wellness data...');

    // Categories
    const categoriesSeed = [
      { name: 'Magnesium', slug: 'magnesium', description: 'Bioavailable magnesium formulations' },
      { name: 'Sleep Support', slug: 'sleep', description: 'Natural support for restorative rest' },
      { name: 'Stress Relief', slug: 'stress', description: 'Formulated for mental calm and resilience' },
      { name: 'Vitality', slug: 'vitality', description: 'Essential minerals for daily energy' }
    ];

    for (const cat of categoriesSeed) {
      await client.query(
        'INSERT INTO categories (name, slug, description) VALUES ($1, $2, $3) ON CONFLICT (slug) DO NOTHING',
        [cat.name, cat.slug, cat.description]
      );
    }

    // Products
    const { rows: savedCats } = await client.query('SELECT id, slug FROM categories');
    const catMap = savedCats.reduce((acc, curr) => ({ ...acc, [curr.slug]: curr.id }), {});

    const productsSeed = [
      {
        name: "Magnesium Bisglycinate 400 MG+",
        description: "Premium, highly bioavailable chelated magnesium for targeted support. Ideal for muscle relaxation and stress response.",
        price: 45,
        compare_at_price: 55,
        sku: "VIT-MAG-001",
        stock_quantity: 120,
        images: JSON.stringify(["https://res.cloudinary.com/dgu5l6szo/image/upload/v1/samples/ecommerce/accessories-bag"]), // Placeholder from your cloudinary
        category_id: catMap['magnesium'],
        sales_count: 1548
      },
      {
        name: "Magnesium Malate",
        description: "Designed for energy metabolism and reducing fatigue. Highly tolerable chelated form.",
        price: 42,
        sku: "VIT-MAG-002",
        stock_quantity: 85,
        images: JSON.stringify(["https://res.cloudinary.com/dgu5l6szo/image/upload/v1/samples/ecommerce/leather-bag-gray"]),
        category_id: catMap['magnesium'],
        sales_count: 350
      },
      {
        name: "Sleep Complex",
        description: "Advanced formula combining Magnesium with Melatonin and L-Theanine for deep, restorative sleep.",
        price: 38,
        compare_at_price: 48,
        sku: "VIT-SLP-001",
        stock_quantity: 42,
        images: JSON.stringify(["https://res.cloudinary.com/dgu5l6szo/image/upload/v1/samples/ecommerce/shoes"]),
        category_id: catMap['sleep'],
        sales_count: 220
      },
      {
        name: "Daily Stress Formula",
        description: "Adaptogenic herbs and magnesium to help the body manage cortisol and improve stress adaptation.",
        price: 49,
        sku: "VIT-STR-001",
        stock_quantity: 30,
        images: JSON.stringify(["https://res.cloudinary.com/dgu5l6szo/image/upload/v1/samples/ecommerce/car-interior-design"]),
        category_id: catMap['stress'],
        sales_count: 180
      }
    ];

    for (const prod of productsSeed) {
      await client.query(
        'INSERT INTO products (name, description, price, compare_at_price, sku, stock_quantity, images, category_id, sales_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) ON CONFLICT (sku) DO NOTHING',
        [prod.name, prod.description, prod.price, prod.compare_at_price, prod.sku, prod.stock_quantity, prod.images, prod.category_id, prod.sales_count]
      );
    }

    // 5. Create Profile Trigger
    // This automatically creates a profile entry when a user signs up in Supabase Auth
    await client.query(`
      CREATE OR REPLACE FUNCTION public.handle_new_user()
      RETURNS trigger AS $$
      BEGIN
        INSERT INTO public.profiles (id, full_name, role)
        VALUES (new.id, new.raw_user_meta_data->>'full_name', 'customer');
        RETURN new;
      END;
      $$ LANGUAGE plpgsql SECURITY DEFINER;

      DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
      CREATE TRIGGER on_auth_user_created
        AFTER INSERT ON auth.users
        FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
    `);

    await client.query('COMMIT');
    console.log('Vitriva Wellness database initialization & seeding completed successfully.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Error initializing Vitriva database:', error);
  } finally {
    client.release();
    pool.end();
  }
};

initializeVitrivaDatabase();

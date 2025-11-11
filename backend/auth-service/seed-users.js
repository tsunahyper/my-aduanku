import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import UserModel from './models/user.model.js';
import { config } from 'dotenv';

// Load environment variables
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
config({ path: `.env.${process.env.NODE_ENV || 'development'}` });
config({ path: '.env.local' });
config({ path: '.env' });

const DB_URI = process.env.DB_URI;

// Default users to seed
const defaultUsers = [
  {
    username: 'superadmin',
    name: 'Super Admin',
    email: 'superadmin@aduanku.com',
    password: 'superadmin123',
    role: 'superadmin',
    isActive: true
  },
  {
    username: 'admin',
    name: 'Admin User',
    email: 'admin@aduanku.com',
    password: 'admin123',
    role: 'admin',
    isActive: true
  },
  {
    username: 'user',
    name: 'Regular User',
    email: 'user@aduanku.com',
    password: 'user123',
    role: 'user',
    isActive: true
  }
];

async function seedUsers() {
  try {
    // Connect to MongoDB
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 15000,
      retryWrites: false
    });
    console.log('✅ MongoDB connected successfully!');

    // Check if users already exist
    for (const userData of defaultUsers) {
      const existingUser = await UserModel.findOne({ email: userData.email });
      
      if (existingUser) {
        console.log(`⚠️  User ${userData.email} already exists, skipping...`);
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);

      // Create user
      const newUser = await UserModel.create({
        username: userData.username,
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        role: userData.role,
        isActive: userData.isActive
      });

      console.log(`✅ Created ${userData.role}: ${userData.email} (password: ${userData.password})`);
    }

    console.log('\n🎉 Seeding completed successfully!');
    console.log('\n📝 Default login credentials:');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Superadmin:');
    console.log('  Email: superadmin@aduanku.com');
    console.log('  Password: superadmin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('Admin:');
    console.log('  Email: admin@aduanku.com');
    console.log('  Password: admin123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('User:');
    console.log('  Email: user@aduanku.com');
    console.log('  Password: user123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error seeding users:', error.message);
    process.exit(1);
  } finally {
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('👋 Disconnected from MongoDB');
    process.exit(0);
  }
}

// Run the seed function
seedUsers();


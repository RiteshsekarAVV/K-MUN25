import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from root .env file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../../../.env') });

// Prisma Client
const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

// Test database connection
export const connectDatabase = async () => {
  try {
    // Test Prisma connection
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.log('💡 Using SQLite fallback database');
    return false;
  }
};

// Graceful shutdown
export const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
    console.log('✅ Database connections closed successfully.');
  } catch (error) {
    console.error('❌ Error closing database connections:', error);
  }
};

export { prisma };
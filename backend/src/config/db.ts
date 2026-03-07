import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaNeon } from '@prisma/adapter-neon'

// Validate DATABASE_URL is configured
if (!process.env.DATABASE_URL) {
  console.error('❌ DATABASE_URL is not defined in .env file')
  process.exit(1)
}

console.log('✅ DATABASE_URL is configured')

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!,
})

export const prisma = new PrismaClient({ adapter })

// Validate database connection on initialization
prisma.$connect()
  .then(() => {
    console.log('✅ Successfully connected to database')
  })
  .catch((error) => {
    console.error('❌ Failed to connect to database:', error.message)
    process.exit(1)
  })

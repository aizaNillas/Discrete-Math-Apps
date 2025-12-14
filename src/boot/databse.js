import { initializeDatabase } from "src/database/sqlite";

// ✅ Run DB Initialization on App Start
export default async () => {
  try {
    await initializeDatabase();
    console.log("📚 Database Initialized Successfully!");
  } catch (error) {
    console.error("❗ Database Initialization Error:", error);
  }
};

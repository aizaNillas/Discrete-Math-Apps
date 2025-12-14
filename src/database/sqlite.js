import { CapacitorSQLite, SQLiteConnection } from "@capacitor-community/sqlite";

const sqlite = new SQLiteConnection(CapacitorSQLite);
const dbName = "mathapp.db";

// ✅ Open Database Connection
const openDB = async () => {
  const db = await sqlite.createConnection(dbName, false, "no-encryption", 1);
  await db.open();
  return db;
};

// ✅ Close Database Connection
const closeDB = async (db) => {
  if (db) {
    await sqlite.closeConnection(dbName);
  }
};

// ✅ Initialize Database
export const initializeDatabase = async () => {
  const db = await openDB();

  // 🔥 Create Users Table (for Admin & Students)
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      full_name TEXT,
      password TEXT,
      role TEXT
    );
  `);

  // 🔥 Create Lessons Table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS lessons (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      content TEXT
    );
  `);

  // 🔥 Create Assessments Table
  await db.execute(`
    CREATE TABLE IF NOT EXISTS assessments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT,
      options TEXT,
      correct_answer TEXT
    );
  `);

  // ✅ Add Default Admin (if not exists)
  await db.execute(`
    INSERT OR IGNORE INTO users (username, full_name, password, role)
    VALUES ('admin', 'Administrator', '1234', 'teacher');
  `);

  await closeDB(db);
};

// ✅ Check Admin Login
export const checkAdminLogin = async (username, password) => {
  const db = await openDB();
  const result = await db.query(
    "SELECT * FROM users WHERE username = ? AND password = ? AND role = 'teacher'",
    [username, password]
  );
  await closeDB(db);
  return result.values.length > 0;
};

// ✅ Check Student Login
export const checkStudentLogin = async (username, password) => {
  const db = await openDB();
  const result = await db.query(
    "SELECT * FROM users WHERE username = ? AND password = ? AND role = 'student'",
    [username, password]
  );
  await closeDB(db);
  return result.values.length > 0 ? result.values[0] : null;
};

// ✅ Add New Student
export const addStudent = async (username, fullName, password) => {
  const db = await openDB();
  await db.run(
    "INSERT INTO users (username, full_name, password, role) VALUES (?, ?, ?, 'student')",
    [username, fullName, password]
  );
  await closeDB(db);
};

// ✅ Update Student Details
export const updateStudent = async (id, username, fullName, password) => {
  const db = await openDB();
  await db.run(
    "UPDATE users SET username = ?, full_name = ?, password = ? WHERE id = ? AND role = 'student'",
    [username, fullName, password, id]
  );
  await closeDB(db);
};

// ✅ Delete Student Account
export const deleteStudent = async (id) => {
  const db = await openDB();
  await db.run("DELETE FROM users WHERE id = ? AND role = 'student'", [id]);
  await closeDB(db);
};

// ✅ Get All Students
export const getAllStudents = async () => {
  const db = await openDB();
  const result = await db.query("SELECT * FROM users WHERE role = 'student'");
  await closeDB(db);
  return result.values || [];
};

// ✅ Add Lesson to DB
export const addLesson = async (title, content) => {
  const db = await openDB();
  await db.run(
    "INSERT INTO lessons (title, content) VALUES (?, ?)",
    [title, content]
  );
  await closeDB(db);
};

// ✅ Fetch All Lessons
export const getLessons = async () => {
  const db = await openDB();
  const result = await db.query("SELECT * FROM lessons");
  await closeDB(db);
  return result.values || [];
};

// ✅ Update Lesson in DB
export const updateLesson = async (id, title, content) => {
  const db = await openDB();
  await db.run(
    "UPDATE lessons SET title = ?, content = ? WHERE id = ?",
    [title, content, id]
  );
  await closeDB(db);
};

// ✅ Delete Lesson from DB
export const deleteLesson = async (id) => {
  const db = await openDB();
  await db.run("DELETE FROM lessons WHERE id = ?", [id]);
  await closeDB(db);
};

// ✅ Add Assessment to DB
export const addAssessment = async (question, options, correctAnswer) => {
  const db = await openDB();
  const optionsString = JSON.stringify(options);
  await db.run(
    "INSERT INTO assessments (question, options, correct_answer) VALUES (?, ?, ?)",
    [question, optionsString, correctAnswer]
  );
  await closeDB(db);
};

// ✅ Fetch All Assessments
export const getAssessments = async () => {
  const db = await openDB();
  const result = await db.query("SELECT * FROM assessments");
  await closeDB(db);
  return result.values.map((item) => ({
    ...item,
    options: JSON.parse(item.options),
  }));
};

// ✅ Update Assessment in DB
export const updateAssessment = async (id, question, options, correctAnswer) => {
  const db = await openDB();
  const optionsString = JSON.stringify(options);
  await db.run(
    "UPDATE assessments SET question = ?, options = ?, correct_answer = ? WHERE id = ?",
    [question, optionsString, correctAnswer, id]
  );
  await closeDB(db);
};

// ✅ Delete Assessment from DB
export const deleteAssessment = async (id) => {
  const db = await openDB();
  await db.run("DELETE FROM assessments WHERE id = ?", [id]);
  await closeDB(db);
};

// ✅ Check if Database is Initialized
export const checkDatabase = async () => {
  const db = await openDB();
  const result = await db.query(`
    SELECT name FROM sqlite_master WHERE type='table' AND name='users';
  `);
  await closeDB(db);
  return result.values.length > 0;
};

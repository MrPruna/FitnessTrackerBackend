const { RowDescriptionMessage } = require("pg-protocol/dist/messages");
const client = require("./client");

// database functions

// user functions
async function createUser({ username, password }) {
  try {
    const result = await client.query(`
      INSERT INTO users(username, password)
      VALUES ($1, $2)
      ON CONFLICT(username) DO NOTHING
      RETURNING *;
    `, [username, password]);
    const { rows: [user] } = await client.query(`
    SELECT id, username FROM users
    WHERE username=$1;
    `, [username]);
    return user;
  } catch (err) {
    throw err;
  }
  
}

async function getUser({ username, password }) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT * FROM users
      WHERE username=$1;
    `, [username]);
    if(user.password === password) {
      delete user.password;
      return user;
    } else {
      console.error("Password does not match");
    }
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT id, username FROM users
      WHERE id=$1;
    `, [userId]);
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(userName) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT * From users
      WHERE username=$1;
    `, [userName]);
    return user;
  } catch (error) {
    throw error;
  }

}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByUsername,
}

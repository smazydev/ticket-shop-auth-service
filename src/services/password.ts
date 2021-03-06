import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

//This was done to convert a callbank function into
//Async Await syntax :3
const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString("hex")}.${salt}`;
  }
  static async compare(storePassword: string, suppliedPassword: string) {
    // Spilt hashed password and salt
    const [hashedPassword, salt] = storePassword.split(".");
    // Generate hash using supplied password
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    //Compare the two
    return buffer.toString("hex") === hashedPassword;
  }
}

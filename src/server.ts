import app from "./index";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./dataBase/conection-db";
const PORT = process.env.PORT || "5000";

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT} /n Docs: http://localhost:${PORT}/api-docs`);
});

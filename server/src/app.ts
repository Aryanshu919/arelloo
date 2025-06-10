import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';


const app = express();
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://meditrack-frontend.vercel.app"
];

// const corsOptions = {
//   origin: function (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void,
//   ) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//   allowedHeaders: [
//     "Content-Type",
//     "Authorization",
//     "X-Requested-With",
//     "Accept",
//     "Origin",
//   ],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// };

app.use(cors({
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true,               // 🚨 allow cookies
}));
app.use(express.json());
app.use(cookieParser());


// import Routes 
import authRouter from "./routes/auth_route";
import userRouter from "./routes/user_route";
import boardRoute from "./routes/board_route";
import listRouter from "./routes/list_route";
import cardRouter from "./routes/card_route";
import labelRouter from "./routes/label_route";

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/board", boardRoute);
app.use("/api/list", listRouter);
app.use('/api/card', cardRouter);
app.use("/api/label", labelRouter)

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

export default app;
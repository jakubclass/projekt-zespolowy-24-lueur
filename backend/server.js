import express from "express"
import path from "path"
import authRoutes  from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import postRoutes from './routes/post.route.js'
import  notificationRoutes from './routes/notification.route.js'
import communityRoutes from "./routes/community.route.js"
import dotenv from 'dotenv'
import connectMongoDB from "./db/connectMongoDB.js"
import cookieParser from "cookie-parser"
import { v2 as cloudinary} from "cloudinary" // api for image hosting
import cors from 'cors'

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()
const PORT = process.env.PORT || 5000

const __dirname = path.resolve()

// Настраиваем CORS
// app.use(cors({
//     origin: 'http://localhost:3000',  // разрешаем доступ только с фронтенд-сервера
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   }));

app.use(express.json({ limit: "10mb" })) // helps to get data from req.body from POST method
app.use(express.urlencoded({ extended: true })) //to parse form data(urlencoded)
app.use(cookieParser())
// add here cookieParser middleware

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/communities', communityRoutes)



// if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
    })
// }

// app.get('/', (req, res) => {
//     res.send("Hello app")
// })

app.listen(PORT, () => {
    console.log(`_______Server is running on port: ${PORT} url: http://localhost:${PORT}/ ________`)
    // console.log(process.env.MONGO_URI)
    connectMongoDB()
})

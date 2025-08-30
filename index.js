const express = require("express")
require("dotenv").config()
const connectDB = require("./connectDB")
connectDB(process.env.DB_URL)
const Admission = require("./Model/AddmissionModel");
const Register = require("./Model/Register")
const cors = require("cors")
const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors());

//addmission inquiry Api
app.post("/api/admission", async (req, res) => {
    try {
        const newAdmissionInquiry = new Admission({ ...req.body.data });
        await newAdmissionInquiry.save();
        res.status(201).json({ message: "Admission inquiry submitted successfully" });
    } catch (error) {
        console.error("Error in admission inquiry API:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/api/admission", async (req, res) => {
    try {
        const AdmissionInquiries = await Admission.find({}).sort({ createdAt: -1 });
        res.status(200).json(AdmissionInquiries);
    } catch (error) {
        console.error("Error in root API:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})
//comment admission add.
app.put("/api/admission/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const { comment } = req.body;
        if (!comment) {
            return res.status(400).json({ message: "Comment is required" });
        }
        const updatedInquiry = await Admission.findByIdAndUpdate(id, { comment }, { new: true });
        if (!updatedInquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        res.status(200).json({ message: "Inquiry updated successfully", updatedInquiry });
    } catch (error) {
        console.error("Error in update API:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.delete("/api/admission/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedInquiry = await Admission.findByIdAndDelete(id);
        if (!deletedInquiry) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        res.status(200).json({ message: "Inquiry deleted successfully" });
    } catch (error) {
        console.error("Error in delete API:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});
// --------------- Admission API End ----------------

//register user API
app.post("/api/register", async (req, res) => {
    try {
        const { studentName, mobile } = req.body.values;

        // Check if student with same studentName and mobile already exists
        const existing = await Register.findOne({ studentName, mobile });

        if (existing) {
            return res.status(400).json({ message: "Student already registered with this mobile number." });
        }

        const newRegister = new Register({ ...req.body.values });
        await newRegister.save();
        res.status(201).json({ message: "Registration successful" });
    } catch (error) {
        console.error("Error in registration API:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.get("/api/register", async (req, res) => {
    try {
        const RegisterUser = await Register.find({}).sort({ createdAt: -1 });
        res.status(200).json(RegisterUser);
    } catch (error) {
        console.error("Error in root API:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


app.put("/api/register/:id", async (req, res) => {
    try {

        const { id } = req.params;
        const { comment } = req.body;
        if (!comment) {
            return res.status(400).json({ message: "Comment is required" });
        }
        const UserComment = await Register.findByIdAndUpdate(id, { comment }, { new: true });
        if (!UserComment) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        res.status(200).json({ message: "Inquiry updated successfully", UserComment });
    } catch (error) {
        console.error("Error in update API:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

app.delete("/api/register/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRegister = await Register.findByIdAndDelete(id);
        if (!deletedRegister) {
            return res.status(404).json({ message: "Inquiry not found" });
        }
        res.status(200).json({ message: "Inquiry deleted successfully" });
    } catch (error) {
        console.error("Error in delete API:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
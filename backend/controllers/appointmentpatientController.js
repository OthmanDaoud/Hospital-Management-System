const db = require("../config/db");
const jwt = require("jsonwebtoken");

exports.getAvailableAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await db.query(
      "SELECT * FROM Appointments WHERE doctor_id = $1 AND isTimeSlotAvailable = TRUE",
      [doctorId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.bookAppointment = async (req, res) => {
  try {
    const token = req.cookies.token; // تأكد من أنك تستخدم اسم الكوكي المناسب
    if (!token) {
      return res.status(400).json({ message: "User is not authenticated" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const patient_id = decodedToken.userId; // احصل على userId من التوكن
    const { appointment_id, notes } = req.body;

    const result = await db.query(
      "UPDATE Appointments SET patient_id = $1, isTimeSlotAvailable = FALSE, notes = $3 WHERE appointment_id = $2 AND isTimeSlotAvailable = TRUE RETURNING *",
      [patient_id, appointment_id, notes]
    );

    if (result.rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Appointment not available or already booked" });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createAvailableAppointments = async (req, res) => {
  try {
    const { doctor_id, appointment_date, appointment_times } = req.body;

    const values = appointment_times
      .map((time) => `(${doctor_id}, '${appointment_date}', '${time}', TRUE)`)
      .join(", ");

    const query = `
        INSERT INTO Appointments (doctor_id, appointment_date, appointment_time, isTimeSlotAvailable)
        VALUES ${values}
        RETURNING *
      `;

    const result = await db.query(query);
    res.status(201).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


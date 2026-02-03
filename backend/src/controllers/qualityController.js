const Job = require('../models/Job');

const { uploadToCloudinary } = require('../utils/cloudinary');

exports.getQualityStats = async (req, res) => {
    try {
        const jobs = await Job.find({ inspectionScore: { $exists: true } });
        const avgScore = jobs.length > 0 ? (jobs.reduce((acc, job) => acc + job.inspectionScore, 0) / jobs.length).toFixed(1) : 0;

        res.json({
            avgInspectionScore: avgScore,
            complianceRate: "98.1%", // Mocked for now
            timestamp: new Date()
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.submitInspection = async (req, res) => {
    try {
        const { jobId, score, feedback } = req.body;
        let imageUrls = [];

        if (req.files && req.files.length > 0) {
            const uploadPromises = req.files.map(file => uploadToCloudinary(file.path, 'inspections'));
            const results = await Promise.all(uploadPromises);
            imageUrls = results.map(r => r.url);
        }

        const job = await Job.findByIdAndUpdate(
            jobId,
            {
                inspectionScore: score,
                images: imageUrls,
                clientFeedback: { comment: feedback }
            },
            { new: true }
        );
        res.json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

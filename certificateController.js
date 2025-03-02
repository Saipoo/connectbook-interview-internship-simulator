import Certificate from '../models/certificateModel.js';

// @desc    Get certificate by ID
// @route   GET /api/certificates/:id
// @access  Public
const getCertificateById = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id });

    if (certificate) {
      res.json(certificate);
    } else {
      res.status(404).json({ message: 'Certificate not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify certificate
// @route   GET /api/certificates/verify/:id
// @access  Public
const verifyCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findOne({ certificateId: req.params.id })
      .populate('userId', 'firstName lastName');

    if (certificate) {
      res.json({
        isValid: true,
        certificate: {
          certificateId: certificate.certificateId,
          courseName: certificate.courseName,
          issueDate: certificate.issueDate,
          recipientName: `${certificate.userId.firstName} ${certificate.userId.lastName}`,
          skills: certificate.skills
        }
      });
    } else {
      res.json({
        isValid: false,
        message: 'Certificate not found or invalid'
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get user certificates
// @route   GET /api/certificates/user
// @access  Private
const getUserCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({ userId: req.user._id });
    res.json(certificates);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export { 
  getCertificateById, 
  verifyCertificate,
  getUserCertificates
};
import { prisma } from '../config/database.js';
import { Registration, User } from '../models/index.js';
import fileUploadService from '../services/fileUploadService.js';
import emailService from '../services/emailService.js';
import paymentService from '../services/paymentService.js';

class RegistrationController {
  async createRegistration(req, res) {
    try {
      const {
        firstName,
        lastName,
        email,
        phone,
        gender,
        isKumaraguru,
        rollNumber,
        institutionType,
        institution,
        grade,
        totalMuns,
        committeePreference1,
        portfolioPreference1,
        committeePreference2,
        portfolioPreference2,
        committeePreference3,
        portfolioPreference3,
      } = req.body;

      // Validate required files
      if (!req.files || !req.files.idDocument) {
        return res.status(400).json({
          success: false,
          message: 'ID document is required',
        });
      }

      // Create user account first
      const userPassword = `Iam${firstName}1!@#`;
      const hashedPassword = await bcrypt.hash(userPassword, 12);

      const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        role: 'PARTICIPANT',
      });

      // Create registration
      const registration = await Registration.create({
        userId: user.id,
        firstName,
        lastName,
        email,
        phone,
        gender,
        isKumaraguru: isKumaraguru === 'yes',
        rollNumber,
        institutionType,
        institution,
        grade,
        totalMuns,
        committeePreference1,
        portfolioPreference1,
        committeePreference2,
        portfolioPreference2,
        committeePreference3,
        portfolioPreference3,
        idDocument: req.files.idDocument[0].path,
        munResume: req.files.munResume ? req.files.munResume[0].path : null,
      });

      // Send registration confirmation email
      await emailService.sendRegistrationConfirmation(email, {
        firstName,
        lastName,
        registrationId: registration.id,
        paymentAmount: 150, // Base registration fee
      });

      res.status(201).json({
        success: true,
        message: 'Registration submitted successfully',
        registration: {
          id: registration.id,
          status: registration.status,
          submittedAt: registration.submittedAt,
        },
        user: {
          id: user.id,
          email: user.email,
          tempPassword: userPassword,
        },
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Registration failed',
        error: error.message,
      });
    }
  }

  async getRegistrations(req, res) {
    try {
      const {
        page = 1,
        limit = 10,
        status,
        paymentStatus,
        search,
        sortBy = 'submittedAt',
        sortOrder = 'DESC',
      } = req.query;

      const offset = (page - 1) * limit;
      const where = {};

      // Apply filters
      if (status) where.status = status;
      if (paymentStatus) where.paymentStatus = paymentStatus;
      if (search) {
        where[Op.or] = [
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } },
          { email: { [Op.iLike]: `%${search}%` } },
          { institution: { [Op.iLike]: `%${search}%` } },
        ];
      }

      const { count, rows } = await Registration.findAndCountAll({
        where,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone'],
          },
        ],
        limit: parseInt(limit),
        offset,
        order: [[sortBy, sortOrder]],
      });

      res.json({
        success: true,
        data: {
          registrations: rows,
          pagination: {
            total: count,
            page: parseInt(page),
            limit: parseInt(limit),
            totalPages: Math.ceil(count / limit),
          },
        },
      });
    } catch (error) {
      console.error('Get registrations error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get registrations',
        error: error.message,
      });
    }
  }

  async getRegistrationById(req, res) {
    try {
      const { id } = req.params;

      const registration = await Registration.findByPk(id, {
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone'],
          },
        ],
      });

      if (!registration) {
        return res.status(404).json({
          success: false,
          message: 'Registration not found',
        });
      }

      res.json({
        success: true,
        registration,
      });
    } catch (error) {
      console.error('Get registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get registration',
        error: error.message,
      });
    }
  }

  async updateRegistrationStatus(req, res) {
    try {
      const { id } = req.params;
      const { status, allocatedCommittee, allocatedPortfolio } = req.body;

      const registration = await Registration.findByPk(id, {
        include: [{ model: User, as: 'user' }],
      });

      if (!registration) {
        return res.status(404).json({
          success: false,
          message: 'Registration not found',
        });
      }

      await registration.update({
        status,
        allocatedCommittee,
        allocatedPortfolio,
      });

      // Send allocation email if committee is allocated
      if (allocatedCommittee && allocatedPortfolio) {
        await emailService.sendCommitteeAllocation(registration.email, {
          firstName: registration.firstName,
          lastName: registration.lastName,
          committee: allocatedCommittee,
          portfolio: allocatedPortfolio,
        });
      }

      res.json({
        success: true,
        message: 'Registration updated successfully',
        registration,
      });
    } catch (error) {
      console.error('Update registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update registration',
        error: error.message,
      });
    }
  }

  async deleteRegistration(req, res) {
    try {
      const { id } = req.params;

      const registration = await Registration.findByPk(id);
      if (!registration) {
        return res.status(404).json({
          success: false,
          message: 'Registration not found',
        });
      }

      // Delete associated files
      if (registration.idDocument) {
        await fileUploadService.deleteFile(registration.idDocument);
      }
      if (registration.munResume) {
        await fileUploadService.deleteFile(registration.munResume);
      }

      await registration.destroy();

      res.json({
        success: true,
        message: 'Registration deleted successfully',
      });
    } catch (error) {
      console.error('Delete registration error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete registration',
        error: error.message,
      });
    }
  }

  async getRegistrationStats(req, res) {
    try {
      const stats = await prisma.registration.groupBy({
        by: ['status', 'paymentStatus'],
        _count: {
          id: true,
        },
      });

      const totalRegistrations = await prisma.registration.count();
      const confirmedRegistrations = await prisma.registration.count({
        where: { status: 'CONFIRMED' },
      });
      const paidRegistrations = await prisma.registration.count({
        where: { paymentStatus: 'PAID' },
      });
      const allocatedRegistrations = await prisma.registration.count({
        where: {
          allocatedCommittee: { not: null },
          allocatedPortfolio: { not: null },
        },
      });

      res.json({
        success: true,
        stats: {
          total: totalRegistrations,
          confirmed: confirmedRegistrations,
          paid: paidRegistrations,
          allocated: allocatedRegistrations,
          byStatus: stats,
        },
      });
    } catch (error) {
      console.error('Get registration stats error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get registration stats',
        error: error.message,
      });
    }
  }
}

export default new RegistrationController();
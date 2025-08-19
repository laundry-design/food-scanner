import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { validateRequest, userSchemas } from '../middleware/validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User profile and onboarding management
 */

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Get user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/profile', authenticateToken, (_req, res) => {
  // TODO: Implement get profile controller
  res.json({ message: 'Get profile endpoint' });
});

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               age:
 *                 type: integer
 *               weight:
 *                 type: number
 *               weightUnit:
 *                 type: string
 *                 enum: [KG, LB]
 *               height:
 *                 type: integer
 *               heightUnit:
 *                 type: string
 *                 enum: [CM, IN]
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               fitnessGoal:
 *                 type: string
 *               gymActivity:
 *                 type: string
 *               dietFocus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.put('/profile', authenticateToken, validateRequest(userSchemas.updateProfile), (req, res) => {
  // TODO: Implement update profile controller
  res.json({ message: 'Update profile endpoint' });
});

/**
 * @swagger
 * /api/users/onboarding/complete:
 *   post:
 *     summary: Complete user onboarding
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - plan
 *               - age
 *               - weight
 *               - weightUnit
 *               - height
 *               - heightUnit
 *               - gender
 *               - fitnessGoal
 *               - gymActivity
 *               - dietFocus
 *             properties:
 *               plan:
 *                 type: string
 *               age:
 *                 type: integer
 *                 minimum: 16
 *                 maximum: 100
 *               weight:
 *                 type: number
 *                 minimum: 0
 *               weightUnit:
 *                 type: string
 *                 enum: [KG, LB]
 *               height:
 *                 type: integer
 *                 minimum: 100
 *                 maximum: 250
 *               heightUnit:
 *                 type: string
 *                 enum: [CM, IN]
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *               fitnessGoal:
 *                 type: string
 *               gymActivity:
 *                 type: string
 *               dietFocus:
 *                 type: string
 *     responses:
 *       200:
 *         description: Onboarding completed successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/onboarding/complete', authenticateToken, validateRequest(userSchemas.completeOnboarding), (req, res) => {
  // TODO: Implement complete onboarding controller
  res.json({ message: 'Complete onboarding endpoint' });
});

/**
 * @swagger
 * /api/users/goals:
 *   get:
 *     summary: Get user nutrition goals
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User goals retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/goals', authenticateToken, (req, res) => {
  // TODO: Implement get goals controller
  res.json({ message: 'Get goals endpoint' });
});

/**
 * @swagger
 * /api/users/goals:
 *   put:
 *     summary: Update user nutrition goals
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetCalories:
 *                 type: integer
 *                 minimum: 0
 *               targetProtein:
 *                 type: number
 *                 minimum: 0
 *               targetCarbs:
 *                 type: number
 *                 minimum: 0
 *               targetFat:
 *                 type: number
 *                 minimum: 0
 *               targetFiber:
 *                 type: number
 *                 minimum: 0
 *     responses:
 *       200:
 *         description: Goals updated successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.put('/goals', authenticateToken, validateRequest(userSchemas.updateGoals), (req, res) => {
  // TODO: Implement update goals controller
  res.json({ message: 'Update goals endpoint' });
});

export default router;

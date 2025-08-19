import { Router } from 'express';
import { authenticateToken, requireOnboarding } from '../middleware/auth';
import { validateRequest, nutritionSchemas } from '../middleware/validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Nutrition
 *   description: Nutrition tracking and management
 */

/**
 * @swagger
 * /api/nutrition/daily:
 *   get:
 *     summary: Get daily nutrition for today
 *     tags: [Nutrition]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Daily nutrition retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     date:
 *                       type: string
 *                       format: date
 *                     totalCalories:
 *                       type: integer
 *                     totalProtein:
 *                       type: number
 *                     totalCarbs:
 *                       type: number
 *                     totalFat:
 *                       type: number
 *                     totalFiber:
 *                       type: number
 *                     totalSugar:
 *                       type: number
 *                     totalSodium:
 *                       type: number
 *                     goals:
 *                       type: object
 *                       properties:
 *                         targetCalories:
 *                           type: integer
 *                         targetProtein:
 *                           type: number
 *                         targetCarbs:
 *                           type: number
 *                         targetFat:
 *                           type: number
 *                         targetFiber:
 *                           type: number
 *                     progress:
 *                       type: object
 *                       properties:
 *                         caloriesProgress:
 *                           type: number
 *                         proteinProgress:
 *                           type: number
 *                         carbsProgress:
 *                           type: number
 *                         fatProgress:
 *                           type: number
 *                         fiberProgress:
 *                           type: number
 *                     foodItems:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           imageUrl:
 *                             type: string
 *                           mealType:
 *                             type: string
 *                           nutrition:
 *                             type: object
 *                             properties:
 *                               calories:
 *                                 type: integer
 *                               protein:
 *                                 type: number
 *                               carbs:
 *                                 type: number
 *                               fat:
 *                                 type: number
 *                           consumedAt:
 *                             type: string
 *       401:
 *         description: Unauthorized
 */
router.get('/daily', authenticateToken, requireOnboarding, (req, res) => {
  // TODO: Implement get daily nutrition controller
  res.json({ message: 'Get daily nutrition endpoint' });
});

/**
 * @swagger
 * /api/nutrition/daily/{date}:
 *   get:
 *     summary: Get daily nutrition for specific date
 *     tags: [Nutrition]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Daily nutrition retrieved successfully
 *       400:
 *         description: Invalid date format
 *       401:
 *         description: Unauthorized
 */
router.get('/daily/:date', authenticateToken, requireOnboarding, validateRequest(nutritionSchemas.getDailyNutrition), (req, res) => {
  // TODO: Implement get daily nutrition for specific date controller
  res.json({ message: 'Get daily nutrition for specific date endpoint' });
});

/**
 * @swagger
 * /api/nutrition/weekly:
 *   get:
 *     summary: Get weekly nutrition
 *     tags: [Nutrition]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date in YYYY-MM-DD format
 *       - in: query
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: Weekly nutrition retrieved successfully
 *       400:
 *         description: Invalid date format or date range
 *       401:
 *         description: Unauthorized
 */
router.get('/weekly', authenticateToken, requireOnboarding, validateRequest(nutritionSchemas.getWeeklyNutrition), (req, res) => {
  // TODO: Implement get weekly nutrition controller
  res.json({ message: 'Get weekly nutrition endpoint' });
});

/**
 * @swagger
 * /api/nutrition/monthly:
 *   get:
 *     summary: Get monthly nutrition
 *     tags: [Nutrition]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\\d{4}$'
 *         description: Year in YYYY format
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^\\d{1,2}$'
 *         description: Month in 1-12 format
 *     responses:
 *       200:
 *         description: Monthly nutrition retrieved successfully
 *       400:
 *         description: Invalid year or month format
 *       401:
 *         description: Unauthorized
 */
router.get('/monthly', authenticateToken, requireOnboarding, validateRequest(nutritionSchemas.getMonthlyNutrition), (req, res) => {
  // TODO: Implement get monthly nutrition controller
  res.json({ message: 'Get monthly nutrition endpoint' });
});

/**
 * @swagger
 * /api/nutrition/manual-entry:
 *   post:
 *     summary: Add manual nutrition entry
 *     tags: [Nutrition]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - calories
 *               - protein
 *               - carbs
 *               - fat
 *               - mealType
 *             properties:
 *               name:
 *                 type: string
 *                 description: Food name
 *               calories:
 *                 type: integer
 *                 minimum: 0
 *                 description: Calories
 *               protein:
 *                 type: number
 *                 minimum: 0
 *                 description: Protein in grams
 *               carbs:
 *                 type: number
 *                 minimum: 0
 *                 description: Carbohydrates in grams
 *               fat:
 *                 type: number
 *                 minimum: 0
 *                 description: Fat in grams
 *               fiber:
 *                 type: number
 *                 minimum: 0
 *                 description: Fiber in grams
 *               sugar:
 *                 type: number
 *                 minimum: 0
 *                 description: Sugar in grams
 *               sodium:
 *                 type: number
 *                 minimum: 0
 *                 description: Sodium in milligrams
 *               mealType:
 *                 type: string
 *                 enum: [breakfast, lunch, dinner, snack]
 *                 description: Type of meal
 *     responses:
 *       201:
 *         description: Nutrition entry added successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post('/manual-entry', authenticateToken, requireOnboarding, validateRequest(nutritionSchemas.manualEntry), (req, res) => {
  // TODO: Implement add manual nutrition entry controller
  res.status(201).json({ message: 'Add manual nutrition entry endpoint' });
});

export default router;

import { Router } from 'express';
import { faqController } from './faq.controller';
import { validateData } from '../../middlewares/validateData';
import { createFaqSchema, updateFaqSchema } from './faq.validation';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: FAQ
 *   description: FAQ management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FAQ:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         question:
 *           type: string
 *           example: "What is your return policy?"
 *         answer:
 *           type: string
 *           example: "You can return within 7 days."
 *         is_active:
 *           type: boolean
 *           example: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 *
 *     FAQCreate:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         question:
 *           type: string
 *         answer:
 *           type: string
 *
 *     Meta:
 *       type: object
 *       properties:
 *         total:
 *           type: number
 *         page:
 *           type: number
 *         limit:
 *           type: number
 *         totalPages:
 *           type: number
 *
 *     SingleFAQResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         statusCode:
 *           type: number
 *         message:
 *           type: string
 *         data:
 *           $ref: '#/components/schemas/FAQ'
 *
 *     FAQListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *         statusCode:
 *           type: number
 *         message:
 *           type: string
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FAQ'
 *         meta:
 *           $ref: '#/components/schemas/Meta'
 */

// Create FAQ
/**
 * @swagger
 * /faqs:
 *   post:
 *     summary: Create a new FAQ
 *     tags: [FAQ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQCreate'
 *     responses:
 *       201:
 *         description: FAQ created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleFAQResponse'
 *       400:
 *         description: Validation error
 */
router.post('/', validateData(createFaqSchema), faqController.createFaq);

// Get All FAQs
/**
 * @swagger
 * /faqs:
 *   get:
 *     summary: Get all FAQs
 *     tags: [FAQ]
 *     responses:
 *       200:
 *         description: FAQs retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FAQListResponse'
 */
router.get('/', faqController.getAllFaqs);

// Get FAQ by ID
/**
 * @swagger
 * /faqs/{id}:
 *   get:
 *     summary: Get FAQ by ID
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: FAQ retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleFAQResponse'
 *       404:
 *         description: FAQ not found
 */
router.get('/:id', faqController.getFaqById);

// Update FAQ
/**
 * @swagger
 * /faqs/{id}:
 *   put:
 *     summary: Update FAQ
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FAQCreate'
 *     responses:
 *       200:
 *         description: FAQ updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleFAQResponse'
 *       400:
 *         description: Validation error
 *       404:
 *         description: FAQ not found
 */
router.put('/:id', validateData(updateFaqSchema), faqController.updateFaq);

// Delete FAQ
/**
 * @swagger
 * /faqs/{id}:
 *   delete:
 *     summary: Delete FAQ
 *     tags: [FAQ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: FAQ deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *       404:
 *         description: FAQ not found
 */
router.delete('/:id', faqController.deleteFaq);

export const faqRoutes = router;

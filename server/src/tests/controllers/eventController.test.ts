import { describe } from 'node:test';
import { vi, beforeAll, it, expect } from 'vitest';

import IEventController from '../../models/controllers/IEventController.js';
import createEventController from '../../controllers/eventController.js';

// Mock event service
const mockEventService: Partial<IEventController> = {
    createEvent: vi.fn().mockResolvedValue({
        id: '1',
        name: 'Test Event',
        date: new Date(),
        createdBy: 'user1',
        createdAt: new Date(),
        updatedAt: new Date()
    })
};

const eventController: IEventController = createEventController(mockEventService as any);


describe('Event Controller', () => {
    beforeAll(() => {
        // Mock any global setup if necessary
        vi.stubGlobal('SomeGlobal', {});
    });

    describe('createEvent', () => {
        it('should create an event successfully', async () => {
            // Mock request and response objects
            const req: any = {
                user: { id: 'user1', role: 'user' },
                body: { name: 'Test Event', date: new Date() },
                file: { filename: 'test-image.jpg' }
            };
            const res: any = {
                status: vi.fn().mockReturnThis(),
                json: vi.fn()
            };
            // Import the controller with the mocked service
            await eventController.createEvent(req, res);

            // Assertions
            expect(mockEventService.createEvent).toHaveBeenCalledWith(req.body.date, req.user.id, req.body.name);
        })

            
    });
        
})

import { createClient } from 'redis';
import { REDIS_URL } from '../configs/config';



const redisClient = createClient({
    url: REDIS_URL
});

redisClient.on('error', (err) => {
    console.error('Redis client error', err);
});

(async () => {
    try {
        await redisClient.connect();
        console.log('Redis connectedddddd');
    } catch (err) {
        console.error('Error connecting to Redis:', err);
    }
})();

export { redisClient };

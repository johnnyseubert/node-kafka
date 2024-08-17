const { Kafka } = require('kafkajs');

const kafka = new Kafka({
   clientId: 'consumer',
   brokers: ['localhost:9092'], // Atualizado para o novo Docker env
});

const consumer = kafka.consumer({ groupId: 'my-custom-id' });

const run = async () => {
   await consumer.connect();

   await consumer.subscribe({ topic: 'my-topic', fromBeginning: true });

   await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
         try {
            const rawJson = message.value.toString();
            const parsedMessage = JSON.parse(rawJson);
            console.log(parsedMessage);
         } catch (error) {
            console.log({
               message: 'Invalid Json',
            });
         }
      },
      // maxWaitTimeInMs: 1000,
   });
};

run().catch(console.error);

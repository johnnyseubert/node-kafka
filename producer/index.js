const { Kafka } = require('kafkajs');

const kafka = new Kafka({
   clientId: 'producer',
   brokers: ['localhost:9092'], // Atualizado para o novo Docker env
});

const producer = kafka.producer();

const run = async () => {
   await producer.connect();

   const data = {
      name: 'Johnny',
      age: new Date().toISOString(),
   };

   await producer.send({
      topic: 'my-topic',
      messages: [{ value: JSON.stringify(data) }],
   });

   await producer.disconnect();
};

run().catch(console.error);

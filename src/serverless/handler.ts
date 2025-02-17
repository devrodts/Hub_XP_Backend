import { AggregatedOrderReport } from 'src/order/interfaces/aggregated-order-report.interface';
import { MongoClient } from 'mongodb';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Order } from 'src/order/interfaces/order-interface';

export const generateOrderReport: APIGatewayProxyHandler = async (event) => {
  const MONGO_URI = process.env.MONGO_URI;

  if (!MONGO_URI) {
    console.error('MONGO_URI não definido nas variáveis de ambiente');
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro de configuração do servidor' }),
    };
  }

  let client: MongoClient | null = null;

  try {
    client = await MongoClient.connect(MONGO_URI);
    const db = client.db();

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 30); 

    const orders = await db.collection<Order>('orders')
      .find({ createdAt: { $gte: startDate } })
      .toArray();

    const report: AggregatedOrderReport = orders.reduce(
      (acc, order) => ({
        totalOrders: acc.totalOrders + 1,
        totalSales: acc.totalSales + order.total,
        averageOrderValue: 0, 
      }),
      { totalOrders: 0, totalSales: 0, averageOrderValue: 0 }
    );

    report.averageOrderValue = report.totalSales / report.totalOrders;

    console.log('Relatório de Vendas:', report);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Relatório de vendas gerado com sucesso!',
        report,
      }),
    };
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Erro ao gerar relatório de vendas' }),
    };
  } finally {
    if (client) await client.close();
  }
};